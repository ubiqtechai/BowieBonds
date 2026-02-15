import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyCronAuth } from "@/lib/cron-auth";

/**
 * POST /api/internal/settlements/compute
 * Cron: 1st of month — calculate monthly uplift & license payout for all active drops.
 *
 * License payout waterfall:
 * 1. Sum daily uplift for the prior month
 * 2. Apply revenue share % → total backer share (license revenue)
 * 3. Allocate pro-rata to each backer based on license fee proportion
 * 4. Cap enforcement: don't allocate beyond backer's return cap
 * 5. Redistribute excess to uncapped backers
 * 6. Complete drop if all backers capped → trigger copyright reversion
 * 7. License period expiry → trigger copyright reversion
 */
export async function POST(req: NextRequest) {
  const authError = verifyCronAuth(req);
  if (authError) return authError;

  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const periodMonth = `${lastMonth.toLocaleString("en-US", {
      month: "short",
    })} ${lastMonth.getFullYear()}`;

    const activeDrops = await db.drop.findMany({
      where: { status: "active" },
      include: {
        pledges: {
          where: { status: "active" },
          include: {
            settlementAllocations: true,
          },
        },
      },
    });

    const results: {
      dropId: string;
      status: string;
      uplift?: number;
      backerShare?: number;
    }[] = [];

    for (const drop of activeDrops) {
      // Check license period expiry — copyright reverts to artiste
      if (drop.expiresAt && drop.expiresAt <= now) {
        await db.drop.update({
          where: { id: drop.id },
          data: {
            status: "completed",
            copyrightStatus: "reverted",
            copyrightRevertedAt: now,
          },
        });
        await db.pledge.updateMany({
          where: { dropId: drop.id, status: "active" },
          data: { status: "completed" },
        });
        results.push({ dropId: drop.id, status: "license_period_expired_copyright_reverted" });
        continue;
      }

      // Check if settlement already exists for this period
      const existing = await db.settlement.findFirst({
        where: { dropId: drop.id, periodMonth },
      });
      if (existing) {
        results.push({ dropId: drop.id, status: "already_computed" });
        continue;
      }

      // Sum daily revenue for the prior month
      const observations = await db.revenueObservation.findMany({
        where: {
          dropId: drop.id,
          observationDate: {
            gte: lastMonth,
            lte: lastMonthEnd,
          },
        },
      });

      const totalRevenue = observations.reduce(
        (sum, o) => sum + o.grossRevenue,
        0
      );
      const daysInMonth = lastMonthEnd.getDate();
      const baselineTotal = (drop.baselineDaily || 0) * daysInMonth;
      const uplift = Math.max(0, totalRevenue - baselineTotal);

      if (uplift === 0) {
        results.push({ dropId: drop.id, status: "no_uplift", uplift: 0 });
        continue;
      }

      // Apply revenue share
      const revSharePct = Number(drop.revSharePct);
      const backerShare = Math.round((uplift * revSharePct) / 100);

      // Create settlement record
      const settlement = await db.settlement.create({
        data: {
          dropId: drop.id,
          periodMonth,
          totalRevenue,
          baselineTotal,
          uplift,
          backerShare,
          dueDate: new Date(now.getFullYear(), now.getMonth(), 15), // Due 15th
        },
      });

      // Pro-rata allocation with cap enforcement
      const totalPledged = drop.pledges.reduce((sum, p) => sum + p.amount, 0);
      const capMultiple = Number(drop.capMultiple);
      let remainingShare = backerShare;
      let allCapped = true;

      // First pass: allocate pro-rata, respecting caps
      const allocations: { pledgeId: string; amount: number; cumulative: number }[] = [];

      for (const pledge of drop.pledges) {
        const proRataShare = Math.round(
          (pledge.amount / totalPledged) * backerShare
        );
        const capAmount = Math.round(pledge.amount * capMultiple);
        const cumulative = pledge.settlementAllocations.reduce(
          (sum, a) => sum + a.amount,
          0
        );
        const remainingCap = capAmount - cumulative;

        if (remainingCap <= 0) {
          // Already capped
          continue;
        }

        allCapped = false;
        const allocation = Math.min(proRataShare, remainingCap);
        allocations.push({
          pledgeId: pledge.id,
          amount: allocation,
          cumulative: cumulative + allocation,
        });
        remainingShare -= allocation;
      }

      // Create allocation records
      for (const alloc of allocations) {
        await db.settlementAllocation.create({
          data: {
            settlementId: settlement.id,
            pledgeId: alloc.pledgeId,
            amount: alloc.amount,
            cumulative: alloc.cumulative,
          },
        });
      }

      // If all backers have reached their cap, complete the drop and revert copyright
      if (allCapped) {
        await db.drop.update({
          where: { id: drop.id },
          data: {
            status: "completed",
            copyrightStatus: "reverted",
            copyrightRevertedAt: new Date(),
          },
        });
        await db.pledge.updateMany({
          where: { dropId: drop.id, status: "active" },
          data: { status: "completed" },
        });
      }

      // Update track records for involved users
      await updateTrackRecords(drop.id);

      results.push({
        dropId: drop.id,
        status: allCapped ? "completed_all_capped" : "settled",
        uplift,
        backerShare,
      });
    }

    return NextResponse.json({
      success: true,
      period: periodMonth,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Compute settlements error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Update track records for all users involved in a drop.
 */
async function updateTrackRecords(dropId: string) {
  const drop = await db.drop.findUnique({
    where: { id: dropId },
    include: {
      pledges: {
        where: { status: { not: "withdrawn" } },
        include: { settlementAllocations: true },
      },
      settlements: true,
    },
  });

  if (!drop) return;

  // Update artiste track record
  const artistDrops = await db.drop.findMany({
    where: { artistId: drop.artistId, status: { in: ["completed", "active"] } },
    include: {
      pledges: { where: { status: { not: "withdrawn" } } },
      settlements: { where: { status: "paid" } },
      revenueObservations: true,
    },
  });

  const artistCompleted = artistDrops.filter(
    (d) => d.status === "completed"
  ).length;
  const artistTotalRaised = artistDrops.reduce(
    (sum, d) => sum + d.pledges.reduce((s, p) => s + p.amount, 0),
    0
  );
  const artistTotalPaid = artistDrops.reduce(
    (sum, d) => sum + d.settlements.reduce((s, st) => s + st.backerShare, 0),
    0
  );
  const paybackRate =
    artistTotalRaised > 0
      ? Math.round((artistTotalPaid / artistTotalRaised) * 100)
      : 0;

  await db.trackRecord.upsert({
    where: { userId: drop.artistId },
    create: {
      userId: drop.artistId,
      role: "artist",
      dropsCompleted: artistCompleted,
      totalRaised: artistTotalRaised,
      paybackRate,
    },
    update: {
      dropsCompleted: artistCompleted,
      totalRaised: artistTotalRaised,
      paybackRate,
    },
  });

  // Update backer track records
  for (const pledge of drop.pledges) {
    const backerPledges = await db.pledge.findMany({
      where: {
        backerId: pledge.backerId,
        status: { in: ["active", "completed"] },
      },
      include: { settlementAllocations: true },
    });

    const backerCompleted = backerPledges.filter(
      (p) => p.status === "completed"
    ).length;
    const totalBacked = backerPledges.reduce((sum, p) => sum + p.amount, 0);
    const totalReturned = backerPledges.reduce(
      (sum, p) => sum + p.settlementAllocations.reduce((s, a) => s + a.amount, 0),
      0
    );
    const avgReturn =
      totalBacked > 0 ? Math.round((totalReturned / totalBacked) * 100) / 100 : 0;

    await db.trackRecord.upsert({
      where: { userId: pledge.backerId },
      create: {
        userId: pledge.backerId,
        role: "backer",
        dropsCompleted: backerCompleted,
        totalBacked,
        avgReturn,
      },
      update: {
        dropsCompleted: backerCompleted,
        totalBacked,
        avgReturn,
      },
    });
  }
}

export { POST as GET };
