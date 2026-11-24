import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/owner-auth";
import QuotationEditor from "../quotation-editor";
export const dynamic = "force-dynamic";
export default async function NewQuotationPage() { if (!await getOwnerSession()) redirect("/owner/login"); return <QuotationEditor/>; }
