export const RIVERS_ORDER = {
  id: "rivers-order",
  term: { en: "Rivers Order" },
  aka: ["Rivers v. Katz", "court-ordered medication", "involuntary medication order"],
  category: "criminal",
  subtags: ["mental-health", "patient-rights", "psychiatric"],

  context: {
    en: "This comes up when a person is in a psychiatric hospital and refuses to take medication. The hospital wants to force the medication, but the patient says no. The hospital has to go to court and get a Rivers order before it can give the medication against the patient's will."
  },

  plainEnglish: {
    en: "A Rivers order is a court order that allows a hospital to give psychiatric medication to a patient who does not want it. The name comes from a court case called Rivers v. Katz. The hospital has to prove two things to get the order: the patient does not have the ability to make their own treatment decisions (lacks capacity), and the medication is in the patient's best interest. The patient gets a free lawyer through the Mental Hygiene Legal Service to fight the order. The judge decides — the hospital cannot force medication without the court's permission."
  },

  whatToAsk: {
    en: [
      "Does the patient get a hearing before the medication is forced?",
      "How long does the Rivers order last?",
      "Can the patient appeal a Rivers order?",
      "What happens if the patient refuses to take the medication even after the order?"
    ]
  },

  related: ["probation"],
  legalEntryIds: ["mental-health-patient-rights-ny", "involuntary-commitment-ny", "psychiatric-advance-directive-ny"],

  citation: "Rivers v. Katz, 67 N.Y.2d 485 (1986)",
  sourceUrl: "https://www.nycourts.gov/courts/ad4/MHLS/index.shtml",
  lastVerified: "2026-04-16",
  status: "active"
};
