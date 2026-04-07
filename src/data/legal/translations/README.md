# Legal Library Translations

This folder holds per-language translation files for the legal library.
One file per language, using the language code as filename:

  es.js   Spanish
  vi.js   Vietnamese
  zh.js   Chinese
  ... etc.

Each file exports a default object keyed by entry ID:

    export default {
      "benefit-overpayment-ny": {
        title: "...",
        summary: "...",
        yourRights: ["...", "...", "..."]
      },
      // ... more entries
    }

These are merged into the entries at load time (index.js) and at build
time (scripts/prerender-legal.cjs). The merge overwrites only fields
that are present in the translation file — untranslated fields fall
back to English.

Translations are AI-generated and should receive a native-speaker review
pass before being considered certified for legal use.
