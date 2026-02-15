"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Bar } from "@/components/ui/bar";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";
import { useDropsData } from "@/hooks/useDropsData";
import { DropCardSkeleton } from "@/components/shared/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { formatCurrency } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";
import { useUIStore } from "@/stores/ui-store";
import { pct } from "@/lib/utils";

export default function DropsPage() {
  const { currency } = useCurrencyStore();
  const { role } = useUIStore();
  const fmt = (n: number) => formatCurrency(n, currency);
  const { data: drops = [], isLoading } = useDropsData();

  if (isLoading) {
    return (
      <div className="px-4 lg:px-12 py-8 lg:py-10">
        <div className="h-9 w-24 bg-sand animate-pulse mb-7" />
        <DropCardSkeleton />
        <DropCardSkeleton />
        <DropCardSkeleton />
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-12 py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-7 gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold">Drops</h1>
          <p className="text-ink-mid text-sm mt-1">
            {role === "backer" ? "Find music to back" : "Your active drops"}
          </p>
        </div>
        {role === "artist" && (
          <Link href="/dashboard/drops/new">
            <Button>+ New Drop</Button>
          </Link>
        )}
      </div>

      {drops.length === 0 ? (
        <EmptyState
          title="No drops"
          message="No drops to show yet. Be the first to create one."
          action={
            role === "artist" ? (
              <Link href="/dashboard/drops/new">
                <Button>+ New Drop</Button>
              </Link>
            ) : undefined
          }
        />
      ) : null}

      {drops.map((c) => {
        const fp = pct(c.backerFunded, c.backerGoal);
        return (
          <Link
            key={c.id}
            href={`/dashboard/drops/${c.id}`}
            className="block border-2 border-ink mb-3.5 bg-white no-underline text-ink"
          >
            <div className="flex flex-col sm:flex-row">
              {/* ID & percentage column */}
              <div className="w-full sm:w-20 bg-ink text-bg flex flex-row sm:flex-col items-center justify-center p-3 sm:py-3 gap-2 sm:gap-1">
                <Mono className="text-[9px] text-amber tracking-widest">
                  {c.id}
                </Mono>
                <div className="text-2xl sm:text-[28px] font-bold">{fp}%</div>
              </div>

              {/* Content */}
              <div className="flex-1 px-4 lg:px-5 py-3 lg:py-4">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <span className="text-lg lg:text-xl font-bold">
                      {c.name}
                    </span>
                    <div className="text-[13px] text-ink-mid mt-0.5">
                      {c.artist} · {c.genre}
                    </div>
                  </div>
                  <Badge status={c.status} />
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
                  {[
                    ["Goal", fmt(c.backerGoal)],
                    ["Funded", fmt(c.backerFunded)],
                    ["Min", fmt(c.minTicket)],
                    ["Share", c.revSharePct + "%"],
                    ["Cap", c.cap + "x"],
                    ["Tenor", c.tenorMonths + "mo"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <Mono className="text-[9px] text-ink-light tracking-wider block">
                        {l}
                      </Mono>
                      <Mono className="text-[13px] font-semibold">{v}</Mono>
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <Bar value={c.backerFunded} max={c.backerGoal} color="bg-amber" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
