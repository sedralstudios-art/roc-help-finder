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
  status: "active",

  title: { en: "Medical Debt — Hospital Financial Assistance and New York Protections" },

  summary: {
    en: "New York hospitals that receive state Indigent Care Pool funding must offer a financial assistance program with sliding-scale discounts for patients below 300% of the Federal Poverty Level. New York also prohibits medical debt from appearing on consumer credit reports, limits wage garnishment for medical debt, and bars hospitals from placing liens on a patient's primary residence to collect unpaid medical bills."
  },

  whoQualifies: {
    en: [
      "Uninsured or underinsured patients treated at New York hospitals that receive Indigent Care Pool funding (most nonprofit hospitals in the state).",
      "Hospital financial assistance is available to patients with incomes at or below 300% of the Federal Poverty Level under Public Health Law § 2807-k. Some hospitals extend it further.",
      "Immigration status does not disqualify a patient from hospital financial assistance.",
      "New York's medical-debt credit reporting ban and hospital-lien prohibition apply to all consumers regardless of income."
    ]
  },

  whatItMeans: {
    en: "New York's Hospital Financial Assistance Law (Public Health Law § 2807-k) requires every hospital receiving state Indigent Care Pool funding to maintain a written financial assistance policy, post it publicly, and include notice of it on every bill. Patients at or below 100% of the Federal Poverty Level qualify for the largest discount, often full write-offs. A sliding scale extends the benefit up to 300% of the Federal Poverty Level. Hospitals must give patients at least ninety days after the first billing statement to apply for assistance and must screen uninsured patients for Medicaid and other public coverage before pursuing collection. In 2023, New York enacted the Fair Medical Debt Reporting Act (General Business Law § 380-j), which prohibits consumer credit reporting agencies from including medical debt in a New York consumer's credit report. In 2022, the Ending Medical Debt Act and related amendments limited hospital collection practices: hospitals cannot place liens on a patient's primary residence for unpaid medical bills (CPLR § 5231-a), and wage garnishment caps for medical debt were reduced (CPLR § 5231). The three-year statute of limitations on consumer credit debt under the Consumer Credit Fairness Act (CPLR § 214-i) applies to most medical debt."
  },

  yourRights: {
    en: [
      "The right to receive written notice of the hospital's financial assistance policy on every bill and to apply at any time up to at least ninety days after the first billing statement (PHL § 2807-k).",
      "The right, as an uninsured patient, to be screened for Medicaid, Child Health Plus, and other public coverage before a hospital pursues collection (PHL § 2807-k).",
      "The right to a sliding-scale discount if income is at or below 300% of the Federal Poverty Level. Patients at or below 100% of the Federal Poverty Level generally qualify for the largest discount.",
      "The right to apply for hospital financial assistance regardless of immigration status. Citizenship and residency questions cannot be used to deny an application.",
      "The right to have medical debt excluded from consumer credit reports in New York (GBL § 380-j). This applies whether the debt is with a hospital, doctor, lab, or collection agency.",
      "The right to have a primary residence protected from hospital medical-debt liens (CPLR § 5231-a).",
      "The right to reduced wage garnishment caps on medical debt compared with other consumer debt (CPLR § 5231).",
      "The right to dispute a medical bill's accuracy, including surprise out-of-network charges barred by the federal No Surprises Act (42 U.S.C. § 300gg-111 et seq.).",
      "The right to request an itemized bill and to have errors corrected before any collection action proceeds."
    ]
  },

  legalOptions: {
    en: [
      "Hospital financial assistance applications are submitted to the hospital's patient financial services or billing office. Each hospital posts its policy on its website and must provide a copy on request.",
      "Complaints about hospital billing or denial of financial assistance can be filed with the New York State Department of Health (health.ny.gov/facilities/hospital/financial_assistance).",
      "Complaints about surprise out-of-network billing can be filed with the New York Department of Financial Services (dfs.ny.gov) or, for federal protections under the No Surprises Act, with the U.S. Department of Health and Human Services at nosurprises.cms.gov.",
      "Complaints about credit reporting violations involving medical debt can be filed with the federal Consumer Financial Protection Bureau (consumerfinance.gov) and the New York Attorney General (ag.ny.gov/consumer-frauds).",
      "The Community Service Society of New York operates a free statewide Community Health Advocates helpline for medical billing and insurance problems at 1-888-614-5400.",
      "Free legal help with medical debt lawsuits, financial assistance denials, and billing disputes in Monroe County is available through Legal Aid Society of Rochester at (585) 232-4090, LawNY at (585) 325-2520, and the Empire Justice Center at (585) 454-4060.",
      "Under CPLR § 214-i, a medical debt lawsuit filed more than three years after the debt arose can be dismissed on statute-of-limitations grounds as an affirmative defense."
    ]
  },

  example: {
    en: "Amira is uninsured and goes to the emergency room at a Rochester hospital. She receives a bill for $6,000. The bill includes notice of the hospital's financial assistance policy as required by Public Health Law § 2807-k. Her household income is 180% of the Federal Poverty Level. She applies to the hospital's financial assistance program within ninety days. Based on the sliding scale, the hospital reduces her bill substantially and screens her for Medicaid. Six months later, a collector contacts her about the remaining balance. Because the Fair Medical Debt Reporting Act (GBL § 380-j) applies, no credit reporting agency includes the debt on her New York credit report."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Medical debt lawsuit defense, hospital financial assistance denials, consumer debt",
      qualifier: "Low-income residents of Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090",
      outcome: "Direct representation and advice in medical debt matters",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Consumer debt, medical debt collection lawsuits, public benefits",
      qualifier: "Low-income residents in 14 Western NY counties including Monroe",
      access: "Phone intake at (585) 325-2520",
      outcome: "Direct representation in consumer cases",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Medical debt, health coverage, systemic consumer advocacy",
      qualifier: "Low- and moderate-income residents statewide",
      access: "Phone intake at (585) 454-4060",
      outcome: "Direct representation, impact litigation, policy advocacy",
      phone: "(585) 454-4060",
      url: "https://www.empirejustice.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Community Health Advocates (CHA)",
      focus: "Hospital billing problems, insurance denials, financial assistance navigation",
      qualifier: "Any New York resident; no income limit",
      access: "Statewide helpline at 1-888-614-5400",
      outcome: "Billing error resolution, financial assistance application support",
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

  lastVerified: "2026-04-13",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
