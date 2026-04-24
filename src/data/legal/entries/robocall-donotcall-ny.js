export const ROBOCALL_DONOTCALL_NY = {
  id: "robocall-donotcall-ny",
  category: "consumer",
  tier: "federal",
  jurisdiction: "us-ny",
  authorityType: "federal-statute",
  primaryStatute: "47 USC 227",
  status: "active",

  title: { en: "Robocalls, Spam Calls, and the Do Not Call Registry" },

  summary: {
    en: "Unwanted robocalls and spam calls are not just annoying — many are illegal. The federal Telephone Consumer Protection Act (TCPA) and the Do Not Call Registry give consumers the right to stop most telemarketing calls. Scam robocalls impersonating government agencies, banks, or utilities are illegal under both federal and state law. Reporting them helps enforcement agencies shut them down."
  },

  whoQualifies: {
    en: [
      "Anyone receiving unwanted telemarketing calls, robocalls, or spam texts.",
      "Anyone receiving calls from scammers impersonating the IRS, Social Security, a utility company, or a bank.",
      "Anyone who has registered on the Do Not Call list and is still receiving telemarketing calls."
    ]
  },

  whatItMeans: {
    en: "Two federal laws and one New York statute combine to regulate unwanted calls. The federal Telephone Consumer Protection Act (TCPA, 47 USC 227) is the core rule. The Do Not Call Implementation Act (part of the Federal Trade Commission Act) runs the National Do Not Call Registry. New York General Business Law 349 adds state-level prohibitions on deceptive practices, which covers most scam calls.\n\nWhat the TCPA prohibits. Pre-recorded marketing calls (robocalls) to cell phones without prior written consent are illegal. Auto-dialed calls to cell phones without consent are illegal. Telemarketing calls to residential numbers on the Do Not Call Registry are illegal with narrow exceptions. Text messages are treated like calls under the TCPA — auto-sent marketing texts to cell phones require prior written consent.\n\nThe National Do Not Call Registry. The registry is operated by the Federal Trade Commission at donotcall.gov. Registration is free, does not expire, and takes about 31 days to take effect. After registration, telemarketers cannot call the registered number. Each illegal call after the 31-day window is a violation. Registering is done online or by calling (888) 382-1222 from the number to be registered.\n\nWhat is NOT covered by the registry. The Do Not Call Registry does not stop calls from political campaigns (protected First Amendment speech), charities with which the person has no existing relationship, surveys (not selling anything), or companies with an existing business relationship. It also does not stop scam calls — scam callers ignore the law regardless.\n\nStatutory damages for TCPA violations. The TCPA creates a private right of action for consumers. Damages are $500 per violation, or up to $1,500 per violation for willful or knowing violations. Each illegal call is a separate violation. A telemarketer that calls 10 times is potentially liable for $5,000 to $15,000 to the recipient. Small claims court can handle most TCPA cases; no attorney is required for the first filing.\n\nScam calls and GBL 349. Scam calls — impersonating the IRS, SSA, a utility company, a bank, or law enforcement — are illegal under both the TCPA and New York General Business Law 349. No government agency ever calls to demand immediate payment by gift card, wire transfer, or cryptocurrency. Legitimate agencies send written notices first. A caller asking for Apple gift cards, Green Dot cards, or Bitcoin is a scammer — 100 percent of the time.\n\nCarrier-level blocking. The FCC adopted rules in 2021 requiring phone carriers to offer free robocall-blocking tools to customers. The tools use STIR/SHAKEN caller-ID authentication to identify spoofed numbers. AT&T (ActiveArmor), T-Mobile (Scam Shield), and Verizon (Call Filter) all offer free versions. Activation is typically through the carrier's app.\n\nTCPA lawsuits. Some consumer attorneys take robocall cases on contingency. A reliable pattern of logged calls from a single violator — with call dates, times, and caller ID captures — builds an enforceable case. Many TCPA cases settle before trial because the statutory damages are predictable.\n\nReporting. Unwanted calls can be reported to the FTC at donotcall.gov/report, to the FCC at fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts, and scam calls can also be reported to the NY Attorney General's Consumer Frauds Bureau at (800) 771-7755."
  },

  yourRights: {
    en: [
      "The right to register on the National Do Not Call list at donotcall.gov — it is free and does not expire.",
      "Telemarketers who call a registered number (after the 31-day grace period) are in violation.",
      "Robocalls to cell phones without prior written consent are illegal.",
      "Consumers can sue telemarketers for TCPA violations — damages range from $500 to $1,500 per call.",
      "Scam calls impersonating government agencies are illegal under federal and state law.",
      "Phone carriers must offer free robocall-blocking tools under FCC rules."
    ]
  },

  legalOptions: {
    en: [
      "The National Do Not Call Registry can be accessed at donotcall.gov or by calling (888) 382-1222 from the number to be registered.",
      "Unwanted calls can be reported to the FTC at donotcall.gov/report or to the FCC at fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts.",
      "Scam calls can be reported to the NY Attorney General at (800) 771-7755.",
      "Most cell phone carriers offer free call-blocking features — AT&T (ActiveArmor), T-Mobile (Scam Shield), Verizon (Call Filter). These can be activated through the carrier's app.",
      "For persistent TCPA violations, some consumer attorneys take robocall cases on contingency. Each illegal call can be worth $500-$1,500 in statutory damages."
    ]
  },

  example: {
    en: "A man in Rochester registers on the Do Not Call list. Two months later, he starts receiving daily robocalls from a company selling home warranties. He documents the calls (date, time, number, recording if possible) and reports them to the FTC at donotcall.gov. He also files a complaint with the NY AG. After 30 documented calls, he contacts a consumer attorney who takes the case on contingency. The company settles for $15,000."
  },

  counsel: [
    {
      type: "free",
      name: "FTC — Do Not Call / Robocall Reporting",
      focus: "Do Not Call violations, robocall complaints, telemarketing fraud",
      qualifier: "Anyone in the US",
      access: "Online",
      outcome: "Report filing, enforcement action",
      phone: "(888) 382-1222",
      url: "https://www.donotcall.gov",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "scam-protection-ny",
    "identity-theft-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "robocall",
    "spam call",
    "do not call",
    "telemarketing",
    "TCPA",
    "unwanted calls",
    "scam call",
    "IRS scam call",
    "call blocking",
    "donotcall.gov",
    "phone harassment"
  ],

  sources: [
    "https://www.law.cornell.edu/uscode/text/47/227",
    "https://www.donotcall.gov"
  ],

  lastVerified: "2026-04-24",
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
