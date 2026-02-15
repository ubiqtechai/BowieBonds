import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";
import { refreshGoogleAdsToken, pullAdReceipts } from "@/lib/google-ads";

/**
 * POST /api/internal/ads/receipts
 * Cron: Pull updated ad performance data for all active drops.
 */
export async function POST(req: NextRequest) {
  const authError = verifyCronAuth(req);
  if (authError) return authError;

  try {
    const activeDrops = await db.drop.findMany({
      where: { status: "active" },
      include: {
        artist: {
          include: { googleAdsAccount: true },
        },
        adDeployments: {
          where: {
            impressions: 0, // Only update deployments with no performance data yet
          },
        },
      },
    });

    const results: { dropId: string; updated: number }[] = [];

    for (const drop of activeDrops) {
      const adsAccount = drop.artist.googleAdsAccount;
      if (!adsAccount || drop.adDeployments.length === 0) continue;

      try {
        const accessToken = await refreshGoogleAdsToken(adsAccount);
        let updated = 0;

        for (const deployment of drop.adDeployments) {
          const receipt = await pullAdReceipts({
            accessToken,
            customerId: adsAccount.customerId,
            campaignId: deployment.id,
          });

          if (receipt.impressions > 0) {
            await db.adDeployment.update({
              where: { id: deployment.id },
              data: {
                impressions: receipt.impressions,
                views: receipt.views,
                ctr: receipt.ctr,
              },
            });
            updated++;
          }
        }

        results.push({ dropId: drop.id, updated });
      } catch (error) {
        console.error(`Ad receipts error for drop ${drop.id}:`, error);
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Ad receipts error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { POST as GET };
