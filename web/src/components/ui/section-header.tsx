import { Mono } from "./mono";

interface SectionHeaderProps {
  children: React.ReactNode;
  right?: React.ReactNode;
}

export function SectionHeader({ children, right }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b-[1.5px] border-ink bg-warm">
      <Mono className="text-[11px] font-semibold text-ink uppercase tracking-widest">
        {children}
      </Mono>
      {right && (
        <Mono className="text-[10px] text-ink-light">{right}</Mono>
      )}
    </div>
  );
}
