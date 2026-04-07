export const CHILD_SUPPORT_NY = {
  id: "child-support-ny",
  category: "family",
  tier: "state",
  jurisdiction: "ny",
  status: "active",

  title: { en: "Child Support — How New York Calculates What a Parent Pays" },

  summary: {
    en: "In New York, child support is calculated using a formula set by the Child Support Standards Act. The formula is based on both parents' combined income and the number of children. The noncustodial parent pays their share of the total obligation. Child support continues until the child turns 21 — not 18."
  },

  whoQualifies: {
    en: [
      "Either parent of a minor child may petition for child support in Family Court, whether married, divorced, separated, or never married.",
      "A custodial parent, a legal guardian, or a government agency may file a petition for child support against a noncustodial parent.",
      "Child support obligations generally continue until the child turns 21, unless the child is emancipated earlier through marriage, military service, or full-time self-support.",
      "Parents who already have a child support order may petition for modification if there has been a substantial change in circumstances, at least three years have passed since the last order, or either parent's income has changed by 15% or more."
    ]
  },

  whatItMeans: {
    en: "Under the Child Support Standards Act (DRL § 240(1-b) and FCA § 413), New York uses fixed percentages of combined parental income. The rates are 17% for one child, 25% for two, 29% for three, 31% for four, and at least 35% for five or more. These percentages apply to combined income up to a cap amount that is updated every two years by the state. The obligation is then split between the parents based on each parent's share of the combined income. The noncustodial parent pays their share to the custodial parent. The current income cap and self-support reserve are published in the Child Support Standards Chart at childsupport.ny.gov."
  },

  yourRights: {
    en: [
      "You have the right to petition Family Court for a child support order at any time. There is no filing fee for child support petitions in Family Court.",
      "You have the right to have child support calculated using the CSSA formula. Any agreement or order that deviates from the formula must state what the guideline amount would have been and explain the reasons for the deviation.",
      "You have the right to have certain expenses added on top of basic support, including childcare costs needed for work or school, health insurance premiums for the child, and unreimbursed medical expenses — split proportionally between both parents.",
      "You have the right to enforcement if the other parent does not pay. Enforcement tools include automatic income withholding from wages, tax refund intercepts, license suspension, liens on property, and contempt of court proceedings.",
      "You have the right to request a modification of an existing order if circumstances have substantially changed, three years have passed, or either parent's income has changed by 15% or more.",
      "A paying parent's support obligation cannot be set below the self-support reserve — a threshold tied to the federal poverty level that is updated periodically and published in the Child Support Standards Chart."
    ]
  },

  legalOptions: {
    en: [
      "Child support petitions may be filed in Family Court in the county where the child lives or where the noncustodial parent lives. There is no filing fee. Family Court petition forms are available at nycourts.gov.",
      "The New York State Office of Temporary and Disability Assistance (OTDA) operates the Division of Child Support Services, which helps parents establish, modify, and enforce child support orders. Services are available through local Department of Social Services offices and at childsupport.ny.gov.",
      "Under FCA § 413, the court must apply the CSSA formula to combined parental income up to the statutory cap. For income above the cap, the court considers additional factors including the child's standard of living, the parents' financial resources, and the child's needs.",
      "Income withholding is the primary enforcement method. Under FCA § 5241, courts issue income withholding orders that go directly to the paying parent's employer. If the parent is self-employed or does not comply, the court may pursue other enforcement methods including contempt.",
      "Free legal help for child support cases in Monroe County is available through the Legal Aid Society of Rochester at (585) 232-4090 and Legal Assistance of Western New York (LawNY) at (585) 325-2520.",
      "The Child Support Standards Chart, updated periodically with the current income cap and self-support reserve, is published by OTDA at childsupport.ny.gov/pdfs/CSSA.pdf."
    ]
  },

  example: {
    en: "Tameka and Marcus have one child and are separating in Ontario County. Tameka earns $45,000 a year and Marcus earns $30,000. Their combined income is $75,000. The CSSA percentage for one child is 17%, making the total basic obligation $12,750 per year. Tameka earns 60% of the combined income and Marcus earns 40%. Since Tameka has primary custody, Marcus pays his 40% share — $5,100 per year, or about $425 per month. Marcus also pays his proportional share of daycare costs and the child's health insurance."
  },

  counsel: [
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Family law, child support, custody, orders of protection",
      qualifier: "Low income residents of Monroe County and surrounding counties",
      access: "Phone intake at (585) 232-4090",
      outcome: "Direct representation in Family Court proceedings",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Assistance of Western New York (LawNY)",
      focus: "Family law, child support, custody, domestic violence",
      qualifier: "Low income residents in 14 Western NY counties including Monroe",
      access: "Phone intake at (585) 325-2520",
      outcome: "Direct representation in family law matters",
      phone: "(585) 325-2520",
      url: "https://www.lawny.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Empire Justice Center",
      focus: "Family law, systemic advocacy, impact litigation",
      qualifier: "Low and moderate income residents statewide (all NYS counties except NYC)",
      access: "Phone intake at (585) 454-4060",
      outcome: "Direct representation, impact litigation, and policy advocacy",
      phone: "(585) 454-4060",
      url: "https://www.empirejustice.org",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "custody-basics-ny",
    "order-of-protection-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "child support",
    "how much child support",
    "child support calculator",
    "not paying child support",
    "child support enforcement",
    "child support modification",
    "behind on child support",
    "child support order",
    "custody and support",
    "paying for my kids",
    "ex won't pay support",
    "support until 21",
    "family court support"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/DOM/240",
    "https://codes.findlaw.com/ny/family-court-act/fct-sect-413/",
    "https://childsupport.ny.gov/pdfs/CSSA.pdf",
    "https://childsupport.ny.gov/",
    "https://www.nycourts.gov/"
  ],

  lastAudited: "2026-04-04",
  lastVerifiedBy: "Claude + Tony",
  volatility: "moderate",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
