import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";

/**
 * POST /api/internal/check-overdue
 * Cron: Daily 09:00 UTC — flag settlements past due date as overdue.
 * Settlements are due by the 15th of the following month.
 */
export async function POST(req: NextRequest) {
  const authError = verifyCronAuth(req);
  if (authError) return authError;

  try {
    const now = new Date();

    // Find pending settlements past their due date
    const overdueSettlements = await db.settlement.findMany({
      where: {
        status: "pending",
        dueDate: { lt: now },
      },
    });

    if (overdueSettlements.length === 0) {
      return NextResponse.json({ success: true, flagged: 0 });
    }

    // Mark as overdue
    const result = await db.settlement.updateMany({
      where: {
        id: { in: overdueSettlements.map((s) => s.id) },
        status: "pending",
      },
      data: { status: "overdue" },
    });

    return NextResponse.json({
      success: true,
      flagged: result.count,
      settlementIds: overdueSettlements.map((s) => s.id),
    });
  } catch (error) {
    console.error("Check overdue error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export { POST as GET };
