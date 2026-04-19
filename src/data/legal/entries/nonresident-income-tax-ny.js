export const NONRESIDENT_INCOME_TAX_NY = {
  id: "nonresident-income-tax-ny",
  category: "employment",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY TAX 631",
  status: "active",

  title: { en: "NY Income Tax for Nonresidents — Tax Law 631 and the Convenience of the Employer Rule for Remote Workers" },

  summary: {
    en: "New York Tax Law Section 631 taxes nonresidents on their New York-source income. NY's aggressive interpretation — the 'convenience of the employer' rule codified in 20 NYCRR 132.18 — treats a remote worker as earning NY-source income for any day worked from home unless the employer required the out-of-state work for the employer's necessity, not the employee's convenience. A New Jersey resident working from home for a NYC employer typically owes NY income tax on 100 percent of wages. Since 2021, several NY-NJ and NY-CT tax disputes have been in litigation. The Zelinsky and similar cases are ongoing. Filing Form IT-203 declares nonresident status; Form IT-2104.1 sets employer withholding."
  },

  whoQualifies: {
    en: [
      "A non-NY resident who works for a New York employer.",
      "A remote worker in NJ, CT, PA, MA, or elsewhere whose employer is based in NY.",
      "An independent contractor providing services to a NY business from outside NY.",
      "A former NY resident who moved mid-year and must file both IT-201 (resident) and IT-203 (nonresident) for that year.",
      "A taxpayer who earns NY-source rental income, partnership income, or royalties without being a NY resident.",
      "A professional athlete or entertainer performing in NY without being a NY resident."
    ]
  },

  whatItMeans: {
    en: "New York Tax Law Section 631 defines a nonresident's New York adjusted gross income as the sum of all items of income, gain, loss, and deduction entering into federal AGI that are derived from or connected with New York sources. The definition is expansive: wages, salaries, fees, and commissions for services performed in New York; income from a business, trade, profession, or occupation carried on in New York; income from real or tangible personal property located in New York; and gain or loss from the sale or exchange of real property located in New York or an interest in a NY entity. Wages for services performed partly in NY and partly elsewhere are typically allocated based on working days in NY versus total working days (Tax Law 631(c), regulations at 20 NYCRR 132.18). Convenience of the employer rule (20 NYCRR 132.18(a)): if a nonresident employee works partly in New York and partly outside New York, the employee must allocate wages based on working days in each location. BUT — if the out-of-state work is performed at the employee's own home or office not at an employer-required location, the regulation treats those days as NY working days 'unless performed at a bona fide employer office outside New York.' The test for a 'bona fide employer office' is strict: the out-of-state office must be available for the employee's use, maintained at the employer's expense, used by multiple people, and the employer's business must require (rather than merely permit) the out-of-state work. This is the 'convenience rule' — if the out-of-state work is for the convenience of the employee (not the necessity of the employer), the wages are NY-source regardless of physical location. Post-pandemic litigation: the convenience rule has been challenged in numerous cases — Zelinsky v. Tax Appeals Tribunal (2003) upheld the rule against a Connecticut-resident law professor who taught at Cardozo School of Law. Post-COVID, many NJ, CT, and PA residents who began working fully from home discovered they still owed NY tax. NY DOT&F has not retreated from its convenience-rule position. Tax Law 631(b) partial-residence transition: a taxpayer who changes state residence during a tax year files both IT-201 (resident portion) and IT-203 (nonresident portion). The split-year return allocates income, deductions, and credits between the two portions. A move requires demonstrable intent — change of address, new driver's license, new voter registration, closing NY bank accounts, and physical relocation of life. A NYer who claims to have moved to Florida on paper but maintains NY ties remains subject to audit. The 183-day rule: a person who maintains a permanent place of abode in NY and spends 183+ days in the state is a NY resident for tax purposes regardless of domicile claim (Tax Law 605(b)(1)(B)). Day-counting is tracked through the 'statutory resident' test — this is how NY catches Florida-domicile snowbirds with NY apartments. Credits for tax paid to other states (Tax Law 620): if NY taxes the same income as another state, NY gives a credit for tax paid to the other state — avoiding double taxation. Typical example: a NJ resident who pays NJ income tax on all wages and also pays NY tax under the convenience rule. NJ gives credit for NY tax paid under NJ's statute (NJSA 54A:4-1). Net result: tax paid is roughly equal to the higher of the two states' rates. Employer withholding (Form IT-2104.1): an employer who employs a nonresident performing some work in NY must withhold NY income tax on the NY-source wages. Employees complete Form IT-2104.1 indicating the allocation of working days. Under-withholding by the employer can create taxpayer surprise at filing. Remote workers should verify withholding matches expected NY-source percentage. Special categories: (1) partnership and LLC income — a nonresident partner in a NY partnership is taxed on the NY-source portion of distributive share under Tax Law 631(a)(1)(D). (2) S-corporation — nonresident shareholders follow partnership-like rules. (3) Professional athletes — duty days rule under Tax Law 631(a)(1)(B) allocates wages based on days played or practiced in NY. (4) Entertainers and performing artists — similar duty-day allocation. (5) Pension income — NY does not tax pension income of nonresidents (federal law preempts), so a retiree moving from NY to FL pays no NY tax on pensions going forward. (6) Investment income — interest, dividends, and non-NY capital gains are not NY-source for nonresidents. Nonresident real estate: selling NY real estate as a nonresident triggers withholding under Tax Law 663 — 8.82 percent of the gain is withheld at closing unless an exemption certificate (TP-584) applies. Audits: NY aggressively audits residency and convenience-rule claims. A 2019-2023 statewide audit program targeted high-earning remote workers. Retention of travel records, calendars, and home-office documentation is essential. Litigation posture: several nonresident tax cases are pending appeal in the Division of Tax Appeals and the Appellate Division. A NY legislature effort to repeal the convenience rule has been introduced repeatedly but not enacted. Taxpayers paying under protest can follow normal refund claim procedures (Tax Law 687) while the legal landscape evolves."
  },

  yourRights: {
    en: [
      "A nonresident has the right to file Form IT-203 and pay NY income tax only on NY-source income (Tax Law 631).",
      "A taxpayer has the right to claim a credit for tax paid to other states on the same income (Tax Law 620).",
      "An employer has the duty to withhold NY tax on NY-source wages of nonresidents.",
      "A taxpayer has the right to file Form IT-2104.1 to direct employer withholding based on expected work-location allocation.",
      "A taxpayer has the right to appeal residency or source determinations to the Division of Tax Appeals.",
      "A nonresident selling NY real estate has the right to claim exemption from Tax Law 663 withholding if a gain exception applies.",
      "A former NY resident has the right to file a split-year return (both IT-201 and IT-203) for the year of move.",
      "A taxpayer has the right to pay under protest and seek refund while challenging the convenience rule."
    ]
  },

  legalOptions: {
    en: [
      "NYS Department of Taxation and Finance Nonresident Help at (518) 457-5181 — residency determinations and nonresident filing.",
      "NYS Division of Tax Appeals at (518) 266-3000 — formal appeal of residency and source determinations.",
      "NYS Taxpayer Rights Advocate at (518) 530-4357 — hardship and audit escalation.",
      "Monroe County Bar Association Lawyer Referral at (585) 546-2130 — tax attorneys for multi-state residency disputes.",
      "NJ Division of Taxation at (609) 292-6400 — credit for tax paid to NY coordination.",
      "CT Department of Revenue Services at (860) 297-5962 — credit for tax paid to NY coordination.",
      "IRS at (800) 829-1040 — federal filing for cross-border workers."
    ]
  },

  example: {
    en: "A New Jersey resident took a job with a Rochester-based software company in 2022, working fully remotely from his home in Hoboken. His employer had no New Jersey office. He filed 2023 returns as a NJ resident and a NY nonresident. Using Form IT-203 he allocated zero working days in NY, arguing all work was performed in NJ. NYS audited and applied the convenience of the employer rule: because the NJ work location was the employee's own home and the employer did not require (but merely permitted) remote work, all wages were deemed NY-source. The audit assessed back taxes plus interest of $23,400. The employee paid under protest, filed for refund, and joined a multi-taxpayer challenge pending in the Division of Tax Appeals. In the meantime, NJ credited his NJ income tax for the NY tax paid, so his total state tax burden matched the NY rate. His company ultimately negotiated for the employee to work two days per week at a shared co-working space in Princeton NJ that qualified as a 'bona fide employer office' under regulations — reducing his NY-source exposure for future years."
  },

  counsel: [
    {
      type: "referral",
      name: "Monroe County Bar Association Lawyer Referral",
      focus: "Multi-state tax residency, nonresident audits, convenience rule challenges",
      qualifier: "Any Monroe County party with a multi-state tax matter",
      access: "Phone at (585) 546-2130",
      outcome: "30-minute consultation with a tax attorney, hourly representation",
      phone: "(585) 546-2130",
      url: "https://www.mcba.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "agency",
      name: "NYS Department of Taxation and Finance Taxpayer Assistance",
      focus: "Nonresident filing assistance, IT-203 questions, withholding",
      qualifier: "Any taxpayer with NY filing obligations",
      access: "Phone at (518) 457-5181 or online at tax.ny.gov",
      outcome: "Filing guidance, withholding adjustments, audit case referral",
      phone: "(518) 457-5181",
      url: "https://www.tax.ny.gov",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "nys-income-tax-installment-plan-ny",
    "independent-contractor-misclass-ny",
    "irs-offer-in-compromise-ny",
    "wage-payment-frequency-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "nonresident NY tax",
    "Tax Law 631",
    "convenience of the employer rule",
    "20 NYCRR 132.18",
    "Form IT-203",
    "Form IT-2104.1 withholding",
    "Zelinsky v Tax Appeals Tribunal",
    "bona fide employer office test",
    "split-year residency change",
    "credit for tax paid other state Tax Law 620"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/TAX/631",
    "https://www.nysenate.gov/legislation/laws/TAX/620",
    "https://www.nysenate.gov/legislation/laws/TAX/663",
    "https://www.tax.ny.gov/forms/it203_2023_fillin.htm",
    "https://www.tax.ny.gov/pit/file/nonresident_faqs.htm"
  ],

  lastVerified: "2026-04-18",
  volatility: "medium",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
