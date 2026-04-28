export const DISABILITY_MEDICAID_NY = {
  id: "disability-medicaid-ny",
  category: "benefits",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY SOS 366",
  status: "active",

  title: { en: "NY Non-MAGI (Disability) Medicaid — Health Coverage for Aged, Blind, and Disabled New Yorkers" },

  summary: {
    en: "NY Non-MAGI Medicaid — also called disability or ABD (Aged, Blind, Disabled) Medicaid — is governed by Social Services Law § 366 and the federal Medicaid statute at 42 USC 1396a. It applies to adults 65 or older, people who are blind or disabled under Social Security's definition, and related categories. Eligibility considers both income and resources (unlike the MAGI pathway for most adults under 65). NY provides a Medicaid Buy-In for Working People with Disabilities, a spend-down program, and pooled trusts for households over the income limit. Most Monroe County applications go through the local DSS."
  },

  whoQualifies: {
    en: [
      "A NY adult 65 or older under SOS § 366(1)(a) Non-MAGI rules.",
      "A NY adult or child found blind or disabled under the Social Security Act disability definition — either already receiving SSI or SSDI, or approved by the NY Disability Review Unit through a Medicaid determination.",
      "A NY working disabled adult under 65 — eligible for the Medicaid Buy-In for Working People with Disabilities (MBI-WPD) at higher income limits than regular disability Medicaid.",
      "A nursing-home resident or community-based long-term-care recipient seeking Chronic Care Medicaid under SOS § 366 with transfer-of-asset lookback rules.",
      "A household over the Non-MAGI income limit who qualifies through spend-down (medical bills offset excess income) or a pooled supplemental-needs trust."
    ]
  },

  whatItMeans: {
    en: "Medicaid in New York operates on two parallel eligibility tracks. The MAGI pathway covers most adults under 65, children, and pregnant people and is based on Modified Adjusted Gross Income without a resource test — that is covered in a separate entry. The Non-MAGI pathway, authorized by SOS § 366 and aligned with the federal Medicaid statute at 42 USC 1396a, covers the aged, blind, and disabled. SOS § 366 defines eligibility, and SOS § 366-A governs applications and determinations. The Non-MAGI rules apply two tests: a countable-income test and a countable-resources test. NY applies extensive exclusions. The principal home is protected for community Medicaid; one car is excluded; personal and household belongings are excluded; retirement accounts in payout status are excluded; life insurance up to limited face value is excluded. A special earned-income disregard excludes the first $65 of monthly earned income plus one-half of the remainder, following the federal SSI earned-income disregard rules. The disability determination can come from Social Security (if the applicant is already receiving SSI or SSDI) or from the state Disability Review Unit, which applies the same federal disability standard. For those whose income exceeds the Non-MAGI income limit, three pathways remain. First — spend-down, in which the applicant reports medical bills that offset excess income on a monthly or six-month basis. Once the bills reach the excess-income amount, Medicaid covers the remaining expenses for that period. Second — Medicaid Buy-In for Working People with Disabilities (MBI-WPD), which raises the income ceiling significantly for people with disabilities who are working and pays a sliding-scale premium. MBI-WPD preserves Medicaid while the person earns a paycheck that would otherwise disqualify them. Third — a pooled supplemental-needs trust, administered by specific NY nonprofits, which holds excess income in trust and permits Medicaid eligibility for the remaining income. Trust fees apply and trust remainder rules govern what happens at the beneficiary's death. Community Medicaid covers most outpatient, physician, hospital, prescription drug, durable medical equipment, and long-term-care-at-home services. Chronic Care Medicaid covers nursing-home and institutional care but involves a five-year lookback on asset transfers and stricter resource rules; spousal impoverishment protections apply to the community spouse. Applications for Non-MAGI Medicaid in Monroe County go to the Monroe County Department of Human Services on DOH Form 4220 with Supplement A (DOH-5178A) for resource documentation. Retroactive coverage is available under SOS § 366-A for up to three months before the application date if the applicant was eligible and received covered services during that window. Decision timeframes run up to 45 days for routine cases and up to 90 days when a disability determination is required. A denial, reduction, or closure may be appealed under SOS § 22 within 60 days. Legal Aid, LawNY, and Empire Justice Center represent low-income applicants in Non-MAGI determinations, MBI-WPD applications, spend-down calculations, and Fair Hearings on disability Medicaid issues."
  },

  yourRights: {
    en: [
      "A NY applicant who is aged, blind, or disabled has the right under SOS § 366 to apply for Non-MAGI Medicaid at the local social services district.",
      "A NY applicant without a Social Security disability determination has the right to a state Disability Review Unit determination on the Medicaid application.",
      "A NY disabled applicant has the right under federal SSI earned-income disregard rules to have the first $65 of monthly earned income plus one-half of the remainder excluded from countable income.",
      "A NY working disabled adult under 65 has the right to apply for the Medicaid Buy-In for Working People with Disabilities with higher income limits than regular disability Medicaid.",
      "A NY applicant over the income limit has the right to use spend-down, a pooled supplemental-needs trust, or both to achieve eligibility.",
      "A NY Non-MAGI applicant has the right under SOS § 366-A to up to three months of retroactive coverage for eligible expenses before the application date.",
      "A NY applicant has the right under SOS § 22 to appeal a denial, reduction, or closure through a fair hearing within 60 days."
    ]
  },

  legalOptions: {
    en: [
      "Monroe County Department of Human Services Medicaid application line at (585) 753-6960 or 111 Westfall Road, Rochester — accepts Non-MAGI Medicaid applications on DOH-4220 with Supplement A. Medicaid benefit questions line at (585) 753-2760 for current recipients.",
      "NY Medicaid Helpline at (800) 541-2831 — statewide information, eligibility questions, application assistance.",
      "NY Medicaid Buy-In for Working People with Disabilities page at health.ny.gov/health_care/medicaid/program/buy_in — MBI-WPD details and premium scale.",
      "Facilitated Enrollers for the Aged, Blind, and Disabled — NY-funded application-assistance workers; directory at health.ny.gov.",
      "Legal Aid Society of Rochester at (585) 232-4090 — represents Monroe County Non-MAGI applicants at fair hearings.",
      "LawNY at (585) 325-2520 — disability Medicaid cases across 14-county Western NY service area.",
      "Empire Justice Center at (585) 454-4060 — complex disability Medicaid and MBI-WPD cases, impact advocacy."
    ]
  },

  example: {
    en: "Andre is 52 and has a chronic nerve condition. He works 20 hours a week earning $900 per month and receives a small SSDI payment. He applied for Non-MAGI Medicaid at Monroe County DHS. Under the federal earned-income disregard applied through SOS § 366, the first $65 of his monthly earnings plus one-half of the remainder — roughly $482.50 — were excluded from countable income. With that disregard his countable income fell below the Non-MAGI limit. His resources — a modest savings account, household belongings, and one car — fit within the Non-MAGI resource exclusions. The case was approved. If his income later rises, the Medicaid Buy-In for Working People with Disabilities would preserve his coverage as long as he keeps working."
  },

  counsel: [
    {
      type: "nonprofit",
      name: "Empire Justice Center",
      focus: "Disability Medicaid, MBI-WPD, spend-down, pooled trusts, fair hearings",
      qualifier: "Low and moderate income NY residents across NYS",
      access: "Phone intake",
      outcome: "Free representation and policy advocacy",
      phone: "(585) 454-4060",
      url: "https://empirejustice.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "nonprofit",
      name: "LawNY — Legal Assistance of Western New York",
      focus: "Medicaid, Medicare, elder law, disability benefits",
      qualifier: "Low-income resident in 14 Western NY counties including Monroe",
      access: "Phone intake",
      outcome: "Free representation",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "nonprofit",
      name: "Legal Aid Society of Rochester",
      focus: "Non-MAGI Medicaid, fair hearings, disability determinations",
      qualifier: "Low-income Monroe County resident",
      access: "Phone intake",
      outcome: "Free representation",
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
    "ssi-disability-ny",
    "ssdi-ny",
    "medicare-savings-program-ny",
    "benefits-denial-appeal-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "NY disability Medicaid",
    "Non-MAGI Medicaid",
    "SOS 366",
    "Medicaid Buy-In Working Disabled",
    "MBI-WPD",
    "spend-down Medicaid",
    "pooled supplemental-needs trust",
    "earned-income disregard SSI",
    "Chronic Care Medicaid",
    "Monroe County DHS Medicaid"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/SOS/366",
    "https://www.law.cornell.edu/uscode/text/42/1396a",
    "https://www.health.ny.gov/health_care/medicaid/how_do_i_apply.htm",
    "https://www.health.ny.gov/health_care/medicaid/program/buy_in/"
  ],

  lastVerified: "2026-04-28",
  factCheckedBy: { tool: "websearch", date: "2026-04-28" },
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
