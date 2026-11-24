import { NextResponse } from "next/server";
import { clearOwnerSession, getOwnerSession, isSameOrigin } from "@/lib/owner-auth";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  await getOwnerSession();
  const response = NextResponse.json({ ok: true });
  clearOwnerSession(response);
  return response;
}
