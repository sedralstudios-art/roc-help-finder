// Glossary term: Fine
// Citation verified: NY Penal Law § 80.00 (felony fines — up to $5,000 or
// double the gain from the crime; higher caps for drug felonies) and § 80.05
// (Class A misdemeanor up to $1,000; Class B up to $500; violation up to
// $250). PL § 80.00(1)(d) requires the court to consider ability to pay,
// family impact, and proportionality.

export const FINE = {
  id: "fine",
  term: { en: "Fine" },
  aka: [],
  category: "criminal",
  subtags: ["sentence", "money"],

  context: {
    en: "You hear this at sentencing. A fine is money the judge orders you to pay to the state. It is different from restitution, which goes to the victim, and different from the mandatory surcharge, which is fixed by law."
  },

  plainEnglish: {
    en: "Money the court orders the defendant to pay as part of the sentence. Fines in New York have maximum amounts set by Penal Law § 80.00 and § 80.05 — different ceilings for violations, misdemeanors, and felonies, with higher caps for some drug and other special felonies. Current dollar amounts are in the statute text. Before setting the fine, the judge has to consider what the defendant can actually afford, the impact on the defendant's family, and whether the amount fits the offense. The fine is separate from restitution (which goes to a victim) and from the mandatory surcharge (a fixed state fee)."
  },

  whatToAsk: {
    en: [
      "How much is the fine?",
      "Can I set up a payment plan?",
      "What happens if I cannot pay?",
      "Is the fine separate from restitution and from the mandatory surcharge?",
      "Can community service replace some of the fine?"
    ]
  },

  related: ["sentence", "restitution", "mandatory-surcharge", "plea-bargain", "conditional-discharge"],
  legalEntryIds: ["sentencing-options-ny"],

  citation: "NY Penal Law § 80.00 (felony); § 80.05 (misdemeanor & violation)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/PEN/80.00",
  lastVerified: "2026-04-15",
  status: "active"
};
