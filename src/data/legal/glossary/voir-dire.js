export const VOIR_DIRE = {
  id: "voir-dire",
  term: { en: "Voir Dire" },
  aka: ["Jury Selection"],
  category: "courts",
  subtags: ["trial", "jury"],

  context: {
    en: "Voir dire is the process of choosing the jury for a trial. Lawyers and the judge ask potential jurors questions to find out about bias, life experience, and ability to be fair."
  },

  plainEnglish: {
    en: "The questioning process used to pick the jury for a trial. The judge and the lawyers for both sides ask potential jurors questions about their backgrounds, opinions, and any connection to the case. The goal is to find people who can be fair and follow the law. Some potential jurors are excused for cause — for example, a clear bias against one side, a family connection to a party, or a strong opinion that cannot be set aside. Each side also gets a limited number of peremptory challenges, which can excuse a juror without giving a reason. Peremptory challenges cannot be used to strike jurors based on race, sex, or other protected characteristics. The whole voir dire process can take a few hours for a small case or several days for a complex one. The picked jurors are then sworn in and the trial begins."
  },

  whatToAsk: {
    en: [
      "Who picks the jury — the judge, the lawyers, or both?",
      "What is the difference between a for-cause challenge and a peremptory challenge?",
      "How many peremptory challenges does each side get?",
      "Can a peremptory challenge be challenged for being based on race or sex?",
      "How long does jury selection usually take in this kind of case?"
    ]
  },

  related: ["jury-duty", "burden-of-proof", "discovery"],
  legalEntryIds: [],

  citation: "NY CPL § 270.15 (criminal voir dire); CPLR Article 41 (civil)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CPL/270.15",
  lastVerified: "2026-04-26",
  status: "active"
};
