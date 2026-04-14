export const SSI_DISABILITY_NY = {
  id: "ssi-disability-ny",
  category: "benefits",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "SSI — Cash Benefits for People With Disabilities or Low Income Seniors" },

  summary: {
    en: "Supplemental Security Income (SSI) provides monthly cash payments to people with very limited income and resources. It is for people who are aged 65 or older, blind, or disabled. SSI does not require any work history. New York adds a State Supplement to the federal SSI payment."
  },

  whoQualifies: {
    en: [
      "Adults aged 65 or older with limited income and resources.",
      "Adults of any age who are blind or have a disability that prevents substantial work and is expected to last at least 12 months or result in death.",
      "Children under age 18 with a physical or mental impairment that causes marked and severe functional limitations.",
      "Applicants must have limited income and countable resources below the federal resource limit.",
      "Applicants must be U.S. citizens, U.S. nationals, or meet certain qualified non-citizen requirements.",
      "SSI does not require any prior work history. It is based entirely on financial need and medical condition."
    ]
  },

  whatItMeans: {
    en: "SSI is a federal program run by the Social Security Administration. It provides a monthly cash payment to help cover basic needs like food, clothing, and shelter. The payment amount is called the Federal Benefit Rate and is adjusted each year for cost of living. New York adds a State Supplement to the federal payment through the SSP program, which is administered by OTDA. The total monthly amount depends on income, living situation, and household composition. The federal resource limit covers things like cash, bank accounts, and certain property. A primary home, one vehicle, and personal belongings are generally not counted. In New York, SSI recipients are automatically eligible for Medicaid. They are also automatically income-eligible for SNAP. Current payment amounts, resource limits, and income rules are published on the Social Security Administration website at ssa.gov."
  },

  yourRights: {
    en: [
      "You have the right to apply for SSI at any time by contacting the Social Security Administration.",
      "You have the right to receive a decision on your application, and if approved, benefits are payable from the month of application.",
      "You have the right to appeal if your application is denied. The appeal process includes reconsideration, a hearing before an Administrative Law Judge, review by the Appeals Council, and federal court review.",
      "You have the right to continue receiving benefits while your appeal is pending if you request the appeal on time.",
      "You have the right to have a representative help you with your application or appeal.",
      "You have the right to a Trial Work Period that lets you test your ability to work without immediately losing benefits.",
      "You have the right to automatic Medicaid coverage in New York when you receive SSI.",
      "You have the right to the New York State Supplement in addition to your federal SSI payment."
    ]
  },

  legalOptions: {
    en: [
      "Under 42 U.S.C. § 1381, SSI applications are accepted at any Social Security Administration office. There is no online SSI application — an appointment must be scheduled with a local SSA office.",
      "The Social Security Administration can be reached at 1-800-772-1213 (TTY 1-800-325-0778), Monday through Friday, 7 a.m. to 7 p.m.",
      "The New York State Supplement Program (SSP) is administered by OTDA. SSP information is available at 1-855-488-0541 or through the mySSP portal at otda.ny.gov/programs/ssp/.",
      "If an SSI application is denied, a request for reconsideration must be filed within 60 days of the denial notice. If reconsideration is denied, a hearing before an Administrative Law Judge may be requested.",
      "Free legal help with SSI applications and appeals is available through Empire Justice Center at (585) 454-4060, which handles disability and SSI/SSD benefits cases.",
      "Legal Aid Society of Rochester provides assistance with SSI and disability benefits at (585) 232-4090.",
      "Many disability attorneys and representatives handle SSI appeals on a contingency basis, meaning no fee is owed unless the case is won. Fees are set by federal law and are paid from back benefits.",
      "ABLE accounts allow people with disabilities whose condition began before age 46 to save money without affecting SSI eligibility. More information is available at ablenrc.org."
    ]
  },

  example: {
    en: "Marcus is 41 and lives in Wayne County. He has a spinal condition that prevents him from working. He has never held a job long enough to earn work credits for SSDI. He applied for SSI at his local Social Security office. After submitting medical records and attending an interview, he was approved. He now receives a monthly SSI payment plus the New York State Supplement. He was automatically enrolled in Medicaid and approved for SNAP without a separate application."
  },

  counsel: [
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Disability benefits, SSI, SSD, Medicaid, systemic advocacy",
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
      focus: "Public benefits, SSI applications and appeals, disability benefits",
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
      focus: "Public benefits, consumer issues, housing",
      qualifier: "Low income residents in 14 Western NY counties including Monroe",
      access: "Phone intake at (585) 325-2520",
      outcome: "Direct representation",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "ssdi-ny",
    "disability-medicaid-ny",
    "medicaid-ny",
    "snap-rights-ny",
    "benefits-denial-appeal-ny",
    "fair-hearing-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "disability benefits",
    "SSI",
    "can't work disabled",
    "disability check",
    "disability income",
    "disabled no income",
    "blind benefits",
    "senior income",
    "social security disability",
    "disability application",
    "disability denied",
    "child disability benefits"
  ],

  sources: [
    "https://www.ssa.gov/ssi",
    "https://www.ssa.gov/ssi/text-eligibility-ussi.htm",
    "https://www.ssa.gov/benefits/disability/qualify.html",
    "https://otda.ny.gov/programs/ssp/",
    "https://otda.ny.gov/programs/disability-determinations/",
    "https://www.law.cornell.edu/uscode/text/42/1381"
  ],

  lastVerified: "2026-04-04",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
