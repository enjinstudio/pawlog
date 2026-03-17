import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { PassportClient } from "./passport-client";

export default async function PassportPage({ params }: { params: Promise<{ petId: string }> }) {
  const { petId } = await params;

  // Use service role or anon — passport is public
  const supabase = await createClient();

  const { data: pet } = await supabase
    .from("pawlog_pets")
    .select("*")
    .eq("id", petId)
    .eq("is_public", true)
    .single();

  if (!pet) {
    notFound();
  }

  const { data: entries } = await supabase
    .from("pawlog_entries")
    .select("*")
    .eq("pet_id", petId)
    .order("date", { ascending: false });

  return <PassportClient pet={pet} entries={entries || []} />;
}
