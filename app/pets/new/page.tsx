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

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const inputStyle = {
  background: "#FEFCF8",
  border: "1.5px solid #EBE7E0",
  color: "#2D2420",
  borderRadius: 8,
};

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
        toast.success(`${form.name} added successfully! 🐾`);
        router.push(`/pets/${data.id}`);
      }
    } catch {
      toast.error("Failed to save pet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#FEFCF8", color: "#2D2420" }}>
      <header
        className="px-6 py-4"
        style={{ borderBottom: "1.5px solid #EBE7E0", background: "#FFFFFF" }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-semibold tracking-tight" style={{ color: "#2D2420" }}>PawLog</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" style={{ color: "#8C7B72" }} className="hover:text-[#2D2420]">
              ← Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ...spring }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-1" style={{ color: "#2D2420" }}>
              Add a new pet 🐶
            </h1>
            <p className="text-sm" style={{ color: "#8C7B72" }}>
              Fill in your dog&apos;s details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="card p-6 space-y-5" style={{ background: "#FFFFFF" }}>
              <h2
                className="font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2"
                style={{ color: "#8C7B72" }}
              >
                📋 Basic Info
              </h2>

              <div className="space-y-2">
                <Label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#8C7B72" }}
                >
                  Pet name *
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Buddy, Max, Bella"
                  required
                  className="h-11"
                  style={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#8C7B72" }}
                >
                  Breed
                </Label>
                <Input
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  placeholder="e.g. Labrador Retriever"
                  className="h-11"
                  style={inputStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#8C7B72" }}
                  >
                    Date of birth
                  </Label>
                  <Input
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="h-11"
                    style={inputStyle}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#8C7B72" }}
                  >
                    Gender
                  </Label>
                  <Select
                    value={form.gender || ""}
                    onValueChange={(v) => setForm({ ...form, gender: v ?? "" })}
                  >
                    <SelectTrigger
                      className="h-11"
                      style={inputStyle}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "#FFFFFF",
                        border: "1.5px solid #EBE7E0",
                        color: "#2D2420",
                        borderRadius: 12,
                      }}
                    >
                      <SelectItem value="male">Male ♂️</SelectItem>
                      <SelectItem value="female">Female ♀️</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#8C7B72" }}
                >
                  ⚖️ Current weight (kg)
                </Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  value={form.weight_kg}
                  onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
                  placeholder="e.g. 25.5"
                  className="h-11"
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                type="submit"
                disabled={loading || !form.name.trim()}
                className="btn-primary flex-1"
                whileHover={!loading && form.name.trim() ? { scale: 1.02 } : {}}
                whileTap={!loading && form.name.trim() ? { scale: 0.97 } : {}}
                transition={spring}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Pet 🐾"
                )}
              </motion.button>
              <Link href="/dashboard">
                <button
                  type="button"
                  className="btn-secondary h-11 px-6"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
