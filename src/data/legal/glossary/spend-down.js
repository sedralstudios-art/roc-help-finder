export const SPEND_DOWN = {
  id: "spend-down",
  term: { en: "Spend-Down" },
  aka: ["Medicaid Spend-Down", "Excess Income"],
  category: "benefits",
  subtags: ["health", "program-jargon"],

  context: {
    en: "You hear this when someone applies for Medicaid but their income is a little too high. Instead of being denied outright, they may be allowed to 'spend down' — meaning pay a portion of their medical bills each month, and Medicaid covers the rest."
  },

  plainEnglish: {
    en: "A way to qualify for Medicaid when an applicant's income is above the normal limit. The amount above the limit is the 'excess income.' Each month, the applicant pays that amount toward medical expenses out of pocket. Once it is paid, Medicaid covers the rest of the applicant's care for that month. It works like a monthly deductible. The spend-down amount is calculated by comparing the applicant's income to the Medicaid income level for the household size. Medical bills, insurance premiums, and pharmacy costs all count toward meeting the spend-down. This mostly applies to people over 65, people with disabilities, or people in the non-MAGI Medicaid categories."
  },

  whatToAsk: {
    en: [
      "What is my monthly spend-down amount?",
      "What expenses count toward meeting it?",
      "Do I have to meet it every month, or does it carry over?",
      "Can I use old medical bills to meet this month's spend-down?",
      "Is there a way to reduce or eliminate the spend-down?"
    ]
  },

  related: ["medicaid", "fpl", "copay", "deductible", "managed-care"],
  legalEntryIds: ["medicaid-spend-down-ny"],

  citation: "NY Soc. Services Law § 366; 18 NYCRR 360-4.8",
  sourceUrl: "https://www.health.ny.gov/health_care/medicaid/",
  lastVerified: "2026-04-16",
  status: "active"
};
