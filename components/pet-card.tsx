"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type Pet } from "@/lib/types";

interface PetCardProps {
  pet: Pet;
  index?: number;
}

function getAge(dob?: string): string {
  if (!dob) return "";
  const birth = new Date(dob);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  const totalMonths = years * 12 + months;

  if (totalMonths < 1) return "< 1 month old";
  if (totalMonths < 12) return `${totalMonths} month${totalMonths !== 1 ? "s" : ""} old`;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (m === 0) return `${y} year${y !== 1 ? "s" : ""} old`;
  return `${y}y ${m}m old`;
}

const genderEmoji: Record<string, string> = {
  male: "♂️",
  female: "♀️",
  unknown: "⚬",
};

export function PetCard({ pet, index = 0 }: PetCardProps) {
  const initials = pet.name.slice(0, 2).toUpperCase();
  const age = getAge(pet.dob);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      <Link href={`/pets/${pet.id}`}>
        <div className="bg-[#141414] border border-[#222] p-5 hover:border-[#333] hover:bg-[#181818] transition-all group cursor-pointer">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {pet.photo_url ? (
                <img
                  src={pet.photo_url}
                  alt={pet.name}
                  className="w-14 h-14 object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-[#F5A623]/20 border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623] font-bold text-lg">
                  {initials}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-[#f5f5f5] group-hover:text-white transition-colors truncate">
                  {pet.name}
                </h3>
                {pet.gender && pet.gender !== "unknown" && (
                  <span className="text-xs text-[#f5f5f5]/40">{genderEmoji[pet.gender]}</span>
                )}
              </div>
              {pet.breed && (
                <p className="text-sm text-[#f5f5f5]/50 truncate">{pet.breed}</p>
              )}
              <div className="flex items-center gap-3 mt-1">
                {age && <span className="text-xs text-[#f5f5f5]/40">{age}</span>}
                {pet.weight_kg && (
                  <span className="text-xs text-[#f5f5f5]/40">{pet.weight_kg} kg</span>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className="text-[#f5f5f5]/20 group-hover:text-[#E3170A] transition-colors flex-shrink-0">
              →
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
