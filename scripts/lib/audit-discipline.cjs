// scripts/lib/audit-discipline.cjs
//
// Shared output-discipline block appended to every audit prompt. Reduces
// token waste from verified-claims lists, tool narration, restated
// instructions, and empty section headers.
//
// Usage:
//   const { OUTPUT_DISCIPLINE } = require('./lib/audit-discipline.cjs');
//   const prompt = '...your audit prompt...' + OUTPUT_DISCIPLINE;

const OUTPUT_DISCIPLINE =
'\n\n---\n' +
'OUTPUT DISCIPLINE — important for token efficiency:\n' +
'- Do NOT list "verified claims" / "things that checked out" / "claims that match." Your job is to surface what is wrong. If a claim is fine, do not mention it. End the report with a single line: "All other items verified clean."\n' +
'- Do NOT narrate your investigation process. No "let me check X next" / "now I will verify Y" / "I will work through this systematically." Go straight to the report.\n' +
'- Do NOT emit empty section headers. If a section has no findings, drop the header entirely.\n' +
'- One line per issue where possible, with the citation as a tail tag and the suggested fix in a single sentence.\n' +
'- Do NOT restate the audit instructions back to me.\n' +
'- Skip the introduction. Open with the first issue or section header.\n';

module.exports = { OUTPUT_DISCIPLINE };
