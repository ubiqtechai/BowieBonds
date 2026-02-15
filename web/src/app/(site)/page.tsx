"use client";

import Link from "next/link";
import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";

export default function HomePage() {
  const { currency } = useCurrencyStore();
  const fmt = (n: number) => formatCurrency(n, currency);

  return (
    <div>
      {/* Hero */}
      <Section>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-12 border-b-2 border-ink">
          <div className="max-w-xl">
            <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.2em] block mb-4">
              YouTube Promotion for Independent Artists
            </Mono>
            <h1 className="text-4xl lg:text-[52px] font-bold leading-[0.95] tracking-tight mb-4">
              Your music
              <br />
              deserves a
              <br />
              <em className="text-amber">push.</em>
            </h1>
            <p className="text-base text-ink-mid leading-relaxed max-w-lg">
              ZiggyDust connects artistes with backers under copyright
              arrangement and fund YouTube Ad campaigns. Backers earn
              returns backed by the IP itself. Copyright reverts when
              backers are made whole.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/how">
                <Button variant="secondary" size="lg">
                  How It Works →
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl lg:text-7xl font-bold text-amber leading-[0.85] tracking-tight">
              {fmt(2600)}
            </div>
            <Mono className="text-[11px] text-ink-mid block mt-2">
              funded across 3 drops
            </Mono>
            <div className="flex gap-4 justify-end mt-6">
              {[
                ["3", "drops"],
                ["6", "backers"],
                [fmt(780), "ad spend"],
              ].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="text-2xl font-bold">{v}</div>
                  <Mono className="text-[9px] text-ink-light uppercase">
                    {l}
                  </Mono>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* How strip */}
      <Section dark>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {[
            {
              n: "01",
              t: "Artist drops",
              d: "Artist sets up a YouTube promotion campaign, puts in ≥20% co-pay, sets revenue share terms. One active drop per artist at a time.",
            },
            {
              n: "02",
              t: "Backers license",
              d: "Real people with real LinkedIn profiles license the copyright on the specific promoted work and fund the campaign. All money goes into a lockbox.",
            },
            {
              n: "03",
              t: "Ads deploy",
              d: "Escrow funds go only to Google Ads for YouTube. Every rupee becomes an ad impression.",
            },
            {
              n: "04",
              t: "Revenue flows, copyright reverts",
              d: "YouTube AdSense revenue is tracked via OAuth. Channel-wide uplift above baseline flows to backers. When they're made whole, copyright on the work reverts to the artist.",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`px-5 lg:px-7 py-6 lg:py-0 ${
                i < 3
                  ? "border-b lg:border-b-0 lg:border-r border-ink-mid"
                  : ""
              }`}
            >
              <Mono className="text-[28px] font-bold text-amber block mb-3">
                {s.n}
              </Mono>
              <div className="text-lg font-bold text-bg mb-2">{s.t}</div>
              <div className="text-[13px] text-ink-light leading-relaxed">
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust grid */}
      <Section>
        <div className="border-b-2 border-ink pb-12">
          <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-3">
            Why it works
          </Mono>
          <h2 className="text-3xl font-bold mb-8">Trust is the product.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-2 border-ink">
            {[
              {
                t: "Real identities",
                d: "Every artist and backer has a mandatory LinkedIn profile. No anons. You know who you're dealing with.",
                icon: "👤",
              },
              {
                t: "Verified numbers",
                d: "YouTube stats pulled via OAuth — not self-reported. Subscriber counts, views, revenue — all verified.",
                icon: "✓",
              },
              {
                t: "The Lockbox",
                d: "Funds can only become Google Ads. No personal transfers, no withdrawals. Every rupee accounted for with receipts.",
                icon: "⬒",
              },
              {
                t: "20% skin in the game",
                d: "Artists put in minimum 20% co-pay. First-in, first-loss. They eat before their backers do.",
                icon: "🎯",
              },
              {
                t: "Track records",
                d: "Every artist and backer builds a public history. Past drops, payback rates, average returns — all visible.",
                icon: "📊",
              },
              {
                t: "Ad receipts",
                d: "Google Ads invoice references, impression counts, view counts — proof that your money became promotion.",
                icon: "📋",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`p-5 lg:p-7 ${
                  i % 3 < 2 ? "sm:border-r border-sand" : ""
                } ${i < 3 ? "border-b border-sand" : ""}`}
              >
                <div className="text-xl mb-2">{s.icon}</div>
                <div className="text-base font-bold mb-1.5">{s.t}</div>
                <div className="text-[13px] text-ink-mid leading-relaxed">
                  {s.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bowie tease */}
      <Section dark>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-xl">
            <Mono className="text-[10px] text-amber uppercase tracking-[0.15em] block mb-3">
              The precedent
            </Mono>
            <div className="text-2xl lg:text-[32px] font-bold text-bg leading-tight mb-3">
              In 1997, David Bowie turned his future royalties into $55 million.
            </div>
            <div className="text-sm text-ink-light leading-relaxed">
              Bowie Bonds were the first celebrity-backed securities — and the
              intellectual ancestor of what we&apos;re building. Same idea,
              different scale, new technology.
            </div>
            <Link href="/bowie-bonds">
              <Button
                variant="secondary"
                className="mt-6 border-bg text-bg hover:bg-bg hover:text-ink"
              >
                Read the full story →
              </Button>
            </Link>
          </div>
          <div className="text-right">
            <div className="text-6xl lg:text-[80px] font-bold text-amber leading-[0.8] tracking-tight">
              $55M
            </div>
            <Mono className="text-[11px] text-ink-light block mt-2">
              Bowie Bonds, 1997
            </Mono>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-3">
            Ready to push some sound?
          </h2>
          <p className="text-base text-ink-mid max-w-md mx-auto">
            Whether you make music or back it — this is your platform.
          </p>
          <div className="flex gap-3 justify-center mt-8">
            <Link href="/signup">
              <Button size="lg">Sign Up</Button>
            </Link>
            <Link href="/faq">
              <Button variant="secondary" size="lg">
                Read the FAQ
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
