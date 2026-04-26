export const DIVORCE = {
  id: "divorce",
  term: { en: "Divorce" },
  aka: ["Marital Dissolution", "No-Fault Divorce"],
  category: "family",
  subtags: ["dissolution", "marriage"],

  context: {
    en: "Divorce is the legal end of a marriage. New York allows no-fault divorce — neither spouse has to prove the other did anything wrong. The case is filed in Supreme Court."
  },

  plainEnglish: {
    en: "A court order that legally ends a marriage. New York is a no-fault divorce state — one spouse can file by stating under oath that the marriage has been irretrievably broken for at least 6 months. The court still has to handle property division, debts, spousal support, and any issues involving children (custody, visitation, child support). An uncontested divorce, where both spouses agree on every issue, is the simplest path. A contested divorce, where the spouses disagree on one or more issues, takes longer and usually requires court appearances. Filing fees and process-service costs apply, but a fee waiver is available for low-income filers. Free legal help with divorce is available through Legal Aid Society of Rochester and other local organizations."
  },

  whatToAsk: {
    en: [
      "Is this divorce uncontested or contested?",
      "What are the residency requirements to file in New York?",
      "How are marital property and debts divided?",
      "What happens to custody, visitation, and child support during the case?",
      "Can the filing fee be waived for a low-income filer?"
    ]
  },

  related: ["custody", "visitation", "child-support", "alimony", "affidavit"],
  legalEntryIds: ["uncontested-divorce-ny"],

  citation: "NY DRL § 170 (grounds for divorce)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/DOM/170",
  lastVerified: "2026-04-26",
  status: "active"
};
