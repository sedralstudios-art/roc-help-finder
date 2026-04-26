// Glossary term: Arrest
// Citation verified: NY CPL Article 140 (arrest without warrant procedures).
// CPL § 140.10 covers police authority; § 140.20 covers post-arrest procedure.

export const ARREST = {
  id: "arrest",
  term: { en: "Arrest" },
  aka: [],
  category: "criminal",
  subtags: ["pre-court", "starting-point"],

  context: {
    en: "This is where a criminal case starts. A police officer takes you into custody and tells you why. You might be held at a station, fingerprinted, and then either released with a ticket to come to court, or held until arraignment."
  },

  plainEnglish: {
    en: "The police take a person into custody because they believe the person committed an offense. The officer must say why, unless things are moving too fast (someone fighting or running, for example). After the arrest, the person is brought to a local criminal court as soon as possible for arraignment. In some smaller cases the police issue a ticket to come back to court later — this is called an appearance ticket, and the person is not held."
  },

  whatToAsk: {
    en: [
      "What am I being arrested for?",
      "Am I free to go, or am I in custody?",
      "Can I have a lawyer?",
      "When will I see a judge?",
      "Can I call someone?"
    ]
  },

  related: ["arraignment", "bail", "ror", "bench-warrant", "public-defender", "misdemeanor", "felony"],
  legalEntryIds: ["rights-when-arrested-ny"],

  citation: "NY CPL Article 140 (§ 140.10, § 140.20)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CPL/A140",
  lastVerified: "2026-04-15",
  status: "active"
};
