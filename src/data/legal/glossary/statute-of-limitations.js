export const STATUTE_OF_LIMITATIONS = {
  id: "statute-of-limitations",
  term: { en: "Statute of Limitations" },
  aka: ["SOL", "Limitations Period", "Time Bar"],
  category: "general",
  subtags: ["procedure", "deadlines"],

  context: {
    en: "A statute of limitations is the deadline by which a lawsuit or criminal charge must be filed. Once the deadline passes, the case can be dismissed even if the underlying facts are clear."
  },

  plainEnglish: {
    en: "A law that sets a deadline for filing a lawsuit or criminal charge. The clock usually starts on the date the harm happened or, in some cases, on the date the person discovered the harm. Different types of cases have different deadlines. In New York, personal injury claims generally have 3 years. Most consumer credit debt has 3 years under CPLR 214-i. Written contract claims generally have 6 years. Most felonies have a 5-year limit, with exceptions for the most serious crimes. Once the deadline runs, the defendant can raise it as a complete defense and the case is usually dismissed. Some events pause or extend the clock — minority, mental incapacity, or the defendant being out of state."
  },

  whatToAsk: {
    en: [
      "What is the deadline for the type of case being considered?",
      "When did the clock start in my situation?",
      "Are there any events that paused or extended the deadline?",
      "Has the deadline already passed?",
      "How does the statute of limitations differ for criminal versus civil cases?"
    ]
  },

  related: ["statute-of-limitations-debt", "default-judgment", "small-claims"],
  legalEntryIds: [],

  citation: "NY CPLR Article 2 (civil); NY CPL § 30.10 (criminal)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/A2",
  lastVerified: "2026-04-26",
  status: "active"
};
