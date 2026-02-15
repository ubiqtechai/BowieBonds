"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mono } from "@/components/ui/mono";
import { NAV_ITEMS, CURRENCIES } from "@/lib/constants";
import { useCurrencyStore } from "@/stores/currency-store";
import { useUIStore } from "@/stores/ui-store";
import type { CurrencyCode } from "@/lib/constants";

export function Sidebar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrencyStore();
  const { role, setRole } = useUIStore();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex w-[220px] bg-bg border-r-2 border-ink fixed top-0 left-0 bottom-0 flex-col z-50" aria-label="Main navigation">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b-2 border-ink">
        <div className="text-[28px] text-ink leading-[0.9] tracking-tight font-bold">
          ziggy
          <br />
          <span className="text-amber">dust</span>
        </div>
        <Mono className="text-[8px] text-ink-mid uppercase tracking-[0.2em] mt-2 block">
          back your artiste
        </Mono>
        <Mono className="text-[8px] text-ink-light tracking-[0.15em] mt-0.5 block">
          back your music
        </Mono>
      </div>

      {/* Role & Currency toggles */}
      <div className="px-4 py-3.5 border-b-2 border-ink">
        <Mono className="text-[9px] font-semibold text-ink-mid uppercase tracking-widest mb-2 block">
          Viewing as
        </Mono>
        <div className="flex">
          {(["artist", "backer", "platform"] as const).map((r, i) => (
            <button
              key={r}
              onClick={() => setRole(r)}
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
              onClick={() => setCurrency(c)}
              className={`flex-1 py-[7px] border-[1.5px] border-ink font-mono text-[9px] font-semibold uppercase cursor-pointer ${
                i > 0 ? "border-l-0" : ""
              } ${currency === c ? "bg-ink text-bg" : "bg-transparent text-ink"}`}
            >
              {CURRENCIES[c].symbol} {c}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="py-3 flex-1" aria-label="Dashboard navigation">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center w-full px-5 py-[11px] border-b text-left no-underline ${
                active
                  ? "bg-ink border-ink"
                  : "bg-transparent border-sand hover:bg-warm"
              }`}
            >
              <Mono
                className={`text-[10px] mr-3 min-w-[18px] ${
                  active ? "text-amber" : "text-ink-light"
                }`}
              >
                {item.num}
              </Mono>
              <span
                className={`text-sm ${
                  active ? "font-semibold text-bg" : "font-normal text-ink"
                }`}
              >
                {item.label}
              </span>
              {active && (
                <Mono className="ml-auto text-sm text-amber">→</Mono>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t-2 border-ink">
        <Mono className="text-[8px] text-ink-light tracking-widest uppercase">
          Experimental · v0.1
        </Mono>
      </div>
    </aside>
  );
}
