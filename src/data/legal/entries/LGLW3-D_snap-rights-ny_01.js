export const SNAP_RIGHTS_NY = {
  id: "snap-rights-ny",
  category: "benefits",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "SNAP (Food Stamps) — Your Rights in New York" },

  summary: {
    en: "SNAP provides monthly benefits on an EBT card to help pay for groceries. New York has some of the broadest eligibility rules in the country. Most households do not need to pass an asset test."
  },

  whoQualifies: {
    en: [
      "Individuals and families with income at or below 200% of the Federal Poverty Level (most households in NY).",
      "Households with a member who is 60 or older, or who has a disability, may qualify at higher income levels.",
      "People already receiving SSI or Temporary Assistance are often automatically eligible.",
      "College students enrolled at least half-time who meet work or program requirements.",
      "Most households in New York do not need to meet an asset or savings test."
    ]
  },

  whatItMeans: {
    en: "SNAP stands for the Supplemental Nutrition Assistance Program. It used to be called food stamps. Benefits are loaded each month onto an Electronic Benefit Transfer (EBT) card. The card works like a debit card at grocery stores, farmers markets, and some online retailers. Benefit amounts depend on household size, income, and allowable deductions like rent, utilities, childcare, and medical costs. New York uses broad-based categorical eligibility, which means the gross income limit is higher than in many other states. The standard federal gross income limit is 130% of the Federal Poverty Level. In New York, most households qualify at up to 200% of the Federal Poverty Level. Net income — what is left after deductions — must be at or below 100% of the Federal Poverty Level. Current income limits and benefit amounts are updated every October 1 and are published on the OTDA website."
  },

  yourRights: {
    en: [
      "You have the right to apply for SNAP on the same day you contact your local Department of Social Services.",
      "You have the right to receive a decision within 30 days of submitting your application.",
      "You have the right to expedited benefits within 7 days if you have very low income and few resources.",
      "You have the right to a fair hearing if your application is denied, your benefits are reduced, or your case is closed.",
      "You have 60 days after a denial or adverse action to request a fair hearing through OTDA.",
      "You have the right to apply online, by phone, by mail, by fax, or in person.",
      "You have the right to receive application materials and assistance in your preferred language.",
      "You have the right to use SNAP benefits to buy seeds and plants that produce food for your household.",
      "You have the right to designate an authorized representative to apply or shop on your behalf."
    ]
  },

  legalOptions: {
    en: [
      "Under NY Social Services Law § 95, SNAP applications are accepted at every county Department of Social Services office across New York State.",
      "Online applications are available 24 hours a day through the myBenefits portal at mybenefits.ny.gov.",
      "The statewide SNAP helpline is available at 1-800-342-3009.",
      "Under federal law (7 U.S.C. § 2020), applicants who have less than $150 in monthly gross income and less than $100 in liquid resources may qualify for expedited processing within 7 days.",
      "Households where shelter costs exceed total income may also qualify for expedited processing.",
      "Fair hearings may be requested online at mybenefits.ny.gov, by phone, by mail, or by fax through the local DSS office.",
      "Free legal help with SNAP applications and denials is available through Legal Aid Society of Rochester at (585) 232-4090 and LawNY at (585) 325-2520.",
      "The Empire Justice Center provides assistance with SNAP appeals and benefits issues at (585) 454-4060.",
      "As of March 1, 2026, adults aged 18 to 64 without dependents under age 14 (known as ABAWDs) are required to document 80 hours per month of work, training, or volunteering to maintain SNAP benefits beyond 3 months in a 36-month period. Exemptions exist for individuals with disabilities, pregnant individuals, veterans, and others. Details are available at otda.ny.gov/programs/snap/work-requirements.asp."
    ]
  },

  example: {
    en: "Maria is a single mother of two in Ontario County. She works part-time and earns $2,100 a month. After deductions for rent, utilities, and childcare, her net income falls below the limit. She applied for SNAP online at mybenefits.ny.gov. Her local DSS office called her for a phone interview within two weeks. She was approved and now receives monthly benefits on her EBT card. She uses the card at her local grocery store and at a farmers market in the summer."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Public benefits, SNAP applications and denials, fair hearings",
      qualifier: "Low income residents of Monroe and surrounding counties",
      access: "Phone intake, walk-in, or referral",
      outcome: "Direct representation and advice on benefits cases",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Public benefits including SNAP, Medicaid, public assistance, and emergency assistance",
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
      focus: "SNAP appeals, Medicaid, SSI/SSD benefits, systemic advocacy",
      qualifier: "Low and moderate income residents statewide (all NYS counties except NYC)",
      access: "Phone intake at (585) 454-4060",
      outcome: "Direct representation, impact litigation, and policy advocacy",
      phone: "(585) 454-4060",
      url: "https://www.empirejustice.org",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "snap-expedited-ny",
    "benefits-denial-appeal-ny",
    "fair-hearing-ny",
    "tanf-public-assistance-ny",
    "wic-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "food stamps",
    "food help",
    "grocery money",
    "EBT card",
    "can't afford food",
    "hungry",
    "feeding my family",
    "SNAP benefits",
    "food assistance",
    "need food",
    "low income food",
    "food stamps denied"
  ],

  sources: [
    "https://otda.ny.gov/programs/snap/",
    "https://www.ny.gov/services/apply-snap",
    "https://www.fns.usda.gov/snap/recipient/eligibility",
    "https://www.nysenate.gov/legislation/laws/SOS/95",
    "https://otda.ny.gov/programs/snap/work-requirements.asp",
    "https://www.law.cornell.edu/uscode/text/7/2011"
  ],

  lastAudited: "2026-04-04",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
