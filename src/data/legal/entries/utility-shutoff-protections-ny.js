export const UTILITY_SHUTOFF_PROTECTIONS_NY = {
  id: "utility-shutoff-protections-ny",
  category: "housing",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY PBS 32",
  status: "active",

  title: { en: "Utility Shutoff Protections in New York — Heat, Electric, and Gas Under HEFPA" },

  summary: {
    en: "New York has strong protections against utility shutoffs, especially during the cold-weather period. The Home Energy Fair Practices Act (HEFPA), Public Service Law 30 through 53, forces utility companies to follow a set process before disconnecting service. From November 1 through April 15, heat-related shutoffs are heavily restricted. Customers who are 62 or older, blind, disabled, or seriously ill have additional protections year-round. A deferred payment agreement (DPA), HEAP help, and a complaint to the Public Service Commission are all available when a shutoff is threatened."
  },

  whoQualifies: {
    en: [
      "A residential customer of a regulated utility (RG&E, National Grid, NYSEG, etc.) in New York.",
      "A tenant whose heat or hot water is included in the rent — the landlord's utility protections still apply.",
      "A customer who is elderly (62+), blind, disabled, or seriously ill — additional year-round protections are available on notice to the utility.",
      "A customer who has applied for HEAP or other energy assistance and is waiting for a decision."
    ]
  },

  whatItMeans: {
    en: "The Home Energy Fair Practices Act (HEFPA) is in Public Service Law 30 through 53 (Article 2). The Public Service Commission (PSC) implementing rules are in 16 NYCRR Part 11. Together they set the procedure a regulated utility has to follow before disconnecting service.\n\nThe 15-day final notice. Before any shutoff, the utility has to send a written final notice at least 15 days before the disconnect date. The notice has to spell out the amount owed, the planned shutoff date, the customer's right to negotiate a deferred payment agreement, and the customer's right to file a complaint with the PSC. A shutoff that skips or shortens this notice is improper and the PSC can order restoration.\n\nCold-weather protection (November 1 to April 15). During this window, Public Service Law 32 and the PSC rules bar a utility from shutting off heat-related service to a residential customer if it would create a dangerous situation. The PSC presumes a dangerous situation for most residential customers during the cold-weather period. The rule applies to the utility that provides heating fuel (gas) and the utility whose electric service runs the heat system.\n\nYear-round special protections. A customer who is 62 or older, blind, disabled, or seriously ill is protected from heat-related shutoff year-round as long as the customer notifies the utility. Notification is often done through a Medical Emergency Certificate signed by a medical professional.\n\nDeferred payment agreements (DPAs). Every residential customer has the right to negotiate a deferred payment agreement to pay arrears over time while keeping service on. The utility has to offer terms the customer can reasonably afford given income. A customer who cannot afford the offered terms can ask for a revised DPA or file a PSC complaint. A customer stays current by making the agreed monthly DPA amount plus the current month's bill.\n\nHEAP and Emergency HEAP. The Home Energy Assistance Program (HEAP) pays a yearly benefit toward heating bills; Emergency HEAP can restore service that has already been shut off and can stop a pending shutoff. A pending HEAP application can delay a shutoff while the application is under review. Monroe County HEAP is administered through the Department of Human Services.\n\nPSC complaint. The PSC is the state regulator. A complaint at askpsc.ny.gov or (800) 342-3377 gets a caseworker assigned to the file; the utility usually holds off on shutoff while the complaint is pending. The PSC can order service restored, payment terms revised, or credits applied when the utility violated the rules.\n\nLandlord-supplied utilities. When heat or hot water is included in the rent and the landlord-owned utility account is in arrears, tenants have separate protections under Real Property Law 235 and the warranty of habitability. Tenants can call the utility, the PSC, or Legal Aid for help in that situation.\n\nMedical hardship. A customer with a serious medical condition that requires uninterrupted electric service (oxygen concentrator, home dialysis, electric wheelchair) can file a Life Support Equipment certification. That record gives the customer priority restoration during outages and blocks non-emergency disconnection while the certification is on file."
  },

  yourRights: {
    en: [
      "A customer has the right to at least 15 days of written notice before any shutoff.",
      "A customer has the right to cold-weather protection from November 1 through April 15 for heat-related service.",
      "A customer has the right to a deferred payment agreement to pay arrears over time while keeping service on.",
      "A customer who is 62 or older, blind, disabled, or seriously ill has the right to additional year-round protections once the utility is notified.",
      "A customer has the right to file a complaint with the Public Service Commission if the utility violates HEFPA rules.",
      "A customer has the right to apply for HEAP or Emergency HEAP to help pay utility bills.",
      "A pending HEAP application can delay a shutoff while the application is under review.",
      "A customer with life-support medical equipment at home has the right to register with the utility for added outage protections and disconnection holds."
    ]
  },

  legalOptions: {
    en: [
      "If a shutoff is threatened, calling the utility to ask for a Deferred Payment Agreement is the first step. The utility has to offer reasonable terms.",
      "HEAP applications can be submitted at mybenefits.ny.gov or at Monroe County DHS at (585) 753-6998. Emergency HEAP can restore service that has already been shut off.",
      "A PSC complaint can be filed at askpsc.ny.gov or by calling (800) 342-3377. The PSC can intervene and order restoration or revised terms.",
      "A customer who is elderly, disabled, or seriously ill can send written notice to the utility, usually with a Medical Emergency Certificate signed by a medical professional.",
      "Free help negotiating with the utility or filing a PSC complaint is available through Legal Aid Society of Rochester at (585) 232-4090.",
      "Utility customer service numbers: RG&E (800) 743-2110; National Grid (800) 642-4272; NYSEG (800) 572-1111."
    ]
  },

  example: {
    en: "In January, Rosa receives a 15-day shutoff notice from RG&E for $800 in back electric bills. She calls RG&E and negotiates a Deferred Payment Agreement — $100 a month on top of her current bill until the balance is paid. She also applies for Emergency HEAP through Monroe County DHS. HEAP sends a $400 payment directly to RG&E. Because it is the cold-weather period and Rosa has a child under 6 in the home, RG&E cannot shut off heat-related service while she is on the DPA and the HEAP application is pending."
  },

  counsel: [
    {
      type: "free",
      name: "NY Public Service Commission (PSC)",
      focus: "Utility complaints, shutoff disputes, service restoration",
      qualifier: "Any residential utility customer in New York",
      access: "Phone or online",
      outcome: "Investigation, mediation, and enforcement",
      phone: "(800) 342-3377",
      url: "https://www.dps.ny.gov",
      verified: true,
      bilingual: false,
      languages: []
    },
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Utility shutoff defense, HEAP applications, PSC complaints",
      qualifier: "Low-income residents of Monroe and surrounding counties",
      access: "Phone intake",
      outcome: "Direct representation or advice",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "heap-utility-assistance-ny",
    "tenant-rights-repairs-ny",
    "eviction-process-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "utility shutoff",
    "heat shutoff",
    "electric shutoff",
    "gas shutoff",
    "HEFPA",
    "cold weather protection",
    "winter heat",
    "payment agreement",
    "deferred payment",
    "RGE",
    "National Grid",
    "PSC complaint",
    "no heat",
    "utility bill help"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/PBS/32",
    "https://www.nysenate.gov/legislation/laws/PBS/30",
    "https://www.dps.ny.gov/consumers",
    "https://otda.ny.gov/programs/heap/"
  ],

  lastVerified: "2026-04-22",
  volatility: "low",
  emergencyFlag: true,
  disclaimer: true,
  categoryDisclaimer: null
};
