import { Mono } from "@/components/ui/mono";

interface Stat {
  label: string;
  value: string | number;
  sub: string;
}

export function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="flex flex-wrap border-t-2 border-b-2 border-ink">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`flex-1 min-w-[120px] px-4 lg:px-6 py-4 lg:py-5 ${
            i < stats.length - 1 ? "border-r border-sand" : ""
          }`}
        >
          <Mono className="text-[9px] text-ink-light uppercase tracking-widest block mb-2">
            {s.label}
          </Mono>
          <div className="text-xl lg:text-[28px] font-bold text-ink">
            {s.value}
          </div>
          <Mono className="text-[10px] text-ink-mid block mt-1">{s.sub}</Mono>
        </div>
      ))}
    </div>
  );
}
