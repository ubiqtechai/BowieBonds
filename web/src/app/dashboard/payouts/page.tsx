"use client";

import { Badge } from "@/components/ui/badge";
import { Mono } from "@/components/ui/mono";
import { Card } from "@/components/ui/card";
import { Table, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDropsData } from "@/hooks/useDropsData";
import { useSettlementAction } from "@/hooks/useSettlements";
import { formatCurrency } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";
import { useToastStore } from "@/stores/toast-store";

export default function PayoutsPage() {
  const { currency } = useCurrencyStore();
  const { addToast } = useToastStore();
  const settlementAction = useSettlementAction();
  const fmt = (n: number) => formatCurrency(n, currency);
  const { data: drops = [] } = useDropsData();
  const dropsWithSettlements = drops.filter(
    (c) => c.settlements.length > 0
  );

  return (
    <div className="px-4 lg:px-12 py-8 lg:py-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-1">Payouts</h1>
      <p className="text-ink-mid text-sm mb-8">
        Monthly reports and what&apos;s been paid
      </p>

      {dropsWithSettlements.map((c) => (
        <Card key={c.id} className="mb-5">
          {/* Header */}
          <div className="px-4 lg:px-6 py-3.5 border-b-[1.5px] border-ink bg-warm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-bold">{c.name}</span>
              <Mono className="text-[11px] text-ink-mid">
                {c.id} · {c.revSharePct}% · {c.cap}x
              </Mono>
            </div>
            <Badge status={c.status} />
          </div>

          {/* Settlement table */}
          <Table>
            <thead>
              <tr>
                <TH>Period</TH>
                <TH>Revenue</TH>
                <TH className="hidden sm:table-cell">Baseline</TH>
                <TH>Uplift</TH>
                <TH>Share</TH>
                <TH>Status</TH>
                <TH></TH>
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
                  <TD>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        if (s.status === "pending" && s.id) {
                          settlementAction.mutate(
                            { id: s.id, action: "pay" },
                            {
                              onSuccess: () => addToast("success", "Settlement marked as paid."),
                              onError: (err) => addToast("error", err.message || "Failed to mark paid."),
                            }
                          );
                        }
                      }}
                    >
                      {s.status === "pending" ? "Mark Paid" : "Receipt"}
                    </Button>
                  </TD>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Footer summary */}
          <div className="flex flex-col sm:flex-row justify-between px-4 lg:px-5 py-3 bg-warm gap-1">
            <Mono className="text-[11px] text-ink-mid">
              Total paid out:{" "}
              <strong className="text-green">{fmt(c.totalSettled)}</strong>
            </Mono>
            <Mono className="text-[11px] text-ink-mid">
              {Math.round(
                (c.totalSettled / (c.backerFunded * c.cap)) * 100
              )}
              % of cap
            </Mono>
          </div>
        </Card>
      ))}

      {dropsWithSettlements.length === 0 && (
        <div className="border-2 border-dashed border-sand p-12 text-center text-ink-light text-lg italic">
          No payout data yet.
        </div>
      )}
    </div>
  );
}
