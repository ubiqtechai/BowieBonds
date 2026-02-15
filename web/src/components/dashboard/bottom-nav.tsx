"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mono } from "@/components/ui/mono";
import { NAV_ITEMS } from "@/lib/constants";

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg border-t-2 border-ink flex" aria-label="Mobile navigation">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex-1 flex flex-col items-center py-2.5 no-underline min-h-[56px] justify-center ${
              active ? "bg-ink" : "bg-transparent"
            } ${item.id !== "payouts" ? "border-r border-sand" : ""}`}
          >
            <Mono
              className={`text-[10px] font-semibold ${
                active ? "text-amber" : "text-ink-light"
              }`}
            >
              {item.id === "new" ? "+" : item.num}
            </Mono>
            <span
              className={`text-[9px] font-mono uppercase tracking-wide mt-0.5 ${
                active ? "text-bg font-semibold" : "text-ink-mid"
              }`}
            >
              {item.id === "new"
                ? "New"
                : item.id === "payouts"
                  ? "Pay"
                  : item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
