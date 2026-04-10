export const EMERGENCY_CASH_ASSISTANCE_NY = {
  id: "emergency-cash-assistance-ny",
  category: "benefits",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "Emergency Cash Assistance — One-Time Help for Rent, Utilities, and Crises" },

  summary: {
    en: "If you are facing eviction, utility shutoff, or homelessness, you may qualify for a one-time emergency assistance grant. You do not need to be receiving ongoing public assistance to apply."
  },

  whoQualifies: {
    en: [
      "Families with at least one child under 18 (or under 19 and in secondary school) or pregnant persons facing an emergency may qualify for Emergency Assistance to Families (EAF). Income must be at or below 200% of the Federal Poverty Level.",
      "Single adults and childless couples facing an emergency may qualify for Emergency Safety Net Assistance (ESNA). Income must be at or below 125% of the Federal Poverty Level.",
      "People receiving SSI or SSP who face an emergency that endangers their health or safety may qualify for Emergency Assistance to Adults (EAA).",
      "You do not need to be receiving ongoing Temporary Assistance to receive emergency assistance.",
      "The emergency must be the result of a sudden occurrence or situation that was unforeseen and beyond your control.",
      "Applicants must meet citizenship or qualified non-citizen requirements and be New York State residents."
    ]
  },

  whatItMeans: {
    en: "Emergency assistance is a one-time grant to help you through a crisis. It is not ongoing monthly benefits. Emergencies covered include rent arrears that could lead to eviction, utility or heating shutoffs, and homelessness. Other situations that threaten your health or safety may also qualify. The amount of the grant depends on the type of emergency and is determined on a case-by-case basis. Payments are often made directly to the landlord, utility company, or other vendor rather than to the applicant. For families with children, EAF is funded through the federal TANF block grant and is generally a grant that does not need to be repaid. For single adults and childless couples, ESNA assistance for rent or utility arrears may be an interest-free loan. Repayment is typically required within 12 months for rent and 24 months for utilities. A repayment agreement is signed at the time of approval. When you apply, the local DSS office is required to interview you and decide on your emergency the same day."
  },

  yourRights: {
    en: [
      "You have the right to apply for emergency assistance at your local Department of Social Services even if you are not receiving ongoing Temporary Assistance.",
      "You have the right to be interviewed and receive a decision about your emergency on the same day you apply.",
      "You have the right to emergency assistance to prevent eviction, utility shutoff, or homelessness.",
      "You have the right to a fair hearing if your emergency assistance application is denied.",
      "You have 60 days from the date of a denial to request a fair hearing.",
      "You have the right to continue receiving any ongoing benefits while a fair hearing is pending."
    ]
  },

  legalOptions: {
    en: [
      "Under NY Social Services Law and federal TANF guidelines, emergency assistance applications are accepted at every county Department of Social Services in New York State.",
      "Emergency applications are accepted in person at the local DSS office. Emergency applications cannot be fully processed online.",
      "The statewide OTDA information line is available at 1-800-342-3009.",
      "For EAF, household income must be at or below 200% of the Federal Poverty Level based on income available on the date of application. There is no resource test, though available resources are considered.",
      "For ESNA, household income must be at or below 125% of the Federal Poverty Level. The 125% limit does not apply in fuel or utility emergencies or catastrophes.",
      "ESNA grants for rent or utility arrears may require repayment through an interest-free loan agreement. EAF grants are generally not required to be repaid.",
      "Fair hearings may be requested by calling 1-800-342-3334, online at otda.ny.gov, or by writing to the Fair Hearing Section at NYS OTDA, P.O. Box 1930, Albany, NY 12201.",
      "Free legal help with emergency assistance applications and denials is available through Legal Aid Society of Rochester at (585) 232-4090 and LawNY at (585) 325-2520."
    ]
  },

  example: {
    en: "Carla is a single mother of one child in Monroe County. She fell behind on rent after missing two weeks of work due to an illness. Her landlord served a notice to pay or vacate. She went to the Monroe County DSS office and applied for emergency assistance. Because she has a child, she was evaluated under EAF. Her income was below 200% of the Federal Poverty Level. The DSS office contacted her landlord and made a direct payment to cover the rent arrears. Carla was able to stay in her apartment, and the payment did not need to be repaid."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Public benefits, emergency assistance, eviction prevention, fair hearings",
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
      focus: "Housing, eviction defense, public benefits, emergency assistance",
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
      focus: "Benefits advocacy, housing, systemic issues",
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
    "tanf-public-assistance-ny",
    "heap-utility-assistance-ny",
    "eviction-process-ny",
    "snap-expedited-ny",
    "benefits-denial-appeal-ny",
    "fair-hearing-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "emergency money",
    "rent help",
    "about to be evicted",
    "utility shutoff",
    "behind on rent",
    "facing eviction",
    "homeless help",
    "one shot deal",
    "emergency grant",
    "emergency assistance",
    "can't pay rent",
    "heat shutoff",
    "emergency housing"
  ],

  sources: [
    "https://otda.ny.gov/programs/temporary-assistance/",
    "https://www.law.cornell.edu/uscode/text/42/604"
  ],

  lastAudited: "2026-04-04",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: true,
  disclaimer: true,
  categoryDisclaimer: null
};
