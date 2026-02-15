import { NextRequest, NextResponse } from "next/server";

/**
 * Verify that internal cron requests come from Vercel Cron or include
 * the correct authorization header.
 */
export function verifyCronAuth(req: NextRequest): NextResponse | null {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // In production, Vercel Cron sets this header automatically
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null; // Auth passed
}
