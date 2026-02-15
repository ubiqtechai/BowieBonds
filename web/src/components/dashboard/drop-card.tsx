"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Bar } from "@/components/ui/bar";
import { Spark } from "@/components/ui/spark";
import { Mono } from "@/components/ui/mono";
import { formatCurrency } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";
import { pct } from "@/lib/utils";
import type { Drop } from "@/lib/mock-data";

export function DropCard({ drop, index }: { drop: Drop; index: number }) {
  const { currency } = useCurrencyStore();
  const fmt = (n: number) => formatCurrency(n, currency);
  const fp = pct(drop.backerFunded, drop.backerGoal);
  const up =
    drop.baselineDaily > 0
      ? Math.round(
          ((drop.currentDaily - drop.baselineDaily) / drop.baselineDaily) * 100
        )
      : 0;

  const rotations = ["-rotate-[0.5deg]", "rotate-[0.3deg]", "-rotate-[0.2deg]"];

  return (
    <Link
      href={`/dashboard/drops/${drop.id}`}
      className={`block border-2 border-ink mb-5 bg-white cursor-pointer no-underline text-ink lg:${rotations[index % 3]}`}
    >
      {/* Header bar */}
      <div
        className={`flex justify-between items-center px-4 lg:px-5 py-3 border-b-[1.5px] border-ink ${
          index === 0 ? "bg-ink" : "bg-warm"
        }`}
      >
        <div className="flex items-center gap-3">
          <Mono
            className={`text-[11px] font-semibold ${
              index === 0 ? "text-amber" : "text-ink-mid"
            }`}
          >
            {drop.id}
          </Mono>
          <Badge status={drop.status} />
        </div>
        <Mono
          className={`text-[10px] hidden sm:block ${
            index === 0 ? "text-bg/60" : "text-ink-light"
          }`}
        >
          {drop.genre}
        </Mono>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row">
        {/* Content section */}
        <div className="flex-1 p-4 lg:p-5 lg:pr-6 lg:border-r-[1.5px] lg:border-ink">
          <div className="text-2xl lg:text-[30px] font-bold leading-none mb-1">
            {drop.name}
          </div>
          <div className="text-sm text-ink-mid mb-1">{drop.artist}</div>
          <div className="text-sm text-ink-light italic mb-4 hidden sm:block">
            &ldquo;{drop.tagline}&rdquo;
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
            {[
              ["Goal", fmt(drop.backerGoal)],
              ["Funded", fmt(drop.backerFunded)],
              ["Min Ticket", fmt(drop.minTicket)],
              ["Share", drop.revSharePct + "%"],
              ["Cap", drop.cap + "x"],
            ].map(([label, value]) => (
              <div key={label}>
                <Mono className="text-[9px] text-ink-light uppercase tracking-widest block">
                  {label}
                </Mono>
                <Mono className="text-[15px] font-semibold text-ink">
                  {value}
                </Mono>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="flex justify-between mb-1.5">
            <Mono className="text-[10px] text-ink-mid">{fp}% funded</Mono>
            <Mono className="text-[10px] text-ink-mid">
              {drop.backers.length} backers
            </Mono>
          </div>
          <Bar
            value={drop.backerFunded}
            max={drop.backerGoal}
            color={drop.status === "active" ? "bg-ink" : "bg-amber"}
          />
        </div>

        {/* Chart section */}
        <div className="w-full lg:w-[220px] p-4 lg:p-5 flex flex-col justify-between border-t lg:border-t-0 border-sand">
          {drop.status === "active" ? (
            <>
              <div>
                <Mono className="text-[9px] text-ink-light uppercase tracking-widest block mb-1">
                  Revenue
                </Mono>
                <Spark data={drop.rd} width={180} height={60} />
              </div>
              <div className="flex gap-4 mt-3">
                <div>
                  <Mono className="text-[9px] text-ink-light block">DAILY</Mono>
                  <Mono className="text-base font-semibold">
                    {fmt(drop.currentDaily)}
                  </Mono>
                </div>
                <div>
                  <Mono className="text-[9px] text-ink-light block">
                    UPLIFT
                  </Mono>
                  <Mono
                    className={`text-base font-semibold ${
                      up > 0 ? "text-green" : "text-ink-mid"
                    }`}
                  >
                    {up > 0 ? "+" : ""}
                    {up}%
                  </Mono>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 py-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-amber">{fp}%</div>
                <Mono className="text-[10px] text-ink-mid">of goal</Mono>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
