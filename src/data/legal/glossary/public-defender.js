// Glossary term: Public Defender (Assigned Counsel / 18-B)
// Citation verified: NY County Law § 722, Article 18-B — each county must
// have a plan to provide counsel for people who can't afford one. Models:
// Public Defender office, Legal Aid, rotating 18-B panel, Conflict Defender.
// In Monroe County the main providers are the Monroe County Public Defender
// and the Monroe County Assigned Counsel Program (18-B panel).

export const PUBLIC_DEFENDER = {
  id: "public-defender",
  term: { en: "Public Defender" },
  aka: ["Assigned Counsel", "18-B Lawyer", "Court-Appointed Lawyer"],
  category: "criminal",
  subtags: ["counsel", "arraignment-stage"],

  context: {
    en: "You hear this at arraignment. If you cannot afford to hire your own lawyer, the judge assigns one to you for free. In Monroe County, the office is usually the Monroe County Public Defender or an 18-B panel lawyer — both are free."
  },

  plainEnglish: {
    en: "A lawyer the court provides for free to a defendant who cannot pay. This right applies in every criminal case where jail is possible. In New York, each county has a plan: a Public Defender office, a Legal Aid group, or a panel of private lawyers (called '18-B' after the law). The assigned lawyer is a real lawyer — same court rules, same duty to the client. The client owes the lawyer no money. A short income form may be required for the assignment."
  },

  whatToAsk: {
    en: [
      "Can I have a free lawyer?",
      "Will the same lawyer stay with me for the whole case?",
      "How do I reach my lawyer between court dates?",
      "If I disagree with my assigned lawyer, what can I do?"
    ]
  },

  related: ["arraignment", "plea", "motion-to-dismiss"],
  legalEntryIds: ["right-to-a-lawyer-ny"],

  citation: "NY County Law § 722 (Article 18-B)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CNT/722",
  lastVerified: "2026-04-15",
  status: "active"
};
