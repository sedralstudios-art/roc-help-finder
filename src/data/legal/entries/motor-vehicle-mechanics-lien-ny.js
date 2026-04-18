export const MOTOR_VEHICLE_MECHANICS_LIEN_NY = {
  id: "motor-vehicle-mechanics-lien-ny",
  category: "vehicle",
  tier: "state",
  jurisdiction: "us-ny",
  authorityType: "state-statute",
  status: "active",

  title: { en: "Mechanic's Lien on a Motor Vehicle — Shop Can Hold a Car for Unpaid Repair Bills" },

  summary: {
    en: "New York Lien Law Section 184 gives a licensed repair shop a possessory lien on a vehicle for unpaid labor and parts. The shop can keep the car until paid. Strict rules govern what the shop can charge, how the lien is perfected, and how the owner can get the vehicle back. A shop that abuses the lien can face Attorney General complaints and civil liability. A vehicle owner has rights to an estimate, itemized invoice, and dispute procedures before paying to release the car."
  },

  whoQualifies: {
    en: [
      "A vehicle owner whose car was held by a repair shop over a billing dispute.",
      "A repair shop that performed labor or supplied parts and has not been paid.",
      "A lienholder (bank or finance company) whose vehicle is being held by a shop.",
      "An insurance company managing a collision repair claim with a mechanic's lien dispute.",
      "An owner whose car was towed to a shop without authorization and is being held for tow and storage.",
      "A buyer of a used car who discovered a prior mechanic's lien remained on the title."
    ]
  },

  whatItMeans: {
    en: "NY Lien Law Section 184 grants a possessory lien to a bailee for hire of a motor vehicle for labor, materials, and storage. The lien extends to garages, body shops, towing operators, and marine repair facilities. Scope of the lien: the shop can lien only for authorized work. An authorized repair is one the owner or owner's agent expressly consented to in writing or orally (when documented). Without authorization, there is no lien. This is why NY General Business Law Section 398-d requires written estimates for any repair over $250, including a listing of parts and labor, and written consent before additional work is performed. A shop that does extra work beyond the estimate without new consent cannot include the extra charges in the lien. Perfection and enforcement: the lien is possessory — the shop has rights only while holding the vehicle. If the shop releases the car without payment, the lien is extinguished. For storage or repair charges over a threshold (currently set by regulation), Lien Law 184 allows the shop to file a Notice of Lien and Sale with the DMV after specified waiting periods (30 days for registered vehicles, 15 days for abandoned or unregistered). DMV procedures (VTL 1224 and related regs) require notice to the owner and lienholder, publication in a newspaper, and a waiting period before public sale. Sale of the vehicle satisfies the lien; any surplus goes to the owner or lienholder. Owner's disputes: before paying to release the car, the owner can demand a written itemized bill, including parts (with markup disclosed), labor hours and rate, storage (daily rate), and any diagnostic fees. Payment under protest is common: the owner pays what is asked, retrieves the car, and files a dispute or lawsuit to recover disputed amounts. Payment under protest does not waive the dispute if properly documented. Regulatory recourse: NY Department of Motor Vehicles (DMV) Vehicle Safety/Consumer Services at (518) 474-8943 handles complaints against licensed repair shops (licensing required under VTL 398). An unlicensed shop cannot assert a lien. Consumer Frauds Bureau of the Attorney General (800) 771-7755 handles deceptive practices. Small claims court can hear disputes up to $5,000 in NYC and $3,000 elsewhere; Supreme Court for larger claims. Abandoned vehicles: if a shop believes the vehicle is abandoned, Lien Law 184 and VTL 1224 provide streamlined procedures, but strict notice to the registered owner and lienholder is required. A shop that sells a vehicle without proper notice can be sued for conversion and actual damages. Towing traps: a tow-and-storage lien is also governed by Lien Law 184. Unauthorized towing (for example, from private lots without signage) is regulated by GBS Section 398 and local towing ordinances. The maximum allowable charges are set by VTL regulations and cannot exceed the statutory rates."
  },

  yourRights: {
    en: [
      "A vehicle owner has the right to a written estimate for any repair over $250 (GBL 398-d).",
      "A vehicle owner has the right to refuse additional repairs not covered by the original authorization.",
      "A shop cannot lien for unauthorized work performed without new written or oral consent.",
      "A shop must be licensed under VTL 398 to assert a mechanic's lien.",
      "A vehicle owner has the right to an itemized bill before payment.",
      "A vehicle owner has the right to pay under protest and sue for a refund.",
      "A shop must give proper statutory notice to the owner and lienholder before a DMV lien sale.",
      "A buyer of a vehicle at a lien sale must receive proper DMV title documentation."
    ]
  },

  legalOptions: {
    en: [
      "NYS DMV Vehicle Safety / Consumer Services at (518) 474-8943 — complaints about repair shops.",
      "NY Attorney General Consumer Frauds at (800) 771-7755.",
      "Monroe County Consumer Protection at (585) 753-1661.",
      "Rochester City Court Small Claims at (585) 428-6650 — disputes up to $3,000.",
      "Monroe County Supreme Court at (585) 371-3300 — larger disputes.",
      "Monroe County Bar Association Lawyer Referral at (585) 546-2130 — lien and conversion attorneys.",
      "Legal Aid Society of Rochester at (585) 232-4090 — help for low-income vehicle owners."
    ]
  },

  example: {
    en: "A Greece driver brought her 2018 sedan to a body shop for a $600 bumper repair after a parking lot scrape. The shop gave a written estimate. Two days later, the shop called to say it found additional frame damage and had already started work. The revised bill was $3,100. When she arrived to pick up the car, the shop refused to release it without full payment. She asked for an itemized bill, which the shop provided reluctantly. The frame work had not been authorized in writing. She consulted Monroe County Consumer Protection, paid $1,700 under protest to retrieve the car (covering the authorized bumper work plus a negotiated partial storage fee), and documented her protest in writing. She filed a small claims action for the $1,400 disputed amount. The court found for her on the unauthorized portion and entered judgment for $1,400 plus filing costs. She also filed a complaint with DMV Vehicle Safety, and the shop was warned about repair authorization compliance."
  },

  counsel: [
    {
      type: "government",
      name: "NYS DMV Vehicle Safety / Consumer Services",
      focus: "Complaints about licensed repair shops, unauthorized work, lien abuse",
      qualifier: "Any NY vehicle owner",
      access: "Phone at (518) 474-8943 or online complaint form",
      outcome: "Investigation, license sanctions, mediation",
      phone: "(518) 474-8943",
      url: "https://dmv.ny.gov/repair-shops/file-complaint-against-inspection-or-repair-facility",
      verified: true,
      bilingual: true,
      languages: ["es"]
    },
    {
      type: "free",
      name: "Legal Aid Society of Rochester",
      focus: "Vehicle owner disputes with repair shops and tow operators",
      qualifier: "Low-income Monroe County residents",
      access: "Phone at (585) 232-4090",
      outcome: "Small claims support, negotiation with shop",
      phone: "(585) 232-4090",
      url: "https://www.lasroc.org",
      verified: true,
      bilingual: true,
      languages: ["es"]
    }
  ],

  relatedIds: [
    "auto-lemon-law-new-car-ny",
    "lemon-law-used-car-ny",
    "garage-mechanic-unlicensed-ny",
    "small-claims-procedure-ny"
  ],

  relatedHelpResources: [],

  tags: [
    "motor vehicle lien",
    "Lien Law 184",
    "repair shop",
    "garage lien",
    "VTL 398",
    "GBL 398-d",
    "unauthorized repair",
    "payment under protest",
    "towing lien",
    "DMV complaint"
  ],

  sources: [
    "https://www.nysenate.gov/legislation/laws/LIE/184",
    "https://www.nysenate.gov/legislation/laws/GBS/398-D",
    "https://dmv.ny.gov/repair-shops/file-complaint-against-inspection-or-repair-facility"
  ],

  lastVerified: "2026-04-18",
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
