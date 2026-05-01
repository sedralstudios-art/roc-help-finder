export const DECEPTIVE_BUSINESS_PRACTICES_NY = {
  id: "deceptive-business-practices-ny",
  category: "consumer",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY GBS 349",
  status: "active",

  // ─── Anchor fields (see src/data/legal/ANCHORS.md) ───
  // 3rd anchor candidate. 10 entries cite NY GBS 349. R1/R2/R3 expert
  // review pending. reviewTier intentionally not set yet — only flips to
  // 'anchor-reviewed' after multi-round review converges. Until then this
  // entry stays in the unreviewed pool (hidden under STRICT_REVIEW_FILTER).
  // Voice + damages structure already corrected from earlier HVAC anchor
  // reviewer's analysis of GBL §349(h) (Hobish v. AXA, FAIR Business
  // Practices Act AG-only).
  isAnchor: true,
  anchorSource: {
    url: "https://www.nysenate.gov/legislation/laws/GBS/349",
    hash: "",
    lastFetched: ""
  },
  lastFormallyReviewed: "2026-05-01",
  formallyReviewedBy: "Anthony DiMarzo + WebSearch corroboration + R1 expert review (8 issues, 2026-05-01) + R2 expert review (2026-05-01: 2 NEW findings, the rest fetched stale URL pre-R1). R2 NEW: AG complaint URL was 404 (https://ag.ny.gov/consumer-frauds/filing-consumer-complaint) — fixed to https://ag.ny.gov/file-complaint/consumer; summary first sentence conflated 349 and 350 (false advertising is 350 not 349) — fixed to separate them with companion-law framing. R1 fixes that R2 reviewer missed due to stale cache: damages stacking error, AG civil penalty cite to §350-d(a), Hobish reframing, Shady Grove class-action wrinkle, FAIR Act expansion, small-business standing softening — all already on disk. R1 originals follow. ERRORS: (1) example damages math fixed — §349(h) is actual OR $50 (greater of), not stacked; (2) example dropped 'legal-research costs' (not a §349 recovery; pro se gets no attorney fees); (3) AG civil penalty cite corrected — $5k/violation is GBL §350-d(a), not §349(b)/Exec Law §63(12); FAIR Act adds $15k or 3x restitution for willful. CLARIFICATIONS: class actions in NY state court can't aggregate statutory minimums (CPLR §901(b)) — federal court via Shady Grove is the path; example consumer-oriented reframed (type of conduct, not geographic reach); FAIR Act paragraph expanded to include consumer-oriented requirement removal for AG; Hobish reframed as damages-narrowing decision (no punitives beyond treble cap); whoQualifies small-business item softened to Oswego/Himmelstein consumer-oriented test. R2/R3 pending. Provisional, pending attorney sign-off.",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "Deceptive Business Practices — How General Business Law 349 Protects New York Consumers" },

  summary: {
    en: "NY General Business Law (GBL) section 349 bans deceptive acts in business deals that affect NY consumers; a companion law (GBL section 350) bans false advertising. The two are usually used together. A consumer who is misled — by an ad, a sales pitch, or a written agreement — can sue for actual damages, with the law guaranteeing at least $50 even if the actual loss was smaller. The court can also add up to triple the actual damages, capped at an extra $1,000, if the business knew the statement was false. The court can award the consumer's reasonable attorney fees. A related law (GBL section 350) covers false advertising specifically. The NY Attorney General can also sue businesses under section 349 for restitution, court orders to stop the practice, and civil penalties. The FAIR Business Practices Act (in effect since February 17, 2026) expanded section 349 for AG enforcement to cover unfair and abusive practices, not just deceptive ones — but the expansion does not change what individual consumers can sue for."
  },

  whoQualifies: {
    en: [
      "Any consumer who bought goods or services in New York based on false, misleading, or deceptive statements.",
      "A consumer who read an advertisement, website, label, or email that made a material false claim.",
      "A tenant or homeowner sold a product or service at a fraudulent price.",
      "A patient whose medical provider misrepresented pricing, network participation, or coverage.",
      "A small business that bought a product or service in essentially the same posture as a consumer (from a standardized marketing pitch directed at the public). Specialized business-to-business commercial disputes generally do not qualify under section 349's private right of action.",
      "A class of similarly situated consumers affected by the same deceptive practice."
    ]
  },

  whatItMeans: {
    en: "NY has a strong consumer-protection law that bans deceptive business practices. The full name is General Business Law section 349 (often written as GBL 349). A companion law, GBL 350, bans false advertising specifically. The two are usually used together.\n\nThree things have to be true for a consumer to win a GBL 349 case. NY's highest court (the Court of Appeals) laid out this test in 1995.\n\nFirst — the deception has to affect the public, not just be a private contract argument between two specific parties. Everyday retail purchases, online ads, services people sign up for — those count. A purely business-to-business deal between two large companies does not.\n\nSecond — the deception has to be materially misleading. The court asks whether a reasonable consumer would be fooled. Specific factual lies count. General hype like 'the best' or 'amazing' (legal name: puffery) usually does not.\n\nThird — the consumer has to show real harm. Usually that means money spent or money lost. The amount can be small. Paying more for a product than it would have cost without the false claim is recognized as harm.\n\nWhat a consumer can win. Damages come in three layers.\n\n(1) Actual damages — the actual money lost. The law guarantees at least $50 even if the actual loss was smaller.\n\n(2) The court CAN add up to triple the actual damages (called treble damages, meaning three times), capped at an extra $1,000. The court only adds this if the business knew the statement was false or made it on purpose.\n\n(3) The court CAN award the consumer's reasonable attorney fees. This third piece is what makes small-dollar cases worth bringing — without it, the cost of suing usually wipes out any recovery.\n\nNY's highest court confirmed this three-layer structure in a January 2025 ruling and held that nothing more is available — even punitive damages above the $1,000 cap are not allowed.\n\nFalse advertising under GBL 350 has its own numbers: actual damages or $500 (whichever is greater), with up to $10,000 in treble damages for willful violations.\n\nClass actions. Many GBL 349 cases are brought as class actions — one lawsuit covering many consumers harmed by the same practice. When the same deceptive practice (a uniform label, a uniform website claim) affects many people the same way, the public-effect test is naturally met. There is a wrinkle: in NY state court, the law does not allow a class to add up the $50 (or $500) statutory minimums across all members. For that reason, most large GBL 349 class actions are filed in federal court, where the U.S. Supreme Court ruled in 2010 that the NY state-court bar does not apply. A class action for actual damages can still go forward in state court.\n\nAttorney General enforcement. Separate from individual lawsuits, the NY Attorney General can sue businesses under section 349. The AG can get money back for consumers (called restitution), get court orders to stop the practice, and ask for civil penalties of up to $5,000 per violation.\n\nFAIR Business Practices Act. A separate law called the FAIR Business Practices Act took effect February 17, 2026. It made big changes to what the AG can do — none of which apply when an individual consumer sues. First, section 349 now covers 'unfair' and 'abusive' acts when the AG sues, not just deceptive ones. Second, when the AG sues, the conduct does not have to be aimed at consumers — the AG can now go after harm done to small businesses and non-profits too. Third, the new law adds a higher civil penalty for cases where the business knew it was breaking the law: the greater of $15,000 or three times the money owed back to consumers, per violation. None of these expansions help an individual consumer suing on their own — that consumer still has to prove deception aimed at the public.\n\nCommon types. GBL 349 covers junk fees, fake scarcity, hidden auto-renewals (also covered by a separate auto-renewal law), price-anchoring tricks (showing a fake 'original' price to make a 'sale' look bigger), false 'doctor recommended' claims, deceptive debt collection, false environmental or health claims, misrepresented medical pricing or network status, and false charitable solicitations.\n\nTime limit. A consumer has 3 years from the deceptive act to file a lawsuit."
  },

  yourRights: {
    en: [
      "A consumer has the right to sue for deceptive practices that caused actual injury (GBL 349(h)).",
      "A consumer has the right to recover actual damages (with at least $50 guaranteed even if the actual loss was smaller). The court can add up to triple the actual damages, capped at an extra $1,000, if it finds the business knew the statement was false.",
      "A consumer has the right to recover reasonable attorneys' fees if successful.",
      "A class of consumers can sue together for a uniform deceptive practice.",
      "A consumer has the right to file a complaint with the NY Attorney General Consumer Frauds Bureau.",
      "A consumer has 3 years from the deceptive act to file suit (CPLR 214(2)).",
      "A consumer has the right to seek injunctive relief to stop ongoing deception.",
      "A false advertising claim under GBL 350 can recover actual damages or $500, whichever is greater, with treble damages up to $10,000 for willful violations."
    ]
  },

  legalOptions: {
    en: [
      "NY Attorney General Consumer Frauds Bureau at (800) 771-7755.",
      "Monroe County Department of Public Safety (consumer fraud) at (585) 753-3014.",
      "Consumer Financial Protection Bureau at (855) 411-2372 — financial products.",
      "Federal Trade Commission at (877) 382-4357 — cross-state matters.",
      "Monroe County Bar Association Lawyer Referral at (585) 546-2130 — consumer attorneys.",
      "Legal Aid Society of Rochester at (585) 232-4090 — low-income consumers.",
      "Empire Justice Center at (585) 454-4060 — consumer class actions and impact litigation.",
      "Rochester City Court Civil Division at (585) 371-3412 — direct small claims filing up to $5,000."
    ]
  },

  example: {
    en: "A Rochester consumer bought a name-brand weighted blanket online after an ad claimed the product was 'cooling technology certified' and 'doctor recommended.' After delivery the consumer learned no such certification existed and that the cited doctor did not endorse the product. She kept the ad screenshots, the order confirmation, and the product literature. She filed a complaint with the NY AG Consumer Frauds Bureau and a small claims action under GBL 349 in Rochester City Court. She proved consumer-orientation (the claim was a standardized marketing message directed at retail consumers, not a private negotiation about her order), material misleadingness (specific factual claims were false), and injury (the price paid was $40 more than competing blankets without those claims). The court awarded $50 — the statutory minimum, since it was greater than her $40 in actual damages — plus $20 in filing-fee reimbursement. The seller updated the ad copy a month later."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Consumer protection, GBL 349 claims, scam recovery",
      qualifier: "Low-income Monroe County residents",
      access: "Phone at (585) 232-4090",
      outcome: "Advice, demand letter support, small claims representation",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "government",
      name: "NY Attorney General Consumer Frauds Bureau",
      focus: "Statewide enforcement of deceptive practices, restitution, injunctions",
      qualifier: "Any NY consumer",
      access: "Online complaint or phone (800) 771-7755",
      outcome: "Investigation, mediation, enforcement action",
      phone: "(800) 771-7755",
      url: "https://ag.ny.gov/file-complaint/consumer",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "warranty-rights-ny",
    "scam-protection-ny",
    "credit-report-dispute-ny",
    "small-claims-procedure-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "deceptive business practices",
    "GBL 349",
    "GBL 350",
    "false advertising",
    "consumer fraud",
    "statutory damages",
    "attorneys fees recovery",
    "consumer class action",
    "Oswego v Marine Midland",
    "AG consumer frauds"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/GBS/349",
    "https://www.nysenate.gov/legislation/laws/GBS/350",
    "https://ag.ny.gov/file-complaint/consumer"
  ],

  lastVerified: "2026-04-28",
  factCheckedBy: { tool: "websearch+webfetch", date: "2026-04-28" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
