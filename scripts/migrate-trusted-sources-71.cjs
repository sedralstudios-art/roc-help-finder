// migrate-trusted-sources-71.cjs
// Phase 1 of trusted-source domain cleanup.
// Replaces untrusted statute/case mirror URLs with .gov / .edu equivalents.
//
// Replacements:
//   codes.findlaw.com/ny/<law-name>/<abbr>-sect-<num>    → nysenate.gov/legislation/laws/<CODE>/<num>
//   supreme.justia.com/cases/federal/us/<vol>/<page>/    → law.cornell.edu/supremecourt/text/<vol>/<page>
//   law.justia.com/codes/new-york/rpa/...-<num>/         → nysenate.gov/legislation/laws/RPA/<num>
//
// Leaves alone (handled in later phases):
//   - law.justia.com/cases/new-york/court-of-appeals (NY Court of Appeals case law)
//   - govt.westlaw.com/nycrr (NYCRR landing pages)

const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = path.join(__dirname, '..', 'src', 'data', 'legal', 'entries');

const FINDLAW_LAW_MAP = {
  'family-court-act': 'FCT',
  'vehicle-and-traffic-law': 'VAT',
  'social-services-law': 'SOS',
  'real-property-law': 'RPP',
  'real-property-actions-and-proceedings-law': 'RPA',
  'general-obligations-law': 'GOB',
  'workers-compensation-law': 'WKC',
  'general-business-law': 'GBS',
};

function swapFindlaw(url) {
  // https://codes.findlaw.com/ny/<law-name>/<abbr>-sect-<num>/
  const m = url.match(/^https?:\/\/codes\.findlaw\.com\/ny\/([a-z-]+)\/([a-z]+)-sect-([^/]+)\/?$/i);
  if (!m) return null;
  const [, lawName, , sectionRaw] = m;
  const code = FINDLAW_LAW_MAP[lawName];
  if (!code) return null;
  // Handle sections with trailing identifiers: "350-j" stays "350-j", "413" stays "413"
  const section = sectionRaw.toUpperCase();
  return `https://www.nysenate.gov/legislation/laws/${code}/${section}`;
}

function swapSupremeJustia(url) {
  // https://supreme.justia.com/cases/federal/us/<vol>/<page>/
  const m = url.match(/^https?:\/\/supreme\.justia\.com\/cases\/federal\/us\/(\d+)\/(\d+)\/?$/i);
  if (!m) return null;
  const [, vol, page] = m;
  return `https://www.law.cornell.edu/supremecourt/text/${vol}/${page}`;
}

function swapJustiaNyStatute(url) {
  // https://law.justia.com/codes/new-york/<abbr>/article-N/<num>/
  // Non-case pages — the /codes/ prefix is statute mirror, /cases/ is case law.
  const m = url.match(/^https?:\/\/law\.justia\.com\/codes\/new-york\/([a-z]+)\/[^/]+\/([^/]+)\/?$/i);
  if (!m) return null;
  const [, abbr, section] = m;
  const code = abbr.toUpperCase();
  return `https://www.nysenate.gov/legislation/laws/${code}/${section.toUpperCase()}`;
}

function transform(url) {
  return swapFindlaw(url) || swapSupremeJustia(url) || swapJustiaNyStatute(url);
}

const files = fs.readdirSync(ENTRIES_DIR).filter(f => f.endsWith('.js'));
let filesChanged = 0;
let urlsChanged = 0;
const BANKRUPTCY = new Set(fs.readdirSync(ENTRIES_DIR).filter(f => f.startsWith('bankruptcy-')));

for (const f of files) {
  if (BANKRUPTCY.has(f)) continue;
  const p = path.join(ENTRIES_DIR, f);
  let content = fs.readFileSync(p, 'utf8');
  const original = content;
  content = content.replace(
    /"(https?:\/\/(?:codes\.findlaw\.com|supreme\.justia\.com|law\.justia\.com\/codes)\/[^"]+)"/g,
    (m, url) => {
      const replacement = transform(url);
      if (replacement) {
        urlsChanged++;
        return `"${replacement}"`;
      }
      return m;
    }
  );
  if (content !== original) {
    fs.writeFileSync(p, content);
    filesChanged++;
    console.log('updated:', f);
  }
}

console.log(`\nDone: ${urlsChanged} URLs changed across ${filesChanged} files.`);
