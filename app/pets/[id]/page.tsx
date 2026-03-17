import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PetProfileClient } from "./pet-profile-client";

export default async function PetProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: pet } = await supabase
    .from("pawlog_pets")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!pet) {
    notFound();
  }

  const { data: entries } = await supabase
    .from("pawlog_entries")
    .select("*")
    .eq("pet_id", id)
    .order("date", { ascending: false });

  return <PetProfileClient pet={pet} entries={entries || []} />;
}
