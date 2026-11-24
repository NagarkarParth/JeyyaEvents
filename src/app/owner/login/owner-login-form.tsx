"use client";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OwnerLoginForm({ enabled }: { enabled: boolean }) {
  const router = useRouter();
  const [show, setShow] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/owner/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: form.get("username"), password: form.get("password") }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      router.replace("/owner"); router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign in."); } finally { setBusy(false); }
  }
  return <form className="owner-form" onSubmit={submit}>
    <label>Username or email<span className="owner-input-wrap"><UserRound size={17}/><input name="username" autoComplete="username" required maxLength={120} disabled={!enabled}/></span></label>
    <label>Password<span className="owner-input-wrap"><LockKeyhole size={17}/><input name="password" type={show ? "text" : "password"} autoComplete="current-password" required disabled={!enabled}/><button className="owner-show-password" type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></span></label>
    {error && <div className="owner-alert" role="alert">{error}</div>}
    <button className="owner-primary" disabled={!enabled || busy}>{busy ? "Signing in…" : "SIGN IN"}</button>
  </form>;
}
