export const TANF_PUBLIC_ASSISTANCE_NY = {
  id: "tanf-public-assistance-ny",
  category: "benefits",
  tier: "state",
  jurisdiction: "ny",
  status: "active",

  title: { en: "Temporary Assistance — Cash Benefits for Families and Individuals in Need" },

  summary: {
    en: "Temporary Assistance provides cash benefits to help pay for basic needs like housing, food, and utilities. In New York, there are two programs: Family Assistance for households with children and Safety Net Assistance for single adults and childless couples."
  },

  whoQualifies: {
    en: [
      "Families with a minor child living with a parent, guardian, or caretaker relative who have very low income and limited resources.",
      "Pregnant women in their last four months of pregnancy.",
      "Single adults and childless couples with very low income and limited resources may qualify for Safety Net Assistance.",
      "People who are unable to work, cannot find a job, or whose job does not pay enough to meet basic needs.",
      "Applicants must be New York State residents.",
      "Applicants must be U.S. citizens, U.S. nationals, or qualified non-citizens."
    ]
  },

  whatItMeans: {
    en: "New York has two Temporary Assistance programs. Family Assistance is for families with children and is funded by the federal Temporary Assistance for Needy Families block grant. Adults on Family Assistance have a 60-month lifetime limit on benefits. Safety Net Assistance is for single adults, childless couples, and families that have reached the 60-month limit. Safety Net Assistance is funded by state and local dollars and has no federal time limit. Cash benefits may convert to non-cash forms such as direct payments to a landlord or utility company. Benefit amounts depend on household size, income, and where you live. Able-bodied adults receiving either program are generally required to participate in work activities, job training, or education. When you apply for Temporary Assistance, you are also screened for SNAP and Medicaid at the same time. Families receiving Family Assistance are required to cooperate with child support enforcement unless good cause exists."
  },

  yourRights: {
    en: [
      "You have the right to apply for Temporary Assistance at any time at your local Department of Social Services.",
      "You have the right to receive a decision on your application within 30 days for Family Assistance or 45 days for Safety Net Assistance.",
      "You have the right to emergency assistance if you are facing an immediate crisis such as eviction, utility shutoff, or homelessness.",
      "You have the right to be screened for SNAP and Medicaid when you apply for Temporary Assistance.",
      "You have the right to a fair hearing if your application is denied, your benefits are reduced, or your case is closed.",
      "You have 60 days from the date of an adverse notice to request a fair hearing.",
      "You have the right to continue receiving benefits during a fair hearing if you request the hearing before the effective date of the change.",
      "You have the right to a hardship exemption from the 60-month Family Assistance time limit if you are unable to work due to a verified disability, including conditions related to domestic violence."
    ]
  },

  legalOptions: {
    en: [
      "Under NY Social Services Law and federal TANF guidelines (42 U.S.C. § 601), Temporary Assistance applications are accepted at every county Department of Social Services in New York State.",
      "Online applications are available through mybenefits.ny.gov.",
      "The statewide OTDA information line is available at 1-800-342-3009.",
      "Emergency assistance may be available for families facing eviction, utility shutoff, or homelessness. Emergency applications are accepted at the local DSS office.",
      "Fair hearings may be requested by calling 1-800-342-3334, online at otda.ny.gov, or by writing to the Fair Hearing Section at NYS OTDA, P.O. Box 1930, Albany, NY 12201.",
      "Applicants who believe they have good cause not to cooperate with child support enforcement — such as cases involving domestic violence — may request a good cause determination through their local DSS.",
      "Free legal help with Temporary Assistance applications, denials, and fair hearings is available through Legal Aid Society of Rochester at (585) 232-4090 and LawNY at (585) 325-2520.",
      "Empire Justice Center provides assistance with benefits advocacy and systemic issues at (585) 454-4060."
    ]
  },

  example: {
    en: "Tanya is a single mother with two young children in Monroe County. She was working part-time but her hours were cut and she could no longer afford rent. She applied for Temporary Assistance at the Monroe County DSS office. Because she has children, she was placed in the Family Assistance program. She was also approved for SNAP and Medicaid through the same application. Her monthly cash benefit helps cover rent and basic expenses while she participates in a job training program arranged through DSS."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Public benefits, Temporary Assistance, fair hearings, housing",
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
      focus: "Public benefits including public assistance, emergency assistance, SNAP",
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
      focus: "Benefits advocacy, systemic issues, policy reform",
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
    "snap-rights-ny",
    "medicaid-ny",
    "emergency-cash-assistance-ny",
    "childcare-assistance-ny",
    "benefits-denial-appeal-ny",
    "fair-hearing-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "cash assistance",
    "welfare",
    "public assistance",
    "TANF",
    "need money for rent",
    "can't pay bills",
    "no income",
    "need help with bills",
    "family assistance",
    "safety net",
    "emergency money",
    "single parent help"
  ],

  sources: [
    "https://otda.ny.gov/programs/temporary-assistance/",
    "https://otda.ny.gov/policy/tanf/",
    "https://www.law.cornell.edu/uscode/text/42/601"
  ],

  lastAudited: "2026-04-04",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
