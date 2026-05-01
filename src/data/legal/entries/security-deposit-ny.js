export const SECURITY_DEPOSIT_NY = {
  id: "security-deposit-ny",
  category: "housing",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY GOB 7-108",
  status: "active",

  // ─── Anchor fields (see src/data/legal/ANCHORS.md) ───
  // 4th anchor candidate. 5 entries cite NY GOB 7-108 internally. Anchor
  // priority chosen on the basis of GSC evidence (project_gsc_review_2026_05_01.md):
  // someone literally searched "new york general obligations law 7-108
  // security deposit 14 days itemized statement official" — exact-statute
  // search with the specific provision they wanted. Page is also trending
  // UP in impressions per Overview recommendations. Voice already pre-
  // rewritten to plain-English non-directive standard. R1/R2/R3 expert
  // review pending; reviewTier intentionally not set until convergence.
  isAnchor: true,
  anchorSource: {
    url: "https://www.nysenate.gov/legislation/laws/GOB/7-108",
    hash: "",
    lastFetched: ""
  },
  lastFormallyReviewed: "2026-05-01",
  formallyReviewedBy: "Anthony DiMarzo + WebSearch corroboration. PROVISIONAL — pending dedicated Opus 4.7 R1/R2/R3 review for this anchor. JustCause URL pre-corrected to justcauseny.org per R4 finding from tenant-habitability anchor; Tenant Defense Project not yet added (different scope — security deposit cases are typically not eviction-track). Pending attorney sign-off.",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "NY Security Deposit — One-Month Cap, 14-Day Return Deadline, and Landlord Forfeiture" },

  summary: {
    en: "NY caps a residential security deposit at one month's rent for most rentals. The full law is General Obligations Law section 7-108. Within 14 days after the renter moves out, the landlord has to return the remaining deposit AND an itemized statement of any deductions. The only allowed deductions are unpaid rent, damage beyond normal wear and tear, unpaid utilities the renter owed to the landlord, and moving or storage of things the renter left behind. A landlord who misses the 14-day deadline forfeits the right to keep any part of the deposit, even for actual damage. Willful violations carry up to two times the deposit in punitive damages, on top of the deposit itself."
  },

  whoQualifies: {
    en: [
      "A NY residential tenant who paid a security deposit — written lease, oral lease, or month-to-month arrangement.",
      "A tenant of an apartment, house, or room in NY outside specific exempted categories (continuing-care retirement communities, licensed assisted-living, adult-care facilities, certain senior residential communities).",
      "A tenant whose rental is a seasonal-use unit or an owner-occupied cooperative apartment — the one-month cap has separate rules for these categories, but most other tenant protections still apply.",
      "A tenant in a rent-stabilized or rent-controlled unit — covered by a parallel statute (General Obligations Law § 7-107) with similar protections.",
      "Any NY tenant whose security deposit was not returned, was partially kept without an itemized statement, or was kept past the 14-day deadline."
    ]
  },

  whatItMeans: {
    en: "NY caps a residential security deposit at one month's rent. The full law is General Obligations Law section 7-108. A few rentals are exempt from the one-month cap: seasonal-use units, owner-occupied cooperative apartments, continuing-care retirement communities, licensed assisted-living, adult-care facilities, and certain senior residential communities. Outside those categories, this is the rule for the deposit a renter pays at the start of a lease.\n\nWhat the landlord can and cannot deduct. When the renter moves out, the landlord can keep some of the deposit only for: unpaid rent; damage caused by the renter beyond normal wear and tear; unpaid utilities the renter owed to the landlord under the lease; and moving or storage of things the renter left behind. The law explicitly forbids deductions for ordinary wear and tear (faded paint, worn carpet from regular use) or for damage caused by a previous tenant.\n\nPre-occupancy inspection. Before the renter moves in, the landlord has to offer to walk through the unit together. If the renter accepts, both sides sign a written list of any existing damage. Anything on that list cannot be deducted from the security deposit later. The list is allowed as evidence in court of the unit's condition at move-in.\n\nPre-move-out inspection. Before the lease ends, the landlord has to offer the renter a walk-through. After the inspection, the landlord gives an itemized list of what the landlord plans to deduct. The renter then has the chance to fix anything fixable before moving out — saving the renter that deduction.\n\n14-day deadline. Within 14 days after the renter moves out, the landlord has to return the remaining deposit AND give the renter an itemized statement of any deductions. If the landlord misses the 14-day deadline — even by one day — the landlord forfeits the right to keep ANY part of the deposit, regardless of actual damage or unpaid rent. This is the strongest tool a renter has under this law.\n\nPunitive damages. A renter who proves the landlord willfully violated this law (kept the deposit on purpose, knowing the rule) can recover punitive damages of up to twice the deposit amount, on top of the deposit itself. So if the deposit was $1,200, the maximum recovery is $1,200 (deposit) + $2,400 (punitive) = $3,600.\n\nInterest on the deposit. A separate law (General Obligations Law section 7-103) requires that a deposit held in a building with six or more apartments be kept in an interest-bearing bank account. The renter gets the interest, minus an administrative fee the landlord can keep (usually 1% per year). In buildings with fewer than six apartments, no interest is required.\n\nWhen the building is sold. If the rental building is sold while the renter is still there, the original landlord has to transfer all security deposits to the new owner within five days and notify the renters by certified mail.\n\nHow to enforce. Small claims court is the usual path. Rochester City Court small claims handles claims up to $5,000. Town and village justice courts handle up to $3,000. Filing fees are modest, and a renter does not need a lawyer. Bringing the lease, photos of the unit at move-in and move-out, the move-out date documentation, and any pre-occupancy or pre-move-out inspection agreement helps the case. The NY Attorney General's office accepts security-deposit complaints and can bring its own enforcement action under General Obligations Law section 7-109. In Monroe County, free legal help is available from Legal Aid Society of Rochester (585-232-4090), LawNY (585-325-2520), JustCause (585-232-3051), and Empire Justice Center (585-454-4060)."
  },

  yourRights: {
    en: [
      "A NY tenant has the right under General Obligations Law § 7-108(1-a)(a) to a security deposit of no more than one month's rent for most residential rentals.",
      "A NY tenant has the right under General Obligations Law § 7-108(1-a)(b) to deposit protection against deductions for ordinary wear and tear or prior-tenant damage.",
      "A NY tenant has the right under General Obligations Law § 7-108(1-a)(c) to a pre-occupancy inspection with the landlord and a written record of existing damage that cannot later be deducted.",
      "A NY tenant has the right under General Obligations Law § 7-108(1-a)(d) to a pre-move-out inspection and an itemized list of proposed deductions with an opportunity to cure.",
      "A NY tenant has the right under General Obligations Law § 7-108(1-a)(e) to the remaining deposit and an itemized statement within 14 days of move-out; if not, the landlord forfeits any right to retain any portion.",
      "A NY tenant has the right to punitive damages of up to twice the deposit amount for a willful General Obligations Law § 7-108 violation.",
      "A NY tenant in a building with six or more apartments has the right under General Obligations Law § 7-103 to interest on the deposit.",
      "A NY tenant has the right to sue in small claims court to recover the deposit without hiring a lawyer."
    ]
  },

  legalOptions: {
    en: [
      "Rochester City Court Small Claims Part at (585) 371-3412 — claims up to $5,000 for Rochester residents and for disputes involving Rochester properties.",
      "Monroe County town and village justice courts — claims up to $3,000 for disputes in unincorporated areas.",
      "NY Attorney General Tenant Assistance at ag.ny.gov/resources/individuals/tenants-homeowners — guidance on security-deposit rights and complaint intake.",
      "NY Attorney General Consumer Frauds Bureau at (800) 771-7755 — complaints against landlords with repeated General Obligations Law § 7-108 violations.",
      "Under General Obligations Law § 7-109, the Attorney General may bring a proceeding or action to compel compliance with security-deposit requirements.",
      "Legal Aid Society of Rochester at (585) 232-4090 — low-income Monroe County tenants in small-claims filings and complex deposit disputes.",
      "LawNY at (585) 325-2520 — housing representation across 14-county Western NY service area.",
      "JustCause at (585) 232-3051 — volunteer-attorney small-claims preparation for Monroe County tenants.",
      "Building-sale protection — when a rental building is sold, the former landlord must transfer all security deposits to the new owner within five days and notify tenants by certified mail."
    ]
  },

  example: {
    en: "Aaliyah rented a Livingston County apartment for two years. When her lease ended, she left the apartment clean and in good condition. The landlord did not return her $900 deposit and sent no statement. Fifteen days after move-out, she reviewed General Obligations Law § 7-108(1-a)(e) and confirmed the landlord had forfeited the right to retain any portion of the deposit by missing the 14-day deadline. She mailed a certified-letter demand for the full deposit. When the landlord did not respond, Aaliyah filed a small-claims action in the local justice court citing the forfeiture rule. The judge entered judgment for the full $900 plus filing costs. If Aaliyah could show the landlord willfully kept her deposit, the court could have added punitive damages up to $1,800 under General Obligations Law § 7-108."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Housing disputes, security deposit recovery, eviction defense",
      qualifier: "Low income residents of Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090",
      outcome: "Direct representation and advice on housing cases",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Housing, security deposits, fair housing, public benefits",
      qualifier: "Low income residents in 14 Western NY counties including Monroe",
      access: "Phone intake at (585) 325-2520",
      outcome: "Direct representation in housing matters",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "JustCause",
      focus: "Landlord-tenant disputes, small claims guidance, civil legal matters",
      qualifier: "Low income residents of Monroe County",
      access: "Referral through Monroe County Bar Association",
      outcome: "Pro bono volunteer attorney representation",
      phone: "585-232-3051",
      url: "https://www.justcauseny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Housing rights, systemic advocacy, fair housing",
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
    "tenant-habitability-ny",
    "eviction-process-ny",
    "illegal-eviction-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "security deposit",
    "deposit not returned",
    "landlord keeping my money",
    "move out money",
    "damage deposit",
    "getting my deposit back",
    "landlord deductions",
    "wear and tear",
    "small claims court",
    "landlord won't pay me back",
    "deposit refund",
    "moving out"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/GOB/7-108",
    "https://www.nysenate.gov/legislation/laws/GOB/7-103",
    "https://ag.ny.gov/resources/individuals/tenants-homeowners/tenants/recovering-rent-security-deposits-and-interest"
  ],

  lastVerified: "2026-04-21",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
