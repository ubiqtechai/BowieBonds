"use client";

import { useToastStore } from "@/stores/toast-store";
import { Mono } from "@/components/ui/mono";

const typeStyles = {
  success: "bg-green text-white border-green",
  error: "bg-red text-white border-red",
  info: "bg-ink text-bg border-ink",
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-[9999] flex flex-col gap-2 max-w-sm w-full"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`border-2 px-4 py-3 flex items-start gap-3 animate-in ${typeStyles[toast.type]}`}
        >
          <Mono className="text-xs flex-1">{toast.message}</Mono>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-current opacity-70 hover:opacity-100 text-sm font-bold leading-none"
            aria-label="Dismiss notification"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
