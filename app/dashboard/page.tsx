import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: pets } = await supabase
    .from("pawlog_pets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  // Get upcoming reminders (next_due within 30 days)
  const today = new Date().toISOString().split("T")[0];
  const in30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const petIds = (pets || []).map((p) => p.id);
  let reminders: unknown[] = [];

  if (petIds.length > 0) {
    const { data: reminderData } = await supabase
      .from("pawlog_entries")
      .select("*, pawlog_pets(name)")
      .in("pet_id", petIds)
      .gte("next_due", today)
      .lte("next_due", in30)
      .order("next_due", { ascending: true })
      .limit(10);
    reminders = reminderData || [];
  }

  return (
    <DashboardClient
      user={user}
      pets={pets || []}
      reminders={reminders as Array<{
        id: string;
        pet_id: string;
        type: string;
        title: string;
        next_due: string;
        pawlog_pets: { name: string } | null;
      }>}
    />
  );
}
