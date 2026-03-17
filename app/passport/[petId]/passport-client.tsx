"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { EntryBadge } from "@/components/entry-badge";
import { type Pet, type HealthEntry, type EntryType } from "@/lib/types";

interface PassportClientProps {
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
  if (totalMonths < 1) return "< 1 month";
  if (totalMonths < 12) return `${totalMonths} months`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  return m > 0 ? `${y} years, ${m} months` : `${y} year${y !== 1 ? "s" : ""}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric", month: "long", year: "numeric"
  });
}

export function PassportClient({ pet, entries }: PassportClientProps) {
  const age = getAge(pet.dob);
  const initials = pet.name.slice(0, 2).toUpperCase();

  const vaccinations = entries.filter((e) => e.type === "vaccination");
  const medications = entries.filter((e) => e.type === "medication" || e.type === "worming" || e.type === "flea_treatment");
  const vetVisits = entries.filter((e) => e.type === "vet_visit").slice(0, 5);
  const weights = entries
    .filter((e) => e.type === "weight" && e.weight_kg)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Passport header */}
      <div className="bg-[#141414] border-b border-[#222]">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="flex items-center gap-2 text-[#f5f5f5]/40 text-sm mb-4">
            <span>🐾</span>
            <span>PawLog</span>
            <span>/</span>
            <span>Pet Passport</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-5"
          >
            {/* Pet photo or initials */}
            {pet.photo_url ? (
              <img src={pet.photo_url} alt={pet.name} className="w-20 h-20 object-cover border border-[#333]" />
            ) : (
              <div className="w-20 h-20 bg-[#F5A623]/20 border border-[#F5A623]/40 flex items-center justify-center text-[#F5A623] font-bold text-2xl flex-shrink-0">
                {initials}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[#E3170A] font-medium uppercase tracking-widest">Pet Passport</span>
              </div>
              <h1 className="text-3xl font-bold mb-1">{pet.name}</h1>
              {pet.breed && <p className="text-[#f5f5f5]/50 text-lg mb-2">{pet.breed}</p>}
              <div className="flex flex-wrap gap-4 text-sm text-[#f5f5f5]/40">
                {age && <span>🎂 {age} old</span>}
                {pet.gender && pet.gender !== "unknown" && (
                  <span>{pet.gender === "male" ? "♂️ Male" : "♀️ Female"}</span>
                )}
                {pet.dob && <span>Born {formatDate(pet.dob)}</span>}
                {pet.weight_kg && <span>⚖️ {pet.weight_kg} kg</span>}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Vaccinations */}
        <Section title="Vaccinations" icon="💉" count={vaccinations.length}>
          {vaccinations.length === 0 ? (
            <Empty message="No vaccinations recorded." />
          ) : (
            <div className="space-y-2">
              {vaccinations.map((v, i) => (
                <EntryRow key={v.id} entry={v} index={i} />
              ))}
            </div>
          )}
        </Section>

        {/* Current Medications & Treatments */}
        <Section title="Medications & Treatments" icon="💊" count={medications.length}>
          {medications.length === 0 ? (
            <Empty message="No medications recorded." />
          ) : (
            <div className="space-y-2">
              {medications.map((m, i) => (
                <EntryRow key={m.id} entry={m} index={i} />
              ))}
            </div>
          )}
        </Section>

        {/* Vet Visits */}
        <Section title="Recent Vet Visits" icon="🩺" count={vetVisits.length}>
          {vetVisits.length === 0 ? (
            <Empty message="No vet visits recorded." />
          ) : (
            <div className="space-y-2">
              {vetVisits.map((v, i) => (
                <EntryRow key={v.id} entry={v} index={i} />
              ))}
            </div>
          )}
        </Section>

        {/* Weight History */}
        {weights.length > 0 && (
          <Section title="Weight History" icon="⚖️" count={weights.length}>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {weights.map((w) => (
                <div key={w.id} className="bg-[#0a0a0a] border border-[#222] p-3 text-center">
                  <div className="font-bold text-[#F5A623]">{w.weight_kg}kg</div>
                  <div className="text-xs text-[#f5f5f5]/40 mt-0.5">
                    {new Date(w.date).toLocaleDateString("en-AU", { month: "short", year: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#222] px-6 py-6 mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#f5f5f5]/30 text-sm mb-2">
            This passport is generated by PawLog
          </p>
          <Link href="/" className="inline-flex items-center gap-1.5 text-[#f5f5f5]/50 hover:text-[#f5f5f5] text-sm transition-colors">
            <span>🐾</span>
            <span>Powered by <strong>PawLog</strong> — Dog Health Journal</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

function Section({
  title,
  icon,
  count,
  children,
}: {
  title: string;
  icon: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span>{icon}</span>
        <h2 className="font-semibold text-[#f5f5f5]">{title}</h2>
        <span className="text-xs text-[#f5f5f5]/30 bg-[#141414] border border-[#222] px-1.5 py-0.5">
          {count}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

function EntryRow({ entry, index }: { entry: HealthEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      viewport={{ once: true }}
      className="bg-[#141414] border border-[#222] p-3"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <EntryBadge type={entry.type as EntryType} size="sm" />
            <span className="text-xs text-[#f5f5f5]/40">
              {new Date(entry.date).toLocaleDateString("en-AU", {
                day: "numeric", month: "short", year: "numeric"
              })}
            </span>
          </div>
          <p className="text-sm font-medium text-[#f5f5f5]">{entry.title}</p>
          {entry.vet_name && (
            <p className="text-xs text-[#f5f5f5]/40 mt-0.5">🩺 {entry.vet_name}</p>
          )}
          {entry.notes && (
            <p className="text-xs text-[#f5f5f5]/50 mt-1">{entry.notes}</p>
          )}
          {entry.next_due && (
            <p className="text-xs text-[#F5A623] mt-1">
              🔔 Next due: {new Date(entry.next_due).toLocaleDateString("en-AU", {
                day: "numeric", month: "short", year: "numeric"
              })}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Empty({ message }: { message: string }) {
  return (
    <div className="bg-[#141414] border border-[#222] p-4 text-center text-[#f5f5f5]/30 text-sm">
      {message}
    </div>
  );
}
