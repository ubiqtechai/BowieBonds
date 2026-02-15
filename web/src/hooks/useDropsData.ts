"use client";

import { useQuery } from "@tanstack/react-query";
import { MOCK_DROPS, type Drop } from "@/lib/mock-data";

/**
 * Maps API drop response to the Drop interface used by UI components.
 * Falls back to mock data when API is unavailable (no database).
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapApiDropToUIDrop(apiDrop: any): Drop {
  const pledges = apiDrop.pledges || [];
  const funded = pledges.reduce((sum: number, p: any) => sum + p.amount, 0);

  return {
    id: apiDrop.dropNumber || apiDrop.id,
    name: apiDrop.title,
    artist: apiDrop.artist?.fullName || "Unknown",
    contentTitle: apiDrop.title,
    videoId: apiDrop.videoId,
    status: apiDrop.status,
    totalBudget: apiDrop.totalBudget,
    artistCoPay: apiDrop.artistCopay,
    backerGoal: apiDrop.backerGoal,
    backerFunded: funded,
    minTicket: apiDrop.minTicket || 0,
    revSharePct: Number(apiDrop.revSharePct),
    cap: Number(apiDrop.capMultiple),
    tenorMonths: apiDrop.tenorMonths,
    baselineDaily: apiDrop.baselineDaily || 0,
    currentDaily: 0,
    totalRevenue: 0,
    totalSettled: 0,
    daysActive: apiDrop.activatedAt
      ? Math.floor((Date.now() - new Date(apiDrop.activatedAt).getTime()) / 86400000)
      : 0,
    adSpent: (apiDrop.adDeployments || []).reduce((s: number, a: any) => s + a.spend, 0),
    rd: (apiDrop.revenueObservations || []).map((r: any) => r.grossRevenue),
    backers: pledges.map((p: any) => ({
      name: p.backer?.fullName || "Unknown",
      amount: p.amount,
      returned: (p.settlementAllocations || []).reduce(
        (s: number, a: any) => s + a.amount,
        0
      ),
      linkedin: p.backer?.linkedinUrl || "",
      headline: p.backer?.linkedinHeadline || "",
      campaigns: p.backer?.trackRecord?.dropsCompleted || 0,
      totalBacked: p.backer?.trackRecord?.totalBacked || 0,
      avgReturn: Number(p.backer?.trackRecord?.avgReturn || 0),
    })),
    settlements: (apiDrop.settlements || []).map((s: any) => ({
      month: s.periodMonth,
      revenue: s.totalRevenue,
      baseline: s.baselineTotal,
      uplift: s.uplift,
      share: s.backerShare,
      status: s.status,
    })),
    genre: apiDrop.genre || "",
    tagline: apiDrop.tagline || "",
    artistLinkedin: apiDrop.artist?.linkedinUrl || "",
    artistHeadline: apiDrop.artist?.linkedinHeadline || "",
    yt: {
      subscribers: apiDrop.artist?.youtubeChannel?.subscribers || 0,
      totalViews: Number(apiDrop.artist?.youtubeChannel?.totalViews || 0),
      channelAge: apiDrop.artist?.youtubeChannel?.channelAge || "",
      monthlyViews: apiDrop.artist?.youtubeChannel?.monthlyViews || 0,
      verified: apiDrop.artist?.youtubeChannel?.verified || false,
    },
    artistTrack: {
      campaigns: apiDrop.artist?.trackRecord?.dropsCompleted || 0,
      totalRaised: apiDrop.artist?.trackRecord?.totalRaised || 0,
      paybackRate: Number(apiDrop.artist?.trackRecord?.paybackRate || 0),
      avgUplift: Number(apiDrop.artist?.trackRecord?.avgUplift || 0),
    },
    adReceipts: (apiDrop.adDeployments || []).map((a: any) => ({
      date: new Date(a.deployedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      type: a.adType?.replace("_", "-") || "",
      spend: a.spend,
      impressions: a.impressions || 0,
      views: a.views || 0,
      ctr: a.ctr ? `${a.ctr}%` : "—",
      ref: a.googleInvoiceRef || "—",
    })),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function useDropsData() {
  return useQuery({
    queryKey: ["drops-ui"],
    queryFn: async (): Promise<Drop[]> => {
      try {
        const res = await fetch("/api/drops");
        if (!res.ok) throw new Error("API unavailable");
        const data = await res.json();
        if (!data.drops || data.drops.length === 0) {
          return MOCK_DROPS; // Fallback to mock when DB is empty
        }
        return data.drops.map(mapApiDropToUIDrop);
      } catch {
        return MOCK_DROPS; // Fallback to mock when API fails
      }
    },
    staleTime: 30 * 1000,
  });
}

export function useDropData(id: string) {
  return useQuery({
    queryKey: ["drop-ui", id],
    queryFn: async (): Promise<Drop | null> => {
      // Try mock data first if it matches
      const mockDrop = MOCK_DROPS.find((d) => d.id === id);

      try {
        const res = await fetch(`/api/drops/${id}`);
        if (!res.ok) {
          return mockDrop || null;
        }
        const data = await res.json();
        return mapApiDropToUIDrop(data.drop);
      } catch {
        return mockDrop || null;
      }
    },
    enabled: !!id,
  });
}
