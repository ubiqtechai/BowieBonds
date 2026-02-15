// ZiggyDust Design Tokens & Constants
// These mirror the Tailwind theme for use in JS logic

export const COLORS = {
  bg: "#F5F0E8",
  warm: "#EDE6D8",
  sand: "#D9CFC0",
  ink: "#1A1814",
  inkSoft: "#3D3832",
  inkMid: "#6B6358",
  inkLight: "#9A9285",
  amber: "#C8762D",
  amberLight: "#E8A654",
  amberFaint: "#F5E6D0",
  red: "#C44B3F",
  redFaint: "#FCEAE8",
  green: "#3A7D5C",
  greenFaint: "#E5F2EC",
  violet: "#6B5CA5",
  white: "#FFFFFF",
} as const;

export const CURRENCIES = {
  USD: { symbol: "$", locale: "en-US", rate: 1 },
  INR: { symbol: "₹", locale: "en-IN", rate: 85 },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;

export const STATUS_MAP = {
  active: { bg: "bg-ink", text: "text-bg", label: "LIVE" },
  funding: { bg: "bg-amber", text: "text-white", label: "SEEKING BACKERS" },
  draft: { bg: "bg-amber-faint", text: "text-amber", label: "DRAFT" },
  completed: { bg: "bg-green-faint", text: "text-green", label: "COMPLETED" },
  defaulted: { bg: "bg-red-faint", text: "text-red", label: "DEFAULTED" },
  pending: { bg: "bg-amber-faint", text: "text-amber", label: "PENDING" },
  paid: { bg: "bg-green-faint", text: "text-green", label: "PAID" },
  overdue: { bg: "bg-red-faint", text: "text-red", label: "OVERDUE" },
  disputed: { bg: "bg-violet", text: "text-white", label: "DISPUTED" },
} as const;

export const NAV_ITEMS = [
  { id: "home", num: "01", label: "Home", href: "/dashboard" },
  { id: "drops", num: "02", label: "Drops", href: "/dashboard/drops" },
  { id: "new", num: "03", label: "New Drop", href: "/dashboard/drops/new" },
  { id: "deal", num: "04", label: "The Deal", href: "/dashboard/deal" },
  { id: "payouts", num: "05", label: "Payouts", href: "/dashboard/payouts" },
] as const;
