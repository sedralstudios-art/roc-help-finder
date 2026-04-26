export const ACQUITTAL = {
  id: "acquittal",
  term: { en: "Acquittal" },
  aka: ["Not Guilty Verdict"],
  category: "criminal",
  subtags: ["trial", "verdict"],

  context: {
    en: "An acquittal is a verdict of not guilty. After a jury trial or bench trial, the judge or jury can find the defendant not guilty of one or all charges. An acquittal usually ends the case and triggers automatic record sealing in New York."
  },

  plainEnglish: {
    en: "A verdict that the defendant is not guilty of a charge. After a jury trial, the jury delivers the verdict. After a bench trial, the judge does. An acquittal can come on all charges or on only some, with conviction on others. The standard for criminal conviction is proof beyond a reasonable doubt. If even one juror has reasonable doubt, the verdict is not guilty (or the jury is hung, leading to a mistrial). Double jeopardy bars the prosecution from retrying a defendant who has been acquitted of the same offense. The judge can also enter a directed verdict of acquittal — sometimes called a trial order of dismissal — if the prosecution's evidence is insufficient as a matter of law. In New York, an acquittal is grounds for automatic sealing of the case record under CPL § 160.50."
  },

  whatToAsk: {
    en: [
      "Was I acquitted of all charges, or only some?",
      "Will the record be sealed automatically under CPL 160.50?",
      "Can the prosecution appeal an acquittal?",
      "Are there any collateral effects of the case despite the acquittal?",
      "How do I confirm the sealing has actually been done?"
    ]
  },

  related: ["sealed-record", "burden-of-proof", "mistrial", "discovery"],
  legalEntryIds: [],

  citation: "NY CPL § 160.50; § 290.10 (trial order of dismissal); Fifth Amendment (double jeopardy)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CPL/160.50",
  lastVerified: "2026-04-26",
  status: "active"
};
