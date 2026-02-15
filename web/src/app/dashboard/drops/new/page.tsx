"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDropsData } from "@/hooks/useDropsData";
import { useCreateDrop } from "@/hooks/useDrops";
import { currencySymbol } from "@/lib/currency";
import { useCurrencyStore } from "@/stores/currency-store";
import { useToastStore } from "@/stores/toast-store";

export default function NewDropPage() {
  const router = useRouter();
  const { currency } = useCurrencyStore();
  const csym = currencySymbol(currency);
  const { addToast } = useToastStore();
  const { data: drops = [] } = useDropsData();
  const createDrop = useCreateDrop();

  const hasOpen = drops.some(
    (c) => c.status === "funding" || c.status === "active"
  );

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    videoUrl: "",
    channelName: "",
    contentTitle: "",
    totalBudget: "",
    artistCoPay: "",
    backerGoal: "",
    minTicket: "",
    revSharePct: "25",
    cap: "1.5",
    tenorMonths: "6",
    escrowType: "designated",
    adAccountId: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const steps = ["Content", "Funding", "Terms", "Escrow"];
  const cpPct =
    Number(form.totalBudget) > 0
      ? Math.round((Number(form.artistCoPay) / Number(form.totalBudget)) * 100)
      : 0;
  const cpUnder = form.totalBudget && form.artistCoPay && cpPct < 20;

  return (
    <div className="px-4 lg:px-12 py-8 lg:py-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-1">New Drop</h1>
      <p className="text-ink-mid text-sm mb-7">Set up your next drop</p>

      {/* One-drop warning */}
      {hasOpen && (
        <div className="border-2 border-red bg-red-faint px-5 py-4 mb-6">
          <Mono className="text-xs font-semibold text-red">
            You already have an active or funding drop.
          </Mono>
          <p className="text-xs text-ink-mid mt-1.5">
            One active drop per artiste at a time. Complete or close your current
            drop before creating a new one.
          </p>
        </div>
      )}

      {/* Step indicator */}
      <div className="flex border-2 border-ink mb-7 overflow-x-auto">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`flex-1 min-w-[100px] px-3 lg:px-4 py-2.5 flex items-center gap-2 ${
              i < 3 ? "border-r border-sand" : ""
            } ${
              step === i + 1
                ? "bg-ink"
                : step > i + 1
                  ? "bg-warm"
                  : "bg-transparent"
            }`}
          >
            <Mono
              className={`text-[11px] font-bold ${
                step === i + 1
                  ? "text-amber"
                  : step > i + 1
                    ? "text-green"
                    : "text-ink-light"
              }`}
            >
              {step > i + 1 ? "✓" : i + 1}
            </Mono>
            <Mono
              className={`text-[11px] ${
                step === i + 1
                  ? "text-bg font-semibold"
                  : "text-ink font-normal"
              }`}
            >
              {s}
            </Mono>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="border-2 border-ink p-5 lg:p-7 bg-white max-w-xl">
        {step === 1 && (
          <>
            <h2 className="text-xl lg:text-[22px] font-bold mb-5">Content</h2>
            <Input
              label="YouTube Video URL"
              value={form.videoUrl}
              onChange={(e) => update("videoUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
            />
            <Input
              label="Channel Name"
              value={form.channelName}
              onChange={(e) => update("channelName", e.target.value)}
              placeholder="Your channel"
            />
            <Input
              label="Content Title"
              value={form.contentTitle}
              onChange={(e) => update("contentTitle", e.target.value)}
              placeholder="Song / video title"
            />
            <div className="p-3.5 bg-warm border border-sand text-xs text-ink-mid leading-relaxed">
              <strong className="text-ink">YPP Required</strong> — Active
              YouTube Partner Program. Verified via OAuth.
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl lg:text-[22px] font-bold mb-5">Funding</h2>
            <Input
              label={`Total Budget (${csym})`}
              value={form.totalBudget}
              onChange={(e) => update("totalBudget", e.target.value)}
              placeholder="150000"
              type="number"
            />
            <Input
              label={`Your Co-Pay (${csym}) — min 20%`}
              value={form.artistCoPay}
              onChange={(e) => update("artistCoPay", e.target.value)}
              placeholder="30000"
              type="number"
            />
            <Input
              label={`Backer Goal (${csym})`}
              value={form.backerGoal}
              onChange={(e) => update("backerGoal", e.target.value)}
              placeholder="120000"
              type="number"
            />
            <Input
              label={`Minimum Ticket (${csym}) — per backer`}
              value={form.minTicket}
              onChange={(e) => update("minTicket", e.target.value)}
              placeholder="5000"
              type="number"
            />
            {form.totalBudget && form.artistCoPay && (
              <div
                className={`p-3 text-[13px] ${
                  cpUnder
                    ? "bg-red-faint border border-red/30 text-red"
                    : "bg-warm border border-sand text-ink-mid"
                }`}
              >
                Co-pay is{" "}
                <strong className={cpUnder ? "text-red" : "text-ink"}>
                  {cpPct}%
                </strong>
                {cpUnder
                  ? " — minimum 20% required. Your skin in the game."
                  : " — first-in, first-loss."}
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl lg:text-[22px] font-bold mb-5">Terms</h2>
            <Input
              label="Revenue Share %"
              value={form.revSharePct}
              onChange={(e) => update("revSharePct", e.target.value)}
              placeholder="25"
              type="number"
            />
            <Input
              label="Cap (Multiple)"
              value={form.cap}
              onChange={(e) => update("cap", e.target.value)}
              placeholder="1.5"
            />
            <Input
              label="Tenor (Months)"
              value={form.tenorMonths}
              onChange={(e) => update("tenorMonths", e.target.value)}
              placeholder="6"
              type="number"
            />
            <div className="p-3.5 bg-amber-faint border border-sand text-[13px] leading-relaxed">
              Backers get <strong>{form.revSharePct}%</strong> of channel-wide
              uplift, capped at <strong>{form.cap}x</strong>, over{" "}
              <strong>{form.tenorMonths} months</strong>.
              {form.minTicket
                ? ` Min ticket: ${csym}${form.minTicket}.`
                : ""}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl lg:text-[22px] font-bold mb-5">Escrow</h2>
            <div className="mb-5">
              <Mono className="text-[9px] font-semibold text-ink-mid uppercase tracking-widest block mb-1.5">
                Escrow Type
              </Mono>
              <select
                className="w-full px-3.5 py-2.5 border-2 border-ink bg-white text-sm outline-none"
                value={form.escrowType}
                onChange={(e) => update("escrowType", e.target.value)}
              >
                <option value="designated">Artiste-Controlled Account</option>
                <option value="third_party">Third-Party Agent</option>
              </select>
            </div>
            <Input
              label="Google Ads Account ID"
              value={form.adAccountId}
              onChange={(e) => update("adAccountId", e.target.value)}
              placeholder="xxx-xxx-xxxx"
            />
            <div className="p-3.5 bg-amber-faint border border-sand text-xs text-ink-mid leading-relaxed">
              <strong className="text-ink">Constraint:</strong> Funds only flow
              to Google Ads. No personal transfers.
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-7">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button
            disabled={
              (step === 2 && !!cpUnder) || (step === 4 && hasOpen)
            }
            onClick={() => {
              if (step === 2 && cpUnder) return;
              if (step === 4 && hasOpen) return;
              if (step < 4) {
                setStep(step + 1);
              } else {
                // Extract video ID from URL
                const videoIdMatch = form.videoUrl.match(/[?&]v=([^&]+)/);
                const videoId = videoIdMatch ? videoIdMatch[1] : form.videoUrl;

                createDrop.mutate(
                  {
                    title: form.contentTitle || "Untitled Drop",
                    videoUrl: form.videoUrl,
                    videoId,
                    currency,
                    totalBudget: Number(form.totalBudget),
                    artistCopay: Number(form.artistCoPay),
                    backerGoal: Number(form.backerGoal),
                    minTicket: form.minTicket ? Number(form.minTicket) : undefined,
                    revSharePct: Number(form.revSharePct),
                    capMultiple: Number(form.cap),
                    tenorMonths: Number(form.tenorMonths),
                  },
                  {
                    onSuccess: () => {
                      addToast("success", "Drop created! Review The Deal to continue.");
                      router.push("/dashboard/deal");
                    },
                    onError: (err) => {
                      addToast("error", err.message || "Failed to create drop.");
                    },
                  }
                );
              }
            }}
          >
            {step === 2 && cpUnder
              ? "Min 20% co-pay"
              : step === 4 && hasOpen
                ? "One drop at a time"
                : step < 4
                  ? "Continue →"
                  : "Review The Deal →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
