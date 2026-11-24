"use client";
import Link from "next/link";
import { FilePlus2, LogOut, MessageCircle, ShieldCheck } from "lucide-react";
import "./owner.css";
import { money } from "@/lib/format-money";

export default function OwnerDashboard() {
  async function logout() { await fetch("/api/owner/logout", { method: "POST" }); window.location.assign("/owner/login"); }
  return <main className="owner-shell"><header className="owner-topbar"><button className="owner-logout" onClick={logout}><LogOut size={16}/> Log out</button></header><section className="owner-content owner-one-time-dashboard"><span className="owner-eyebrow">OWNER TOOLS</span><h1>Prepare a quotation.</h1><p>Create a one-time quotation and send its details directly to your customer on WhatsApp.</p><Link className="owner-primary owner-create" href="/owner/quotations/new"><FilePlus2 size={18}/> CREATE QUOTATION</Link><div className="owner-privacy-note"><ShieldCheck size={21}/><div><b>Private by design</b><span>Quotations and customer details are not saved in a history or database. Download a PDF before leaving if you need a copy.</span></div></div><div className="owner-whatsapp-note"><MessageCircle size={18}/><span>WhatsApp opens a chat to the number you enter with the quotation text ready to send. You can download the PDF separately and attach it in WhatsApp.</span></div></section></main>;
}
export { money };
