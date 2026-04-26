export const CONVICTION = {
  id: "conviction",
  term: { en: "Conviction" },
  aka: ["Found Guilty"],
  category: "criminal",
  subtags: ["disposition", "post-trial"],

  context: {
    en: "A conviction is a finding of guilt — either by a jury or judge after trial, or by the defendant pleading guilty. A conviction usually leads to a sentence and goes on the defendant's criminal record."
  },

  plainEnglish: {
    en: "A finding that the defendant is guilty of a crime. A conviction can come from a guilty verdict at trial or from a guilty plea. Both produce a conviction on the defendant's criminal record. The level of conviction tracks the level of the offense — felony, misdemeanor, or violation. After conviction, the case moves to sentencing. The judge picks from the authorized sentences for the offense level under the Penal Law. Convictions affect more than the sentence. They can affect employment, housing, professional licenses, immigration status, gun rights, voting rights (currently restored automatically in New York after release), and more. Some convictions can be sealed later under the Clean Slate Act or under CPL § 160.59 for older eligible cases. A successful direct appeal can vacate the conviction. A motion to vacate under CPL § 440.10 can challenge the conviction based on certain post-trial issues."
  },

  whatToAsk: {
    en: [
      "What level of conviction is this — felony, misdemeanor, or violation?",
      "How will the conviction affect my job, housing, and other rights?",
      "Is the conviction eligible for sealing now or in the future?",
      "Can the conviction be challenged on appeal or by a 440 motion?",
      "Should a Certificate of Relief from Disabilities be requested?"
    ]
  },

  related: ["sealed-record", "certificate-of-relief", "appeal", "felony", "misdemeanor", "sentence"],
  legalEntryIds: [],

  citation: "NY Penal Law § 1.05 (definitions); CPL § 160.59; CPL § 440.10",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CPL/440.10",
  lastVerified: "2026-04-26",
  status: "active"
};
