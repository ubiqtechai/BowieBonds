import { cn } from "@/lib/utils";

interface BarProps {
  value: number;
  max: number;
  color?: string;
  height?: number;
}

export function Bar({ value, max, color = "bg-ink", height = 8 }: BarProps) {
  const width = Math.min((value / max) * 100, 100);
  return (
    <div className="bg-sand overflow-hidden" style={{ height }}>
      <div
        className={cn("h-full transition-[width] duration-600 ease-out", color)}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
