import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";
import { createDropSchema } from "@/lib/validators";

// GET /api/drops — list drops (filterable by status, genre)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const genre = searchParams.get("genre");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (genre) where.genre = genre;

    const drops = await db.drop.findMany({
      where,
      include: {
        artist: {
          select: {
            id: true,
            fullName: true,
            linkedinUrl: true,
            linkedinHeadline: true,
            youtubeChannel: {
              select: {
                channelId: true,
                subscribers: true,
                totalViews: true,
                verified: true,
              },
            },
          },
        },
        pledges: {
          where: { status: { not: "withdrawn" } },
          select: {
            id: true,
            amount: true,
            backerId: true,
            backer: {
              select: { id: true, fullName: true, linkedinUrl: true },
            },
          },
        },
        _count: {
          select: { pledges: { where: { status: { not: "withdrawn" } } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = drops.map((drop) => {
      const funded = drop.pledges.reduce((sum, p) => sum + p.amount, 0);
      return {
        ...drop,
        funded,
        fundingPct: drop.backerGoal > 0 ? Math.round((funded / drop.backerGoal) * 100) : 0,
        backerCount: drop._count.pledges,
      };
    });

    return NextResponse.json({ drops: result });
  } catch (error) {
    console.error("List drops error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/drops — create drop (artiste only)
export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (auth.role !== "artist") {
      return NextResponse.json({ error: "Only artistes can create drops" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createDropSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Check one active drop per artiste
    const existingDrop = await db.drop.findFirst({
      where: {
        artistId: auth.userId,
        status: { in: ["funding", "active"] },
      },
    });

    if (existingDrop) {
      return NextResponse.json(
        { error: "You already have an active or funding drop. Complete or cancel it before creating a new one." },
        { status: 409 }
      );
    }

    // Generate drop number
    const count = await db.drop.count();
    const dropNumber = `ZD-${String(count + 1).padStart(3, "0")}`;

    const drop = await db.drop.create({
      data: {
        dropNumber,
        artistId: auth.userId,
        title: parsed.data.title,
        genre: parsed.data.genre,
        tagline: parsed.data.tagline,
        videoUrl: parsed.data.videoUrl,
        videoId: parsed.data.videoId,
        currency: parsed.data.currency,
        status: "funding",
        totalBudget: parsed.data.totalBudget,
        artistCopay: parsed.data.artistCopay,
        backerGoal: parsed.data.backerGoal,
        minTicket: parsed.data.minTicket,
        revSharePct: parsed.data.revSharePct,
        capMultiple: parsed.data.capMultiple,
        tenorMonths: parsed.data.tenorMonths,
      },
    });

    return NextResponse.json({ drop }, { status: 201 });
  } catch (error) {
    console.error("Create drop error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
