// LGLW5-D_medical-debt-ny_01.js
// Category: consumer (Consumer & Debt)
// Jurisdiction: ny (New York State)
// Schema: V3 — English only (translation re-sync pending)
// LGLW5-D | Drafted April 2026

export const MEDICAL_DEBT_NY = {
  id: "medical-debt-ny",
  category: "consumer",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY PBH 2807-K",
  status: "active",

  title: { en: "NY Medical Debt — Hospital Financial Assistance, Credit Report Ban, and Collection Limits" },

  summary: {
    en: "Every NY general hospital must operate a financial assistance program under Public Health Law § 2807-k. For patients with income below at least 400% of the federal poverty level, the hospital cannot charge more than Medicaid rates, and a sliding scale reduces charges further for lower incomes. Monthly installment payments cannot exceed 5% of the patient's gross monthly income. Separate NY laws ban medical debt on credit reports, ban hospital liens on a debtor's home, and cap wage garnishment. Immigration status cannot be used to deny financial assistance."
  },

  whoQualifies: {
    en: [
      "A patient treated at a NY general hospital with a bill the patient cannot afford.",
      "A patient with income below 400% of the federal poverty level under PBH § 2807-k(9-a) — with escalating discount tiers at lower income levels.",
      "A patient at any income level with medical debt appearing on a NY credit report — covered by GBS § 380-j's credit-reporting ban.",
      "A NY homeowner against whom a hospital is seeking a lien for unpaid medical debt — protected by CPLR § 5231-a.",
      "A NY wage earner facing wage garnishment for medical debt — protected by CPLR § 5231 caps."
    ]
  },

  whatItMeans: {
    en: "NY protects medical-debt patients through four interlocking statutes. Hospital financial assistance is governed by Public Health Law § 2807-k. Every NY general hospital must maintain a financial-assistance policy covering patients with income below 400% of the federal poverty level. The statute sets tiered discounts based on household income. For patients below 200% of poverty, the hospital cannot collect more than the amount Medicaid would have paid for the same services. For patients between 200% and 300% of poverty, a proportional sliding-fee schedule applies — lower incomes pay less, with charges increasing in equal increments as income rises. Up through 400% of poverty, some level of reduction is required. Immigration status cannot be used as an eligibility criterion. Patients must be given at least 90 days to apply for financial assistance after receiving the first bill. The hospital's financial-assistance policy must be posted on every bill and on the hospital's website. Installment plans are required under § 2807-k. The monthly payment on an unpaid balance cannot exceed 5 percent of the patient's gross monthly income, and any interest charged on the unpaid balance cannot exceed 2 percent. No acceleration clauses are allowed. Uninsured patients must be screened for Medicaid before collection starts, so a patient who qualifies for Medicaid can have the bill paid by Medicaid rather than pursued as personal debt. Three additional NY statutes add layered protections. General Business Law § 380-j, enacted in 2023 as the Fair Medical Debt Reporting Act, bans consumer-reporting agencies from listing any medical debt on a NY consumer's credit report and bans creditors and hospitals from furnishing medical debt to credit bureaus in the first place. CPLR § 5231-a, enacted in 2022, bars hospitals from placing a lien on the debtor's primary residence for unpaid medical debt. CPLR § 5231 caps wage garnishment for medical debt at a lower percentage than for general consumer debt. CPLR § 214-i cuts the statute of limitations on most consumer debt, including many medical debts, from six years to three years — a medical collector or debt buyer who sues on a time-barred medical debt faces dismissal on motion. Federal layer: the No Surprises Act at 42 USC § 300gg-111 protects patients from surprise out-of-network bills at in-network hospitals and from balance billing in emergency situations. The federal Independent Dispute Resolution process at cms.gov/nosurprises handles disputed out-of-network charges. Practical steps when hit with a medical bill: ask the hospital billing office for the financial-assistance application; apply within 90 days; request an itemized bill and look for errors; ask for a Medicaid screening if uninsured; complain to the NY Department of Health if the hospital refuses to comply; use the No Surprises Act process for out-of-network charges. Community Health Advocates at (888) 614-5400 is a free statewide helpline run by the Community Service Society that helps NY patients with hospital bills, insurance disputes, and financial-assistance applications."
  },

  yourRights: {
    en: [
      "A NY patient has the right under PBH § 2807-k to apply for hospital financial assistance within at least 90 days of the first bill, regardless of immigration status.",
      "A NY patient with income below 200% of the federal poverty level has the right under PBH § 2807-k to pay no more than the Medicaid amount for the same services.",
      "A NY patient with income between 200% and 300% of the federal poverty level has the right to a proportional sliding-fee reduction under PBH § 2807-k.",
      "A NY patient has the right under PBH § 2807-k to a monthly installment plan capped at 5 percent of gross monthly income, with interest capped at 2 percent and no acceleration clauses.",
      "A NY uninsured patient has the right to be screened for Medicaid before the hospital starts collecting.",
      "A NY consumer has the right under GBS § 380-j to a credit report free of medical debt information.",
      "A NY homeowner has the right under CPLR § 5231-a to protection from hospital medical-debt liens on the primary residence.",
      "A NY wage earner has the right to reduced medical-debt wage-garnishment caps under CPLR § 5231.",
      "A NY consumer has the right under CPLR § 214-i to a three-year statute of limitations on most consumer medical debts — older claims can be dismissed on motion.",
      "A NY patient has the right under the federal No Surprises Act (42 USC § 300gg-111) to protection from surprise out-of-network bills at in-network facilities."
    ]
  },

  legalOptions: {
    en: [
      "Hospital billing office — every NY hospital must post its financial-assistance policy on its website and on every bill. Applications go to the hospital billing or financial-counseling department.",
      "NY Department of Health Hospital Financial Assistance page at health.ny.gov/facilities/hospital/financial_assistance — complaint pathway when a hospital fails to comply with PBH § 2807-k.",
      "NY Department of Financial Services at dfs.ny.gov — surprise out-of-network bill complaints.",
      "Federal No Surprises Act dispute portal at cms.gov/nosurprises — independent dispute resolution for out-of-network charges.",
      "Consumer Financial Protection Bureau at consumerfinance.gov — complaints about medical debt improperly reported to credit bureaus.",
      "NY Attorney General Consumer Frauds Bureau at (800) 771-7755 or ag.ny.gov/consumer-frauds — predatory medical collections and GBS § 380-j violations.",
      "Community Health Advocates at (888) 614-5400 — free statewide helpline run by the Community Service Society for hospital billing and insurance disputes.",
      "Legal Aid Society of Rochester at (585) 232-4090, LawNY at (585) 325-2520, Empire Justice Center at (585) 454-4060 — free legal representation for low-income Monroe County residents on medical debt.",
      "CPLR § 214-i time-bar defense — a hospital or medical collector suing on a debt more than three years old faces dismissal on motion."
    ]
  },

  example: {
    en: "Amira is uninsured and went to the emergency room at a Monroe County hospital. She received a $6,000 bill. The first bill included the notice of the hospital's financial-assistance program required by PBH § 2807-k. Her household income was about 180% of the federal poverty level. She applied within 90 days. Because she falls below 200% of poverty, the hospital could not charge her more than the Medicaid rate for the services — reducing the bill substantially. The financial-counseling office also screened her for Medicaid. Six months later, when a collector contacted her about the remaining balance, she confirmed the debt was not showing on her credit report — GBS § 380-j blocks medical debt from NY credit reports."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Medical debt lawsuits, denied hospital financial assistance, consumer debt",
      qualifier: "Low-income residents of Monroe County and nearby counties",
      access: "Call 585-232-4090",
      outcome: "Free lawyer or advice on medical debt cases",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Medical debt collection lawsuits, consumer rights, public benefits",
      qualifier: "Low-income residents in 14 Western NY counties including Monroe",
      access: "Call 585-325-2520",
      outcome: "Free lawyer in consumer cases",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Medical debt, health coverage, consumer rights",
      qualifier: "Low- and moderate-income New Yorkers",
      access: "Call 585-454-4060",
      outcome: "Free lawyer or impact litigation",
      phone: "(585) 454-4060",
      url: "https://www.empirejustice.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Community Health Advocates (CHA)",
      focus: "Hospital billing problems, insurance denials, help applying for financial assistance",
      qualifier: "Any New Yorker — no income limit",
      access: "Call 1-888-614-5400",
      outcome: "Free help with your bill or insurance",
      phone: "1-888-614-5400",
      url: "https://www.communityhealthadvocates.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "debt-collection-rights-ny",
    "medicaid-ny",
    "medicaid-spend-down-ny",
    "bankruptcy-chapter7-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "medical debt",
    "hospital bill",
    "can't afford hospital bill",
    "ER bill",
    "hospital financial assistance",
    "charity care",
    "sliding scale hospital",
    "surprise medical bill",
    "out of network billing",
    "medical bill on credit report",
    "sued for medical debt",
    "medical debt collector",
    "Medicaid application hospital",
    "hospital lien home",
    "wage garnishment medical bill"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/PBH/2807-K",
    "https://www.health.ny.gov/facilities/hospital/financial_assistance/",
    "https://www.nysenate.gov/legislation/laws/GBS/380-J",
    "https://www.nysenate.gov/legislation/laws/CVP/5231",
    "https://www.nysenate.gov/legislation/laws/CVP/5231-A",
    "https://www.nysenate.gov/legislation/laws/CVP/214-I",
    "https://www.cms.gov/nosurprises",
    "https://ag.ny.gov/consumer-frauds/medical-debt",
    "https://www.communityhealthadvocates.org/"
  ],

  lastVerified: "2026-04-21",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
