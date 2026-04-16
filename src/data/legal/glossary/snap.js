// Glossary term: SNAP (Supplemental Nutrition Assistance Program)
// Citation verified: NY Social Services Law § 95; federal rules at
// 7 CFR 273. 30-day processing deadline. Expedited SNAP available
// within 7 days for households with very low income or no resources.

export const SNAP = {
  id: "snap",
  term: { en: "SNAP" },
  aka: ["Food Stamps", "Supplemental Nutrition Assistance Program", "EBT"],
  category: "benefits",
  subtags: ["food", "application"],

  context: {
    en: "You hear this when someone is applying for help buying food. SNAP is what used to be called food stamps. Benefits come on an EBT card that works like a debit card at most grocery stores."
  },

  plainEnglish: {
    en: "A federal program, run by the state, that helps low-income people buy food. Money goes onto an EBT card each month. In New York, you can apply online at mybenefits.ny.gov, by mail, by fax, or in person at the county's Department of Social Services. The county has 30 days to decide. If the household is in crisis — very low income or almost no money — there is an expedited SNAP that must be decided within 7 days. Many people who qualify for SNAP also qualify for Medicaid, HEAP, and other programs — one application covers them all."
  },

  whatToAsk: {
    en: [
      "Can my application be expedited?",
      "What proof do I need to bring?",
      "Can I apply for Medicaid, HEAP, and childcare at the same time?",
      "How much will I get, and when does it start?",
      "What happens at recertification?"
    ]
  },

  related: ["medicaid", "temporary-assistance", "fair-hearing", "recoupment", "adequate-notice"],
  legalEntryIds: ["benefit-overpayment-ny"],

  citation: "NY Soc. Services Law § 95; 7 CFR 273",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/SOS/95",
  lastVerified: "2026-04-15",
  status: "active"
};
