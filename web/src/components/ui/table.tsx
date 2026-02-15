import { cn } from "@/lib/utils";

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function TH({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "text-left px-4 py-2.5 font-mono text-[9px] font-semibold text-ink-light uppercase tracking-widest border-b border-sand",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TD({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("px-4 py-2.5 text-xs border-b border-sand", className)}>
      {children}
    </td>
  );
}
