export const PRECEDENT = {
  id: "precedent",
  term: { en: "Precedent" },
  aka: ["Stare Decisis", "Case Law"],
  category: "courts",
  subtags: ["legal-research", "appeals"],

  context: {
    en: "Precedent is a court decision that becomes a rule for later cases on the same legal issue. Courts in New York usually follow precedent from higher courts in the same system. The principle is called stare decisis."
  },

  plainEnglish: {
    en: "A prior court decision that guides how later courts handle the same legal question. The principle is called stare decisis, Latin for 'to stand by what is decided.' Lower courts must follow binding precedent from higher courts in the same system. Federal trial courts follow Supreme Court rulings and the Court of Appeals decisions for their circuit. New York trial courts follow Court of Appeals (the highest state court) and Appellate Division rulings for their department. Persuasive precedent comes from courts in other systems or other departments and can be cited but does not bind. Precedent can be distinguished when the facts of the new case are meaningfully different. It can also be overruled by a higher court or by a later decision of the same court. Lawyers and judges spend much of their time finding the precedent that controls a case and arguing how it applies."
  },

  whatToAsk: {
    en: [
      "Is there binding precedent that decides this issue?",
      "Are the facts of this case different enough to distinguish the precedent?",
      "Is the precedent from a higher court in the same system?",
      "Has the precedent been overruled or limited by a later case?",
      "Where can I find the case opinions referenced as precedent?"
    ]
  },

  related: ["appeal", "burden-of-proof", "jurisdiction", "discovery"],
  legalEntryIds: [],

  citation: "NY common law; doctrine of stare decisis",
  sourceUrl: "https://www.law.cornell.edu/wex/precedent",
  lastVerified: "2026-04-26",
  status: "active"
};
