// Glossary term: Automatic Stay
// Citation verified: 11 U.S.C. § 362. Takes effect the instant a
// bankruptcy petition is filed. Halts most collection efforts including
// lawsuits, foreclosure, repossession, utility shutoffs, and garnishment.
// Willful violations expose creditors to sanctions and damages under
// § 362(k)(1). Relief from stay available for cause under § 362(d).

export const AUTOMATIC_STAY = {
  id: "automatic-stay",
  term: { en: "Automatic Stay" },
  aka: [],
  category: "consumer",
  subtags: ["bankruptcy", "debt", "court-filing"],

  context: {
    en: "You hear this the moment someone files for bankruptcy. It is what makes bankruptcy useful right away — the phone calls, lawsuits, and wage garnishments stop the same day. Creditors who ignore it can be sued for money damages."
  },

  plainEnglish: {
    en: "An order from federal bankruptcy law that stops most collection activity the instant a bankruptcy case is filed. No more calls, letters, lawsuits, garnishments, repossessions, utility shut-offs, or foreclosures while the stay is in place. A creditor who knows about the bankruptcy and keeps trying to collect can be sued for damages under the federal law. The stay does not cover everything — child support, criminal cases, and some tax matters still continue. Creditors can ask the bankruptcy court for permission to act against specific property (called 'relief from stay') in certain situations."
  },

  whatToAsk: {
    en: [
      "When does the stay start — the minute the case is filed?",
      "Does the stay cover my specific situation: garnishment, foreclosure, utility shutoff?",
      "If a creditor keeps calling me after filing, what do I do?",
      "Can a creditor ask the judge to lift the stay, and what would I do if they did?",
      "Is there any action I still need to take to protect myself?"
    ]
  },

  related: ["bankruptcy", "debt-collection", "wage-garnishment", "judgment"],
  legalEntryIds: ["bankruptcy-automatic-stay-ny"],

  citation: "11 U.S.C. § 362",
  sourceUrl: "https://www.law.cornell.edu/uscode/text/11/362",
  lastVerified: "2026-04-15",
  status: "active"
};
