"use client";

import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";
import { formatCurrency } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";

const TIMELINE = [
  { year: "1997", title: "The Issue", desc: "$55 million in asset-backed securities issued. Prudential Insurance Company buys the entire offering. Annual coupon: 7.9%. Maturity: 10 years. Collateral: royalties from 25 Bowie albums (287 songs)." },
  { year: "1998–2003", title: "The Peak", desc: "Bonds perform as expected. Royalty income covers coupon payments. Moody's rates them A3 — investment grade. Other artists take notice: James Brown, Ashford & Simpson, the Isley Brothers explore similar deals." },
  { year: "2004", title: "The Downgrade", desc: "The music industry shifts. Napster, then iTunes, then streaming reshape how people consume music. Moody's downgrades Bowie Bonds to Baa3 — one notch above junk. The underlying revenue model is under pressure." },
  { year: "2007", title: "The Maturity", desc: "Bonds mature and are repaid in full. Despite the downgrade, every bondholder got their principal back plus all coupon payments. Bowie, meanwhile, had his $55 million for a decade — and used it to buy back masters and fund new work." },
  { year: "2016", title: "The Legacy", desc: "Bowie passes away in January 2016. His estate retains full ownership of his catalogue — partly because the Bowie Bonds model let him buy back rights rather than sell them. The bonds proved that creative output could function as a financial asset." },
];

const PROOFS = [
  ["Creative output has financial value", "A song isn't just art — it generates measurable, recurring revenue. That revenue stream can be the basis for financial instruments."],
  ["You don't have to sell to monetise", "Bowie didn't sell his catalogue. He borrowed against it. He kept ownership, got liquidity, and bought back even more rights."],
  ["Revenue-backed = risk-bounded", "The bonds were backed by actual revenue, not speculation. When the music industry changed, the bonds still paid out — just with more stress."],
  ["Scale matters less than structure", "Bowie was a superstar, but the structure works at any scale. The key ingredients are: predictable revenue, transparent reporting, and aligned incentives."],
];

export default function BowieBondsPage() {
  const { currency } = useCurrencyStore();
  const fmt = (n: number) => formatCurrency(n, currency);

  return (
    <div>
      <Section>
        <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-3">The Precedent</Mono>
        <h1 className="text-4xl lg:text-[52px] font-bold leading-[0.95] tracking-tight mb-4">Bowie Bonds</h1>
        <p className="text-base text-ink-mid leading-relaxed max-w-xl">How David Bowie invented celebrity-backed securities — and why it matters for indie music today.</p>
      </Section>

      <Section dark>
        <div className="max-w-2xl">
          <div className="text-xl font-bold text-bg leading-relaxed mb-6">
            In January 1997, David Bowie did something no musician had ever done. He walked into a room with investment banker David Pullman and emerged with $55 million — not from a record deal, not from a tour, but from the future.
          </div>
          <div className="text-[15px] text-ink-light leading-relaxed">
            Bowie securitised the future royalties of his first 25 albums — everything from &ldquo;Space Oddity&rdquo; to &ldquo;Let&apos;s Dance.&rdquo; The bonds paid 7.9% annually over 10 years, backed entirely by the income those recordings would generate. Prudential Insurance bought the entire issue. It was, at the time, unprecedented.
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold mb-8">The Timeline</h2>
        {TIMELINE.map((t, i) => (
          <div key={i} className={`flex flex-col sm:flex-row gap-4 sm:gap-0 ${i < TIMELINE.length - 1 ? "border-b border-sand" : ""}`}>
            <div className="w-full sm:w-[120px] py-4 sm:py-6 shrink-0">
              <Mono className="text-xl lg:text-2xl font-bold text-amber">{t.year}</Mono>
            </div>
            <div className="py-4 sm:py-6 sm:pl-8 sm:border-l-2 border-ink">
              <div className="text-lg font-bold mb-1.5">{t.title}</div>
              <div className="text-sm text-ink-mid leading-relaxed max-w-xl">{t.desc}</div>
            </div>
          </div>
        ))}
      </Section>

      <Section dark>
        <h2 className="text-3xl font-bold text-bg mb-6">What Bowie Bonds proved</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROOFS.map(([t, d]) => (
            <div key={t}>
              <div className="text-base font-bold text-bg mb-1.5">{t}</div>
              <div className="text-[13px] text-ink-light leading-relaxed">{d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="border-2 border-ink p-6 lg:p-9">
          <h2 className="text-3xl font-bold mb-6">From Bowie Bonds to ZiggyDust</h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6">
            <div>
              <Mono className="text-[10px] text-ink-mid uppercase tracking-widest block mb-3">Bowie Bonds (1997)</Mono>
              {["$55M single issue", "25 albums, 287 songs", "Prudential (institutional)", "10-year maturity", "7.9% annual coupon", "Traditional securitisation"].map((t) => (
                <div key={t} className="py-2 border-b border-sand text-[13px] text-ink-mid">{t}</div>
              ))}
            </div>
            <div className="hidden lg:flex items-center pt-8">
              <Mono className="text-2xl text-amber">→</Mono>
            </div>
            <div>
              <Mono className="text-[10px] text-amber uppercase tracking-widest block mb-3">ZiggyDust (2026)</Mono>
              {[`${fmt(500)}–${fmt(2500)} per drop`, "1 video per drop", "Individual backers", "4–8 month tenor", "Revenue share on uplift", "Platform-facilitated, no custody"].map((t) => (
                <div key={t} className="py-2 border-b border-sand text-[13px] font-semibold">{t}</div>
              ))}
            </div>
          </div>
          <div className="mt-6 p-4 bg-amber-faint border border-amber/30 text-sm leading-relaxed">
            <strong>Same DNA, different organism.</strong> Bowie Bonds proved the concept at institutional scale. ZiggyDust applies the same logic — revenue-backed, time-bounded, transparent — to independent artists and individual backers. No banks. No intermediaries. Just music, ads, and math.
          </div>
        </div>
      </Section>
    </div>
  );
}
