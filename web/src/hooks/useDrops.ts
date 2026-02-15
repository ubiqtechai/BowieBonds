"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface FetchOptions {
  status?: string;
  genre?: string;
}

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// ─── List Drops ────────────────────────────────────────────────────

export function useDrops(options?: FetchOptions) {
  const params = new URLSearchParams();
  if (options?.status) params.set("status", options.status);
  if (options?.genre) params.set("genre", options.genre);
  const qs = params.toString();

  return useQuery({
    queryKey: ["drops", options],
    queryFn: () => fetchJson(`/api/drops${qs ? `?${qs}` : ""}`),
    select: (data: { drops: unknown[] }) => data.drops,
  });
}

// ─── Single Drop ───────────────────────────────────────────────────

export function useDrop(id: string) {
  return useQuery({
    queryKey: ["drop", id],
    queryFn: () => fetchJson(`/api/drops/${id}`),
    select: (data: { drop: unknown }) => data.drop,
    enabled: !!id,
  });
}

// ─── Create Drop ───────────────────────────────────────────────────

export function useCreateDrop() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch("/api/drops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to create drop");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drops"] });
    },
  });
}

// ─── Update Drop ───────────────────────────────────────────────────

export function useUpdateDrop(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const res = await fetch(`/api/drops/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update drop");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drop", id] });
      queryClient.invalidateQueries({ queryKey: ["drops"] });
    },
  });
}

// ─── Pledge ────────────────────────────────────────────────────────

export function usePledge(dropId: string) {
  const queryClient = useQueryClient();

  const commit = useMutation({
    mutationFn: async (amount: number) => {
      const res = await fetch(`/api/drops/${dropId}/pledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to pledge");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drop", dropId] });
      queryClient.invalidateQueries({ queryKey: ["drops"] });
    },
  });

  const withdraw = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/drops/${dropId}/pledge`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to withdraw");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drop", dropId] });
      queryClient.invalidateQueries({ queryKey: ["drops"] });
    },
  });

  return { commit, withdraw };
}

// ─── Activate Drop ─────────────────────────────────────────────────

export function useActivateDrop(dropId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/drops/${dropId}/activate`, {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to activate");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drop", dropId] });
      queryClient.invalidateQueries({ queryKey: ["drops"] });
    },
  });
}

// ─── Revenue Data ──────────────────────────────────────────────────

export function useRevenue(dropId: string) {
  return useQuery({
    queryKey: ["revenue", dropId],
    queryFn: () => fetchJson(`/api/drops/${dropId}/revenue`),
    enabled: !!dropId,
  });
}

// ─── Ad Receipts ───────────────────────────────────────────────────

export function useAdReceipts(dropId: string) {
  return useQuery({
    queryKey: ["adReceipts", dropId],
    queryFn: () => fetchJson(`/api/drops/${dropId}/ad-receipts`),
    enabled: !!dropId,
  });
}
