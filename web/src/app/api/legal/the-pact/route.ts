import { NextResponse } from "next/server";

const THE_PACT = {
  title: "The Pact",
  subtitle: "Promotion Underwriting Agreement",
  version: "1.0",
  sections: [
    {
      heading: "§1 — Agreement Structure",
      content: "This Promotion Underwriting Agreement ('The Pact') is entered into between the Artist (creator of the Drop) and each Backer who commits a pledge. The agreement activates when the Drop reaches its funding goal and the Artist initiates activation."
    },
    {
      heading: "§2 — Artist Obligations",
      content: "The Artist commits to: (a) maintaining YouTube OAuth connection for the duration of the tenor, (b) not deleting or privating the promoted content, (c) making timely monthly settlement payments, (d) maintaining their YouTube Partner Program status."
    },
    {
      heading: "§3 — Backer Rights",
      content: "Backers are entitled to: (a) pro-rata share of monthly uplift payments based on their pledge proportion, (b) transparent access to revenue data via the platform, (c) cap-limited returns as specified in the Drop terms, (d) notification of any default events."
    },
    {
      heading: "§4 — Co-Pay Structure",
      content: "The Artist's co-pay (minimum 20% of total budget) serves as first-loss capital. Ad spend is deployed from co-pay funds first. This aligns artist incentives with campaign success."
    },
    {
      heading: "§5 — Revenue Share Mechanics",
      content: "Monthly revenue share is calculated as: (Channel Revenue - Baseline) × Rev Share %. Only positive uplift generates payments. The baseline is the immutable 30-day average computed at activation."
    },
    {
      heading: "§6 — Cap and Tenor",
      content: "Backer returns are capped at the specified multiple of their pledge amount. The obligation ends at the earlier of: (a) all backers reaching their cap, or (b) the tenor expiring. Any unrecovered amounts after tenor expiry are the backer's loss."
    },
    {
      heading: "§7 — Termination",
      content: "The agreement terminates upon: (a) all caps being reached, (b) tenor expiry, (c) mutual written agreement, or (d) a default event as defined in the House Rules."
    },
  ],
};

export async function GET() {
  return NextResponse.json(THE_PACT);
}
