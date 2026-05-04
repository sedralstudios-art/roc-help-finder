export const TRUTH_IN_CALLER_ID_SPOOFING_NY = {
  id: "truth-in-caller-id-spoofing-ny",
  category: "consumer",
  tier: "federal",
  jurisdiction: "us-fed",
  authorityType: "federal-statute",
  primaryStatute: "47 USC 227",
  status: "active",

  title: { en: "Federal Truth in Caller ID Act — Fake Caller ID to Defraud or Harm Is a Federal Violation" },

  summary: {
    en: "The federal Truth in Caller ID Act (47 USC 227(e)) prohibits knowingly falsifying caller ID information with intent to defraud, cause harm, or wrongly obtain something of value. Violations trigger FCC fines up to 10,000 dollars per call. Neighbor spoofing, IRS impersonation, and fake business calls are common violations. Legitimate spoofing (domestic violence safety, law enforcement sting, doctor calling from office number) remains allowed."
  },

  whoQualifies: {
    en: [
      "Any person who received a fraudulent spoofed call and wants to report it.",
      "A business whose phone number was spoofed by scammers, causing returned calls to the business from angry recipients.",
      "An elderly person targeted by fake IRS or Social Security impersonation calls.",
      "A parent whose teenager was scammed by a spoofed number.",
      "A consumer wanting to understand the difference between illegal spoofing and legal privacy-protecting spoofing."
    ]
  },

  whatItMeans: {
    en: "The federal Truth in Caller ID Act at 47 USC 227(e) was enacted in 2009 to address the massive increase in fraudulent caller ID spoofing enabled by internet-based phone systems. Before the law, calls over traditional phone networks carried authenticated caller ID, but VoIP (Voice over Internet Protocol) allows any outgoing number to be set arbitrarily. Scammers use spoofing to make their calls appear to come from a local number, a trusted institution (IRS, Social Security, Medicare, police), or even a specific person the victim knows. The typical goal is to trick the victim into answering, believing the call is legitimate, and then handing over money or personal information. THE LAW forbids knowingly transmitting misleading or inaccurate caller ID information with intent to (1) defraud, (2) cause harm, or (3) wrongfully obtain anything of value. Civil penalties are up to 10,000 dollars per violation assessed by the FCC. Criminal penalties can apply in extreme cases including impersonation of federal officers under 18 USC 912. COMMON ILLEGAL SPOOFING SCENARIOS: (1) IRS or Social Security impersonation — caller claims the victim owes taxes or benefits fraud and demands immediate payment by gift card or wire transfer. The government never calls this way. Report to IRS at [number being verified] or SSA at [number being verified]. (2) Neighbor spoofing — caller uses a number with the same area code and prefix as the victim's number, making it appear to be a local call from a familiar neighborhood. This is used by robocallers and scammers to boost answer rates. (3) Utility impersonation — caller claims to be RG&E or another utility threatening immediate shutoff unless payment is made now. Real utility companies always send written notices and accept payments through normal channels. (4) Grandparent scam — caller impersonates a family member in distress asking for bail money or medical costs. (5) Tech support scam — caller claims to be Microsoft or Apple needing remote access to fix a virus. LEGITIMATE SPOOFING under 227(e) that remains legal: (1) A domestic violence victim calling from a shelter using a display number that does not reveal the shelter location. (2) Law enforcement using a non-police-department outgoing number during an authorized investigation. (3) A doctor or nurse calling a patient from a home phone but displaying the office main number. (4) A business with multiple outgoing lines routing to a single published return number. These purposes do not involve intent to defraud or cause harm. TCPA (Telephone Consumer Protection Act, 47 USC 227(b)) is a related law that provides civil damages 500 to 1500 per unwanted robocall regardless of caller ID accuracy — victims can sue directly in court. A spoofed call that violates TCPA can generate 500-1500 dollar damages per call even when the FCC is not involved. STIR/SHAKEN is a technical authentication framework that phone carriers must implement under the TRACED Act of 2019. It cryptographically signs outgoing calls to prove the originating number is legitimate. Implementation across major carriers (AT&T, Verizon, T-Mobile, Comcast) is mostly complete. Calls now often arrive with a green checkmark (verified caller ID) or a red mark (unverifiable). Consumers can choose to block unverifiable calls or get extra labels. REPORTING options: (1) FCC online at fcc.gov/robocalls. (2) FTC online at reportfraud.ftc.gov. (3) NY Attorney General Consumer Frauds Bureau at [number being verified] for NY resident complaints. (4) Major carriers maintain their own reporting — AT&T Call Protect, Verizon Call Filter, T-Mobile Scam Shield. Blocking tools: NYS AG maintains a Do Not Call list that supplements the federal DNC list. FCC maintains the national Do Not Call Registry at donotcall.gov. Free apps like Hiya, Truecaller, and carrier-provided call-filter services block many spoofed and robocall sources."
  },

  yourRights: {
    en: [
      "A consumer receiving a fraudulent spoofed call has the right to report to FCC, FTC, and NY AG.",
      "A consumer has the right to sue under TCPA for 500-1500 per unwanted robocall (regardless of spoofing).",
      "A consumer has the right to block unverifiable callers through the STIR/SHAKEN framework.",
      "A business whose number was spoofed has the right to file an FCC complaint and report the impersonation.",
      "A victim of a grandparent or tech scam has the right to attempt refund through the payment channel used and report the crime.",
      "A consumer has the right to register any phone number on the National Do Not Call Registry."
    ]
  },

  legalOptions: {
    en: [
      "Federal Communications Commission at (888) 225-5322 or fcc.gov/robocalls for spoofing complaints.",
      "Federal Trade Commission at (877) 382-4357 or reportfraud.ftc.gov for fraud complaints.",
      "NYS Attorney General Consumer Frauds Bureau at (800) 771-7755 for NY-specific fraud complaints.",
      "IRS Impersonation Scam Reporting at (800) 366-4484 for IRS impersonation.",
      "Social Security Scam Reporting at (800) 269-0271 for SSA impersonation.",
      "National Do Not Call Registry at donotcall.gov or (888) 382-1222."
    ]
  },

  example: {
    en: "Amara received a call showing her local area code and prefix. The caller claimed to be a Microsoft technician who detected a virus on her computer and needed remote access. Amara hung up, reported to FCC at fcc.gov/robocalls, and blocked the number. A week later, three other Rochester neighbors reported similar calls with spoofed caller IDs. FCC used the combined complaints to trace the caller's ISP and referred it to Justice Department for prosecution. Amara avoided the scam and also filed a complaint with NY AG Consumer Frauds to help broader enforcement."
  },

  counsel: [
    {
      type: "government",
      name: "Federal Communications Commission",
      focus: "Truth in Caller ID violations, STIR/SHAKEN authentication, spoofing enforcement",
      qualifier: "Any U.S. consumer",
      access: "Phone, online complaint at fcc.gov/robocalls",
      outcome: "Complaint investigation, fines up to 10K per call, enforcement action",
      phone: "",
      url: "https://www.fcc.gov/consumers/guides/spoofing",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "government",
      name: "NYS Attorney General Consumer Frauds Bureau",
      focus: "NY-specific spoofing fraud, impersonation scam reporting, consumer protection",
      qualifier: "Any NY consumer",
      access: "Phone, online complaint form",
      outcome: "Investigation, civil enforcement, restitution",
      phone: "",
      url: "https://ag.ny.gov/consumer-frauds",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "robocall-donotcall-ny",
    "identity-theft-ny",
    "senior-fraud-prevention-ny",
    "credit-report-dispute-ny",
    "credit-freeze-security-freeze-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "Truth in Caller ID",
    "47 USC 227(e)",
    "caller ID spoofing",
    "neighbor spoofing",
    "IRS impersonation scam",
    "STIR/SHAKEN",
    "TRACED Act",
    "TCPA damages",
    "FCC spoofing",
    "grandparent scam"
  ],

  sources: [
    "https://www.law.cornell.edu/uscode/text/47/227",
    "https://www.fcc.gov/consumers/guides/spoofing"
  ],

  lastVerified: "2026-04-20",
  factCheckedBy: { tool: "websearch", date: "2026-04-30" },
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
