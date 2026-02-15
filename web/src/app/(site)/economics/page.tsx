"use client";

import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";
import { formatCurrency } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";

const WATERFALL = [
  { n: "1", t: "Escrow admin costs", d: "Any fees for maintaining the lockbox account. Typically minimal." },
  { n: "2", t: "Backer commitment", d: "Backers receive their original committed amount back first, before any revenue share is distributed." },
  { n: "3", t: "Revenue share", d: "After the original commitment is returned, revenue share continues flowing to backers until cap or tenor expiry." },
  { n: "4", t: "Artist retains remainder", d: "Everything above the backer share stays with the artist. Their music, their revenue." },
];

export default function EconomicsPage() {
  const { currency } = useCurrencyStore();
  const fmt = (n: number) => formatCurrency(n, currency);

  const scenarioRows = [
    ["Budget", fmt(1000), fmt(1000), fmt(1000)],
    ["Co-pay (20%)", fmt(200), fmt(200), fmt(200)],
    ["Backer pool", fmt(800), fmt(800), fmt(800)],
    ["Daily uplift", fmt(2), fmt(5), fmt(12)],
    ["Monthly uplift", fmt(60), fmt(150), fmt(360)],
    ["Rev share (25%)", fmt(15) + "/mo", fmt(37.5) + "/mo", fmt(90) + "/mo"],
    ["Cap (1.5x)", fmt(1200), fmt(1200), fmt(1200)],
    ["Time to cap", "80 months", "32 months", "13 months"],
    ["Tenor (6mo) payout", fmt(90), fmt(225), fmt(540)],
    ["Backer return", "0.11x", "0.28x", "0.68x"],
  ];

  return (
    <div>
      <Section>
        <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-3">Deep Dive</Mono>
        <h1 className="text-4xl lg:text-[52px] font-bold leading-[0.95] tracking-tight mb-4">The Economics</h1>
        <p className="text-base text-ink-mid leading-relaxed max-w-xl">How YouTube ad revenue works, what uplift means, and realistic return scenarios.</p>
      </Section>

      <Section dark>
        <h2 className="text-3xl font-bold text-bg mb-5">How YouTube AdSense works</h2>
        <div className="text-sm text-ink-light leading-relaxed max-w-2xl space-y-4">
          <p>When a monetised video plays an ad, the creator earns revenue. YouTube takes ~45% and the creator keeps ~55%. Revenue is measured as RPM (Revenue Per Mille) — how much you earn per 1,000 views.</p>
          <p>Music content typically generates RPMs between $0.25–$4.00, depending on the audience, genre, and ad market conditions. An artist with 10,000 daily views at $2.00 RPM earns roughly $20/day or $600/month.</p>
          <p>ZiggyDust tracks this revenue through YouTube&apos;s Analytics API, authenticated via OAuth. The artist grants read-only access. We observe, we don&apos;t touch.</p>
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold mb-3">The baseline</h2>
        <div className="text-sm text-ink-mid leading-relaxed max-w-2xl space-y-4 mt-3">
          <p>Before a drop goes live, we compute the artist&apos;s baseline: the average daily channel-wide YouTube AdSense revenue over the 30 days before campaign activation. This is the &ldquo;before&rdquo; number.</p>
          <p>Only channel-wide revenue above this baseline counts as uplift — this captures cross-views and discovery of older content driven by the campaign. If an artist&apos;s channel was earning $5/day before the campaign and earns $12/day during, the uplift is $7/day. Backers get their share of the $7 — not the full $12.</p>
        </div>
      </Section>

      <Section dark>
        <h2 className="text-3xl font-bold text-bg mb-6">Scenario modelling</h2>
        <div className="border-2 border-ink-mid overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-4 border-b-2 border-ink-mid min-w-[500px]">
            <div className="px-5 py-4 border-r border-ink-mid" />
            {["Conservative", "Base Case", "Optimistic"].map((h, i) => (
              <div key={h} className={`px-5 py-4 ${i < 2 ? "border-r border-ink-mid" : ""}`}>
                <Mono className="text-[9px] text-amber uppercase tracking-widest">{h}</Mono>
              </div>
            ))}
          </div>
          {/* Rows */}
          {scenarioRows.map((row, i) => (
            <div key={i} className="grid grid-cols-4 border-b border-ink-mid min-w-[500px]">
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={`px-5 py-2.5 ${j < 3 ? "border-r border-ink-mid" : ""} ${
                    j === 0 ? "text-[13px] font-semibold text-bg" : "font-mono text-xs text-ink-light"
                  }`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-5 p-4 border border-ink-mid text-[13px] text-ink-light leading-relaxed">
          <strong className="text-bg">Key insight:</strong> In a 6-month tenor, only the optimistic scenario approaches cap. Most drops will return a fraction of the cap. Backers should think of this as supporting music with a potential upside — not as an investment with expected returns.
        </div>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold mb-5">The waterfall</h2>
        <div className="border-2 border-ink mt-5">
          {WATERFALL.map((s, i) => (
            <div key={i} className={`flex ${i < WATERFALL.length - 1 ? "border-b border-sand" : ""}`}>
              <div className="w-[60px] p-4 flex items-center justify-center border-r border-sand">
                <Mono className="text-xl font-bold text-amber">{s.n}</Mono>
              </div>
              <div className="p-3.5 lg:p-5 flex-1">
                <div className="text-[15px] font-bold mb-1">{s.t}</div>
                <div className="text-[13px] text-ink-mid">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
