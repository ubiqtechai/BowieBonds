import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/drops/[id]/revenue — daily revenue chart data
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const drop = await db.drop.findUnique({
      where: { id },
      select: { id: true, baselineDaily: true },
    });

    if (!drop) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 });
    }

    const observations = await db.revenueObservation.findMany({
      where: { dropId: id },
      orderBy: { observationDate: "asc" },
      select: {
        observationDate: true,
        grossRevenue: true,
        estimatedUplift: true,
      },
    });

    const data = observations.map((obs) => ({
      date: obs.observationDate.toISOString().split("T")[0],
      revenue: obs.grossRevenue,
      uplift: obs.estimatedUplift ?? (obs.grossRevenue - (drop.baselineDaily || 0)),
      baseline: drop.baselineDaily || 0,
    }));

    return NextResponse.json({ revenue: data, baselineDaily: drop.baselineDaily });
  } catch (error) {
    console.error("Revenue data error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
