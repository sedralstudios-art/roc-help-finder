export const SHAREHOLDER_DERIVATIVE_LAWSUIT_NY = {
  id: "shareholder-derivative-lawsuit-ny",
  category: "consumer",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY BSC 626",
  status: "active",

  title: { en: "Shareholder Derivative Lawsuit — Suing on Behalf of a Corporation for Breach by Insiders" },

  summary: {
    en: "When officers or directors of a New York corporation harm the corporation through self-dealing, fraud, waste, or breach of duty, a shareholder can file a derivative lawsuit under Business Corporation Law Section 626. The suit is brought in the corporation's name, and any recovery goes to the corporation (not the individual shareholder). Strict pre-suit demand and standing rules apply."
  },

  whoQualifies: {
    en: [
      "A current shareholder of a NY corporation who held stock at the time of the alleged wrong (contemporaneous ownership rule).",
      "A minority shareholder in a closely held corporation where the majority owner has diverted corporate assets.",
      "A shareholder in a larger corporation who believes directors breached fiduciary duties (reckless investment, self-dealing transactions).",
      "A shareholder in a family business where one branch has been receiving improper distributions.",
      "A member of an LLC under analogous rights in Limited Liability Company Law 610-616.",
      "A benefit corporation shareholder under BCL 1707 challenging abandonment of the public benefit purpose."
    ]
  },

  whatItMeans: {
    en: "Business Corporation Law Section 626 governs shareholder derivative actions for NY corporations. Purpose: a derivative suit is brought by a shareholder on behalf of the corporation when the board refuses or is conflicted from pursuing a valid corporate claim — typically against directors or officers for breach of fiduciary duty, self-dealing, waste of corporate assets, usurpation of corporate opportunity, or fraud. The corporation is a nominal defendant; any recovery belongs to the corporation. Contemporaneous ownership (BCL 626(b)): the plaintiff shareholder must have owned shares at the time of the wrong or have acquired shares through operation of law (inheritance, marital division) from a prior holder. A shareholder who bought in after the wrong cannot sue. Pre-suit demand (BCL 626(c)): the shareholder must either (a) make a formal written demand on the board to bring suit, giving the board a reasonable time to act, or (b) plead in the complaint with particularity the reasons demand would be futile. Demand futility typically means a majority of the board is conflicted — they are defendants, they approved the challenged transaction, or they are so closely related to the wrongdoers they cannot impartially evaluate the demand. The Marx v. Akers framework (NY Ct. App. 1996) sets the standard: futility must be shown for the majority of the board as constituted at the time of filing. Board response to demand: the board may refuse the demand, investigate and refuse, or form a special litigation committee (SLC). A refusal is reviewed under the business judgment rule — courts defer unless the refusal itself was irrational or in bad faith. SLC recommendation to dismiss is reviewed under Auerbach v. Bennett (NY Ct. App. 1979): courts review the SLC's independence, the adequacy of the investigation, and the good-faith basis for its conclusions. If the SLC meets these standards, its recommendation binds the court. Standing to settle: once filed, a derivative action cannot be settled or discontinued without court approval and notice to other shareholders (BCL 626(d)). Attorney fees: a successful plaintiff can recover attorneys' fees from the corporation if the suit confers a substantial benefit on the corporation (BCL 626(e)). Direct vs derivative distinction: a claim is derivative when the harm is primarily to the corporation; direct when the harm is primarily to the individual shareholder (denial of voting rights, failure to honor buyback, discrimination among shareholders). Tooley v. Donaldson (Delaware precedent influential in NY) asks who suffered the harm and who would receive the remedy. Close corporations: in a small closely held NY corporation, many disputes can be brought directly rather than derivatively under the oppression doctrine (BCL 1104-a), where a minority shareholder seeks dissolution for oppressive acts by the majority. Forum: NY Supreme Court Commercial Division for larger cases, regular Supreme Court for smaller. Securities class actions under federal law (PSLRA) are separate from NY derivative actions."
  },

  yourRights: {
    en: [
      "A shareholder has standing to sue derivatively if they owned shares at the time of the wrong (BCL 626(b)).",
      "A shareholder has the right to demand the board bring suit or to plead demand futility (BCL 626(c)).",
      "A shareholder has the right to notice of any proposed settlement and to object (BCL 626(d)).",
      "A successful shareholder-plaintiff has the right to recover attorneys' fees from the corporation (BCL 626(e)).",
      "A minority shareholder in a closely held corporation has additional remedies under BCL 1104-a (oppression doctrine).",
      "A shareholder has the right to corporate books and records under BCL 624 to investigate claims.",
      "An LLC member has analogous derivative rights under LLC Law 610-616."
    ]
  },

  legalOptions: {
    en: [
      "Monroe County Supreme Court Commercial Division at (585) 371-3758 — filings for business disputes.",
      "Monroe County Bar Association Lawyer Referral at (585) 546-2130 — business litigation attorneys.",
      "NY State Bar Association Business Law Section at (518) 463-3200 — practitioner resources.",
      "NYS Office of the Attorney General Charities Bureau at (518) 776-2160 — for nonprofit corporation issues.",
      "NY State Department of State Division of Corporations at (518) 473-2492 — corporate records.",
      "Small Business Development Center at (585) 697-1775 — general business advice, not litigation.",
      "NYCLU at (212) 607-3300 — for public benefit corporation public-mission disputes."
    ]
  },

  example: {
    en: "A minority shareholder (20%) in a Rochester family-owned manufacturing corporation discovered that the two majority shareholder brothers who sat on the 3-person board had paid themselves $2.5 million in total bonuses over three years while the corporation's retained earnings declined and no dividends were paid. She demanded, through counsel, that the board investigate and recover the excess compensation. The board (controlled by the two brothers) refused. She filed a derivative action in Monroe County Supreme Court under BCL 626, alleging demand futility because the majority of the board consisted of the two defendants. The court denied the motion to dismiss. Discovery revealed the bonuses were not approved by a disinterested vote. The case settled for $1.4 million paid back to the corporation, plus attorneys' fees of $210,000 paid to her counsel under BCL 626(e). The minority shareholder's own interest was indirect — her 20% of $1.4 million recovery accrued to corporate value."
  },

  counsel: [
    {
      type: "referral",
      name: "Monroe County Bar Association Lawyer Referral",
      focus: "Business litigation, derivative and direct shareholder claims, minority oppression",
      qualifier: "Any Monroe County shareholder or business",
      access: "Phone at (585) 546-2130",
      outcome: "30-minute consultation, then contingency or hourly representation",
      phone: "",
      url: "https://www.mcba.org",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "referral",
      name: "NY State Bar Association Business Law Section",
      focus: "Complex corporate litigation, multi-jurisdictional matters",
      qualifier: "Any NY resident or business",
      access: "Phone at (518) 463-3200",
      outcome: "Referral to experienced business litigators",
      phone: "",
      url: "https://nysba.org",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "small-claims-procedure-ny",
    "consumer-arbitration-clause-ny-cl",
    "commercial-eviction-process-ny",
    "bankruptcy-chapter13-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "shareholder derivative",
    "BCL 626",
    "BCL 624",
    "BCL 1104-a",
    "fiduciary duty",
    "demand futility",
    "contemporaneous ownership",
    "special litigation committee",
    "minority oppression",
    "LLC derivative"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/BSC/626",
    "https://www.nysenate.gov/legislation/laws/BSC/624",
    "https://www.nysenate.gov/legislation/laws/BSC/1104-A"
  ],

  lastVerified: "2026-04-18",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
