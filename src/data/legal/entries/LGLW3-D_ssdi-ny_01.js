export const SSDI_NY = {
  id: "ssdi-ny",
  category: "benefits",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "SSDI — Disability Benefits Based on Your Work History" },

  summary: {
    en: "Social Security Disability Insurance (SSDI) provides monthly payments to people who can no longer work because of a disability. Unlike SSI, SSDI is based on your work history and the Social Security taxes you paid while working. There is no income or asset limit to qualify."
  },

  whoQualifies: {
    en: [
      "Adults aged 18 to 64 who have a disability that prevents them from performing substantial gainful activity.",
      "The disability must be expected to last at least 12 months or result in death.",
      "Applicants must have earned enough Social Security work credits through prior employment. The number of credits required depends on age at the time of disability.",
      "Workers who became disabled at a younger age may qualify with fewer credits.",
      "Certain family members — including a spouse, former spouse, or children — may also receive benefits based on a disabled worker's record.",
      "There is no income or asset test. SSDI is based entirely on work history and medical condition."
    ]
  },

  whatItMeans: {
    en: "SSDI is a federal insurance program run by the Social Security Administration. It pays monthly benefits to workers who become disabled and can no longer earn a living. The amount you receive depends on your average earnings over the years you worked and paid Social Security taxes. There is no flat payment amount — everyone's benefit is different. You can check your estimated benefit by creating an account at ssa.gov. After you are approved, there is a five-month waiting period before payments begin. After 24 months of receiving SSDI, you become eligible for Medicare. SSDI is different from SSI. SSI is for people with little or no work history and is based on financial need. It is possible to receive both SSDI and SSI at the same time if your SSDI payment is low. Current benefit estimates, work credit requirements, and earnings thresholds are published on the Social Security Administration website."
  },

  yourRights: {
    en: [
      "You have the right to apply for SSDI at any time by contacting the Social Security Administration.",
      "You have the right to apply online at ssa.gov, by phone, or in person at a local Social Security office.",
      "You have the right to receive a decision on your application. Most initial decisions are made within three to six months.",
      "You have the right to appeal if your application is denied. The appeal process includes reconsideration, a hearing before an Administrative Law Judge, review by the Appeals Council, and federal court review.",
      "You have 60 days from the date of a denial to file an appeal at each stage.",
      "You have the right to have an attorney or representative help you with your claim at any stage.",
      "You have the right to a Trial Work Period that allows you to test your ability to work for up to nine months without losing benefits.",
      "You have the right to Medicare coverage after 24 months of receiving SSDI benefits."
    ]
  },

  legalOptions: {
    en: [
      "Under 42 U.S.C. § 423, SSDI applications may be submitted online at ssa.gov/disability, by phone at 1-800-772-1213 (TTY 1-800-325-0778), or in person at any Social Security office.",
      "Estimated benefit amounts can be viewed by creating a my Social Security account at ssa.gov. The account also shows work credit history.",
      "In New York, disability determinations are made by the Disability Determinations Division within OTDA on behalf of the Social Security Administration.",
      "If an application is denied, a request for reconsideration must be filed within 60 days. If reconsideration is denied, a hearing before an Administrative Law Judge may be requested within 60 days.",
      "Many disability attorneys and representatives handle SSDI appeals on a contingency basis. Under federal law, fees are capped and are paid only from back benefits if the case is won.",
      "Free legal help with SSDI applications and appeals is available through Empire Justice Center at (585) 454-4060.",
      "Legal Aid Society of Rochester provides assistance with disability benefits at (585) 232-4090.",
      "People who receive SSDI may also qualify for SSI, SNAP, Medicaid, or other programs depending on their income and household situation."
    ]
  },

  example: {
    en: "Angela worked as a home health aide in Monroe County for 15 years before a back injury made it impossible for her to continue working. She applied for SSDI online at ssa.gov. Her initial application was denied. She appealed and requested a hearing before an Administrative Law Judge. With help from a disability attorney, she gathered additional medical records and testimony. The judge approved her claim. After the five-month waiting period, she began receiving monthly SSDI payments based on her earnings history. Two years later, she became eligible for Medicare."
  },

  counsel: [
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Disability benefits, SSDI, SSI, appeals, systemic advocacy",
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
      focus: "Public benefits, disability applications and appeals, fair hearings",
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
    "ssi-disability-ny",
    "disability-medicaid-ny",
    "medicaid-ny",
    "benefits-denial-appeal-ny",
    "fair-hearing-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "disability benefits",
    "SSDI",
    "social security disability",
    "can't work anymore",
    "disability insurance",
    "disability denied",
    "disability appeal",
    "work injury",
    "disability check",
    "disabled worker",
    "back injury disability",
    "disability application"
  ],

  sources: [
    "https://www.ssa.gov/benefits/disability/",
    "https://www.ssa.gov/benefits/disability/qualify.html",
    "https://otda.ny.gov/programs/disability-determinations/",
    "https://www.law.cornell.edu/uscode/text/42/423"
  ],

  lastAudited: "2026-04-04",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
