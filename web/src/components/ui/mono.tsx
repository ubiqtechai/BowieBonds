import { cn } from "@/lib/utils";

interface MonoProps {
  children: React.ReactNode;
  className?: string;
}

export function Mono({ children, className }: MonoProps) {
  return <span className={cn("font-mono", className)}>{children}</span>;
}
