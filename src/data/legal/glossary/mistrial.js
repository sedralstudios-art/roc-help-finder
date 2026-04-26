export const MISTRIAL = {
  id: "mistrial",
  term: { en: "Mistrial" },
  aka: [],
  category: "courts",
  subtags: ["trial", "procedure"],

  context: {
    en: "A mistrial is when a judge ends a trial before a verdict because something has gone wrong that cannot be fixed. It can happen because of a hung jury, a serious mistake, juror misconduct, or an emergency that makes continuing impossible."
  },

  plainEnglish: {
    en: "An order from the judge that ends a trial before a verdict is reached. The most common reason is a hung jury — the jurors cannot agree after long deliberation. Other reasons include serious mistakes during the trial that cannot be corrected, juror misconduct, prejudicial evidence reaching the jury that should have been kept out, or an emergency like the death or illness of a participant. After a mistrial, the case is usually retried with a new jury. Double jeopardy generally does not bar a retrial when the mistrial was caused by a hung jury or by manifest necessity. But if the mistrial was caused by intentional misconduct by the prosecutor — meant to provoke the defense into asking for a mistrial — double jeopardy can bar a retrial. The defense lawyer is the best source on whether to ask for a mistrial when something goes wrong, since the choice can have major strategic effects."
  },

  whatToAsk: {
    en: [
      "What caused the mistrial in this case?",
      "Will the case be retried, and when?",
      "Could double jeopardy bar a retrial here?",
      "What was the jury split, if it was a hung jury?",
      "Should I push for dismissal or accept a retrial?"
    ]
  },

  related: ["jury-duty", "voir-dire", "burden-of-proof", "speedy-trial"],
  legalEntryIds: [],

  citation: "NY CPL § 280.10 (declaration of mistrial); Fifth Amendment (double jeopardy)",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/CPL/280.10",
  lastVerified: "2026-04-26",
  status: "active"
};
