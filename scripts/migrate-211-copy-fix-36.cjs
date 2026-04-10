/**
 * migrate-211-copy-fix-36.cjs
 *
 * Fixes 211 copy: positions 211 as a supplement people can call,
 * not as the comprehensive answer or a feature of HelpFinder.
 *
 * Run: node scripts/migrate-211-copy-fix-36.cjs
 */

const fs = require('fs');
const path = require('path');

const hfPath = path.join(__dirname, '..', 'src', 'components', 'HelpFinder.jsx');
let hf = fs.readFileSync(hfPath, 'utf8');
let changes = 0;

// ─── 1. Fix call211 translations (8 languages) ─────────────────────
// OLD: "Call 211 — they can help with anything, anytime."
// NEW: "Need something not listed? Call 211 for a referral."

const call211Fixes = [
  [
    'call211: "Call 211 — they can help with anything, anytime."',
    'call211: "Need something not listed? Call 211 for a referral."'
  ],
  [
    'call211: "Llame al 211 — pueden ayudar con cualquier cosa, a cualquier hora."',
    'call211: "¿Necesita algo no listado? Llame al 211 para una referencia."'
  ],
  [
    'call211: "211 मा कल गर्नुहोस् — जुनसुकै कुरामा, जुनसुकै बेला।"',
    'call211: "सूचीमा नभएको कुरा चाहिन्छ? 211 मा कल गर्नुहोस्।"'
  ],
  [
    'call211: "اتصل بـ 211 — يمكنهم المساعدة بأي شيء، في أي وقت."',
    'call211: "تحتاج شيئاً غير مدرج؟ اتصل بـ 211 للإحالة."'
  ],
  [
    'call211: "Piga 211 — wanaweza kusaidia chochote, wakati wowote."',
    'call211: "Unahitaji kitu kisichoorodheshwa? Piga 211 kwa rufaa."'
  ],
  [
    'call211: "211 ခေါ်ပါ — ဘာမဆို၊ အချိန်မရွေး ကူညီနိုင်ပါတယ်။"',
    'call211: "စာရင်းမပါတာ လိုအပ်ပါသလား? 211 ခေါ်ပါ။"'
  ],
  [
    'call211: "Wac 211 — wax kasta, wakhti kasta way kaa caawin karaan."',
    'call211: "Wax aan liiska ku jirin ma u baahan tahay? Wac 211."'
  ],
  [
    'call211: "拨打211 — 任何事情，任何时间都能帮忙。"',
    'call211: "需要未列出的服务？拨打211获取转介。"'
  ],
];

for (const [old, replacement] of call211Fixes) {
  if (hf.includes(old)) {
    hf = hf.replace(old, replacement);
    changes++;
  }
}
if (changes > 0) console.log('✓ Fixed ' + changes + ' call211 translations');

// ─── 2. Fix no-results fallback (all 8 languages) ──────────────────
// OLD: "No exact matches — but 211 can help with anything."
// NEW: "No exact match yet. Try broadening your filters, or call 211."

const noResultsFixes = [
  [
    '"No exact matches — but 211 can help with anything."',
    '"No exact match yet. Try broadening your filters, or call 211."'
  ],
  [
    'es: "No encontramos resultados exactos — pero el 211 puede ayudar."',
    'es: "Sin resultados exactos. Intente ampliar sus filtros, o llame al 211."'
  ],
  [
    'ne: "सटीक परिणाम भेटिएन — तर 211 ले सहयोग गर्न सक्छ।"',
    'ne: "सटीक परिणाम भेटिएन। फिल्टर फराकिलो बनाउनुहोस्, वा 211 मा कल गर्नुहोस्।"'
  ],
  [
    'ar: "لم نجد نتائج دقيقة — لكن 211 يمكنه المساعدة."',
    'ar: "لا نتائج دقيقة بعد. جرب توسيع الفلاتر، أو اتصل بـ 211."'
  ],
  [
    'sw: "Hatukupata matokeo kamili — lakini 211 wanaweza kusaidia."',
    'sw: "Hakuna matokeo kamili bado. Jaribu kupanua vichujio, au piga 211."'
  ],
  [
    'my: "တိကျတဲ့ရလဒ်မတွေ့ပါ — ဒါပေမယ့် 211 ကူညီနိုင်ပါတယ်။"',
    'my: "တိကျတဲ့ရလဒ် မတွေ့သေးပါ။ စစ်ထုတ်မှုကို ချဲ့ပါ သို့မဟုတ် 211 ခေါ်ပါ။"'
  ],
  [
    'so: "Natiijooyin sax ah ma helin — laakiin 211 wuu kaa caawin karaa."',
    'so: "Natiijo sax ah wali lama helin. Shaandhee ballaadhi, ama wac 211."'
  ],
  [
    'zh: "未找到精确结果 — 但211可以帮助您。"',
    'zh: "暂无精确结果。尝试扩大筛选范围，或拨打211。"'
  ],
];

let noResultsCount = 0;
for (const [old, replacement] of noResultsFixes) {
  if (hf.includes(old)) {
    hf = hf.replace(old, replacement);
    noResultsCount++;
  }
}
if (noResultsCount > 0) console.log('✓ Fixed ' + noResultsCount + ' no-results fallback translations');

// ─── 3. Fix the 211 fallback comment ────────────────────────────────
if (hf.includes('{/* 211 fallback */}')) {
  hf = hf.replace('{/* 211 fallback */}', '{/* 211 referral link */}');
  console.log('✓ Fixed 211 fallback comment');
}

fs.writeFileSync(hfPath, hf);

// ─── 4. VERIFY ──────────────────────────────────────────────────────

const final = fs.readFileSync(hfPath, 'utf8');

const checks = [
  ['No "help with anything, anytime" in call211', !final.includes('help with anything, anytime')],
  ['No "can help with anything" in no-results', !final.includes('can help with anything')],
  ['New call211 copy present', final.includes('Need something not listed')],
  ['New no-results copy present', final.includes('Try broadening your filters')],
  ['211 phone link still present', final.includes('href="tel:211"')],
  ['211 program entry unchanged', final.includes('211 Lifeline (Call for Anything)')],
];

console.log('\n── Verification ──');
let allGood = true;
for (const [label, ok] of checks) {
  console.log(ok ? '✓' : '✗', label);
  if (!ok) allGood = false;
}

const totalChanges = changes + noResultsCount;
console.log('\n' + totalChanges + ' string replacements. Ready to commit.');
