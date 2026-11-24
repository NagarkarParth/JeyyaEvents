import { redirect } from "next/navigation";
import { getOwnerSession, ownerLoginConfigured } from "@/lib/owner-auth";
import OwnerLoginForm from "./owner-login-form";

export const dynamic = "force-dynamic";
export default async function OwnerLoginPage() {
  if (await getOwnerSession()) redirect("/owner");
  return <main className="owner-auth-page"><section className="owner-auth-card"><a href="/" className="owner-back">← Jeyya Events</a><span className="owner-eyebrow">PRIVATE OWNER ACCESS</span><h1>Welcome back.</h1><p>Sign in to manage event quotations.</p>{!ownerLoginConfigured() && <div className="owner-alert">Owner login is not configured on the server yet. Add the owner credentials and session secret to your environment.</div>}<OwnerLoginForm enabled={ownerLoginConfigured()} /></section></main>;
}
