export const DEFENDANT = {
  id: "defendant",
  term: { en: "Defendant" },
  aka: ["Respondent"],
  category: "courts",
  subtags: ["procedure", "civil", "criminal"],

  context: {
    en: "The defendant is the person being sued in a civil case or charged in a criminal case. In Family Court, the same role is called the respondent."
  },

  plainEnglish: {
    en: "The party who is being sued or charged. In a civil case, the defendant must answer the plaintiff's complaint within a set time — usually 20 to 30 days depending on the kind of case. In a criminal case, the defendant is the person charged with a crime and is presumed innocent until proven guilty. Failing to answer a civil complaint in time can lead to a default judgment in the plaintiff's favor. In Family Court, the defendant is called the respondent. In administrative hearings, similar roles can have other names. The defendant has the right to be represented by a lawyer at every stage. In criminal cases where jail is possible, a free public defender is available. In civil cases, free representation is available through Legal Aid for income-eligible parties."
  },

  whatToAsk: {
    en: [
      "When is my answer due, and what happens if I miss the deadline?",
      "Can I get a free lawyer for this case?",
      "What defenses might I raise — including affirmative defenses?",
      "Can I file a counterclaim against the plaintiff?",
      "What is the worst outcome if I lose this case?"
    ]
  },

  related: ["plaintiff", "summons", "default-judgment", "affirmative-defense", "public-defender"],
  legalEntryIds: ["respond-to-lawsuit-ny"],

  citation: "NY CPLR Article 30 (civil parties); NY CPL Article 1 (criminal)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CVP/A30",
  lastVerified: "2026-04-26",
  status: "active"
};
