"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { toast } from "sonner";
import { PawPrint } from "@/app/components/PawIcons";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        setSent(true);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#FEFCF8" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ...spring }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-3 mb-2">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <PawPrint size={80} color="#FF6B8A" strokeWidth={1.2} />
            </motion.div>
            <span className="font-bold text-2xl tracking-tight" style={{ color: "#2D2420" }}>
              PawLog
            </span>
          </Link>
          <p className="text-sm mt-1" style={{ color: "#8C7B72" }}>
            Your dog&apos;s health records, always with you.
          </p>
        </div>

        <div
          className="p-8"
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #EBE7E0",
            borderRadius: 20,
            boxShadow: "0 4px 24px rgba(45,36,32,0.08)",
          }}
        >
          {!sent ? (
            <>
              <h1 className="text-2xl font-semibold mb-2" style={{ color: "#2D2420" }}>
                Welcome to PawLog
              </h1>
              <p className="text-sm mb-8" style={{ color: "#8C7B72", lineHeight: 1.6 }}>
                Enter your email to get started. We&apos;ll send you a magic link — no password needed.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#8C7B72" }}
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl"
                    style={{
                      background: "#FEFCF8",
                      border: "1.5px solid #EBE7E0",
                      color: "#2D2420",
                      fontSize: 15,
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary w-full"
                  style={{ height: 48, fontSize: 15 }}
                  disabled={loading || !email.trim()}
                  whileHover={!loading && email.trim() ? { scale: 1.02 } : {}}
                  whileTap={!loading && email.trim() ? { scale: 0.97 } : {}}
                  transition={spring}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send magic link 🪄"
                  )}
                </motion.button>
              </form>

              <div
                className="flex items-center gap-2 mt-5 px-4 py-3 rounded-xl text-xs"
                style={{ background: "#F5F7FF", color: "#6B7280" }}
              >
                <span>🔒</span>
                <span>We&apos;ll send a secure magic link. No password needed.</span>
              </div>

              <p className="text-center text-xs mt-4" style={{ color: "#C4B8B0" }}>
                By signing in, you agree to our terms of service.
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ...spring }}
              className="text-center py-4"
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                📬
              </motion.div>
              <h2 className="text-2xl font-semibold mb-3" style={{ color: "#2D2420" }}>
                Check your email!
              </h2>
              <p className="text-sm mb-6" style={{ color: "#8C7B72", lineHeight: 1.6 }}>
                We&apos;ve sent a magic link to{" "}
                <span style={{ color: "#2D2420", fontWeight: 500 }}>{email}</span>.
                Click the link to sign in — no password needed.
              </p>
              <p className="text-xs" style={{ color: "#C4B8B0" }}>
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  onClick={() => setSent(false)}
                  className="hover:underline font-medium"
                  style={{ color: "#FF6B8A" }}
                >
                  try again
                </button>
                .
              </p>
            </motion.div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: "#C4B8B0" }}
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
