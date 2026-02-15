"use client";

import { Mono } from "@/components/ui/mono";
import { DropCard } from "@/components/dashboard/drop-card";
import { StatsStrip } from "@/components/dashboard/stats-strip";
import { Button } from "@/components/ui/button";
import { useDropsData } from "@/hooks/useDropsData";
import { PageSkeleton } from "@/components/shared/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { formatCurrency } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";
import Link from "next/link";

export default function DashboardHome() {
  const { currency } = useCurrencyStore();
  const fmt = (n: number) => formatCurrency(n, currency);
  const { data: drops = [], isLoading, error } = useDropsData();
  const activeCount = drops.filter((c) => c.status === "active").length;

  if (isLoading) return <PageSkeleton />;

  if (error) {
    return (
      <div className="px-4 lg:px-12 py-12">
        <div className="border-2 border-red bg-red-faint p-6">
          <Mono className="text-xs text-red">Failed to load drops. Please refresh.</Mono>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Ticker */}
      <div className="overflow-hidden border-b border-ink py-2 bg-ink text-bg whitespace-nowrap">
        <Mono className="text-[11px] tracking-[0.15em] uppercase">
          {"ziggy dust · back your artiste · youtube · escrow-controlled · revenue-linked · indie music deserves a push · ".repeat(
            3
          )}
        </Mono>
      </div>

      {/* Hero section */}
      <div className="px-4 lg:px-12 pt-8 lg:pt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 lg:mb-12 gap-6">
          <div>
            <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-2">
              Dashboard
            </Mono>
            <h1 className="text-3xl lg:text-5xl font-bold leading-[0.95] tracking-tight">
              Back your
              <br />
              artiste.
              <br />
              <em className="text-amber">Push their sound.</em>
            </h1>
          </div>
          <div className="sm:text-right">
            <Mono className="text-[10px] text-ink-mid uppercase tracking-widest block mb-1">
              Total funded
            </Mono>
            <div className="text-3xl lg:text-[38px] font-bold">
              {fmt(drops.reduce((s, c) => s + c.backerFunded, 0))}
            </div>
            <Mono className="text-[11px] text-ink-light block mt-1">
              across {drops.length} drops
            </Mono>
          </div>
        </div>

        {/* Stats strip */}
        <StatsStrip
          stats={[
            { label: "Active", value: activeCount, sub: "drops live" },
            {
              label: "Backers",
              value: drops.reduce((s, c) => s + c.backers.length, 0),
              sub: "people",
            },
            {
              label: "Ad Spend",
              value: fmt(drops.reduce((s, c) => s + c.adSpent, 0)),
              sub: "deployed",
            },
            {
              label: "Revenue",
              value: fmt(drops.reduce((s, c) => s + c.totalRevenue, 0)),
              sub: "earned",
            },
          ]}
        />

        {/* Drop cards */}
        <div className="mt-8 lg:mt-12">
          <div className="flex justify-between items-center mb-5">
            <span className="text-xl lg:text-2xl font-bold">Now Playing</span>
            <Link href="/dashboard/drops">
              <Button variant="secondary" size="sm">
                All drops →
              </Button>
            </Link>
          </div>
          {drops.length === 0 ? (
            <EmptyState
              title="No drops yet"
              message="When artistes create drops, they'll appear here."
              action={
                <Link href="/dashboard/drops/new">
                  <Button>+ Create a Drop</Button>
                </Link>
              }
            />
          ) : (
            drops.map((drop, i) => (
              <DropCard key={drop.id} drop={drop} index={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
