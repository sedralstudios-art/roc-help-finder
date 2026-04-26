export const EXPLANATION_OF_BENEFITS = {
  id: "explanation-of-benefits",
  term: { en: "Explanation of Benefits (EOB)" },
  aka: ["EOB"],
  category: "benefits",
  subtags: ["health", "billing"],

  context: {
    en: "An Explanation of Benefits is the statement a health insurer sends after processing a claim. It is not a bill — it explains what the insurer paid, what was denied, and what the patient may owe. Reading the EOB carefully is the first step in catching billing errors and denials."
  },

  plainEnglish: {
    en: "A statement sent by a health insurer to the member after a claim is processed. The EOB shows the date and place of service, the provider's billed amount, the amount the insurer allowed under the contract with the provider, the amount the insurer paid, and the amount the member may owe. The EOB also shows any reason a claim was reduced or denied — common reasons include out-of-network charges, lack of prior authorization, services not covered by the plan, and coding errors. The EOB is not a bill. The actual bill comes from the provider. Comparing the EOB and the provider bill often catches billing mistakes, balance billing, or denied claims that should have been paid. The EOB also lists the deadline and process for an internal appeal. New York's surprise-bill law and federal No Surprises Act protect patients from many out-of-network and emergency-room balance bills."
  },

  whatToAsk: {
    en: [
      "Does the EOB and the provider bill match?",
      "What is the reason the insurer gave for any denial or reduction?",
      "Has the surprise-bill or No Surprises Act protection been applied?",
      "What is the deadline to file an internal appeal?",
      "Can the provider waive the patient-owed portion or set up a payment plan?"
    ]
  },

  related: ["copay", "deductible", "balance-billing", "managed-care", "prior-authorization"],
  legalEntryIds: [],

  citation: "29 USC § 1133 (ERISA claims procedure); 45 CFR § 147.136; NY Insurance Law § 3217-a",
  sourceUrl: "https://www.dfs.ny.gov/consumers/health_insurance",
  lastVerified: "2026-04-26",
  status: "active"
};
