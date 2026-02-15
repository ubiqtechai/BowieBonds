import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";
import { getValidToken, fetchChannelStats } from "@/lib/youtube";

/**
 * POST /api/internal/youtube/sync-stats
 * Cron: Weekly — refresh channel stats for all artist YouTube channels.
 */
export async function POST(req: NextRequest) {
  const authError = verifyCronAuth(req);
  if (authError) return authError;

  try {
    const channels = await db.youtubeChannel.findMany({
      where: { verified: true },
    });

    const results: { channelId: string; status: string }[] = [];

    for (const channel of channels) {
      try {
        const accessToken = await getValidToken(channel);
        const stats = await fetchChannelStats(accessToken);

        await db.youtubeChannel.update({
          where: { id: channel.id },
          data: {
            subscribers: stats.subscribers,
            totalViews: stats.totalViews,
            channelAge: stats.channelAge,
            lastSynced: new Date(),
          },
        });

        results.push({ channelId: channel.channelId, status: "synced" });
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown";
        results.push({
          channelId: channel.channelId,
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
    console.error("Sync stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { POST as GET };
