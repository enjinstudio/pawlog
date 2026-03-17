"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: "🐾",
    title: "Multi-Pet Support",
    desc: "Manage health records for all your dogs in one place. Each pet gets their own profile.",
  },
  {
    icon: "📋",
    title: "Health Logs",
    desc: "Record vet visits, vaccinations, flea treatments, medications, and more with full history.",
  },
  {
    icon: "🔔",
    title: "Reminders",
    desc: "Never miss a treatment. Set next-due dates and see upcoming reminders on your dashboard.",
  },
  {
    icon: "📄",
    title: "Pet Passport",
    desc: "Share a public health passport with your vet, pet sitter, or kennel — no login required.",
  },
  {
    icon: "⚖️",
    title: "Weight Tracking",
    desc: "Log weight over time and keep your dog on track with their health goals.",
  },
  {
    icon: "📸",
    title: "Photo Timeline",
    desc: "Attach photos to health entries and watch your dog grow through their health journey.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Nav */}
      <nav className="border-b border-[#222] px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <span className="font-bold text-lg tracking-tight">PawLog</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth">
            <Button variant="ghost" size="sm" className="text-[#f5f5f5]/70 hover:text-[#f5f5f5]">
              Sign In
            </Button>
          </Link>
          <Link href="/auth">
            <Button size="sm" className="bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0">
              Get Started Free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-8xl"
            >
              🐶
            </motion.div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Your dog&apos;s health,<br />
            <span className="text-[#E3170A]">always within reach.</span>
          </h1>
          <p className="text-xl text-[#f5f5f5]/60 max-w-2xl mx-auto mb-10">
            PawLog is the health journal for dog owners who care. Track every vet visit, vaccination,
            medication, and milestone — all in one beautifully simple app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0 px-8 text-base h-12">
                Start for Free →
              </Button>
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
        >
          <h2 className="text-3xl font-bold text-center mb-3">Everything your dog needs</h2>
          <p className="text-[#f5f5f5]/50 text-center mb-14">Built for dog owners who take health seriously.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="bg-[#141414] border border-[#222] p-6 hover:border-[#333] transition-colors"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-[#f5f5f5]/50 text-sm leading-relaxed">{f.desc}</p>
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
        >
          <h2 className="text-3xl font-bold text-center mb-3">Simple pricing</h2>
          <p className="text-[#f5f5f5]/50 text-center mb-14">Start free. Upgrade when you&apos;re ready.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#141414] border border-[#222] p-8"
          >
            <div className="text-sm text-[#f5f5f5]/50 font-medium mb-2 uppercase tracking-widest">Free</div>
            <div className="text-4xl font-bold mb-1">$0</div>
            <div className="text-[#f5f5f5]/40 text-sm mb-8">Forever free</div>
            <ul className="space-y-3 mb-8 text-sm text-[#f5f5f5]/70">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 1 pet profile</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 20 health log entries</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Public pet passport</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Upcoming reminders</li>
            </ul>
            <Link href="/auth">
              <Button className="w-full border border-[#333] bg-transparent hover:bg-[#1a1a1a] text-[#f5f5f5]">
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Premium */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-[#141414] border border-[#E3170A]/40 p-8 relative"
          >
            <div className="absolute top-4 right-4 text-xs bg-[#E3170A] text-white px-2 py-0.5 font-medium">
              POPULAR
            </div>
            <div className="text-sm text-[#E3170A] font-medium mb-2 uppercase tracking-widest">Premium</div>
            <div className="text-4xl font-bold mb-1">$2.99</div>
            <div className="text-[#f5f5f5]/40 text-sm mb-8">per month</div>
            <ul className="space-y-3 mb-8 text-sm text-[#f5f5f5]/70">
              <li className="flex items-center gap-2"><span className="text-[#E3170A]">✓</span> Unlimited pets</li>
              <li className="flex items-center gap-2"><span className="text-[#E3170A]">✓</span> Unlimited entries</li>
              <li className="flex items-center gap-2"><span className="text-[#E3170A]">✓</span> Photo uploads</li>
              <li className="flex items-center gap-2"><span className="text-[#E3170A]">✓</span> Export health reports</li>
              <li className="flex items-center gap-2"><span className="text-[#E3170A]">✓</span> Priority support</li>
            </ul>
            <Link href="/auth">
              <Button className="w-full bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0">
                Start Free Trial
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-5xl mb-4">🐾</div>
          <h2 className="text-3xl font-bold mb-4">Start tracking today</h2>
          <p className="text-[#f5f5f5]/50 mb-8 max-w-md mx-auto">
            Join thousands of dog owners keeping their pets healthy with PawLog.
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0 px-10">
              Create Free Account →
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222] px-6 py-8 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[#f5f5f5]/40 text-sm">
          <div className="flex items-center gap-2">
            <span>🐾</span>
            <span>PawLog — Dog Health Journal</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/auth" className="hover:text-[#f5f5f5]/70 transition-colors">Sign In</Link>
            <span title="Spock was here 🖖" className="cursor-default">Meet Spock 🖖🐾</span>
          </div>
          <div>© 2024 PawLog. Made with ❤️ for dogs.</div>
        </div>
      </footer>
    </div>
  );
}
