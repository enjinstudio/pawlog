"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function NewPetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    breed: string;
    dob: string;
    gender: string;
    weight_kg: string;
    notes: string;
  }>({
    name: "",
    breed: "",
    dob: "",
    gender: "",
    weight_kg: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("pawlog_pets")
        .insert({
          user_id: user.id,
          name: form.name.trim(),
          breed: form.breed.trim() || null,
          dob: form.dob || null,
          gender: form.gender || "unknown",
          weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
          is_public: true,
        })
        .select()
        .single();

      if (error) {
        toast.error(error.message);
      } else {
        toast.success(`${form.name} added successfully!`);
        router.push(`/pets/${data.id}`);
      }
    } catch {
      toast.error("Failed to save pet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <header className="border-b border-[#222] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-bold tracking-tight">PawLog</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-[#f5f5f5]/50 hover:text-[#f5f5f5]">
              ← Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Add a new pet</h1>
            <p className="text-[#f5f5f5]/40 text-sm">Fill in your dog&apos;s details to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-[#141414] border border-[#222] p-6 space-y-5">
              <h2 className="font-medium text-[#f5f5f5]/70 text-sm uppercase tracking-wider mb-4">Basic Info</h2>

              <div className="space-y-2">
                <Label className="text-[#f5f5f5]/70 text-sm">Pet name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Buddy, Max, Bella"
                  required
                  className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#E3170A] h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#f5f5f5]/70 text-sm">Breed</Label>
                <Input
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  placeholder="e.g. Labrador Retriever"
                  className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#E3170A] h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#f5f5f5]/70 text-sm">Date of birth</Label>
                  <Input
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] focus:border-[#E3170A] h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#f5f5f5]/70 text-sm">Gender</Label>
                  <Select value={form.gender || ""} onValueChange={(v) => setForm({ ...form, gender: v ?? "" })}>
                    <SelectTrigger className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] h-10">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#141414] border-[#333] text-[#f5f5f5]">
                      <SelectItem value="male">Male ♂️</SelectItem>
                      <SelectItem value="female">Female ♀️</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#f5f5f5]/70 text-sm">Current weight (kg)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  value={form.weight_kg}
                  onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
                  placeholder="e.g. 25.5"
                  className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#E3170A] h-10"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading || !form.name.trim()}
                className="flex-1 bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0 h-11"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Pet →"
                )}
              </Button>
              <Link href="/dashboard">
                <Button variant="outline" className="border-[#333] text-[#f5f5f5]/60 hover:text-[#f5f5f5] hover:bg-[#141414] h-11">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
