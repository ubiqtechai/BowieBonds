import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";
import { pledgeSchema } from "@/lib/validators";

// POST /api/drops/[id]/pledge — commit a pledge
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (auth.role !== "backer") {
      return NextResponse.json({ error: "Only backers can pledge" }, { status: 403 });
    }

    const { id: dropId } = await params;
    const body = await req.json();
    const parsed = pledgeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const drop = await db.drop.findUnique({ where: { id: dropId } });
    if (!drop) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 });
    }
    if (drop.status !== "funding") {
      return NextResponse.json(
        { error: "This drop is not accepting pledges" },
        { status: 400 }
      );
    }

    // Check min ticket
    if (drop.minTicket && parsed.data.amount < drop.minTicket) {
      return NextResponse.json(
        { error: `Minimum pledge amount is ${drop.minTicket}` },
        { status: 400 }
      );
    }

    // Check if already pledged
    const existingPledge = await db.pledge.findUnique({
      where: { dropId_backerId: { dropId, backerId: auth.userId } },
    });

    if (existingPledge && existingPledge.status !== "withdrawn") {
      return NextResponse.json(
        { error: "You have already pledged to this drop" },
        { status: 409 }
      );
    }

    // Check if pledge would exceed backer goal
    const currentPledges = await db.pledge.aggregate({
      where: { dropId, status: { not: "withdrawn" } },
      _sum: { amount: true },
    });
    const currentTotal = currentPledges._sum.amount || 0;
    if (currentTotal + parsed.data.amount > drop.backerGoal) {
      const remaining = drop.backerGoal - currentTotal;
      return NextResponse.json(
        { error: `Pledge exceeds funding goal. Maximum pledge: ${remaining}` },
        { status: 400 }
      );
    }

    // Create or re-activate pledge
    let pledge;
    if (existingPledge) {
      pledge = await db.pledge.update({
        where: { id: existingPledge.id },
        data: { amount: parsed.data.amount, status: "committed" },
      });
    } else {
      pledge = await db.pledge.create({
        data: {
          dropId,
          backerId: auth.userId,
          amount: parsed.data.amount,
        },
      });
    }

    return NextResponse.json({ pledge }, { status: 201 });
  } catch (error) {
    console.error("Pledge error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/drops/[id]/pledge — withdraw pledge
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: dropId } = await params;

    const drop = await db.drop.findUnique({ where: { id: dropId } });
    if (!drop) {
      return NextResponse.json({ error: "Drop not found" }, { status: 404 });
    }
    if (drop.status !== "funding") {
      return NextResponse.json(
        { error: "Cannot withdraw from an active drop" },
        { status: 400 }
      );
    }

    const pledge = await db.pledge.findUnique({
      where: { dropId_backerId: { dropId, backerId: auth.userId } },
    });

    if (!pledge || pledge.status === "withdrawn") {
      return NextResponse.json({ error: "No active pledge found" }, { status: 404 });
    }

    await db.pledge.update({
      where: { id: pledge.id },
      data: { status: "withdrawn" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Withdraw pledge error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
