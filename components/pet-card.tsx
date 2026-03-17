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
        <motion.div
          className="relative group cursor-pointer rounded-xl overflow-hidden"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Gradient border overlay on hover */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #FF6B8A, #F5A623)",
              padding: "1.5px",
            }}
          />
          <div
            className="relative p-5 rounded-xl transition-all"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #EBE7E0",
              margin: "1.5px",
            }}
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {pet.photo_url ? (
                  <img
                    src={pet.photo_url}
                    alt={pet.name}
                    className="w-14 h-14 object-cover rounded-full"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{
                      background: "linear-gradient(135deg, #FF6B8A20 0%, #F5A62320 100%)",
                      border: "1.5px solid #FF6B8A30",
                      color: "#FF6B8A",
                    }}
                  >
                    {initials}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3
                    className="font-semibold transition-colors truncate"
                    style={{ color: "#2D2420" }}
                  >
                    {pet.name}
                  </h3>
                  {pet.gender && pet.gender !== "unknown" && (
                    <span className="text-xs" style={{ color: "#C4B8B0" }}>{genderEmoji[pet.gender]}</span>
                  )}
                </div>
                {pet.breed && (
                  <p className="text-sm truncate" style={{ color: "#8C7B72" }}>{pet.breed}</p>
                )}
                <div className="flex items-center gap-3 mt-1">
                  {age && <span className="text-xs" style={{ color: "#C4B8B0" }}>{age}</span>}
                  {pet.weight_kg && (
                    <span className="text-xs" style={{ color: "#C4B8B0" }}>{pet.weight_kg} kg</span>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div
                className="flex-shrink-0 transition-colors group-hover:text-[#FF6B8A]"
                style={{ color: "#C4B8B0" }}
              >
                →
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
