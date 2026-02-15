import { cn } from "@/lib/utils";
import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1.5 font-mono text-[9px] font-semibold text-ink-mid uppercase tracking-widest"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          "w-full px-3.5 py-2.5 border-2 bg-white text-ink text-sm font-normal outline-none",
          error ? "border-red" : "border-ink",
          "focus:border-amber",
          className
        )}
        {...props}
      />
      {error && (
        <span className="block mt-1 font-mono text-[10px] text-red">
          {error}
        </span>
      )}
    </div>
  );
}
