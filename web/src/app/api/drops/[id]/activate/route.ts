import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";

// POST /api/drops/[id]/activate — lock baseline, transition to active
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const drop = await db.drop.findUnique({
      where: { id },
      include: { pledges: { where: { status: { not: "withdrawn" } } } },
    });

    if (!drop) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 });
    }
    if (drop.artistId !== auth.userId) {
      return NextResponse.json({ error: "Not your drop" }, { status: 403 });
    }
    if (drop.status !== "funding") {
      return NextResponse.json(
        { error: "Only funding drops can be activated" },
        { status: 400 }
      );
    }

    // Check fully funded
    const totalPledged = drop.pledges.reduce((sum, p) => sum + p.amount, 0);
    if (totalPledged < drop.backerGoal) {
      return NextResponse.json(
        { error: `Drop is not fully funded. ${drop.backerGoal - totalPledged} remaining.` },
        { status: 400 }
      );
    }

    // Compute baseline from last 30 days of revenue observations
    // In production this would pull from YouTube Analytics API
    // For now, compute from any existing revenue data or set to 0
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const revenueData = await db.revenueObservation.findMany({
      where: {
        dropId: id,
        observationDate: { gte: thirtyDaysAgo },
      },
      orderBy: { observationDate: "asc" },
    });

    const dailyValues = revenueData.map((r) => ({
      date: r.observationDate.toISOString().split("T")[0],
      revenue: r.grossRevenue,
    }));

    const computedAvg =
      revenueData.length > 0
        ? Math.round(
            revenueData.reduce((sum, r) => sum + r.grossRevenue, 0) /
              revenueData.length
          )
        : 0;

    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + drop.tenorMonths);

    // Transaction: create baseline, activate drop, activate pledges
    await db.$transaction([
      db.baselineSnapshot.create({
        data: {
          dropId: id,
          periodStart: thirtyDaysAgo,
          periodEnd: now,
          dailyValues: dailyValues,
          computedAvg,
        },
      }),
      db.drop.update({
        where: { id },
        data: {
          status: "active",
          baselineDaily: computedAvg,
          activatedAt: now,
          expiresAt,
        },
      }),
      // Activate all committed pledges
      ...drop.pledges
        .filter((p) => p.status === "committed")
        .map((p) =>
          db.pledge.update({
            where: { id: p.id },
            data: { status: "active" },
          })
        ),
    ]);

    return NextResponse.json({
      success: true,
      baselineDaily: computedAvg,
      activatedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    });
  } catch (error) {
    console.error("Activate drop error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
