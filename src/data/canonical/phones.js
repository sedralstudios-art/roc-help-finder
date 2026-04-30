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
      value: '585-244-8400',
      lastVerified: '2026-04-30',
      source: 'https://otda.ny.gov/programs/heap/contacts/',
      notes: 'Seniors 60+ not on TA/SNAP apply for HEAP through Lifespan ext 102, NOT through Monroe DHS directly.',
    },
  },

  // Health Department / WIC
  health: {
    wic: {
      value: '585-753-4942',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/files/health/NS/WIC/',
      notes: 'Monroe County WIC Program at 111 Westfall Rd.',
    },
  },

  // Office for the Aging
  ofa: {
    main: {
      value: '585-753-6280',
      lastVerified: '2026-04-30',
      source: 'https://www.monroecounty.gov/aging-centers',
      notes: 'Lunch Club nutrition program + general aging services intake.',
    },
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
    notes: 'Operated by Goodwill of the Finger Lakes for the Rochester region. 24/7.',
  },
  call988: {
    value: '988',
    text: 'Text 988',
    veteranPress: '1 (or text 838255)',
    spanishText: 'Text AYUDA to 988',
    lastVerified: '2026-04-30',
    source: 'https://988lifeline.org',
    notes: '24/7. Interpreters in 240+ languages.',
  },
  crisisText: {
    value: 'Text HOME to 741741',
    lastVerified: '2026-04-30',
    source: 'https://www.crisistextline.org/',
    notes: 'Free, confidential, 24/7. Trained crisis counselor.',
  },
  nyStateOfHealth: {
    value: '855-355-5777',
    lastVerified: '2026-04-30',
    source: 'https://nystateofhealth.ny.gov',
    notes: 'M-F 8am-8pm, Sat 9am-1pm. Medicaid + marketplace insurance applications.',
  },
  childHealthPlus: {
    value: '800-698-4543',
    spell: '1-800-698-4KIDS',
    tty: '1-877-898-5849',
    lastVerified: '2026-04-30',
    source: 'https://www.health.ny.gov/health_care/child_health_plus/contact.htm',
    notes: 'M-F 8am-8pm, Sat 9am-1pm.',
  },
  epic: {
    value: '800-332-3742',
    tty: '1-800-290-9138',
    lastVerified: '2026-04-30',
    source: 'https://www.health.ny.gov/health_care/epic/application_contact.htm',
    notes: 'NY Elderly Pharmaceutical Insurance Coverage. M-F 8am-5pm.',
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
      value: '585-275-3161',
      lastVerified: '2026-04-30',
      source: 'https://www.urmc.rochester.edu/locations/strong-recovery',
      notes: 'Strong Recovery (chemical dependency) clinic intake — NOT the old 275-3574 number.',
    },
  },
};

// ─────────── Legal-aid orgs (current correct numbers) ───────────
export const LEGAL_AID = {
  legalAidRoc: {
    value: '585-232-4090',
    lastVerified: '2026-04-30',
    source: 'https://lasroc.org',
    notes: 'Legal Aid Society of Rochester. Old 295-5727 is wrong.',
  },
  empireJustice: {
    value: '585-454-4060',
    lastVerified: '2026-04-30',
    source: 'https://empirejustice.org',
    notes: 'Empire Justice Center. Old 295-5800/5702/5775 are wrong.',
  },
  justCause: {
    value: '585-232-3051',
    lastVerified: '2026-04-30',
    source: 'https://justcauseny.org',
    notes: 'JustCause (formerly VLSP). Old 295-3100 / 295-5708 / 295-0660 are wrong.',
  },
  lawNY: {
    value: '585-325-2520',
    lastVerified: '2026-04-30',
    source: 'https://lawny.org/Contact',
    notes: 'Legal Assistance of Western NY. Old 295-5700 is wrong.',
  },
  cashRoc: {
    value: '585-900-1004',
    lastVerified: '2026-04-30',
    source: 'https://empirejustice.org/cash/',
    notes: 'CASH (Creating Assets, Savings, and Hope) — free tax prep, EITC.',
  },
};

// ─────────── Utility / Energy ───────────
export const UTILITIES = {
  rgeMain: {
    value: '1-800-743-1701',
    lastVerified: '2026-04-30',
    source: 'https://www.rge.com/support/contactus',
    notes: 'RG&E main customer service, M-F 7am-7pm.',
  },
  rgeBillHelp: {
    value: '877-266-3492',
    lastVerified: '2026-04-30',
    source: 'https://www.rge.com/account/waystopay/help-with-bill',
    notes: 'RG&E bill help / payment plans, M-F 7am-7pm.',
  },
  empowerPlus: {
    value: '866-697-3732',
    spell: '1-866-NYSERDA',
    altNYProj: '800-454-1556',
    lastVerified: '2026-04-30',
    source: 'https://www.nyserda.ny.gov/All-Programs/EmPower-New-York-Program',
    notes: 'EmPower+ home energy assessment + no-cost upgrades for income-eligible.',
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
  walk({ MC, HOTLINES, HOSPITALS, LEGAL_AID, UTILITIES }, []);
  return map;
}
