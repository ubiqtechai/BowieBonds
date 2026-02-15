import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/platform/stats — public platform statistics
export async function GET() {
  try {
    const [
      totalArtists,
      totalBackers,
      totalDrops,
      activeDrops,
      completedDrops,
      totalPledged,
    ] = await Promise.all([
      db.user.count({ where: { role: "artist" } }),
      db.user.count({ where: { role: "backer" } }),
      db.drop.count(),
      db.drop.count({ where: { status: "active" } }),
      db.drop.count({ where: { status: "completed" } }),
      db.pledge.aggregate({
        where: { status: { not: "withdrawn" } },
        _sum: { amount: true },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalArtists,
        totalBackers,
        totalDrops,
        activeDrops,
        completedDrops,
        totalPledged: totalPledged._sum.amount || 0,
      },
    });
  } catch (error) {
    console.error("Platform stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
