import { NextResponse } from "next/server";

const THE_NUMBERS = {
  title: "The Numbers",
  subtitle: "License Terms & Revenue Methodology",
  version: "2.0",
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
      heading: "§3 — Monthly License Payout",
      content: "Monthly license payout = Sum of daily uplift for the calendar month × Revenue Share %. Payouts are computed on the 1st of each month for the prior month. Payment is due within 15 days."
    },
    {
      heading: "§4 — Pro-Rata Allocation",
      content: "Each backer's share of the monthly payout = (Backer's License Fee / Total License Fees) × Monthly Payout Amount. License fee recovery is prioritised: the first funds returned count toward recovering the backer's original license fee before being counted as revenue share."
    },
    {
      heading: "§5 — Cap Enforcement & Copyright Reversion",
      content: "Each backer's cumulative receipts are capped at License Fee × Cap Multiple. Once a backer reaches their cap, their pro-rata share is redistributed to remaining backers. When all backers are capped, the Drop is marked as completed and the copyright license on the specific promoted work automatically reverts to the artiste."
    },
    {
      heading: "§6 — Currency",
      content: "All financial calculations, payouts, and payments are denominated in the Drop's native currency (selected by the artiste at creation). Display currency toggling on the platform is cosmetic only and does not affect payout amounts."
    },
    {
      heading: "§7 — Escrow & Ad Spend",
      content: "The total budget (co-pay + backer license fees) forms the campaign's ad spend budget. Funds are deployed for YouTube advertising through Google Ads. All ad receipts (invoices, spend, impressions) are visible to all parties via the platform."
    },
    {
      heading: "§8 — Waterfall Priority",
      content: "License payouts follow this waterfall: (1) License fee recovery for backers who haven't recovered their original license fee, (2) License revenue share for backers who have recovered their fee but haven't reached cap, (3) Copyright on the specific promoted work reverts to artiste; artiste retains all future revenue. The license never extended beyond the one promoted work."
    },
  ],
};

export async function GET() {
  return NextResponse.json(THE_NUMBERS);
}
