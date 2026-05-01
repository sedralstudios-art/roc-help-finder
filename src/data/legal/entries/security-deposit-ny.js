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
  formallyReviewedBy: "Anthony DiMarzo + WebSearch corroboration + R1 expert review (5 issues, 2026-05-01). R1 ERROR (highest): exemption scope — entry was conflating two different scopes. Continuing-care retirement, assisted-living, adult-care, senior residential (with AG offering plan), and not-for-profit independent retirement (with personal emergency response, housekeeping, transportation, meals) are FULLY exempt from §7-108 (no cap, no 14-day rule, no forfeiture, no punitive). Seasonal-use and owner-occupied co-op are exempt ONLY from the one-month cap (14-day rule still applies). Restructured. R1 added missing 6th category (not-for-profit independent retirement). R1 OTHER: Empire Justice Center REMOVED from counsel — they do impact litigation, not individual security-deposit cases (their site explicitly redirects tenants to Tenant Defense Project / income-eligible orgs). LawNY Geneva office (315-781-1465) added — serves Livingston/Ontario/Seneca/Wayne/Yates; example county changed from Livingston to Brighton/Monroe to match listed Rochester office. JustCause access corrected from MCBA referral to direct phone/online intake. Building-sale rule cited to §7-105 (separate from §7-108) and 'certified mail' corrected to 'registered or certified mail.' R2/R3 pending; provisional, pending attorney sign-off. Voice check 2026-05-01: summary plainified ('limits' over 'caps,' 'loses' over 'forfeits,' 'kept on purpose, knowing the rule' over 'willful violations,' 'extra penalty' over 'punitive damages'). yourRights and legalOptions stripped of the §7-108(1-a)(X) citation parade — plain rights statements; statute terms (punitive damages, wear and tear, security deposit, small claims) left intact since the glossary defines them. R2 audit 2026-05-01 (FindLaw/Justia/NY AG/NYS OCA primary-source verification): 6 issues applied. (1) Forfeiture rule: added Unit 509 LLC v. Toporek, 203 A.D.3d 17 (2022) narrowing — forfeiture attaches to failure-to-itemize when landlord retains, not other procedural failures. (2) Pre-move-out walk-through: added 'provided the renter gave at least two weeks' notice' qualifier per §7-108(1-a)(d). (3) Exemption list: added NYC rent-controlled bucket (governed by §7-107) — was off-by-one, statute lists 6 buckets. (4) Interest rule: added voluntary-account corollary (small-building landlord who voluntarily uses interest-bearing account still owes interest less 1% fee) per NY AG guide. (5) Example venue: moved Aaliyah from Brighton to City of Rochester to make Rochester City Court venue clean (pure-Brighton landlord with no Rochester nexus would belong in Brighton Town Court). (6) LASROC: bilingual changed from true/['es'] to false/[] — LASROC offers ASL+Spanish interpreters on request per their contact page, not Spanish-bilingual staff. R3 audit 2026-05-01 (FindLaw/Justia/NY-Senate/NY-AG/NYC-RGB/DHCR Fact Sheet #9 verification of statutory law only — contacts not re-verified): 5 issues applied. CRITICAL CORRECTION to R2: §7-107 covers RENT-STABILIZED, not rent-controlled — R2 had this backwards. Rent-stabilized is governed by §7-107; rent-controlled is governed by city rent and rehabilitation law / emergency housing rent control law (DHCR-administered), not §7-107. whoQualifies and whatItMeans rewritten to separate the two regimes. SIGNIFICANT: §7-107 was amended by S952B effective 2025-11-15 to mirror §7-108(1-a) protections (one-month cap, 14-day return, walk-throughs, forfeiture, punitive damages now apply to rent-stabilized too). Added to whatItMeans as the most material NY security-deposit change since HSTPA 2019. PRECISION: 'fully exempt from §7-108' tightened to 'fully exempt from §7-108(1-a)' (subdivisions 2-6 still apply technically; tenant-practical impact is small). PRECISION: pre-move-out walk-through qualifier rewritten — statute requires offer 'after either party's intention to terminate,' carve-out is ONLY when tenant terminates with <2 weeks notice. Old framing wrongly suggested any tenant whose lease ran to its scheduled end had to give 2 weeks notice to be entitled to walk-through. CITATION: case caption corrected from 'Unit 509 LLC v. Toporek' to '14 E. 4th St. Unit 509 LLC v. Toporek, 203 A.D.3d 17 (1st Dep't 2022).'",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "NY Security Deposit — One-Month Cap, 14-Day Return Deadline, and Landlord Forfeiture" },

  summary: {
    en: "NY limits the security deposit a landlord can ask for to one month's rent for most rentals. The full law is General Obligations Law section 7-108. After the renter moves out, the landlord has 14 days to return the remaining deposit AND a written list of anything taken out and why. The only things a landlord can take out are unpaid rent, damage caused by the renter beyond normal wear and tear, unpaid utilities the renter owed the landlord, and the cost of moving or storing things the renter left behind. If the landlord misses the 14-day deadline — even by one day — the landlord loses the right to keep any part of the deposit, even for real damage. If the landlord kept the deposit on purpose, knowing the rule, the renter can also recover up to two times the deposit as an extra penalty (on top of getting the deposit back)."
  },

  whoQualifies: {
    en: [
      "A NY residential tenant who paid a security deposit — written lease, oral lease, or month-to-month arrangement.",
      "A tenant of an apartment, house, or room in NY outside specific exempted categories (continuing-care retirement communities, licensed assisted-living, adult-care facilities, certain senior residential communities).",
      "A tenant whose rental is a seasonal-use unit or an owner-occupied cooperative apartment — the one-month cap has separate rules for these categories, but most other tenant protections still apply.",
      "A tenant in a rent-stabilized unit — covered by General Obligations Law § 7-107, which as of November 15, 2025 mirrors the §7-108(1-a) protections (one-month cap, 14-day return, walk-throughs, forfeiture, punitive damages).",
      "A tenant in a NYC rent-controlled unit — separate regime; rules come from the city rent and rehabilitation law / emergency housing rent control law (administered by DHCR), not from §7-107 or §7-108.",
      "Any NY tenant whose security deposit was not returned, was partially kept without an itemized statement, or was kept past the 14-day deadline."
    ]
  },

  whatItMeans: {
    en: "NY caps a residential security deposit at one month's rent. The full law is General Obligations Law section 7-108. The exemptions are tricky because they apply at two different levels.\n\nFully exempt from §7-108(1-a) (the subdivision containing the cap, deductions list, walk-throughs, 14-day rule, forfeiture, and punitive damages): NYC rent-controlled units (governed by the city rent and rehabilitation law / emergency housing rent control law, administered by DHCR — not §7-107 and not §7-108), continuing-care retirement communities, licensed assisted-living facilities, licensed adult-care facilities, certain senior residential communities (those that have submitted an offering plan to the Attorney General), and not-for-profit independent retirement communities that offer personal emergency response, housekeeping, transportation, and meals to residents.\n\nRent-stabilized units are covered by a parallel statute (General Obligations Law section 7-107). As of November 15, 2025, §7-107 was amended to mirror the §7-108(1-a) protections — one-month cap, 14-day return, itemized statement, walk-throughs, forfeiture, and punitive damages now apply to rent-stabilized tenants too.\n\nExempt only from the one-month cap (the 14-day rule, forfeiture, and other §7-108(1-a) protections still apply): seasonal-use units and owner-occupied cooperative apartments.\n\nFor every other residential rental in NY, this is the rule for the deposit a renter pays at the start of a lease.\n\nWhat the landlord can and cannot deduct. When the renter moves out, the landlord can keep some of the deposit only for: unpaid rent; damage caused by the renter beyond normal wear and tear; unpaid utilities the renter owed to the landlord under the lease; and moving or storage of things the renter left behind. The law explicitly forbids deductions for ordinary wear and tear (faded paint, worn carpet from regular use) or for damage caused by a previous tenant.\n\nPre-occupancy inspection. Before the renter moves in, the landlord has to offer to walk through the unit together. If the renter accepts, both sides sign a written list of any existing damage. Anything on that list cannot be deducted from the security deposit later. The list is allowed as evidence in court of the unit's condition at move-in.\n\nPre-move-out inspection. Before the tenancy ends — whether the lease runs to its scheduled end, the landlord chooses not to renew, or the renter gives notice — the landlord has to offer the renter a walk-through. The one carve-out: if the renter terminates the tenancy with less than two weeks' notice, the offer is not required. After the inspection, the landlord gives an itemized list of what the landlord plans to deduct. The renter then has the chance to fix anything fixable before moving out — saving the renter that deduction.\n\n14-day deadline. Within 14 days after the renter moves out, the landlord has to return the remaining deposit AND give the renter an itemized statement of any deductions. If the landlord misses the 14-day deadline — even by one day — the landlord forfeits the right to keep ANY part of the deposit, regardless of actual damage or unpaid rent. This is the strongest tool a renter has under this law. Note: NY courts (14 E. 4th St. Unit 509 LLC v. Toporek, 203 A.D.3d 17 (1st Dep't 2022)) have read this rule to apply specifically to the landlord's failure to provide the itemized statement when the landlord wants to keep part of the deposit — not to other procedural failures like missing the pre-move-out inspection notice.\n\nPunitive damages. A renter who proves the landlord willfully violated this law (kept the deposit on purpose, knowing the rule) can recover punitive damages of up to twice the deposit amount, on top of the deposit itself. So if the deposit was $1,200, the maximum recovery is $1,200 (deposit) + $2,400 (punitive) = $3,600.\n\nInterest on the deposit. A separate law (General Obligations Law section 7-103) requires that a deposit held in a building with six or more apartments be kept in an interest-bearing bank account. The renter gets the interest, minus an administrative fee the landlord can keep (usually 1% per year). In buildings with fewer than six apartments, no interest is required — but if the landlord voluntarily placed the deposit in an interest-bearing account anyway, the renter is still entitled to the interest (less the 1% fee).\n\nWhen the building is sold. A separate law (General Obligations Law section 7-105) covers what happens when the rental building is sold while the renter is still there. The original landlord has to transfer all security deposits to the new owner within five days and notify the renters by registered or certified mail.\n\nHow to enforce. Small claims court is the usual path. Rochester City Court small claims handles claims up to $5,000. Town and village justice courts handle up to $3,000. Filing fees are modest, and a renter does not need a lawyer. Bringing the lease, photos of the unit at move-in and move-out, the move-out date documentation, and any pre-occupancy or pre-move-out inspection agreement helps the case. The NY Attorney General's office accepts security-deposit complaints and can bring its own enforcement action under General Obligations Law section 7-109. In Monroe County, free legal help is available from Legal Aid Society of Rochester (585-232-4090), LawNY (585-325-2520), and JustCause (585-232-3051). For Livingston, Ontario, Seneca, Wayne, and Yates counties, LawNY's Geneva office at (315) 781-1465 is the right contact."
  },

  yourRights: {
    en: [
      "A NY tenant has the right to a security deposit of no more than one month's rent for most residential rentals.",
      "A NY tenant has the right to a deposit that cannot be reduced for ordinary wear and tear or for damage caused by a previous tenant.",
      "A NY tenant has the right to a walk-through with the landlord before moving in, with a written record of any existing damage that cannot later be taken out of the deposit.",
      "A NY tenant has the right to a walk-through before moving out, with a written list of anything the landlord plans to take out of the deposit and a chance to fix it first.",
      "A NY tenant has the right to receive the remaining deposit and a written list of anything taken out within 14 days of moving out. If the landlord misses that deadline, the landlord loses the right to keep any part of the deposit.",
      "A NY tenant has the right to recover up to two times the deposit as an extra penalty if the landlord kept the deposit on purpose, knowing the rule.",
      "A NY tenant in a building with six or more apartments has the right to interest on the deposit.",
      "A NY tenant has the right to sue in small claims court to recover the deposit without hiring a lawyer."
    ]
  },

  legalOptions: {
    en: [
      "Rochester City Court Small Claims Part at (585) 371-3412 — claims up to $5,000 for Rochester residents and for disputes involving Rochester properties.",
      "Monroe County town and village justice courts — claims up to $3,000 for disputes in unincorporated areas.",
      "NY Attorney General Tenant Assistance at ag.ny.gov/resources/individuals/tenants-homeowners — guidance on security-deposit rights and complaint intake.",
      "NY Attorney General Consumer Frauds Bureau at (800) 771-7755 — complaints against landlords with repeated General Obligations Law § 7-108 violations.",
      "NY Attorney General enforcement under General Obligations Law § 7-109 — the AG can bring its own action against landlords who repeatedly break the security-deposit rules.",
      "Legal Aid Society of Rochester at (585) 232-4090 — low-income Monroe County tenants in small-claims filings and complex deposit disputes.",
      "LawNY at (585) 325-2520 — Rochester office handles Monroe County intake. Other counties in LawNY's 14-county service area have separate offices: Livingston, Ontario, Seneca, Wayne, and Yates use the Geneva office at (315) 781-1465. lawny.org/FindaLawyer locates the right office for any LawNY county.",
      "JustCause at (585) 232-3051 — volunteer-attorney small-claims preparation for Monroe County tenants. Direct phone or online intake at justcauseny.org.",
      "Building-sale protection (General Obligations Law § 7-105 — separate from § 7-108): when a rental building is sold, the former landlord must transfer all security deposits to the new owner within five days and notify tenants by registered or certified mail."
    ]
  },

  example: {
    en: "Aaliyah rented an apartment in the City of Rochester for two years. When her lease ended, she left the apartment clean and in good condition. The landlord did not return her $900 deposit and sent no statement. Fifteen days after move-out, she reviewed the 14-day rule and confirmed the landlord had forfeited the right to keep any portion of the deposit by missing the deadline. She mailed a certified-letter demand for the full deposit. When the landlord did not respond, Aaliyah filed a small-claims action in Rochester City Court small claims part citing the forfeiture rule. The judge entered judgment for the full $900 plus filing costs. If Aaliyah could prove the landlord willfully kept her deposit, the court could have added punitive damages up to $1,800 — bringing the total to $2,700."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Housing disputes, security deposit recovery, eviction defense",
      qualifier: "Low income residents of Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090. Spanish and ASL interpreters available on request.",
      outcome: "Direct representation and advice on housing cases",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: false,
      languages: []
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
      access: "Phone intake at (585) 232-3051 or apply online at justcauseny.org",
      outcome: "Pro bono volunteer attorney representation",
      phone: "585-232-3051",
      url: "https://www.justcauseny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "LawNY — Geneva office",
      focus: "Housing, security deposits, and other civil legal matters for the eastern Finger Lakes counties in LawNY's service area",
      qualifier: "Low income residents of Livingston, Ontario, Seneca, Wayne, and Yates counties",
      access: "Phone intake at (315) 781-1465",
      outcome: "Direct representation in housing matters",
      phone: "(315) 781-1465",
      url: "https://www.lawny.org",
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
