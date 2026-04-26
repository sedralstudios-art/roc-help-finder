export const MEDICARE = {
  id: "medicare",
  term: { en: "Medicare" },
  aka: [],
  category: "benefits",
  subtags: ["health", "federal", "seniors"],

  context: {
    en: "Medicare is the federal health insurance program mainly for people age 65 and older, plus some younger people with certain disabilities or end-stage renal disease. It is different from Medicaid — Medicare is for seniors regardless of income, Medicaid is for low-income people of any age."
  },

  plainEnglish: {
    en: "A federal health insurance program that covers people age 65 and older, people who have received SSDI for at least 24 months, and people with end-stage renal disease or ALS. Medicare has four parts. Part A covers hospital care and is usually free for people who paid Medicare taxes. Part B covers doctor visits and outpatient care and has a monthly premium. Part C (Medicare Advantage) is a private plan that bundles Parts A and B and often Part D. Part D covers prescription drugs through private plans. Medicare does not cover everything — it has copays, deductibles, and gaps. People with low income may qualify for a Medicare Savings Program that pays the premiums and cost-sharing, or for both Medicare and Medicaid (called dual eligible). The annual open enrollment period for changing plans is October 15 through December 7."
  },

  whatToAsk: {
    en: [
      "Am I eligible for Medicare based on age, disability, or condition?",
      "Which parts of Medicare should I enroll in, and when?",
      "Do I qualify for a Medicare Savings Program to help with costs?",
      "Should I choose Original Medicare or a Medicare Advantage plan?",
      "Where can I get free help comparing Medicare plans?"
    ]
  },

  related: ["medicaid", "ssi-ssdi", "managed-care", "spend-down"],
  legalEntryIds: [],

  citation: "42 USC § 1395 (Title XVIII, Social Security Act)",
  sourceUrl: "https://www.medicare.gov/",
  lastVerified: "2026-04-26",
  status: "active"
};
