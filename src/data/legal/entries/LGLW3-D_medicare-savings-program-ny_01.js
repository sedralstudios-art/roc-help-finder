export const MEDICARE_SAVINGS_PROGRAM_NY = {
  id: "medicare-savings-program-ny",
  category: "benefits",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "Medicare Savings Programs — Help Paying for Medicare Costs" },

  summary: {
    en: "If you have Medicare and limited income, New York's Medicare Savings Programs can pay your Medicare premiums, deductibles, and copays. New York has some of the most generous eligibility rules in the country. There is no asset test. Enrolling also qualifies you for Extra Help with prescription drug costs."
  },

  whoQualifies: {
    en: [
      "People who have Medicare and monthly income at or below 138% of the Federal Poverty Level qualify for the Qualified Medicare Beneficiary (QMB) program.",
      "People who have Medicare and monthly income between 138% and 186% of the Federal Poverty Level may qualify for the Qualifying Individual (QI) program.",
      "There is no asset or resource limit for QMB or QI in New York. Savings, bank accounts, and property are not counted.",
      "People already receiving Medicaid, SNAP, or Temporary Assistance may be automatically eligible.",
      "New York expanded QMB eligibility in 2023 so that people who previously qualified for SLMB now qualify for the broader QMB coverage."
    ]
  },

  whatItMeans: {
    en: "New York has two active Medicare Savings Programs. The Qualified Medicare Beneficiary program is the most comprehensive. QMB pays for your Medicare Part A premium if you owe one, your Part B premium, and all Medicare deductibles, copays, and coinsurance. If you are enrolled in QMB, your Medicare providers cannot bill you for any cost-sharing amounts. The Qualifying Individual program covers your Medicare Part B premium only. The Part B premium in 2026 is $202.90 per month. Having it paid through QI saves over $2,400 per year. Both QMB and QI automatically qualify you for Extra Help, which is a federal program that pays most of your Medicare Part D prescription drug costs. With Extra Help, you pay very low copays for medications and no Part D premium if you are enrolled in a benchmark plan. New York eliminated the SLMB program in 2023 because it expanded QMB eligibility to cover the same people. Income limits are based on the Federal Poverty Level and are updated each year. Current limits are published by the NYS Department of Health."
  },

  yourRights: {
    en: [
      "You have the right to apply for a Medicare Savings Program at any time. There is no limited enrollment period.",
      "You have the right to have your application decided based on income only. New York does not count assets or resources for QMB or QI.",
      "You have the right to automatic enrollment in Extra Help for prescription drug costs when you are enrolled in QMB or QI.",
      "If you are enrolled in QMB, you have the right to refuse to pay Medicare copays and deductibles. Providers cannot bill you for these amounts.",
      "You have the right to a fair hearing if your application is denied.",
      "You have the right to apply even if your income is close to the limit. Certain income disregards may lower your countable income."
    ]
  },

  legalOptions: {
    en: [
      "Under 42 U.S.C. § 1396a(a)(10)(E) and NY Social Services Law, Medicare Savings Program applications are accepted at every county Department of Social Services and through NY State of Health at nystateofhealth.ny.gov.",
      "The NYS Department of Health publishes current MSP income limits at health.ny.gov/health_care/medicaid/program/update/savingsprogram/.",
      "The Medicaid Helpline provides information about Medicare Savings Programs at 1-800-541-2831.",
      "The NY State of Health helpline is available at 1-855-355-5777.",
      "The Medicare Rights Center provides free counseling and help applying for MSPs at 1-800-333-4114.",
      "The Health Insurance Information, Counseling and Assistance Program (HIICAP) provides free Medicare counseling through local offices. Contact information is available at aging.ny.gov.",
      "If a Medicare provider bills you for copays or deductibles while you are enrolled in QMB, that billing is improper. Providers can verify QMB enrollment through the Medicaid card or QMB notice presented alongside the Medicare card.",
      "Free legal help with Medicare and Medicaid issues is available through Empire Justice Center at (585) 454-4060 and LawNY at (585) 325-2520."
    ]
  },

  example: {
    en: "Gloria is 71 and lives alone in Wayne County on Social Security income of about $1,500 per month. She has Medicare but the Part B premium, copays, and prescription costs were hard to manage on her fixed income. She applied for the QMB program through her county DSS office. Because New York has no asset test and her income was below the QMB limit, she was approved. Her Part B premium is now paid for her. She no longer owes copays or deductibles when she sees her doctor. She was also automatically enrolled in Extra Help, which lowered her prescription costs to just a few dollars per medication."
  },

  counsel: [
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Medicare, Medicaid, health law, disability benefits, systemic advocacy",
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
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Health law, Medicare, Medicaid, elder law",
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
      name: "Legal Aid Society of Rochester",
      focus: "Public benefits, Medicare, Medicaid, fair hearings",
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
    "medicaid-spend-down-ny",
    "social-security-retirement-ny",
    "ssi-disability-ny",
    "benefits-denial-appeal-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "Medicare help",
    "Medicare premium help",
    "can't afford Medicare",
    "Medicare copay help",
    "QMB",
    "Medicare Savings Program",
    "Part B premium help",
    "prescription drug help",
    "Extra Help Medicare",
    "senior health insurance help",
    "Medicare cost help",
    "low income Medicare"
  ],

  sources: [
    "https://www.health.ny.gov/health_care/medicaid/program/update/savingsprogram/",
    "https://www.medicare.gov/basics/costs/help/medicare-savings-programs",
    "https://www.law.cornell.edu/uscode/text/42/1396a"
  ],

  lastVerified: "2026-04-04",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
