#!/usr/bin/env node
/**
 * migrate-glossary-voice-55.cjs
 * ==============================
 * Fixes directive-voice drift across the 28 criminal-court glossary terms.
 * HelpFinder is built and maintained by non-attorneys — every glossary
 * entry must read as an explainer, not as legal advice. Two drift patterns
 * to scrub:
 *
 *   (a) Parenthetical advice inside `whatToAsk` items — "(Say yes...)",
 *       "(Always say yes if you do not have one.)", "(Ask about release
 *       on your own recognizance...)", etc. These suggest an action.
 *
 *   (b) Imperative clauses appended to questions — "Write the date down.",
 *       "Get the final charge in writing.", "Get a written copy and keep
 *       it.", etc. These tell the reader what to do.
 *
 * `whatToAsk` is supposed to be a list of questions the reader should
 * direct to their lawyer, the judge, or the clerk. Any content beyond
 * the question itself is out of place here.
 *
 * Also softens two `plainEnglish` phrases that slipped toward advisory
 * tone ("decide if you should take a plea", "your lawyer should explain").
 *
 * No changes to citations, related-term graphs, categories, or IDs.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const G = path.join(ROOT, 'src/data/legal/glossary');

const files = {
  acd: fs.readFileSync(path.join(G, 'acd.js'), 'utf8'),
  arraignment: fs.readFileSync(path.join(G, 'arraignment.js'), 'utf8'),
  bail: fs.readFileSync(path.join(G, 'bail.js'), 'utf8'),
  'bench-warrant': fs.readFileSync(path.join(G, 'bench-warrant.js'), 'utf8'),
  misdemeanor: fs.readFileSync(path.join(G, 'misdemeanor.js'), 'utf8'),
  'sealed-record': fs.readFileSync(path.join(G, 'sealed-record.js'), 'utf8'),
  felony: fs.readFileSync(path.join(G, 'felony.js'), 'utf8'),
  violation: fs.readFileSync(path.join(G, 'violation.js'), 'utf8'),
  'conditional-discharge': fs.readFileSync(path.join(G, 'conditional-discharge.js'), 'utf8'),
  plea: fs.readFileSync(path.join(G, 'plea.js'), 'utf8'),
  'public-defender': fs.readFileSync(path.join(G, 'public-defender.js'), 'utf8'),
  arrest: fs.readFileSync(path.join(G, 'arrest.js'), 'utf8'),
  'grand-jury': fs.readFileSync(path.join(G, 'grand-jury.js'), 'utf8'),
  indictment: fs.readFileSync(path.join(G, 'indictment.js'), 'utf8'),
  probation: fs.readFileSync(path.join(G, 'probation.js'), 'utf8'),
  appeal: fs.readFileSync(path.join(G, 'appeal.js'), 'utf8'),
  discovery: fs.readFileSync(path.join(G, 'discovery.js'), 'utf8'),
  'certificate-of-relief': fs.readFileSync(path.join(G, 'certificate-of-relief.js'), 'utf8'),
  'plea-bargain': fs.readFileSync(path.join(G, 'plea-bargain.js'), 'utf8'),
  sentence: fs.readFileSync(path.join(G, 'sentence.js'), 'utf8'),
};

let failures = 0;
let successes = 0;

function doReplace(termId, oldStr, newStr, label) {
  const current = files[termId];
  if (!current.includes(oldStr)) {
    console.error('ABORT ' + termId + ': ' + label);
    console.error('  Expected: ' + JSON.stringify(oldStr).slice(0, 180));
    failures++;
    return;
  }
  files[termId] = current.replace(oldStr, newStr);
  console.log('OK ' + termId + ': ' + label);
  successes++;
}

// ─── ACD ───
doReplace('acd',
  '"When exactly does the ACD end? Write the date down.",',
  '"When exactly does the ACD end?",',
  'drop "Write the date down" imperative');

// ─── ARRAIGNMENT ───
doReplace('arraignment',
  '"Can I get a free lawyer? (Say yes even if you are not sure \u2014 you can always hire your own later.)",',
  '"Can I get a free lawyer?",',
  'drop (Say yes...) parenthetical');
doReplace('arraignment',
  '"When is my next court date? Write it down before you leave."',
  '"When is my next court date?"',
  'drop "Write it down" imperative');

// ─── BAIL ───
doReplace('bail',
  '"Is there any way to be released without paying money? (Ask about release on your own recognizance or supervised release.)",',
  '"Is there any way to be released without paying money?",',
  'drop (Ask about ROR...) parenthetical');

// ─── BENCH WARRANT ───
doReplace('bench-warrant',
  '"Is there already a warrant in my name? (A lawyer or the court clerk can check.)",',
  '"Is there already a warrant in my name?",',
  'drop (A lawyer...can check) parenthetical');

// ─── MISDEMEANOR ───
doReplace('misdemeanor',
  '"Class A or Class B? (Class A is more serious.)",',
  '"Class A or Class B?",',
  'drop (Class A is more serious) parenthetical');

// ─── SEALED RECORD ───
doReplace('sealed-record',
  '"Do I need a lawyer to seal it? (Free legal aid can often help.)"',
  '"Do I need a lawyer to seal it?"',
  'drop (Free legal aid...) parenthetical');

// ─── FELONY ───
doReplace('felony',
  '"What class of felony is this? (A, B, C, D, or E \u2014 A is worst.)",',
  '"What class of felony is this?",',
  'drop (A, B, C, D, or E...) parenthetical');

// ─── VIOLATION ───
doReplace('violation',
  '"Is this a violation or a crime? (Violations are not crimes.)",',
  '"Is this a violation or a crime?",',
  'drop (Violations are not crimes) parenthetical');

// ─── CONDITIONAL DISCHARGE ───
doReplace('conditional-discharge',
  '"Exactly what conditions do I have to follow? Get the list in writing.",',
  '"Exactly what conditions do I have to follow?",',
  'drop "Get the list in writing" imperative');

// ─── PLEA ───
doReplace('plea',
  '"What exactly am I pleading to? Get the final charge in writing.",',
  '"What exactly am I pleading to?",',
  'drop "Get the final charge in writing" imperative');

// ─── PUBLIC DEFENDER ───
doReplace('public-defender',
  '"Can I have a free lawyer? (Always say yes if you do not have one.)",',
  '"Can I have a free lawyer?",',
  'drop (Always say yes...) parenthetical');

// ─── ARREST ───
doReplace('arrest',
  '"Am I free to go, or am I in custody? (You can ask this any time.)",',
  '"Am I free to go, or am I in custody?",',
  'drop (You can ask this any time) parenthetical');
doReplace('arrest',
  '"Can I have a lawyer? (You have the right to stay quiet until one is there.)",',
  '"Can I have a lawyer?",',
  'drop (You have the right to stay quiet...) parenthetical');

// ─── GRAND JURY ───
doReplace('grand-jury',
  '"Should I testify? (Ask your lawyer \u2014 the right answer depends on your case.)",',
  '"Should I testify?",',
  'drop (Ask your lawyer...) parenthetical');

// ─── INDICTMENT ───
doReplace('indictment',
  '"What exactly am I indicted for? (The indictment lists each count.)",',
  '"What exactly am I indicted for?",',
  'drop (The indictment lists each count) parenthetical');

// ─── PROBATION ───
doReplace('probation',
  '"What are my exact rules? Get a written copy and keep it.",',
  '"What are my exact rules?",',
  'drop "Get a written copy and keep it" imperative');

// ─── APPEAL ───
doReplace('appeal',
  '"Can I appeal this? (Not every case can be appealed \u2014 ask fast.)",',
  '"Can I appeal this?",',
  'drop (Not every case...ask fast) parenthetical');

// ─── DISCOVERY (plainEnglish softening) ───
doReplace('discovery',
  'Your lawyer uses this to figure out how strong the case is and to decide if you should take a plea or go to trial.',
  'Your lawyer uses this to figure out how strong the case is and to decide whether to take a plea or go to trial.',
  'plainEnglish: "should take a plea" -> "whether to take"');

// ─── CERTIFICATE OF RELIEF ───
doReplace('certificate-of-relief',
  '"Am I eligible? (Most people with NY convictions are, unless the top charge was a class A felony or certain repeat felonies.)",',
  '"Am I eligible?",',
  'drop eligibility parenthetical');

// ─── PLEA BARGAIN ───
doReplace('plea-bargain',
  '"What exact charge am I pleading to? (The new one, not the original.)",',
  '"What exact charge am I pleading to?",',
  'drop (The new one, not the original) parenthetical');
doReplace('plea-bargain',
  '"What is the exact sentence \u2014 all of it?",',
  '"What is the exact sentence?",',
  'drop "all of it" emphatic imperative');
doReplace('plea-bargain',
  'Before you accept, your lawyer should explain everything that will happen',
  'Before you accept, your lawyer will usually explain everything that will happen',
  'plainEnglish: "should explain" -> "will usually explain"');

// ─── SENTENCE ───
doReplace('sentence',
  '"Exactly what does my sentence include? (All of it \u2014 jail, fine, fees, conditions.)",',
  '"Exactly what does my sentence include?",',
  'drop (All of it...) parenthetical');

// ═══════════════════════════════════════════════
// WRITE
// ═══════════════════════════════════════════════
if (failures === 0) {
  for (const [termId, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(G, termId + '.js'), content, 'utf8');
  }
}
console.log('\n' + successes + ' changes, ' + failures + ' failures.');
if (failures > 0) {
  console.error('\nABORT: no files written.');
  process.exit(1);
}
console.log('\nWrote ' + Object.keys(files).length + ' glossary files.');
