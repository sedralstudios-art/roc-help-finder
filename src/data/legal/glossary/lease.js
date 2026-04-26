export const LEASE = {
  id: "lease",
  term: { en: "Lease" },
  aka: ["Rental Agreement", "Tenancy Agreement"],
  category: "housing",
  subtags: ["rental", "contract"],

  context: {
    en: "A lease is the contract between a landlord and tenant. It sets the rent, the length of the tenancy, the rules, and the rights of both sides. Some lease terms are illegal in New York no matter what the lease says."
  },

  plainEnglish: {
    en: "A written contract between a landlord and a tenant. It sets the terms of a rental: rent amount, length of tenancy, security deposit, rules about pets and guests, who pays utilities, and many other items. A lease can be for a fixed term, like one year, or month-to-month. Some lease terms are unenforceable in New York no matter what the lease says. The warranty of habitability cannot be waived. Late fees are capped by RPL § 238-a. A clause requiring a tenant to pay the landlord's legal fees is automatically reciprocal. The signed lease is binding on both sides. The landlord cannot change the terms mid-lease. The tenant cannot move out early without consequences unless an exception applies — military deployment, domestic violence, or constructive eviction. A copy of the signed lease should be kept by both parties."
  },

  whatToAsk: {
    en: [
      "How long is the lease term?",
      "What is the security deposit, and when must it be returned?",
      "What does the lease say about late fees and renewals?",
      "Are there any clauses that conflict with New York tenant law?",
      "What are the consequences for breaking the lease early?"
    ]
  },

  related: ["security-deposit", "warranty-of-habitability", "holdover", "landlord-retaliation", "eviction"],
  legalEntryIds: [],

  citation: "NY Real Property Law generally; RPL § 235-b (habitability), § 238-a (late fee cap)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/RPP/235-B",
  lastVerified: "2026-04-26",
  status: "active"
};
