"use client";

import Link from "next/link";
import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";

const BENEFITS = [
  ["Copyright-backed", "Your funds aren't just a promise. The artist grants an exclusive copyright license on the promoted video to the backer pool. If the artist defaults, you retain the license."],
  ["Revenue share on uplift", "You earn a percentage of the incremental channel-wide YouTube revenue above the pre-campaign baseline — including cross-views to older content. Your original license fee is recovered first."],
  ["Capped returns, then copyright reverts", "Every drop has a return cap (e.g. 1.5x or 2.0x). When you're made whole, the copyright automatically reverts to the artist. Clean exit."],
  ["Full transparency", "OAuth-verified YouTube stats, Google Ads receipts with invoice numbers, monthly payout reports. You see everything."],
];

const RISKS = [
  ["Total loss is possible", "If the YouTube ads don't generate uplift above baseline, your license fee may not be recovered. This is not a guaranteed return."],
  ["Revenue depends on external factors", "YouTube algorithm changes, ad market fluctuations, audience behaviour — none of these are in anyone's control."],
  ["Artist default risk", "If an artist stops making payments, you retain the copyright license — but monetising it independently may be difficult. Enforcement is through copyright retention and platform exclusion."],
  ["This is not an investment product", "ZiggyDust facilitates copyright licensing arrangements between artists and backers. This is a commercial IP transaction — not a loan, not equity, not a security. Consult your own legal and financial advisors."],
];

export default function BackersPage() {
  return (
    <div>
      <Section>
        <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-3">For Backers</Mono>
        <h1 className="text-4xl lg:text-[52px] font-bold leading-[0.95] tracking-tight mb-4">
          Back the music<br />you <em className="text-amber">believe in.</em>
        </h1>
        <p className="text-base text-ink-mid leading-relaxed max-w-xl">
          License an artist&apos;s copyright. Fund their YouTube promotion. Earn returns backed by the IP itself. Copyright reverts when you&apos;re made whole.
        </p>
      </Section>

      <Section dark>
        <h2 className="text-3xl font-bold text-bg mb-6">What you get</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BENEFITS.map(([t, d]) => (
            <div key={t}>
              <div className="text-base font-bold text-bg mb-1.5">{t}</div>
              <div className="text-[13px] text-ink-light leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold mb-5">The risks — plainly stated</h2>
        <div className="border-2 border-red p-5 lg:p-7 mt-5">
          {RISKS.map(([t, d], i) => (
            <div key={t} className={`${i < RISKS.length - 1 ? "mb-4 pb-4 border-b border-sand" : ""}`}>
              <div className="text-[15px] font-bold text-red mb-1">{t}</div>
              <div className="text-[13px] text-ink-mid leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
        <Link href="/signup">
          <Button size="lg" className="mt-8">Start backing</Button>
        </Link>
      </Section>
    </div>
  );
}
