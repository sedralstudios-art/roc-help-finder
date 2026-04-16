// Glossary term: Recoupment
// Citation verified: 18 NYCRR § 387.19 (SNAP overpayments); NY Soc.
// Services Law § 106-b (Temporary Assistance overpayments — 10% cap,
// reducible to 5% on hardship showing). Federal Treasury Offset Program
// can collect closed-case SNAP balances from federal tax refunds.

export const RECOUPMENT = {
  id: "recoupment",
  term: { en: "Recoupment" },
  aka: ["Overpayment Recovery"],
  category: "benefits",
  subtags: ["money", "overpayment"],

  context: {
    en: "You hear this when a benefits agency says you got too much money in the past and is taking it back from your current benefits. It can happen because of an agency error, a missed report, or a change that was not caught in time."
  },

  plainEnglish: {
    en: "When a benefits agency reduces your current benefits to pay back benefits you got earlier but were not entitled to. For Temporary Assistance, the reduction is 10% of the monthly grant. You can ask for that to be dropped to 5% if 10% causes hardship — you have to show expenses are more than income. For SNAP, the reduction comes out of the monthly benefit too. If your case is closed, the unpaid amount can be taken from a federal tax refund. Every recoupment has to start with a written notice, and you can challenge the amount or the reason at a fair hearing."
  },

  whatToAsk: {
    en: [
      "What is the total amount the agency says I owe?",
      "Why does the agency say I was overpaid — what exactly happened?",
      "Can I see how the amount was calculated?",
      "Can I ask for the reduction to be lowered because of hardship?",
      "Did I get an adequate written notice before recoupment started?"
    ]
  },

  related: ["fair-hearing", "aid-continuing", "adequate-notice", "snap", "medicaid", "temporary-assistance"],
  legalEntryIds: ["benefit-overpayment-ny"],

  citation: "18 NYCRR § 387.19 (SNAP); NY Soc. Services Law § 106-b (TA)",
  sourceUrl: "https://www.law.cornell.edu/regulations/new-york/18-NYCRR-387.19",
  lastVerified: "2026-04-15",
  status: "active"
};
