import { NextResponse } from "next/server";

const THE_PACT = {
  title: "The Pact",
  subtitle: "Copyright Licensing Agreement",
  version: "2.0",
  sections: [
    {
      heading: "§1 — Agreement Structure",
      content: "This Copyright Licensing Agreement ('The Pact') is entered into between the Artist ('Licensor', creator of the Drop) and each Backer ('Licensee') who commits a license fee. The agreement activates when the Drop reaches its funding goal and the Artist initiates activation."
    },
    {
      heading: "§2 — Copyright License Grant",
      content: "The Artist grants an exclusive license on the specific promoted work's copyright — and only that work — to the backer pool for the license period. The license covers all copyright-related rights in that one promoted work only. It does not extend to the Artist's channel, catalogue, or any other works. The license is granted pro-rata to all backers based on their license fee proportion."
    },
    {
      heading: "§3 — Backer Rights",
      content: "Backers (Licensees) are entitled to: (a) pro-rata share of the exclusive copyright license on the specific promoted work, (b) pro-rata share of monthly license revenue (uplift payments) based on their license fee proportion, (c) transparent access to revenue data via the platform, (d) cap-limited returns as specified in the Drop terms, (e) retention of the copyright license on the work in the event of artist default."
    },
    {
      heading: "§4 — Co-Pay Structure",
      content: "The Artist's co-pay (minimum 20% of total budget) serves as first-loss capital. Ad spend is deployed from co-pay funds first. This aligns artist incentives with campaign success."
    },
    {
      heading: "§5 — License Revenue Mechanics",
      content: "Monthly license revenue is calculated as: (Channel Revenue - Baseline) × Rev Share %. Only positive uplift generates payments. The baseline is the immutable 30-day average computed at activation. The backer's original license fee is recovered first before revenue share flows."
    },
    {
      heading: "§6 — Copyright Reversion",
      content: "The exclusive copyright license on the specific promoted work automatically reverts to the Artist upon the earlier of: (a) all backers reaching their return cap, or (b) the license period expiring. Upon reversion, the Artist regains full, unencumbered rights to that work. The license never extended beyond the one promoted work. No action is required from either party — reversion is automatic."
    },
    {
      heading: "§7 — Termination & Default",
      content: "The agreement terminates upon: (a) copyright reversion per §6, (b) mutual written agreement, or (c) a default event as defined in the House Rules. On default, backers retain the exclusive copyright license on the specific promoted work. Default events include: missed payments (>30 days overdue), OAuth token revocation, content deletion, and material misrepresentation."
    },
  ],
};

export async function GET() {
  return NextResponse.json(THE_PACT);
}
