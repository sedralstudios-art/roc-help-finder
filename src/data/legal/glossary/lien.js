export const LIEN = {
  id: "lien",
  term: { en: "Lien" },
  aka: ["legal claim on property", "property lien", "lien on house"],
  category: "housing",
  subtags: ["debt", "property", "enforcement"],

  context: {
    en: "This comes up when someone owes money and the creditor puts a legal claim on their property — a house, a car, or a bank account. The lien makes it hard to sell or refinance the property until the debt is paid."
  },

  plainEnglish: {
    en: "A lien is a legal claim on someone's property because of a debt. The most common types are: a mortgage (the bank has a lien on the house until the loan is paid off), a tax lien (the government puts a lien on property for unpaid taxes), a mechanic's lien (a contractor puts a lien on a house for unpaid work), and a judgment lien (a creditor who wins a lawsuit puts a lien on the debtor's property). A lien does not mean the property is taken away — it means the debt must be paid before the property can be sold or transferred."
  },

  whatToAsk: {
    en: [
      "What type of lien is on my property?",
      "How do I find out if there are liens on my property?",
      "Can I sell my house if there is a lien on it?",
      "How do I get a lien removed after the debt is paid?"
    ]
  },

  related: ["tax-lien", "mechanic-lien", "judgment", "foreclosure"],
  legalEntryIds: ["mechanic-lien-ny", "property-tax-sale-ny", "wage-garnishment-defense-ny"],

  citation: "NY Lien Law § 2",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/LIE/2",
  lastVerified: "2026-04-16",
  status: "active"
};
