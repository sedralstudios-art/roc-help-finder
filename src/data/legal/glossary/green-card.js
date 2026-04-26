export const GREEN_CARD = {
  id: "green-card",
  term: { en: "Green Card" },
  aka: ["Lawful Permanent Resident", "LPR", "Permanent Resident Card"],
  category: "general",
  subtags: ["immigration", "federal"],

  context: {
    en: "A green card is the federal document that proves a person is a Lawful Permanent Resident of the United States. LPRs can live and work in the U.S. permanently, travel in and out within limits, and apply for U.S. citizenship after meeting the residency requirements."
  },

  plainEnglish: {
    en: "A wallet-sized federal identity card that proves a person is a Lawful Permanent Resident (LPR) of the United States. LPRs can live and work in the U.S. permanently, travel internationally and re-enter, and after meeting the residency and other requirements, apply for U.S. citizenship through naturalization. Green cards are issued by U.S. Citizenship and Immigration Services (USCIS). Common paths include family sponsorship by a U.S. citizen or LPR relative, employment sponsorship by a U.S. employer, refugee or asylee adjustment after one year in the U.S., the diversity visa lottery, and several humanitarian categories. The card itself is generally valid for ten years and is renewed by filing Form I-90. LPR status can be lost by abandoning U.S. residence, by certain criminal convictions, and through removal proceedings. Conditional green cards (issued in some marriage and investor cases) are valid for two years and require a joint petition to remove conditions."
  },

  whatToAsk: {
    en: [
      "Which green card category fits this situation — family, employment, refugee, asylee, or another?",
      "When does the current card expire and what form is the renewal?",
      "Is this a conditional two-year card that needs the conditions removed?",
      "What activities can put LPR status at risk?",
      "When is the earliest date to apply for citizenship through naturalization?"
    ]
  },

  related: ["daca", "discrimination"],
  legalEntryIds: [],

  citation: "Immigration and Nationality Act §§ 201-245; 8 USC § 1101+",
  sourceUrl: "https://www.uscis.gov/green-card",
  lastVerified: "2026-04-26",
  status: "active"
};
