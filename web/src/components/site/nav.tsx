"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Mono } from "@/components/ui/mono";
import { useCurrencyStore } from "@/stores/currency-store";
import { CURRENCIES } from "@/lib/constants";
import type { CurrencyCode } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/how", label: "How It Works" },
  { href: "/artists", label: "For Artists" },
  { href: "/backers", label: "For Backers" },
  { href: "/bowie-bonds", label: "Bowie Bonds" },
  { href: "/economics", label: "The Economics" },
  { href: "/trust", label: "Trust" },
  { href: "/faq", label: "FAQ" },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency } = useCurrencyStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-ink bg-bg sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto px-4 lg:px-10 flex items-center justify-between h-[60px]">
        {/* Logo + nav links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-[22px] font-bold tracking-tight no-underline text-ink"
          >
            ziggy<span className="text-amber">dust</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-2 font-mono text-[10px] uppercase tracking-wider no-underline ${
                  pathname === href
                    ? "bg-ink text-bg font-semibold"
                    : "text-ink hover:bg-warm"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: currency + auth + hamburger */}
        <div className="flex items-center gap-2">
          {/* Currency toggle (desktop) */}
          <div className="hidden sm:flex mr-2">
            {(["USD", "INR"] as CurrencyCode[]).map((c, i) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-3 py-1.5 border-[1.5px] border-ink font-mono text-[9px] font-semibold cursor-pointer ${
                  i > 0 ? "border-l-0" : ""
                } ${currency === c ? "bg-ink text-bg" : "bg-transparent text-ink"}`}
              >
                {CURRENCIES[c].symbol} {c}
              </button>
            ))}
          </div>

          {/* Auth buttons (desktop) */}
          <div className="hidden md:flex gap-2">
            <Link
              href="/login"
              className="px-5 py-2 border-[1.5px] border-ink bg-transparent text-ink font-mono text-[11px] uppercase tracking-wider no-underline"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 border-[1.5px] border-ink bg-ink text-bg font-mono text-[11px] font-semibold uppercase tracking-wider no-underline"
            >
              Sign Up
            </Link>
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 border-[1.5px] border-ink font-mono text-sm cursor-pointer bg-transparent"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="lg:hidden fixed inset-0 top-[60px] bg-ink z-40 flex flex-col p-8" aria-label="Mobile menu">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 font-mono text-lg uppercase tracking-wider no-underline border-b border-ink-mid ${
                pathname === href
                  ? "text-amber font-semibold"
                  : "text-bg"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Currency toggle in mobile menu */}
          <div className="flex mt-6">
            {(["USD", "INR"] as CurrencyCode[]).map((c, i) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`flex-1 py-2 border-[1.5px] border-bg font-mono text-[11px] font-semibold cursor-pointer ${
                  i > 0 ? "border-l-0" : ""
                } ${currency === c ? "bg-bg text-ink" : "bg-transparent text-bg"}`}
              >
                {CURRENCIES[c].symbol} {c}
              </button>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="flex gap-3 mt-6">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 py-3 border-[1.5px] border-bg text-center text-bg font-mono text-[11px] uppercase no-underline"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex-1 py-3 border-[1.5px] border-bg bg-bg text-ink text-center font-mono text-[11px] font-semibold uppercase no-underline"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
