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
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <header className="border-b border-[#222] px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
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

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1 className="text-2xl font-bold mb-1">Settings</h1>
          <p className="text-[#f5f5f5]/40 text-sm mb-8">Manage your account and preferences.</p>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="bg-[#141414] border border-[#222] p-6"
        >
          <h2 className="font-semibold mb-4 text-[#f5f5f5]/80">Account</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#222]">
              <span className="text-sm text-[#f5f5f5]/60">Email</span>
              <span className="text-sm text-[#f5f5f5]">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#222]">
              <span className="text-sm text-[#f5f5f5]/60">Plan</span>
              <span className="text-sm text-[#f5f5f5]">Free</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[#f5f5f5]/60">Member since</span>
              <span className="text-sm text-[#f5f5f5]/60">
                {new Date(user.created_at).toLocaleDateString("en-AU", {
                  month: "long", year: "numeric"
                })}
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 border-[#333] text-[#f5f5f5]/60 hover:text-[#f5f5f5] hover:bg-[#1a1a1a]"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </motion.div>

        {/* Billing */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="bg-[#141414] border border-[#E3170A]/20 p-6"
        >
          <h2 className="font-semibold mb-2 text-[#f5f5f5]/80">Billing</h2>
          <p className="text-sm text-[#f5f5f5]/50 mb-4">
            You&apos;re on the free plan. Upgrade to Premium for unlimited pets, entries, and more.
          </p>
          <div className="bg-[#0a0a0a] border border-[#222] p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">PawLog Premium</div>
                <div className="text-sm text-[#f5f5f5]/40">Unlimited everything</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#E3170A]">$2.99<span className="text-sm font-normal text-[#f5f5f5]/40">/mo</span></div>
              </div>
            </div>
          </div>
          <Button
            className="bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0"
            onClick={() => setShowUpgrade(true)}
          >
            ✦ Upgrade to Premium
          </Button>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="bg-[#141414] border border-red-900/30 p-6"
        >
          <h2 className="font-semibold mb-2 text-red-400">Danger Zone</h2>
          <p className="text-sm text-[#f5f5f5]/50 mb-4">
            Permanently delete your account and all associated data. This cannot be undone.
          </p>
          <Button
            variant="outline"
            className="border-red-900/50 text-red-400 hover:bg-red-900/20 hover:border-red-700"
            onClick={handleDeleteAccount}
            disabled={deletingAccount}
          >
            Delete Account
          </Button>
        </motion.div>
      </main>

      <UpgradeModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
}
