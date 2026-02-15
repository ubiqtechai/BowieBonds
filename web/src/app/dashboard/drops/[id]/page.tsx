"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Bar } from "@/components/ui/bar";
import { Spark } from "@/components/ui/spark";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Initials } from "@/components/ui/initials";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { Table, TH, TD } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { StatsStrip } from "@/components/dashboard/stats-strip";
import { PageSkeleton } from "@/components/shared/skeleton";
import { useDropData } from "@/hooks/useDropsData";
import { usePledge } from "@/hooks/useDrops";
import { formatCurrency, currencySymbol } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";
import { useUIStore } from "@/stores/ui-store";
import { useToastStore } from "@/stores/toast-store";
import { pct } from "@/lib/utils";

export default function DropDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { currency } = useCurrencyStore();
  const { role } = useUIStore();
  const fmt = (n: number) => formatCurrency(n, currency);
  const [pledgeOpen, setPledgeOpen] = useState(false);
  const [pledgeAmt, setPledgeAmt] = useState("");
  const { addToast } = useToastStore();
  const { data: c, isLoading } = useDropData(id);
  const { commit: pledgeMutation } = usePledge(id);

  if (isLoading) return <PageSkeleton />;
  if (!c) {
    return (
      <div className="p-8 lg:p-12">
        <p className="text-ink-mid">Drop not found.</p>
      </div>
    );
  }

  const up =
    c.baselineDaily > 0
      ? Math.round(((c.currentDaily - c.baselineDaily) / c.baselineDaily) * 100)
      : 0;
  const fp = pct(c.backerFunded, c.backerGoal);
  const capAmt = c.backerFunded * c.cap;
  const rp = capAmt > 0 ? Math.round((c.totalSettled / capAmt) * 100) : 0;
  const cpPct = Math.round((c.artistCoPay / c.totalBudget) * 100);

  return (
    <div className="px-4 lg:px-12 py-8 lg:py-10">
      {/* Back button */}
      <Link href="/dashboard">
        <Button variant="secondary" size="sm" className="mb-6">
          ← Back
        </Button>
      </Link>

      {/* Header */}
      <div className="border-b-2 border-ink pb-6 lg:pb-8 mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Mono className="text-xs text-ink-mid">{c.id}</Mono>
              <Badge status={c.status} />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold leading-[0.95] tracking-tight">
              {c.name}
            </h1>
            <div className="text-base text-ink-mid mt-2">
              {c.artist} · {c.genre}
            </div>
            <div className="text-base text-ink-light italic mt-1">
              &ldquo;{c.tagline}&rdquo;
            </div>
          </div>
          <div className="lg:text-right">
            <Mono className="text-[10px] text-ink-mid uppercase tracking-widest block mb-1">
              Backer Goal
            </Mono>
            <div className="text-3xl lg:text-[42px] font-bold">
              {fmt(c.backerGoal)}
            </div>
            <Mono className="text-[11px] text-ink-mid block mt-2">
              {c.revSharePct}% · {c.cap}x · {c.tenorMonths}mo · min{" "}
              {fmt(c.minTicket)}
            </Mono>
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsStrip
        stats={[
          {
            label: "Channel Daily",
            value: fmt(c.currentDaily),
            sub: `${up > 0 ? "+" : ""}${up}%`,
          },
          {
            label: "Baseline",
            value: fmt(c.baselineDaily),
            sub: "30d channel avg",
          },
          {
            label: "Total Rev",
            value: fmt(c.totalRevenue),
            sub: `${c.daysActive}d`,
          },
          {
            label: "Ad Spend",
            value: fmt(c.adSpent),
            sub: `of ${fmt(c.totalBudget)}`,
          },
          {
            label: "Paid Out",
            value: fmt(c.totalSettled),
            sub: `${rp}% of cap`,
          },
        ]}
      />

      {/* Revenue + Funding grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 lg:mt-8 mb-6 lg:mb-8">
        {/* Revenue chart */}
        <Card className="p-5 lg:p-6">
          <Mono className="text-[10px] text-ink-mid uppercase tracking-widest block mb-4">
            Channel Revenue Trend
          </Mono>
          <Spark data={c.rd} width={400} height={120} />
        </Card>

        {/* Funding */}
        <Card className="p-5 lg:p-6">
          <Mono className="text-[10px] text-ink-mid uppercase tracking-widest block mb-4">
            Funding
          </Mono>

          <div className="flex justify-between mb-2">
            <Mono className="text-[11px] text-ink-mid">
              Artiste Co-Pay ({cpPct}%)
            </Mono>
            <Mono className="text-xs font-semibold text-green">
              {fmt(c.artistCoPay)} ✓
            </Mono>
          </div>
          <Bar value={1} max={1} color="bg-green" height={6} />

          <div className="flex justify-between mb-2 mt-6">
            <Mono className="text-[11px] text-ink-mid">Backer Funding</Mono>
            <Mono className="text-xs font-semibold">
              {fmt(c.backerFunded)} / {fmt(c.backerGoal)}
            </Mono>
          </div>
          <Bar value={c.backerFunded} max={c.backerGoal} color="bg-amber" />
          <Mono className="text-[10px] text-ink-light block mt-2">
            {fp}% · {c.backers.length} backers
          </Mono>

          {role === "backer" && c.status === "funding" && (
            <Button
              className="w-full mt-5"
              onClick={() => setPledgeOpen(true)}
            >
              Back this drop
            </Button>
          )}
        </Card>
      </div>

      {/* The Artiste */}
      <Card className="mb-6">
        <SectionHeader>The Artiste</SectionHeader>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-4 lg:p-5 lg:border-r border-sand">
            <div className="flex items-center gap-3.5 mb-4">
              <Initials name={c.artist} size={48} />
              <div>
                <span className="text-lg font-bold">{c.artist}</span>
                <div className="text-xs text-ink-mid mt-0.5">
                  {c.artistHeadline}
                </div>
              </div>
            </div>
            <a
              href={c.artistLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border-[1.5px] border-ink text-ink font-mono text-[11px] no-underline uppercase"
            >
              <LinkedInIcon /> LinkedIn Profile
            </a>
            {c.artistTrack.campaigns > 0 ? (
              <div className="mt-4 p-3 bg-green-faint border border-green/20">
                <Mono className="text-[9px] text-green uppercase tracking-widest block mb-1.5">
                  Track Record
                </Mono>
                <div className="flex gap-5">
                  {[
                    [c.artistTrack.campaigns + " done", "drops"],
                    [c.artistTrack.paybackRate + "%", "payback"],
                    ["+" + c.artistTrack.avgUplift + "%", "uplift"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <Mono className="text-sm font-semibold text-green">
                        {v}
                      </Mono>
                      <Mono className="text-[9px] text-ink-mid block">{l}</Mono>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-amber-faint border border-amber/20">
                <Mono className="text-[11px] text-amber">
                  ⚡ First drop on ZiggyDust
                </Mono>
              </div>
            )}
          </div>

          {/* YouTube stats */}
          <div className="w-full lg:w-[280px] p-4 lg:p-5 border-t lg:border-t-0 border-sand">
            <div className="flex items-center gap-2 mb-4">
              <Mono className="text-[10px] text-ink-mid uppercase tracking-widest">
                YouTube
              </Mono>
              {c.yt.verified && (
                <Mono className="text-[9px] text-green bg-green-faint px-2 py-0.5 border border-green/20">
                  ✓ OAUTH
                </Mono>
              )}
            </div>
            {[
              ["Subscribers", c.yt.subscribers.toLocaleString()],
              ["Total Views", c.yt.totalViews.toLocaleString()],
              ["Monthly", c.yt.monthlyViews.toLocaleString()],
              ["Age", c.yt.channelAge],
            ].map(([l, v], j) => (
              <div
                key={l}
                className={`flex justify-between py-2 ${
                  j < 3 ? "border-b border-sand" : ""
                }`}
              >
                <Mono className="text-[11px] text-ink-mid">{l}</Mono>
                <Mono className="text-xs font-semibold">{v}</Mono>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Backer Wall */}
      <Card className="mb-6">
        <SectionHeader right={c.backers.length + " verified"}>
          Backer Wall
        </SectionHeader>
        {c.backers.map((b, i) => {
          const bc = b.amount * c.cap;
          const bp = bc > 0 ? Math.round((b.returned / bc) * 100) : 0;
          return (
            <div
              key={i}
              className={`flex flex-col sm:flex-row items-stretch ${
                i < c.backers.length - 1 ? "border-b border-sand" : ""
              }`}
            >
              {/* Identity */}
              <div className="flex-1 p-4 flex items-center gap-3.5">
                <Initials name={b.name} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{b.name}</span>
                    <a
                      href={b.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70"
                    >
                      <LinkedInIcon />
                    </a>
                  </div>
                  <Mono className="text-[11px] text-ink-mid block mt-0.5">
                    {b.headline}
                  </Mono>
                </div>
              </div>

              {/* Track record */}
              <div className="w-full sm:w-40 p-4 sm:border-l border-sand flex flex-col justify-center">
                <Mono className="text-[9px] text-ink-light uppercase block mb-1">
                  Record
                </Mono>
                <Mono className="text-[11px]">
                  {b.campaigns} · {fmt(b.totalBacked)}
                </Mono>
                {b.avgReturn > 0 && (
                  <Mono className="text-[11px] text-green block mt-0.5">
                    {b.avgReturn}x avg
                  </Mono>
                )}
              </div>

              {/* This campaign */}
              <div className="w-full sm:w-[180px] p-4 sm:border-l border-sand flex items-center gap-3">
                <div>
                  <Mono className="text-[9px] text-ink-light block">IN</Mono>
                  <Mono className="text-[15px] font-semibold">
                    {fmt(b.amount)}
                  </Mono>
                </div>
                <div className="text-right flex-1">
                  <Mono
                    className={`text-sm font-semibold ${
                      b.returned > 0 ? "text-green" : "text-ink-light"
                    }`}
                  >
                    {fmt(b.returned)}
                  </Mono>
                  <Mono className="text-[9px] text-ink-light block">{bp}%</Mono>
                  <div className="mt-1">
                    <Bar
                      value={b.returned}
                      max={bc || 1}
                      color="bg-green"
                      height={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Card>

      {/* The Lockbox */}
      <Card className="mb-6">
        <SectionHeader right="money can only become ads">
          ⬒ The Lockbox
        </SectionHeader>
        <Table>
          <thead>
            <tr>
              <TH>Type</TH>
              <TH>From</TH>
              <TH>Amount</TH>
              <TH>Status</TH>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TD className="font-mono text-green">● Co-Pay</TD>
              <TD>{c.artist}</TD>
              <TD className="font-mono font-semibold">{fmt(c.artistCoPay)}</TD>
              <TD>
                <Badge status="paid" />
              </TD>
            </tr>
            {c.backers.map((b, i) => (
              <tr key={i}>
                <TD className="font-mono text-amber">● Backer</TD>
                <TD>{b.name}</TD>
                <TD className="font-mono font-semibold">{fmt(b.amount)}</TD>
                <TD>
                  <Badge status="paid" />
                </TD>
              </tr>
            ))}
            {c.adSpent > 0 && (
              <tr>
                <TD className="font-mono text-red">↗ Deploy</TD>
                <TD>Escrow → Google Ads</TD>
                <TD className="font-mono font-semibold text-red">
                  −{fmt(c.adSpent)}
                </TD>
                <TD>
                  <Badge status="active" />
                </TD>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Ad Receipts */}
      {c.adReceipts.length > 0 && (
        <Card className="mb-6">
          <SectionHeader right="every rupee accounted for">
            Ad Receipts
          </SectionHeader>
          <Table>
            <thead>
              <tr>
                <TH>Date</TH>
                <TH>Type</TH>
                <TH>Spend</TH>
                <TH className="hidden sm:table-cell">Impressions</TH>
                <TH className="hidden sm:table-cell">Views</TH>
                <TH className="hidden md:table-cell">CTR</TH>
                <TH className="hidden md:table-cell">Ref</TH>
              </tr>
            </thead>
            <tbody>
              {c.adReceipts.map((r, i) => (
                <tr key={i}>
                  <TD>{r.date}</TD>
                  <TD className="font-mono">{r.type}</TD>
                  <TD className="font-mono font-semibold text-amber">
                    {fmt(r.spend)}
                  </TD>
                  <TD className="font-mono hidden sm:table-cell">
                    {r.impressions.toLocaleString()}
                  </TD>
                  <TD className="font-mono hidden sm:table-cell">
                    {r.views.toLocaleString()}
                  </TD>
                  <TD className="font-mono hidden md:table-cell">{r.ctr}</TD>
                  <TD className="font-mono text-[10px] text-ink-light hidden md:table-cell">
                    {r.ref}
                  </TD>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex justify-between px-4 py-3 bg-warm">
            <Mono className="text-[11px] text-ink-mid">
              Deployed:{" "}
              <strong className="text-ink">
                {fmt(c.adReceipts.reduce((s, r) => s + r.spend, 0))}
              </strong>
            </Mono>
            <Mono className="text-[11px] text-ink-mid">
              Views:{" "}
              <strong className="text-ink">
                {c.adReceipts
                  .reduce((s, r) => s + r.views, 0)
                  .toLocaleString()}
              </strong>
            </Mono>
          </div>
        </Card>
      )}

      {/* Payout History */}
      {c.settlements.length > 0 && (
        <Card className="mb-6">
          <SectionHeader>Payout History</SectionHeader>
          <Table>
            <thead>
              <tr>
                <TH>Period</TH>
                <TH>Revenue</TH>
                <TH className="hidden sm:table-cell">Baseline</TH>
                <TH>Uplift</TH>
                <TH>Share</TH>
                <TH>Status</TH>
              </tr>
            </thead>
            <tbody>
              {c.settlements.map((s, i) => (
                <tr key={i}>
                  <TD>{s.month}</TD>
                  <TD className="font-mono">{fmt(s.revenue)}</TD>
                  <TD className="font-mono text-ink-light hidden sm:table-cell">
                    {fmt(s.baseline)}
                  </TD>
                  <TD className="font-mono text-green">+{fmt(s.uplift)}</TD>
                  <TD className="font-mono font-semibold text-amber">
                    {fmt(s.share)}
                  </TD>
                  <TD>
                    <Badge status={s.status} />
                  </TD>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Pledge Modal */}
      <Modal open={pledgeOpen} onClose={() => setPledgeOpen(false)} ariaLabel="Pledge to back this drop">
        <span className="text-2xl font-bold block mb-1">Back: {c.name}</span>
        <p className="text-[13px] text-ink-mid mb-1">
          Your funds enter escrow. They can only become YouTube ads.
        </p>
        <p className="text-xs text-ink-mid mb-6">
          Revenue share applies to the artiste&apos;s entire YouTube channel —
          capturing cross-views and discovery of older content.
        </p>

        <Mono className="text-[9px] font-semibold text-ink-mid uppercase tracking-widest block mb-1.5">
          Amount ({currencySymbol(currency)}) — minimum {fmt(c.minTicket)}
        </Mono>
        <input
          value={pledgeAmt}
          onChange={(e) => setPledgeAmt(e.target.value)}
          placeholder={String(c.minTicket)}
          type="number"
          className={`w-full px-4 py-3 border-2 bg-white text-ink text-xl font-semibold outline-none ${
            pledgeAmt && Number(pledgeAmt) < c.minTicket
              ? "border-red"
              : "border-ink"
          }`}
        />
        {pledgeAmt && Number(pledgeAmt) < c.minTicket && (
          <Mono className="text-[10px] text-red block mt-1">
            Minimum ticket is {fmt(c.minTicket)}
          </Mono>
        )}

        <div className="p-3.5 bg-warm border border-sand mt-3 mb-5 font-mono text-[11px] text-ink-mid leading-relaxed">
          Share: <strong className="text-ink">{c.revSharePct}%</strong> of
          channel uplift · Cap:{" "}
          <strong className="text-ink">{c.cap}x</strong>
          {pledgeAmt ? ` (${fmt(Number(pledgeAmt) * c.cap)})` : ""} · Tenor:{" "}
          <strong className="text-ink">{c.tenorMonths}mo</strong>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setPledgeOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            disabled={!pledgeAmt || Number(pledgeAmt) < c.minTicket || pledgeMutation.isPending}
            onClick={() => {
              pledgeMutation.mutate(Number(pledgeAmt), {
                onSuccess: () => {
                  setPledgeOpen(false);
                  setPledgeAmt("");
                  addToast("success", "Pledge committed! You're in.");
                },
                onError: (err) => {
                  addToast("error", err.message || "Pledge failed.");
                },
              });
            }}
          >
            {pledgeMutation.isPending ? "Pledging..." : "I'm In"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
