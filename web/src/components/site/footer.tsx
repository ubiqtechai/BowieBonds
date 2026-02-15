import Link from "next/link";
import { Mono } from "@/components/ui/mono";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-bg px-4 lg:px-10 pt-12 pb-8">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="text-2xl font-bold tracking-tight mb-2">
            ziggy<span className="text-amber">dust</span>
          </div>
          <Mono className="text-[9px] text-ink-light uppercase tracking-[0.15em] block">
            back your artiste
          </Mono>
          <Mono className="text-[9px] text-ink-light tracking-[0.15em] block mt-0.5">
            back your music
          </Mono>
          <Mono className="text-[9px] text-ink-light tracking-widest block mt-4">
            Experimental · Not financial advice · Not a security
          </Mono>
        </div>
        <div className="flex gap-12 md:gap-12">
          <div>
            <Mono className="text-[9px] text-amber uppercase tracking-widest block mb-3">
              Learn
            </Mono>
            {[
              ["/how", "How It Works"],
              ["/bowie-bonds", "Bowie Bonds"],
              ["/economics", "The Economics"],
              ["/trust", "Trust Architecture"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="block font-mono text-[11px] text-sand no-underline mb-1.5 hover:text-bg"
              >
                {label}
              </Link>
            ))}
          </div>
          <div>
            <Mono className="text-[9px] text-amber uppercase tracking-widest block mb-3">
              Join
            </Mono>
            {[
              ["/artists", "For Artistes"],
              ["/backers", "For Backers"],
              ["/faq", "FAQ"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="block font-mono text-[11px] text-sand no-underline mb-1.5 hover:text-bg"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto mt-8 border-t border-ink-mid pt-4">
        <Mono className="text-[9px] text-ink-mid">
          &copy; 2026 ZiggyDust. Platform facilitator only. No custody of
          funds.
        </Mono>
      </div>
    </footer>
  );
}
