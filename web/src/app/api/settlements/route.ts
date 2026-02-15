import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";

// GET /api/settlements — list settlements for current user's drops
export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dropId = searchParams.get("dropId");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};
    if (dropId) where.dropId = dropId;
    if (status) where.status = status;

    // Artists see settlements for their drops, backers see settlements for drops they've pledged to
    if (auth.role === "artist") {
      where.drop = { artistId: auth.userId };
    } else {
      where.drop = {
        pledges: {
          some: { backerId: auth.userId, status: { not: "withdrawn" } },
        },
      };
    }

    const settlements = await db.settlement.findMany({
      where,
      include: {
        drop: {
          select: { dropNumber: true, title: true, currency: true },
        },
        allocations: {
          include: {
            pledge: {
              select: {
                backer: { select: { id: true, fullName: true } },
                amount: true,
              },
            },
          },
        },
      },
      orderBy: { dueDate: "desc" },
    });

    return NextResponse.json({ settlements });
  } catch (error) {
    console.error("List settlements error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
