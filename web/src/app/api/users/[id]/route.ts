import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/users/[id] — public profile
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullName: true,
        role: true,
        linkedinUrl: true,
        linkedinHeadline: true,
        createdAt: true,
        trackRecord: true,
        youtubeChannel: {
          select: {
            channelId: true,
            subscribers: true,
            totalViews: true,
            channelAge: true,
            verified: true,
          },
        },
        drops: {
          where: { status: { in: ["funding", "active", "completed"] } },
          select: {
            id: true,
            dropNumber: true,
            title: true,
            status: true,
            genre: true,
            currency: true,
            totalBudget: true,
            backerGoal: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Get user profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
