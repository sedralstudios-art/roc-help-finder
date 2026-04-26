// Glossary term: Family Court (umbrella)
// Cited source: NY Family Court Act (FCA), the governing statute for the
// Family Court's jurisdiction. FCA handles custody, visitation, child
// support, family offenses, child abuse/neglect, PINS, juvenile delinquency,
// adoption, guardianship, paternity. Supreme Court and County Court handle
// divorce and related matrimonial issues — Family Court only takes the
// sub-issues referred to it.

export const FAMILY_COURT = {
  id: "family-court",
  term: { en: "Family Court" },
  aka: [],
  category: "family",
  subtags: ["court-system", "process"],

  context: {
    en: "You hear this when something comes up involving kids, custody, child support, or a family offense. Family Court handles those cases separately from the regular criminal or civil courts. Each county has its own Family Court."
  },

  plainEnglish: {
    en: "A special court in New York that handles most family-related cases. It hears custody, visitation, child support, family offense petitions (for orders of protection between family members), child abuse or neglect cases, PINS cases for kids who are out of control, juvenile delinquency, adoption, guardianship, and paternity. Family Court is civil, not criminal — even when a case involves violence or threats. There is no jury. A judge alone hears the case. If a parent wants a divorce, that is filed in Supreme Court, not Family Court, though Family Court may handle the child-related parts."
  },

  whatToAsk: {
    en: [
      "Which county's Family Court is my case in?",
      "Do I need a lawyer, and can I get one for free?",
      "How long do cases like mine usually take?",
      "Can a Family Court order be changed later?",
      "If there is also a criminal case, how do the two courts coordinate?"
    ]
  },

  related: ["custody", "child-support", "visitation", "article-10", "pins"],
  legalEntryIds: ["custody-basics-ny", "child-support-ny", "order-of-protection-ny"],

  citation: "NY Family Court Act (FCA)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/FCT",
  lastVerified: "2026-04-15",
  status: "active"
};
