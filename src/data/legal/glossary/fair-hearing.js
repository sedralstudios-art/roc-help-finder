// Glossary term: Fair Hearing
// Citation verified: NY Social Services Law § 22; 18 NYCRR Part 358.
// Right to challenge a social services district's denial, reduction,
// termination, or failure to act. Hearings conducted by OTDA's Office
// of Administrative Hearings (OAH). Default format is telephone unless
// in-person is requested.

export const FAIR_HEARING = {
  id: "fair-hearing",
  term: { en: "Fair Hearing" },
  aka: ["Administrative Hearing", "OTDA Hearing"],
  category: "benefits",
  subtags: ["appeal", "due-process"],

  context: {
    en: "You hear this when someone's benefits — SNAP, Medicaid, Temporary Assistance, HEAP — are denied, reduced, cut off, or when the agency has not acted on an application. A fair hearing is the appeal."
  },

  plainEnglish: {
    en: "A free hearing at the state level where a person can challenge a decision made by their county's Department of Social Services. The applicant can ask for one if benefits are denied, reduced, stopped, or if the agency has not acted in time. The request can be made online, by phone, by fax, or by mail — the notice that prompted the appeal lists the deadline. A state hearing officer listens to both sides and writes a decision. The applicant has the right to a lawyer, to bring witnesses, to see the agency's evidence before the hearing, and to ask questions. Most hearings in New York are now held by phone, but an in-person hearing can be requested."
  },

  whatToAsk: {
    en: [
      "When is my deadline to request the hearing?",
      "Can I keep my benefits going while I wait — is aid continuing available?",
      "Can I get a free lawyer or advocate?",
      "How do I see the agency's file before the hearing?",
      "If I win, what does the agency have to do, and by when?"
    ]
  },

  related: ["aid-continuing", "adequate-notice", "snap", "medicaid", "temporary-assistance", "recoupment"],
  legalEntryIds: ["fair-hearing-ny", "benefits-denial-appeal-ny"],

  citation: "NY Soc. Services Law § 22; 18 NYCRR Part 358",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/SOS/22",
  lastVerified: "2026-04-15",
  status: "active"
};
