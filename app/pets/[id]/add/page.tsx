"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { type EntryType, ENTRY_TYPE_CONFIG } from "@/lib/types";

const entryTypes: EntryType[] = [
  "vet_visit",
  "vaccination",
  "flea_treatment",
  "worming",
  "medication",
  "weight",
  "grooming",
  "other",
];

export default function AddEntryPage() {
  const router = useRouter();
  const params = useParams();
  const petId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    type: "vet_visit" as EntryType,
    title: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    next_due: "",
    weight_kg: "",
    vet_name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setLoading(true);
    try {
      const supabase = createClient();

      const { error } = await supabase.from("pawlog_entries").insert({
        pet_id: petId,
        type: form.type,
        title: form.title.trim(),
        date: form.date,
        notes: form.notes.trim() || null,
        next_due: form.next_due || null,
        weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
        vet_name: form.vet_name.trim() || null,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Entry saved!");
        router.push(`/pets/${petId}`);
      }
    } catch {
      toast.error("Failed to save entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedConfig = ENTRY_TYPE_CONFIG[form.type];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <header className="border-b border-[#222] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-bold tracking-tight">PawLog</span>
          </Link>
          <Link href={`/pets/${petId}`}>
            <Button variant="ghost" size="sm" className="text-[#f5f5f5]/50 hover:text-[#f5f5f5]">
              ← Pet Profile
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
            <h1 className="text-2xl font-bold mb-1">Add health entry</h1>
            <p className="text-[#f5f5f5]/40 text-sm">Record a health event for your pet.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Entry type selector */}
            <div className="bg-[#141414] border border-[#222] p-5">
              <h2 className="font-medium text-[#f5f5f5]/70 text-sm uppercase tracking-wider mb-4">
                Entry Type
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {entryTypes.map((type) => {
                  const config = ENTRY_TYPE_CONFIG[type];
                  const isSelected = form.type === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setForm({ ...form, type })}
                      className={`p-3 border text-left transition-all ${
                        isSelected
                          ? `${config.bgColor} ${config.borderColor} ${config.color}`
                          : "bg-[#0a0a0a] border-[#222] text-[#f5f5f5]/50 hover:border-[#333]"
                      }`}
                    >
                      <div className="text-xl mb-1">{config.icon}</div>
                      <div className="text-xs font-medium">{config.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details */}
            <div className="bg-[#141414] border border-[#222] p-5 space-y-4">
              <h2 className="font-medium text-[#f5f5f5]/70 text-sm uppercase tracking-wider">
                {selectedConfig.icon} {selectedConfig.label} Details
              </h2>

              <div className="space-y-2">
                <Label className="text-[#f5f5f5]/70 text-sm">Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder={
                    form.type === "vet_visit" ? "e.g. Annual checkup" :
                    form.type === "vaccination" ? "e.g. Rabies vaccine" :
                    form.type === "weight" ? "e.g. Monthly weigh-in" :
                    "e.g. Frontline Plus"
                  }
                  required
                  className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#E3170A] h-10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#f5f5f5]/70 text-sm">Date *</Label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] focus:border-[#E3170A] h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#f5f5f5]/70 text-sm">Next due date</Label>
                  <Input
                    type="date"
                    value={form.next_due}
                    onChange={(e) => setForm({ ...form, next_due: e.target.value })}
                    className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] focus:border-[#E3170A] h-10"
                  />
                </div>
              </div>

              {(form.type === "vet_visit") && (
                <div className="space-y-2">
                  <Label className="text-[#f5f5f5]/70 text-sm">Vet name / clinic</Label>
                  <Input
                    value={form.vet_name}
                    onChange={(e) => setForm({ ...form, vet_name: e.target.value })}
                    placeholder="e.g. Dr. Smith, City Vet Clinic"
                    className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#E3170A] h-10"
                  />
                </div>
              )}

              {form.type === "weight" && (
                <div className="space-y-2">
                  <Label className="text-[#f5f5f5]/70 text-sm">Weight (kg) *</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    value={form.weight_kg}
                    onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
                    placeholder="e.g. 28.5"
                    className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#E3170A] h-10"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-[#f5f5f5]/70 text-sm">Notes</Label>
                <Textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any additional notes, observations, or instructions..."
                  rows={3}
                  className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#E3170A] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={loading || !form.title.trim()}
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
                  "Save Entry →"
                )}
              </Button>
              <Link href={`/pets/${petId}`}>
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
