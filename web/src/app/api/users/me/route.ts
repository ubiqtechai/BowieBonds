import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthFromCookies } from "@/lib/auth";
import { updateUserSchema } from "@/lib/validators";

export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: auth.userId },
      include: {
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
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        linkedinUrl: user.linkedinUrl,
        linkedinHeadline: user.linkedinHeadline,
        createdAt: user.createdAt,
        youtubeChannel: user.youtubeChannel,
        trackRecord: user.trackRecord,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const user = await db.user.update({
      where: { id: auth.userId },
      data: parsed.data,
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        linkedinUrl: user.linkedinUrl,
        linkedinHeadline: user.linkedinHeadline,
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
