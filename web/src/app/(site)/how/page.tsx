"use client";

import Link from "next/link";
import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    n: "01",
    t: "Artiste creates a drop",
    dark: false,
    items: [
      "Upload your YouTube video link and connect via OAuth",
      "Set your total budget",
      "Put in your co-pay — minimum 20% of budget",
      "Set backer terms: revenue share %, return cap, license period, minimum ticket size",
      "Your co-pay goes into the Lockbox first — you eat before backers do",
      "One active drop per artiste at a time",
    ],
  },
  {
    n: "02",
    t: "Backers license the copyright",
    dark: true,
    items: [
      "Browse live drops — see artiste profiles, YouTube stats (OAuth-verified), and terms",
      "Every backer has a mandatory LinkedIn profile — real people only",
      "Back a drop and receive an exclusive copyright license on that specific promoted work only — not the artiste's channel or catalogue",
      "Your funds go into the Lockbox and can only become YouTube ads",
      "See who else is backing — full Backer Wall with names, LinkedIn, track records",
      "Once the goal is hit, the drop goes live",
    ],
  },
  {
    n: "03",
    t: "Ads deploy to YouTube",
    dark: false,
    items: [
      "Lockbox funds are released exclusively to Google Ads",
      "Pre-roll, discovery, Shorts — all YouTube ad formats",
      "Every deployment tracked: spend, impressions, views, CTR",
      "Google Ads invoice references visible to all backers",
      "Zero discretion — the money can only become ads for this specific video",
    ],
  },
  {
    n: "04",
    t: "Revenue flows, copyright reverts",
    dark: true,
    items: [
      "Channel-wide YouTube AdSense revenue tracked via OAuth API — daily",
      "Baseline established: 30-day channel average before campaign launch",
      "Only incremental uplift above baseline counts — including cross-views to older content",
      "Backer's original license fee is recovered first, then revenue share flows monthly",
      "When cap is hit or license period expires, copyright on the work automatically reverts to the artiste",
      "If artiste defaults, backers retain the exclusive copyright license on that specific work",
    ],
  },
];

export default function HowPage() {
  return (
    <div>
      <Section>
        <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-3">
          The Mechanics
        </Mono>
        <h1 className="text-4xl lg:text-[52px] font-bold leading-[0.95] tracking-tight mb-4">
          How It Works
        </h1>
        <p className="text-base text-ink-mid leading-relaxed max-w-xl">
          Four steps. Artiste creates, backers license, ads deploy, copyright reverts.
        </p>
      </Section>

      {STEPS.map((s) => (
        <Section key={s.n} dark={s.dark}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-start">
            <div className="shrink-0">
              <Mono className="text-5xl lg:text-[56px] font-bold text-amber">
                {s.n}
              </Mono>
            </div>
            <div className="flex-1">
              <div
                className={`text-2xl lg:text-[28px] font-bold mb-5 ${
                  s.dark ? "text-bg" : "text-ink"
                }`}
              >
                {s.t}
              </div>
              {s.items.map((item, j) => (
                <div
                  key={j}
                  className={`flex gap-3 mb-2.5 text-base leading-relaxed ${
                    s.dark ? "text-ink-light" : "text-ink-mid"
                  }`}
                >
                  <Mono className="text-amber shrink-0">→</Mono>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Convinced?</h2>
          <p className="text-base text-ink-mid">
            Join as an artiste or a backer.
          </p>
          <Link href="/signup">
            <Button size="lg" className="mt-6">
              Sign Up
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
