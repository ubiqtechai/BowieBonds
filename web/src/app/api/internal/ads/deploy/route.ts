import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";
import { refreshGoogleAdsToken, createAdCampaign } from "@/lib/google-ads";
import { decrypt } from "@/lib/encryption";

/**
 * POST /api/internal/ads/deploy
 * Deploy funds from lockbox to Google Ads for active drops.
 * Called manually or by cron when budget is available.
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
        adDeployments: true,
      },
    });

    const results: { dropId: string; status: string; spend?: number }[] = [];

    for (const drop of activeDrops) {
      const adsAccount = drop.artist.googleAdsAccount;
      if (!adsAccount) {
        results.push({ dropId: drop.id, status: "no_ads_account" });
        continue;
      }

      // Calculate remaining budget
      const totalDeployed = drop.adDeployments.reduce(
        (sum, d) => sum + d.spend,
        0
      );
      const remaining = drop.totalBudget - totalDeployed;

      if (remaining <= 0) {
        results.push({ dropId: drop.id, status: "budget_exhausted" });
        continue;
      }

      try {
        const accessToken = await refreshGoogleAdsToken(adsAccount);

        // Deploy a portion of the remaining budget
        const deployAmount = Math.min(remaining, Math.ceil(drop.totalBudget * 0.1)); // 10% at a time
        const adType = "pre_roll" as const; // Default ad type

        const result = await createAdCampaign({
          dropId: drop.id,
          accessToken,
          customerId: adsAccount.customerId,
          videoId: drop.videoId,
          budget: deployAmount,
          adType,
        });

        await db.adDeployment.create({
          data: {
            dropId: drop.id,
            deployedAt: new Date(),
            adType,
            spend: result.spend,
            impressions: result.impressions,
            views: result.views,
            ctr: result.ctr,
            googleInvoiceRef: result.invoiceRef,
          },
        });

        results.push({
          dropId: drop.id,
          status: "deployed",
          spend: result.spend,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown";
        results.push({ dropId: drop.id, status: `error: ${message}` });
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Ad deploy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { POST as GET };
