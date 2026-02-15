import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function Section({ children, dark, className }: SectionProps) {
  return (
    <div
      className={cn(
        "px-4 lg:px-10 py-16 lg:py-20",
        dark ? "bg-ink text-bg" : "bg-bg text-ink",
        className
      )}
    >
      <div className="max-w-[1100px] mx-auto">{children}</div>
    </div>
  );
}
