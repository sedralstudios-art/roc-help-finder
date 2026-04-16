// Glossary term: Bankruptcy (umbrella)
// Citation verified: 11 U.S.C. (the U.S. Bankruptcy Code). Consumer
// chapters are Chapter 7 (liquidation/discharge) and Chapter 13 (3-5 year
// repayment plan). Federal court; NY has Western District (WDNY) covering
// Monroe County. Means test under 11 USC § 707(b) screens for Chapter 7
// eligibility. NY has its own exemption scheme (CPLR 5205/5206).

export const BANKRUPTCY = {
  id: "bankruptcy",
  term: { en: "Bankruptcy" },
  aka: [],
  category: "consumer",
  subtags: ["debt", "court-filing"],

  context: {
    en: "You hear this when someone has more debt than they can handle and needs a legal way out. Bankruptcy is a federal court process — not a state one — and it can either wipe out most debts or let someone pay them back on a plan."
  },

  plainEnglish: {
    en: "A federal court process that gives a person a legal way to deal with debt they can't pay. There are two main kinds for regular people. Chapter 7 is the one most people mean when they say 'bankruptcy' — it wipes out most debts in about 4 to 6 months, but you have to pass an income test. Chapter 13 is a 3-to-5-year repayment plan where you keep your property (like a house or car behind on payments) and pay what you can afford. Some debts cannot be wiped out — most student loans, recent taxes, child support, and court fines. Filing stops most collection activity right away through something called the automatic stay."
  },

  whatToAsk: {
    en: [
      "Which chapter fits my situation — 7 or 13?",
      "Do I pass the means test for Chapter 7?",
      "What will happen to my house, car, or paycheck?",
      "Which of my debts will be wiped out, and which will not?",
      "Is free legal help available for a bankruptcy filing?"
    ]
  },

  related: ["automatic-stay", "debt-collection", "wage-garnishment", "judgment", "statute-of-limitations-debt"],
  legalEntryIds: ["bankruptcy-chapter7-ny", "bankruptcy-chapter13-ny", "bankruptcy-discharge-ny", "bankruptcy-means-test-ny", "bankruptcy-exemptions-ny", "bankruptcy-reaffirmation-ny"],

  citation: "11 U.S.C. (U.S. Bankruptcy Code); means test 11 USC § 707(b)",
  sourceUrl: "https://www.law.cornell.edu/uscode/text/11",
  lastVerified: "2026-04-15",
  status: "active"
};
