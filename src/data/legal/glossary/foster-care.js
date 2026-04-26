export const FOSTER_CARE = {
  id: "foster-care",
  term: { en: "Foster Care" },
  aka: ["Foster Placement"],
  category: "family",
  subtags: ["children", "child-welfare"],

  context: {
    en: "Foster care is when a child lives temporarily with someone other than the legal parent because of a child-welfare case. Foster parents can be relatives (kinship care) or non-relatives certified by the agency. The goal is usually reunification with the legal parent."
  },

  plainEnglish: {
    en: "Temporary out-of-home care for a child whose parent cannot safely care for the child at the moment. Foster placements happen after a Family Court order in an Article 10 child-welfare case, or by voluntary placement. Kinship care is foster care provided by a relative or close family friend. Non-relative foster parents are certified by the local department of social services or by an authorized voluntary agency. The legal goal is usually reunification — returning the child to the legal parent after the safety concerns are resolved. When reunification is not possible, the goal can shift to adoption, kinship guardianship, or another permanent plan. Foster parents receive a maintenance payment from the state to cover the child's basic needs. Children in foster care also have rights — to education, health care, contact with siblings, and a court-appointed attorney to represent their interests in Family Court."
  },

  whatToAsk: {
    en: [
      "What is the goal of this placement — reunification, adoption, or guardianship?",
      "What services are required of the legal parent before reunification?",
      "Are kinship foster placements being considered first?",
      "What rights do foster parents have during the case?",
      "Where can free legal advocacy be found for a parent or foster parent?"
    ]
  },

  related: ["child-protective-services", "termination-of-parental-rights", "guardianship", "best-interest-of-child"],
  legalEntryIds: [],

  citation: "NY Soc. Services Law Article 6, Title 1; NY FCA Article 10",
  sourceUrl: "https://ocfs.ny.gov/programs/fostercare/",
  lastVerified: "2026-04-26",
  status: "active"
};
