// scripts/list-program-factcheck-queue.cjs
//
// Lists every program in src/data/programs.js that lacks a `fc:"YYYY-MM-DD"`
// fact-check marker. Companion to fact-check-program-prompt.cjs.
//
// fc is the short-form fact-check marker for programs (programs.js uses
// compact field names like n/c/d/ph; the equivalent of legal entries'
// factCheckedBy:{tool,date} is just `fc:"YYYY-MM-DD"`).
//
// Usage:
//   node scripts/list-program-factcheck-queue.cjs
//   node scripts/list-program-factcheck-queue.cjs --count

const fs = require('fs');
const path = require('path');

const PROGRAMS_FILE = path.join(__dirname, '..', 'src', 'data', 'programs.js');

function main() {
  const src = fs.readFileSync(PROGRAMS_FILE, 'utf8');
  const queue = [];
  const lines = src.split(/\r?\n/);
  for (const line of lines) {
    const idMatch = line.match(/\bid:"([^"]+)"/);
    if (!idMatch) continue;
    const id = idMatch[1];
    if (/\bfc:"\d{4}-\d{2}-\d{2}"/.test(line)) continue;
    queue.push(id);
  }
  for (const id of queue) console.log(id);
  console.error(`\n${queue.length} programs in fact-check queue`);
}

main();
