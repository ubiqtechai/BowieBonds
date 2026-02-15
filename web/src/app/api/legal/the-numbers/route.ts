import { NextResponse } from "next/server";

const THE_NUMBERS = {
  title: "The Numbers",
  subtitle: "Financial Terms & Methodology",
  version: "1.0",
  sections: [
    {
      heading: "§1 — Baseline Computation",
      content: "The baseline is computed as the arithmetic mean of daily channel-wide YouTube AdSense revenue over the 30 calendar days immediately preceding Drop activation. This figure is immutable once computed and cannot be disputed."
    },
    {
      heading: "§2 — Uplift Calculation",
      content: "Daily uplift = Max(0, Daily Channel Revenue - Baseline Daily). Only positive uplift counts. Negative days (revenue below baseline) do not create debits or reduce future obligations."
    },
    {
      heading: "§3 — Monthly Settlement",
      content: "Monthly settlement amount = Sum of daily uplift for the calendar month × Revenue Share %. Settlements are computed on the 1st of each month for the prior month. Payment is due within 15 days."
    },
    {
      heading: "§4 — Pro-Rata Allocation",
      content: "Each backer's share of the monthly settlement = (Backer's Pledge / Total Pledged) × Monthly Settlement Amount. Principal recovery is prioritized: the first dollars returned count toward principal recovery before being counted as return."
    },
    {
      heading: "§5 — Cap Enforcement",
      content: "Each backer's cumulative receipts are capped at Pledge Amount × Cap Multiple. Once a backer reaches their cap, their pro-rata share is redistributed to remaining backers. When all backers are capped, the Drop is marked as completed."
    },
    {
      heading: "§6 — Currency",
      content: "All financial calculations, settlements, and payments are denominated in the Drop's native currency (selected by the artist at creation). Display currency toggling on the platform is cosmetic only and does not affect settlement amounts."
    },
    {
      heading: "§7 — Escrow & Ad Spend",
      content: "The total budget (co-pay + backer commitments) forms the campaign's ad spend budget. Funds are deployed for YouTube advertising through Google Ads. All ad receipts (invoices, spend, impressions) are visible to all parties via the platform."
    },
    {
      heading: "§8 — Waterfall Priority",
      content: "Settlement payments follow this waterfall: (1) Principal recovery for backers who haven't recovered their pledge amount, (2) Return payments for backers who have recovered principal but haven't reached cap, (3) Excess retained by artist."
    },
  ],
};

export async function GET() {
  return NextResponse.json(THE_NUMBERS);
}
