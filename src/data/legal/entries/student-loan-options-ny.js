export const STUDENT_LOAN_OPTIONS_NY = {
  id: "student-loan-options-ny",
  category: "consumer",
  tier: "federal",
  jurisdiction: "us-ny",
  authorityType: "federal-statute",
  primaryStatute: "20 USC 1087E",
  status: "active",

  title: { en: "Student Loan Debt — Repayment Options, Forgiveness, and Default in New York" },

  summary: {
    en: "Student loan debt affects millions of New Yorkers. Federal student loans carry a menu of repayment options, including income-driven plans that cap the monthly payment at a percentage of the borrower's discretionary income, forgiveness programs for public-service workers (PSLF), and structured paths out of default. Private student loans have fewer options, but they are subject to New York's 6-year statute of limitations on contract debt (CPLR 213). Telling the federal and private systems apart is the first step — the wrong assumption costs money."
  },

  whoQualifies: {
    en: [
      "Any borrower with federal student loan debt (Direct Loans, FFEL, Perkins) who is struggling to make the standard payment.",
      "Any borrower with private student loan debt who has been contacted by a collector or is in default.",
      "Public-service workers — government employees, nonprofit employees, teachers, nurses, first responders — who may qualify for Public Service Loan Forgiveness (PSLF).",
      "Any borrower whose federal loans are in default; there are paths out of default that restore eligibility for income-driven repayment.",
      "Anyone who has been contacted by a company charging a fee for help with federal student loan programs, which is a red flag for a scam."
    ]
  },

  whatItMeans: {
    en: "Federal and private student loans are different systems with different rules, and the same borrower can have both. Sorting out which loan is which (through the National Student Loan Data System for federal and through a credit report pull for private) is the starting point.\n\nFederal loans — income-driven repayment. Income-driven repayment (IDR) plans cap the monthly payment at a percentage of discretionary income, defined by statute at 20 USC 1087E and implemented through Department of Education regulations at 34 CFR 685.209. The main IDR plans are SAVE (the most generous for many borrowers), PAYE, IBR, and ICR. Low-income borrowers can see monthly payments as low as $0. After 20 to 25 years of qualifying payments, the remaining balance is forgiven. Forgiveness under IDR is currently excluded from federal income tax through 2025 under the American Rescue Plan; state tax treatment in New York follows federal for the same period.\n\nFederal loans — Public Service Loan Forgiveness. PSLF forgives the remaining balance on Direct Loans after 120 qualifying monthly payments (10 years) for borrowers who work full-time for a qualifying public service employer — federal, state, or local government, or a 501(c)(3) nonprofit. The PSLF Help Tool at studentaid.gov/pslf confirms employer eligibility and tracks qualifying payments. PSLF has had several expansions and temporary waivers; borrowers who were rejected under old rules sometimes qualify now under updated counting.\n\nFederal loans — default resolution. A federal loan goes into default after 270 days of missed payments. The consequences are severe: tax refund offset, administrative wage garnishment up to 15 percent of disposable pay, and loss of eligibility for future federal aid. The two main paths out are loan rehabilitation (9 months of agreed-upon affordable payments to restore good standing, and one-time removal of the default from credit) and consolidation (which rolls defaulted loans into a new Direct Consolidation Loan with a fresh repayment plan).\n\nPrivate loans — no IDR, no PSLF, but SOL applies. Private student loans do not qualify for income-driven repayment or PSLF. If a private loan goes into default, the lender can sue in state court. New York's statute of limitations on contract debt is 6 years from the date of default or last payment under CPLR 213. A lawsuit filed outside the 6-year window is subject to dismissal based on the statute of limitations — a defense that has to be raised in the answer, not waived.\n\nScam red flags. Legitimate federal student loan programs are free to apply for at studentaid.gov. A company that charges an upfront fee to enroll a borrower in IDR, PSLF, or any federal forgiveness program is signaling a scam. The New York Attorney General's Student Protection Unit has brought enforcement actions against student loan scam operations and takes consumer reports at ag.ny.gov.\n\nWage garnishment cap. Administrative wage garnishment for a defaulted federal student loan is capped at 15 percent of disposable pay under 34 CFR 34.19. Disposable pay is earnings minus legally required deductions (taxes, Social Security, mandatory retirement), not after voluntary deductions."
  },

  yourRights: {
    en: [
      "A federal-loan borrower has the right to enroll in income-driven repayment at any time; payments can drop to $0 for very low-income borrowers.",
      "A public-service worker has the right to PSLF after 120 qualifying payments and qualifying full-time employment.",
      "A borrower in default has the right to rehabilitate or consolidate federal loans to restore good standing.",
      "Private loan debt in New York has a 6-year statute of limitations under CPLR 213; a lawsuit filed outside that window is subject to dismissal on that ground.",
      "Federal student loan programs are free to apply for at studentaid.gov; paying a fee to a third party for enrollment is a scam indicator.",
      "Administrative wage garnishment for a defaulted federal loan is capped at 15 percent of disposable pay under 34 CFR 34.19."
    ]
  },

  legalOptions: {
    en: [
      "Federal loan information and applications for IDR and PSLF are available at studentaid.gov. The PSLF Help Tool at studentaid.gov/pslf confirms eligibility.",
      "For federal loans in default, the loan servicer or the Department of Education Default Resolution Group handles rehabilitation or consolidation. Contact information is at studentaid.gov.",
      "For private student loan lawsuits, confirming whether the 6-year statute of limitations under CPLR 213 has expired is an early step. A time-barred defense has to be raised in the answer.",
      "Free legal help with student loan issues is available through Legal Aid Society of Rochester at (585) 232-4090 and the NY Attorney General's Student Protection Unit.",
      "The NY Attorney General's office has a student loan helpline and has taken enforcement action against loan servicers and scammers. Complaints can be filed at ag.ny.gov."
    ]
  },

  example: {
    en: "A single mother in Rochester has $35,000 in federal student loans from a degree she did not finish. She earns $28,000 a year and cannot afford the standard $350 monthly payment. She applies for the SAVE income-driven repayment plan at studentaid.gov. Her monthly payment drops to $45 based on her discretionary income. After 20 years of qualifying payments on the IDR plan, the remaining balance is forgiven. The application is free — she pays nothing to enroll."
  },

  counsel: [
    {
      type: "free",
      name: "Federal Student Aid (studentaid.gov)",
      focus: "Federal loan repayment plans, PSLF, default resolution",
      qualifier: "Any federal student loan borrower",
      access: "Online or phone",
      outcome: "Enrollment in repayment plans, forgiveness applications",
      phone: "(800) 433-3243",
      url: "https://studentaid.gov",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Student loan disputes, default defense, private loan statute of limitations",
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
    "debt-collection-rights-ny",
    "wage-garnishment-defense-ny",
    "respond-to-lawsuit-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "student loan",
    "student debt",
    "loan forgiveness",
    "PSLF",
    "income driven repayment",
    "IDR",
    "SAVE plan",
    "student loan default",
    "private student loan",
    "student loan scam",
    "student loan statute of limitations",
    "cannot pay student loan"
  ],

  sources: [
    "https://www.law.cornell.edu/uscode/text/20/1087e",
    "https://www.nysenate.gov/legislation/laws/CVP/213",
    "https://studentaid.gov",
    "https://studentaid.gov/pslf/"
  ],

  lastVerified: "2026-04-23",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "high",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
