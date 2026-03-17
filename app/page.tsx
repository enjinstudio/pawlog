"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PawPrint,
  HeartPulse,
  Syringe,
  CalendarPaw,
  Stethoscope,
  Shield,
  Star,
} from "@/app/components/PawIcons";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FEFCF8", color: "#2D2420" }}>
      {/* Nav */}
      <nav
        className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto"
        style={{ borderBottom: "1.5px solid #EBE7E0" }}
      >
        <div className="flex items-center gap-2">
          <PawPrint size={22} color="#FF6B8A" strokeWidth={2} />
          <span className="font-semibold text-lg tracking-tight" style={{ color: "#2D2420" }}>
            PawLog
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth">
            <Button variant="ghost" size="sm" style={{ color: "#8C7B72" }} className="hover:text-[#2D2420]">
              Sign In
            </Button>
          </Link>
          <Link href="/auth">
            <motion.button
              className="btn-primary text-sm"
              style={{ minHeight: 38, padding: "0 1.2rem" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Get Started Free
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero — split layout */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: copy */}
          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ background: "#FFF0F3", color: "#FF6B8A", border: "1.5px solid #FFD6DF" }}
            >
              <PawPrint size={12} color="#FF6B8A" strokeWidth={2} />
              Dog health made simple
            </div>
            <h1
              className="text-4xl md:text-5xl font-semibold tracking-tight mb-5 leading-tight"
              style={{ color: "#2D2420" }}
            >
              Your dog&apos;s whole<br />
              health story,{" "}
              <span style={{ color: "#FF6B8A" }}>in one place.</span>
            </h1>
            <p
              className="text-lg mb-10 max-w-md"
              style={{ color: "#8C7B72", lineHeight: 1.7 }}
            >
              Track every vet visit, vaccination, and milestone. Get reminders before they&apos;re due.
              Share a health passport with your vet in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <motion.button
                  className="btn-primary text-base px-8"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                >
                  Start for Free
                </motion.button>
              </Link>
              <Link href="/auth">
                <motion.button
                  className="btn-secondary text-base px-8"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring}
                >
                  See how it works →
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right: demo card */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 30, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ transformOrigin: "center" }}
          >
            <div
              className="w-80 rounded-2xl p-6"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 8px 40px rgba(45,36,32,0.12), 0 2px 8px rgba(45,36,32,0.06)",
                border: "1.5px solid #EBE7E0",
              }}
            >
              {/* Pet avatar + name */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #FF6B8A 0%, #F5A623 100%)",
                  }}
                >
                  🐕
                </div>
                <div>
                  <div className="font-bold text-lg" style={{ color: "#2D2420" }}>Buddy</div>
                  <div className="text-xs" style={{ color: "#8C7B72" }}>Golden Retriever · 3y 2m</div>
                </div>
              </div>

              {/* Stat chips */}
              <div className="space-y-2">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                  style={{ background: "#E8F8EF", color: "#2E7D52" }}
                >
                  <span style={{ fontSize: 14 }}>✓</span>
                  <span>Vaccines up to date</span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                  style={{ background: "#FEF3DC", color: "#92600A" }}
                >
                  <span style={{ fontSize: 14 }}>⚠</span>
                  <span>Flea treatment due in 3 days</span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                  style={{ background: "#EEF3FE", color: "#1E4FAB" }}
                >
                  <span style={{ fontSize: 14 }}>⚖</span>
                  <span>Last weight: 12.4 kg</span>
                </div>
              </div>

              {/* Mini footer */}
              <div
                className="mt-4 pt-4 text-xs text-center"
                style={{ borderTop: "1px solid #EBE7E0", color: "#C4B8B0" }}
              >
                Last updated today · PawLog
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature story blocks */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl font-semibold mb-3" style={{ color: "#2D2420" }}>
            Built for dogs like yours
          </h2>
          <p style={{ color: "#8C7B72" }}>Everything you need. Nothing you don&apos;t.</p>
        </motion.div>

        {/* Story Block 1 — Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Illustration */}
          <div className="flex-1">
            <div
              className="rounded-2xl p-6 max-w-sm mx-auto"
              style={{
                background: "#FFFBF0",
                border: "1.5px solid #F5E6C0",
                boxShadow: "0 4px 20px rgba(245,166,35,0.1)",
              }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#92600A" }}
              >
                Upcoming Reminders
              </div>
              {[
                { label: "Flea Treatment", due: "Due in 3 days", color: "#FEF3DC", text: "#92600A", icon: <Shield size={14} color="#92600A" strokeWidth={2} /> },
                { label: "Annual Vaccination", due: "Due in 12 days", color: "#E8F8EF", text: "#2E7D52", icon: <Syringe size={14} color="#2E7D52" strokeWidth={2} /> },
                { label: "Vet Checkup", due: "Due in 28 days", color: "#EEF3FE", text: "#1E4FAB", icon: <Stethoscope size={14} color="#1E4FAB" strokeWidth={2} /> },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg mb-2 text-xs font-medium"
                  style={{ background: r.color, color: r.text }}
                >
                  <div className="flex items-center gap-2">
                    {r.icon}
                    <span>{r.label}</span>
                  </div>
                  <span className="opacity-80">{r.due}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Copy */}
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "#FEF3DC", color: "#92600A" }}
            >
              <CalendarPaw size={12} color="#92600A" strokeWidth={2} />
              Reminders
            </div>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: "#2D2420" }}>
              Never miss a vaccination again
            </h3>
            <p style={{ color: "#8C7B72", lineHeight: 1.75 }}>
              Set reminders for vaccines, flea treatments, and vet checkups.
              PawLog shows you what&apos;s coming up so you can act before things are overdue — not after.
            </p>
          </div>
        </motion.div>

        {/* Story Block 2 — Passport */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row-reverse items-center gap-12"
        >
          {/* Illustration */}
          <div className="flex-1">
            <div
              className="rounded-2xl p-6 max-w-sm mx-auto"
              style={{
                background: "#F0F4FF",
                border: "1.5px solid #C8D8FF",
                boxShadow: "0 4px 20px rgba(91,156,246,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                  style={{ background: "linear-gradient(135deg, #5B9CF6 0%, #9B8FE8 100%)" }}
                >
                  🐕
                </div>
                <div>
                  <div className="font-bold" style={{ color: "#2D2420" }}>Max&apos;s Health Passport</div>
                  <div className="text-xs" style={{ color: "#8C7B72" }}>pawlog.app/passport/max</div>
                </div>
              </div>
              <div className="space-y-2 text-xs" style={{ color: "#4A5568" }}>
                {[
                  "Rabies Vaccine — Apr 2025",
                  "Bordetella — Jan 2025",
                  "Flea Treatment — Mar 2025",
                  "Annual Checkup — Feb 2025",
                ].map((entry) => (
                  <div
                    key={entry}
                    className="flex items-center gap-2 py-1.5 px-3 rounded"
                    style={{ background: "rgba(255,255,255,0.6)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#5B9CF6" }} />
                    {entry}
                  </div>
                ))}
              </div>
              <div
                className="mt-4 text-center text-xs py-2 rounded-lg font-semibold"
                style={{ background: "#5B9CF6", color: "#fff" }}
              >
                Share Link Copied ✓
              </div>
            </div>
          </div>
          {/* Copy */}
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "#EEF3FE", color: "#1E4FAB" }}
            >
              <HeartPulse size={12} color="#1E4FAB" strokeWidth={2} />
              Pet Passport
            </div>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: "#2D2420" }}>
              Share with your vet in seconds
            </h3>
            <p style={{ color: "#8C7B72", lineHeight: 1.75 }}>
              Generate a shareable health passport for your dog. One link — your vet, groomer, or
              kennel sees everything they need. No login required on their end.
            </p>
          </div>
        </motion.div>

        {/* Story Block 3 — Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center gap-12"
        >
          {/* Quote card */}
          <div className="flex-1">
            <div
              className="rounded-2xl p-8 max-w-sm mx-auto"
              style={{
                background: "#FFF5F7",
                border: "1.5px solid #FFD6DF",
                boxShadow: "0 4px 20px rgba(255,107,138,0.08)",
              }}
            >
              <div className="flex gap-1 mb-4">
                {[0,1,2,3,4].map((i) => (
                  <Star key={i} size={16} color="#FF6B8A" strokeWidth={2} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#2D2420", fontStyle: "italic" }}>
                &ldquo;I used to keep all of Max&apos;s records in a shoebox.
                Now everything&apos;s in one place and I can actually find it
                when the vet asks.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-base font-bold"
                  style={{ background: "#FF6B8A", color: "#fff" }}
                >
                  S
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "#2D2420" }}>Sarah</div>
                  <div className="text-xs" style={{ color: "#8C7B72" }}>QLD, Australia 🐾</div>
                </div>
              </div>
            </div>
          </div>
          {/* Copy */}
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "#FFF0F3", color: "#FF6B8A" }}
            >
              <PawPrint size={12} color="#FF6B8A" strokeWidth={2} />
              Real owners
            </div>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: "#2D2420" }}>
              Built for real dog owners
            </h3>
            <p style={{ color: "#8C7B72", lineHeight: 1.75 }}>
              No bloated features. No confusing dashboards. Just a clean, calm place
              to keep your dog&apos;s health organised — the way it should be.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Meet Spock easter egg */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-sm mx-auto"
        >
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "linear-gradient(135deg, #FFF5F7 0%, #FFFBF0 100%)",
              border: "1.5px solid #EBE7E0",
            }}
          >
            <motion.div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl"
              style={{
                background: "linear-gradient(135deg, #FF6B8A 0%, #F5A623 100%)",
              }}
              animate={{ rotate: [0, -5, 5, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            >
              🐕
            </motion.div>
            <div className="font-semibold text-sm mb-1" style={{ color: "#2D2420" }}>Spock</div>
            <p className="text-xs leading-relaxed" style={{ color: "#8C7B72" }}>
              PawLog was built for dogs like Spock 🖖<br />
              <span style={{ color: "#C4B8B0" }}>Our chief product tester.<br />Very opinionated about treat frequency.</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-semibold mb-3" style={{ color: "#2D2420" }}>
            Simple, honest pricing
          </h2>
          <p style={{ color: "#8C7B72" }}>Start free. Upgrade when you&apos;re ready.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0 }}
            viewport={{ once: true }}
            className="rounded-xl p-8"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #EBE7E0",
              boxShadow: "0 2px 12px rgba(45,36,32,0.06)",
            }}
          >
            <div className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#8C7B72" }}>
              Free
            </div>
            <div className="text-4xl font-semibold mb-1" style={{ color: "#2D2420" }}>$0</div>
            <div className="text-sm mb-8" style={{ color: "#C4B8B0" }}>Forever free</div>
            <ul className="space-y-3 mb-8 text-sm" style={{ color: "#8C7B72" }}>
              {["1 pet profile", "20 health entries", "Public pet passport", "Upcoming reminders"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <PawPrint size={14} color="#4CAF82" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/auth">
              <button className="btn-secondary w-full">Get Started</button>
            </Link>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            viewport={{ once: true }}
            className="rounded-xl p-8 relative overflow-hidden"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #EBE7E0",
              borderLeft: "4px solid #FF6B8A",
              boxShadow: "0 4px 24px rgba(255,107,138,0.12)",
              transform: "scale(1.02)",
            }}
          >
            <div
              className="absolute top-4 right-4 text-xs px-2.5 py-0.5 rounded-full font-semibold"
              style={{ background: "#FF6B8A", color: "#fff" }}
            >
              POPULAR
            </div>
            <div className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#FF6B8A" }}>
              Premium
            </div>
            <div className="text-4xl font-semibold mb-1" style={{ color: "#2D2420" }}>$2.99</div>
            <div className="text-sm mb-8" style={{ color: "#C4B8B0" }}>per month</div>
            <ul className="space-y-3 mb-8 text-sm" style={{ color: "#8C7B72" }}>
              {["Unlimited pets", "Unlimited entries", "Photo uploads", "Export health reports", "Priority support"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <PawPrint size={14} color="#FF6B8A" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/auth">
              <motion.button
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                Start Free Trial
              </motion.button>
            </Link>
          </motion.div>

          {/* Family */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            viewport={{ once: true }}
            className="rounded-xl p-8"
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #EBE7E0",
              boxShadow: "0 2px 12px rgba(45,36,32,0.06)",
            }}
          >
            <div className="text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#9B8FE8" }}>
              Family
            </div>
            <div className="text-4xl font-semibold mb-1" style={{ color: "#2D2420" }}>$6.99</div>
            <div className="text-sm mb-8" style={{ color: "#C4B8B0" }}>per month</div>
            <ul className="space-y-3 mb-8 text-sm" style={{ color: "#8C7B72" }}>
              {["Up to 5 pets", "All Premium features", "Shared family access", "Bulk export", "Dedicated support"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <PawPrint size={14} color="#9B8FE8" strokeWidth={2} />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/auth">
              <button className="btn-secondary w-full">Get Started</button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <PawPrint size={52} color="#FF6B8A" strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-3xl font-semibold mb-4" style={{ color: "#2D2420" }}>
            Start tracking today
          </h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: "#8C7B72" }}>
            Join dog owners who keep their pets healthy with PawLog.
          </p>
          <Link href="/auth">
            <motion.button
              className="btn-primary text-base px-10"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Create Free Account →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 mt-4" style={{ borderTop: "1.5px solid #EBE7E0" }}>
        <div
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
          style={{ color: "#C4B8B0" }}
        >
          <div className="flex items-center gap-2">
            <PawPrint size={14} color="#C4B8B0" strokeWidth={2} />
            <span>PawLog — Dog Health Journal</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/auth" className="hover:text-[#8C7B72] transition-colors">
              Sign In
            </Link>
            <span title="Spock was here 🖖" className="cursor-default">
              Meet Spock 🖖🐾
            </span>
          </div>
          <div>© 2025 PawLog. Made with ❤️ for dogs.</div>
        </div>
      </footer>
    </div>
  );
}
