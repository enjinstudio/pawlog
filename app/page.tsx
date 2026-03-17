"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: "💉",
    title: "Vaccines & Treatments",
    desc: "Log vaccinations and flea treatments with full history and next-due reminders.",
  },
  {
    icon: "🏥",
    title: "Vet Visits",
    desc: "Record every vet visit with notes, vet name, and what was discussed.",
  },
  {
    icon: "🔔",
    title: "Smart Reminders",
    desc: "Never miss a treatment. See upcoming reminders right on your dashboard.",
  },
  {
    icon: "📄",
    title: "Pet Passport",
    desc: "Share a public health passport with your vet, sitter, or kennel — no login needed.",
  },
  {
    icon: "⚖️",
    title: "Weight Tracking",
    desc: "Log weight over time and keep your dog on track with their health goals.",
  },
  {
    icon: "💊",
    title: "Medications",
    desc: "Track medications, dosages, and schedules for every furry family member.",
  },
];

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
          <span className="text-2xl">🐾</span>
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

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-8xl select-none">🐾</span>
          </motion.div>
          <h1
            className="text-5xl md:text-6xl font-semibold tracking-tight mb-5 leading-tight"
            style={{ color: "#2D2420" }}
          >
            Every tail has a story<br />
            <span style={{ color: "#FF6B8A" }}>worth keeping.</span>
          </h1>
          <p
            className="text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "#8C7B72", lineHeight: 1.7 }}
          >
            PawLog is the health journal for dog owners who care. Track every vet visit, vaccination,
            medication, and milestone — all in one beautifully simple app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <motion.button
                className="btn-primary text-base px-8"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                Start for Free 🐶
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-semibold mb-3" style={{ color: "#2D2420" }}>
            Everything your dog needs
          </h2>
          <p style={{ color: "#8C7B72" }}>Built for dog owners who take health seriously.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35, delay: i * 0.07, ...spring }}
              viewport={{ once: true }}
              className="card p-6"
              style={{ cursor: "default" }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-base mb-2" style={{ color: "#2D2420" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#8C7B72" }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <div
              className="text-xs font-semibold mb-2 uppercase tracking-widest"
              style={{ color: "#8C7B72" }}
            >
              Free
            </div>
            <div className="text-4xl font-semibold mb-1" style={{ color: "#2D2420" }}>
              $0
            </div>
            <div className="text-sm mb-8" style={{ color: "#C4B8B0" }}>
              Forever free
            </div>
            <ul className="space-y-3 mb-8 text-sm" style={{ color: "#8C7B72" }}>
              <li className="flex items-center gap-2">
                <span style={{ color: "#4CAF82" }}>✓</span> 1 pet profile
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#4CAF82" }}>✓</span> 20 health log entries
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#4CAF82" }}>✓</span> Public pet passport
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#4CAF82" }}>✓</span> Upcoming reminders
              </li>
            </ul>
            <Link href="/auth">
              <button className="btn-secondary w-full">Get Started</button>
            </Link>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="card p-8 relative overflow-hidden"
            style={{ borderColor: "#FF6B8A", borderWidth: "2px" }}
          >
            <div
              className="absolute top-4 right-4 text-xs px-2.5 py-0.5 rounded-full font-semibold"
              style={{ background: "#FF6B8A", color: "#fff" }}
            >
              POPULAR ✨
            </div>
            <div
              className="text-xs font-semibold mb-2 uppercase tracking-widest"
              style={{ color: "#FF6B8A" }}
            >
              Premium
            </div>
            <div className="text-4xl font-semibold mb-1" style={{ color: "#2D2420" }}>
              $2.99
            </div>
            <div className="text-sm mb-8" style={{ color: "#C4B8B0" }}>
              per month
            </div>
            <ul className="space-y-3 mb-8 text-sm" style={{ color: "#8C7B72" }}>
              <li className="flex items-center gap-2">
                <span style={{ color: "#FF6B8A" }}>✓</span> Unlimited pets
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#FF6B8A" }}>✓</span> Unlimited entries
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#FF6B8A" }}>✓</span> Photo uploads 📸
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#FF6B8A" }}>✓</span> Export health reports
              </li>
              <li className="flex items-center gap-2">
                <span style={{ color: "#FF6B8A" }}>✓</span> Priority support
              </li>
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
        </div>
      </section>

      {/* Meet Spock 🖖 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="card p-10 text-center max-w-lg mx-auto"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            className="text-5xl mb-4 inline-block"
          >
            🖖🐾
          </motion.div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: "#2D2420" }}>
            Meet Spock
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#8C7B72" }}>
            PawLog was built for Spock — a very good boy who inspired his owner to stop losing
            vaccination records. Live long and paw-sper, buddy. 🐕
          </p>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-4">🐶</div>
          <h2 className="text-3xl font-semibold mb-4" style={{ color: "#2D2420" }}>
            Start tracking today
          </h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: "#8C7B72" }}>
            Join thousands of dog owners keeping their pets healthy with PawLog.
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
            <span>🐾</span>
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
