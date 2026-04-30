export const NY_ESTIMATED_TAX_SELF_EMPLOYED_NY = {
  id: "ny-estimated-tax-self-employed-ny",
  category: "consumer",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY TAX 658",
  status: "active",

  title: { en: "NY Estimated Tax for Self-Employed — Quarterly Payments to Avoid Underpayment Penalty" },

  summary: {
    en: "A New York self-employed person, freelancer, gig worker, or 1099 earner who expects to owe at least 300 dollars in NY state income tax beyond what has been withheld must make quarterly estimated tax payments using Form IT-2105. Payment deadlines are April 15, June 15, September 15, and January 15. Underpayment triggers interest and penalties that compound quickly."
  },

  whoQualifies: {
    en: [
      "A self-employed NY resident with 1099-NEC or Schedule C income.",
      "A freelancer, contractor, gig worker, or small business owner with no employer withholding.",
      "A retiree with investment income (interest, dividends, capital gains) above withholding.",
      "A rental property owner with net rental income.",
      "An employee with additional side income where regular W-2 withholding is not enough."
    ]
  },

  whatItMeans: {
    en: "New York Tax Law Section 658 and 685(c) require any NY taxpayer who expects to owe at least 300 dollars in NY state income tax for the year, beyond what has been withheld from wages or other sources, to make quarterly estimated tax payments. The four federal quarterly deadlines apply to NY also: April 15 (covering income January 1 through March 31), June 15 (April 1 through May 31), September 15 (June 1 through August 31), and January 15 of the following year (September 1 through December 31). The deadlines are the same as federal estimated tax (1040-ES), though the NY payment is separate and goes to NY State. Form IT-2105 is used to submit NY estimated tax with a check, or the taxpayer can pay online at tax.ny.gov. The payment can also be made through NY Direct Deposit authorization or through a personal bank online bill-pay. Failure to pay enough estimated tax triggers underpayment interest and penalties under NY Tax Law 685. The NY underpayment interest rate is set quarterly by the Commissioner of Taxation and Finance and is typically 7 to 9 percent annually — significant compared to a simple savings account rate. Penalties can also apply. The safe harbor rules under Tax Law 685(c)(2) say no underpayment penalty applies if the taxpayer: paid at least 100 percent of the prior year's total NY tax liability through withholding and estimated payments (110 percent for high-income taxpayers above 150,000 AGI), OR paid at least 90 percent of the current year's total NY tax liability. Meeting either safe harbor avoids penalty regardless of actual income variations. Calculating estimated tax: project annual taxable income, apply NY tax rates (4 to 10.9 percent based on income bracket), subtract expected NY credits (Empire State Child Credit, Earned Income Tax Credit, Child and Dependent Care Credit), and divide by 4 for the quarterly amount. A first-time self-employed person in Monroe County with projected 55,000 dollars of self-employment income typically owes around 3,000 to 3,500 dollars in combined NY state and New York City / Yonkers tax (if applicable). Monroe County residents do not owe NYC tax, so Monroe County self-employed income is taxed only at the NY state rate. Monroe County income tax is 0 — NY state is the only income tax. This contrasts with New York City which has additional city income tax. Safe harbor based on prior year: if the prior year's total NY tax was 2,800 dollars, paying at least 2,800 dollars across the four quarters avoids underpayment penalty even if current year income turns out much higher. This method is simplest — divide last year's total by 4 and pay that each quarter. A taxpayer whose income varies unpredictably (many freelance or commission-based workers) often uses the prior-year safe harbor because it is easy to calculate and defends against penalty. Annualized income installment method (Form IT-2105.9) allows taxpayers with uneven income (big project in June, quiet period August) to pay estimated tax proportional to actual income earned in each quarterly period, rather than equal quarterly installments. This reduces the effective penalty when income is concentrated in later quarters. A taxpayer who realized they underpaid in a prior quarter can catch up on the next quarterly payment — there is no penalty for paying extra on a later quarter as long as the annual total is enough. Many accountants and tax software (TurboTax, H&R Block, FreeTaxUSA) calculate the quarterly payment automatically when entering self-employment income. Free Volunteer Income Tax Assistance (VITA) sites in Monroe County help with basic returns but usually do not help with quarterly estimated tax planning during the year — mid-year consultation is easier through a paid tax preparer at roughly 100 to 300 dollars for a one-time planning session."
  },

  yourRights: {
    en: [
      "A self-employed NY taxpayer has the right to pay estimated tax quarterly and avoid penalty.",
      "A taxpayer meeting the safe harbor (100 percent prior year or 90 percent current year) has the right to no underpayment penalty.",
      "A taxpayer with uneven income has the right to use the annualized income installment method on Form IT-2105.9.",
      "A taxpayer who overpays in an earlier quarter has the right to reduce or skip a later quarter.",
      "A taxpayer who missed an estimated payment has the right to catch up without penalty through annual filing if total payments meet safe harbor.",
      "A taxpayer has the right to an installment agreement with NY Tax Department if the annual bill cannot be paid in full."
    ]
  },

  legalOptions: {
    en: [
      "NYS Department of Taxation and Finance at (518) 457-5181 handles estimated tax questions and payment processing.",
      "Form IT-2105 and instructions available at tax.ny.gov/forms/it-2105.",
      "Online payment at tax.ny.gov or through a bank online bill-pay.",
      "For tax planning, Monroe County Bar Association Lawyer Referral at (585) 546-2130 or any CPA.",
      "For free tax help at filing season, VITA sites — call 211 at (585) 442-0220 for Monroe County locations.",
      "For installment agreements on unpaid balances, NYS income tax installment plan at nys-income-tax-installment-plan-ny."
    ]
  },

  example: {
    en: "Maya is a Rochester freelance graphic designer with projected 62,000 dollars of 1099 income for 2026. Her prior year (2025) total NY tax was 2,900 dollars. She chose the prior-year safe harbor and paid 725 dollars per quarter for 2026 (2,900 divided by 4) using Form IT-2105 online. Her actual 2026 tax liability turned out to be 3,400 dollars. Because her total estimated payments equaled 100 percent of the prior year, she owed no underpayment penalty on the 500 dollar balance due with her return in April 2027. She paid the 500 dollars with her tax return filing."
  },

  counsel: [
    {
      type: "government",
      name: "NYS Department of Taxation and Finance",
      focus: "Estimated tax, Form IT-2105, underpayment penalty questions",
      qualifier: "Any NY taxpayer with non-withheld income",
      access: "Phone, online payment and form portal",
      outcome: "Quarterly payment processing, penalty calculation, plan options",
      phone: "(518) 457-5181",
      url: "https://www.tax.ny.gov/pay/ind/pay_estimated_tax.htm",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "nonprofit",
      name: "VITA Monroe County",
      focus: "Free tax preparation at annual filing including self-employment",
      qualifier: "Household income under approximately 67,000 dollars",
      access: "Phone 211, seasonal appointments",
      outcome: "Free tax preparation",
      phone: "(585) 442-0220",
      url: "https://www.211rochester.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "nys-income-tax-installment-plan-ny",
    "earned-income-tax-credit-ny",
    "empire-state-child-credit-ny",
    "child-dependent-care-credit-ny",
    "home-business-sales-tax-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "NY estimated tax",
    "IT-2105",
    "TAX 658",
    "self-employed quarterly tax",
    "1099 estimated tax",
    "freelance tax NY",
    "safe harbor estimated",
    "TAX 685 underpayment",
    "annualized income method",
    "NY gig worker tax"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/TAX/658",
    "https://www.tax.ny.gov/pay/ind/pay_estimated_tax.htm"
  ],

  lastVerified: "2026-04-20",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "medium",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
