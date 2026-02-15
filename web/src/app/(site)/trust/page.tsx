"use client";

import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";

const LAYERS = [
  {
    t: "Copyright as Collateral",
    why: "Promises are easy. Putting your intellectual property on the line is not. When an artiste licenses the copyright on a specific promoted work to the backer pool, they're staking the one thing that matters most — that creative work. The license covers only that one work, not the channel or catalogue. This is the enforcement mechanism: if an artiste defaults, backers retain the exclusive copyright license on that work.",
    how: "Artiste grants an exclusive license on the specific promoted work's copyright — and only that work — to the backer pool at drop creation. License persists for the campaign period. Reverts automatically when backers are made whole (cap hit or license period expiry). On default, backers retain the license on the work.",
  },
  {
    t: "Mandatory LinkedIn",
    why: "Anonymous money creates bad incentives. When everyone is a real person with a real professional reputation, behaviour changes. You don't stiff someone whose LinkedIn you can see.",
    how: "LinkedIn URL required at signup. Displayed on Backer Wall and Artiste profiles. Clickable links — full transparency.",
  },
  {
    t: "YouTube OAuth (read-only)",
    why: "Self-reported numbers are meaningless. If an artiste says they have 50K subscribers, you should be able to verify that. If they say their daily revenue is $20, you should see the API data.",
    how: "Artiste connects YouTube via OAuth during signup. We pull subscriber count, total views, monthly views, channel age. Revenue data tracked daily. All read-only — we can't touch their channel.",
  },
  {
    t: "The Lockbox",
    why: "Trust in money handling is the hardest problem. Our solution: we don't handle money. The lockbox is an escrow that can only release funds to a verified Google Ads account. No personal transfers. No withdrawals.",
    how: "Funds go in from artiste co-pay and backers. Funds come out only as Google Ads deployments. Every deployment generates a receipt with Google invoice reference, impressions, views, CTR.",
  },
  {
    t: "20% artiste co-pay",
    why: "If someone asks you to fund their promotion but won't put their own money in, that's a red flag. The 20% minimum co-pay ensures the artiste has genuine skin in the game — and it's first-in, first-loss.",
    how: "Enforced at drop creation. Cannot submit with less than 20%. Displayed prominently on every drop. Backers can see exactly how much the artiste committed.",
  },
  {
    t: "Track records",
    why: "Past behaviour predicts future behaviour. If an artiste has completed 3 drops with 100% payback and copyright reversion, that means something. If a backer has backed 5 drops, that means something too.",
    how: "Every completed drop updates the participant's track record. Visible on profiles and the Backer Wall. Includes: drops completed, payback rate, copyright reversions, average uplift, average return.",
  },
  {
    t: "Ad receipts",
    why: "'Your money became ads' is a claim. Receipts make it a fact. Every backer should be able to see exactly how their funds were deployed, down to the Google Ads invoice number.",
    how: "Displayed on every active drop. Columns: date, ad type, spend, impressions, views, CTR, Google reference. Totals at bottom. Updated after each deployment.",
  },
];

export default function TrustPage() {
  return (
    <div>
      <Section>
        <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-3">Design Philosophy</Mono>
        <h1 className="text-4xl lg:text-[52px] font-bold leading-[0.95] tracking-tight mb-4">
          Trust<br />Architecture
        </h1>
        <p className="text-base text-ink-mid leading-relaxed max-w-xl">
          Every design decision on ZiggyDust is a trust decision. Here&apos;s why we built it this way.
        </p>
      </Section>

      {LAYERS.map((s, i) => (
        <Section key={i} dark={i % 2 === 1}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            <div className="w-10 shrink-0">
              <Mono className="text-2xl font-bold text-amber">
                {String(i + 1).padStart(2, "0")}
              </Mono>
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl lg:text-3xl font-bold mb-4 ${i % 2 === 1 ? "text-bg" : "text-ink"}`}>
                {s.t}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Mono className="text-[9px] text-amber uppercase tracking-widest block mb-2">Why</Mono>
                  <div className={`text-base leading-relaxed ${i % 2 === 1 ? "text-ink-light" : "text-ink-mid"}`}>{s.why}</div>
                </div>
                <div>
                  <Mono className="text-[9px] text-amber uppercase tracking-widest block mb-2">How</Mono>
                  <div className={`text-base leading-relaxed ${i % 2 === 1 ? "text-ink-light" : "text-ink-mid"}`}>{s.how}</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      ))}
    </div>
  );
}
