"use client";

import { useState } from "react";
import { Mono } from "@/components/ui/mono";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";

const DOCS = [
  {
    key: "tos",
    num: "01",
    title: "House Rules",
    desc: "Platform is facilitator only. No custody. Not a label.",
    clauses: [
      "Platform provides listing, analytics, payout reporting.",
      "No custody of funds at any point. Escrow managed via registered partner.",
      "Active YouTube Partner Program required.",
      "Co-pay minimum 20% of budget — first-in, first-loss.",
      "Artist grants exclusive copyright license on the promoted video to the backer pool for the campaign period.",
      "Default triggers: missed payments, OAuth revocation. On default, backers retain copyright license.",
      "Copyright automatically reverts to artist when backers are made whole or the license period expires.",
      "Dispute resolution via arbitration.",
    ],
  },
  {
    key: "fund",
    num: "02",
    title: "The Pact",
    desc: "Copyright licensing agreement between Artist (Licensor) and Backers (Licensees). Returns backed by the copyright itself.",
    clauses: [
      "Artist grants an exclusive license on the promoted video's copyright to the backer pool for the license period.",
      "Backers pay a license fee that funds the YouTube ad campaign. License fee is recovered first per the waterfall.",
      "Revenue share flows as commercial return on the copyright license — channel-wide uplift above baseline.",
      "Waterfall: escrow costs → license fee recovery → license revenue share → copyright reverts, artist retains remainder.",
      "Ends at return cap or license period expiry. Copyright automatically reverts to artist.",
      "If artist defaults, backers retain the exclusive copyright license on the promoted video.",
      "Backer acknowledges total loss of license fee is possible.",
      "Artist must not delete content during the license period.",
    ],
  },
  {
    key: "term",
    num: "03",
    title: "The Numbers",
    desc: "Per-drop specifics. Locked at activation.",
    clauses: [
      "Budget, co-pay (min 20%), min ticket, share %, return cap, license period locked at activation.",
      "License fee recovery prioritised: backer's original license fee returned first per waterfall, then revenue share flows.",
      "Channel-wide baseline computed at launch — final and non-disputable.",
      "Monthly license payout reports; due within 15 days.",
      "Escrow controller identified; proof of ad spend required.",
      "Copyright license serves as collateral — retained by backers on default, reverts on fulfilment.",
    ],
  },
];

export default function DealPage() {
  const { role } = useUIStore();
  const [accepted, setAccepted] = useState<Record<string, boolean>>({
    tos: false,
    fund: false,
    term: false,
  });

  const toggle = (key: string) =>
    setAccepted((prev) => ({ ...prev, [key]: !prev[key] }));

  const allAccepted = accepted.tos && accepted.fund && accepted.term;

  return (
    <div className="px-4 lg:px-12 py-8 lg:py-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-1">The Deal</h1>
      <p className="text-ink-mid text-sm mb-8">
        Three parts. Read them. Accept them. Then we move.
      </p>

      {DOCS.map((doc) => (
        <div
          key={doc.key}
          className={`border-2 mb-4 bg-white transition-colors ${
            accepted[doc.key] ? "border-green" : "border-ink"
          }`}
        >
          {/* Doc header */}
          <div
            className={`flex justify-between items-center px-4 lg:px-6 py-3.5 border-b-[1.5px] ${
              accepted[doc.key]
                ? "border-green bg-green-faint"
                : "border-ink bg-warm"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-xl font-bold ${
                  accepted[doc.key] ? "text-green" : "text-ink"
                }`}
              >
                {doc.num}
              </span>
              <span className="text-lg font-bold">{doc.title}</span>
            </div>
            {accepted[doc.key] && (
              <Mono className="text-xs text-green font-semibold">
                ✓ I&apos;M IN
              </Mono>
            )}
          </div>

          {/* Doc body */}
          <div className="px-4 lg:px-6 py-4">
            <p className="text-[13px] text-ink-mid mb-3.5 leading-relaxed">
              {doc.desc}
            </p>
            <div className="bg-warm p-3.5 mb-4">
              {doc.clauses.map((cl, j) => (
                <div
                  key={j}
                  className="flex gap-2.5 mb-1.5 text-xs leading-relaxed"
                >
                  <Mono className="text-ink-light text-[10px] min-w-[16px]">
                    §{j + 1}
                  </Mono>
                  <span>{cl}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => toggle(doc.key)}
              className={`w-full py-2.5 border-2 font-mono text-xs font-semibold uppercase cursor-pointer transition-colors ${
                accepted[doc.key]
                  ? "border-green bg-green text-white"
                  : "border-ink bg-transparent text-ink hover:bg-warm"
              }`}
            >
              {accepted[doc.key] ? "✓ I'm in" : `Accept ${doc.title}`}
            </button>
          </div>
        </div>
      ))}

      {/* All-in confirmation */}
      {allAccepted && (
        <div className="border-[3px] border-green p-6 lg:p-9 text-center bg-green-faint">
          <div className="text-2xl lg:text-[28px] font-bold text-green mb-2">
            You&apos;re all in.
          </div>
          <p className="text-[13px] text-ink-mid mb-5">
            {role === "artist"
              ? "Ready once co-pay lands in escrow."
              : "You can now back drops."}
          </p>
          <Button>
            {role === "artist" ? "Go Live" : "Find Drops"}
          </Button>
        </div>
      )}
    </div>
  );
}
