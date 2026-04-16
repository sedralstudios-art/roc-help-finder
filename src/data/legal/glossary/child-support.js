// Glossary term: Child Support
// Citation verified: NY FCA Article 4; Domestic Relations Law § 240; Child
// Support Standards Act (CSSA) sets the formula — 17% of combined parental
// income for 1 child, 25% for 2, 29% for 3, 31% for 4, 35%+ for 5+, up to
// a combined-income cap ($183,000 through March 1, 2026) beyond which the
// court has discretion. Enforcement handled by the Child Support
// Enforcement Unit (CSEU) in each county.

export const CHILD_SUPPORT = {
  id: "child-support",
  term: { en: "Child Support" },
  aka: [],
  category: "family",
  subtags: ["children", "money"],

  context: {
    en: "You hear this when parents separate or have never lived together. One parent pays the other for the costs of raising the kids. It is separate from custody — a parent who pays child support still has the same rights to see the child."
  },

  plainEnglish: {
    en: "Money one parent pays the other to help cover the costs of raising their children. In New York, there is a set formula called the Child Support Standards Act (CSSA). It takes a percentage of both parents' combined income — 17% for one child, 25% for two, 29% for three, 31% for four, and at least 35% for five or more — up to a cap. That amount is then split between the parents based on how much each one earns. Judges can adjust it in some cases. Paying or receiving child support has nothing to do with custody or visitation — they are separate. If a parent falls behind, the state's Child Support Enforcement Unit can take money from a paycheck, tax refund, or license."
  },

  whatToAsk: {
    en: [
      "How is the amount calculated in my case?",
      "What counts as income? Does overtime or a bonus count?",
      "What happens if my income goes down?",
      "Are things like health insurance, daycare, or medical costs added on top?",
      "How do I open a child support case through the county?"
    ]
  },

  related: ["family-court", "custody", "visitation"],
  legalEntryIds: ["child-support-ny"],

  citation: "NY FCA Article 4; DRL § 240 (Child Support Standards Act)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/FCT/A4",
  lastVerified: "2026-04-15",
  status: "active"
};
