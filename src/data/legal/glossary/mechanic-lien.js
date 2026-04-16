export const MECHANIC_LIEN = {
  id: "mechanic-lien",
  term: { en: "Mechanic's Lien" },
  aka: ["contractor lien", "construction lien", "lien on house"],
  category: "housing",
  subtags: ["contractor", "property", "debt"],

  context: {
    en: "This comes up when a contractor, plumber, electrician, or material supplier does work on a house or building and does not get paid. They can file a mechanic's lien, which is a legal claim against the property."
  },

  plainEnglish: {
    en: "A mechanic's lien is a claim that a contractor or supplier files against a property when they are not paid for work they did. The lien attaches to the house or building — not to the homeowner personally. It shows up when the owner tries to sell or refinance. The lien must be filed within a certain number of months after the work was done. If the lien is not resolved, the contractor can go to court to force a sale of the property to get paid. Homeowners can protect themselves by getting lien waivers from subcontractors before making final payment to the general contractor."
  },

  whatToAsk: {
    en: [
      "How long does the contractor have to file a mechanic's lien after the work is done?",
      "Can I post a bond to remove the lien from my property while the dispute is resolved?",
      "I paid the general contractor in full — can a subcontractor still file a lien against my house?",
      "Does the lien expire if the contractor does not file a lawsuit?"
    ]
  },

  related: ["tax-lien", "foreclosure", "judgment"],
  legalEntryIds: ["mechanic-lien-ny", "contractor-fraud-ny", "home-improvement-contractor-ny"],

  citation: "NY Lien Law § 3",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/LIE/3",
  lastVerified: "2026-04-16",
  status: "active"
};
