// Glossary term: Appeal
// Citation verified: NY CPL Article 450 (what can be appealed) and
// § 460.10 (notice of appeal — 30 days after sentence, filed with clerk
// and served on DA; for leave appeals, 30 days to apply for a certificate).

export const APPEAL = {
  id: "appeal",
  term: { en: "Appeal" },
  aka: ["Notice of Appeal"],
  category: "criminal",
  subtags: ["post-conviction", "post-sentence"],

  context: {
    en: "You hear this after a trial or a sentencing. It is a separate case where a higher court looks at whether the trial judge got things right. It is not a new trial — it is a review of the first one."
  },

  plainEnglish: {
    en: "A request for a higher court to review the case. A defendant can appeal after a guilty verdict at trial, or after some guilty pleas. A higher court reads the record, listens to the defense lawyer, and decides if the trial judge made a mistake big enough to change the outcome. The appeal does not produce a new trial unless the higher court orders one. The deadline to file a Notice of Appeal is 30 days after sentencing. It is a hard deadline. Missing it usually ends the appeal. Free legal help is available through the appellate public defender."
  },

  whatToAsk: {
    en: [
      "Can I appeal this?",
      "Did I give up my right to appeal as part of my plea?",
      "Where do I file the Notice of Appeal, and by what date?",
      "Can I get a free appeal lawyer?",
      "How long does an appeal take?"
    ]
  },

  related: ["plea", "public-defender", "sentence"],
  legalEntryIds: ["criminal-appeal-ny"],

  citation: "NY CPL Article 450; § 460.10 (notice of appeal)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CPL/A450",
  lastVerified: "2026-04-15",
  status: "active"
};
