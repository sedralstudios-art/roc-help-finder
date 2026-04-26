export const SEX_OFFENDER_REGISTRY = {
  id: "sex-offender-registry",
  term: { en: "Sex Offender Registry" },
  aka: ["SORA", "Sex Offender Registration Act"],
  category: "criminal",
  subtags: ["post-conviction", "registration"],

  context: {
    en: "New York's Sex Offender Registration Act (SORA) requires people convicted of certain sex offenses to register with the state. Registrants are assigned a risk level (1, 2, or 3) by the court that determines how long they must register and how much information is public."
  },

  plainEnglish: {
    en: "A state-run database of people convicted of certain sex offenses, set up by NY Correction Law Article 6-C (the Sex Offender Registration Act, or SORA). Registrants are classified by risk level after a court hearing. Level 1 (lowest risk) registers for 20 years. Level 2 (moderate risk) registers for life. Level 3 (highest risk) registers for life with the most public disclosure. Registrants must verify their address and other information with local law enforcement on a regular schedule and report any changes within a set time. Failure to register or to update information is a separate felony. The public can access information about Level 2 and Level 3 registrants through the New York State Sex Offender Registry website. Level 1 information is more limited. SORA also restricts where some registrants can live, work, and go (especially near schools). The defense lawyer is the best source on classification challenges, modification petitions, and downward modifications based on time and circumstances."
  },

  whatToAsk: {
    en: [
      "Which conviction triggers registration in this case?",
      "What level was assigned, and how long does registration last?",
      "What information is public for that level?",
      "What are the address-verification and reporting requirements?",
      "Is a downward modification of the level a possibility later?"
    ]
  },

  related: ["conviction", "sealed-record", "felony", "expungement", "certificate-of-relief"],
  legalEntryIds: [],

  citation: "NY Correction Law Article 6-C (SORA, §§ 168-168-w)",
  sourceUrl: "https://www.criminaljustice.ny.gov/SomsSUBDirectory/search_index.jsp",
  lastVerified: "2026-04-26",
  status: "active"
};
