import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "font-mono font-semibold uppercase tracking-wide cursor-pointer border-2 border-ink transition-colors",
        size === "sm" && "px-3.5 py-1.5 text-[10px]",
        size === "md" && "px-6 py-3 text-xs",
        size === "lg" && "px-8 py-3.5 text-[13px]",
        variant === "primary" && "bg-ink text-bg hover:bg-ink-soft",
        variant === "secondary" && "bg-transparent text-ink hover:bg-warm",
        variant === "ghost" &&
          "bg-transparent text-ink border-transparent hover:border-ink",
        disabled && "opacity-40 cursor-not-allowed hover:bg-transparent",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
