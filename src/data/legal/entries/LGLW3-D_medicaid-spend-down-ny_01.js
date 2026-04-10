export const MEDICAID_SPEND_DOWN_NY = {
  id: "medicaid-spend-down-ny",
  category: "benefits",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "Medicaid Spend-Down — Coverage When Your Income Is Over the Limit" },

  summary: {
    en: "If your income is slightly above the Medicaid limit, you may still qualify through the Medicaid Excess Income Program. This program lets you use medical bills to reduce your countable income and become eligible for Medicaid coverage."
  },

  whoQualifies: {
    en: [
      "Adults aged 65 and older whose income is above the Medicaid income limit.",
      "People who are certified as disabled by the Social Security Administration or NYS OTDA.",
      "People who are legally blind.",
      "Applicants must also meet Medicaid asset limits and all other eligibility requirements.",
      "This program uses Non-MAGI rules. It does not apply to most adults under 65 who qualify under standard Medicaid."
    ]
  },

  whatItMeans: {
    en: "The Medicaid Excess Income Program is also called the spend-down program or the surplus income program. It works like a deductible. The difference between your monthly income and the Medicaid income level is called your excess income. If your medical bills equal or exceed your excess income in a given month, Medicaid covers your remaining costs. This coverage applies for the rest of that month. The bills can be paid or unpaid. They can include doctor visits, prescriptions, medical supplies, and insurance premiums. Over-the-counter medications recommended by a doctor and medical transportation receipts also count. Bills from a spouse or children under 21 may also count. Your local Department of Social Services determines your excess income amount. You do not need to calculate it yourself. You will receive a notice with the amount. The Medicaid income level and asset limits are updated every January. Current limits are published by the NYS Department of Health."
  },

  yourRights: {
    en: [
      "You have the right to participate in the spend-down program if your income exceeds the Medicaid limit but you meet all other eligibility requirements.",
      "You have the right to use paid or unpaid medical bills to meet your spend-down amount.",
      "You have the right to fax your bills to the DSS office instead of delivering them in person, especially as a reasonable accommodation for a disability.",
      "You have the right to retroactive Medicaid coverage for up to three months before the month you applied, if you had eligible medical expenses during that time.",
      "You have the right to a fair hearing if your application is denied or your excess income amount is calculated incorrectly.",
      "You have the right to choose between the bill submission method and the Pay-In Program."
    ]
  },

  legalOptions: {
    en: [
      "Under NY Social Services Law § 366, the Medicaid Excess Income Program is available at every county Department of Social Services office in New York State.",
      "The NYS Department of Health publishes current Medicaid income and asset limits each year at health.ny.gov/health_care/medicaid/.",
      "Two methods exist for meeting the spend-down each month. The first is submitting medical bills equal to or greater than the excess income amount to the local DSS office. The second is the Pay-In Program, where the excess income amount is paid directly to DSS in exchange for coverage that month.",
      "Under the Pay-In Program, paying for one to five months provides outpatient coverage only. Paying for six months at once provides both outpatient and inpatient coverage for the full six-month period.",
      "People with disabilities may also be eligible for a Pooled Supplemental Needs Trust, which can eliminate the spend-down by placing excess income into a trust each month. These trusts are managed by nonprofit organizations.",
      "The statewide Medicaid helpline is available at 1-800-541-2831.",
      "Fair hearings may be requested by calling 1-800-342-3334.",
      "Free legal help with Medicaid spend-down issues is available through LawNY at (585) 325-2520 and Empire Justice Center at (585) 454-4060."
    ]
  },

  example: {
    en: "Rose is 72 and lives alone in Livingston County on a fixed income of $2,100 per month. The Medicaid income limit for a single person is lower than her income. Her excess income is about $280 per month. Each month, she submits her prescription receipts and doctor visit bills to her county DSS office. Because her medical bills regularly exceed $280, she qualifies for Medicaid coverage for the rest of that month. Her home aide visits and remaining prescriptions are covered by Medicaid."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Health law, Medicaid, Medicare, elder law, spend-down assistance",
      qualifier: "Low income residents in 14 Western NY counties including Monroe",
      access: "Phone intake at (585) 325-2520",
      outcome: "Direct representation",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Medicaid, health law, disability benefits, systemic advocacy",
      qualifier: "Low and moderate income residents statewide (all NYS counties except NYC)",
      access: "Phone intake at (585) 454-4060",
      outcome: "Direct representation, impact litigation, and policy advocacy",
      phone: "(585) 454-4060",
      url: "https://www.empirejustice.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Public benefits, Medicaid applications, denials, and fair hearings",
      qualifier: "Low income residents of Monroe and surrounding counties",
      access: "Phone intake, walk-in, or referral",
      outcome: "Direct representation and advice on benefits cases",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "medicaid-ny",
    "disability-medicaid-ny",
    "medicare-savings-program-ny",
    "benefits-denial-appeal-ny",
    "fair-hearing-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "Medicaid spend down",
    "excess income Medicaid",
    "income too high for Medicaid",
    "over income Medicaid",
    "surplus income",
    "medical bills too high",
    "can't afford medicine",
    "senior health insurance",
    "disabled health coverage",
    "Medicaid deductible"
  ],

  sources: [
    "https://www.health.ny.gov/health_care/medicaid/excess_income.htm",
    "https://www.nysenate.gov/legislation/laws/SOS/366",
    "https://www.law.cornell.edu/uscode/text/42/1396a"
  ],

  lastAudited: "2026-04-04",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
