// Glossary term: Mandatory Surcharge
// Citation verified: NY Penal Law § 60.35. Felony $300 + $25 crime-victim
// assistance fee; misdemeanor $175 + $25. Added automatically at sentencing
// on conviction — cannot be waived except in narrow circumstances.

export const MANDATORY_SURCHARGE = {
  id: "mandatory-surcharge",
  term: { en: "Mandatory Surcharge" },
  aka: ["Surcharge", "Court Fee", "Crime Victim Assistance Fee"],
  category: "criminal",
  subtags: ["sentence", "money"],

  context: {
    en: "You hear this at sentencing. It is a fee the state adds on top of any fine, restitution, or jail time. Judges have almost no power to waive it."
  },

  plainEnglish: {
    en: "A fixed fee the state adds to every conviction, separate from any fine or restitution. It is not a punishment — it is how the state pays for things like victim services and court costs. The amounts are set in NY Penal Law § 60.35 — different totals for felonies and misdemeanors, plus a crime victim fee. Some cases carry extra fees (sex offense registration fees, DNA fees, and so on). Judges cannot usually lower or waive these. A defendant who cannot pay can have the money taken from a paycheck or tax refund, or converted into community service."
  },

  whatToAsk: {
    en: [
      "Exactly how much will the surcharge be?",
      "Are there any extra fees for my specific charge?",
      "Can I ask for a payment plan?",
      "What happens if I don't pay?",
      "Is there any way to get this waived because I cannot afford it?"
    ]
  },

  related: ["restitution", "sentence", "plea", "conditional-discharge"],
  legalEntryIds: ["sentencing-options-ny"],

  citation: "NY Penal Law § 60.35",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/PEN/60.35",
  lastVerified: "2026-04-15",
  status: "active"
};
