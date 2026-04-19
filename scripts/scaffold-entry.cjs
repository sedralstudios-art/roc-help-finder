// scripts/scaffold-entry.cjs
//
// Generates a new legal-entry .js file from a template so new entries start
// with every required field at the right shape — cuts "forgot to add
// primaryStatute / lastVerified / counsel" errors before they happen.
//
// Usage:
//   node scripts/scaffold-entry.cjs \
//     --id pet-deposit-ny \
//     --category housing \
//     --authorityType state-statute \
//     --primaryStatute "NY RPP 238-A" \
//     --tier state \
//     --jurisdiction us-ny \
//     [--title "Descriptive title (optional)"] \
//     [--force]                                      # overwrite existing file
//
// All args required except --title, --force. --tier and --jurisdiction are
// inferred from --authorityType when omitted (state-statute => state + us-ny,
// federal-statute => federal + us-fed, etc.).
//
// After scaffolding, fill in the TODO blocks, then run `npm run verify` to
// confirm the entry passes every content-quality check.

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const VALID_AUTHORITY_TYPES = [
  'state-statute', 'federal-statute',
  'state-regulation', 'federal-regulation',
  'local-ordinance', 'common-law', 'agency-program',
];
const VALID_CATEGORIES = [
  'consumer', 'housing', 'family', 'benefits', 'criminal', 'employment',
  'vehicle', 'education', 'government', 'trades', 'health', 'healthcare',
];

// Infer a default tier and jurisdiction from the authorityType. Author can
// override with --tier / --jurisdiction flags.
const AUTHORITY_DEFAULTS = {
  'state-statute':       { tier: 'state',    jurisdiction: 'us-ny'  },
  'state-regulation':    { tier: 'state',    jurisdiction: 'us-ny'  },
  'federal-statute':     { tier: 'federal',  jurisdiction: 'us-fed' },
  'federal-regulation':  { tier: 'federal',  jurisdiction: 'us-fed' },
  'common-law':          { tier: 'state',    jurisdiction: 'us-ny'  },
  'agency-program':      { tier: 'state',    jurisdiction: 'us-ny'  },
  'local-ordinance':     { tier: 'county',   jurisdiction: 'us-ny-mon' },
};

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') { args.force = true; continue; }
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const val = argv[i + 1];
      if (!val || val.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = val;
        i++;
      }
    }
  }
  return args;
}

function fail(msg) {
  console.error('ERROR: ' + msg);
  console.error('');
  console.error('Usage:');
  console.error('  node scripts/scaffold-entry.cjs --id foo-ny --category housing --authorityType state-statute --primaryStatute "NY RPP 235-B"');
  process.exit(1);
}

function toConstName(id) {
  return id.replace(/[^a-zA-Z0-9]+/g, '_').toUpperCase();
}

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function buildTemplate({ id, category, authorityType, primaryStatute, tier, jurisdiction, title }) {
  const constName = toConstName(id);
  const titleText = title || `TODO — write a descriptive title for ${id} (third-person; no you/your)`;
  const primaryStatuteLine = primaryStatute
    ? `  primaryStatute: "${primaryStatute}",`
    : `  primaryStatute: null,`;

  return `export const ${constName} = {
  id: "${id}",
  category: "${category}",
  tier: "${tier}",
  jurisdiction: "${jurisdiction}",
  authorityType: "${authorityType}",
${primaryStatuteLine}
  status: "active",

  title: { en: "${titleText}" },

  summary: {
    en: "TODO — write a 1 to 3 sentence plain-English summary in third-person. Describes what the law does and who it applies to. 80 to 1500 characters."
  },

  whoQualifies: {
    en: [
      "TODO — a description of the first kind of person this applies to.",
      "TODO — a description of the second kind of person this applies to.",
      "TODO — add more as useful."
    ]
  },

  whatItMeans: {
    en: "TODO — a substantive plain-English walkthrough of the law, written in third-person. Minimum 400 characters; aim for 800+ for richer entries. Cover how the rule works, key definitions, timelines, exceptions, and practical effects. If a primaryStatute is set, reference the section number in the text so the citation lines up with the body."
  },

  yourRights: {
    en: [
      "A [role] has the right to TODO — write in third-person.",
      "A [role] has the right to TODO — write in third-person."
    ]
  },

  legalOptions: {
    en: [
      "TODO — agency or resource with phone and/or URL.",
      "TODO — local legal aid or referral resource."
    ]
  },

  example: {
    en: "TODO — a concrete Monroe County or Rochester-area scenario that illustrates how the rule operates."
  },

  counsel: [
    {
      type: "agency",
      name: "TODO — official agency name",
      focus: "TODO — what this agency handles",
      qualifier: "TODO — who qualifies to use this resource",
      access: "TODO — phone, online, or in-person",
      outcome: "TODO — what the author can expect",
      phone: "(555) 555-5555",
      url: "https://example.gov",
      verified: false,
      bilingual: false,
      languages: []
    }
  ],

  relatedIds: [
    // TODO — ids of 2+ related entries from src/data/legal/entries/
  ],

  relatedHelpResources: [],

  tags: [
    "TODO-tag-1",
    "TODO-tag-2",
    "TODO-tag-3",
    "TODO-tag-4",
    "TODO-tag-5"
  ],

  sources: [
    // TODO — at least one https URL, preferably .gov / .edu or a trusted
    // legal-aid domain. Prefer the underlying statute URL over agency landing
    // pages so the citation parser can render a readable statute reference.
  ],

  lastVerified: "${todayISO()}",
  volatility: "low",
  emergencyFlag: false,
  disclaimer: true,
  categoryDisclaimer: null
};
`;
}

function main() {
  const args = parseArgs(process.argv);

  if (!args.id) fail('missing --id');
  if (!args.category) fail('missing --category');
  if (!args.authorityType) fail('missing --authorityType');

  if (!/^[a-z0-9-]+$/.test(args.id)) {
    fail(`--id "${args.id}" must be lowercase a-z, digits, and hyphens only`);
  }
  if (!VALID_CATEGORIES.includes(args.category)) {
    fail(`--category "${args.category}" invalid. Valid: ${VALID_CATEGORIES.join(', ')}`);
  }
  if (!VALID_AUTHORITY_TYPES.includes(args.authorityType)) {
    fail(`--authorityType "${args.authorityType}" invalid. Valid: ${VALID_AUTHORITY_TYPES.join(', ')}`);
  }

  const defaults = AUTHORITY_DEFAULTS[args.authorityType] || {};
  const tier = args.tier || defaults.tier;
  const jurisdiction = args.jurisdiction || defaults.jurisdiction;
  const primaryStatute = typeof args.primaryStatute === 'string' ? args.primaryStatute : null;

  if (!tier) fail('could not infer --tier; please pass it explicitly');
  if (!jurisdiction) fail('could not infer --jurisdiction; please pass it explicitly');

  const filename = `${args.id}.js`;
  const filepath = path.join(ENTRIES_DIR, filename);

  if (fs.existsSync(filepath) && !args.force) {
    fail(`file already exists: ${filepath} (pass --force to overwrite)`);
  }

  const content = buildTemplate({
    id: args.id,
    category: args.category,
    authorityType: args.authorityType,
    primaryStatute,
    tier,
    jurisdiction,
    title: typeof args.title === 'string' ? args.title : null,
  });

  fs.writeFileSync(filepath, content, 'utf8');

  console.log(`Scaffolded: ${path.relative(process.cwd(), filepath)}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  1. Fill in every TODO in ${filename}`);
  console.log('  2. Run: npm run verify');
  console.log('  3. When the verify output is clean, run: npm run build');
}

main();
