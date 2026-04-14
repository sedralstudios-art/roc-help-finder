// LGLW5-D_debt-collection-rights-ny_01.js
// Category: consumer (Consumer & Debt)
// Jurisdiction: ny (New York State)
// Schema: V3 — English only (translation re-sync pending)
// LGLW5-D | Drafted April 2026

export const DEBT_COLLECTION_RIGHTS_NY = {
  id: "debt-collection-rights-ny",
  category: "consumer",
  tier: "state",
  jurisdiction: "us-ny",
  status: "active",

  title: { en: "Debt Collection — Limits on What a Collector Can Do" },

  summary: {
    en: "Federal and New York law set rules for how debts can be collected. Collectors cannot harass, threaten, lie, or contact a consumer at all hours. New York's Consumer Credit Fairness Act also shortened the time a creditor has to sue on most consumer debt from six years to three. Medical debt has additional protections and, as of 2023, cannot appear on consumer credit reports in New York."
  },

  whoQualifies: {
    en: [
      "Any consumer in New York contacted about a debt, whether the debt is real, disputed, or already paid.",
      "The federal Fair Debt Collection Practices Act (FDCPA, 15 U.S.C. § 1692 et seq.) applies to third-party debt collectors and debt buyers.",
      "New York General Business Law § 601 and Department of Financial Services regulations (23 NYCRR Part 1) extend similar limits to original creditors collecting on their own debts.",
      "These rights apply regardless of immigration status."
    ]
  },

  whatItMeans: {
    en: "Debt collection in New York is governed by federal and state law. The FDCPA prohibits harassment, threats, false statements, and unfair collection tactics by debt collectors. New York's General Business Law § 601 and regulations at 23 NYCRR Part 1 extend many of these same duties to original creditors and require specific written disclosures. A collector must send a written validation notice within five days of first contact, identifying the creditor and the amount owed. A consumer who disputes the debt in writing within thirty days can require the collector to stop contact until the debt is verified. The Consumer Credit Fairness Act (CCFA), effective April 2022, reduced the statute of limitations on most consumer credit debt from six years to three years and added procedural requirements before a creditor can file a lawsuit (CPLR § 214-i and § 306-d). In 2023, New York enacted the Fair Medical Debt Reporting Act, which prohibits credit reporting agencies from including medical debt on consumer credit reports (GBL § 380-j)."
  },

  yourRights: {
    en: [
      "The right to receive a written validation notice within five days of a collector's first contact, stating the amount owed, the name of the original creditor, and the right to dispute the debt (15 U.S.C. § 1692g).",
      "The right to dispute a debt in writing within thirty days. While the dispute is pending, the collector must stop collection until the debt is verified (15 U.S.C. § 1692g(b)).",
      "The right to be free from harassment. Collectors cannot threaten violence, use obscene language, call repeatedly to annoy, or publish a 'shame list' of people who owe debts (15 U.S.C. § 1692d).",
      "The right to be free from false or misleading statements. Collectors cannot falsely claim to be attorneys or government agents, misstate the amount owed, or threaten legal action they do not intend to take (15 U.S.C. § 1692e).",
      "The right to limits on when and where collectors contact you. Collectors cannot call before 8:00 a.m. or after 9:00 p.m. in your time zone, contact you at work if your employer prohibits it, or contact you after you send a written 'cease communication' letter (15 U.S.C. § 1692c).",
      "The right to have an attorney-only channel of contact. If you tell the collector in writing that you are represented by an attorney, the collector must contact your attorney instead of you (15 U.S.C. § 1692c(a)(2)).",
      "The right to a three-year statute of limitations on most consumer credit debt in New York (CPLR § 214-i). Once the statute has run, a lawsuit to collect is time-barred and can be dismissed.",
      "The right to be free from credit reporting of medical debt. Under GBL § 380-j (effective 2023), credit reporting agencies may not include medical debt in New York consumer credit reports.",
      "The right, in a debt collection lawsuit, to receive a specific additional notice by mail before any default judgment is entered (CPLR § 306-d)."
    ]
  },

  legalOptions: {
    en: [
      "Complaints about debt collectors can be filed with the New York Department of Financial Services (dfs.ny.gov), the New York Attorney General's Consumer Frauds Bureau (ag.ny.gov/consumer-frauds), and the federal Consumer Financial Protection Bureau (consumerfinance.gov).",
      "Under 15 U.S.C. § 1692k, a consumer who proves an FDCPA violation can recover statutory damages up to $1,000, plus actual damages and attorney's fees. Courts decide what applies in each case.",
      "If sued on a time-barred debt, a defendant can raise the statute of limitations as an affirmative defense. The burden shifts to the plaintiff to prove the debt was commenced within the allowed period.",
      "Under CPLR § 306-d, a creditor suing on consumer credit debt must mail a specific additional notice before any default judgment may be entered.",
      "Free legal help with debt collection harassment, lawsuit defense, and consumer protection claims in Monroe County is available through Legal Aid Society of Rochester at (585) 232-4090, LawNY at (585) 325-2520, and the Empire Justice Center at (585) 454-4060.",
      "JustCause (Telesca Center for Justice) offers clinics on consumer and debt issues and is reached at (585) 232-3051."
    ]
  },

  example: {
    en: "A collector calls Jordan repeatedly — including at 6:00 a.m. and at work — about a credit card debt from 2019. Jordan sends the collector a written letter disputing the debt and demanding it stop contacting him. Under 15 U.S.C. § 1692c(c), the collector can then only contact Jordan to confirm the letter was received or to give notice of a specific legal action. Because the last payment on the debt was more than three years ago, Jordan can also raise the CPLR § 214-i statute of limitations if the collector ever sues. Jordan files a complaint with the New York Attorney General's Consumer Frauds Bureau."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Consumer debt defense, FDCPA violations, lawsuit defense",
      qualifier: "Low-income residents of Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090",
      outcome: "Direct representation and advice in debt collection matters",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Consumer debt, collection lawsuits, bankruptcy referral",
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
      focus: "Consumer financial rights, systemic advocacy, FDCPA, debt buyer lawsuits",
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
      name: "JustCause (Telesca Center for Justice)",
      focus: "Consumer debt clinics, small claims, pro bono referrals",
      qualifier: "Low-income residents of Monroe County",
      access: "Phone intake at (585) 232-3051",
      outcome: "Pro bono volunteer attorney representation",
      phone: "585-232-3051",
      url: "https://www.justcauseny.org",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "medical-debt-ny",
    "bankruptcy-chapter7-ny",
    "bankruptcy-chapter13-ny",
    "bankruptcy-automatic-stay-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "debt collector calling",
    "debt harassment",
    "being sued for debt",
    "old debt",
    "collection lawsuit",
    "credit card debt",
    "debt validation",
    "cease communication",
    "statute of limitations debt",
    "zombie debt",
    "debt buyer",
    "FDCPA",
    "can they garnish my wages",
    "debt too old to sue",
    "wrong amount owed"
  ],

  sources: [
    "https://www.law.cornell.edu/uscode/text/15/chapter-41/subchapter-V",
    "https://www.nysenate.gov/legislation/laws/GBS/601",
    "https://www.nysenate.gov/legislation/laws/CVP/214-I",
    "https://www.nysenate.gov/legislation/laws/CVP/306-D",
    "https://www.nysenate.gov/legislation/laws/GBS/380-J",
    "https://www.dfs.ny.gov/consumers/complaint",
    "https://ag.ny.gov/consumer-frauds",
    "https://www.consumerfinance.gov/"
  ],

  lastVerified: "2026-04-13",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
