import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";

// GET /api/drops/[id] — full drop detail
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const drop = await db.drop.findUnique({
      where: { id },
      include: {
        artist: {
          select: {
            id: true,
            fullName: true,
            linkedinUrl: true,
            linkedinHeadline: true,
            trackRecord: true,
            youtubeChannel: {
              select: {
                channelId: true,
                subscribers: true,
                totalViews: true,
                monthlyViews: true,
                channelAge: true,
                yppActive: true,
                verified: true,
              },
            },
          },
        },
        pledges: {
          where: { status: { not: "withdrawn" } },
          include: {
            backer: {
              select: {
                id: true,
                fullName: true,
                linkedinUrl: true,
                linkedinHeadline: true,
                trackRecord: true,
              },
            },
            settlementAllocations: true,
          },
          orderBy: { createdAt: "desc" },
        },
        settlements: {
          orderBy: { periodMonth: "desc" },
          include: {
            allocations: true,
          },
        },
        adDeployments: {
          orderBy: { deployedAt: "desc" },
        },
        baselineSnapshot: true,
        revenueObservations: {
          orderBy: { observationDate: "desc" },
          take: 90,
        },
      },
    });

    if (!drop) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 });
    }

    const funded = drop.pledges.reduce((sum, p) => sum + p.amount, 0);

    return NextResponse.json({
      drop: {
        ...drop,
        funded,
        fundingPct: drop.backerGoal > 0 ? Math.round((funded / drop.backerGoal) * 100) : 0,
        backerCount: drop.pledges.length,
      },
    });
  } catch (error) {
    console.error("Get drop error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PATCH /api/drops/[id] — update draft drop
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.drop.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 });
    }
    if (existing.artistId !== auth.userId) {
      return NextResponse.json({ error: "Not your drop" }, { status: 403 });
    }
    if (existing.status !== "draft" && existing.status !== "funding") {
      return NextResponse.json(
        { error: "Can only edit draft or funding drops" },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Only allow updating specific fields
    const allowedFields = [
      "title", "genre", "tagline", "videoUrl", "videoId",
      "totalBudget", "artistCopay", "backerGoal", "minTicket",
      "revSharePct", "capMultiple", "tenorMonths",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // Re-validate copay rule if budget fields changed
    const totalBudget = (updateData.totalBudget as number) ?? existing.totalBudget;
    const artistCopay = (updateData.artistCopay as number) ?? existing.artistCopay;
    if (artistCopay < totalBudget * 0.2) {
      return NextResponse.json(
        { error: "Artist co-pay must be at least 20% of total budget" },
        { status: 400 }
      );
    }

    const drop = await db.drop.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ drop });
  } catch (error) {
    console.error("Update drop error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
