import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextResponse } from "next/server";

const cookieName = "jeyya_owner_session";
const sessionDurationSeconds = 60 * 60 * 8;
export type OwnerSession = { email: string; expiresAt: number };

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must contain at least 32 characters.");
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function ownerLoginConfigured() {
  return Boolean((process.env.OWNER_USERNAME || process.env.OWNER_EMAIL) && process.env.OWNER_PASSWORD_HASH && process.env.SESSION_SECRET?.length && process.env.SESSION_SECRET.length >= 32);
}

export function ownerIdentity() {
  return (process.env.OWNER_USERNAME || process.env.OWNER_EMAIL || "").trim().toLowerCase();
}

export async function getOwnerSession(): Promise<OwnerSession | null> {
  const ownerEmail = ownerIdentity();
  if (!ownerEmail || !ownerLoginConfigured()) return null;
  try {
    const store = await cookies();
    const token = store.get(cookieName)?.value;
    if (!token) return null;
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra) return null;
    const expected = sign(payload);
    const receivedBytes = Buffer.from(signature);
    const expectedBytes = Buffer.from(expected);
    if (receivedBytes.length !== expectedBytes.length || !timingSafeEqual(receivedBytes, expectedBytes)) return null;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as OwnerSession;
    if (session.email !== ownerEmail || !Number.isFinite(session.expiresAt) || session.expiresAt <= Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export function setOwnerSession(response: NextResponse, email: string) {
  const expiresAt = Date.now() + sessionDurationSeconds * 1000;
  const payload = Buffer.from(JSON.stringify({ email: email.trim().toLowerCase(), expiresAt })).toString("base64url");
  response.cookies.set(cookieName, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: sessionDurationSeconds,
    expires: new Date(expiresAt),
  });
}

export function clearOwnerSession(response: NextResponse) {
  response.cookies.set(cookieName, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0, expires: new Date(0) });
}

export async function requireOwner(): Promise<OwnerSession> {
  const session = await getOwnerSession();
  if (!session) redirect("/owner/login");
  return session;
}

export function isSameOrigin(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const allowedOrigins = new Set<string>();

  if (configuredOrigin) {
    const canonical = new URL(configuredOrigin);
    allowedOrigins.add(canonical.origin);
    const wwwAlias = new URL(canonical);
    wwwAlias.hostname = canonical.hostname.startsWith("www.")
      ? canonical.hostname.slice(4)
      : `www.${canonical.hostname}`;
    allowedOrigins.add(wwwAlias.origin);
  }

  // Local development may use localhost even when a production site URL is configured.
  if (process.env.NODE_ENV !== "production") allowedOrigins.add(requestOrigin);

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return allowedOrigins.has(new URL(origin).origin);
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    return allowedOrigins.has(new URL(referer).origin);
  } catch {
    return false;
  }
}
