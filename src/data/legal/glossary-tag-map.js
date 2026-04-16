// Maps HelpFinder program-category slugs to Legal Glossary category slugs.
// Many-to-one: multiple HelpFinder categories can map to the same glossary
// category (for example, both `legal` and `legalCriminal` map to `criminal`).
// Returns null when no reasonable mapping exists — in which case the
// "Common phrases in X" link should not render.
//
// Legal library entries already use the glossary taxonomy directly
// (entry.category === glossary category), so this map is only needed for
// the HelpFinder results view.

// Human-readable labels for glossary category slugs. Keep in sync with
// GLOSSARY_CATEGORY_META in Glossary.jsx and CATEGORY_META in
// scripts/prerender-glossary.cjs. Centralized here so the "Common phrases"
// link can render a friendly label from any surface.
export const GLOSSARY_CATEGORY_LABELS = {
  criminal: "Court & Arrests",
  housing: "Housing & Rent",
  family: "Family Court",
  benefits: "Benefits & Hearings",
  consumer: "Debt & Collections",
  employment: "Work & Pay",
  vehicle: "Driving & Tickets",
  immigration: "Immigration",
  general: "General Court Words",
};

export function glossaryCategoryLabel(cat) {
  return GLOSSARY_CATEGORY_LABELS[cat] || cat || "";
}

export function helpFinderToGlossaryCategory(hfCat) {
  if (!hfCat) return null;
  const map = {
    // Housing + eviction
    housing: "housing",
    legalEviction: "housing",

    // Legal umbrella defaults to criminal (richest glossary content so far)
    legal: "criminal",
    legalCriminal: "criminal",

    // Family decisions
    legalFamily: "family",
    parentalProtection: "family",
    childcare: "family",

    // Benefits
    cash: "benefits",
    legalBenefits: "benefits",

    // Consumer / debt / small claims
    legalDebt: "consumer",
    legalSmallClaims: "consumer",

    // Work & pay
    employment: "employment",
    legalWork: "employment",

    // Immigration
    legalImmigration: "immigration",
  };
  return map[hfCat] || null;
}
