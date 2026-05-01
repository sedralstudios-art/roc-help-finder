export const TENANT_HABITABILITY_NY = {
  id: "tenant-habitability-ny",
  category: "housing",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY RPP 235-B",
  status: "active",

  // ─── Anchor fields (see src/data/legal/ANCHORS.md) ───
  // First anchor written 2026-04-30 as the canonical statute summary for
  // NY RPP 235-B. The 22 other entries citing this statute will reference
  // this anchor via `statuteAnchor: "tenant-habitability-ny"` as the redo
  // workflow touches each one. lastFormallyReviewed is provisional —
  // grounded in WebSearch corroboration across NYS Senate text, Justia
  // (2025 NY Laws), PropertyClub plain-English explainer, and St. John's
  // Law Review article — pending attorney sign-off (Germain or other).
  isAnchor: true,
  anchorSource: {
    // Canonical source URL is NYS Senate. NYS Senate hard-blocks bots
    // with 403 (verified 2026-04-30 — even browser UA + transparent bot
    // headers fail). Hash population requires phone-mediated capture; see
    // scripts/check-source-drift.cjs --from-text mode and
    // scripts/data/bot-blocked-sources.json for the workflow.
    url: "https://www.nysenate.gov/legislation/laws/RPP/235-B",
    hash: "609353d2e3a05f45cd50b7336d9ff78080b1755d3336a2752fa79c5e29840ef8",
    lastFetched: "2026-05-01"
  },
  lastFormallyReviewed: "2026-05-01",
  formallyReviewedBy: "Anthony DiMarzo + WebSearch corroboration + R2 expert review (10 issues, 2026-05-01) + R3 expert review (6 NEW findings, 2026-05-01) + R4 expert review (2 ERRORS in R3 application caught, 2026-05-01). R4 caught my own R3 errors: §235-d is NYC-only AND only loft buildings (the statute literally says 'within a city having a population of one million or more') — the §235-d paragraph DELETED entirely. §235-j is a 72-HOUR NEIGHBOR NOTIFICATION rule (statewide), NOT a pre-lease history disclosure rule (that's NYC Local Law 69 / NYC Admin Code §27-2018.1) — §235-j paragraph rewritten to actual content. R3 reviewer had wrong sources; R4 reviewer caught it. Architecture working as designed: multiple reviewers catch each other's errors. R2 ERRORS: heat-rules attribution flipped (state PMCNYS Sept 15-May 31, NYC version differs); RPL §227 narrowed to fire/flood; GOL §7-103 split off for security deposit; Rochester code phone corrected; HP-Action framing corrected. R2 CLARIFICATIONS: repair-and-deduct softened; §223-b examples corrected; §223-b owner-occupied <4 unit carve-out added; §235-b tenant-misconduct carve-out added; Tenant Defense Project added; JustCause URL fixed. R3 ERROR: rent-withholding + warranty defense added as the most-used remedy (Park West Mgmt. Corp. v. Mitchell 1979). R3 CLARIFICATIONS: §227 written notice rephrased as recommended not required; prose 'three free options' aligned with 4-org counsel array + Tenant Defense Project; bedbugs added to violation list + §235-j disclosure law mentioned; Park West v. Mitchell rent-abatement formula cited explicitly; §235-d landlord harassment statute added as complementary remedy. Provisional, pending R4 + attorney sign-off.",
  pendingLegislation: ["S5956-2025"],
  sourceChangedSince: null,

  title: { en: "Warranty of Habitability — Every NY Tenant's Right to a Safe Home" },

  summary: {
    en: "Every NY rental — house, apartment, or single room — comes with a built-in promise that the place is safe to live in. The landlord has to keep the unit and shared areas (like hallways and stairs) in working order. No broken heat in the cold months. Hot water year-round. Nothing that puts a tenant's health or safety at risk. This promise is part of every lease, written down or not. A landlord cannot make a tenant sign it away. A landlord also cannot punish a tenant for asking for repairs or reporting problems to the city."
  },

  whoQualifies: {
    en: [
      "Anyone renting a place to live in NY — apartment, house, room, mobile home lot. Written lease or verbal agreement, both count.",
      "Month-to-month renters. Roommates on the lease. Family members who pay rent. Anyone paying for a place to live.",
      "Renters whether the lease is in their name alone or shared. Renters in subsidized housing. Renters in private market housing.",
      "Renters even if the lease has a clause that says they give up these rights. That kind of clause has no power — the law says it is void."
    ]
  },

  whatItMeans: {
    en: "NY has one of the strongest renter-protection laws in the country. It is called the warranty of habitability — but the word warranty is just a fancy way of saying promise. Every NY landlord makes this promise to every renter, automatically. The lease does not have to mention it. A verbal handshake deal counts too.\n\nThe promise has three parts. First, the place is fit to live in. Second, the place works for the uses both sides agreed on (a one-bedroom apartment should function as a one-bedroom). Third, no conditions in the unit or shared areas put the renter's life, health, or safety in danger.\n\nThe lease cannot take this promise away. Some landlords put a clause in the lease that says the renter gives up these rights. That clause has no legal power. NY law calls it void — meaning the court treats it as if it was never written. A landlord also cannot ask the renter to sign a separate paper giving up these rights.\n\nWhen the law has been broken. Courts have found the law was broken in cases like: no heat in winter, no hot water, broken plumbing, broken locks that leave the unit unsafe, mice, roach, or bedbug infestations the landlord did not deal with, lead paint hazards in older buildings, mold that hurts health, no electricity, and a ceiling that fell in. Small things like a paint scuff or a sticky drawer do not count. The test is whether the problem affects the renter's health, safety, or basic ability to live there. One important limit: if the renter, someone in the household, or a guest caused the condition, it does not count against the landlord. The renter is responsible for fixing what they damaged.\n\nBedbug notice rule. NY has a separate rule for bedbugs. When a landlord knows there is a bedbug infestation in a unit, the landlord has 72 hours to give written notice to the renters in the units immediately above, below, and next to the infested unit. (The pre-lease bedbug history disclosure on a state form is a separate NYC-only rule and does not apply outside NYC.)\n\nHeat rules. Outside NYC — including Rochester and the rest of Monroe County — the rule is set by the state Property Maintenance Code. From September 15 through May 31, the landlord has to keep all habitable rooms, bathrooms, and toilet rooms at 68 degrees or higher, regardless of the outside temperature. Hot water has to be provided year-round at 120 degrees minimum. NYC has a different version: from October 1 through May 31, 68 degrees during the day (6 a.m. to 10 p.m.) when it is below 55 degrees outside, and 62 degrees overnight regardless of the outside temperature.\n\nWhat a renter can do when the landlord won't fix the problem. There are several options.\n\nFirst, a renter can ask the court for a rent reduction — sometimes called a rent abatement. The court figures out how much the unit was actually worth in its broken state and lowers the rent for that period. NY's highest court (the Court of Appeals) set this formula in 1979: the reduction equals the difference between what the apartment would have been worth as promised and what it was actually worth in its broken condition, multiplied by how long the bad conditions lasted.\n\nSecond, a renter can sue the landlord for damages directly.\n\nThird — in practice the most common path — a renter can stop paying rent until the landlord fixes the problem. This is risky. The landlord will probably file an eviction case for nonpayment of rent. The renter can then raise the warranty of habitability as a defense and ask the judge for a rent abatement against the rent owed. NY's highest court endorsed this defense in the same 1979 decision. The risk is real: if the judge does not find the conditions bad enough, the renter can be ordered to pay the full back rent or face eviction. Setting the unpaid rent aside in a separate account and documenting the conditions both help the renter's case. Talking to a free legal-help organization first reduces the risk.\n\nFourth, in narrow situations a renter may pay for a necessary repair and subtract the cost from the next rent payment. This is called repair-and-deduct. NY does not have a statute that clearly allows it. Courts have permitted it only in unusual cases — the most common example is a landlord who willfully refuses to fix a broken lock. It carries the same risk as withholding rent: if the court later disagrees that the condition was serious enough or the cost was reasonable, the renter can be on the hook for the full rent. Going to court first to get the repair ordered is much safer.\n\nTo prove a habitability case, photos, a report from a city or town code inspector, and the renter's own testimony are usually enough. A renter does not need an expert witness.\n\nNo punishment for asking for repairs. NY law says a landlord cannot punish a renter for asking for repairs, joining a tenants' group (when renters in a building work together), or reporting the landlord to the city. Punishment includes things like serving an eviction notice, refusing to renew the lease, or offering a new lease with an unreasonable rent increase. If the landlord does any of these things within a year of the renter's good-faith complaint, the law presumes it was punishment — meaning the landlord has to prove it was not. A renter who is being evicted can raise this as a defense in court. One exception: this rule does not apply if the landlord lives in the building and the building has fewer than four units.\n\nReporting to the city. A renter can call the city or town code enforcement office to report a problem. Inside Rochester, dial 311 (or 585-428-5990 from a cell phone or from outside the city) and ask for a code enforcement inspection. The general line for Neighborhood and Business Development is 585-428-6883. Outside the city, each Monroe County town has its own building department. The inspector visits the unit, and if they find a problem, gives the landlord a deadline to fix it. If the landlord does not fix it, the city can fine them or order them to make the repairs.\n\nMoving out when the building is destroyed or damaged. If the apartment becomes unlivable because of fire, flood, or similar physical damage that is not the renter's fault, NY law lets the renter end the lease and stop paying future rent. Any rent paid in advance gets adjusted to the move-out date. This applies to physical destruction of the building — not to general bad conditions like pests or no heat. Security deposit return is handled by a separate law. The renter has to actually move out — that is what ends the rent obligation. Putting the surrender in writing is not required by law, but it makes the surrender date clear if there is any later dispute about rent owed.\n\nFree legal help. In Monroe County, tenants who cannot afford a lawyer have several free options: Legal Aid Society of Rochester (585-232-4090), LawNY (585-325-2520), JustCause (585-232-3051), and Empire Justice Center (585-454-4060). The Tenant Defense Project of Greater Rochester at 585-504-6195 is a coordinated program that connects tenants facing eviction with attorneys from Legal Aid, LawNY, and JustCause. It is a funded program, not a guaranteed right — coverage depends on continued city and county funding. A renter can also file a petition in the Rochester City Court housing part (a part of City Court created in 2021 that handles housing code matters) asking the judge to order the landlord to make repairs. A repair petition is separate from a rent-reduction lawsuit; a renter may need both to fully address the problem. Court filing fees can be waived for tenants with low income."
  },

  yourRights: {
    en: [
      "A NY tenant has the right under NY RPL § 235-b to a rental that is fit for human habitation and free of conditions dangerous to life, health, or safety.",
      "A NY tenant outside NYC has the right to heat at 68 degrees or higher in habitable rooms from September 15 through May 31, and hot water at 120 degrees year-round, under the Property Maintenance Code of NY State.",
      "A NY tenant has the right under NY RPL § 223-b to be free from retaliation — eviction notice, refusal to renew the lease, or unreasonable rent increase — for making good-faith complaints about housing conditions. (Exception: § 223-b does not apply to owner-occupied buildings with fewer than four units.)",
      "A NY tenant has the right to file a complaint with the municipal code enforcement office and request inspection of the rental.",
      "A NY tenant has the right under NY RPL § 227 to end the lease and stop paying future rent when fire, flood, or similar physical damage (not caused by the tenant) destroys or makes the unit uninhabitable. Prepaid rent gets adjusted. Security deposit return is governed separately by General Obligations Law § 7-103.",
      "A NY tenant has the right to bring a rent-reduction claim in court based on uncured habitability defects, with damages measured by the reduction in fitness of the premises.",
      "A NY tenant has the right to treat any lease clause purporting to waive the warranty of habitability as void — the warranty cannot be waived."
    ]
  },

  legalOptions: {
    en: [
      "NY RPL § 235-b — the warranty-of-habitability statute applicable to every residential lease in NY.",
      "NY RPL § 223-b — the anti-retaliation statute with a one-year presumption of retaliation for adverse actions after a protected complaint.",
      "NY RPL § 227 — tenant right to end the lease and stop future rent when fire, flood, or similar physical damage (not caused by the tenant) destroys the building. (For security deposit return, see GOL § 7-103.)",
      "City of Rochester code enforcement: dial 311, or 585-428-5990 from a cell phone or outside the city, to request a code inspection. Neighborhood and Business Development general line: 585-428-6883.",
      "Town and village code enforcement offices across Monroe County — habitability complaints for units outside Rochester city limits.",
      "Rochester City Court housing part — created by Chapter 464 of the Laws of 2021; a renter can file a petition asking the judge to order the landlord to make repairs. This is separate from a rent-reduction lawsuit. Court forms are free; filing fees can be waived for low-income tenants under CPLR § 1101.",
      "NY Attorney General tenant rights information at ag.ny.gov/resources/individuals/tenants-homeowners.",
      "Legal Aid Society of Rochester at (585) 232-4090 — free representation in habitability and eviction cases.",
      "Legal Assistance of Western New York (LawNY) at (585) 325-2520 — free representation across the 14-county Western NY service area.",
      "JustCause at (585) 232-3051 — pro bono volunteer attorney representation in housing cases (justcauseny.org).",
      "Tenant Defense Project of Greater Rochester at (585) 504-6195 — coordinated free legal help for tenants facing eviction, connecting tenants with attorneys from Legal Aid, LawNY, and JustCause. Funded program, not a statutory right to counsel.",
      "Empire Justice Center at (585) 454-4060 — free representation in complex and systemic housing cases."
    ]
  },

  example: {
    en: "Denise rents an apartment in Greece in Monroe County. In early November her furnace stopped working. She sent her landlord a dated written notice asking for the furnace to be repaired, and kept a copy. After two weeks with no repair, she filed a complaint with the Town of Greece building department. An inspector confirmed the furnace failure and issued a violation notice to the landlord with a 48-hour compliance window. The landlord replaced the furnace within three days of the inspection. Two months later Denise's lease came up for renewal. Under NY RPL § 223-b, the landlord's attempt to raise her rent by 30 percent would be presumed retaliatory because it fell within the one-year window after her code complaint. Denise contacted Legal Aid and requested that any increase be limited to a non-retaliatory market-rate change."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Eviction defense, habitability complaints, tenant representation in Rochester City Court",
      qualifier: "Low income tenants in Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090, walk-in at Rochester City Court on court dates",
      outcome: "Direct representation in eviction and housing cases",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Housing, fair housing, habitability, public benefits, elder law",
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
      focus: "Housing, landlord-tenant disputes, and other civil legal matters",
      qualifier: "Low income residents of Monroe County",
      access: "Phone intake at (585) 232-3051",
      outcome: "Pro bono volunteer attorney representation",
      phone: "585-232-3051",
      url: "https://www.justcauseny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Tenant Defense Project of Greater Rochester",
      focus: "Coordinated free legal help for tenants facing eviction in Monroe County",
      qualifier: "Tenants facing eviction proceedings; income limits per partner orgs",
      access: "Hotline at (585) 504-6195; routes to Legal Aid, LawNY, or JustCause attorneys",
      outcome: "Funded program (not a statutory right to counsel) — coverage depends on continued city/county appropriation",
      phone: "(585) 504-6195",
      url: "https://roctenantunion.org/eviction-resources",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Housing rights, systemic housing advocacy, fair housing",
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
    "eviction-process-ny",
    "security-deposit-ny",
    "illegal-eviction-ny",
    "landlord-retaliation-ban-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "apartment not safe",
    "no heat",
    "no hot water",
    "mold in apartment",
    "bugs in apartment",
    "cockroaches",
    "mice",
    "rats",
    "bedbugs",
    "landlord wont fix",
    "broken pipes",
    "unsafe apartment",
    "tenant rights",
    "habitability",
    "landlord problems",
    "code violations",
    "lead paint",
    "bad living conditions"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/RPP/235-B",
    "https://www.nysenate.gov/legislation/laws/RPP/223-B",
    "https://www.nysenate.gov/legislation/laws/RPP/227",
    "https://ag.ny.gov/resources/individuals/tenants-homeowners/legal-services-and-code-enforcement",
    "https://www.nysenate.gov/legislation/laws/RPP/A7"
  ],

  lastVerified: "2026-04-22",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
