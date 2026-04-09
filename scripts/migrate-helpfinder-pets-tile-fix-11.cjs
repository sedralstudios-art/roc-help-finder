#!/usr/bin/env node
/**
 * scripts/migrate-helpfinder-pets-tile-fix-11.cjs
 *
 * Fix: migrate-07 patch 5 wrote the pets tile as a <button onClick={() => nav(PAGES.HELP)}>.
 * Two problems:
 *   1. PAGES.HELP doesn't exist in the LandingPage PAGES enum (only HOME,
 *      ABOUT, PRIVACY, TERMS, SUPPORT, LEGAL_LIBRARY, LEGAL_ENTRY, LEGAL_CATEGORY)
 *   2. nav() is the LandingPage's internal page-state setter — it can only
 *      route to pages that LIVE INSIDE LandingPage. HelpFinder is a sibling
 *      component mounted by the app-level router, not a sub-page of LandingPage.
 *
 * Symptom: tapping the pets tile sets page to undefined, no render case
 * matches, body renders empty (header + footer survive because they're
 * outside the page-state switch).
 *
 * Fix: replace the <button> with an <a> using the same pattern the working
 * "Find help now" green circle uses at line 709 of LandingPage.jsx:
 *
 *   <a href="/help"
 *      onClick={(e) => { e.preventDefault(); if (onNavigateHelp) onNavigateHelp(); }}>
 *
 * The href provides correct browser semantics (right-click → open in new
 * tab works, screen readers announce as a link). The onClick prevents
 * the default page reload and calls the onNavigateHelp prop, which is
 * passed in from the app router that knows how to mount HelpFinder.
 *
 * Also adds textDecoration: "none" to suppress the default link underline.
 *
 * Single patch. Idempotent. Aborts cleanly if anchor not found.
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'components', 'LandingPage.jsx');

let src = fs.readFileSync(FILE, 'utf8');
const orig = src;
const hadCRLF = src.includes('\r\n');
src = src.replace(/\r\n/g, '\n');

if (src.includes('href="/help"\n            onClick={(e) => { e.preventDefault(); if (onNavigateHelp) onNavigateHelp(); }}\n            className="hf-fade-in hf-d5"')) {
  console.log('pets tile nav fix: already applied, skipping');
  process.exit(0);
}

const oldStr = `          {/* ── PETS TILE ── added April 9, 2026 */}
          {/* Peer to Know Your Rights. Soft blue, paw icon. */}
          {/* TODO: deep-link directly into pets category once nav() signature for hash deep-link is verified */}
          <button
            onClick={() => nav(PAGES.HELP)}
            className="hf-fade-in hf-d5"
            style={{
              width: "100%", textAlign: isRTL ? "right" : "left",
              background: "#e3f2fd", border: "1px solid #1565c0",
              borderRadius: 24, padding: "18px 22px", cursor: "pointer",
              marginTop: 12, fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 16,
            }}
          >
            <div style={{ fontSize: 34, flexShrink: 0, lineHeight: 1 }}>🐾</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.bark, marginBottom: 3 }}>Help for pets</div>
              <div style={{ fontSize: 13, color: C.stone, lineHeight: 1.45 }}>Adoption, vet care, food, surrender support, and shelters that accept pets.</div>
            </div>
            <div style={{ fontSize: 22, color: "#1565c0", flexShrink: 0, fontWeight: 700 }}>→</div>
          </button>`;

const newStr = `          {/* ── PETS TILE ── added April 9, 2026, nav fixed migrate-11 */}
          {/* Peer to Know Your Rights. Soft blue, paw icon. */}
          {/* Uses the same <a href="/help"> + onNavigateHelp() pattern as the */}
          {/* "Find help now" green circle at line ~709 — HelpFinder is a sibling */}
          {/* component mounted by the app router, not a sub-page of LandingPage. */}
          {/* TODO: deep-link directly into pets category (currently lands on /help WHAT_TAB) */}
          
            href="/help"
            onClick={(e) => { e.preventDefault(); if (onNavigateHelp) onNavigateHelp(); }}
            className="hf-fade-in hf-d5"
            style={{
              width: "100%", textAlign: isRTL ? "right" : "left",
              background: "#e3f2fd", border: "1px solid #1565c0",
              borderRadius: 24, padding: "18px 22px", cursor: "pointer",
              marginTop: 12, fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 16,
              textDecoration: "none", boxSizing: "border-box",
            }}
          >
            <div style={{ fontSize: 34, flexShrink: 0, lineHeight: 1 }}>🐾</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.bark, marginBottom: 3 }}>Help for pets</div>
              <div style={{ fontSize: 13, color: C.stone, lineHeight: 1.45 }}>Adoption, vet care, food, surrender support, and shelters that accept pets.</div>
            </div>
            <div style={{ fontSize: 22, color: "#1565c0", flexShrink: 0, fontWeight: 700 }}>→</div>
          </a>`;

if (!src.includes(oldStr)) {
  console.error('FATAL: pets tile anchor not found in LandingPage.jsx');
  console.error('The tile JSX may have been modified since migrate-07.');
  console.error('No changes written.');
  process.exit(1);
}

src = src.replace(oldStr, newStr);
if (hadCRLF) src = src.replace(/\n/g, '\r\n');
fs.writeFileSync(FILE, src);

console.log('pets tile nav fix: applied');
console.log(`LandingPage.jsx: ${orig.length} → ${src.length} bytes`);
