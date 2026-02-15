import { STATUS_MAP } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BadgeStatus = keyof typeof STATUS_MAP;

export function Badge({ status }: { status: BadgeStatus }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.pending;
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 font-mono text-[10px] font-semibold tracking-widest uppercase",
        s.bg,
        s.text
      )}
    >
      {status === "active" && "⚡ "}
      {status === "paid" && "✓ "}
      {s.label}
    </span>
  );
}
