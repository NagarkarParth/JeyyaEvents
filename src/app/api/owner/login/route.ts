import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { isSameOrigin, ownerIdentity, ownerLoginConfigured, setOwnerSession } from "@/lib/owner-auth";

export const runtime = "nodejs";
const attempts = new Map<string, { count: number; until: number }>();

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  if (!ownerLoginConfigured()) return NextResponse.json({ error: "Owner login is not configured on this server." }, { status: 503 });
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const attempt = attempts.get(forwarded);
  if (attempt && attempt.until > now && attempt.count >= 8) return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const valid = username === ownerIdentity() && password.length > 0 && await compare(password, process.env.OWNER_PASSWORD_HASH!);
    if (!valid) {
      const next = attempt && attempt.until > now ? { count: attempt.count + 1, until: attempt.until } : { count: 1, until: now + 10 * 60 * 1000 };
      attempts.set(forwarded, next);
      return NextResponse.json({ error: "Username or password is incorrect." }, { status: 401 });
    }
    attempts.delete(forwarded);
    const response = NextResponse.json({ ok: true });
    setOwnerSession(response, ownerIdentity());
    return response;
  } catch {
    return NextResponse.json({ error: "Could not process the login request." }, { status: 400 });
  }
}
