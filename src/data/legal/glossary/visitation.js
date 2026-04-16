// Glossary term: Visitation / Parenting Time
// Citation: NY Family Court Act § 651 (custody/visitation jurisdiction);
// Domestic Relations Law § 240 (best-interests standard, same as custody).
// Preferred current term is "parenting time" — courts increasingly use
// this framing, though statute still says "visitation."

export const VISITATION = {
  id: "visitation",
  term: { en: "Visitation" },
  aka: ["Parenting Time", "Access"],
  category: "family",
  subtags: ["children", "process"],

  context: {
    en: "You hear this when parents live apart and the court needs to set up when each parent sees the kids. Many courts and lawyers now use the words 'parenting time' instead of 'visitation' because both parents are parents — not visitors."
  },

  plainEnglish: {
    en: "The time a child spends with a parent who does not have primary physical custody. A court order sets out the schedule — which days, what times, how holidays and summers work, how pick-ups and drop-offs happen. Same standard as custody: the best interests of the child. In some cases, visits are supervised by another adult or at a supervised-visitation program. If a parent is blocked from their court-ordered time, they can go back to court to enforce it. Visitation is separate from child support — blocked visits do not excuse unpaid support, and unpaid support does not end the right to see the child."
  },

  whatToAsk: {
    en: [
      "What schedule am I asking for — or does the other parent want?",
      "Can the visits be supervised if there are safety concerns?",
      "What happens if the other parent does not follow the order?",
      "Can the schedule change when the child gets older or schedules shift?",
      "Does missing a visit affect child support?"
    ]
  },

  related: ["custody", "child-support", "family-court", "family-offense-petition"],
  legalEntryIds: ["custody-basics-ny"],

  citation: "NY FCA § 651; DRL § 240",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/FCT/651",
  lastVerified: "2026-04-15",
  status: "active"
};
