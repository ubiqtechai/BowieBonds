"use client";

import Link from "next/link";
import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";

const BENEFITS = [
  ["Interest on your loan", "Your funds are a performance-linked loan. You earn interest as a percentage of the incremental channel-wide YouTube revenue above the pre-campaign baseline — including cross-views to older content. Principal is repaid first."],
  ["Capped returns", "Every drop has a return cap (e.g. 1.5x or 2.0x). This bounds your interest but also clarifies the deal."],
  ["Full transparency", "OAuth-verified YouTube stats, Google Ads receipts with invoice numbers, monthly payout reports. You see everything."],
  ["Real people, real identities", "Every artist has a LinkedIn profile and verified YouTube channel. You know exactly who you're backing and what their track record looks like."],
];

const RISKS = [
  ["Total loss is possible", "If the YouTube ads don't generate uplift above baseline, your loan may not be repaid. This is not a guaranteed return."],
  ["Revenue depends on external factors", "YouTube algorithm changes, ad market fluctuations, audience behaviour — none of these are in anyone's control."],
  ["Artist default risk", "If an artist stops repaying the loan, enforcement is through platform exclusion and public record — not through courts. There's no repo man for music."],
  ["This is not a security", "ZiggyDust is a platform facilitator. Your funds are a performance-linked loan to the artist — not an equity stake, not a royalty purchase. We don't hold your money."],
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
          Loan funds for YouTube promotion of independent artists. Earn interest tied to campaign performance. See exactly where your money goes.
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
