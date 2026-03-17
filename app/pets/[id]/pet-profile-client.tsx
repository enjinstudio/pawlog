"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EntryBadge } from "@/components/entry-badge";
import { type Pet, type HealthEntry, type EntryType } from "@/lib/types";
import { toast } from "sonner";

interface PetProfileClientProps {
  pet: Pet;
  entries: HealthEntry[];
}

function getAge(dob?: string): string {
  if (!dob) return "";
  const birth = new Date(dob);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  const totalMonths = years * 12 + months;
  if (totalMonths < 12) return `${totalMonths}mo`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return m > 0 ? `${y}y ${m}mo` : `${y}y`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric", month: "short", year: "numeric"
  });
}

function daysUntil(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  return `In ${diff}d`;
}

export function PetProfileClient({ pet, entries }: PetProfileClientProps) {
  const today = new Date().toISOString().split("T")[0];
  const reminders = entries.filter((e) => e.next_due && e.next_due >= today);
  const initials = pet.name.slice(0, 2).toUpperCase();
  const age = getAge(pet.dob);

  const copyPassportLink = () => {
    const url = `${window.location.origin}/passport/${pet.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Passport link copied!");
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Header */}
      <header className="border-b border-[#222] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Pet header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-[#141414] border border-[#222] p-6 mb-6"
        >
          <div className="flex items-start gap-5">
            {/* Avatar */}
            {pet.photo_url ? (
              <img src={pet.photo_url} alt={pet.name} className="w-20 h-20 object-cover flex-shrink-0" />
            ) : (
              <div className="w-20 h-20 bg-[#F5A623]/20 border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623] font-bold text-2xl flex-shrink-0">
                {initials}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-2xl font-bold">{pet.name}</h1>
                {pet.gender && pet.gender !== "unknown" && (
                  <span className="text-sm text-[#f5f5f5]/40">
                    {pet.gender === "male" ? "♂️ Male" : "♀️ Female"}
                  </span>
                )}
              </div>
              {pet.breed && <p className="text-[#f5f5f5]/50 mb-2">{pet.breed}</p>}
              <div className="flex flex-wrap gap-4 text-sm text-[#f5f5f5]/40">
                {age && <span>🎂 {age}</span>}
                {pet.dob && <span>{formatDate(pet.dob)}</span>}
                {pet.weight_kg && <span>⚖️ {pet.weight_kg} kg</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-shrink-0">
              <Link href={`/pets/${pet.id}/add`}>
                <Button size="sm" className="bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0 text-xs">
                  + Add Entry
                </Button>
              </Link>
              <Button
                size="sm"
                variant="outline"
                className="border-[#333] text-[#f5f5f5]/60 hover:text-[#f5f5f5] hover:bg-[#1a1a1a] text-xs"
                onClick={copyPassportLink}
              >
                📄 Share Passport
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="timeline">
          <TabsList className="bg-[#141414] border border-[#222] mb-6 w-full justify-start h-10">
            <TabsTrigger value="timeline" className="text-sm data-[state=active]:bg-[#E3170A] data-[state=active]:text-white">
              Timeline ({entries.length})
            </TabsTrigger>
            <TabsTrigger value="reminders" className="text-sm data-[state=active]:bg-[#E3170A] data-[state=active]:text-white">
              Reminders {reminders.length > 0 && `(${reminders.length})`}
            </TabsTrigger>
          </TabsList>

          {/* Timeline */}
          <TabsContent value="timeline">
            {entries.length === 0 ? (
              <div className="bg-[#141414] border border-[#222] border-dashed p-12 text-center">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="font-medium mb-2">No health entries yet</h3>
                <p className="text-[#f5f5f5]/40 text-sm mb-5">
                  Start logging {pet.name}&apos;s health history.
                </p>
                <Link href={`/pets/${pet.id}/add`}>
                  <Button className="bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0">
                    Add First Entry
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {entries.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="bg-[#141414] border border-[#222] p-4 hover:border-[#333] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <EntryBadge type={entry.type as EntryType} size="sm" />
                          <span className="text-xs text-[#f5f5f5]/40">{formatDate(entry.date)}</span>
                        </div>
                        <p className="font-medium text-[#f5f5f5]">{entry.title}</p>
                        {entry.vet_name && (
                          <p className="text-sm text-[#f5f5f5]/40 mt-0.5">🩺 {entry.vet_name}</p>
                        )}
                        {entry.weight_kg && (
                          <p className="text-sm text-[#f5f5f5]/40 mt-0.5">⚖️ {entry.weight_kg} kg</p>
                        )}
                        {entry.notes && (
                          <p className="text-sm text-[#f5f5f5]/50 mt-2 leading-relaxed">{entry.notes}</p>
                        )}
                        {entry.next_due && (
                          <p className="text-xs text-[#F5A623] mt-2">
                            🔔 Next due: {formatDate(entry.next_due)} ({daysUntil(entry.next_due)})
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Reminders */}
          <TabsContent value="reminders">
            {reminders.length === 0 ? (
              <div className="bg-[#141414] border border-[#222] p-8 text-center">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="font-medium mb-1">All clear!</h3>
                <p className="text-[#f5f5f5]/40 text-sm">No upcoming reminders for {pet.name}.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {reminders
                  .sort((a, b) => (a.next_due! > b.next_due! ? 1 : -1))
                  .map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="bg-[#141414] border border-[#222] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <EntryBadge type={r.type as EntryType} size="sm" />
                          </div>
                          <p className="font-medium text-[#f5f5f5]">{r.title}</p>
                          <p className="text-xs text-[#f5f5f5]/40 mt-0.5">{formatDate(r.next_due!)}</p>
                        </div>
                        <span className="text-sm font-medium text-[#F5A623] flex-shrink-0">
                          {daysUntil(r.next_due!)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
