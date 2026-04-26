export const EBT_CARD = {
  id: "ebt-card",
  term: { en: "EBT Card" },
  aka: ["Electronic Benefits Transfer", "SNAP Card", "Benefits Card"],
  category: "benefits",
  subtags: ["food", "program-jargon"],

  context: {
    en: "You hear this when you apply for SNAP or cash assistance. It is the card the state puts your benefits on. It works like a debit card at grocery stores."
  },

  plainEnglish: {
    en: "A card the state issues to access SNAP (food) benefits and sometimes cash assistance. It looks and works like a regular debit card. The recipient swipes it at the checkout at most grocery stores, farmers markets, and some convenience stores. The balance reloads once a month on a set date. A lost or stolen card can be replaced by calling the number on the back or the county DSS."
  },

  whatToAsk: {
    en: [
      "When does my balance reload each month?",
      "Where can I use this card?",
      "If my card is lost, how do I get a new one?",
      "Does my cash assistance go on the same card?"
    ]
  },

  related: ["snap", "temporary-assistance"],
  legalEntryIds: [],

  citation: "Administered by NY OTDA; federal EBT program",
  sourceUrl: "https://otda.ny.gov/programs/ebt/",
  lastVerified: "2026-04-16",
  status: "active"
};
