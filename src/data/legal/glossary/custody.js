// Glossary term: Custody
// Citation verified: NY Domestic Relations Law § 70 (best-interests
// standard, no gender presumption); FCA Article 6 (Family Court
// jurisdiction over custody & visitation). NY distinguishes legal
// custody (decision-making) from physical custody (day-to-day care).

export const CUSTODY = {
  id: "custody",
  term: { en: "Custody" },
  aka: ["Legal Custody", "Physical Custody"],
  category: "family",
  subtags: ["children", "process"],

  context: {
    en: "You hear this when parents are deciding — or fighting about — who the kids live with and who makes decisions for them. New York judges ask one question: what is in the best interests of the child. No parent starts out with an advantage."
  },

  plainEnglish: {
    en: "The legal word for who a child lives with and who makes the big decisions for them. There are two kinds. Legal custody is about who decides things like school, doctor, and religion — it can be shared between both parents or given to one. Physical custody is about who the child lives with most of the time — also shared or given to one. Courts look at one question: what is best for the child. Neither parent has a head start — not the mom, not the dad. The judge looks at things like each parent's home, who has been caring for the child, any violence in the home, and the child's health and safety."
  },

  whatToAsk: {
    en: [
      "Am I asking for legal custody, physical custody, or both?",
      "Is there an existing temporary order, or are we starting fresh?",
      "What does the judge need to see to grant what I am asking for?",
      "Can I request a specific parenting schedule?",
      "If things change later, can custody be changed?"
    ]
  },

  related: ["family-court", "visitation", "child-support", "family-offense-petition"],
  legalEntryIds: ["custody-basics-ny"],

  citation: "NY Domestic Relations Law § 70; FCA Article 6",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/DOM/70",
  lastVerified: "2026-04-15",
  status: "active"
};
