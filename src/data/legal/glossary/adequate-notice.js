// Glossary term: Adequate Notice
// Citation verified: 18 NYCRR § 358-2.2 (content requirements) and
// § 358-2.23 (timely notice — at least 10 days before effective date).
// A notice that is late, missing required content, or unclear can be
// challenged at a fair hearing.

export const ADEQUATE_NOTICE = {
  id: "adequate-notice",
  term: { en: "Adequate Notice" },
  aka: ["Notice of Intent", "Action Taken Notice"],
  category: "benefits",
  subtags: ["due-process"],

  context: {
    en: "You hear this when a benefits agency is going to change, reduce, or stop your benefits. The law says the agency has to send you a written notice that meets specific rules before the change can happen."
  },

  plainEnglish: {
    en: "A written notice from the benefits agency before it changes, reduces, or stops benefits. The law requires it to say exactly what is being changed, why, what rules apply, the effective date, and how to appeal. It has to be mailed at least 10 days before the change. If the notice is late, unclear, or missing required parts, the recipient can raise that at a fair hearing as a reason to overturn the action. Some emergency changes can happen on a shorter timeline, but those are limited."
  },

  whatToAsk: {
    en: [
      "Did the notice arrive at least 10 days before the change?",
      "Does it explain exactly what is changing and why?",
      "Does it list the rule or regulation the agency is using?",
      "Does it explain how to appeal and by when?",
      "Was anything in my case missed or wrong?"
    ]
  },

  related: ["fair-hearing", "aid-continuing", "snap", "medicaid", "temporary-assistance", "recoupment"],
  legalEntryIds: ["benefits-denial-appeal-ny"],

  citation: "18 NYCRR § 358-2.2; § 358-2.23",
  sourceUrl: "https://www.law.cornell.edu/regulations/new-york/18-NYCRR-358-2.2",
  lastVerified: "2026-04-15",
  status: "active"
};
