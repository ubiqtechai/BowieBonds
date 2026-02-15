import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";
import { getValidToken, fetchDailyRevenue } from "@/lib/youtube";

/**
 * POST /api/internal/youtube/sync-revenue
 * Cron: Daily 06:00 UTC — pull yesterday's revenue for all active drops.
 */
export async function POST(req: NextRequest) {
  const authError = verifyCronAuth(req);
  if (authError) return authError;

  try {
    // Find all active drops with their artiste's YouTube channel
    const activeDrops = await db.drop.findMany({
      where: { status: "active" },
      include: {
        artist: {
          include: { youtubeChannel: true },
        },
      },
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split("T")[0];

    const results: { dropId: string; status: string; revenue?: number }[] = [];

    for (const drop of activeDrops) {
      const channel = drop.artist.youtubeChannel;
      if (!channel) {
        results.push({ dropId: drop.id, status: "no_channel" });
        continue;
      }

      try {
        const accessToken = await getValidToken(channel);
        const revenueData = await fetchDailyRevenue(
          accessToken,
          dateStr,
          dateStr
        );

        if (revenueData.length > 0) {
          const dayRevenue = revenueData[0].revenue;
          const estimatedUplift = Math.max(
            0,
            dayRevenue - (drop.baselineDaily || 0)
          );

          await db.revenueObservation.upsert({
            where: {
              dropId_observationDate: {
                dropId: drop.id,
                observationDate: yesterday,
              },
            },
            create: {
              dropId: drop.id,
              observationDate: yesterday,
              grossRevenue: dayRevenue,
              estimatedUplift,
              source: "youtube_api",
            },
            update: {
              grossRevenue: dayRevenue,
              estimatedUplift,
            },
          });

          results.push({
            dropId: drop.id,
            status: "synced",
            revenue: dayRevenue,
          });
        } else {
          results.push({ dropId: drop.id, status: "no_data" });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown";
        results.push({ dropId: drop.id, status: `error: ${message}` });
      }
    }

    return NextResponse.json({
      success: true,
      date: dateStr,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Sync revenue error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { POST as GET };