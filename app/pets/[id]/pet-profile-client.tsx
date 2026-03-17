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

function getReminderBadge(dateStr: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { background: "#FEE7E7", color: "#C53030" };
  if (diff <= 7) return { background: "#FEF3DC", color: "#92600A" };
  return { background: "#E8F8EF", color: "#2E7D52" };
}

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export function PetProfileClient({ pet, entries }: PetProfileClientProps) {
  const today = new Date().toISOString().split("T")[0];
  const reminders = entries.filter((e) => e.next_due && e.next_due >= today);
  const initials = pet.name.slice(0, 2).toUpperCase();
  const age = getAge(pet.dob);

  const copyPassportLink = () => {
    const url = `${window.location.origin}/passport/${pet.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Passport link copied! 📋");
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#FEFCF8", color: "#2D2420" }}>
      {/* Header */}
      <header
        className="px-6 py-4"
        style={{ borderBottom: "1.5px solid #EBE7E0", background: "#FFFFFF" }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Pet header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ...spring }}
          className="card p-6 mb-6"
          style={{ background: "#FFFFFF" }}
        >
          <div className="flex items-start gap-5">
            {/* Avatar */}
            {pet.photo_url ? (
              <img
                src={pet.photo_url}
                alt={pet.name}
                className="w-20 h-20 object-cover flex-shrink-0"
                style={{ borderRadius: "50%", border: "3px solid #EBE7E0" }}
              />
            ) : (
              <motion.div
                className="w-20 h-20 flex items-center justify-center font-bold text-2xl flex-shrink-0"
                style={{
                  borderRadius: "50%",
                  background: "#FFF0F3",
                  border: "3px solid #FFD6E0",
                  color: "#FF6B8A",
                }}
                whileHover={{ scale: 1.05 }}
                transition={spring}
              >
                {initials}
              </motion.div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-2xl font-semibold" style={{ color: "#2D2420" }}>
                  {pet.name}
                </h1>
                {pet.gender && pet.gender !== "unknown" && (
                  <span className="text-sm" style={{ color: "#8C7B72" }}>
                    {pet.gender === "male" ? "♂️ Male" : "♀️ Female"}
                  </span>
                )}
              </div>
              {pet.breed && (
                <p className="mb-2" style={{ color: "#8C7B72" }}>{pet.breed}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#8C7B72" }}>
                {age && <span>🎂 {age}</span>}
                {pet.dob && <span>{formatDate(pet.dob)}</span>}
                {pet.weight_kg && <span>⚖️ {pet.weight_kg} kg</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-shrink-0">
              <Link href={`/pets/${pet.id}/add`}>
                <motion.button
                  className="btn-primary text-xs"
                  style={{ minHeight: 36, padding: "0 1rem" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={spring}
                >
                  + Add Entry
                </motion.button>
              </Link>
              <motion.button
                className="btn-secondary text-xs"
                style={{ minHeight: 36, padding: "0 1rem" }}
                onClick={copyPassportLink}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={spring}
              >
                📄 Share Passport
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="timeline">
          <TabsList
            className="mb-6 w-full justify-start h-11"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #EBE7E0",
              borderRadius: 12,
            }}
          >
            <TabsTrigger
              value="timeline"
              className="text-sm rounded-lg data-[state=active]:text-white"
              style={{ borderRadius: 8 }}
            >
              Timeline ({entries.length})
            </TabsTrigger>
            <TabsTrigger
              value="reminders"
              className="text-sm rounded-lg data-[state=active]:text-white"
              style={{ borderRadius: 8 }}
            >
              Reminders {reminders.length > 0 && `(${reminders.length})`}
            </TabsTrigger>
          </TabsList>

          {/* Timeline */}
          <TabsContent value="timeline">
            {entries.length === 0 ? (
              <div
                className="card p-12 text-center"
                style={{ background: "#FEFCF8", border: "2px dashed #EBE7E0" }}
              >
                <div className="text-4xl mb-3">📋</div>
                <h3 className="font-semibold mb-2" style={{ color: "#2D2420" }}>
                  No health entries yet
                </h3>
                <p className="text-sm mb-5" style={{ color: "#8C7B72" }}>
                  Start logging {pet.name}&apos;s health history.
                </p>
                <Link href={`/pets/${pet.id}/add`}>
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={spring}
                  >
                    Add First Entry 🐾
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {entries.map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04, ...spring }}
                    whileHover={{ y: -1 }}
                    className="card p-4"
                    style={{ background: "#FFFFFF" }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <EntryBadge type={entry.type as EntryType} size="sm" />
                          <span className="text-xs" style={{ color: "#C4B8B0" }}>
                            {formatDate(entry.date)}
                          </span>
                        </div>
                        <p className="font-medium" style={{ color: "#2D2420" }}>
                          {entry.title}
                        </p>
                        {entry.vet_name && (
                          <p className="text-sm mt-0.5" style={{ color: "#8C7B72" }}>
                            🩺 {entry.vet_name}
                          </p>
                        )}
                        {entry.weight_kg && (
                          <p className="text-sm mt-0.5" style={{ color: "#8C7B72" }}>
                            ⚖️ {entry.weight_kg} kg
                          </p>
                        )}
                        {entry.notes && (
                          <p
                            className="text-sm mt-2 leading-relaxed"
                            style={{ color: "#8C7B72" }}
                          >
                            {entry.notes}
                          </p>
                        )}
                        {entry.next_due && (
                          <p
                            className="text-xs mt-2 font-medium"
                            style={{ color: "#92600A" }}
                          >
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
              <div className="card p-8 text-center" style={{ background: "#FFFFFF" }}>
                <div className="text-3xl mb-3">✅</div>
                <h3 className="font-semibold mb-1" style={{ color: "#2D2420" }}>All clear!</h3>
                <p className="text-sm" style={{ color: "#8C7B72" }}>
                  No upcoming reminders for {pet.name}.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {reminders
                  .sort((a, b) => (a.next_due! > b.next_due! ? 1 : -1))
                  .map((r, i) => {
                    const badgeStyle = getReminderBadge(r.next_due!);
                    return (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.04, ...spring }}
                        whileHover={{ y: -1 }}
                        className="card p-4"
                        style={{ background: "#FFFFFF" }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <EntryBadge type={r.type as EntryType} size="sm" />
                            </div>
                            <p className="font-medium" style={{ color: "#2D2420" }}>
                              {r.title}
                            </p>
                            <p className="text-xs mt-0.5" style={{ color: "#C4B8B0" }}>
                              {formatDate(r.next_due!)}
                            </p>
                          </div>
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
                            style={badgeStyle}
                          >
                            {daysUntil(r.next_due!)}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
