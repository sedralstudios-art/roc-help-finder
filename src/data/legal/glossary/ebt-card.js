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
    en: "A card the state gives you to access your SNAP (food) benefits and sometimes cash assistance. It looks and works like a regular debit card. You swipe it at the checkout at most grocery stores, farmers markets, and some convenience stores. The balance reloads once a month on a set date. If the card is lost or stolen, call the number on the back or your county DSS to get a replacement."
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
