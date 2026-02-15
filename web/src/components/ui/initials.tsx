import { getInitials } from "@/lib/utils";

interface InitialsProps {
  name: string;
  size?: number;
}

export function Initials({ name, size = 40 }: InitialsProps) {
  return (
    <div
      className="bg-ink text-bg flex items-center justify-center font-mono font-semibold shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {getInitials(name)}
    </div>
  );
}
