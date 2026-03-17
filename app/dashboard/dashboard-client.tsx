"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PetCard } from "@/components/pet-card";
import { UpgradeModal } from "@/components/upgrade-modal";
import { EntryBadge } from "@/components/entry-badge";
import { type Pet, type EntryType } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

interface Reminder {
  id: string;
  pet_id: string;
  type: string;
  title: string;
  next_due: string;
  pawlog_pets: { name: string } | null;
}

interface DashboardClientProps {
  user: User;
  pets: Pet[];
  reminders: Reminder[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

function daysUntil(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `In ${diff} days`;
}

export function DashboardClient({ user, pets, reminders }: DashboardClientProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Header */}
      <header className="border-b border-[#222] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-bold tracking-tight">PawLog</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUpgrade(true)}
              className="text-xs text-[#F5A623] border border-[#F5A623]/30 px-3 py-1.5 hover:bg-[#F5A623]/10 transition-colors"
            >
              ✦ Upgrade
            </button>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="text-[#f5f5f5]/50 hover:text-[#f5f5f5]">
                Settings
              </Button>
            </Link>
            <button
              onClick={handleSignOut}
              className="text-xs text-[#f5f5f5]/30 hover:text-[#f5f5f5]/60 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold mb-1">
            Good {getTimeOfDay()}, {user.email?.split("@")[0]} 👋
          </h1>
          <p className="text-[#f5f5f5]/40 text-sm">
            {pets.length === 0
              ? "Add your first pet to get started."
              : `You have ${pets.length} pet${pets.length !== 1 ? "s" : ""} registered.`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pets */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#f5f5f5]/80">My Pets</h2>
              <Link href="/pets/new">
                <Button size="sm" className="bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0 text-xs h-8">
                  + Add Pet
                </Button>
              </Link>
            </div>

            {pets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#141414] border border-[#222] border-dashed p-12 text-center"
              >
                <div className="text-4xl mb-3">🐶</div>
                <h3 className="font-medium mb-2">No pets yet</h3>
                <p className="text-[#f5f5f5]/40 text-sm mb-5">
                  Add your first dog to start tracking their health.
                </p>
                <Link href="/pets/new">
                  <Button className="bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0">
                    Add Your First Pet
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {pets.map((pet, i) => (
                  <PetCard key={pet.id} pet={pet} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming reminders */}
            <div>
              <h2 className="font-semibold text-[#f5f5f5]/80 mb-4">Upcoming Reminders</h2>
              {reminders.length === 0 ? (
                <div className="bg-[#141414] border border-[#222] p-5 text-center">
                  <div className="text-2xl mb-2">🔔</div>
                  <p className="text-[#f5f5f5]/40 text-xs">No upcoming reminders in the next 30 days.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reminders.map((r) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-[#141414] border border-[#222] p-3"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <EntryBadge type={r.type as EntryType} size="sm" />
                        <span className="text-xs text-[#F5A623] flex-shrink-0">{daysUntil(r.next_due)}</span>
                      </div>
                      <p className="text-sm font-medium text-[#f5f5f5] truncate">{r.title}</p>
                      {r.pawlog_pets && (
                        <p className="text-xs text-[#f5f5f5]/40 mt-0.5">{r.pawlog_pets.name}</p>
                      )}
                      <p className="text-xs text-[#f5f5f5]/30 mt-1">{formatDate(r.next_due)}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div>
              <h2 className="font-semibold text-[#f5f5f5]/80 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link href="/pets/new">
                  <button className="w-full bg-[#141414] border border-[#222] p-3 text-left text-sm hover:border-[#333] transition-colors flex items-center gap-2">
                    <span>🐶</span> Add new pet
                  </button>
                </Link>
                {pets.length > 0 && (
                  <Link href={`/pets/${pets[0].id}/add`}>
                    <button className="w-full bg-[#141414] border border-[#222] p-3 text-left text-sm hover:border-[#333] transition-colors flex items-center gap-2">
                      <span>📋</span> Log health entry
                    </button>
                  </Link>
                )}
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="w-full bg-[#141414] border border-[#F5A623]/20 p-3 text-left text-sm hover:border-[#F5A623]/40 transition-colors flex items-center gap-2 text-[#F5A623]"
                >
                  <span>✦</span> Upgrade to Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 17) return "afternoon";
  return "evening";
}
