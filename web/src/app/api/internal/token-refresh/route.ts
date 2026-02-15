import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";
import { refreshYouTubeToken } from "@/lib/youtube";
import { refreshGoogleAdsToken } from "@/lib/google-ads";

/**
 * POST /api/internal/token-refresh
 * Cron: Hourly — proactively refresh OAuth tokens that are about to expire.
 */
export async function POST(req: NextRequest) {
  const authError = verifyCronAuth(req);
  if (authError) return authError;

  try {
    const soon = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    const results: { type: string; id: string; status: string }[] = [];

    // Refresh YouTube tokens expiring soon
    const expiringYouTube = await db.youtubeChannel.findMany({
      where: {
        tokenExpires: { lt: soon },
        verified: true,
      },
    });

    for (const channel of expiringYouTube) {
      try {
        await refreshYouTubeToken(channel);
        results.push({
          type: "youtube",
          id: channel.channelId,
          status: "refreshed",
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown";
        results.push({
          type: "youtube",
          id: channel.channelId,
          status: `error: ${message}`,
        });
      }
    }

    // Refresh Google Ads tokens (these don't have expiry tracking,
    // so we refresh all of them periodically)
    const adsAccounts = await db.googleAdsAccount.findMany({
      where: { verified: true },
    });

    for (const account of adsAccounts) {
      try {
        await refreshGoogleAdsToken(account);
        results.push({
          type: "google_ads",
          id: account.customerId,
          status: "refreshed",
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown";
        results.push({
          type: "google_ads",
          id: account.customerId,
          status: `error: ${message}`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { POST as GET };
