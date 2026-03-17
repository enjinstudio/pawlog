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

function getReminderBadge(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: "Overdue", style: { background: "#FEE7E7", color: "#C53030" } };
  if (diff <= 7) return { label: daysUntil(dateStr), style: { background: "#FEF3DC", color: "#92600A" } };
  return { label: daysUntil(dateStr), style: { background: "#E8F8EF", color: "#2E7D52" } };
}

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export function DashboardClient({ user, pets, reminders }: DashboardClientProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen" style={{ background: "#FEFCF8", color: "#2D2420" }}>
      {/* Header */}
      <header className="px-6 py-4" style={{ borderBottom: "1.5px solid #EBE7E0", background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-semibold tracking-tight" style={{ color: "#2D2420" }}>PawLog</span>
          </Link>
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setShowUpgrade(true)}
              className="text-xs px-3 py-1.5 rounded-full font-semibold transition-colors"
              style={{ color: "#92600A", background: "#FEF3DC", border: "1.5px solid #F5A623" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={spring}
            >
              ✦ Upgrade
            </motion.button>
            <Link href="/settings">
              <Button variant="ghost" size="sm" style={{ color: "#8C7B72" }} className="hover:text-[#2D2420]">
                Settings
              </Button>
            </Link>
            <button
              onClick={handleSignOut}
              className="text-xs transition-colors hover:opacity-70"
              style={{ color: "#C4B8B0" }}
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
          transition={{ duration: 0.35, ...spring }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "#2D2420" }}>
            Good {getTimeOfDay()}, {user.email?.split("@")[0]} 👋
          </h1>
          <p className="text-sm" style={{ color: "#8C7B72" }}>
            {pets.length === 0
              ? "Add your first pet to get started."
              : `You have ${pets.length} pet${pets.length !== 1 ? "s" : ""} registered.`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pets */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold" style={{ color: "#2D2420" }}>My Pets</h2>
              <Link href="/pets/new">
                <motion.button
                  className="btn-primary text-xs"
                  style={{ minHeight: 36, padding: "0 1rem" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                >
                  + Add Pet
                </motion.button>
              </Link>
            </div>

            {pets.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="card p-12 text-center"
                style={{ border: "2px dashed #EBE7E0", background: "#FEFCF8" }}
              >
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  🐾
                </motion.div>
                <h3 className="font-semibold mb-2" style={{ color: "#2D2420" }}>No pets yet!</h3>
                <p className="text-sm mb-5" style={{ color: "#8C7B72" }}>
                  Add your first furry friend to start tracking their health.
                </p>
                <Link href="/pets/new">
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={spring}
                  >
                    Add Your First Pet 🐶
                  </motion.button>
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-3">
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
              <h2 className="font-semibold mb-4" style={{ color: "#2D2420" }}>Upcoming Reminders</h2>
              {reminders.length === 0 ? (
                <div
                  className="card p-5 text-center"
                  style={{ background: "#FFFFFF" }}
                >
                  <div className="text-2xl mb-2">🔔</div>
                  <p className="text-xs" style={{ color: "#8C7B72" }}>
                    No upcoming reminders in the next 30 days.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reminders.map((r, i) => {
                    const badge = getReminderBadge(r.next_due);
                    return (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, ...spring }}
                        className="card p-3"
                        style={{ background: "#FFFFFF" }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <EntryBadge type={r.type as EntryType} size="sm" />
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                            style={badge.style}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <p className="text-sm font-medium truncate" style={{ color: "#2D2420" }}>
                          {r.title}
                        </p>
                        {r.pawlog_pets && (
                          <p className="text-xs mt-0.5" style={{ color: "#8C7B72" }}>
                            {r.pawlog_pets.name}
                          </p>
                        )}
                        <p className="text-xs mt-1" style={{ color: "#C4B8B0" }}>
                          {formatDate(r.next_due)}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div>
              <h2 className="font-semibold mb-4" style={{ color: "#2D2420" }}>Quick Actions</h2>
              <div className="space-y-2">
                <Link href="/pets/new">
                  <motion.button
                    className="w-full card p-3 text-left text-sm flex items-center gap-2 font-medium"
                    style={{ color: "#2D2420", background: "#FFFFFF" }}
                    whileHover={{ y: -1 }}
                    transition={spring}
                  >
                    <span>🐶</span> Add new pet
                  </motion.button>
                </Link>
                {pets.length > 0 && (
                  <Link href={`/pets/${pets[0].id}/add`}>
                    <motion.button
                      className="w-full card p-3 text-left text-sm flex items-center gap-2 font-medium"
                      style={{ color: "#2D2420", background: "#FFFFFF" }}
                      whileHover={{ y: -1 }}
                      transition={spring}
                    >
                      <span>📋</span> Log health entry
                    </motion.button>
                  </Link>
                )}
                <motion.button
                  onClick={() => setShowUpgrade(true)}
                  className="w-full p-3 text-left text-sm flex items-center gap-2 font-semibold rounded-xl"
                  style={{
                    background: "#FEF3DC",
                    border: "1.5px solid #F5A623",
                    color: "#92600A",
                    borderRadius: 12,
                  }}
                  whileHover={{ y: -1 }}
                  transition={spring}
                >
                  <span>✦</span> Upgrade to Premium
                </motion.button>
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
