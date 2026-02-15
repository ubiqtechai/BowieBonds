"use client";

import { useState } from "react";
import { Section } from "@/components/site/section";
import { Mono } from "@/components/ui/mono";

const FAQ_DATA = [
  {
    category: "General",
    items: [
      ["What is ZiggyDust?", "ZiggyDust is a platform that connects independent music artistes with backers who license the copyright on a specific promoted work and fund YouTube ad campaigns. The license covers only that one work — not the artiste's channel or catalogue. Backers earn returns — a share of the incremental channel-wide YouTube AdSense revenue. The copyright license on the work reverts to the artiste when backers are made whole."],
      ["Is this like crowdfunding?", "Not exactly. Crowdfunding (like Kickstarter) is donation or reward-based — you give money and get a t-shirt. On ZiggyDust, backers license the copyright on a single promoted work and fund ads against that license. The license fee is recovered first, then revenue share flows. The copyright on the work reverts when backers hit their return cap. There's real risk of loss."],
      ["Is this a security or an investment product?", "No. ZiggyDust facilitates copyright licensing arrangements — scoped to one specific promoted work per drop — between artistes and backers. Artistes temporarily license their content rights on that work to backers who fund promotion campaigns. This is a commercial IP transaction under the Copyright Act, 1957 — not a loan, not equity, not a security. We recommend all participants consult their own legal and financial advisors."],
    ],
  },
  {
    category: "For Artistes",
    items: [
      ["What do I need to get started?", "An active YouTube channel with YouTube Partner Program (monetisation enabled), a LinkedIn profile, a Google Ads account, and your co-pay (minimum 20% of your total campaign budget). You'll also grant an exclusive copyright license on the promoted video to the backer pool for the campaign period."],
      ["Do I give up my copyright?", "Temporarily, and only on the specific promoted work — not your channel, not your catalogue. You grant an exclusive license on that one work's copyright to the backer pool for the license period. It reverts automatically when backers are made whole (return cap hit) or when the license period expires — whichever comes first. Think of it as putting one work's IP behind the deal — same as Bowie did in 1997."],
      ["What happens if the ads don't work?", "If there's no uplift above your baseline, there's nothing to share. Backers may not recover their license fee. Your co-pay has already been deployed as ads. There's no refund mechanism post-deployment. The copyright license still reverts at the end of the license period."],
      ["What's the 20% co-pay?", "You must contribute at least 20% of the total campaign budget from your own funds. This goes into the lockbox first and is deployed as ads first. It demonstrates genuine commitment and aligns your incentives with your backers."],
      ["Can I run multiple drops at once?", "No. One active drop per artiste at a time. Complete or close your current drop before creating a new one. This keeps you focused and gives backers confidence that your attention isn't split."],
    ],
  },
  {
    category: "For Backers",
    items: [
      ["How do I earn returns?", "Your original license fee is recovered first. Then you earn revenue share — a percentage of the incremental channel-wide YouTube AdSense revenue above the pre-campaign baseline. This captures cross-views and discovery of older content. Paid monthly until your return cap is hit or the license period expires. When you're made whole, the copyright automatically reverts to the artiste."],
      ["What's the copyright license?", "When you back a drop, the artiste grants an exclusive license on that specific promoted work's copyright — and only that work — to the backer pool. This is your collateral. If the artiste defaults, you retain the license on the work. If everything goes well and you're made whole, the copyright on the work reverts to the artiste automatically."],
      ["Can I lose money?", "Yes. If the YouTube ads don't generate sufficient uplift, your license fee may not be fully recovered — potentially not at all. The artiste's 20% co-pay is first-loss, but there's no guarantee of return."],
      ["How do I know my money becomes ads?", "Every ad deployment is tracked with Google Ads invoice references, impression counts, view counts, and click-through rates. These receipts are visible on the drop page to all backers."],
      ["Who are the other backers?", "Every backer has a mandatory LinkedIn profile. The Backer Wall on each drop shows all backers' names, LinkedIn profiles, professional headlines, and track records. Full transparency."],
    ],
  },
  {
    category: "Platform",
    items: [
      ["Does ZiggyDust hold my money?", "No. ZiggyDust is a technology facilitator. Funds flow through an escrow arrangement managed in partnership with a registered financial services provider. We have no custody at any point."],
      ["What happens if an artiste defaults?", "Default triggers include: missed monthly payments, YouTube OAuth revocation, content deletion, and misrepresentation. On default, backers retain the exclusive copyright license on the specific promoted work. The default is recorded permanently on the artiste's track record."],
      ["What's the baseline and how is it calculated?", "The baseline is the artiste's average daily channel-wide YouTube AdSense revenue over the 30 days before the drop goes live. It's computed at launch and is non-disputable. Only channel-wide revenue above this baseline counts as uplift."],
      ["How does copyright reversion work?", "When the return cap is hit or the license period expires, the exclusive copyright license on the specific promoted work automatically reverts to the artiste. No action needed — it's built into the agreement. The artiste regains full, unencumbered rights to that work. The license never covered anything beyond the one promoted work."],
    ],
  },
];

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div>
      <Section>
        <Mono className="text-[10px] text-ink-mid uppercase tracking-[0.15em] block mb-3">Questions</Mono>
        <h1 className="text-4xl lg:text-[52px] font-bold leading-[0.95] tracking-tight mb-4">FAQ</h1>
        <p className="text-base text-ink-mid leading-relaxed max-w-xl">Plain answers to the questions you should be asking.</p>
      </Section>

      <Section>
        {FAQ_DATA.map((cat, ci) => (
          <div key={ci} className="mb-8">
            <Mono className="text-[10px] text-amber uppercase tracking-widest block mb-4">
              {cat.category}
            </Mono>
            {cat.items.map(([q, a], qi) => {
              const key = `${ci}-${qi}`;
              const isOpen = openKey === key;
              return (
                <div
                  key={key}
                  className={`border-[1.5px] mb-2 bg-white transition-colors ${
                    isOpen ? "border-ink" : "border-sand"
                  }`}
                >
                  <button
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    className="w-full px-4 lg:px-5 py-3.5 flex justify-between items-center cursor-pointer text-left bg-transparent border-0"
                  >
                    <span className="text-[15px] font-semibold text-ink pr-4">
                      {q}
                    </span>
                    <Mono className="text-lg text-amber shrink-0">
                      {isOpen ? "−" : "+"}
                    </Mono>
                  </button>
                  {isOpen && (
                    <div className="px-4 lg:px-5 pb-4 text-base text-ink-mid leading-relaxed border-t border-sand pt-3.5">
                      {a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </Section>
    </div>
  );
}
