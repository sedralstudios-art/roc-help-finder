export const EVICTION_PROCESS_NY = {
  id: "eviction-process-ny",
  category: "housing",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY RPA 753",
  status: "active",

  // ─── Anchor fields (see src/data/legal/ANCHORS.md) ───
  // 5th anchor candidate. Picked on the basis of GSC evidence
  // (project_gsc_review_2026_05_01.md): someone literally searched "rpapl 753"
  // — exact-statute search, same signal pattern that picked GOB 7-108.
  // RPAPL 753 is the load-bearing tenant-protective section in Article 7
  // (the one-year stay, the cure window). Entry already covers the broader
  // Article 7 procedural chain; anchor URL points to §753 specifically to
  // match the GSC query. Multi-statute interlock expected (see anchor review
  // difficulty pattern memory): RPAPL 711, 731, 733, 735, 743, 745, 747,
  // 749, 753, 755, 853 + RPL 226-c + Good Cause Eviction Law (NYC + adopting
  // localities). Per R1–R6 lesson on security-deposit-ny: do explicit
  // statute-tree mapping at R1, expect 5–6 rounds.
  isAnchor: true,
  anchorSource: {
    url: "https://www.nysenate.gov/legislation/laws/RPA/753",
    hash: "",
    lastFetched: ""
  },
  lastFormallyReviewed: "2026-05-01",
  formallyReviewedBy: "Anthony DiMarzo + WebSearch + relay-driven R1 audit pending. Round-by-round detail: src/data/legal/anchor-reviews/eviction-process-ny.md.",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "NY Eviction Process — Notice, Hearing, Warrant, Cures, and the One-Year Hardship Stay" },

  summary: {
    en: "A NY landlord cannot remove a tenant without a court order. The process is set by Real Property Actions and Proceedings Law Article 7. It has four stages: written notice (14 days for unpaid rent, or 30/60/90 days for non-renewal based on occupancy or lease length under Real Property Law § 226-c); a special proceeding filed in the local court; a judgment; and a warrant executed by the sheriff or marshal with 14 more days of notice. After judgment, tenants can ask for a one-year hardship stay under § 753(1), a 30-day cure stay in lease-breach holdovers under § 753(4), or (outside NYC) a discretionary stay under § 751. Self-help eviction by the landlord is illegal and exposes the landlord to treble (3×) damages under § 853, restoration of the tenant under § 713(10), and Class A misdemeanor charges + civil penalties under § 768."
  },

  whoQualifies: {
    en: [
      "A NY residential tenant under a written lease, an oral lease, or a month-to-month arrangement.",
      "A tenant in a house, apartment, room, rooming-house unit, or a hotel room occupied for 30 consecutive days or longer.",
      "A tenant facing a 14-day pay-or-quit notice for unpaid rent.",
      "A tenant facing a 30-, 60-, or 90-day non-renewal or rent-increase notice under Real Property Law § 226-c — the tier turns on the tenant's occupancy length OR lease term, whichever is longer.",
      "A Rochester tenant covered by the 2024 NY Good Cause Eviction Law (adopted locally by Rochester) whose landlord needs a statutory reason to refuse renewal or raise rent significantly."
    ]
  },

  whatItMeans: {
    en: "A NY eviction follows a four-stage process set by Real Property Actions and Proceedings Law Article 7. A landlord cannot lawfully lock out a tenant, shut off utilities, remove possessions, or use force to take back the property. Only a sheriff, marshal, or constable acting under a court-issued warrant can remove a tenant.\n\nStage one — written notice. The notice depends on the reason. For unpaid rent, the landlord must serve a 14-day written demand for rent under Real Property Actions and Proceedings Law § 711(2) before filing a nonpayment case. There are two related notice obligations the landlord can fail. First, RPL § 235-e (added by HSTPA) requires the landlord to send a certified-mail reminder when rent is unpaid for 5 days; failure is an affirmative defense in the eviction case. Second, effective August 18, 2024, the 14-day rent demand and other predicate notices must append or contain the RPL § 231-c Good Cause notice that states the unit's Good Cause coverage status — even in localities that have not opted in (with a checkbox indicating non-adoption). A predicate notice missing the § 231-c notice is dismissable in 2025-2026 cases. If the landlord is not renewing the tenancy or is raising rent by 5 percent or more, Real Property Law § 226-c requires advance notice scaled to the length of the tenancy: 30 days if the tenant has occupied less than one year, 60 days if one to two years, and 90 days if two or more years. A lease-violation (holdover) case typically requires a notice to cure followed by a notice of termination, depending on the lease terms.\n\nStage two — the case is filed in local court. Eviction cases go to the city, town, or village court where the property sits. Monroe County cases go to Rochester City Court (for properties inside the city) or the relevant town or village justice court. The landlord files a petition and has it served on the tenant under the rules in Real Property Actions and Proceedings Law § 735. The tenant has the right to appear, answer in writing or orally, raise defenses, and demand a trial. Common defenses include habitability breaches, retaliation, improper service or defective notice, missing RPL § 235-e 5-day reminder notice in nonpayment cases, missing RPL § 231-c Good Cause notice on the predicate, and payment of the rent before judgment. Under Real Property Actions and Proceedings Law § 744, a tenant cannot be evicted because of domestic-violence-victim status.\n\nStage three — judgment. If the court rules for the landlord, Real Property Actions and Proceedings Law § 747 governs the entry of judgment. If the court rules for the tenant, the case is dismissed and the tenant stays. In a nonpayment case, paying the full amount owed before judgment typically ends the case.\n\nStage four — warrant and eviction. Real Property Actions and Proceedings Law § 749 allows the court to issue a warrant directing the sheriff, marshal, or constable to remove the tenants. The officer must give the tenant at least 14 days' written notice before executing the warrant under § 749(2)(a) and may execute it only on a business day between sunrise and sunset. § 749(2)(b) requires the officer to check for companion animals and coordinate their safe removal.\n\nAsking the court for more time after judgment. The 2019 Housing Stability and Tenant Protection Act (HSTPA) reshaped § 753 — what used to be a NYC-only, six-month maximum, holdover-only stay is now statewide, up to one year, and available in nonpayment cases too. § 753(1) gives the court discretion to stay issuance of the warrant for up to one year in a residential case — the tenant must apply in good faith, show inability to find similar housing in the neighborhood despite due and reasonable efforts, OR extreme hardship. The statute lists hardship factors the court considers: serious ill health, significant exacerbation of an ongoing medical condition, a child's enrollment in a local school, and any other extenuating life circumstances affecting the ability to relocate and maintain quality of life. The court also weighs any substantial hardship the stay would impose on the landlord — § 753(1) is not a one-sided tenant lever; the court balances both sides. Outside NYC, the statute defines neighborhood as the same town, village, or city, OR the school district where the tenant's children attend or are eligible to attend.\n\n§ 753(2) requires the tenant to deposit the ongoing rent into court during the stay. HSTPA changed this to allow installment deposits, not just lump-sum — material for tenants without large savings.\n\n§ 753(3) takes the entire § 753 off the table when the landlord proves to the court that the tenant is an objectionable occupant. That means no one-year stay AND no 30-day cure stay — both protections drop away.\n\n§ 753(4) gives a separate 30-day stay of issuance of the warrant specifically for lease-breach holdovers — if the landlord wins on a claim that the tenant broke a lease rule, the court must give the tenant 30 days to fix the lease problem and stop the eviction (HSTPA expanded this from 10 days; pre-HSTPA it was NYC-only).\n\nOutside NYC, RPAPL § 751 provides additional stay paths. § 751(1) is a statewide redemption mechanism — a tenant who held over after rent default can stop the warrant by depositing the rent owed plus interest and costs, or by posting a bond. § 751(4)(a) is an outside-NYC discretionary stay capped at four months for holdover cases. After HSTPA expanded § 753(1) to one year statewide, § 751(4)(a) is largely subsumed for residential tenants, but § 751(1) redemption remains a useful tool.\n\nSelf-help eviction is illegal in New York. A landlord who locks a tenant out, shuts off utilities, or removes possessions without a court order faces three separate consequences. (1) Civil damages — RPAPL § 853 lets the displaced tenant recover treble damages (three times actual losses; courts have discretion on whether to award the multiplier — Lyke v. Anderson). Actual damages must be proved first; the multiplier applies to that amount. Attorney fees are not awarded under § 853 itself, but may be available under RPL § 234 if the lease has a one-way fee clause in favor of the landlord (§ 234 reciprocates to the tenant) — though whether § 234 reciprocity reaches a § 853 claim is unsettled and lease-specific. (2) Restoration — RPAPL § 713(10) is a separate summary proceeding the tenant can bring to be restored to possession. For a tenant who is literally locked out, restoration is often more important than damages. (3) Criminal sanction — RPAPL § 768 makes self-help eviction a Class A misdemeanor, with civil penalties of $1,000 to $10,000 per violation and up to $100 per day for failure to restore the tenant. NY Attorney General guidance directs local police and DAs to enforce § 768. A Rochester tenant locked out can call the police as well as filing a restoration proceeding. Monroe County tenants facing eviction have access to free Legal Aid Society of Rochester representation at Rochester City Court on hearing days and through phone intake."
  },

  yourRights: {
    en: [
      "A NY tenant has the right to stay in the home until a judge signs an order authorizing removal — self-help lockouts, utility shutoffs, and forcible entry by the landlord are illegal.",
      "A NY tenant has the right to a 14-day written rent demand before any nonpayment eviction case can be filed (RPAPL § 711(2)).",
      "A NY tenant has the right to advance written notice before the landlord refuses to renew or raises rent 5 percent or more — 30 days for tenants under one year, 60 days for one to two years, and 90 days for two years or more, based on whichever is longer between occupancy and lease term (RPL § 226-c).",
      "A tenant in a nonpayment case has the right to pay the rent owed at any point before judgment to stop the eviction.",
      "A tenant has the right to appear in court, raise defenses, and demand a trial (RPAPL § 745). Post-HSTPA, a landlord cannot ask the court to require the tenant to deposit rent during the case until the tenant's second adjournment request OR 60 days on the calendar, whichever is later — the first adjournment by an unrepresented tenant does not count toward the 60 days.",
      "A tenant has the right to at least 14 days' written warrant-of-eviction notice from the sheriff or marshal before physical removal, with execution limited to business days during daylight (RPAPL § 749(2)(a)).",
      "A tenant has the right to ask the court for a stay of the warrant for up to one year based on inability to relocate or extreme hardship (RPAPL § 753(1)).",
      "The one-year stay is not available when the landlord proves the tenant is an objectionable occupant (RPAPL § 753(3)).",
      "In a lease-breach holdover case, even if the landlord wins, the court must give the tenant 30 days to fix the lease problem and stop the eviction (RPAPL § 753(4)).",
      "A tenant outside NYC has the right to stop the warrant in a nonpayment case by depositing the rent owed plus interest and costs, or by posting a bond (RPAPL § 751(1)).",
      "A tenant who has been illegally locked out has the right to a fast restoration-to-possession proceeding (RPAPL § 713(10)) — often more important than a damages action when the tenant is on the street.",
      "A tenant has the right to seek treble (3×) damages — three times actual losses — from a landlord who evicts by force, lockout, or utility shutoff without a court order (RPAPL § 853). The court has discretion on whether to award the multiplier. Attorney fees are not awarded under § 853 itself but may be available under RPL § 234 when the lease has a one-way fee clause.",
      "Self-help eviction is a Class A misdemeanor with civil penalties of $1,000 to $10,000 per violation plus up to $100 per day for failure to restore the tenant (RPAPL § 768) — a tenant locked out can call the police as well as filing a restoration proceeding."
    ]
  },

  legalOptions: {
    en: [
      "Rochester City Court Civil Division at 99 Exchange Blvd Room 6, Rochester, (585) 371-3412 — hears eviction cases for properties inside Rochester.",
      "Monroe County town and village justice courts — each town and village handles evictions for properties in its jurisdiction.",
      "Legal Aid Society of Rochester at (585) 232-4090 — represents low-income Monroe County tenants in eviction defense; often staffs the Rochester City Court Housing Part on hearing days.",
      "LawNY at (585) 325-2520 — eviction defense across 14-county Western NY service area.",
      "JustCause at (585) 232-3051 — pro bono volunteer attorney referrals for Monroe County tenants.",
      "NY Attorney General Residential Tenants' Rights Guide at ag.ny.gov/publications/residential-tenants-rights-guide — plain-language overview of tenant rights in an eviction.",
      "NY State Good Cause Eviction information at ag.ny.gov/publications/new-york-state-good-cause-eviction-law — for tenants in municipalities that have adopted Good Cause.",
      "Monroe County Bar Association Lawyer Referral Service at (585) 546-2130 — reduced-fee private-attorney consultation."
    ]
  },

  example: {
    en: "James rents a Rochester apartment in a 12-unit building. His landlord sent him a 30-day notice saying the tenancy would end so the landlord could renovate. James had lived there 18 months, so Real Property Law § 226-c actually required 60 days' notice, not 30. He contacted Legal Aid Society of Rochester. A lawyer attended the Rochester City Court hearing, argued the notice was defective, and confirmed that James's building qualified for Good Cause coverage under Rochester's adoption — the small-landlord exemption (one-unit owners) and owner-occupied ≤10-unit exemption did not apply. With Good Cause coverage confirmed, the renovation theory required a statutory reason the landlord had not pleaded. The court dismissed the petition. James kept his apartment and the landlord had to start over with a proper notice if a valid reason existed."
  },

  counsel: [
    {
      type: "nonprofit",
      name: "Legal Aid Society of Rochester",
      focus: "Eviction defense in Rochester City Court and Monroe County justice courts",
      qualifier: "Low-income Monroe County tenant",
      access: "Phone intake; walk-in at Rochester City Court on Housing Part days. Spanish and ASL interpreters available on request.",
      outcome: "Free representation in eviction proceedings",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "nonprofit",
      name: "LawNY — Legal Assistance of Western New York",
      focus: "Eviction defense, fair housing, warrant-of-eviction stays",
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
      name: "JustCause",
      focus: "Eviction defense, landlord-tenant volunteer attorney matching",
      qualifier: "Low-income Monroe County tenant",
      access: "Phone intake",
      outcome: "Free volunteer-attorney representation",
      phone: "(585) 232-3051",
      url: "https://www.justcauseny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "nonprofit",
      name: "Empire Justice Center",
      focus: "Complex eviction defenses, Good Cause enforcement, impact cases",
      qualifier: "Low and moderate income NY tenants",
      access: "Phone intake",
      outcome: "Free representation and policy advocacy",
      phone: "(585) 454-4060",
      url: "https://empirejustice.org",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "tenant-habitability-ny",
    "security-deposit-ny",
    "illegal-eviction-ny",
    "tenant-rights-repairs-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "NY eviction process",
    "RPA Article 7",
    "14-day rent demand",
    "Real Property Law § 226-c non-renewal notice",
    "holdover vs nonpayment",
    "warrant of eviction",
    "Real Property Actions and Proceedings Law § 749 14-day sheriff notice",
    "Real Property Actions and Proceedings Law § 753 one-year stay",
    "Good Cause Eviction NY",
    "self-help eviction illegal"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/RPA/753",
    "https://www.nysenate.gov/legislation/laws/RPA/A7",
    "https://www.nysenate.gov/legislation/laws/RPP/226-C",
    "https://www.nysenate.gov/legislation/laws/RPA/711",
    "https://www.nysenate.gov/legislation/laws/RPA/713",
    "https://www.nysenate.gov/legislation/laws/RPA/749",
    "https://www.nysenate.gov/legislation/laws/RPA/751",
    "https://www.nysenate.gov/legislation/laws/RPA/768",
    "https://www.nysenate.gov/legislation/laws/RPA/853",
    "https://www.nysenate.gov/legislation/laws/RPP/235-E",
    "https://www.nysenate.gov/legislation/laws/RPP/231-C",
    "https://ag.ny.gov/publications/residential-tenants-rights-guide",
    "https://ag.ny.gov/publications/new-york-state-good-cause-eviction-law"
  ],

  lastVerified: "2026-04-21",
  factCheckedBy: { tool: "websearch", date: "2026-04-29" },
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
