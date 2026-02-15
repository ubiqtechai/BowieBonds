"use client";

import { Mono } from "@/components/ui/mono";
import { useCurrencyStore } from "@/stores/currency-store";
import { useUIStore } from "@/stores/ui-store";
import type { CurrencyCode } from "@/lib/constants";
import { CURRENCIES } from "@/lib/constants";
import { useState } from "react";

export function MobileHeader() {
  const { currency, setCurrency } = useCurrencyStore();
  const { role, setRole } = useUIStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="lg:hidden border-b-2 border-ink bg-bg sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold leading-none">
          ziggy<span className="text-amber">dust</span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 border-[1.5px] border-ink font-mono text-[10px] uppercase cursor-pointer bg-transparent"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="px-4 pb-4 border-t border-sand">
          <Mono className="text-[9px] font-semibold text-ink-mid uppercase tracking-widest mt-3 mb-1.5 block">
            Viewing as
          </Mono>
          <div className="flex">
            {(["artist", "backer", "platform"] as const).map((r, i) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setMenuOpen(false);
                }}
                className={`flex-1 py-[7px] border-[1.5px] border-ink font-mono text-[9px] font-semibold uppercase cursor-pointer ${
                  i > 0 ? "border-l-0" : ""
                } ${role === r ? "bg-ink text-bg" : "bg-transparent text-ink"}`}
              >
                {r}
              </button>
            ))}
          </div>

          <Mono className="text-[9px] font-semibold text-ink-mid uppercase tracking-widest mt-3 mb-1.5 block">
            Currency
          </Mono>
          <div className="flex">
            {(["USD", "INR"] as CurrencyCode[]).map((c, i) => (
              <button
                key={c}
                onClick={() => {
                  setCurrency(c);
                  setMenuOpen(false);
                }}
                className={`flex-1 py-[7px] border-[1.5px] border-ink font-mono text-[9px] font-semibold uppercase cursor-pointer ${
                  i > 0 ? "border-l-0" : ""
                } ${currency === c ? "bg-ink text-bg" : "bg-transparent text-ink"}`}
              >
                {CURRENCIES[c].symbol} {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
