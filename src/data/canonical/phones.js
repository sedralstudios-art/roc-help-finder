// Canonical phone-number poles.
//
// Single source of truth for every phone number HelpFinder repeats. Entries
// (programs.js, legal entries) reference these constants instead of hardcoding
// digits, so a number change is one edit, not hundreds.
//
// Each pole has:
//   value         — the dialable string (Rochester convention: 'NNN-NNN-NNNN')
//   lastVerified  — YYYY-MM-DD when a human read it from the source
//   source        — exact URL the value was read from
//   notes         — when this number applies vs other sub-lines for the same org
//
// Optional metadata (added 2026-05-02 to support data-driven dialer guards):
//   category      — 'crisis' | 'staffed-routing' | 'municipal' | undefined
//   blockDial     — true if the auto-dialer must NEVER call this number.
//                   Generated into scripts/data/dialer-blocklist.json by
//                   scripts/build-dialer-blocklist.cjs and consumed by
//                   call-data/dialer-helper.ps1.
//
// Build-gate rule (planned): if an entry hardcodes a number that exists in any
// pole and the surrounding context matches the pole's keywords, FAIL the
// build with a "use canonical reference" message.

// ─────────── Monroe County government ───────────
export const MC = {
  // Department of Human Services / Social Services
  dhs: {
    main: {
      value: '585-753-6998',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/hs-assistance',
      notes: 'Walk-in M-F 8am-4pm at 691 St Paul St. Use for SNAP, TA, HEAP general.',
    },
    snapAppointmentLine: {
      value: '585-753-6960',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/hs-assistance',
      notes: 'NOT the SNAP main number. This line is for requesting a paper application be mailed. Old DHS main # — recurring eyeball drift hazard.',
    },
    heapDirect: {
      value: '585-753-6477',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/hs-assistance',
      notes: 'HEAP-specific line, M-F 9am-3pm only. Also the HERR (heating-equipment repair) line.',
    },
    childCare: {
      value: '585-753-6316',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/hs-assistance',
      notes: 'Child Care Subsidy / CCAP intake.',
    },
    fosterCareIntake: {
      value: '585-753-5765',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/hs-assistance',
      notes: 'Foster care application intake. Not the SNAP/TA line.',
    },
    seniorHEAPViaLifespan: {
      value: '',
      lastVerified: '2026-04-30',
      source: 'https://otda.ny.gov/programs/heap/contacts/',
      notes: 'Seniors 60+ not on TA/SNAP apply for HEAP through Lifespan ext 102, NOT through Monroe DHS directly.',
    },
  },

  // Health Department / WIC
  health: {
    main: {
      value: '585-753-5555',
      lastVerified: '2026-05-02',
      source: 'https://www.monroecounty.gov/health',
      notes: 'Monroe County Health Department main line. Complaints, health-code reports, environmental health.',
    },
    wic: {
      value: '',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/files/health/NS/WIC/',
      notes: 'Monroe County WIC Program at 111 Westfall Rd.',
    },
  },

  // Office for the Aging
  ofa: {
    main: {
      value: '',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/aging-centers',
      notes: 'Lunch Club nutrition program + general aging services intake.',
    },
  },

  // Public Defender / Sheriff / Clerk (added 2026-05-02 Phase 2)
  publicDefender: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www2.monroecounty.gov/pubdef',
    notes: 'Monroe County Public Defender. Represents indigent defendants pre-trial, trial, and post-conviction (appeals, motions).',
  },
  clerk: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.monroecounty.gov/clerk',
    notes: 'Monroe County Clerk. Land records, civil filings, marijuana record sealing intake.',
  },
  sheriff: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.monroecounty.gov/sheriff',
    notes: 'Monroe County Sheriff non-emergency. Use 911 for emergencies.',
  },
};

// ─────────── Federal / State / National hotlines ───────────
export const HOTLINES = {
  call211: {
    value: '211',
    altToll: '1-877-356-9211',
    text: 'Text ZIP to 898211',
    lastVerified: '2026-04-30',
    source: 'https://www.211lifeline.org/',
    notes: 'Operated by Goodwill of the Finger Lakes for the Rochester region. 24/7. Staffed routing line — NEVER auto-dial.',
    category: 'staffed-routing',
    blockDial: true,
  },
  call988: {
    value: '988',
    text: 'Text 988',
    veteranPress: '1 (or text 838255)',
    spanishText: 'Text AYUDA to 988',
    lastVerified: '2026-04-30',
    source: 'https://988lifeline.org',
    notes: '24/7. Interpreters in 240+ languages. Staffed crisis line — NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  crisisText: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://www.crisistextline.org/',
    notes: 'Free, confidential, 24/7. Trained crisis counselor.',
  },
  nyStateOfHealth: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://nystateofhealth.ny.gov',
    notes: 'M-F 8am-8pm, Sat 9am-1pm. Medicaid + marketplace insurance applications.',
  },
  childHealthPlus: {
    value: '',
    spell: '1-800-698-4KIDS',
    tty: '1-877-898-5849',
    lastVerified: '2026-04-30',
    source: 'https://www.health.ny.gov/health_care/child_health_plus/contact.htm',
    notes: 'M-F 8am-8pm, Sat 9am-1pm.',
  },
  epic: {
    value: '',
    tty: '1-800-290-9138',
    lastVerified: '2026-04-30',
    source: 'https://www.health.ny.gov/health_care/epic/application_contact.htm',
    notes: 'NY Elderly Pharmaceutical Insurance Coverage. M-F 8am-5pm.',
  },

  // ─── State / federal agency lines (added 2026-05-02 Phase 2) ───
  // These are info / complaint hotlines, not staffed-crisis lines.
  // No blockDial flag — the dialer can verify these on weekly runs.
  nysAGConsumer: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://ag.ny.gov/contact-attorney-general',
    notes: 'NYS Attorney General consumer fraud, elder fraud, and auto bureau intake. One number covers multiple bureaus.',
  },
  nysDFS: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.dfs.ny.gov',
    notes: 'NYS Department of Financial Services consumer hotline. Insurance, banking, lending complaints.',
  },
  nysDOLLaborStandards: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://dol.ny.gov/division-labor-standards',
    notes: 'NYS Department of Labor — Division of Labor Standards. Wage theft, paid sick leave, hours-of-work disputes.',
  },
  nysDHR: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://dhr.ny.gov',
    notes: 'NYS Division of Human Rights complaint intake. Discrimination across employment, housing, public accommodation, credit.',
  },
  nysDMVAbandonedVehicle: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://dmv.ny.gov/registration/abandoned-vehicle-pickup',
    notes: 'NYS DMV Abandoned Vehicle paperwork (MV-83). Albany-based main line.',
  },
  nysDCP: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://dos.ny.gov/consumer-protection',
    notes: 'NYS Division of Consumer Protection (Department of State). Dealer add-ons, retail complaints.',
  },
  nysPSC: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www3.dps.ny.gov/W/PSCWeb.nsf/All/E7C2A0FFB47F2DB985257687006F39CD',
    notes: 'NYS Public Service Commission complaint hotline. Submetering, utility shutoffs, service quality.',
  },
  ftcConsumer: {
    value: '',
    spell: '1-877-FTC-HELP',
    lastVerified: '2026-05-02',
    source: 'https://reportfraud.ftc.gov',
    notes: 'Federal Trade Commission consumer fraud reporting (1-877-FTC-HELP).',
  },
  cfpb: {
    value: '',
    spell: '1-855-411-CFPB',
    lastVerified: '2026-05-02',
    source: 'https://www.consumerfinance.gov/complaint/',
    notes: 'Consumer Financial Protection Bureau complaint hotline. Credit cards, mortgages, debt collection.',
  },
  cssnyHealth: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.cssny.org/our-work/community-health-advocates',
    notes: 'Community Service Society of NY Health Helpline (Community Health Advocates). Insurance billing disputes, plan questions.',
  },
};

// ─────────── Hospitals ───────────
export const HOSPITALS = {
  strong: {
    main: {
      value: '585-275-3535',
      lastVerified: '2026-04-30',
      source: 'https://www.urmc.rochester.edu/strong-memorial/',
      notes: 'Strong Memorial Hospital main switchboard.',
    },
    psychEmergency: {
      value: '585-275-4501',
      lastVerified: '2026-04-30',
      source: 'https://www.urmc.rochester.edu/strong-memorial/services-amenities/social-work/service-areas/psychiatry/psychiatric-emergency-department',
      notes: 'CPEP after-hours / Psychiatric Department / PAO. Walk-in 24/7.',
    },
    psychCrisisLine: {
      value: '585-275-8686',
      lastVerified: '2026-04-30',
      source: 'https://www.urmc.rochester.edu/strong-memorial/services-amenities/social-work/service-areas/psychiatry/psychiatric-emergency-department',
      notes: 'Crisis line for behavioral health.',
    },
    behavioralHealthClinic: {
      value: '',
      lastVerified: '2026-04-30',
      source: 'https://www.urmc.rochester.edu/locations/strong-recovery',
      notes: 'Strong Recovery (chemical dependency) clinic intake — NOT the old 275-3574 number.',
    },
  },
};

// ─────────── Legal-aid orgs (current correct numbers) ───────────
export const LEGAL_AID = {
  legalAidRoc: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://lasroc.org',
    notes: 'Legal Aid Society of Rochester. Old 295-5727 is wrong.',
  },
  empireJustice: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://empirejustice.org',
    notes: 'Empire Justice Center. Old 295-5800/5702/5775 are wrong.',
  },
  justCause: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://justcauseny.org',
    notes: 'JustCause (formerly VLSP). Old 295-3100 / 295-5708 / 295-0660 are wrong.',
  },
  lawNY: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://lawny.org/Contact',
    notes: 'Legal Assistance of Western NY. Old 295-5700 is wrong.',
  },
  cashRoc: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://empirejustice.org/cash/',
    notes: 'CASH (Creating Assets, Savings, and Hope) — free tax prep, EITC.',
  },
  // Added 2026-05-02 Phase 2 — top-orphan poles
  monroeBarReferral: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.mcba.org/lawyer-referral',
    notes: 'Monroe County Bar Association Lawyer Referral Service. Sliding-fee referrals, including special needs / estate / family law specialists.',
  },
  centerForDisabilityRights: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.cdrnys.org',
    notes: 'Center for Disability Rights (Rochester). Advocacy + ABLE account / benefits planning support.',
  },
  workerJusticeCenter: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.wjcny.org',
    notes: 'Worker Justice Center of New York (Rochester). Farmworkers and low-wage workers — wage theft, retaliation, labor rights.',
  },
};

// ─────────── Rochester city offices (added 2026-05-02 Phase 2) ───────────
export const ROCHESTER_CITY = {
  housingCouncil: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.thehousingcouncil.org',
    notes: 'Rochester Housing Council — landlord-tenant mediation, abandoned property after eviction, security deposit disputes.',
  },
  bureauInspection: {
    value: '',
    lastVerified: '2026-05-02',
    source: 'https://www.cityofrochester.gov/bureauinspection',
    notes: 'City of Rochester Bureau of Inspection and Compliance. Vacant property registry, code enforcement.',
  },
};

// ─────────── Utility / Energy ───────────
export const UTILITIES = {
  rgeMain: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://www.rge.com/support/contactus',
    notes: 'RG&E main customer service, M-F 7am-7pm.',
  },
  rgeBillHelp: {
    value: '',
    lastVerified: '2026-04-30',
    source: 'https://www.rge.com/account/waystopay/help-with-bill',
    notes: 'RG&E bill help / payment plans, M-F 7am-7pm.',
  },
  empowerPlus: {
    value: '',
    spell: '1-866-NYSERDA',
    altNYProj: '800-454-1556',
    lastVerified: '2026-04-30',
    source: 'https://www.nyserda.ny.gov/All-Programs/EmPower-New-York-Program',
    notes: 'EmPower+ home energy assessment + no-cost upgrades for income-eligible.',
  },
};

// ─────────── Crisis lines and short codes (NEVER auto-dial) ───────────
// Every entry here carries blockDial: true. Generated into a JSON blocklist
// by scripts/build-dialer-blocklist.cjs; consumed by dialer-helper.ps1 so the
// dialer rejects these numbers BEFORE any dial fires. Adding a new staffed
// crisis number anywhere in the data layer? Add it here too.
export const CRISIS = {
  // 911 isn't a "crisis line" in the support-hotline sense, but auto-dialing it
  // is the worst possible failure mode. Hard block.
  emergency911: {
    value: '911',
    lastVerified: '2026-05-02',
    source: 'https://www.911.gov',
    notes: 'Emergency services. NEVER auto-dial under any circumstance.',
    category: 'emergency',
    blockDial: true,
  },
  suicide988Legacy: {
    value: '800-273-8255',
    lastVerified: '2026-05-02',
    source: 'https://988lifeline.org/',
    notes: 'Legacy SAMHSA suicide hotline. Still active, may route to 988. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  dvHotline: {
    value: '800-799-7233',
    lastVerified: '2026-05-02',
    source: 'https://www.thehotline.org',
    notes: 'National Domestic Violence Hotline. Staffed 24/7. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  childhelp: {
    value: '800-422-4453',
    lastVerified: '2026-05-02',
    source: 'https://www.childhelp.org/hotline/',
    notes: 'Childhelp National Child Abuse Hotline. Staffed 24/7. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  trevorProject: {
    value: '866-488-7386',
    lastVerified: '2026-05-02',
    source: 'https://www.thetrevorproject.org/get-help/',
    notes: 'Trevor Project — LGBTQ youth crisis support. Staffed 24/7. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  rainn: {
    value: '800-656-4673',
    lastVerified: '2026-05-02',
    source: 'https://rainn.org',
    notes: 'RAINN National Sexual Assault Hotline. Staffed 24/7. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  disasterDistress: {
    value: '800-985-5990',
    lastVerified: '2026-05-02',
    source: 'https://www.samhsa.gov/find-help/disaster-distress-helpline',
    notes: 'SAMHSA Disaster Distress Helpline. Staffed 24/7. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  transLifeline: {
    value: '877-565-8860',
    lastVerified: '2026-05-02',
    source: 'https://translifeline.org',
    notes: 'Trans Lifeline — peer support for trans people in crisis. Staffed 24/7. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  oasasHopeline: {
    value: '877-846-7369',
    text: 'Text HOPENY to 467369',
    lastVerified: '2026-05-02',
    source: 'https://oasas.ny.gov/hopeline',
    notes: 'NYS OASAS Confidential Hope Line — substance use, addiction, problem gambling. Staffed 24/7. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  womensLawVAW: {
    value: '888-843-9461',
    lastVerified: '2026-05-02',
    source: 'https://www.womenslaw.org/',
    notes: 'WomensLaw safe-exit hotline (VAW resource line). Staffed. NEVER auto-dial.',
    category: 'crisis',
    blockDial: true,
  },
  // 311 isn't a crisis line, but auto-dialing it overwhelms operators with no
  // info value. Same hard block applies.
  municipal311: {
    value: '311',
    lastVerified: '2026-05-02',
    source: 'https://www.cityofrochester.gov/article.aspx?id=8589934917',
    notes: 'Rochester / municipal services routing. NEVER auto-dial.',
    category: 'municipal',
    blockDial: true,
  },
};

// Convenience: flat lookup by phone string for the future build-gate. Maps
// "585-753-6960" → { canonicalRef: 'MC.dhs.snapAppointmentLine', notes: '...' }
// so the gate can recommend the constant when it sees the literal.
export function buildPhoneLookup() {
  const map = new Map();
  function walk(obj, pathParts) {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && 'value' in v) {
        const ref = pathParts.concat(k).join('.');
        map.set(v.value, { ref, notes: v.notes });
      } else if (v && typeof v === 'object') {
        walk(v, pathParts.concat(k));
      }
    }
  }
  walk({ MC, HOTLINES, HOSPITALS, LEGAL_AID, ROCHESTER_CITY, UTILITIES, CRISIS }, []);
  return map;
}

// Returns digit-only blocklist for the dialer. Walks every pole; collects
// `value` of any entry where blockDial === true. Used by
// scripts/build-dialer-blocklist.cjs.
export function buildDialBlocklist() {
  const out = [];
  function walk(obj, pathParts) {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === 'object' && 'value' in v) {
        if (v.blockDial === true) {
          const digits = String(v.value).replace(/\D/g, '');
          const normalized = digits.length === 11 && digits.startsWith('1')
            ? digits.substring(1) : digits;
          out.push({
            digits: normalized,
            value: v.value,
            ref: pathParts.concat(k).join('.'),
            category: v.category || null,
            notes: v.notes || null,
          });
        }
      } else if (v && typeof v === 'object') {
        walk(v, pathParts.concat(k));
      }
    }
  }
  walk({ MC, HOTLINES, HOSPITALS, LEGAL_AID, ROCHESTER_CITY, UTILITIES, CRISIS }, []);
  return out;
}
