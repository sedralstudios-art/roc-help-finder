export const EMERGENCY_ROOM_BILLING_NY = {
  id: "emergency-room-billing-ny",
  category: "health",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY FIS 603",
  status: "active",

  title: { en: "Emergency Room Bills in New York — Surprise Billing, Charity Care, and Patient Options Under FIS 603" },

  summary: {
    en: "A patient who received an emergency room bill that is unaffordable has several options in New York. Financial Services Law 603 and the federal No Surprises Act limit surprise balance billing for emergency services. Public Health Law 2807-k requires every New York hospital to have a Financial Assistance Policy and to screen patients for charity care before sending a bill to collections. Uninsured patients are billed at a capped rate, not at full charge. Billing errors are common and patients have the right to an itemized bill and to dispute charges."
  },

  whoQualifies: {
    en: [
      "A patient who received an emergency room bill they cannot afford.",
      "A patient who received a surprise bill from an out-of-network doctor at an in-network hospital.",
      "An uninsured patient who received emergency care.",
      "A patient being contacted by a collection agency about an ER bill."
    ]
  },

  whatItMeans: {
    en: "Two layers of law protect ER patients in New York: a state surprise-billing law and the state hospital financial assistance rule, both backed up by the federal No Surprises Act.\n\nNew York's Surprise Bill Law (Financial Services Law 603). For emergency services, the statute blocks balance billing — that is, billing the patient for the difference between what insurance paid and the provider's full charge. The patient only owes their in-network cost-sharing amount (copay, coinsurance, or deductible). The out-of-network provider and the insurer settle the rest between themselves through an independent dispute resolution process run by the Department of Financial Services (DFS). The law applies even when the emergency doctor, anesthesiologist, radiologist, or lab is out-of-network, as long as the hospital itself was in-network or the care was truly emergency.\n\nHospital Financial Assistance (Public Health Law 2807-k). Every New York hospital that receives Indigent Care Pool funds — which is every large hospital in the state — must have a written Financial Assistance Policy. The policy has to offer discounted or free care to patients below a set income threshold. State law requires free or heavily discounted care for patients with household income at or below 300% of the federal poverty level. Hospitals set their own sliding-scale thresholds above that floor.\n\nScreening before collections. A New York hospital cannot send a bill to collections without first screening the patient for eligibility for financial assistance. When a bill is already in collections, the patient still has the right to apply; the hospital has to pause collections and recall the debt while reviewing the application.\n\nUninsured billing cap. For uninsured patients below the state-set income threshold, the hospital has to bill at a capped rate — usually the rate the hospital gets from Medicaid or a similarly low negotiated rate, not the full chargemaster price. Chargemaster prices are usually many times the actual cost of care.\n\nItemized bills and coding errors. Patients have the right to an itemized bill showing every line charge with the CPT or HCPCS code. Billing errors are common: duplicate charges, wrong codes, charges for services that were not actually delivered, and 'upcoded' items at a higher tier than the care provided. An itemized bill is what makes those errors visible.\n\nFederal No Surprises Act. Since January 2022, the federal No Surprises Act adds a parallel layer for most private insurance plans, including self-funded employer plans, which New York's statute alone does not reach. For emergency services and for certain non-emergency services at in-network facilities, the federal law limits the patient's responsibility to in-network cost-sharing and routes the rest through a federal independent dispute resolution process.\n\nMedicaid emergency coverage. An uninsured person — including a person without lawful immigration status — can qualify for Emergency Medicaid, which pays for emergency treatment of a medical condition. The application is filed with the county Department of Human Services. See the emergency-medicaid-ny entry for details.\n\nWhere to push back. The state Department of Financial Services handles surprise-billing complaints. The Attorney General's Health Care Bureau handles billing and collections complaints. Legal Aid and LawNY handle charity care applications and billing disputes for low-income patients."
  },

  yourRights: {
    en: [
      "An insured patient has the right to pay only in-network cost-sharing for emergency services, even when the treating provider is out-of-network.",
      "An uninsured patient has the right to be screened for charity care and financial assistance before a hospital sends the bill to collections.",
      "A patient whose household income is at or below 300% of the federal poverty level has the right to reduced or free hospital care under the hospital's Financial Assistance Policy.",
      "A patient has the right to an itemized bill showing every charge and the billing code.",
      "A patient has the right to dispute any charge the patient believes is incorrect.",
      "A patient has the right to request a payment plan instead of paying a large bill at once.",
      "A patient has the right to file a complaint with the NYS Department of Financial Services when a provider tries to balance bill for emergency services."
    ]
  },

  legalOptions: {
    en: [
      "A surprise-billing complaint can be filed with the NYS Department of Financial Services at (800) 342-3736 or at dfs.ny.gov.",
      "Every New York hospital has to provide a Financial Assistance Application on request; the hospital billing department is the starting point.",
      "An itemized bill is a written request to the hospital; the hospital has to provide one. Billing errors are common on ER visits.",
      "A bill already in collections can still be reviewed for financial assistance; the hospital has to pause collections and recall the debt while the application is pending.",
      "Free help negotiating hospital bills is available through Legal Aid Society of Rochester at (585) 232-4090.",
      "The NYS Attorney General's Health Care Bureau handles billing disputes at (800) 771-7755.",
      "The federal No Surprises Act (effective January 2022) adds parallel protection against balance billing for most private insurance plans, including self-funded employer plans."
    ]
  },

  example: {
    en: "Andre went to the ER at Strong Memorial Hospital after a car accident. He had insurance through his employer, but the ER doctor who treated him was out-of-network. Andre received a bill for $4,200 on top of what his insurance paid. He called the NYS Department of Financial Services and learned the bill violated the Surprise Bill Law. The department contacted the provider. Andre's responsibility was reduced to his $250 in-network copay. The provider and insurer resolved the rest through the independent dispute resolution process."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Medical debt, hospital billing disputes, financial assistance applications",
      qualifier: "Low-income residents of Monroe and surrounding counties",
      access: "Phone intake at (585) 232-4090",
      outcome: "Help negotiating bills, applying for charity care, and disputing collections",
      phone: "",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "government",
      name: "NYS Department of Financial Services — Consumer Hotline",
      focus: "Surprise billing complaints, insurance disputes",
      qualifier: "Any New York State resident",
      access: "Phone at (800) 342-3736",
      outcome: "Investigation of surprise billing violations, enforcement action",
      phone: "",
      url: "https://www.dfs.ny.gov",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "surprise-medical-billing-ny",
    "medical-debt-ny",
    "medical-bill-negotiation-ny",
    "uninsured-health-care-ny",
    "emergency-medicaid-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "emergency room bill",
    "ER bill",
    "hospital bill",
    "surprise bill",
    "balance billing",
    "out of network ER",
    "hospital financial assistance",
    "charity care",
    "medical bill too high",
    "ER charges",
    "hospital debt",
    "cannot afford hospital bill"
  ],

  sources: [
    "https://www.dfs.ny.gov/consumers/health_insurance/surprise_medical_bills",
    "https://www.nysenate.gov/legislation/laws/FIS/603",
    "https://www.nysenate.gov/legislation/laws/PBH/2807-K"
  ],

  lastVerified: "2026-04-29",
  factCheckedBy: { tool: "websearch", date: "2026-04-29" },
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
