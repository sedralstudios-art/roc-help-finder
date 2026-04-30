// Canonical fact poles — single source of truth for fact-checkable data.
//
// Pattern: each pole has { value, lastVerified, source, notes }. Entries
// reference the constant rather than hardcoding the value, so a number
// change is one edit and eyeball drift becomes structurally impossible.
//
// New poles get added here as the redo surfaces the need. Don't refactor
// existing entries en masse — convert as the redo touches them, one batch
// at a time. The redo IS the migration vector.

export * from './phones.js';

// Future poles (not yet built; add as redo surfaces them):
// export * from './addresses.js';      // shared physical locations
// export * from './hours.js';          // common patterns (govStandard, etc.)
// export * from './state-figures.js';  // year-stamped: NY min wage, EITC max, FPL %, estate exemption
// export * from './statutes.js';       // NY_CODE_NAMES + plain-English summaries
// export * from './fees.js';           // court filing fees, license fees, permit fees
// export * from './dates.js';          // program windows, filing deadlines
// export * from './officeholders.js';  // assessor, clerk, judge per office (term-bounded)
// export * from './eligibility.js';    // senior age, EITC qualifying child rules
// export * from './geography.js';      // ZIPs by town, school district boundaries
