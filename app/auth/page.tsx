"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { toast } from "sonner";

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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl">🐾</span>
            <span className="font-bold text-xl tracking-tight">PawLog</span>
          </Link>
        </div>

        <div className="bg-[#141414] border border-[#222] p-8">
          {!sent ? (
            <>
              <h1 className="text-2xl font-bold mb-2">Sign in to PawLog</h1>
              <p className="text-[#f5f5f5]/50 text-sm mb-8">
                Enter your email and we&apos;ll send you a magic link to sign in instantly.
                No password needed.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#f5f5f5]/70 text-sm">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#0a0a0a] border-[#333] text-[#f5f5f5] placeholder:text-[#f5f5f5]/30 focus:border-[#E3170A] focus:ring-[#E3170A]/20 h-11"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0 h-11"
                  disabled={loading || !email.trim()}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Magic Link →"
                  )}
                </Button>
              </form>

              <p className="text-center text-[#f5f5f5]/30 text-xs mt-6">
                By signing in, you agree to our terms of service.
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-4"
            >
              <div className="text-5xl mb-4">📬</div>
              <h2 className="text-2xl font-bold mb-3">Check your email</h2>
              <p className="text-[#f5f5f5]/50 text-sm mb-6">
                We&apos;ve sent a magic link to <span className="text-[#f5f5f5]">{email}</span>.
                Click the link to sign in — no password needed.
              </p>
              <p className="text-[#f5f5f5]/30 text-xs">
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  onClick={() => setSent(false)}
                  className="text-[#E3170A] hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </motion.div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-[#f5f5f5]/30 hover:text-[#f5f5f5]/60 text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
