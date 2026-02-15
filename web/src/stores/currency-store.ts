"use client";

import { create } from "zustand";
import type { CurrencyCode } from "@/lib/constants";

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: "USD",
  setCurrency: (currency) => set({ currency }),
}));
