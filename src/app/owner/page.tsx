import { redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/owner-auth";
import OwnerDashboard from "./owner-dashboard";

export const dynamic = "force-dynamic";
export default async function OwnerPage() {
  if (!await getOwnerSession()) redirect("/owner/login");
  return <OwnerDashboard />;
}
