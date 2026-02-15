import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/drops/[id]/ad-receipts — ad deployment receipts
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const drop = await db.drop.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!drop) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 });
    }

    const adReceipts = await db.adDeployment.findMany({
      where: { dropId: id },
      orderBy: { deployedAt: "desc" },
    });

    const totalSpend = adReceipts.reduce((sum, r) => sum + r.spend, 0);
    const totalImpressions = adReceipts.reduce((sum, r) => sum + (r.impressions || 0), 0);
    const totalViews = adReceipts.reduce((sum, r) => sum + (r.views || 0), 0);

    return NextResponse.json({
      adReceipts,
      totals: {
        spend: totalSpend,
        impressions: totalImpressions,
        views: totalViews,
      },
    });
  } catch (error) {
    console.error("Ad receipts error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
