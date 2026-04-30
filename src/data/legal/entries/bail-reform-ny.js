export const BAIL_REFORM_NY = {
  id: "bail-reform-ny",
  category: "criminal",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY CPL 510.10",
  status: "active",

  title: { en: "Bail Reform in New York — Who Gets Released and Who Does Not" },

  summary: {
    en: "New York changed its bail laws in 2020. For most misdemeanors and non-violent felonies, a judge must release the person without bail. Cash bail is still allowed for violent felonies and some other charges. The goal is to keep people from sitting in jail just because they cannot afford bail."
  },

  whoQualifies: {
    en: [
      "Any person arrested and awaiting arraignment who wants to understand whether bail will be set.",
      "Any person whose family member was arrested and they want to know if the person will be released.",
      "Any person who had bail set and wants to understand if that was proper under the reform law.",
      "Any person who was detained pretrial and wants to challenge the bail decision."
    ]
  },

  whatItMeans: {
    en: "Under Criminal Procedure Law § 510.10 (as amended by the 2020 bail reform and follow-up amendments in 2022 and 2023), when a person is arraigned, the judge decides whether to release them, set bail, or hold them in jail. For most misdemeanors and non-violent felonies, the judge must release the person on their own recognizance (ROR) or with conditions like checking in with pretrial services, staying away from certain places, or wearing an ankle monitor. The judge cannot set cash bail for these charges. Cash bail is still allowed for qualifying offenses, which include all violent felonies (Penal Law Article 70.02), certain sex offenses, witness tampering, domestic violence offenses where the defendant has a prior DV conviction or an active order of protection, charges involving a firearm, and a few other categories added by the 2022 amendments. When bail is set, the judge must consider the person's ability to pay. The purpose of bail is to ensure the person returns to court — not to punish them before trial. If bail is set, the person or family can post it in cash or through a bail bond company. If the person cannot afford bail, the defense attorney can ask the judge to reconsider. The 2022 and 2023 amendments expanded the list of qualifying offenses — particularly for repeat offenses, gun possession charges, and certain DV-related arrests. A second arrest involving harm to a person or property while another such case is pending can become bail-eligible. The 2023 amendment also removed the earlier 'least restrictive' standard, replacing it with a 'kind and degree of control or restriction necessary to reasonably assure the principal's return to court' standard. Pretrial conditions are themselves serious limits on liberty. Electronic monitoring restricts where a person can go, mandatory check-ins eat into work and child care, and travel restrictions can complicate jobs requiring movement across county lines. Conditions should be no more restrictive than necessary to ensure court return. A person who cannot meet a condition through no fault of their own — a check-in office that closed, a phone with no service, an employer that prohibits the device — should report the issue to the defense attorney immediately, before the court treats the failure as a violation."
  },

  yourRights: {
    en: [
      "For most misdemeanors and non-violent felonies, a person has the right to be released without bail at arraignment.",
      "A judge cannot set cash bail for non-qualifying offenses — release must be on recognizance or with conditions.",
      "When bail is set, the judge must consider the person's ability to pay.",
      "A person who cannot afford bail has the right to ask the judge to lower the amount or release them on conditions instead.",
      "A person released on conditions has the right to know what the conditions are and how to comply.",
      "A person has the right to a lawyer at arraignment. If they cannot afford one, the court will assign one before the bail decision.",
      "If bail conditions are violated, the person has the right to a hearing before being detained."
    ]
  },

  legalOptions: {
    en: [
      "Monroe County Public Defender's Office at (585) 753-4210 represents defendants at arraignment and argues for release.",
      "Assigned Counsel Program at (585) 753-3430 provides attorneys when the Public Defender has a conflict.",
      "If bail is set and the person cannot afford it, the defense attorney can file a bail application asking the judge to reconsider.",
      "Pre-Trial Services Corporation of the Monroe County Bar Association monitors people released on conditions — call (585) 454-7350 for questions about conditions.",
      "The Bail Project and other bail funds sometimes post bail for people who cannot afford it — availability varies.",
      "If a person believes bail was improperly set for a non-qualifying offense, the defense attorney can challenge it immediately."
    ]
  },

  example: {
    en: "James was arrested for petit larceny (a misdemeanor) in Rochester. Under the bail reform law, the judge was required to release him without bail because petit larceny is not a qualifying offense. The judge released James on his own recognizance with a condition that he check in with pretrial services by phone once a week. James attended all his court dates. His case was eventually resolved with a plea to a violation and a fine."
  },

  counsel: [
    {
      type: "government",
      name: "Monroe County Public Defender's Office",
      focus: "Criminal defense, bail arguments, arraignment representation",
      qualifier: "Defendants who cannot afford a private attorney",
      access: "Phone at (585) 753-4210, present at arraignment",
      outcome: "Representation at arraignment, bail arguments, release advocacy",
      phone: "(585) 753-4210",
      url: "https://www.monroecounty.gov/defender",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "bail-how-it-works-ny",
    "right-to-a-lawyer-ny",
    "what-happens-at-arraignment-ny",
    "criminal-case-process-ny",
    "rights-when-arrested-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "bail reform",
    "bail New York",
    "no bail",
    "cash bail",
    "bail reform 2020",
    "released without bail",
    "qualifying offense bail",
    "bail amount",
    "pretrial release",
    "bail arraignment",
    "cant afford bail",
    "bail conditions"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/CPL/510.10",
    "https://www.nycourts.gov/courthelp/criminal/bailReform.shtml"
  ],

  lastVerified: "2026-04-27",
  factCheckedBy: { tool: "websearch+webfetch", date: "2026-04-27" },
  volatility: "high",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
