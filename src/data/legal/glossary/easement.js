export const EASEMENT = {
  id: "easement",
  term: { en: "Easement" },
  aka: ["Right of Way"],
  category: "housing",
  subtags: ["property", "neighbor"],

  context: {
    en: "An easement is a legal right to use part of someone else's property for a specific purpose. Common examples include a shared driveway, utility lines crossing a yard, or a path to a beach over a neighbor's land."
  },

  plainEnglish: {
    en: "A legal right to use a specific part of someone else's property without owning it. Common examples include a utility company's right to put power lines on a portion of a yard, a neighbor's right to use a shared driveway, or a right to walk across one parcel to reach another. Easements are usually written into the deed and stay with the property when it is sold. Some easements arise by long, continuous use without permission, similar to adverse possession. Easements limit what the property owner can do on the affected area — the owner cannot block the easement holder's permitted use. Disputes about easement boundaries or scope often end up in Supreme Court."
  },

  whatToAsk: {
    en: [
      "Are there any easements recorded against this property?",
      "What does the easement actually allow the holder to do?",
      "Can an easement be ended, and under what circumstances?",
      "Do I have to maintain the easement area, or does the holder?",
      "Can an easement holder expand the use without my permission?"
    ]
  },

  related: ["adverse-possession", "lien", "variance"],
  legalEntryIds: [],

  citation: "NY common law; NY Real Property Law generally",
  sourceUrl: "https://www.law.cornell.edu/wex/easement",
  lastVerified: "2026-04-26",
  status: "active"
};
