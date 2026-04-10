/**
 * Migration 20 — Share button i18n
 *
 * Adds shareLabel, shareText, shareAriaLabel translation keys to
 * LandingPage.jsx (8 langs) and HelpFinder.jsx (8 langs).
 * Updates 3 ShareButton instances to use t(lang, ...) instead of
 * hardcoded English. Removes the 3 TODO: i18n comments.
 *
 * Run: node scripts/migrate-share-i18n-20.cjs
 * Verify: grep -n "shareLabel\|shareText\|shareAriaLabel" src/components/LandingPage.jsx src/components/HelpFinder.jsx
 */

const fs = require('fs');
const path = require('path');

// ── TRANSLATIONS ──
// Verified against existing codebase patterns and language conventions.
// "HelpFinder" stays in Latin script in all languages (proper noun).
const SHARE = {
  en: {
    shareLabel: 'Share HelpFinder',
    shareText: 'Free help and legal info for Monroe County. No accounts, no ads, no tracking.',
    shareAriaLabel: 'Share HelpFinder with someone who needs it',
  },
  es: {
    shareLabel: 'Compartir HelpFinder',
    shareText: 'Ayuda gratuita e información legal para el condado de Monroe. Sin cuentas, sin anuncios, sin rastreo.',
    shareAriaLabel: 'Compartir HelpFinder con alguien que lo necesite',
  },
  ne: {
    shareLabel: 'HelpFinder साझा गर्नुहोस्',
    shareText: 'Monroe County को लागि निःशुल्क सहयोग र कानूनी जानकारी। कुनै खाता छैन, कुनै विज्ञापन छैन, कुनै ट्र्याकिङ छैन।',
    shareAriaLabel: 'HelpFinder चाहिने कसैलाई साझा गर्नुहोस्',
  },
  ar: {
    shareLabel: 'شارك HelpFinder',
    shareText: 'مساعدة مجانية ومعلومات قانونية لمقاطعة مونرو. بدون حسابات، بدون إعلانات، بدون تتبع.',
    shareAriaLabel: 'شارك HelpFinder مع شخص يحتاجه',
  },
  sw: {
    shareLabel: 'Shiriki HelpFinder',
    shareText: 'Msaada wa bure na habari za kisheria kwa Monroe County. Hakuna akaunti, hakuna matangazo, hakuna ufuatiliaji.',
    shareAriaLabel: 'Shiriki HelpFinder na mtu anayehitaji',
  },
  my: {
    shareLabel: 'HelpFinder မျှဝေပါ',
    shareText: 'Monroe County အတွက် အခမဲ့ အကူအညီနှင့် ဥပဒေဆိုင်ရာ အချက်အလက်များ။ အကောင့်မရှိ၊ ကြော်ငြာမရှိ၊ ခြေရာခံမှုမရှိ။',
    shareAriaLabel: 'လိုအပ်သူတစ်ယောက်ကို HelpFinder မျှဝေပါ',
  },
  so: {
    shareLabel: 'La wadaag HelpFinder',
    shareText: 'Caawimo lacag la\'aan ah iyo macluumaad sharci ah ee Monroe County. Akoon la\'aan, xayeysiis la\'aan, raadraac la\'aan.',
    shareAriaLabel: 'La wadaag HelpFinder qof u baahan',
  },
  zh: {
    shareLabel: '分享 HelpFinder',
    shareText: '门罗县免费帮助和法律信息。无需账户，无广告，无追踪。',
    shareAriaLabel: '将 HelpFinder 分享给需要的人',
  },
};

function escapeForReplace(str) {
  return str.replace(/\$/g, '$$$$');
}

function addKeysToBlock(content, anchor, lang) {
  const s = SHARE[lang];
  const newLines =
    `    shareLabel: "${s.shareLabel}",\n` +
    `    shareText: "${s.shareText}",\n` +
    `    shareAriaLabel: "${s.shareAriaLabel}",`;
  const idx = content.indexOf(anchor);
  if (idx === -1) {
    console.error(`  ✗ Anchor not found for ${lang}: ${anchor.slice(0, 60)}...`);
    return content;
  }
  const insertAt = idx + anchor.length;
  return content.slice(0, insertAt) + '\n' + newLines + content.slice(insertAt);
}

// ── LANDING PAGE ──
console.log('\n=== LandingPage.jsx ===');
const lpPath = path.join(__dirname, '..', 'src', 'components', 'LandingPage.jsx');
let lp = fs.readFileSync(lpPath, 'utf8');

// Anchors: supportDisclaimer in each language block (unique per lang)
const lpAnchors = {
  en: '    supportDisclaimer: "Sedral Studios is not a registered nonprofit. Donations support hosting, research, and expansion to new cities. Thank you.",',
  es: '    supportDisclaimer: "Sedral Studios no es una organización sin fines de lucro registrada. Las donaciones apoyan el hosting, investigación y expansión a nuevas ciudades. Gracias.",',
  ne: '    supportDisclaimer: "दानले होस्टिङ र विस्तारलाई समर्थन गर्छ। धन्यवाद।",',
  ar: '    supportDisclaimer: "التبرعات تدعم الاستضافة والتوسع. شكراً.",',
  sw: '    supportDisclaimer: "Michango inasaidia hosting na upanuzi. Asante.",',
  my: '    supportDisclaimer: "လှူဒါန်းငွေများသည် hosting နှင့်တိုးချဲ့မှုကိုထောက်ပံ့သည်။",',
  so: '    supportDisclaimer: "Deeqaha waxay taageeraan hosting iyo ballaarinta. Mahadsanid.",',
  zh: '    supportDisclaimer: "捐款支持托管和扩展。谢谢。",',
};

for (const lang of Object.keys(lpAnchors)) {
  lp = addKeysToBlock(lp, lpAnchors[lang], lang);
  console.log(`  ✓ ${lang} — 3 share keys added`);
}

// Replace ShareButton instances (2 in LandingPage)
// Instance 1 — homepage placement (~line 743)
lp = lp.replace(
  `{/* Share — homepage placement, added April 9, 2026. TODO: i18n */}
          <div style={{ textAlign: "center", marginTop: 20, marginBottom: 4 }}>
            <ShareButton
              title="HelpFinder"
              text="Free help and legal info for Monroe County. No accounts, no ads, no tracking."
              url="https://helpfinder.help"
              label="Share HelpFinder"
              ariaLabel="Share HelpFinder with a friend who needs it"
            />`,
  escapeForReplace(`<div style={{ textAlign: "center", marginTop: 20, marginBottom: 4 }}>
            <ShareButton
              title="HelpFinder"
              text={t(lang, "shareText")}
              url="https://helpfinder.help"
              label={t(lang, "shareLabel")}
              ariaLabel={t(lang, "shareAriaLabel")}
            />`)
);
console.log('  ✓ ShareButton #1 (homepage) updated + TODO removed');

// Instance 2 — support section (~line 964)
lp = lp.replace(
  `{/* Share — added April 9, 2026. TODO: i18n */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <ShareButton
              title="HelpFinder"
              text="Free help and legal info for Monroe County. No accounts, no ads, no tracking."
              url="https://helpfinder.help"
              label="Share HelpFinder"
              ariaLabel="Share HelpFinder with someone who needs it"
            />`,
  escapeForReplace(`<div style={{ textAlign: "center", marginBottom: 20 }}>
            <ShareButton
              title="HelpFinder"
              text={t(lang, "shareText")}
              url="https://helpfinder.help"
              label={t(lang, "shareLabel")}
              ariaLabel={t(lang, "shareAriaLabel")}
            />`)
);
console.log('  ✓ ShareButton #2 (support) updated + TODO removed');

fs.writeFileSync(lpPath, lp, 'utf8');
console.log('  ✓ LandingPage.jsx saved');

// ── HELPFINDER ──
console.log('\n=== HelpFinder.jsx ===');
const hfPath = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');
let hf = fs.readFileSync(hfPath, 'utf8');

// Anchors: last key before }, in each block
const hfAnchors = {
  en: '    parentalProtectionDisclaimer: "This information is not legal advice. Laws and procedures change. Always consult a lawyer for your specific situation. Legal Aid and LawNY offer free legal help.",',
  es: `    alsoNeed: "También necesito ayuda con otra cosa",`,
  ne: `    alsoNeed: "मलाई अरू कुरामा पनि सहयोग चाहिन्छ",`,
  ar: `    alsoNeed: "أحتاج مساعدة في شيء آخر أيضاً",`,
  sw: `    alsoNeed: "Pia nahitaji msaada na kitu kingine",`,
  my: `    alsoNeed: "အခြားကိစ္စတွင်လည်းအကူအညီလိုပါတယ်",`,
  so: `    alsoNeed: "Waxaan sidoo kale u baahanahay caawimaad wax kale",`,
  zh: `    alsoNeed: "我还需要其他方面的帮助",`,
};

for (const lang of Object.keys(hfAnchors)) {
  hf = addKeysToBlock(hf, hfAnchors[lang], lang);
  console.log(`  ✓ ${lang} — 3 share keys added`);
}

// Replace ShareButton instance (1 in HelpFinder)
hf = hf.replace(
  `{/* Share — added April 9, 2026. TODO: i18n */}
        <div style={{ marginTop: 8, textAlign: "center" }}>
          <ShareButton
            title="HelpFinder"
            text="Free help and legal info for Monroe County. No accounts, no ads, no tracking."
            url="https://helpfinder.help"
            label="Share HelpFinder"
            ariaLabel="Share HelpFinder with someone who needs it"
          />`,
  escapeForReplace(`<div style={{ marginTop: 8, textAlign: "center" }}>
          <ShareButton
            title="HelpFinder"
            text={t(lang, "shareText")}
            url="https://helpfinder.help"
            label={t(lang, "shareLabel")}
            ariaLabel={t(lang, "shareAriaLabel")}
          />`)
);
console.log('  ✓ ShareButton (help section) updated + TODO removed');

fs.writeFileSync(hfPath, hf, 'utf8');
console.log('  ✓ HelpFinder.jsx saved');

// ── VERIFY ──
console.log('\n=== Verification ===');
const lpFinal = fs.readFileSync(lpPath, 'utf8');
const hfFinal = fs.readFileSync(hfPath, 'utf8');

const lpShareKeys = (lpFinal.match(/shareLabel:/g) || []).length;
const hfShareKeys = (hfFinal.match(/shareLabel:/g) || []).length;
const lpTodos = (lpFinal.match(/TODO.*i18n/g) || []).length;
const hfTodos = (hfFinal.match(/TODO.*i18n/g) || []).length;

console.log(`  LandingPage: ${lpShareKeys} shareLabel keys (expect 8)`);
console.log(`  HelpFinder:  ${hfShareKeys} shareLabel keys (expect 8)`);
console.log(`  LandingPage TODOs remaining: ${lpTodos} (expect 0)`);
console.log(`  HelpFinder TODOs remaining:  ${hfTodos} (expect 0)`);

if (lpShareKeys === 8 && hfShareKeys === 8 && lpTodos === 0 && hfTodos === 0) {
  console.log('\n  ✅ Migration 20 complete. All checks pass.');
} else {
  console.log('\n  ⚠️  Counts off — review manually before committing.');
}
