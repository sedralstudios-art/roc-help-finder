export const IN_NETWORK = {
  id: "in-network",
  term: { en: "In-Network (Health Insurance)" },
  aka: ["Network Provider", "Participating Provider"],
  category: "benefits",
  subtags: ["health", "billing"],

  context: {
    en: "An in-network provider is a doctor, hospital, lab, or pharmacy that has a contract with a person's health insurance plan. In-network care almost always costs less than out-of-network care, and some plans only cover in-network care at all."
  },

  plainEnglish: {
    en: "A health care provider that has a contract with a specific health insurance plan to provide services at agreed prices. In-network providers usually charge the patient less out-of-pocket because the insurer pays a higher percentage and the contracted rate is lower than the provider's regular fee. Out-of-network providers have no contract. The insurer may pay a smaller share — or in some plan types (HMO, EPO) nothing at all — and the patient can be charged the difference between the insurer's allowed amount and the provider's full bill (called balance billing in some contexts). Each insurance plan publishes its own provider directory online. The directory is required to be reasonably accurate, and federal No Surprises Act rules limit certain out-of-network charges in emergency and facility-based care. The patient can call the insurer or the provider's office to verify network status before a non-emergency appointment, since networks change."
  },

  whatToAsk: {
    en: [
      "Is my doctor or hospital in-network for my plan?",
      "If a provider is out-of-network, what will my plan still cover?",
      "Does the No Surprises Act apply to this bill?",
      "How do I find an in-network specialist or facility?",
      "What happens if a provider was listed in the directory but turns out to be out-of-network?"
    ]
  },

  related: ["copay", "deductible", "explanation-of-benefits", "balance-billing", "managed-care", "prior-authorization"],
  legalEntryIds: [],

  citation: "No Surprises Act (45 CFR § 149); NY Insurance Law § 3217-a",
  sourceUrl: "https://www.cms.gov/nosurprises",
  lastVerified: "2026-04-26",
  status: "active"
};
