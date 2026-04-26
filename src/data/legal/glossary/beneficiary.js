export const BENEFICIARY = {
  id: "beneficiary",
  term: { en: "Beneficiary" },
  aka: ["Named Beneficiary", "Pay-on-Death"],
  category: "family",
  subtags: ["estate", "after-death"],

  context: {
    en: "A beneficiary is anyone named to receive property from a will, a trust, a life insurance policy, a retirement account, or a bank account at the owner's death. Beneficiary designations on accounts override what a will says about the same money."
  },

  plainEnglish: {
    en: "A person or organization named to receive property from a will, a trust, a life insurance policy, a retirement account, or a bank account at the original owner's death. Beneficiary designations on financial accounts and insurance policies usually override what a will says — the money goes to the named beneficiary even if the will says otherwise. This is why beneficiary forms should be reviewed regularly, especially after major life events like marriage, divorce, or a death in the family. A primary beneficiary is the first in line. A contingent beneficiary receives the property if the primary beneficiary cannot. Some accounts allow a percentage split among multiple beneficiaries."
  },

  whatToAsk: {
    en: [
      "Who is currently named as beneficiary on each of my accounts?",
      "Should I name a primary and contingent beneficiary on each account?",
      "What happens if a named beneficiary has died before me?",
      "How does a beneficiary designation interact with my will?",
      "Can I update beneficiaries after a divorce, and how?"
    ]
  },

  related: ["will", "executor", "intestate", "probate"],
  legalEntryIds: [],

  citation: "NY EPTL Article 13 (general estates law)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/EPT/A13",
  lastVerified: "2026-04-26",
  status: "active"
};
