// Glossary term: Arraignment
// Citation verified: NY CPL § 170.10 (misdemeanor) and § 180.10 (felony).
// Content at ~6th grade reading level per project rule.

export const ARRAIGNMENT = {
  id: "arraignment",
  term: { en: "Arraignment" },
  aka: [],
  category: "criminal",
  subtags: ["arraignment-stage", "first-appearance"],

  context: {
    en: "This is your first time in front of a judge after an arrest. It usually happens within a day or two. You hear your charges read out loud and find out if you go home or stay in jail while the case goes on."
  },

  plainEnglish: {
    en: "The judge tells the defendant what the charges are and gives a copy of the paper. The judge also explains the defendant's rights, including the right to a lawyer and the right to stay quiet. A defendant who cannot afford a lawyer gets one assigned for free. The judge then decides if the defendant goes home on their own, has to post bail, or stays in jail while the case moves forward."
  },

  whatToAsk: {
    en: [
      "What exactly am I charged with? Is it a misdemeanor or a felony?",
      "Can I get a free lawyer?",
      "Will I be released today? On what conditions?",
      "When is my next court date?"
    ]
  },

  related: ["acd", "bail", "ror", "bench-warrant", "misdemeanor", "felony", "sealed-record"],
  legalEntryIds: ["rights-when-arrested-ny"],

  citation: "NY CPL § 170.10 (misdemeanor); NY CPL § 180.10 (felony)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CPL/170.10",
  lastVerified: "2026-04-15",
  status: "active"
};
