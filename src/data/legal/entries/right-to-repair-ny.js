export const RIGHT_TO_REPAIR_NY = {
  id: "right-to-repair-ny",
  category: "consumer",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  primaryStatute: "NY GBS 399-NN",
  status: "active",

  title: { en: "New York Right to Repair — The Digital Fair Repair Act (GBL 399-nn)" },

  summary: {
    en: "New York's Digital Fair Repair Act took effect on July 1, 2023. It makes manufacturers of digital electronic equipment sell repair parts, tools, and documentation to independent repair shops and consumers on fair and reasonable terms. A phone, laptop, tablet, game console, or smart appliance bought in New York can be fixed by the owner or an independent shop — not only by the manufacturer's service. The statute is General Business Law 399-nn. The Attorney General enforces it. A few categories are excluded: motor vehicles, medical devices, certain industrial equipment, and devices where repair would create a real safety risk."
  },

  whoQualifies: {
    en: [
      "A consumer who owns digital electronic equipment sold in New York — phones, laptops, tablets, game consoles, and appliances with digital parts.",
      "An independent repair shop that wants to buy parts, tools, and documentation from a manufacturer on the same terms as authorized shops.",
      "The law applies to equipment first manufactured after July 1, 2023.",
      "Excluded categories: motor vehicles, medical devices, industrial equipment, and devices where repair access would create a real safety risk."
    ]
  },

  whatItMeans: {
    en: "The Digital Fair Repair Act is General Business Law 399-nn. It reshapes how manufacturers treat repair. The core rules are short.\n\nParts. The manufacturer has to make repair parts for covered devices available to independent repair providers and consumers on fair and reasonable terms. That means at a price and on conditions that are not set up to make independent repair impossible.\n\nTools. The same fair-and-reasonable rule applies to diagnostic tools and software used in repair. If the manufacturer gives authorized shops a special diagnostic app, that app has to be available to independent shops too.\n\nDocumentation. Service manuals, schematics, and firmware updates needed to complete a repair have to be available. Paywalled manuals are allowed; prohibitively expensive or one-shop-only access is not.\n\nWarranty protection. A manufacturer cannot void a device's warranty just because an independent shop or the owner performed a repair. This overlaps with the federal Magnuson-Moss Warranty Act (15 USC 2301 and following), which has protected tie-in rules for decades. The state law adds a clear state-level enforcement path.\n\nLimits. The statute does not force a manufacturer to hand over trade secrets, source code, or security bypasses that protect user data. It also does not cover motor vehicles (which have a separate federal vehicle-repair framework), medical devices, or certain industrial equipment. If a repair action would bypass a safety lock that matters to physical safety (not DRM), the manufacturer can require handling by an authorized shop.\n\nScope and timing. The law applies to digital electronic equipment first manufactured and sold, or used, in New York on or after July 1, 2023. Older devices are not covered by GBL 399-nn, though the federal Magnuson-Moss rules still apply to their warranties.\n\nWho enforces. The Attorney General's Consumer Frauds Bureau handles complaints. Violations are treated as deceptive acts under GBL 349, which brings the usual 349 remedies — injunctions, restitution, and civil penalties.\n\nWhat a consumer can do. Ask the independent shop whether the needed part or tool is available. If the shop says the manufacturer will not sell it, the consumer and the shop can each file a complaint with the AG. Documentation helps: the model number, the requested part, the manufacturer's response, and any quoted price.\n\nTypical fact patterns. A cracked screen the manufacturer only replaces at a high price. A diagnostic error code that can only be cleared by an authorized shop. A firmware update the manufacturer will not release to consumers. A 'parts pairing' practice where a genuine part will not work unless the manufacturer remotely authorizes it. Each of these runs into GBL 399-nn.\n\nOverlaps. For vehicles, the Massachusetts-style right-to-repair vehicle law and federal NHTSA rules control, not GBL 399-nn. For warranty disputes more broadly, the warranty-rights-ny entry covers Magnuson-Moss and UCC Article 2 warranty remedies."
  },

  yourRights: {
    en: [
      "A manufacturer has to make repair parts, tools, and documentation available on fair and reasonable terms, not just to authorized shops (GBL 399-nn).",
      "An owner has the right to choose where a covered device is repaired — owner, independent shop, or manufacturer.",
      "A warranty cannot be voided only because an independent shop or the owner performed a repair.",
      "An independent repair shop has the right to the same parts, tools, and documentation access the manufacturer offers authorized shops.",
      "A consumer or a shop has the right to file a complaint with the AG when a manufacturer refuses to provide access for a covered device.",
      "The rules cover devices manufactured on or after July 1, 2023."
    ]
  },

  legalOptions: {
    en: [
      "When a manufacturer refuses to sell repair parts, tools, or documentation for a covered device, a complaint can go to the NY Attorney General at (800) 771-7755 or at ag.ny.gov.",
      "When a manufacturer voids a warranty because of an independent repair, the complaint can cite both GBL 399-nn and the federal Magnuson-Moss Warranty Act.",
      "An independent repair shop denied access to parts or documentation can file the same complaint with the AG.",
      "The iFixit community at ifixit.com posts repair guides and tracks right-to-repair enforcement nationwide.",
      "For broader warranty disputes, free advice is available through Legal Aid Society of Rochester at (585) 232-4090."
    ]
  },

  example: {
    en: "A man in Rochester cracks the screen on his phone. The manufacturer's service charges $350 for the repair. An independent shop on Monroe Avenue can do it for $120, but the manufacturer will not sell the replacement screen to the shop. Under GBL 399-nn, the manufacturer has to make the screen available to the shop on fair and reasonable terms. The shop orders the part through the manufacturer's independent-provider channel and replaces the screen for $120. The owner's warranty stays intact because the federal Magnuson-Moss rule bars voiding it solely for using an independent repair."
  },

  counsel: [
    {
      type: "free",
      name: "NY Attorney General — Consumer Frauds Bureau",
      focus: "Right to repair violations, warranty disputes, manufacturer complaints",
      qualifier: "Any consumer in New York",
      access: "Phone or online",
      outcome: "Investigation and enforcement",
      phone: "(800) 771-7755",
      url: "https://ag.ny.gov/consumer-frauds-bureau",
      verified: true,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    "warranty-rights-ny",
    "lemon-law-used-car-ny",
    "auto-lemon-law-new-car-ny",
    "deceptive-business-practices-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "right to repair",
    "Digital Fair Repair Act",
    "GBL 399-nn",
    "independent repair",
    "repair parts",
    "warranty void",
    "phone repair",
    "laptop repair",
    "manufacturer repair",
    "iFixit",
    "repair tools",
    "repair documentation"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/GBS/399-NN",
    "https://www.nysenate.gov/legislation/laws/GBS/349",
    "https://ag.ny.gov/consumer-frauds-bureau"
  ],

  lastVerified: "2026-04-22",
  volatility: "medium",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
