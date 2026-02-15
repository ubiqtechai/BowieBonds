import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";

// PATCH /api/settlements/[id] — mark as paid or dispute
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
    const body = await req.json();
    const { action, paymentRef, notes } = body as {
      action: "pay" | "dispute";
      paymentRef?: string;
      notes?: string;
    };

    const settlement = await db.settlement.findUnique({
      where: { id },
      include: { drop: { select: { artistId: true } } },
    });

    if (!settlement) {
      return NextResponse.json({ error: "Settlement not found" }, { status: 404 });
    }

    if (action === "pay") {
      // Only the artiste can mark as paid
      if (settlement.drop.artistId !== auth.userId) {
        return NextResponse.json({ error: "Only the artiste can mark settlements as paid" }, { status: 403 });
      }
      if (settlement.status !== "pending" && settlement.status !== "overdue") {
        return NextResponse.json({ error: "Settlement is not payable" }, { status: 400 });
      }

      const updated = await db.settlement.update({
        where: { id },
        data: {
          status: "paid",
          paidAt: new Date(),
          paymentRef: paymentRef || null,
        },
      });

      return NextResponse.json({ settlement: updated });
    }

    if (action === "dispute") {
      if (settlement.status === "paid") {
        return NextResponse.json({ error: "Cannot dispute a paid settlement" }, { status: 400 });
      }

      const updated = await db.settlement.update({
        where: { id },
        data: { status: "disputed" },
      });

      return NextResponse.json({ settlement: updated });
    }

    return NextResponse.json({ error: "Invalid action. Use 'pay' or 'dispute'." }, { status: 400 });
  } catch (error) {
    console.error("Settlement action error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
