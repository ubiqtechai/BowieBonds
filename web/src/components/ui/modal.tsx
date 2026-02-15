"use client";

import { useEffect, useCallback, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  ariaLabel?: string;
}

export function Modal({
  open,
  onClose,
  children,
  width = "max-w-md",
  ariaLabel = "Dialog",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      // Focus the dialog on open
      dialogRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, handleEsc]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center bg-ink/60 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`bg-bg border-3 border-ink p-8 w-full ${width} md:w-auto max-h-[90vh] overflow-y-auto outline-none`}
      >
        {children}
      </div>
    </div>
  );
}
