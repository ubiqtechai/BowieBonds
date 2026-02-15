import { Mono } from "@/components/ui/mono";

interface EmptyStateProps {
  title: string;
  message: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="border-2 border-dashed border-sand p-8 lg:p-12 text-center">
      <Mono className="text-[10px] text-ink-light uppercase tracking-widest block mb-3">
        {title}
      </Mono>
      <p className="text-lg text-ink-light italic mb-4">{message}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
