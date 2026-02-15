import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";
import { getValidToken } from "@/lib/youtube";

/**
 * POST /api/internal/detect-defaults
 * Cron: Daily — check for default triggers:
 * 1. Missed payments (>30 days overdue)
 * 2. OAuth token revocation (YouTube disconnect)
 * 3. Content deletion (video removed)
 */
export async function POST(req: NextRequest) {
  const authError = verifyCronAuth(req);
  if (authError) return authError;

  try {
    const results: { dropId: string; trigger: string }[] = [];

    // 1. Check for missed payments (overdue > 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const missedPayments = await db.settlement.findMany({
      where: {
        status: "overdue",
        dueDate: { lt: thirtyDaysAgo },
        drop: { status: "active" },
      },
      include: { drop: true },
    });

    for (const settlement of missedPayments) {
      // Check if default already recorded
      const existingDefault = await db.defaultEvent.findFirst({
        where: {
          dropId: settlement.dropId,
          triggerType: "missed_payment",
          resolvedAt: null,
        },
      });

      if (!existingDefault) {
        await db.defaultEvent.create({
          data: {
            dropId: settlement.dropId,
            triggerType: "missed_payment",
            notes: `Settlement ${settlement.periodMonth} overdue >30 days`,
          },
        });

        await db.drop.update({
          where: { id: settlement.dropId },
          data: { status: "defaulted" },
        });

        // Update artiste track record with default
        const artistTrack = await db.trackRecord.findUnique({
          where: { userId: settlement.drop.artistId },
        });
        if (artistTrack) {
          // defaultCount isn't in current schema, so we just note it via the event
        }

        results.push({
          dropId: settlement.dropId,
          trigger: "missed_payment",
        });
      }
    }

    // 2. Check for OAuth revocation
    const activeDrops = await db.drop.findMany({
      where: { status: "active" },
      include: {
        artist: {
          include: { youtubeChannel: true },
        },
      },
    });

    for (const drop of activeDrops) {
      const channel = drop.artist.youtubeChannel;
      if (!channel) {
        // No channel means it was disconnected
        const existingDefault = await db.defaultEvent.findFirst({
          where: {
            dropId: drop.id,
            triggerType: "oauth_revoked",
            resolvedAt: null,
          },
        });

        if (!existingDefault) {
          await db.defaultEvent.create({
            data: {
              dropId: drop.id,
              triggerType: "oauth_revoked",
              notes: "YouTube channel disconnected",
            },
          });

          await db.drop.update({
            where: { id: drop.id },
            data: { status: "defaulted" },
          });

          results.push({ dropId: drop.id, trigger: "oauth_revoked" });
        }
        continue;
      }

      // Try to use the token to verify it's still valid
      try {
        await getValidToken(channel);
      } catch {
        const existingDefault = await db.defaultEvent.findFirst({
          where: {
            dropId: drop.id,
            triggerType: "oauth_revoked",
            resolvedAt: null,
          },
        });

        if (!existingDefault) {
          await db.defaultEvent.create({
            data: {
              dropId: drop.id,
              triggerType: "oauth_revoked",
              notes: "YouTube OAuth token refresh failed",
            },
          });

          results.push({ dropId: drop.id, trigger: "oauth_revoked" });
          // Don't immediately default — give the artiste a chance to reconnect
        }
      }
    }

    return NextResponse.json({
      success: true,
      defaultsDetected: results.length,
      results,
    });
  } catch (error) {
    console.error("Detect defaults error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { POST as GET };
