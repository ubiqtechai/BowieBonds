import { NextResponse } from "next/server";

const HOUSE_RULES = {
  title: "House Rules",
  subtitle: "Platform Terms of Service",
  version: "1.0",
  sections: [
    {
      heading: "§1 — Platform Role",
      content: "ZiggyDust is a facilitator that connects artists with backers for YouTube promotion campaigns. The platform does not custody funds, provide financial advice, or guarantee returns. All transactions occur directly between parties."
    },
    {
      heading: "§2 — Identity Verification",
      content: "All users must provide a valid LinkedIn profile URL. Artists must connect their YouTube channel via OAuth. Anonymous participation is not permitted. Users represent that all information provided is accurate and current."
    },
    {
      heading: "§3 — Copyright Licensing Agreements",
      content: "Each Drop constitutes a copyright licensing agreement between the Artist (Licensor) and participating Backers (Licensees). The Artist grants an exclusive license on the promoted video's copyright to the backer pool for the license period. The terms (revenue share %, return cap, license period) are set by the artist and accepted by backers through their license fee commitment."
    },
    {
      heading: "§4 — Revenue Tracking",
      content: "Revenue is tracked via YouTube Analytics API using read-only OAuth access. The baseline is computed as the 30-day average daily channel-wide revenue before activation. Only positive uplift above baseline counts toward backer returns."
    },
    {
      heading: "§5 — Settlement Obligations",
      content: "Artists are obligated to make monthly settlement payments based on channel-wide revenue uplift. Settlements are due within 15 days of each month-end. Failure to pay within 30 days constitutes a default event."
    },
    {
      heading: "§6 — Default Events",
      content: "Default triggers include: missed payments (>30 days overdue), OAuth token revocation, content deletion, and material misrepresentation. On default, backers retain the exclusive copyright license on the promoted video. Default events are recorded permanently on the user's track record."
    },
    {
      heading: "§7 — Dispute Resolution",
      content: "Either party may dispute a settlement calculation. Disputes are reviewed by the platform within 7 business days. The platform's determination based on YouTube API data is final."
    },
    {
      heading: "§8 — Limitation of Liability",
      content: "ZiggyDust is not liable for YouTube API data accuracy, advertiser payment delays, or changes to YouTube's monetization policies. Users acknowledge that promotion outcomes are inherently uncertain."
    },
    {
      heading: "§9 — Regulatory Characterisation",
      content: "ZiggyDust facilitates copyright licensing arrangements between content creators (Artists) and backers (Licensees). Artists grant a temporary exclusive license over their content rights; backers fund promotion campaigns against that license. Copyright reverts to the artist upon fulfilment of the arrangement terms. This is a commercial intellectual property transaction governed by the Copyright Act, 1957 — not a lending, deposit-taking, or securities arrangement. ZiggyDust is not a lender, deposit-taker, investment advisor, or securities platform. Escrow services are provided through a registered partner. Users are encouraged to consult their own legal and financial advisors."
    },
    {
      heading: "§10 — Copyright Reversion",
      content: "Upon the earlier of: (a) all backers reaching their return cap, or (b) the license period expiring, the exclusive copyright license on the promoted video automatically reverts to the Artist. No action is required from either party. Upon reversion, the Artist regains full, unencumbered rights to the promoted video. If the Artist defaults under §6, the copyright license is retained by the backer pool."
    },
  ],
};

export async function GET() {
  return NextResponse.json(HOUSE_RULES);
}
