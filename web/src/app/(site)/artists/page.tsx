"use client";

import Link from "next/link";
import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";

const REQUIREMENTS = [
  { t: "YouTube Partner Program", d: "Active monetisation on your channel. We verify via OAuth — no self-reporting." },
  { t: "A release to promote", d: "One video per drop, one active drop at a time. Could be a single, EP track, music video, lyric video — anything on YouTube." },
  { t: "20% co-pay", d: "You put in at least 20% of the budget. First-in, first-loss. This is your skin in the game." },
  { t: "LinkedIn profile", d: "Real identity required. Your backers can see you. You can see them." },
  { t: "Revenue share terms", d: "You decide: what % of uplift, what cap (e.g. 1.5x), what tenor (e.g. 6 months). You set the deal." },
  { t: "Google Ads account", d: "You need a verified Google Ads account. This is where the lockbox funds deploy to." },
];

export default function ArtistsPage() {
  return (
    <div>
      <Section>
        <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-3">For Artists</Mono>
        <h1 className="text-4xl lg:text-[52px] font-bold leading-[0.95] tracking-tight mb-4">
          Get your music<br /><em className="text-amber">heard.</em>
        </h1>
        <p className="text-base text-ink-mid leading-relaxed max-w-xl">
          You&apos;ve made something great. Now it needs ears. ZiggyDust funds YouTube promotion for your release — backed by people who believe in your sound.
        </p>
      </Section>

      <Section dark>
        <h2 className="text-3xl font-bold text-bg mb-6">What you need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-2 border-ink-mid">
          {REQUIREMENTS.map((s, i) => (
            <div key={i} className={`p-5 ${i % 3 < 2 ? "sm:border-r border-ink-mid" : ""} ${i < 3 ? "border-b border-ink-mid" : ""}`}>
              <div className="text-[15px] font-bold text-bg mb-1.5">{s.t}</div>
              <div className="text-[13px] text-ink-light leading-relaxed">{s.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold mb-5">What you keep</h2>
        <div className="text-[15px] leading-loose text-ink-mid max-w-xl space-y-3">
          <p><strong className="text-ink">Your rights.</strong> ZiggyDust never touches your IP. No licence transfers, no ownership changes, no creative control.</p>
          <p><strong className="text-ink">Your revenue above the share.</strong> After backers get their cut of the uplift, everything else is yours.</p>
          <p><strong className="text-ink">Your relationship with fans.</strong> Backers are music people — producers, fellow musicians, supporters. They&apos;re your community, not distant financiers.</p>
          <p><strong className="text-ink">Your freedom.</strong> Once cap is hit or tenor expires, you&apos;re done. No ongoing obligations.</p>
        </div>
        <Link href="/signup">
          <Button size="lg" className="mt-8">Create your first drop</Button>
        </Link>
      </Section>
    </div>
  );
}
