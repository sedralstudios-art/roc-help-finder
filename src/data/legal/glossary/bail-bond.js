export const BAIL_BOND = {
  id: "bail-bond",
  term: { en: "Bail Bond" },
  aka: ["Surety Bond", "Bondsman Bond"],
  category: "criminal",
  subtags: ["release", "pre-trial"],

  context: {
    en: "A bail bond is a way to post bail without paying the full cash amount. A licensed bail bondsman pledges the full bail in exchange for a non-refundable premium from the defendant or a relative, plus collateral in larger cases."
  },

  plainEnglish: {
    en: "A surety arrangement that lets a defendant post bail without paying the entire cash amount up front. A licensed bail bondsman pledges the full bail to the court in exchange for a fee from the defendant or a family member. New York caps the bondsman's premium under Insurance Law § 6804 and the rate schedule set by DFS — generally 10 percent on the first portion of the bail, with lower rates on larger amounts. The premium is not refundable, even if the case ends in the defendant's favor. For larger bonds, the bondsman often requires collateral — a deed, a car title, or other property. If the defendant misses a court date, the bondsman can be held liable for the full bail and may hire bounty hunters to bring the defendant in. New York also allows other forms of bail — cash, partially secured bonds, and unsecured bonds — and judges have used these more often since the 2020 bail reforms."
  },

  whatToAsk: {
    en: [
      "What forms of bail did the judge set, and what does each require?",
      "Is a bail bond cheaper or more expensive than other options for this amount?",
      "What is the bondsman's premium, and what collateral is required?",
      "What happens if the defendant misses a court date?",
      "Is the bondsman licensed, and where can the license be verified?"
    ]
  },

  related: ["bail", "ror", "arraignment", "bench-warrant"],
  legalEntryIds: [],

  citation: "NY CPL § 510.10 (forms of bail); NY Insurance Law § 6804",
  sourceUrl: "https://www.nysenate.gov/legislation/laws/ISC/6804",
  lastVerified: "2026-04-26",
  status: "active"
};
