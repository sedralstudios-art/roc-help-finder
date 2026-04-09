#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-useeffect-fix-08.cjs
 *
 * Fix: migrate-07's useEffect import check was wrong. It substring-matched
 * `useEffect` against existing `React.useEffect(...)` usages and concluded
 * the hook was already imported. It wasn't — the existing code uses
 * `React.useEffect` to bypass the missing destructured import. The new
 * hasSensitiveProgram code uses bare `useEffect(...)` and would throw
 * at runtime.
 *
 * Fix: add useEffect to the destructured React import. Now both patterns
 * work and code style is consistent.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;
const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

if (src.includes('useState, useMemo, useEffect, useRef')) {
  console.log('useEffect import: already destructured, skipping');
  process.exit(0);
}

const oldStr = 'import React, { useState, useMemo, useRef } from "react";';
const newStr = 'import React, { useState, useMemo, useEffect, useRef } from "react";';

if (!src.includes(oldStr)) {
  console.error('FATAL: anchor not found — React import line may have changed shape');
  console.error('No changes written.');
  process.exit(1);
}

src = src.replace(oldStr, newStr);
if (hadCRLF) src = src.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, src);

console.log('useEffect import: applied');
console.log(`HelpFinder.jsx: ${orig.length} → ${src.length} bytes`);
