export const PROBATE = {
  id: "probate",
  term: { en: "Probate" },
  aka: ["Probate Process", "Estate Administration"],
  category: "family",
  subtags: ["estate", "after-death"],

  context: {
    en: "Probate comes up after someone dies leaving a will. It is the court process that proves the will is valid and authorizes someone to gather assets, pay debts, and distribute what is left to the people named in the will."
  },

  plainEnglish: {
    en: "The court process that handles a deceased person's will and estate. The will is filed in Surrogate's Court along with a petition. The judge confirms the will is valid and appoints the executor named in the will. The executor then gathers the estate assets, pays debts and taxes, and distributes the rest to the people named in the will. Small estates can use a faster small-estate affidavit instead of full probate. Estates without a will go through a separate process called administration, where the judge appoints an administrator and the property passes by intestacy rules."
  },

  whatToAsk: {
    en: [
      "Does this estate need full probate or can a small-estate affidavit be used?",
      "How long does probate usually take in Monroe County?",
      "Who can be the executor if the will does not name one or the named person declines?",
      "What are the filing fees for the petition?",
      "Can a will be challenged in probate, and what are the grounds?"
    ]
  },

  related: ["surrogate-court", "executor", "intestate", "affidavit"],
  legalEntryIds: ["when-someone-dies-estate-ny"],

  citation: "NY SCPA Article 14",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/SCP/A14",
  lastVerified: "2026-04-26",
  status: "active"
};
