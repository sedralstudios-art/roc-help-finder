export const TENANT_SCREENING_BLACKLIST_NY = {
  id: "tenant-screening-blacklist-ny",
  category: "housing",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY CVP 213-B",
  status: "active",

  title: { en: "Tenant Screening and Blacklists — What Landlords Can and Cannot Use in New York" },

  summary: {
    en: "Many tenants are denied housing because their name appears in a tenant screening report — often based on a past eviction case that was dismissed, an old debt, or even a case filed against a different person with a similar name. New York passed landmark tenant screening reforms in 2019 that limit what landlords can consider and give tenants the right to see and dispute the report."
  },

  whoQualifies: {
    en: [
      "Any person who has been denied a rental based on a tenant screening or background report.",
      "Any person who suspects their name is on a 'tenant blacklist' because of a past housing court case — even one that was dismissed or settled.",
      "Any person who has been asked to pay excessive application fees."
    ]
  },

  whatItMeans: {
    en: "Tenant screening reports are the gatekeeper for most rental applications. Screening companies compile reports using court records, credit reports, and eviction history databases. Before New York's 2019 Housing Stability and Tenant Protection Act (HSTPA), these reports routinely included cases that were dismissed, cases where the tenant won, and cases that were sealed. The effect was a blacklist that punished tenants for exercising their legal right to defend against eviction. The 2019 reforms substantially changed the landscape.\n\nCPLR 213-b and the sealing rule. The 2019 reforms amended CPLR 213-b to seal housing court records that resulted in a favorable outcome for the tenant. Dismissals, withdrawals, and settlements with no finding of liability are sealed and cannot be reported by screening companies. A screening company that reports a sealed case is violating state law, and the tenant has both a state-law claim and (under the Fair Credit Reporting Act) a federal claim.\n\nApplication fee cap. Real Property Law 238-a caps what landlords in New York can charge for a rental application. The total fee for a background check and credit check is capped at $20. A landlord can only pass through the actual cost of the report — no markup, no administrative fees, no 'application fee' on top. A landlord who charges more than $20 (or the adjusted cap set by regulation) is violating state law.\n\nFair Credit Reporting Act protections. The federal Fair Credit Reporting Act (15 USC 1681) applies to tenant screening reports. If a tenant is denied housing based on a screening report, the landlord has to provide an adverse action notice identifying the screening company and stating the decision was based on the report. The tenant then has the right to obtain a free copy of the report from the screening company and to dispute any inaccurate information.\n\nDispute process. The tenant contacts the screening company and disputes the inaccurate information. The FCRA requires the screening company to investigate within 30 days and correct any errors. If the company fails to correct the error, the tenant can sue under FCRA for statutory damages (up to $1,000), actual damages, and attorney fees.\n\nSealed case reporting — what to do. If a sealed housing court case appears on a screening report, the tenant has several remedies. First, dispute with the screening company directly. Second, file a complaint with the NY Attorney General at (800) 771-7755. Third, file a complaint with the Consumer Financial Protection Bureau (the federal agency that enforces FCRA). Fourth, sue the screening company for FCRA violations plus state-law violations.\n\nWhat counts as adverse action. The FCRA's adverse action notice requirement kicks in when the screening report contributes to a denial of housing, an increased deposit, a higher rent, or a requirement for a cosigner. The notice has to be in writing and has to identify the screening company by name and contact information.\n\nCommon screening database errors. Mixed files (someone else's eviction case attached to the tenant's file because of a common name). Cases that were dismissed but still reported as active. Cases that were sealed but continue to appear. Cases with the incorrect outcome attached. Each of these is disputable under FCRA.\n\nRight to a copy of the report. Separate from the denial scenario, a tenant has the right to request their own tenant screening report annually from most screening companies. Some companies charge a small fee; some provide it free under federal rules.\n\nFree legal help. Legal Aid Society of Rochester at (585) 232-4090 handles tenant screening disputes. Empire Justice Center at (585) 454-4060 also handles FCRA tenant screening cases. The NY Homes and Community Renewal (HCR) office publishes tenant screening rules at hcr.ny.gov."
  },

  yourRights: {
    en: [
      "Housing court cases that ended favorably for the tenant (dismissed, withdrawn, settled) are sealed and cannot appear on screening reports.",
      "Application fees for background and credit checks are capped by state regulation.",
      "If denied based on a screening report, the tenant has the right to a copy of the report and the name of the screening company.",
      "Inaccurate information on a screening report can be disputed with the screening company, which must investigate within 30 days.",
      "A landlord cannot use a dismissed or sealed housing court case as a reason to deny housing.",
      "Screening companies that report sealed cases are violating state law."
    ]
  },

  legalOptions: {
    en: [
      "If denied housing based on a screening report, requesting a copy of the report from the landlord or screening company is the first step. The adverse action notice must identify which company produced the report.",
      "Errors on screening reports can be disputed directly with the screening company. Under the FCRA, they must investigate within 30 days.",
      "If a sealed housing court case appears on a screening report, a complaint can be filed with the NY Attorney General at (800) 771-7755 and with the screening company.",
      "Free legal help with tenant screening disputes is available through Legal Aid Society of Rochester at (585) 232-4090.",
      "The NY Homes and Community Renewal (HCR) office provides information on tenant screening fee caps and tenant rights at hcr.ny.gov."
    ]
  },

  example: {
    en: "A tenant in Rochester was taken to housing court by a previous landlord over a rent dispute. The case was dismissed after the tenant proved the rent was paid. Two years later, she applies for a new apartment and is denied. She requests the screening report and finds the dismissed case listed as an 'eviction filing.' She disputes it with the screening company, citing the 2019 sealing law. The company removes it within three weeks. She reapplies and is approved."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Tenant screening disputes, sealed records, housing denial",
      qualifier: "Low-income residents of Monroe and surrounding counties",
      access: "Phone intake",
      outcome: "Direct representation or advice",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "housing-discrimination-ny",
    "eviction-process-ny",
    "credit-report-dispute-ny",
    "security-deposit-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "tenant screening",
    "tenant blacklist",
    "denied rental",
    "eviction record",
    "screening report",
    "background check housing",
    "sealed eviction",
    "application fee cap",
    "FCRA housing",
    "adverse action",
    "dismissed case showing"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/CVP/213-B",
    "https://hcr.ny.gov"
  ],

  lastVerified: "2026-04-24",
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
