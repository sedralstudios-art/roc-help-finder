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
  formallyReviewedBy: "Anthony DiMarzo + WebSearch corroboration + transferred §349 expertise from HVAC anchor R2/R3 (damages structure, Hobish v. AXA, FAIR Business Practices Act). PROVISIONAL — pending dedicated Opus 4.7 review rounds for this entry. Section 350 details and Oswego case framing have NOT been independently reviewed for this anchor yet.",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "Deceptive Business Practices — How General Business Law 349 Protects New York Consumers" },

  summary: {
    en: "NY General Business Law (GBL) section 349 bans deceptive acts and false advertising in business deals that affect NY consumers. A consumer who is misled — by an ad, a sales pitch, or a written agreement — can sue for actual damages, with the law guaranteeing at least $50 even if the actual loss was smaller. The court can also add up to triple the actual damages, capped at an extra $1,000, if the business knew the statement was false. The court can award the consumer's reasonable attorney fees. A related law (GBL section 350) covers false advertising specifically. The NY Attorney General can also sue businesses under section 349 for restitution, court orders to stop the practice, and civil penalties. The FAIR Business Practices Act (in effect since February 17, 2026) expanded section 349 for AG enforcement to cover unfair and abusive practices, not just deceptive ones — but the expansion does not change what individual consumers can sue for."
  },

  whoQualifies: {
    en: [
      "Any consumer who bought goods or services in New York based on false, misleading, or deceptive statements.",
      "A consumer who read an advertisement, website, label, or email that made a material false claim.",
      "A tenant or homeowner sold a product or service at a fraudulent price.",
      "A patient whose medical provider misrepresented pricing, network participation, or coverage.",
      "A small business targeted by a larger business's deceptive marketing in a consumer-oriented transaction.",
      "A class of similarly situated consumers affected by the same deceptive practice."
    ]
  },

  whatItMeans: {
    en: "NY has a strong consumer protection law called General Business Law (GBL) section 349. It bans deceptive acts and false advertising in any business deal that affects NY consumers. Section 350 is a related law specifically about false advertising. The two laws are often used together.\n\nThree things have to be true for a consumer to win a section 349 case. NY's highest court (the Court of Appeals) laid out this test in a 1995 case called Oswego Laborers' Local 214 v. Marine Midland Bank.\n\nFirst — consumer-oriented. The deception has to affect the public, not just be a private contract argument between two specific parties. Everyday retail purchases, online ads, services people sign up for — those count. A purely business-to-business deal between two large companies does not.\n\nSecond — materially misleading. The court asks whether a reasonable consumer would be misled. Specific factual lies count. General hype like 'the best' or 'amazing' (legal name: puffery) usually does not.\n\nThird — actual injury. The consumer has to show real harm — usually money spent or money lost. The amount can be small. Paying more for a product than it would have cost without the false claim is recognized as injury.\n\nDamages have three layers under GBL section 349(h):\n\n(1) Actual damages — the actual money lost. The law guarantees at least $50 even if the actual loss was smaller.\n\n(2) The court CAN add up to triple the actual damages (called treble damages), capped at an extra $1,000, but only if the court finds the business knew the statement was false or made it on purpose.\n\n(3) The court CAN award the consumer's reasonable attorney fees. This last piece is what makes small-dollar cases worth bringing — without it, the cost of suing usually wipes out any recovery.\n\nThe NY Court of Appeals confirmed this three-layer structure in a January 2025 decision called Hobish v. AXA Equitable Life Insurance.\n\nFalse advertising under GBL section 350 has its own damages set in section 350-e: actual damages or $500, whichever is greater, with treble damages up to $10,000 for willful violations.\n\nClass actions. Many GBL 349 cases are brought as class actions — one lawsuit covering many consumers harmed by the same practice. When a uniform deceptive practice (a uniform label, a uniform website claim) affects many consumers the same way, the public-orientation test is naturally met.\n\nAttorney General enforcement. Separate from individual lawsuits, the NY Attorney General can sue businesses under section 349. The AG can recover money for consumers (called restitution), get court orders to stop the practice (called injunctions), and ask for civil penalties up to $5,000 per violation under NY Executive Law section 63(12) and GBL section 349(b).\n\nFAIR Business Practices Act. A separate law called the FAIR Business Practices Act took effect February 17, 2026. It expanded section 349 to also cover 'unfair' and 'abusive' acts, not just deceptive ones — but only when the AG sues. Individual consumers still have to prove deception under the original section 349 standard.\n\nCommon areas. GBL 349 covers junk fees, fake scarcity, hidden auto-renewals (also covered by GBL section 527-a), price-anchoring tricks, false 'doctor recommended' claims, deceptive debt collection, false environmental or health claims, misrepresented medical pricing or network status, and false charitable solicitations.\n\nTime limit. A consumer has 3 years from the deceptive act to file a lawsuit. The deadline is in CPLR section 214(2)."
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
    en: "A Rochester consumer bought a name-brand weighted blanket online after an ad claimed the product was 'cooling technology certified' and 'doctor recommended.' After delivery the consumer learned no such certification existed and that the cited doctor did not endorse the product. She kept the ad screenshots, the order confirmation, and the product literature. She filed a complaint with the NY AG Consumer Frauds Bureau and a small claims action under GBL 349 in Rochester City Court. She proved consumer-orientation (the ad ran nationwide), material misleadingness (specific factual claims were false), and injury (the price paid was $40 more than competing blankets without those claims). The court awarded $40 actual damages, $50 statutory damages, and $220 in legal-research costs. The seller updated the ad copy a month later."
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
      url: "https://ag.ny.gov/consumer-frauds/filing-consumer-complaint",
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
    "https://ag.ny.gov/consumer-frauds/filing-consumer-complaint"
  ],

  lastVerified: "2026-04-28",
  factCheckedBy: { tool: "websearch+webfetch", date: "2026-04-28" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
