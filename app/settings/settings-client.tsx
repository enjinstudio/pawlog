"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UpgradeModal } from "@/components/upgrade-modal";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

interface SettingsClientProps {
  user: User;
}

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export function SettingsClient({ user }: SettingsClientProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone and will delete all your pets and health records.")) {
      return;
    }
    if (!confirm("This is permanent. All data will be lost. Continue?")) {
      return;
    }

    setDeletingAccount(true);
    toast.info("Account deletion requested. Contact support to complete.");
    setDeletingAccount(false);
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

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ...spring }}
        >
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "#2D2420" }}>
            Settings ⚙️
          </h1>
          <p className="text-sm mb-8" style={{ color: "#8C7B72" }}>
            Manage your account and preferences.
          </p>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ...spring }}
          className="card p-6"
          style={{ background: "#FFFFFF" }}
        >
          <h2 className="font-semibold mb-4" style={{ color: "#2D2420" }}>Account</h2>
          <div className="space-y-3">
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderBottom: "1.5px solid #EBE7E0" }}
            >
              <span className="text-sm" style={{ color: "#8C7B72" }}>Email</span>
              <span className="text-sm font-medium" style={{ color: "#2D2420" }}>{user.email}</span>
            </div>
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderBottom: "1.5px solid #EBE7E0" }}
            >
              <span className="text-sm" style={{ color: "#8C7B72" }}>Plan</span>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{ background: "#E8F8EF", color: "#2E7D52" }}
              >
                Free
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm" style={{ color: "#8C7B72" }}>Member since</span>
              <span className="text-sm" style={{ color: "#C4B8B0" }}>
                {new Date(user.created_at).toLocaleDateString("en-AU", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <motion.button
            className="btn-secondary mt-5 text-sm"
            style={{ minHeight: 40, padding: "0 1.2rem" }}
            onClick={handleSignOut}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            Sign Out
          </motion.button>
        </motion.div>

        {/* Billing */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ...spring }}
          className="card p-6"
          style={{ background: "#FFFFFF", borderColor: "#FF6B8A", borderWidth: "1.5px" }}
        >
          <h2 className="font-semibold mb-2" style={{ color: "#2D2420" }}>Billing ✨</h2>
          <p className="text-sm mb-4" style={{ color: "#8C7B72", lineHeight: 1.6 }}>
            You&apos;re on the free plan. Upgrade to Premium for unlimited pets, entries, and more.
          </p>
          <div
            className="p-4 mb-4 rounded-xl"
            style={{ background: "#FFF0F3", border: "1.5px solid #FFD6E0" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold" style={{ color: "#2D2420" }}>PawLog Premium</div>
                <div className="text-sm" style={{ color: "#8C7B72" }}>Unlimited everything 🐾</div>
              </div>
              <div className="text-right">
                <div className="font-bold" style={{ color: "#FF6B8A" }}>
                  $2.99
                  <span className="text-sm font-normal" style={{ color: "#8C7B72" }}>/mo</span>
                </div>
              </div>
            </div>
          </div>
          <motion.button
            className="btn-primary"
            onClick={() => setShowUpgrade(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            ✦ Upgrade to Premium
          </motion.button>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15, ...spring }}
          className="card p-6"
          style={{ background: "#FFFFFF", borderColor: "#FECACA", borderWidth: "1.5px" }}
        >
          <h2 className="font-semibold mb-2" style={{ color: "#C53030" }}>Danger Zone</h2>
          <p className="text-sm mb-4" style={{ color: "#8C7B72", lineHeight: 1.6 }}>
            Permanently delete your account and all associated data. This cannot be undone.
          </p>
          <motion.button
            className="rounded-full px-5 text-sm font-semibold transition-colors"
            style={{
              minHeight: 40,
              background: "#FEE7E7",
              color: "#C53030",
              border: "1.5px solid #FECACA",
            }}
            onClick={handleDeleteAccount}
            disabled={deletingAccount}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            Delete Account
          </motion.button>
        </motion.div>
      </main>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}
