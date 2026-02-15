"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function useSettlements(dropId?: string) {
  const params = new URLSearchParams();
  if (dropId) params.set("dropId", dropId);
  const qs = params.toString();

  return useQuery({
    queryKey: ["settlements", dropId],
    queryFn: () => fetchJson(`/api/settlements${qs ? `?${qs}` : ""}`),
    select: (data: { settlements: unknown[] }) => data.settlements,
  });
}

export function useSettlementAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; action: "pay" | "dispute"; paymentRef?: string }) => {
      const { id, ...body } = data;
      const res = await fetch(`/api/settlements/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settlements"] });
    },
  });
}
