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
    hash: "a2575677ae5a169e2267e2e01eae1c7a23870a2b7953a091bf01e49d58a36a92",
    lastFetched: "2026-05-02"
  },
  lastFormallyReviewed: "2026-05-01",
  formallyReviewedBy: "Anthony DiMarzo + WebSearch + relay-driven R1 audit pending. Round-by-round detail: src/data/legal/anchor-reviews/eviction-process-ny.md.",
  pendingLegislation: null,
  sourceChangedSince: null,

  title: { en: "NY Eviction Process — Notice, Hearing, Warrant, Cures, and the One-Year Hardship Stay" },

  summary: {
    en: "A NY landlord cannot remove a tenant without a court order. The process is set by Real Property Actions and Proceedings Law Article 7. It has four stages: written notice (14 days for unpaid rent, or 30/60/90 days for non-renewal based on occupancy or lease length under Real Property Law § 226-c); a special proceeding filed in the local court; a judgment; and a warrant executed by the sheriff or marshal with 14 more days of notice. After judgment, tenants can ask for more time — up to a one-year hardship stay under § 753(1), a 30-day window to fix a lease violation under § 753(4), or a statewide payment-or-bond path before the warrant issues under § 751(1). Self-help eviction by the landlord is illegal and exposes the landlord to treble (3×) damages under § 853, restoration of the tenant under § 713(10), and Class A misdemeanor charges + civil penalties under § 768."
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
    en: "A NY eviction follows a four-stage process set by Real Property Actions and Proceedings Law Article 7. A landlord cannot lawfully lock out a tenant, shut off utilities, remove possessions, or use force to take back the property. Only a sheriff, marshal, or constable acting under a court-issued warrant can remove a tenant.\n\nStage one — written notice. The notice depends on the reason. For unpaid rent, the landlord must serve a 14-day written demand under RPAPL § 711(2). The statute requires the demand to ask for either payment of the rent OR possession of the home — a true pay-or-quit notice. There are two related notice obligations the landlord can fail. First, RPL § 235-e(d) (added by HSTPA in 2019) requires the landlord to send a certified-mail reminder when rent is unpaid for 5 days; failure is an affirmative defense in the eviction case. Second, effective August 18, 2024, the 14-day rent demand and other notices that come before the petition must include the RPL § 231-c Good Cause notice stating the unit's Good Cause coverage status — even in localities that have not opted in (with a checkbox showing the locality has not opted in). Courts have dismissed petitions where the § 231-c notice is missing. If the landlord is not renewing the tenancy or is raising rent by 5 percent or more, Real Property Law § 226-c requires advance written notice — the tier turns on the tenant's occupancy length OR lease term, whichever is longer: 30 days if less than one year, 60 days if at least one year but less than two, and 90 days if two years or more. A lease-violation (holdover) case typically requires a notice to cure followed by a notice of termination, depending on the lease terms.\n\nStage two — the case is filed in local court. Eviction cases go to the city, town, or village court where the property sits. Monroe County cases go to Rochester City Court (for properties inside the city) or the relevant town or village justice court. The landlord files a petition and has it served on the tenant under the rules in Real Property Actions and Proceedings Law § 735. The tenant has the right to appear, answer in writing or orally, raise defenses, and demand a trial. Common defenses include habitability breaches, retaliation, improper service or defective notice, missing RPL § 235-e 5-day reminder notice in nonpayment cases, missing RPL § 231-c Good Cause notice in the rent demand or termination notice, a 14-day rent demand that fails the good-faith approximation rule (the demand must state a reasonably accurate amount; inflated demands have been dismissed under Shoprite Supermarkets v. Yonkers Plaza Shopping), and payment of the rent before judgment. Under RPAPL § 744, a tenant cannot be evicted because of domestic-violence-victim status — except § 744(4) carves out owner-occupied buildings of two or fewer residential units, where this protection does not apply.\n\nStage three — judgment. If the court rules for the landlord, RPAPL § 747 governs the entry of judgment. If the court rules for the tenant, the case is dismissed and the tenant stays. In a nonpayment case, the court must vacate the warrant on tender or deposit of the full rent due at any time before the warrant is executed under RPAPL § 749(3) — not just before judgment. The cutoff is execution of the warrant, which can be months after judgment in a contested case. The statute carries one exception: if the landlord proves the tenant withheld the rent in bad faith, the court does not have to vacate the warrant. Where Good Cause Eviction (RPL Article 6-A) applies — NYC and locally adopted municipalities including Rochester — the landlord in a covered unit must have a statutory reason listed in the law to refuse to renew a lease or evict. Preference to renovate, sell, or rerent at a higher rent does not qualify on its own.\n\nStage four — warrant and eviction. Real Property Actions and Proceedings Law § 749 allows the court to issue a warrant directing the sheriff, marshal, or constable to remove the tenants. The officer must give the tenant at least 14 days' written notice before executing the warrant under § 749(2)(a) and may execute it only on a business day between sunrise and sunset. § 749(2)(b) requires the officer to check for companion animals and coordinate their safe removal.\n\nAsking the court for more time after judgment. The 2019 Housing Stability and Tenant Protection Act (HSTPA) reshaped § 753 — what used to be a NYC-only, six-month maximum, holdover-only stay is now statewide, up to one year, and available in nonpayment cases too. § 753(1) gives the court discretion to stay issuance of the warrant for up to one year in a residential case — the tenant must apply in good faith, show inability to find similar housing in the neighborhood despite due and reasonable efforts, OR extreme hardship. The statute lists hardship factors the court considers: serious ill health, significant exacerbation of an ongoing condition, a child's enrollment in a local school, and any other extenuating life circumstances affecting the ability to relocate and maintain quality of life. The court also weighs any substantial hardship the stay would impose on the landlord — § 753(1) is not a one-sided tenant lever; the court balances both sides. Outside a city of one million or more (which today is just NYC), the statute defines neighborhood as the same town, village, or city, OR the school district where the tenant's children attend or are eligible to attend.\n\n§ 753(2) requires the tenant to deposit the ongoing rent into court during the stay. HSTPA changed this to allow installment deposits at the court's direction, not just lump-sum.\n\n§ 753(3) removes the § 753 protections only in one situation — a holdover case the landlord brings on the ground that the tenant is objectionable. In an ordinary nonpayment or non-renewal case, § 753 still applies even if the landlord describes the tenant as objectionable.\n\n§ 753(4) gives a separate 30-day stay of issuance of the warrant specifically for lease-breach holdovers — if the landlord wins on a claim that the tenant broke a lease rule, the court must give the tenant 30 days to fix the lease problem and stop the eviction (HSTPA expanded this from 10 days; pre-HSTPA it was NYC-only).\n\nRPAPL § 751(1) is a separate statewide path that runs BEFORE the warrant is issued — a tenant in a nonpayment case can stop the warrant from being issued at all by paying the full rent owed plus interest, any penalty, and the costs of the proceeding into court, or by posting a bond. § 749(3) (already covered above) is the parallel post-judgment / pre-execution mechanism.\n\nSelf-help eviction is illegal in New York. A landlord who locks a tenant out, shuts off utilities, or removes possessions without a court order faces three separate consequences. (1) Civil damages — RPAPL § 853 lets the displaced tenant recover treble damages (three times actual losses; courts have discretion on whether to award the three-times multiplier). Actual damages must be proved first; the multiplier applies to that amount. Attorney fees are not awarded under § 853 itself, but may be available under RPL § 234 when the lease has a one-way attorney-fee clause for the landlord — § 234 extends that same right to the tenant. Whether attorney fees can be recovered in a self-help eviction case depends on the lease. (2) Restoration — RPAPL § 713(10) is a separate summary proceeding the tenant can bring to be restored to possession. For a tenant who is literally locked out, restoration is often more important than damages. (3) Criminal sanction — RPAPL § 768 makes intentional self-help eviction a Class A misdemeanor (the intent element is part of the crime), with civil penalties of $1,000 to $10,000 per violation and up to $100 per day for failure to restore the tenant (capped at six months — maximum $18,000 on the daily count). Each separate self-help act is its own violation; lockout + utility shutoff + refusal to restore can stack as three separate civil-penalty assessments. NY Attorney General guidance directs local police and DAs to enforce § 768. A Rochester tenant locked out can call the police as well as filing a restoration proceeding. Monroe County tenants facing eviction have access to free Legal Aid Society of Rochester representation at Rochester City Court on hearing days and through phone intake."
  },

  yourRights: {
    en: [
      "A NY tenant has the right to stay in the home until a judge signs an order authorizing removal — self-help lockouts, utility shutoffs, and forcible entry by the landlord are illegal.",
      "A NY tenant has the right to a 14-day written rent demand before any nonpayment eviction case can be filed (RPAPL § 711(2)).",
      "A NY tenant has the right to advance written notice before the landlord refuses to renew or raises rent 5 percent or more — 30 days for tenants under one year, 60 days for one to two years, and 90 days for two years or more, based on whichever is longer between occupancy and lease term (RPL § 226-c).",
      "A tenant in a nonpayment case has the right to stop the eviction by tendering or depositing the full rent owed at any time before the warrant is executed (RPAPL § 749(3)) — months past judgment in a contested case. Exception: if the landlord proves the tenant withheld the rent in bad faith, the court does not have to vacate the warrant.",
      "A NY tenant has the right not to be evicted because of domestic-violence-victim status (RPAPL § 744) — except this protection does not apply in owner-occupied buildings of two or fewer residential units (§ 744(4)).",
      "A tenant has the right to appear in court, raise defenses, and demand a trial (RPAPL § 745).",
      "A tenant has the right to at least 14 days' written warrant-of-eviction notice from the sheriff or marshal before physical removal, with execution limited to business days during daylight (RPAPL § 749(2)(a)).",
      "A tenant has the right to ask the court for a stay of the warrant for up to one year based on inability to relocate or extreme hardship (RPAPL § 753(1)).",
      "The § 753 protections are not available in a holdover proceeding the landlord brings on the ground that the occupant is objectionable (RPAPL § 753(3)) — but they still apply in nonpayment and non-renewal cases.",
      "In a lease-breach holdover case, even if the landlord wins, the court must give the tenant 30 days to fix the lease problem and stop the eviction (RPAPL § 753(4)).",
      "A tenant statewide has the right to stop the warrant from being issued in a nonpayment case by paying the full rent owed plus interest, any penalty, and costs into court, or by posting a bond (RPAPL § 751(1)). Note this is the pre-issuance path; the parallel post-judgment path through warrant execution is RPAPL § 749(3).",
      "A tenant who has been illegally locked out has the right to a fast restoration-to-possession proceeding (RPAPL § 713(10)) — often more important than a damages action when the tenant is on the street.",
      "A tenant has the right to seek treble (3×) damages — three times actual losses — from a landlord who evicts by force, lockout, or utility shutoff without a court order (RPAPL § 853). The court has discretion on whether to award the multiplier. Attorney fees are not awarded under § 853 itself but may be available under RPL § 234 when the lease has a one-way fee clause.",
      "Self-help eviction is a Class A misdemeanor with civil penalties of $1,000 to $10,000 per violation plus up to $100 per day for failure to restore the tenant, capped at six months (RPAPL § 768) — a tenant locked out can call the police as well as filing a restoration proceeding."
    ]
  },

  legalOptions: {
    en: [
      "Rochester City Court Civil Division at 99 Exchange Blvd Room 6, Rochester, (585) 371-3412 — hears eviction cases for properties inside Rochester.",
      "Monroe County town and village justice courts — each town and village handles evictions for properties in its jurisdiction.",
      "Legal Aid Society of Rochester at (585) 232-4090 — represents low-income Monroe County tenants in eviction defense; often staffs the Rochester City Court Housing Part on hearing days.",
      "LawNY at (585) 325-2520 — eviction defense across 14-county Western NY service area.",
      "JustCause at (585) 232-3051 — pro bono volunteer attorney referrals for Monroe County tenants.",
      "Tenant Defense Project unified intake hotline at (585) 504-6195 — single front-door for the three frontline Monroe County eviction-defense providers (Legal Aid Society of Rochester, LawNY, JustCause). Use this number first; it routes to the right provider.",
      "Empire Justice Center at (585) 454-4060 — statewide impact litigation and policy advocacy on housing. For individual eviction defense in Monroe County, frontline providers are Legal Aid Society of Rochester, LawNY, and JustCause.",
      "NY Attorney General Residential Tenants' Rights Guide at ag.ny.gov/publications/residential-tenants-rights-guide — plain-language overview of tenant rights in an eviction.",
      "NY State Good Cause Eviction information at ag.ny.gov/publications/new-york-state-good-cause-eviction-law — for tenants in municipalities that have adopted Good Cause.",
      "Monroe County Bar Association Lawyer Referral Service at monroe.community.lawyer or by phone (585) 546-1817 — $45 referral fee plus free half-hour consultation with the matched attorney. Not framed as an emergency or same-week service."
    ]
  },

  example: {
    en: "James (a hypothetical Rochester tenant) rents an apartment in a building owned by a landlord who owns more than 50 rental units across several Rochester buildings. The landlord sent James a 30-day notice saying the tenancy would end so the landlord could renovate. James had lived there 18 months, so Real Property Law § 226-c actually required 60 days' notice, not 30. He contacted Legal Aid Society of Rochester. A lawyer attended the Rochester City Court hearing, argued the notice was defective, and confirmed that James was covered by Good Cause Eviction under Rochester's adoption. Important framing: the statewide Good Cause default exempts a natural-person landlord owning no more than 10 units anywhere in NY (RPL § 211(3)); Rochester's December 2024 ordinance narrowed that exemption to landlords owning no more than ONE unit anywhere — the strong version. James's landlord, with dozens of units, fell well outside both. The owner-occupied buildings of ten units or fewer exemption also did not apply because the landlord did not live in the building. With Good Cause coverage confirmed, the renovation theory required a statutory reason the landlord had not pleaded. The court dismissed the petition. James kept his apartment and the landlord had to start over with a proper notice if a valid reason existed."
  },

  counsel: [
    {
      type: "nonprofit",
      name: "Legal Aid Society of Rochester",
      focus: "Eviction defense in Rochester City Court and Monroe County justice courts",
      qualifier: "Low-income Monroe County tenant",
      access: "Phone intake at (585) 232-4090 or online application at lasroc.org/contact-us. Walk-in at Rochester City Court on Housing Part days. ASL and spoken-language interpreters available on request.",
      outcome: "Free representation in eviction proceedings",
      phone: "",
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
      phone: "",
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
      phone: "",
      url: "https://www.justcauseny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "nonprofit",
      name: "Empire Justice Center",
      focus: "Statewide impact litigation and policy advocacy on housing — NOT a frontline eviction-defense provider for individual tenants",
      qualifier: "Statewide; impact case selection. Frontline individual eviction defense in Monroe County is handled by Legal Aid Society of Rochester, LawNY, and JustCause.",
      access: "Phone (585) 454-4060 — voicemail callback. Albany office checks messages hourly; Rochester office callback frequency not published.",
      outcome: "Impact litigation and policy advocacy; rare individual representation",
      phone: "",
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
