"use client";

import { useQuery } from "@tanstack/react-query";

export function usePlatformStats() {
  return useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      const res = await fetch("/api/platform/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      return data.stats;
    },
    staleTime: 60 * 1000, // 1 minute
  });
}
