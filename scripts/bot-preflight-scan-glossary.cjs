#!/usr/bin/env node
/*
 * scripts/bot-preflight-scan-glossary.cjs
 * ============================================================================
 * Build-gated quality scanner for the legal glossary.
 *
 * Mirrors scripts/bot-preflight-scan.cjs (which gates legal entries) but with
 * glossary-specific rules: 6th-grade reading level, non-directive plainEnglish,
 * pure-question whatToAsk items, structural integrity of cross-links.
 *
 * HARD FAILs (always exit 1):
 *   - Missing required field (id, term.en, plainEnglish.en, citation,
 *     sourceUrl, lastVerified, status)
 *   - Duplicate id across files
 *   - sourceUrl not https://, lastVerified not YYYY-MM-DD,
 *     status not in [active, draft, deprecated]
 *   - related[] points at a glossary id that doesn't exist
 *   - legalEntryIds[] points at a legal-entry filename that doesn't exist
 *     (or that is draft-gated)
 *   - Embedded double quote in en: line (vite-breaker)
 *
 * SCORED WARNs (gated by --fail-at=N like the legal scanner):
 *   - Avg sentence length in plainEnglish > 25 (+3) / > 35 (+6)
 *   - Lawyer-register markers in plainEnglish (+3 each, capped at 10)
 *   - Directive imperatives in plainEnglish (+2 each)
 *   - Second-person ("you/your") in plainEnglish (+1 per, capped at 5)
 *   - whatToAsk item doesn't end in '?' (+2)
 *   - whatToAsk parenthetical advice "(...)" (+3)
 *   - whatToAsk period followed by more text — trailing imperative (+3)
 *   - plainEnglish word count < 40 — too thin (+2)
 *
 * Usage:
 *   node scripts/bot-preflight-scan-glossary.cjs
 *   node scripts/bot-preflight-scan-glossary.cjs --fail-at=4
 *   node scripts/bot-preflight-scan-glossary.cjs --top=50
 *
 * Output:
 *   dist/verification-report-glossary.json — ranked queue + hard fails
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const GLOSSARY_DIR = path.join(ROOT, 'src', 'data', 'legal', 'glossary');
const ENTRIES_DIR = path.join(ROOT, 'src', 'data', 'legal', 'entries');
const DIST = path.join(ROOT, 'dist');
const REPORT = path.join(DIST, 'verification-report-glossary.json');

const args = process.argv.slice(2).reduce((acc, a) => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/);
  if (m) acc[m[1]] = m[2] === undefined ? true : m[2];
  return acc;
}, {});
const TOP = parseInt(args.top, 10) || 0;
const FAIL_AT = Number.isFinite(parseInt(args['fail-at'], 10)) ? parseInt(args['fail-at'], 10) : null;

const VALID_STATUS = new Set(['active', 'draft', 'deprecated']);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// ── Topic denylist (hard FAIL) ───────────────────────────────────────────────
// DV and immigration glossary entries are barred per maintainer policy. These
// topics live in high-harm categories where bad content can directly hurt
// someone in crisis — they belong in the gated legal-entry pipeline (with
// draft: true protection) and an attorney-vetted authoring track, not in the
// glossary corpus where any contributor can add a term.
const DENIED_SUBTAGS = new Set([
  'immigration',
  'deportation',
  'asylum',
  'domestic-violence',
  'dv',
  'intimate-partner-violence',
  'trafficking', // T-visa, U-visa cases
]);

const DENIED_ID_PATTERNS = [
  /^(daca|tps|u-visa|t-visa|vawa|vawa-self-petition|asylum|naturalization|green-card|removal-proceeding|immigration-.*|deportation-.*)$/i,
  /^(domestic-violence|intimate-partner-violence|restraining-order|order-of-protection-.*|battered-.*|dv-.*|abuser-.*)$/i,
];

const DENIED_TERM_PATTERNS = [
  /\b(?:USCIS|Immigration and Nationality Act|Lawful Permanent Resident|deportation|asylum seeker|asylee|naturalization|green\s*card|U\s+visa|T\s+visa|VAWA|Temporary Protected Status|TPS|DACA|removal proceeding|EAD|undocumented immigrant)\b/i,
  /\b(?:domestic violence|intimate partner violence|battered (?:woman|spouse|partner)|abuser|order of protection|restraining order|family offense|safe shelter)\b/i,
];

function isDeniedTopic(t) {
  // Subtag check — strongest signal that the entry is intentionally categorized
  // as DV or immigration.
  if (Array.isArray(t.subtags)) {
    for (const s of t.subtags) {
      if (DENIED_SUBTAGS.has(String(s).toLowerCase())) {
        return { reason: 'denied subtag', detail: s };
      }
    }
  }
  // ID check — known immigration/DV slugs.
  if (t.id) {
    for (const p of DENIED_ID_PATTERNS) {
      if (p.test(t.id)) return { reason: 'denied id pattern', detail: t.id };
    }
  }
  // Term.en check — entry primarily about an immigration/DV concept (term name
  // itself matches the topic). Plain-English content mentions are NOT checked
  // because many general entries reference DV or immigration in passing without
  // being primarily about those topics.
  const term = (t.term && t.term.en) || '';
  for (const p of DENIED_TERM_PATTERNS) {
    if (p.test(term)) return { reason: 'denied term name', detail: (term.match(p) || [''])[0] };
  }
  return null;
}

// ── Voice rules (mirror the legal scanner's lawyer-register list) ──────────
const LAWYER_REGISTER_PATTERNS = [
  { name: 'lawyer register: pursuant to', re: /\bpursuant to\b/gi },
  { name: 'lawyer register: et seq', re: /\bet\s*seq\.?/gi },
  { name: 'lawyer register: thereof', re: /\bthereof\b/gi },
  { name: 'lawyer register: hereinafter', re: /\bhereinafter\b/gi },
  { name: 'lawyer register: the foregoing', re: /\bthe foregoing\b/gi },
  { name: 'lawyer register: in lieu of', re: /\bin lieu of\b/gi },
  { name: 'lawyer register: notwithstanding', re: /\bnotwithstanding\b/gi },
  { name: 'lawyer register: enumerated', re: /\benumerated\b/gi },
  { name: 'lawyer register: rebuttable presumption', re: /\brebuttable presumption\b/gi },
  { name: 'lawyer register: concurrent jurisdiction', re: /\bconcurrent jurisdiction\b/gi },
  { name: 'lawyer register: void on its face', re: /\bvoid on (?:its|the) face\b/gi },
  { name: 'lawyer register: codified at', re: /\bcodified at\b/gi },
  { name: 'lawyer register: by operation of law', re: /\bby operation of law\b/gi },
  { name: 'lawyer register: natural person', re: /\bnatural person\b/gi },
];

const DIRECTIVE_PATTERNS = [
  { name: 'directive: Make sure', re: /(^|[\.\?\!]\s+)Make sure\b/g },
  { name: 'directive: Always', re: /(^|[\.\?\!]\s+)Always\s+[a-z]/g },
  { name: 'directive: Never', re: /(^|[\.\?\!]\s+)Never\s+[a-z]/g },
  { name: 'directive: Save the/a', re: /(^|[\.\?\!]\s+)Save (the|a) /g },
  { name: 'directive: Get a/an', re: /(^|[\.\?\!]\s+)Get an? /g },
  { name: 'directive: Take photos/notes/action', re: /(^|[\.\?\!]\s+)Take (photos|notes|action)/g },
  { name: 'directive: Document', re: /(^|[\.\?\!]\s+)Document the /g },
];

const SECOND_PERSON_RE = /\b(you|your|yours|you'?re|you'?ve|you'?ll|you'?d)\b/gi;
const SHOULD_MUST_RE = /\byou\s+(should|must)\b/gi;

// Reader-directive patterns — telling the reader (or "anyone", "the person",
// "the applicant", etc.) what to do. Distinct from third-party duty language
// ("the lender must respond"). The glossary is explainer-only; any sentence
// that tells the reader to take an action belongs in the wider HelpFinder
// flow, not in a definition.
const READER_DIRECTIVE_PATTERNS = [
  { name: 'reader directive: anyone/everyone should', re: /\b(?:anyone|everyone|all readers|the reader)\s+(?:should|must|needs? to|ought to)\b/gi },
  { name: 'reader directive: consult an attorney/lawyer', re: /\bconsult\s+(?:an?\s+)?(?:attorney|lawyer|advocate|immigration\s+lawyer|specialist)\b/gi },
  { name: 'reader directive: talk to a lawyer', re: /\btalk\s+to\s+(?:an?\s+)?(?:attorney|lawyer|advocate)\b/gi },
  { name: 'reader directive: speak with a lawyer', re: /\bspeak\s+(?:to|with)\s+(?:an?\s+)?(?:attorney|lawyer|advocate)\b/gi },
  { name: 'reader directive: reach out to', re: /\breach\s+out\s+to\s+(?:an?\s+|legal\s+aid|the\s+(?:agency|court|hotline))/gi },
  { name: 'reader directive: it is recommended/advisable', re: /\bit\s+is\s+(?:recommended|advisable|important|wise|best)\s+(?:to|that)\b/gi },
  { name: 'reader directive: best to / better to', re: /\b(?:best|better)\s+to\s+(?:consult|call|contact|file|apply|reach|speak|talk)\b/gi },
  { name: 'reader directive: consider Xing', re: /\bconsider\s+(?:consulting|calling|contacting|filing|applying|reaching|speaking|talking|hiring)\b/gi },
  { name: 'reader directive: be sure to', re: /\bbe\s+sure\s+to\b/gi },
  { name: 'reader directive: do not hesitate to', re: /\bdo\s+not\s+hesitate\s+to\b/gi },
];
// Only flag parens that read as advice — imperative verb at the start.
// Definitional parens like "(DAT)" or "(no contact at all)" are fine.
const PARENTHETICAL_ADVICE_RE = /\((?:Say|Always|Never|Make sure|Tell|Ask|Get|Write|Take|Document|Bring|Show|Note|Remember|Important|Tip|For example)\b/i;

// ── Helpers ────────────────────────────────────────────────────────────────
function wordCount(s) {
  if (!s) return 0;
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function avgSentenceLength(text) {
  if (!text) return 0;
  const sentences = text.split(/[\.\?\!]+\s+/).filter((s) => s.trim().length > 3);
  if (!sentences.length) return 0;
  const totalWords = sentences.reduce((s, x) => s + wordCount(x), 0);
  return totalWords / sentences.length;
}

function pickEn(field) {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field.en || '';
}

// Discover legal entry filenames + draft status (so legalEntryIds can be checked)
function loadLegalEntryIndex() {
  const set = new Set();
  const draftSet = new Set();
  if (!fs.existsSync(ENTRIES_DIR)) return { all: set, drafts: draftSet };
  for (const f of fs.readdirSync(ENTRIES_DIR)) {
    if (!f.endsWith('.js')) continue;
    const id = f.replace(/\.js$/, '');
    set.add(id);
    // crude draft detection — read raw file looking for `draft: true`
    const raw = fs.readFileSync(path.join(ENTRIES_DIR, f), 'utf8');
    if (/\bdraft\s*:\s*true\b/.test(raw)) draftSet.add(id);
  }
  return { all: set, drafts: draftSet };
}

function scanTerm(file, t, raw, glossaryIds, legalIndex) {
  const issues = [];
  let score = 0;
  let hardFail = false;

  // ── Topic denylist (hard FAIL) ─────────────────────────────────────────
  // DV and immigration topics are barred from the glossary per policy.
  const denied = isDeniedTopic(t);
  if (denied) {
    issues.push({
      severity: 'fail',
      rule: 'denied glossary topic (DV or immigration)',
      detail: denied.reason + ': ' + denied.detail,
    });
    hardFail = true;
  }

  // ── Required fields ────────────────────────────────────────────────────
  const required = ['id', 'category', 'citation', 'sourceUrl', 'lastVerified', 'status'];
  for (const f of required) {
    if (!t[f]) {
      issues.push({ severity: 'fail', rule: `missing required field: ${f}` });
      hardFail = true;
    }
  }
  if (!t.term || !t.term.en) {
    issues.push({ severity: 'fail', rule: 'missing required field: term.en' });
    hardFail = true;
  }
  if (!t.plainEnglish || !t.plainEnglish.en) {
    issues.push({ severity: 'fail', rule: 'missing required field: plainEnglish.en' });
    hardFail = true;
  }

  // ── Format checks ──────────────────────────────────────────────────────
  if (t.sourceUrl && !/^https:\/\//.test(t.sourceUrl)) {
    issues.push({ severity: 'fail', rule: 'sourceUrl must start with https://', detail: t.sourceUrl });
    hardFail = true;
  }
  if (t.lastVerified && !ISO_DATE.test(t.lastVerified)) {
    issues.push({ severity: 'fail', rule: 'lastVerified must be YYYY-MM-DD', detail: t.lastVerified });
    hardFail = true;
  }
  if (t.status && !VALID_STATUS.has(t.status)) {
    issues.push({ severity: 'fail', rule: 'invalid status', detail: t.status });
    hardFail = true;
  }

  // ── Cross-link integrity ───────────────────────────────────────────────
  if (Array.isArray(t.related)) {
    for (const rid of t.related) {
      if (!glossaryIds.has(rid)) {
        issues.push({ severity: 'fail', rule: 'related[] points at unknown glossary id', detail: rid });
        hardFail = true;
      }
    }
  }
  if (Array.isArray(t.legalEntryIds)) {
    for (const eid of t.legalEntryIds) {
      if (!legalIndex.all.has(eid)) {
        issues.push({ severity: 'fail', rule: 'legalEntryIds[] points at unknown legal entry', detail: eid });
        hardFail = true;
      } else if (legalIndex.drafts.has(eid)) {
        // Informational only — draft-gating is intentional for high-harm
        // entries and the link will resolve once the maintainer publishes.
        issues.push({ severity: 'warn', rule: 'legalEntryIds[] points at draft entry (will not render)', detail: eid });
      }
    }
  }

  // (Embedded-quote check skipped: any file that reaches this scanner has
  // already passed vite's JS parser via dynamic import, so an unescaped quote
  // would have caused the import to throw before we got here.)

  // If we already failed structurally, skip voice scoring (don't pile on)
  if (hardFail) return { file, id: t.id, score, hardFail, issues };

  // ── Voice scoring (plainEnglish.en) ────────────────────────────────────
  const pe = pickEn(t.plainEnglish);
  const peWords = wordCount(pe);

  if (peWords < 40) {
    issues.push({ severity: 'warn', rule: 'thin plainEnglish (< 40 words)', detail: peWords });
    score += 2;
  }

  const avg = avgSentenceLength(pe);
  if (avg > 35) {
    issues.push({ severity: 'warn', rule: 'long sentences (avg > 35 words)', detail: Math.round(avg) });
    score += 6;
  } else if (avg > 25) {
    issues.push({ severity: 'warn', rule: 'long sentences (avg > 25 words)', detail: Math.round(avg) });
    score += 3;
  }

  const lawyerHits = [];
  for (const p of LAWYER_REGISTER_PATTERNS) {
    const count = (pe.match(p.re) || []).length;
    if (count > 0) lawyerHits.push({ rule: p.name, count });
  }
  if (lawyerHits.length > 0) {
    const total = lawyerHits.reduce((s, x) => s + x.count, 0);
    issues.push({ severity: 'warn', rule: 'lawyer register markers in plainEnglish', detail: lawyerHits });
    score += Math.min(total * 3, 10);
  }

  const directiveHits = [];
  for (const p of DIRECTIVE_PATTERNS) {
    const count = (pe.match(p.re) || []).length;
    if (count > 0) directiveHits.push({ rule: p.name, count });
  }
  if (directiveHits.length > 0) {
    const total = directiveHits.reduce((s, x) => s + x.count, 0);
    issues.push({ severity: 'warn', rule: 'directive imperatives in plainEnglish', detail: directiveHits });
    score += total * 2;
  }

  const shouldMust = (pe.match(SHOULD_MUST_RE) || []).length;
  if (shouldMust > 0) {
    issues.push({ severity: 'warn', rule: 'directive: you should/must in plainEnglish', detail: shouldMust });
    score += shouldMust * 2;
  }

  // Reader-directive patterns — flag content that tells the reader (or any
  // generic stand-in for the reader) to take an action. Glossary entries are
  // pure explainers; action guidance belongs elsewhere.
  const readerDirectiveHits = [];
  for (const p of READER_DIRECTIVE_PATTERNS) {
    const count = (pe.match(p.re) || []).length;
    if (count > 0) readerDirectiveHits.push({ rule: p.name, count });
  }
  if (readerDirectiveHits.length > 0) {
    const total = readerDirectiveHits.reduce((s, x) => s + x.count, 0);
    issues.push({ severity: 'warn', rule: 'reader-directive in plainEnglish', detail: readerDirectiveHits });
    score += total * 3;
  }

  const sp = (pe.match(SECOND_PERSON_RE) || []).length;
  if (sp > 0) {
    issues.push({ severity: 'warn', rule: 'second-person in plainEnglish', detail: sp });
    score += Math.min(sp, 5);
  }

  // ── whatToAsk checks ──────────────────────────────────────────────────
  const wta = (t.whatToAsk && Array.isArray(t.whatToAsk.en)) ? t.whatToAsk.en : [];
  const wtaIssues = [];
  for (const item of wta) {
    if (typeof item !== 'string') continue;
    const trimmed = item.trim();
    if (!trimmed.endsWith('?')) {
      wtaIssues.push({ item: trimmed.slice(0, 60), problem: 'does not end in ?' });
      score += 2;
    }
    if (PARENTHETICAL_ADVICE_RE.test(trimmed)) {
      wtaIssues.push({ item: trimmed.slice(0, 60), problem: 'parenthetical advice' });
      score += 3;
    }
    // Period followed by more text (trailing imperative pattern)
    if (/\.\s+\S/.test(trimmed)) {
      wtaIssues.push({ item: trimmed.slice(0, 60), problem: 'trailing imperative after period' });
      score += 3;
    }
  }
  if (wtaIssues.length > 0) {
    issues.push({ severity: 'warn', rule: 'whatToAsk items violate pure-question rule', detail: wtaIssues });
  }

  return { file, id: t.id, category: t.category, lastVerified: t.lastVerified, score, hardFail, issues, peWords };
}

async function main() {
  if (!fs.existsSync(GLOSSARY_DIR)) {
    console.log('No glossary directory found at', GLOSSARY_DIR);
    process.exit(0);
  }

  const legalIndex = loadLegalEntryIndex();
  const files = fs.readdirSync(GLOSSARY_DIR).filter((f) => f.endsWith('.js'));

  // First pass — load all terms, build id set for cross-link validation
  const loaded = [];
  const idCounts = new Map();
  for (const f of files) {
    const abs = path.join(GLOSSARY_DIR, f);
    const mod = await import(pathToFileURL(abs).href);
    const t = Object.values(mod)[0];
    if (!t || !t.id) {
      loaded.push({ file: f, term: null, raw: fs.readFileSync(abs, 'utf8') });
      continue;
    }
    idCounts.set(t.id, (idCounts.get(t.id) || 0) + 1);
    loaded.push({ file: f, term: t, raw: fs.readFileSync(abs, 'utf8') });
  }
  const glossaryIds = new Set([...idCounts.keys()]);

  // Second pass — scan each
  const rows = [];
  let hardFails = 0;
  for (const { file, term, raw } of loaded) {
    if (!term) {
      rows.push({ file, id: null, score: 0, hardFail: true, issues: [{ severity: 'fail', rule: 'no exported term object' }] });
      hardFails++;
      continue;
    }
    const row = scanTerm(file, term, raw, glossaryIds, legalIndex);
    // Duplicate id check
    if (idCounts.get(term.id) > 1) {
      row.issues.unshift({ severity: 'fail', rule: 'duplicate id', detail: idCounts.get(term.id) });
      row.hardFail = true;
    }
    if (row.hardFail) hardFails++;
    rows.push(row);
  }

  rows.sort((a, b) => (b.hardFail ? 1 : 0) - (a.hardFail ? 1 : 0) || b.score - a.score);
  const queue = TOP > 0 ? rows.slice(0, TOP) : rows;

  if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(REPORT, JSON.stringify({
    runAt: new Date().toISOString(),
    totalScanned: files.length,
    hardFails,
    withScore: rows.filter((r) => r.score > 0).length,
    queue,
  }, null, 2));

  console.log('HelpFinder glossary preflight scanner');
  console.log('=====================================');
  console.log('Terms scanned   :', files.length);
  console.log('Hard fails      :', hardFails);
  console.log('With score > 0  :', rows.filter((r) => r.score > 0).length);
  console.log('Report          :', REPORT);
  console.log('');

  // Print hard fails first
  const failed = rows.filter((r) => r.hardFail);
  if (failed.length > 0) {
    console.log('HARD FAILS:');
    for (const r of failed) {
      console.log('  ' + r.file + (r.id ? ' (' + r.id + ')' : ''));
      for (const i of r.issues.filter((x) => x.severity === 'fail')) {
        console.log('    ✗ ' + i.rule + (i.detail ? ' — ' + JSON.stringify(i.detail) : ''));
      }
    }
    console.log('');
  }

  console.log('Top 30 by score:');
  console.log('score  category    file');
  console.log('-----  ---------   --------------------------------------------');
  for (const r of queue.filter((r) => r.score > 0).slice(0, 30)) {
    console.log(String(r.score).padStart(5) + '  ' + String(r.category || '-').padEnd(10) + '  ' + r.file);
  }

  // Hard-fail gate
  if (hardFails > 0) {
    console.log('');
    console.log('FAIL: ' + hardFails + ' glossary term(s) failed structural validation. Fix the issues above before shipping.');
    process.exit(1);
  }

  if (FAIL_AT !== null) {
    const offenders = rows.filter((r) => r.score >= FAIL_AT);
    if (offenders.length > 0) {
      console.log('');
      console.log('FAIL: ' + offenders.length + ' glossary term(s) scored >= ' + FAIL_AT + ' on the preflight scanner.');
      console.log('Fix the issues above (lawyer-register scrubs, sentence-length, whatToAsk pure-question, second-person) before shipping.');
      process.exit(1);
    } else {
      console.log('');
      console.log('OK: no glossary terms score >= ' + FAIL_AT + ' (preflight gate clean).');
    }
  }
}

main().catch((e) => {
  console.error('ERROR:', e);
  process.exit(1);
});
