import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";
import { getValidToken, fetchDailyRevenue } from "@/lib/youtube";

/**
 * POST /api/internal/baseline/compute
 * Compute 30-day baseline for drops that are ready for activation.
 * This can be triggered manually before activation or by cron.
 */
export async function POST(req: NextRequest) {
  const authError = verifyCronAuth(req);
  if (authError) return authError;

  try {
    // Find funding drops that are fully funded but not yet activated
    const fundingDrops = await db.drop.findMany({
      where: {
        status: "funding",
        baselineSnapshot: null, // No baseline computed yet
      },
      include: {
        artist: {
          include: { youtubeChannel: true },
        },
        pledges: {
          where: { status: { not: "withdrawn" } },
        },
      },
    });

    const results: { dropId: string; status: string; baseline?: number }[] = [];

    for (const drop of fundingDrops) {
      // Check if fully funded
      const totalPledged = drop.pledges.reduce((sum, p) => sum + p.amount, 0);
      if (totalPledged < drop.backerGoal) {
        results.push({ dropId: drop.id, status: "not_fully_funded" });
        continue;
      }

      const channel = drop.artist.youtubeChannel;
      if (!channel) {
        results.push({ dropId: drop.id, status: "no_channel" });
        continue;
      }

      try {
        const accessToken = await getValidToken(channel);

        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const revenueData = await fetchDailyRevenue(
          accessToken,
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0]
        );

        const dailyValues = revenueData.map((r) => ({
          date: r.date,
          revenue: r.revenue,
        }));

        const computedAvg =
          revenueData.length > 0
            ? Math.round(
                revenueData.reduce((sum, r) => sum + r.revenue, 0) /
                  revenueData.length
              )
            : 0;

        await db.baselineSnapshot.create({
          data: {
            dropId: drop.id,
            periodStart: startDate,
            periodEnd: endDate,
            dailyValues,
            computedAvg,
          },
        });

        // Update the drop's baseline
        await db.drop.update({
          where: { id: drop.id },
          data: { baselineDaily: computedAvg },
        });

        results.push({
          dropId: drop.id,
          status: "computed",
          baseline: computedAvg,
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
    console.error("Baseline compute error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { POST as GET };
