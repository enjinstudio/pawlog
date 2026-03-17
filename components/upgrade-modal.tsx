"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#141414] border border-[#222] text-[#f5f5f5] max-w-md p-0 overflow-hidden">
        <div className="bg-[#E3170A]/10 border-b border-[#E3170A]/20 px-6 py-5">
          <DialogHeader>
            <div className="text-3xl mb-2">🚀</div>
            <DialogTitle className="text-xl font-bold text-[#f5f5f5]">
              PawLog Premium
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 py-5">
          <p className="text-[#f5f5f5]/60 text-sm mb-5">
            Premium is coming soon! Join the waitlist to get early access and 3 months free.
          </p>

          <div className="space-y-2.5 mb-6">
            {[
              "Unlimited pets & entries",
              "Photo uploads & timeline",
              "Export health reports (PDF)",
              "Email reminders",
              "Priority support",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 text-sm text-[#f5f5f5]/70">
                <span className="text-[#E3170A] font-bold">✓</span>
                {feature}
              </div>
            ))}
          </div>

          <div className="bg-[#0a0a0a] border border-[#222] p-4 mb-5">
            <div className="text-2xl font-bold mb-0.5">$2.99<span className="text-base font-normal text-[#f5f5f5]/40">/mo</span></div>
            <div className="text-xs text-[#f5f5f5]/40">Billed monthly. Cancel anytime.</div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full bg-[#E3170A] hover:bg-[#E3170A]/90 text-white border-0"
              onClick={() => {
                alert("Premium coming soon! We'll notify you when it launches.");
                onClose();
              }}
            >
              Join Waitlist — Get 3 Months Free
            </Button>
            <Button
              variant="ghost"
              className="w-full text-[#f5f5f5]/40 hover:text-[#f5f5f5]/70"
              onClick={onClose}
            >
              Maybe later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
