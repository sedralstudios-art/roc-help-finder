import React, { useState, useMemo, useEffect, useRef } from "react";
import { QUESTIONS, getFirstQuestion, isDirectToResults, isHiddenCategory, getInitialPrograms, applyAnswerFilters, applyTownFilter, getUrgencyLevel } from "./HelpFinderQuestions";
import ShareButton from "./ShareButton";
import { helpFinderToGlossaryCategory, glossaryCategoryLabel } from "../data/legal/glossary-tag-map";
import { GLOSSARY_TERMS_BY_CATEGORY } from "../data/legal/glossary-index";
import GlossaryText from "./GlossaryTooltip";

// ─────────────────────────────────────────────
// mapsHandoff — universal tap-to-navigate (added April 9, 2026)
// ─────────────────────────────────────────────
// Tapping a program's address should open the user's native maps app with
// directions ready to start, NEVER trap them in an embedded website map.
// The website is a launchpad to the resource, not the resource itself.
//
// Behavior:
//   - iOS:     opens Apple Maps app via https://maps.apple.com/?daddr=...
//   - Android: opens Google Maps app via the directions deep link in href
//   - Desktop: opens Google Maps in a new tab via the href fallback
//
// The href stays as a Google Maps directions URL so right-click → copy
// link works, screen readers work, and any non-iOS user gets the right
// destination if onClick fails for any reason. Defensive in depth.
function mapsHandoff(e, address) {
  if (!address) return;
  const isIOS = typeof navigator !== "undefined"
    && /iPad|iPhone|iPod/.test(navigator.userAgent)
    && !window.MSStream;
  if (isIOS) {
    e.preventDefault();
    window.location.href = "https://maps.apple.com/?daddr=" + encodeURIComponent(address);
  }
  // Non-iOS: do nothing, let the <a href> open Google Maps directions in new tab
}

// ─────────────────────────────────────────────
// trackClick — privacy-respecting click counter
// ─────────────────────────────────────────────
// Sends ONLY the program ID. No cookies, no user ID, no IP, no PII.
// Uses sendBeacon so it never slows down navigation.
function trackClick(programId) {
  if (!programId) return;
  try {
    navigator.sendBeacon("/api/click", JSON.stringify({ id: programId }));
  } catch {
    // Silent fail — never break user experience for analytics
  }
}

// ═══════════════════════════════════════════════════
// HELPFINDER — Help Directory
// Sedral Studios · Rochester NY · April 2026
// Multi-category · multi-program · multilingual
// Updated: Branding aligned with landing page v2
// ═══════════════════════════════════════════════════

// ── ERROR BOUNDARY ──
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Something went wrong</h1>
          <p style={{ color: "#555", margin: "12px 0 20px" }}>You can still get help right now.</p>
          <a href="tel:211" style={{
            display: "inline-block", background: "#1565c0", color: "#fff",
            padding: "12px 28px", borderRadius: 10, fontSize: 18, fontWeight: 700,
            textDecoration: "none",
          }}>📞 Call 211</a>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => this.setState({ hasError: false })} style={{
              background: "none", border: "1px solid #e8e4dc", borderRadius: 20,
              padding: "8px 16px", cursor: "pointer", fontSize: 14,
            }}>Try Again</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── LANGUAGE CONFIG ──
// English-only per maintainer policy (locked 2026-04-30). Other-language
// translation data remains in src/ for future restoration but is not exposed
// in the UI, prerender, or sitemap.
const LANGS = [
  { code: "en", label: "English" },
];

const LEGAL_LANGS = [
  { code: "en", label: "English" },
];

// ── UI STRINGS ──
const UI = {
  en: {
    title: "HelpFinder",
    subtitle: "You're not alone. All free help, near you. No personal data collected.",
    subtitleCity: "You're not alone. All free help in {city}. No personal data collected.",
    start: "Find Help Now",
    back: "Back",
    startOver: "Start Over",
    stepWhat: "What do you need?",
    stepWho: "Who needs help?",
    stepResults: "Here's what we found",
    whoSelf: "Just me",
    whoFamily: "Me and my family",
    whoChild: "My child",
    whoSenior: "Someone 60+",
    whoVeteran: "A veteran",
    whoPregnant: "I'm pregnant or have a baby",
    whoDisability: "Someone with a disability",
    whoAnyone: "I'd rather not say",
    call211: "Need something not listed? Call 211 for a referral.",
    privacy: "Nothing you share here is saved or sent anywhere. Ever.",
    privacySensitive: "This is private. We don't save or share anything. No one will know you looked here.",
    crisisNotice: "If you're in danger right now, help is available 24/7.",
    dvSafety: "If someone might check your phone or computer, you can close this page quickly.",
    quickExit: "Quick Exit",
    communityTitle: "Community Groups",
    communityDesc: "Volunteer-run groups. Not agencies — just people helping people.",
    featuredTitle: "Popular Starting Points",
    website: "Website",
    callNow: "Call",
    apply: "Apply Online",
    hours: "Hours",
    bring: "What to bring",
    note: "Note",
    income: "Income limit",
    fpl: "of Federal Poverty Level",
    langLabel: "Language",
    interpreter: "You have the right to a free interpreter. Say 'I need an interpreter' when you call.",
    findMore: "Can't find what you need?",
    findMoreLink: "Search more programs on findhelp.org",
    alsoNeed: "I also need help with something else",
    parentalProtectionDisclaimer: "This information is not legal advice. Laws and procedures change. Always consult a lawyer for your specific situation. Legal Aid and LawNY offer free legal help.",
    shareLabel: "Share HelpFinder",
    shareText: "Free help and legal info for Monroe County. No accounts, no ads, no tracking.",
    shareAriaLabel: "Share HelpFinder with someone who needs it",
  },
};
const t = (lang, key) => (UI[lang] && UI[lang][key]) || UI.en[key] || key;

// ── EXTENDED UI STRINGS (6 additional languages) ──
// Injected programmatically to keep the main UI block readable
Object.assign(UI, {
});

// ── DOCUMENT TERM TRANSLATIONS (Fix 3: "What to bring" i18n) ──
const DOC_TERMS = {
  "None":{es:"Nada",ne:"केही छैन",ar:"لا شيء",sw:"Hakuna",my:"မရှိပါ",so:"Waxba",zh:"无"},
  "ID":{es:"Identificación",ne:"परिचयपत्र",ar:"هوية",sw:"Kitambulisho",my:"မှတ်ပုံတင်",so:"Aqoonsi",zh:"身份证"},
  "Photo ID":{es:"Identificación con foto",ne:"फोटो परिचयपत्र",ar:"هوية بصورة",sw:"Kitambulisho chenye picha",my:"ဓာတ်ပုံပါမှတ်ပုံတင်",so:"Aqoonsi sawir leh",zh:"带照片的身份证"},
  "SSN cards":{es:"Tarjetas de Seguro Social",ne:"SSN कार्डहरू",ar:"بطاقات الضمان الاجتماعي",sw:"Kadi za SSN",my:"SSN ကတ်များ",so:"Kaadhadhka SSN",zh:"社安卡"},
  "SSN":{es:"Número de Seguro Social",ne:"SSN",ar:"رقم الضمان الاجتماعي",sw:"SSN",my:"SSN",so:"SSN",zh:"社会安全号"},
  "proof of income":{es:"comprobante de ingresos",ne:"आय प्रमाण",ar:"إثبات الدخل",sw:"uthibitisho wa mapato",my:"ဝင်ငွေအထောက်အထား",so:"caddaynta dakhliga",zh:"收入证明"},
  "Proof of income":{es:"Comprobante de ingresos",ne:"आय प्रमाण",ar:"إثبات الدخل",sw:"Uthibitisho wa mapato",my:"ဝင်ငွေအထောက်အထား",so:"Caddaynta dakhliga",zh:"收入证明"},
  "proof of address":{es:"comprobante de domicilio",ne:"ठेगाना प्रमाण",ar:"إثبات العنوان",sw:"uthibitisho wa anwani",my:"လိပ်စာအထောက်အထား",so:"caddaynta cinwaanka",zh:"地址证明"},
  "Proof of address":{es:"Comprobante de domicilio",ne:"ठेगाना प्रमाण",ar:"إثبات العنوان",sw:"Uthibitisho wa anwani",my:"လိပ်စာအထောက်အထား",so:"Caddaynta cinwaanka",zh:"地址证明"},
  "birth certificate":{es:"acta de nacimiento",ne:"जन्म प्रमाणपत्र",ar:"شهادة ميلاد",sw:"cheti cha kuzaliwa",my:"မွေးစာရင်း",so:"shahaadada dhalashada",zh:"出生证明"},
  "birth certificates":{es:"actas de nacimiento",ne:"जन्म प्रमाणपत्रहरू",ar:"شهادات ميلاد",sw:"vyeti vya kuzaliwa",my:"မွေးစာရင်းများ",so:"shahaadooyinka dhalashada",zh:"出生证明"},
  "bank statements":{es:"estados de cuenta",ne:"बैंक विवरण",ar:"كشوف حساب بنكية",sw:"taarifa za benki",my:"ဘဏ်စာရင်းရှင်းတမ်း",so:"bayaanka bangiga",zh:"银行对账单"},
  "utility bill":{es:"factura de servicios",ne:"बिजुली/ग्यास बिल",ar:"فاتورة خدمات",sw:"bili ya huduma",my:"အသုံးအဆောင်ဘီလ်",so:"biilka adeegyada",zh:"水电费账单"},
  "immunization records":{es:"registro de vacunas",ne:"खोप अभिलेख",ar:"سجلات التطعيم",sw:"rekodi za chanjo",my:"ကာကွယ်ဆေးမှတ်တမ်း",so:"diiwaanka tallaalka",zh:"免疫记录"},
  "immunizations":{es:"vacunas",ne:"खोपहरू",ar:"التطعيمات",sw:"chanjo",my:"ကာကွယ်ဆေးများ",so:"tallaalka",zh:"免疫记录"},
  "Varies":{es:"Varía",ne:"फरक हुन्छ",ar:"يختلف",sw:"Inatofautiana",my:"ကွဲပြားသည်",so:"Way kala duwan yihiin",zh:"不定"},
  "Varies by program":{es:"Varía según el programa",ne:"कार्यक्रम अनुसार फरक",ar:"يختلف حسب البرنامج",sw:"Inatofautiana kwa programu",my:"အစီအစဉ်အလိုက်ကွဲပြားသည်",so:"Waxay ku xiran tahay barnaamijka",zh:"因项目而异"},
  "Your EBT card":{es:"Su tarjeta EBT",ne:"तपाईंको EBT कार्ड",ar:"بطاقة EBT",sw:"Kadi yako ya EBT",my:"သင့် EBT ကတ်",so:"Kaadhkaaga EBT",zh:"您的EBT卡"},
  "Your Medicaid card":{es:"Su tarjeta de Medicaid",ne:"तपाईंको Medicaid कार्ड",ar:"بطاقة Medicaid",sw:"Kadi yako ya Medicaid",my:"သင့် Medicaid ကတ်",so:"Kaadhkaaga Medicaid",zh:"您的Medicaid卡"},
  "Your prescriptions":{es:"Sus recetas",ne:"तपाईंको प्रेस्क्रिप्सन",ar:"وصفاتك الطبية",sw:"Dawa zako",my:"သင့်ဆေးစာ",so:"Warqadahaaga dhakhtarka",zh:"您的处方"},
  "Proof of age":{es:"Comprobante de edad",ne:"उमेर प्रमाण",ar:"إثبات العمر",sw:"Uthibitisho wa umri",my:"အသက်အထောက်အထား",so:"Caddaynta da\'da",zh:"年龄证明"},
  "Proof of benefits":{es:"Comprobante de beneficios",ne:"लाभ प्रमाण",ar:"إثبات المزايا",sw:"Uthibitisho wa faida",my:"ခံစားခွင့်အထောက်အထား",so:"Caddaynta faa\'iidooyinka",zh:"福利证明"},
  "Proof of veteran status":{es:"Comprobante de servicio militar",ne:"सैनिक स्थिति प्रमाण",ar:"إثبات حالة المحارب",sw:"Uthibitisho wa hali ya mstaafu",my:"စစ်မှုထမ်းဟောင်းအထောက်အထား",so:"Caddaynta askarnimada",zh:"退伍军人身份证明"},
  "DD-214, VA ID":{es:"DD-214, ID de VA",ne:"DD-214, VA परिचयपत्र",ar:"DD-214، هوية VA",sw:"DD-214, kitambulisho cha VA",my:"DD-214, VA မှတ်ပုံတင်",so:"DD-214, aqoonsiga VA",zh:"DD-214, VA身份证"},
  "Medicaid ID":{es:"ID de Medicaid",ne:"Medicaid परिचयपत्र",ar:"هوية Medicaid",sw:"Kitambulisho cha Medicaid",my:"Medicaid မှတ်ပုံတင်",so:"Aqoonsiga Medicaid",zh:"Medicaid卡"},
  "FAFSA required":{es:"Se requiere FAFSA",ne:"FAFSA आवश्यक",ar:"FAFSA مطلوب",sw:"FAFSA inahitajika",my:"FAFSA လိုအပ်သည်",so:"FAFSA ayaa loo baahan yahay",zh:"需要FAFSA"},
  "Immigration documents":{es:"Documentos de inmigración",ne:"आप्रवासन कागजातहरू",ar:"وثائق الهجرة",sw:"Hati za uhamiaji",my:"လူဝင်မှုကြီးကြပ်ရေးစာရွက်စာတမ်း",so:"Dukumiintiyada socdaalka",zh:"移民文件"},
  "Refugee documentation":{es:"Documentación de refugiado",ne:"शरणार्थी कागजात",ar:"وثائق اللاجئ",sw:"Hati za ukimbizi",my:"ဒုက္ခသည်စာရွက်စာတမ်း",so:"Dukumiintiyada qaxootiga",zh:"难民文件"},
  "Disability documentation":{es:"Documentación de discapacidad",ne:"अपाङ्गता कागजात",ar:"وثائق الإعاقة",sw:"Hati za ulemavu",my:"မသန်စွမ်းမှုစာရွက်စာတမ်း",so:"Dukumiintiyada naafanimada",zh:"残疾证明"},
  "Proof of income for sliding scale":{es:"Comprobante de ingresos (escala móvil)",ne:"स्लाइडिङ स्केलको लागि आय प्रमाण",ar:"إثبات الدخل للمقياس المتدرج",sw:"Uthibitisho wa mapato (bei nafuu)",my:"ချိုင့်ခွင့်အတွက် ဝင်ငွေအထောက်အထား",so:"Caddaynta dakhliga (qiimaha la habbeeyo)",zh:"按收入定价的收入证明"},
  "Proof of income for eligibility":{es:"Comprobante de ingresos (elegibilidad)",ne:"योग्यताको लागि आय प्रमाण",ar:"إثبات الدخل للأهلية",sw:"Uthibitisho wa mapato (sifa)",my:"အရည်အချင်းအတွက် ဝင်ငွေအထောက်အထား",so:"Caddaynta dakhliga (xaqa)",zh:"资格审查的收入证明"},
};

const translateDoc = (doc, lang) => {
  if (!doc || lang === "en") return doc;
  if (doc === "None" || doc.startsWith("None")) {
    if (doc === "None") return DOC_TERMS["None"][lang] || doc;
    return doc;
  }
  if (DOC_TERMS[doc]?.[lang]) return DOC_TERMS[doc][lang];
  let result = doc;
  const sorted = Object.keys(DOC_TERMS).sort((a, b) => b.length - a.length);
  for (const term of sorted) {
    if (DOC_TERMS[term][lang] && result.includes(term)) {
      result = result.replaceAll(term, DOC_TERMS[term][lang]);
    }
  }
  return result;
};

// ── PHONE HELPER (handles extensions) ──
const telHref = (ph) => {
  if (!ph) return "";
  // "585-244-8400 ext.244" → "tel:5852448400,244"
  const extMatch = ph.match(/^(.*?)\s*ext\.?\s*(\d+)$/i);
  if (extMatch) {
    return `tel:${extMatch[1].replace(/[^0-9+]/g, "")},${extMatch[2]}`;
  }
  return `tel:${ph.replace(/[^0-9+]/g, "")}`;
};

// ── TAB GROUPS ──
const TABS = {
  rightnow: {
    icon: "🆘",
    en: "I need help right now",
    needs: ["crisis", "domesticSvc", "parentalProtection", "crisisChild", "housing", "weather"],
  },
  foodhome: {
    icon: "🍎",
    en: "Food, a place to stay, or bills",
    needs: [
      "food",
      "housing",
      "cash",
      "utilities",
      "clothing",
      "transport",
      "internet",
      "documents",
    ],
  },
  health: {
    icon: "❤️",
    en: "A doctor, dentist, or medicine",
    needs: ["health", "dental", "vision", "prescriptions", "hivsti", "disabilitySvc"],
  },
  feeling: {
    icon: "💚",
    en: "Stress, sadness, or addiction",
    needs: ["mental", "grief", "funeral", "addiction", "caregiver"],
  },
  family: {
    icon: "👨‍👩‍👧",
    en: "My family",
    needs: [
      "childcare",
      "youth",
      "seniorSvc",
      "funeral",
      "parentalProtection",
      "caregiver",
      "pets",
    ],
  },
  work: {
    icon: "💼",
    en: "My job",
    needs: [
      "employment",
      "education",
      "legalWorkers",
    ],
  },
  rights: {
    icon: "⚖️",
    en: "My rights",
    needs: [
      "legal",
      "legalEviction",
      "legalBenefits",
      "legalImmigration",
      "legalDiscrim",
      "legalDebt",
      "legalSmallClaims",
      "legalCrimRecord",
      "disabilitySvc",
      "veteranSvc",
      "refugeeSvc",
      "lgbtq",
      "reentry",
    ],
  },
};

// ── CATEGORIES ──
const CATEGORIES = {
  crisis: { icon: "🆘", en: "Someone to talk to right now", es: "Alguien con quien hablar ahora", ne: "अहिले कुरा गर्ने कोही", ar: "شخص أتحدث إليه الآن", sw: "Mtu wa kuongea naye sasa", my: "အခုစကားပြောစရာတစ်ယောက်", so: "Qof aad hadda la hadasho", zh: "现在需要找人倾诉" },
  food: { icon: "🍎", en: "Food or groceries", es: "Comida o alimentos", ne: "खाना वा किराना", ar: "طعام أو بقالة", sw: "Chakula", my: "အစားအသောက်", so: "Cunto", zh: "食物" },
  housing: { icon: "🏠", en: "A place to live", es: "Un lugar para vivir", ne: "बस्ने ठाउँ", ar: "مكان للسكن", sw: "Mahali pa kuishi", my: "နေစရာ", so: "Meel aad ku nooshahay", zh: "住处" },
  cash: { icon: "💵", en: "Help with money, rent, or bills", es: "Ayuda con dinero, renta, o cuentas", ne: "पैसा, भाडा, वा बिलमा सहयोग", ar: "مساعدة في المال أو الإيجار أو الفواتير", sw: "Msaada wa pesa, kodi, au bili", my: "ငွေ၊ အိမ်ခ၊ ဘီလ်အကူအညီ", so: "Caawimada lacagta, kirada, ama biilasha", zh: "金钱、房租或账单帮助" },
  utilities: { icon: "🔥", en: "Heat or electric bill help", es: "Ayuda con calefacción o electricidad", ne: "तापक्रम वा बिजुली बिल सहयोग", ar: "مساعدة في فاتورة التدفئة أو الكهرباء", sw: "Msaada wa bili ya joto au umeme", my: "အပူပေးစက် သို့ လျှပ်စစ်ဘီလ်အကူအညီ", so: "Caawimada biilka kulaylka ama korontada", zh: "取暖或电费帮助" },
  health: { icon: "❤️", en: "I need to see a doctor", es: "Necesito ver a un doctor", ne: "मलाई डाक्टर देखाउनु पर्छ", ar: "أحتاج لرؤية طبيب", sw: "Nahitaji kuona daktari", my: "ဆရာဝန်ပြဖို့လိုတယ်", so: "Waxaan u baahanahay inaan dhakhtar arko", zh: "我需要看医生" },
  dental: { icon: "🦷", en: "My teeth hurt or I need a dentist", es: "Me duelen los dientes o necesito dentista", ne: "दाँत दुख्छ वा दन्त चिकित्सक चाहिन्छ", ar: "أسناني تؤلمني أو أحتاج طبيب أسنان", sw: "Meno yangu yanauma au nahitaji daktari wa meno", my: "သွားကိုက်တယ် သို့ သွားဆရာဝန်လိုတယ်", so: "Ilkahayga waa i xanuunayaan ama waxaan u baahanahay dhakhtar ilko", zh: "牙疼或需要看牙医" },
  prescriptions: { icon: "💊", en: "I can't afford my medicine", es: "No puedo pagar mis medicinas", ne: "म औषधि किन्न सक्दिन", ar: "لا أستطيع تحمل تكلفة دوائي", sw: "Siwezi kumudu dawa zangu", my: "ဆေးဝယ်ဖို့မတတ်နိုင်ဘူး", so: "Ma awoodo inaan daawadayda bixiyo", zh: "买不起药" },
  mental: { icon: "💚", en: "I'm stressed, anxious, or not OK", es: "Estoy estresado, ansioso, o no estoy bien", ne: "तनावित, चिन्तित, वा ठीक छैन", ar: "أنا متوتر أو قلق أو لست بخير", sw: "Nina msongo, wasiwasi, au siko sawa", my: "စိတ်ဖိစီး၊ စိုးရိမ်၊ မကောင်းဘူး", so: "Waan walbaaharsanahay, walaacsan, ama ma fiicni", zh: "压力大、焦虑或状态不好" },
  grief: { icon: "🕊️", en: "Someone I love died", es: "Alguien que amo murió", ne: "मेरो माया गर्ने कोही बित्यो", ar: "شخص أحبه توفي", sw: "Mtu ninayempenda amefariki", my: "ချစ်ရသူ ဆုံးသွားတယ်", so: "Qof aan jeclaa wuu dhintay", zh: "我爱的人去世了" },
  addiction: { icon: "🔄", en: "Drinking, drugs, recovery, or staying safer", es: "Alcohol, drogas, recuperación, o mantenerse más seguro", ne: "मदिरा, लागुऔषध, वा सफा हुने", ar: "الكحول، المخدرات، التعافي، أو البقاء بأمان", sw: "Pombe, dawa za kulevya, au kupona", my: "အရက်၊ မူးယစ်ဆေး၊ ပြန်လည်ကောင်းမွန်ရေး", so: "Khamriga, daroogada, ama ka bixitaanka", zh: "饮酒、毒品、康复或保持安全" },
  childcare: { icon: "👶", en: "Help with my kids or daycare", es: "Ayuda con mis hijos o guardería", ne: "बच्चा वा बालबाटिकामा सहयोग", ar: "مساعدة مع أطفالي أو الحضانة", sw: "Msaada na watoto au malezi", my: "ကလေးထိန်း သို့ ကလေးအကူအညီ", so: "Caawimada carruurta ama xanaanada", zh: "孩子或日托帮助" },
  crisisChild: { icon: "🧸", en: "I need someone to watch my kids right now", es: "Necesito que alguien cuide a mis hijos ahora", ne: "अहिले नै कसैले मेरा बच्चा हेर्नुपर्छ", ar: "أحتاج من يراقب أطفالي الآن", sw: "Nahitaji mtu awaangalie watoto wangu sasa", my: "အခုပဲ ကလေးကြည့်ပေးမယ့်သူ လိုတယ်", so: "Waxaan u baahanahay qof hadda ilmahayga ilaaliya", zh: "我现在需要人照看孩子" },
  employment: { icon: "💼", en: "I need a job", es: "Necesito un trabajo", ne: "मलाई काम चाहिन्छ", ar: "أحتاج وظيفة", sw: "Nahitaji kazi", my: "အလုပ်လိုတယ်", so: "Waxaan u baahanahay shaqo", zh: "我需要工作" },
  education: { icon: "📚", en: "School, GED, English, or college", es: "Escuela, GED, inglés, o universidad", ne: "विद्यालय, GED, अंग्रेजी, वा कलेज", ar: "مدرسة أو GED أو إنجليزي أو جامعة", sw: "Shule, GED, Kiingereza, au chuo", my: "ကျောင်း၊ GED၊ အင်္ဂလိပ်စာ၊ ကောလိပ်", so: "Dugsi, GED, Ingiriisi, ama jaamacad", zh: "学校、GED、英语或大学" },
  domesticSvc: { icon: "🛡️", en: "Someone is hurting me or my family", es: "Alguien me está lastimando a mí o a mi familia", ne: "कसैले मलाई वा मेरो परिवारलाई दुःख दिइरहेको छ", ar: "شخص يؤذيني أو يؤذي عائلتي", sw: "Mtu ananidhuru mimi au familia yangu", my: "တစ်ယောက်ယောက်က ကျွန်တော်/မ ကို နာကျင်စေနေတယ်", so: "Qof ayaa i dhaawacaya ama qoyskayga dhaawacaya", zh: "有人在伤害我或我的家人" },
  seniorSvc: { icon: "🧓", en: "Help for someone 60 or older", es: "Ayuda para alguien de 60 años o más", ne: "६० वा सो भन्दा बढी उमेरकालाई सहयोग", ar: "مساعدة لشخص 60 سنة أو أكبر", sw: "Msaada kwa mtu wa miaka 60+", my: "အသက် ၆၀+ အတွက်အကူအညီ", so: "Caawimada qofka 60 jir ama ka weyn", zh: "60岁及以上人士的帮助" },
  youth: { icon: "🌟", en: "Programs for kids or teenagers", es: "Programas para niños o adolescentes", ne: "बालबालिका वा किशोरका लागि कार्यक्रम", ar: "برامج للأطفال أو المراهقين", sw: "Programu za watoto au vijana", my: "ကလေးနှင့် ဆယ်ကျော်သက်များအတွက် အစီအစဉ်", so: "Barnaamijyada carruurta ama dhalinyarada", zh: "儿童或青少年项目" },
  disabilitySvc: { icon: "♿", en: "Help for a disability", es: "Ayuda con una discapacidad", ne: "अपाङ्गताको लागि सहयोग", ar: "مساعدة للإعاقة", sw: "Msaada kwa ulemavu", my: "မသန်စွမ်းမှုအတွက် အကူအညီ", so: "Caawimada naafanimada", zh: "残疾帮助" },
  refugeeSvc: { icon: "🌍", en: "I'm new to this country", es: "Soy nuevo en este país", ne: "म यस देशमा नयाँ हुँ", ar: "أنا جديد في هذا البلد", sw: "Mimi ni mpya katika nchi hii", my: "ဒီနိုင်ငံမှာ အသစ်ရောက်လာတယ်", so: "Waxaan ku cusub ahay dalkan", zh: "我刚来这个国家" },
  lgbtq: { icon: "🏳️‍🌈", en: "LGBTQ+ support", es: "Apoyo LGBTQ+", ne: "LGBTQ+ सहयोग", ar: "دعم LGBTQ+", sw: "Msaada wa LGBTQ+", my: "LGBTQ+ ပံ့ပိုးမှု", so: "Taageerada LGBTQ+", zh: "LGBTQ+支持" },
  veteranSvc: { icon: "🎖️", en: "I served in the military", es: "Serví en el ejército", ne: "मैले सेनामा सेवा गरें", ar: "خدمت في الجيش", sw: "Nilitumikia jeshini", my: "စစ်မှုထမ်းခဲ့တယ်", so: "Waxaan u adeegay ciidanka", zh: "我曾在军队服役" },
  legal: { icon: "⚖️", en: "A lawyer or legal help", es: "Un abogado o ayuda legal", ne: "वकिल वा कानुनी सहयोग", ar: "محامي أو مساعدة قانونية", sw: "Wakili au msaada wa kisheria", my: "ရှေ့နေ သို့ တရားရေးအကူအညီ", so: "Qareen ama caawimo sharci", zh: "律师或法律帮助" },
  legalEviction: { icon: "🏚️", en: "My landlord is trying to evict me", es: "Mi arrendador intenta desahuciarme", ne: "मेरो घरबेटीले मलाई निकाल्न खोज्दैछ", ar: "المالك يحاول طردي", sw: "Mwenye nyumba anataka kunifukuza", my: "ငှားရမ်းသူက ကျွန်တော်ကို နှင်ထုတ်ဖို့ကြိုးစားနေတယ်", so: "Mulkiilaha wuxuu isku dayayaa inuu ii eryo", zh: "房东试图驱逐我" },
  legalWorkers: { icon: "💼", en: "My employer is treating me unfairly", es: "Mi empleador me trata injustamente", ne: "मेरो रोजगारदाताले मलाई अन्यायपूर्ण व्यवहार गर्दैछ", ar: "صاحب العمل يعاملني بشكل غير عادل", sw: "Mwajiri wangu ananidanganya au kunishinda", my: "အလုပ်ရှင်က ကျွန်တော်ကို မတရားဆက်ဆံနေတယ်", so: "Shaqo-siiyahaagu si xun buu ii la dhaqmayaa", zh: "雇主对我不公平" },
  legalBenefits: { icon: "📋", en: "My benefits were cut or denied", es: "Mis beneficios fueron cortados o negados", ne: "मेरो सुविधाहरू काटिए वा अस्वीकार गरियो", ar: "تم قطع مزاياي أو رفضها", sw: "Faida zangu zilikatwa au kukataliwa", my: "ကျွန်တော့်ခံစားခွင့်တွေ ဖြတ်တောက်ခြင်း သို့ ငြင်းဆိုခံရတယ်", so: "Faa'iidadaydu waa la jarjaray ama la diiday", zh: "我的福利被削减或拒绝" },
  legalImmigration: { icon: "🌍", en: "I need immigration legal help", es: "Necesito ayuda legal de inmigración", ne: "मलाई आप्रवासन कानुनी सहयोग चाहिन्छ", ar: "أحتاج مساعدة قانونية في الهجرة", sw: "Nahitaji msaada wa kisheria wa uhamiaji", my: "လူဝင်မှုကြီးကြပ်ရေး တရားရေးအကူအညီ လိုတယ်", so: "Waxaan u baahanahay caawimo sharci oo socdaal ah", zh: "我需要移民法律帮助" },
  legalDiscrim: { icon: "🚫", en: "I was discriminated against", es: "Fui discriminado/a", ne: "मैसँग भेदभाव गरियो", ar: "تعرضت للتمييز", sw: "Nilidhulumiwa kwa ubaguzi", my: "ကျွန်တော် ခွဲခြားဆက်ဆံမှုခံခဲ့ရတယ်", so: "Waxaa iga dherbiyey takoorid", zh: "我遭受了歧视" },
  legalDebt: { icon: "💳", en: "I'm being sued or harassed over debt", es: "Me están demandando o acosando por deudas", ne: "ऋणको लागि मलाई मुद्दा लगाइएको वा उत्पीडन गरिएको छ", ar: "يتم مقاضاتي أو مضايقتي بسبب الديون", sw: "Ninafuatwa kwa madai ya deni", my: "ကြွေးမြီကြောင့် တရားစွဲဆိုခြင်း သို့ နှောင့်ယှက်ခြင်းခံနေရတယ်", so: "Waxaa ila dacweeya ama ila xariiraya deynta", zh: "我因债务被起诉或骚扰" },
  legalSmallClaims: { icon: "🏛️", en: "I want to take someone to small claims court", es: "Quiero llevar a alguien a la corte de reclamos menores", ne: "म कसैलाई साना दावी अदालतमा लैजान चाहन्छु", ar: "أريد أخذ شخص ما إلى محكمة المطالبات الصغيرة", sw: "Nataka kumpeleka mtu mahakamani kwa madai madogo", my: "တစ်ယောက်ကို Small Claims Court မှာ တရားစွဲချင်တယ်", so: "Waxaan rabaa in aan qof u qaado maxkamadda dacwaadaha yaryar", zh: "我想在小额索赔法庭起诉某人" },
  legalCrimRecord: { icon: "🔑", en: "I want to clear my criminal record", es: "Quiero limpiar mi historial criminal", ne: "म मेरो आपराधिक रेकर्ड सफा गर्न चाहन्छु", ar: "أريد محو سجلي الجنائي", sw: "Nataka kufuta rekodi yangu ya uhalifu", my: "ကျွန်တော့် ရာဇဝတ်မှတ်တမ်းကို ဖျက်ချင်တယ်", so: "Waxaan rabaa inaan nadiifiyo diiwaankaygii dambiyada", zh: "我想清除我的犯罪记录" },
  transport: { icon: "🚌", en: "I need a ride or bus pass", es: "Necesito transporte o pase de autobús", ne: "सवारी वा बस पास चाहिन्छ", ar: "أحتاج توصيلة أو بطاقة حافلة", sw: "Nahitaji usafiri au pasi ya basi", my: "စီးစရာ သို့ ဘတ်စ်ကတ်လိုတယ်", so: "Waxaan u baahanahay raacdo ama kaarka baska", zh: "需要搭车或公交卡" },
  internet: { icon: "📱", en: "Internet, WiFi, or a phone", es: "Internet, WiFi, o un teléfono", ne: "इन्टरनेट, WiFi, वा फोन", ar: "إنترنت أو WiFi أو هاتف", sw: "Mtandao, WiFi, au simu", my: "အင်တာနက်၊ WiFi၊ ဖုန်း", so: "Internet, WiFi, ama telefoon", zh: "互联网、WiFi或手机" },
  clothing: { icon: "👕", en: "Clothes, coats, or toiletries", es: "Ropa, abrigos, o artículos de aseo", ne: "लुगा, कोट, वा सरसफाइ सामान", ar: "ملابس أو معاطف أو مستلزمات نظافة", sw: "Nguo, koti, au vifaa vya usafi", my: "အဝတ်အစား၊ ကုတ်အင်္ကျီ၊ သန့်ရှင်းရေးပစ္စည်း", so: "Dharka, jaakadaha, ama walxaha nadaafadda", zh: "衣服、外套或洗漱用品" },
  reentry: { icon: "🔑", en: "I just got out of jail or prison", es: "Acabo de salir de la cárcel", ne: "म भर्खरै जेलबाट बाहिर आएँ", ar: "خرجت للتو من السجن", sw: "Nimetoka gerezani", my: "အကျဉ်းထောင်ကနေ ထွက်လာတယ်", so: "Waan ka soo baxay xabsiga", zh: "我刚从监狱出来" },
  pets: { icon: "🐾", en: "Help with my pet", es: "Ayuda con mi mascota", ne: "मेरो पाल्तु जनावरको लागि सहयोग", ar: "مساعدة مع حيواني الأليف", sw: "Msaada na mnyama wangu", my: "အိမ်မွေးတိရစ္ဆာန် အကူအညီ", so: "Caawimada xayawaanka guriga", zh: "宠物帮助" },
  hivsti: { icon: "🏥", en: "STD testing or HIV help", es: "Pruebas de ETS o ayuda con VIH", ne: "STD परीक्षण वा HIV सहयोग", ar: "فحص الأمراض المنقولة جنسياً أو مساعدة HIV", sw: "Kupima magonjwa ya zinaa au msaada wa HIV", my: "STD စစ်ဆေးမှု သို့ HIV အကူအညီ", so: "Baarista STD ama caawimada HIV", zh: "性病检测或HIV帮助" },
  weather: { icon: "🌡️", en: "I need to get warm or cool off", es: "Necesito calentarme o refrescarme", ne: "न्यानो हुन वा चिसो हुन चाहिन्छ", ar: "أحتاج أن أتدفأ أو أبرد", sw: "Nahitaji kupata joto au kubaridi", my: "အေးခံ သို့ အပူခံဖို့လိုတယ်", so: "Waxaan u baahanahay inaan diiraamo ama qaboojyo", zh: "我需要取暖或降温" },
  documents: { icon: "📄", en: "I need an ID, passport, or papers", es: "Necesito identificación, pasaporte, o papeles", ne: "परिचयपत्र, राहदानी, वा कागजात चाहिन्छ", ar: "أحتاج بطاقة هوية أو جواز سفر أو أوراق", sw: "Nahitaji kitambulisho, pasipoti, au nyaraka", my: "ID ကတ်၊ ပတ်စ်ပို့ သို့ စာရွက်စာတမ်းလိုတယ်", so: "Waxaan u baahanahay aqoonsi, baasaboor, ama warqado", zh: "我需要身份证、护照或文件" },
  vision: { icon: "👓", en: "I need glasses or an eye exam", es: "Necesito lentes o un examen de ojos", ne: "चश्मा वा आँखा जाँच चाहिन्छ", ar: "أحتاج نظارات أو فحص عيون", sw: "Nahitaji miwani au uchunguzi wa macho", my: "မျက်မှန် သို့ မျက်စိစစ်ဆေးမှု လိုတယ်", so: "Waxaan u baahanahay muraayadaha ama baarista indhaha", zh: "需要眼镜或眼科检查" },
  funeral: { icon: "🕯️", en: "Help paying for a funeral", es: "Ayuda para pagar un funeral", ne: "अन्त्येष्टि खर्चमा सहयोग", ar: "مساعدة في دفع تكاليف الجنازة", sw: "Msaada wa kulipa mazishi", my: "ဈာပနစရိတ်အကူအညီ", so: "Caawimada bixinta aaska", zh: "丧葬费用帮助" },
  parentalProtection: { icon: "⚖️", en: "Protect myself or my children from another parent", es: "Protegerme a mí o a mis hijos de otro padre/madre", ne: "अर्को अभिभावकबाट आफूलाई वा बच्चाहरूलाई जोगाउनुहोस्", ar: "حماية نفسي أو أطفالي من أحد الوالدين", sw: "Kujilinda mimi au watoto wangu kutoka kwa mzazi mwingine", my: "အခြားမိဘမှ ကျွန်တော်/မ သို့ ကလေးများကို ကာကွယ်ပါ", so: "Difaaca naftagayga ama carruurtayda ka waalidka kale", zh: "保护我自己或我的孩子不受另一方父母伤害" },
  caregiver: { icon: "🤲", en: "I take care of someone and need help", es: "Cuido a alguien y necesito ayuda", ne: "म कसैको हेरचाह गर्छु र सहयोग चाहिन्छ", ar: "أعتني بشخص وأحتاج مساعدة", sw: "Ninatunza mtu na nahitaji msaada", my: "တစ်ယောက်ယောက်ကို ပြုစုနေပြီး အကူအညီလိုတယ်", so: "Waxaan daryeelayaa qof waxaanan u baahanahay caawimaad", zh: "我在照顾某人，需要帮助" },
};

// ── PROGRAMS (294 across 43 categories) ──
// Data last verified: April 2026. Phone numbers and hours may change.

// ─────────────────────────────────────────────
// MONROE_TOWNS — canonical list of towns and villages in Monroe County, NY
// Used for URL slugs, gap detection, and town-level filtering.
// Slugs are lowercase, hyphenated. Match the `town:` field on every program.
// ─────────────────────────────────────────────
const MONROE_TOWNS = [
  "brighton", "brockport", "chili", "churchville", "clarkson",
  "east-rochester", "fairport", "gates", "greece", "hamlin",
  "henrietta", "hilton", "honeoye-falls", "irondequoit", "mendon",
  "ogden", "parma", "penfield", "perinton", "pittsford",
  "riga", "rochester", "rush", "scottsville", "spencerport",
  "sweden", "webster", "wheatland",
];
// Display labels for the town selector dropdown
const TOWN_LABELS = {
  "brighton":"Town of Brighton", "brockport":"Village of Brockport",
  "chili":"Town of Chili", "churchville":"Village of Churchville",
  "clarkson":"Town of Clarkson", "east-rochester":"Village of East Rochester",
  "fairport":"Village of Fairport", "gates":"Town of Gates",
  "greece":"Town of Greece", "hamlin":"Town of Hamlin",
  "henrietta":"Town of Henrietta", "hilton":"Village of Hilton",
  "honeoye-falls":"Village of Honeoye Falls", "irondequoit":"Town of Irondequoit",
  "mendon":"Town of Mendon", "ogden":"Town of Ogden",
  "parma":"Town of Parma", "penfield":"Town of Penfield",
  "perinton":"Town of Perinton", "pittsford":"Town of Pittsford",
  "riga":"Town of Riga", "rochester":"City of Rochester",
  "rush":"Town of Rush", "scottsville":"Village of Scottsville",
  "spencerport":"Village of Spencerport", "sweden":"Town of Sweden",
  "webster":"Town of Webster", "wheatland":"Town of Wheatland",
};

// ─────────────────────────────────────────────
// REACH_TIERS — how far a program's help extends
//   local      Physical address matters. Sort by distance from user.
//   regional   Multi-county or county-wide service. Visit physical office.
//   statewide  Serves anywhere in NY. May have a local office for in-person work.
//   national   Serves anywhere in the US.
//   remote     Phone, mail, video, online. Location-independent.
//
// coordApprox:true means lat/lng came from a Tier 3 city/zip centroid lookup,
// not the program's actual building. Distance math still works for sort order
// to within ~1 mile, but any UI that renders a map pin or "directions" link
// MUST show "approximate location" notice for these programs.
//
// addressSuppressed:true is a SAFETY flag for programs serving vulnerable
// populations (crisis nurseries, DV shelters, residential refuges) where
// the operator deliberately publishes only a street name or general area,
// never the building number. When addressSuppressed is true:
//   - lat/lng fields MUST be absent (or stripped if accidentally added)
//   - zip MAY be absent if it would narrow the location too much
//   - the program MUST NOT appear in distance-sorted Near Me results
//   - any future map UI MUST NOT render a pin
//   - any list view should display the operator's published address only
//
// HelpFinder's rule: match the operator's published specificity, never
// exceed it. Aggregation in a directory amplifies discovery risk for
// vulnerable populations beyond what each source intended.
// ─────────────────────────────────────────────

// SERVES — multi-town service declaration (added April 9, 2026)
//
//   serves: ["town1","town2",...]  Optional array of additional towns this
//                                  program serves. A program shows in a town's
//                                  results if program.town === userTown OR
//                                  program.serves.includes(userTown).
//
//   Use serves when ONE program physically operates in or covers MULTIPLE
//   specific towns — e.g. a Foodlink mobile pantry stopping in 6 villages,
//   or a workforce program serving Spencerport, Hilton, and Hamlin from a
//   Greece office. Do NOT use serves to express "regional" coverage that
//   isn't town-specific — use reach:"regional" for that.
//
//   serves is OPTIONAL. Single-town programs use only the existing town field.
//   Multi-town programs may set both town (the primary location) and serves
//   (the additional towns covered).
// ─────────────────────────────────────────────

import { PROGRAMS as _ALL_PROGRAMS, DATA_VERIFIED } from "../data/programs.js";
// Strip programs flagged hidden:true (sensitive categories pending fact-check verification).
const PROGRAMS = _ALL_PROGRAMS.filter(p => !p.hidden);

// COMMUNITY GROUPS
const COMMUNITY = [
  { n:"Rochester Hope", d:"Saturday: free food, clothing, haircuts, health screenings, legal aid, 50+ agencies. Every Saturday 9:30am-3:30pm.", loc:"869 N Clinton Ave", url:"https://rochesterhope.org", cats:["food","clothing","health","legal","cash"] },
  { n:"Roc Food Not Bombs", d:"Free hot meals and grocery stands across Rochester. No ID, no questions.", url:"https://www.facebook.com/rocfoodnotbombs/", cats:["food"] },
  { n:"Rochester Mutual Aid Network", d:"Connects people who need help with people who can help.", url:"https://www.rocmutualaid.com", cats:["cash","housing","food","clothing","transport"] },
  { n:"Rochester NY Food Relief", d:"Active Facebook group sharing free food, pantry info, meal locations.", url:"https://www.facebook.com/groups/rochesterNYfoodrelief", cats:["food"] },
  { n:"Buy Nothing Rochester", d:"Free items shared among neighbors. Search 'Buy Nothing' + your neighborhood on Facebook.", cats:["clothing","cash"] },
  { n:"ROC COVID Mutual Aid", d:"Emergency funds, supplies, rides, community support. Still active.", url:"https://www.facebook.com/groups/roccovidmutualaid", cats:["cash","transport","food"] },
  { n:"Rochester Free Store", d:"Free clothing and household items. 3rd Saturday monthly. Search 'Rochester Free Store' on Facebook.", cats:["clothing"] },
  { n:"Rochester NY Moms Group", d:"Parenting support, baby items, advice. Search 'Rochester NY Moms Group' on Facebook.", cats:["childcare","crisisChild"] },
  { n:"Rochester Housing Help", d:"Housing leads, roommate searches, rental info. Search 'Rochester Housing Help' on Facebook.", cats:["housing"] },
  { n:"Rochester Job Hunters", d:"Job postings, résumé help, networking. Search 'Rochester Job Hunters' on Facebook.", cats:["employment"] },
  { n:"Greece Neighbors (Facebook)", d:"Active Greece community group. Neighbors helping neighbors, local info, recommendations.", url:"https://www.facebook.com/groups/greece.ny/", cats:["food","housing","clothing"] },
  { n:"Greece Ecumenical Food Shelf (Facebook)", d:"Real-time updates on food shelf hours, availability, and volunteer needs.", url:"https://www.facebook.com/greecefoodshelf/", cats:["food"] },
  { n:"Being Black in the Burbs", d:"Mutual aid for Black community. Direct assistance with food, money, household goods.", cats:["food","cash","clothing"] },
  { n:"Greater Rochester LGBTQ+ Mutual Aid", d:"Basic needs fund for LGBTQ+ individuals. Food, rent, utilities, transport. Three funds available.", cats:["cash","food","housing","transport","lgbtq"] },
  { n:"Buy Nothing Groups (12 in Monroe County)", d:"Free items shared among neighbors. Gift economy. Search 'Buy Nothing' + your town on Facebook.", cats:["clothing","food","cash"] },
];

// ── FEATURED PROGRAMS ──
const FEATURED_IDS = ["211", "snap", "medicaid", "foodlink", "myb", "988", "mcvital"];

// ── SENSITIVE CATEGORIES (show privacy notice) ──
const SENSITIVE = new Set(["mental","grief","addiction","domesticSvc","hivsti","reentry","lgbtq","parentalProtection","legalImmigration","legalCrimRecord"]);
// ─────────────────────────────────────────────
// SAFETY_SENSITIVE — per-entry safety flag (added April 9, 2026)
// ─────────────────────────────────────────────
// The DV_CATS set below activates Quick Exit at the CATEGORY level — useful
// when an entire category (like domesticSvc) is high-risk for the user.
//
// But some individual entries inside non-sensitive categories also need the
// same protection. Examples:
//   - Animal cruelty reporting hotlines (in pets category) — the reporter
//     may be living with the abuser, who is also abusing humans
//   - Pet-friendly DV shelter cross-references (in pets category) — the
//     survivor may be on a monitored device
//   - Future entries in any category that touch reporting, escape, or
//     surveillance-vulnerable scenarios
//
// The schema flag is `safetySensitive: true` on any individual program object.
// When ANY visible program in the current view has the flag, Quick Exit
// activates automatically. The activation is one-way for the session —
// once triggered, it stays visible until reset (matching the existing
// DV_CATS behavior).
//
// Rule: match the protection level of the highest-risk visible entry,
// never less. Defensive in depth.
// ─────────────────────────────────────────────

// ── DV CATEGORIES (show safety notice + quick exit) ──
const DV_CATS = new Set(["domesticSvc","parentalProtection"]);
// ── LEGAL CATEGORIES (show disclaimer + explainer) ──
const LEGAL_CATS = new Set(["legal","legalEviction","legalWorkers","legalBenefits","legalImmigration","legalDiscrim","legalDebt","legalSmallClaims","legalCrimRecord","parentalProtection"]);

// ── PLAIN LANGUAGE LEGAL EXPLAINERS ──
// Static text — no API, no cost, instant. One explainer per legal category, all 8 languages.
// These render ABOVE the programs to orient users before they see resources.
const LEGAL_EXPLAINERS = {
  legalEviction: {
    en: "YOUR RIGHTS AS A TENANT IN NEW YORK:\n• Your landlord CANNOT lock you out, remove belongings, or shut off utilities to force you to leave — this is illegal self-help eviction.\n• To legally evict you, they must give written notice first: 14 days for nonpayment, 30+ days for other reasons.\n• After notice, they must FILE IN COURT. You get to respond.\n• If you get court papers, you have the right to FREE legal help. Call the Tenant Defense Project immediately.\n• DEADLINE: You typically have 10 days to respond to a court petition. Do not ignore court papers.\n• If heat or conditions are dangerous, you can withhold rent into escrow — but do this through Legal Aid, not on your own.",
    vi: "QUYỀN CỦA NGƯỜI THUÊ NHÀ TẠI NEW YORK:\n• Chủ nhà KHÔNG THỂ đổi khóa, di dời đồ đạc, hoặc cắt điện nước để buộc bạn rời đi — điều này là bất hợp pháp.\n• Để trục xuất hợp pháp, họ phải gửi thông báo bằng văn bản trước: 14 ngày nếu không trả tiền thuê.\n• Nếu nhận được giấy tờ tòa án, bạn có quyền được TRỢ GIÚP PHÁP LÝ MIỄN PHÍ. Gọi Tenant Defense Project ngay.\n• HẠN CHÓT: Thường có 10 ngày để trả lời đơn kiện. Đừng bỏ qua giấy tờ tòa án.",
    ko: "뉴욕에서 세입자의 권리:\n• 집주인은 자물쇠를 바꾸거나, 물건을 치우거나, 공과금을 끊어 당신을 쫓아낼 수 없습니다 — 이것은 불법입니다.\n• 합법적으로 퇴거시키려면 먼저 서면 통지를 해야 합니다: 임대료 미납 시 14일.\n• 법원 서류를 받으면 무료 법률 지원을 받을 권리가 있습니다. Tenant Defense Project에 즉시 전화하세요.\n• 마감: 보통 법원 소장에 답변할 수 있는 기간은 10일입니다. 법원 서류를 무시하지 마세요.",
    tl: "ANG IYONG MGA KARAPATAN BILANG NANGUNGUPAHAN SA NEW YORK:\n• HINDI maaaring palitan ng nagpapaupa ang kandado, alisin ang iyong gamit, o putulin ang utility para pilitin kang umalis — labag ito sa batas.\n• Para legal na palayasin ka, dapat muna silang magbigay ng nakasulat na abiso: 14 araw para sa hindi pagbabayad.\n• Kung makakatanggap ka ng court papers, may karapatan ka sa LIBRENG TULONG LEGAL. Tawagan agad ang Tenant Defense Project.\n• DEADLINE: Karaniwan ay 10 araw para sumagot sa court petition. Huwag balewalain ang court papers.",
    ru: "ВАШИ ПРАВА КАК АРЕНДАТОРА В НЬЮ-ЙОРКЕ:\n• Арендодатель НЕ МОЖЕТ менять замки, выносить вещи или отключать коммунальные услуги, чтобы заставить вас уехать — это незаконно.\n• Чтобы законно вас выселить, он должен сначала предоставить письменное уведомление: 14 дней при неуплате.\n• Если получите судебные документы, у вас есть право на БЕСПЛАТНУЮ юридическую помощь. Немедленно позвоните в Tenant Defense Project.\n• СРОК: Обычно у вас есть 10 дней, чтобы ответить на судебное ходатайство. Не игнорируйте судебные бумаги.",
    ht: "DWA OU KÒM YON LOKATÈ NAN NEW YORK:\n• Pwopriyetè a PA KA chanje seri yo, retire byen ou yo, oswa koupe sèvis yo pou fòse w pati — sa a ilegal.\n• Pou yo mete w deyò legalman, yo dwe ba w yon avi alekri anvan: 14 jou pou ki pa peye lwaye.\n• Si w resevwa papye tribinal, ou gen dwa a yon èd legal GRATIS. Rele Tenant Defense Project touswit.\n• DAT LIMIT: Anjeneral ou gen 10 jou pou reponn yon petisyon nan tribinal. Pa inyore papye tribinal yo.",
    pt: "SEUS DIREITOS COMO INQUILINO EM NOVA YORK:\n• O proprietário NÃO PODE trocar fechaduras, remover seus pertences ou cortar serviços para forçá-lo a sair — isso é ilegal.\n• Para despejá-lo legalmente, ele deve dar aviso por escrito primeiro: 14 dias por falta de pagamento.\n• Se receber documentos do tribunal, você tem direito a AJUDA JURÍDICA GRATUITA. Ligue para o Tenant Defense Project imediatamente.\n• PRAZO: Normalmente você tem 10 dias para responder a uma petição judicial. Não ignore documentos judiciais.",
    fr: "VOS DROITS EN TANT QUE LOCATAIRE À NEW YORK:\n• Le propriétaire NE PEUT PAS changer les serrures, retirer vos affaires ou couper les services pour vous forcer à partir — c'est illégal.\n• Pour vous expulser légalement, il doit d'abord vous donner un préavis écrit : 14 jours pour non-paiement.\n• Si vous recevez des documents du tribunal, vous avez droit à UNE AIDE JURIDIQUE GRATUITE. Appelez immédiatement le Tenant Defense Project.\n• DÉLAI : Vous avez généralement 10 jours pour répondre à une requête judiciaire. N'ignorez pas les documents du tribunal.",
    hi: "न्यूयॉर्क में किरायेदार के रूप में आपके अधिकार:\n• मकान मालिक आपको जबरन निकालने के लिए ताले नहीं बदल सकता, सामान नहीं हटा सकता, या सेवाएं नहीं काट सकता — यह गैरकानूनी है।\n• कानूनी रूप से बेदखल करने के लिए, उसे पहले लिखित नोटिस देना होगा: किराया न देने पर 14 दिन।\n• अदालत के कागजात मिलने पर, आपको मुफ्त कानूनी मदद का अधिकार है। तुरंत Tenant Defense Project को कॉल करें।\n• समय सीमा: आमतौर पर अदालती याचिका का जवाब देने के लिए 10 दिन होते हैं। अदालती कागजात को नज़रअंदाज़ न करें।",
    ur: "نیویارک میں کرایہ دار کی حیثیت سے آپ کے حقوق:\n• مالک مکان آپ کو نکالنے کے لیے تالے تبدیل نہیں کر سکتا، سامان نہیں ہٹا سکتا، یا خدمات نہیں کاٹ سکتا — یہ غیر قانونی ہے۔\n• قانونی طور پر بے دخل کرنے کے لیے، اسے پہلے تحریری نوٹس دینا ضروری ہے: کرایہ نہ دینے پر 14 دن۔\n• عدالت کے کاغذات ملنے پر، آپ کو مفت قانونی مدد کا حق ہے۔ فوری طور پر Tenant Defense Project کو فون کریں۔\n• ڈیڈ لائن: عام طور پر عدالتی درخواست کا جواب دینے کے لیے 10 دن ہوتے ہیں۔ عدالتی کاغذات کو نظرانداز نہ کریں۔",
    fa: "حقوق شما به عنوان مستأجر در نیویورک:\n• صاحبخانه نمی‌تواند قفل‌ها را تغییر دهد، وسایل شما را بردارد، یا خدمات را قطع کند تا شما را مجبور به ترک خانه کند — این غیرقانونی است.\n• برای اخراج قانونی، ابتدا باید اخطار کتبی بدهد: ۱۴ روز برای عدم پرداخت اجاره.\n• اگر اوراق دادگاه دریافت کردید، شما حق کمک حقوقی رایگان دارید. فوراً با Tenant Defense Project تماس بگیرید.\n• مهلت: معمولاً ۱۰ روز فرصت دارید تا به دادخواست دادگاه پاسخ دهید. اوراق دادگاه را نادیده نگیرید.",
    ps: "په نیویارک کې ستاسو د کرایه دار حقوق:\n• د کور خاوند نشي کولی د قلفونو بدلولو، د شیانو ایستلو، یا د خدماتو پرې کولو سره تاسو ووباسي — دا غیرقانوني دي.\n• په قانوني توګه ایستلو لپاره، لومړی باید لیکلې خبرتیا ورکړي: د کرایې نه ورکولو لپاره ۱۴ ورځې.\n• که د محکمې پاڼې ترلاسه کړئ، تاسو د وړیا حقوقي مرستې حق لرئ. سمدلاسه Tenant Defense Project ته زنګ ووهئ.\n• وروستۍ نېټه: معمولاً تاسو د محکمې غوښتنلیک ته د ځواب ویلو لپاره ۱۰ ورځې لرئ. د محکمې پاڼې مه نادیده کوئ.",
    uk: "ВАШІ ПРАВА ЯК ОРЕНДАРЯ У НЬЮ-ЙОРКУ:\n• Орендодавець НЕ МОЖЕ міняти замки, виносити речі або відключати комунальні послуги, щоб змусити вас виїхати — це незаконно.\n• Щоб законно вас виселити, він повинен спочатку надати письмове повідомлення: 14 днів за несплату.\n• Якщо отримаєте судові документи, ви маєте право на БЕЗКОШТОВНУ юридичну допомогу. Негайно зателефонуйте до Tenant Defense Project.\n• СТРОК: Зазвичай у вас є 10 днів, щоб відповісти на судову петицію. Не ігноруйте судові документи.",
  },
  legalWorkers: {
    en: "YOUR RIGHTS AS A WORKER IN NEW YORK:\n• MINIMUM WAGE: $16/hour (2024). Paid less? File a wage claim with NY DOL.\n• UNPAID WAGES: Employer owes you money? File at labor.ny.gov — you may get back pay plus penalties.\n• OVERTIME: Most workers get 1.5x pay over 40 hours/week. 'Salaried' doesn't automatically mean exempt.\n• TIPS: Your employer cannot take your tips.\n• RETALIATION: Illegal to fire you for reporting wage theft or safety violations.\n• UNDOCUMENTED WORKERS: Same rights as documented workers. A wage claim does NOT affect your immigration status.",
    vi: "QUYỀN CỦA NGƯỜI LAO ĐỘNG TẠI NEW YORK:\n• LƯƠNG TỐI THIỂU: $16/giờ. Bị trả thấp hơn? Nộp đơn khiếu nại lương tại labor.ny.gov.\n• LƯƠNG CHƯA THANH TOÁN: Nộp đơn tại labor.ny.gov — bạn có thể được trả lương cũ cộng tiền phạt.\n• NGƯỜI LAO ĐỘNG KHÔNG GIẤY TỜ: Có cùng quyền như người có giấy tờ. Đơn khiếu nại KHÔNG ảnh hưởng đến tình trạng nhập cư của bạn.",
    ko: "뉴욕에서 노동자의 권리:\n• 최저 임금: 시간당 $16. 더 적게 받았나요? labor.ny.gov에서 임금 청구를 제기하세요.\n• 미지급 임금: labor.ny.gov에서 신고하세요 — 체불 임금과 벌금을 받을 수 있습니다.\n• 미등록 노동자: 등록된 노동자와 동일한 권리. 임금 청구는 이민 신분에 영향을 주지 않습니다.",
    tl: "ANG IYONG MGA KARAPATAN BILANG MANGGAGAWA SA NEW YORK:\n• MINIMUM NA SAHOD: $16/oras. Mas mababa ang sahod? Mag-file ng wage claim sa labor.ny.gov.\n• HINDI BAYAD NA SAHOD: Mag-file sa labor.ny.gov — maaari kang makakuha ng back pay at multa.\n• HINDI DOKUMENTADONG MANGGAGAWA: Parehong karapatan tulad ng dokumentadong manggagawa. Ang wage claim ay HINDI nakakaapekto sa immigration status mo.",
    ru: "ВАШИ ПРАВА КАК РАБОТНИКА В НЬЮ-ЙОРКЕ:\n• МИНИМАЛЬНАЯ ЗАРПЛАТА: $16/час. Платят меньше? Подайте жалобу о зарплате на labor.ny.gov.\n• НЕВЫПЛАЧЕННАЯ ЗАРПЛАТА: Подайте жалобу на labor.ny.gov — вы можете получить недоплату плюс штрафы.\n• РАБОТНИКИ БЕЗ ДОКУМЕНТОВ: Те же права, что у документированных работников. Жалоба о зарплате НЕ влияет на ваш иммиграционный статус.",
    ht: "DWA OU KÒM YON TRAVAYÈ NAN NEW YORK:\n• SALÈ MINIMUM: $16/lè. Yo peye w mwens? Depoze yon plent salè sou labor.ny.gov.\n• SALÈ KI POKO PEYE: Depoze sou labor.ny.gov — ou ka jwenn salè ki dwe w plis penalite.\n• TRAVAYÈ SAN PAPYE: Menm dwa ak travayè ki gen papye. Yon plent salè PA gen efè sou estati imigrasyon ou.",
    pt: "SEUS DIREITOS COMO TRABALHADOR EM NOVA YORK:\n• SALÁRIO MÍNIMO: $16/hora. Recebendo menos? Apresente uma reclamação salarial em labor.ny.gov.\n• SALÁRIOS NÃO PAGOS: Apresente uma reclamação em labor.ny.gov — você pode receber pagamento atrasado mais multas.\n• TRABALHADORES SEM DOCUMENTOS: Mesmos direitos que trabalhadores documentados. Uma reclamação salarial NÃO afeta seu status imigratório.",
    fr: "VOS DROITS EN TANT QUE TRAVAILLEUR À NEW YORK:\n• SALAIRE MINIMUM : 16 $/heure. Payé moins ? Déposez une plainte salariale sur labor.ny.gov.\n• SALAIRES IMPAYÉS : Déposez une plainte sur labor.ny.gov — vous pouvez récupérer les arriérés plus des pénalités.\n• TRAVAILLEURS SANS PAPIERS : Mêmes droits que les travailleurs documentés. Une plainte salariale N'AFFECTE PAS votre statut d'immigration.",
    hi: "न्यूयॉर्क में कार्यकर्ता के रूप में आपके अधिकार:\n• न्यूनतम मजदूरी: $16/घंटा। कम मिल रहा है? labor.ny.gov पर मजदूरी का दावा दर्ज करें।\n• अवैतनिक मजदूरी: labor.ny.gov पर दर्ज करें — आपको बकाया भुगतान और जुर्माना मिल सकता है।\n• अनधिकृत कामगार: दस्तावेजी कामगारों के समान अधिकार। मजदूरी का दावा आपकी आव्रजन स्थिति को प्रभावित नहीं करता।",
    ur: "نیویارک میں مزدور کی حیثیت سے آپ کے حقوق:\n• کم از کم اجرت: $16/گھنٹہ۔ کم مل رہی ہے؟ labor.ny.gov پر اجرت کا دعویٰ درج کریں۔\n• غیر ادا شدہ اجرت: labor.ny.gov پر درج کریں — آپ کو بقایا ادائیگی اور جرمانہ مل سکتا ہے۔\n• غیر دستاویزی مزدور: دستاویزی مزدوروں کے برابر حقوق۔ اجرت کا دعویٰ آپ کی امیگریشن حیثیت کو متاثر نہیں کرتا۔",
    fa: "حقوق شما به عنوان کارگر در نیویورک:\n• حداقل دستمزد: ۱۶ دلار در ساعت. کمتر دریافت می‌کنید؟ در labor.ny.gov شکایت دستمزد ثبت کنید.\n• دستمزد پرداخت نشده: در labor.ny.gov شکایت ثبت کنید — می‌توانید دستمزد معوقه به‌علاوه جریمه دریافت کنید.\n• کارگران بدون مدرک: همان حقوق کارگران مستند را دارند. شکایت دستمزد بر وضعیت مهاجرتی شما تأثیری نمی‌گذارد.",
    ps: "په نیویارک کې ستاسو د کارګر حقوق:\n• لږ تر لږه معاش: $16/ساعت. لږ معاش ترلاسه کوئ؟ په labor.ny.gov کې د معاش شکایت ثبت کړئ.\n• ناورکړل شوي معاشونه: په labor.ny.gov کې شکایت وکړئ — تاسو کولی شئ شاتیني معاش او جریمې ترلاسه کړئ.\n• بې سندو کارګران: د سند لرونکو کارګرانو په څیر ورته حقوق. د معاش شکایت ستاسو د کډوالۍ حالت اغیزه نه کوي.",
    uk: "ВАШІ ПРАВА ЯК ПРАЦІВНИКА У НЬЮ-ЙОРКУ:\n• МІНІМАЛЬНА ЗАРПЛАТА: $16/година. Платять менше? Подайте скаргу про зарплату на labor.ny.gov.\n• НЕВИПЛАЧЕНА ЗАРПЛАТА: Подайте скаргу на labor.ny.gov — ви можете отримати недоплату плюс штрафи.\n• ПРАЦІВНИКИ БЕЗ ДОКУМЕНТІВ: Ті ж права, що й документовані працівники. Скарга про зарплату НЕ впливає на ваш імміграційний статус.",
  },
  legalBenefits: {
    en: "IF YOUR BENEFITS WERE DENIED OR CUT IN NEW YORK:\n• YOU HAVE THE RIGHT TO APPEAL every denial.\n• SNAP: 90 days to request a fair hearing. Benefits can continue during appeal if you request it.\n• Medicaid: 60 days to appeal. Request 'continuation of benefits' to keep coverage during review.\n• Temporary Assistance: 60 days to appeal reductions or terminations.\n• SSI/Disability: 60 days to appeal. Get a lawyer — many work on contingency (no fee unless you win).\n• REQUEST A FAIR HEARING: Call 518-473-3332 for any state benefit. It's free and your caseworker cannot retaliate.",
    vi: "NẾU TRỢ CẤP CỦA BẠN BỊ TỪ CHỐI HOẶC CẮT GIẢM TẠI NEW YORK:\n• BẠN CÓ QUYỀN KHÁNG CÁO mọi quyết định từ chối.\n• SNAP: 90 ngày để yêu cầu phiên điều trần công bằng. Trợ cấp có thể tiếp tục trong khi kháng cáo.\n• Medicaid: 60 ngày để kháng cáo.\n• PHIÊN ĐIỀU TRẦN CÔNG BẰNG: Gọi 518-473-3332. Miễn phí.",
    ko: "뉴욕에서 복지 혜택이 거부되거나 삭감된 경우:\n• 모든 거부에 대해 항소할 권리가 있습니다.\n• SNAP: 공정 청문회를 요청할 수 있는 기간은 90일. 항소 중에도 혜택이 계속될 수 있습니다.\n• Medicaid: 60일 이내 항소.\n• 공정 청문회: 518-473-3332로 전화하세요. 무료입니다.",
    tl: "KUNG ANG IYONG BENEPISYO AY TINANGGIHAN O BINAWASAN SA NEW YORK:\n• MAY KARAPATAN KANG MAG-APELA sa bawat pagtanggi.\n• SNAP: 90 araw para humingi ng fair hearing. Maaaring magpatuloy ang benepisyo habang nag-aapela.\n• Medicaid: 60 araw para mag-apela.\n• FAIR HEARING: Tawagan ang 518-473-3332. Libre ito.",
    ru: "ЕСЛИ ВАШИ ПОСОБИЯ ОТКЛОНЕНЫ ИЛИ СОКРАЩЕНЫ В НЬЮ-ЙОРКЕ:\n• ВЫ ИМЕЕТЕ ПРАВО ОБЖАЛОВАТЬ каждый отказ.\n• SNAP: 90 дней для запроса справедливого слушания. Пособия могут продолжаться во время апелляции.\n• Medicaid: 60 дней для апелляции.\n• СПРАВЕДЛИВОЕ СЛУШАНИЕ: Позвоните 518-473-3332. Бесплатно.",
    ht: "SI BENEFIS OU YO REFIZE OSWA REDIKSYON NAN NEW YORK:\n• OU GEN DWA POU FÈ APÈL pou chak refi.\n• SNAP: 90 jou pou mande yon odyans jis. Benefis yo ka kontinye pandan apèl la.\n• Medicaid: 60 jou pou fè apèl.\n• ODYANS JIS: Rele 518-473-3332. Li gratis.",
    pt: "SE SEUS BENEFÍCIOS FORAM NEGADOS OU CORTADOS EM NOVA YORK:\n• VOCÊ TEM O DIREITO DE RECORRER de cada negação.\n• SNAP: 90 dias para solicitar uma audiência justa. Os benefícios podem continuar durante o recurso.\n• Medicaid: 60 dias para recorrer.\n• AUDIÊNCIA JUSTA: Ligue para 518-473-3332. É gratuito.",
    fr: "SI VOS PRESTATIONS ONT ÉTÉ REFUSÉES OU RÉDUITES À NEW YORK :\n• VOUS AVEZ LE DROIT DE FAIRE APPEL de chaque refus.\n• SNAP : 90 jours pour demander une audience équitable. Les prestations peuvent continuer pendant l'appel.\n• Medicaid : 60 jours pour faire appel.\n• AUDIENCE ÉQUITABLE : Appelez le 518-473-3332. C'est gratuit.",
    hi: "यदि न्यूयॉर्क में आपके लाभ अस्वीकार या कम कर दिए गए हैं:\n• आपको हर अस्वीकृति के खिलाफ अपील करने का अधिकार है।\n• SNAP: निष्पक्ष सुनवाई के लिए 90 दिन। अपील के दौरान लाभ जारी रह सकते हैं।\n• Medicaid: अपील के लिए 60 दिन।\n• निष्पक्ष सुनवाई: 518-473-3332 पर कॉल करें। यह मुफ्त है।",
    ur: "اگر نیویارک میں آپ کے فوائد مسترد یا کم کر دیے گئے ہیں:\n• آپ کو ہر انکار کے خلاف اپیل کرنے کا حق ہے۔\n• SNAP: منصفانہ سماعت کی درخواست کے لیے 90 دن۔ اپیل کے دوران فوائد جاری رہ سکتے ہیں۔\n• Medicaid: اپیل کے لیے 60 دن۔\n• منصفانہ سماعت: 518-473-3332 پر کال کریں۔ یہ مفت ہے۔",
    fa: "اگر مزایای شما در نیویورک رد یا قطع شده است:\n• شما حق دارید برای هر رد درخواست تجدیدنظر کنید.\n• SNAP: ۹۰ روز برای درخواست جلسه دادرسی منصفانه. مزایا ممکن است در طول تجدیدنظر ادامه یابد.\n• Medicaid: ۶۰ روز برای تجدیدنظر.\n• جلسه دادرسی منصفانه: با ۵۱۸-۴۷۳-۳۳۳۲ تماس بگیرید. رایگان است.",
    ps: "که په نیویارک کې ستاسو ګټې رد شوي یا کم شوي وي:\n• تاسو د هر ردولو په وړاندې د اپیل حق لرئ.\n• SNAP: د عادلانه اوریدنې غوښتنې لپاره ۹۰ ورځې. ګټې د اپیل پر مهال دوام موندلی شي.\n• Medicaid: د اپیل لپاره ۶۰ ورځې.\n• عادلانه اوریدنه: ۵۱۸-۴۷۳-۳۳۳۲ ته زنګ ووهئ. وړیا دی.",
    uk: "ЯКЩО ВАШІ ПІЛЬГИ ВІДМОВЛЕНІ АБО СКОРОЧЕНІ У НЬЮ-ЙОРКУ:\n• ВИ МАЄТЕ ПРАВО ОСКАРЖИТИ кожну відмову.\n• SNAP: 90 днів, щоб запросити справедливе слухання. Пільги можуть продовжуватися під час оскарження.\n• Medicaid: 60 днів для оскарження.\n• СПРАВЕДЛИВЕ СЛУХАННЯ: Зателефонуйте 518-473-3332. Безкоштовно.",
  },
  legalImmigration: {
    en: "IMPORTANT — IMMIGRATION LEGAL HELP IN NEW YORK:\n• ONLY use attorneys or DOJ-accredited representatives. 'Notarios' and immigration consultants who are NOT lawyers can cause serious harm.\n• IF ICE CONTACTS YOU: You have the right to remain silent. Do not answer questions about your birthplace or status. Ask for a lawyer.\n• DACA holders: You have work authorization while your status is valid. Renew on time.\n• SANCTUARY: Local police do not ask about immigration status for routine matters.\n• FREE LEGAL HELP: Catholic Charities and New Hope ILS provide DOJ-accredited immigration legal services.",
    vi: "QUAN TRỌNG — TRỢ GIÚP PHÁP LÝ NHẬP CƯ TẠI NEW YORK:\n• CHỈ sử dụng luật sư hoặc đại diện được DOJ công nhận. 'Notarios' KHÔNG phải là luật sư và có thể gây hại nghiêm trọng.\n• NẾU ICE LIÊN HỆ VỚI BẠN: Bạn có quyền giữ im lặng. Không trả lời câu hỏi về nơi sinh hoặc tình trạng. Yêu cầu luật sư.\n• Cảnh sát địa phương không hỏi về tình trạng nhập cư trong các vấn đề thông thường.\n• TRỢ GIÚP PHÁP LÝ MIỄN PHÍ: Catholic Charities và New Hope ILS cung cấp dịch vụ pháp lý nhập cư được DOJ công nhận.",
    ko: "중요 — 뉴욕에서 이민 법률 지원:\n• 변호사 또는 DOJ 공인 대리인만 이용하세요. 'Notarios'는 변호사가 아니며 심각한 피해를 줄 수 있습니다.\n• ICE가 연락한 경우: 묵비권이 있습니다. 출생지나 신분에 대한 질문에 답하지 마세요. 변호사를 요구하세요.\n• 지역 경찰은 일상적인 일에서 이민 신분을 묻지 않습니다.\n• 무료 법률 지원: Catholic Charities와 New Hope ILS가 DOJ 공인 이민 법률 서비스를 제공합니다.",
    tl: "MAHALAGA — TULONG LEGAL SA IMIGRASYON SA NEW YORK:\n• GUMAMIT LAMANG ng abogado o DOJ-accredited representative. Ang 'Notarios' ay HINDI abogado at maaaring magdulot ng malubhang pinsala.\n• KUNG MAKIPAG-UGNAYAN SA IYO ANG ICE: May karapatan kang manahimik. Huwag sumagot sa tanong tungkol sa lugar ng kapanganakan o status. Humingi ng abogado.\n• Ang lokal na pulis ay hindi nagtatanong tungkol sa immigration status sa mga karaniwang bagay.\n• LIBRENG TULONG LEGAL: Ang Catholic Charities at New Hope ILS ay nagbibigay ng DOJ-accredited immigration legal services.",
    ru: "ВАЖНО — ИММИГРАЦИОННАЯ ЮРИДИЧЕСКАЯ ПОМОЩЬ В НЬЮ-ЙОРКЕ:\n• ИСПОЛЬЗУЙТЕ ТОЛЬКО адвокатов или представителей, аккредитованных DOJ. 'Notarios' — НЕ адвокаты и могут нанести серьёзный вред.\n• ЕСЛИ ICE СВЯЖЕТСЯ С ВАМИ: У вас есть право хранить молчание. Не отвечайте на вопросы о месте рождения или статусе. Попросите адвоката.\n• Местная полиция не спрашивает об иммиграционном статусе в повседневных вопросах.\n• БЕСПЛАТНАЯ ЮРИДИЧЕСКАЯ ПОМОЩЬ: Catholic Charities и New Hope ILS предоставляют услуги, аккредитованные DOJ.",
    ht: "ENPÒTAN — ÈD LEGAL POU IMIGRASYON NAN NEW YORK:\n• Sèlman itilize avoka oswa reprezantan ki gen akreditasyon DOJ. 'Notarios' PA avoka epi yo ka koze gwo domaj.\n• SI ICE KONTAKTE W: Ou gen dwa pou rete an silans. Pa reponn kesyon sou kote ou fèt oswa estati w. Mande yon avoka.\n• Lapolis lokal pa mande sou estati imigrasyon nan zafè òdinè.\n• ÈD LEGAL GRATIS: Catholic Charities ak New Hope ILS bay sèvis legal imigrasyon ki akredite pa DOJ.",
    pt: "IMPORTANTE — AJUDA JURÍDICA DE IMIGRAÇÃO EM NOVA YORK:\n• Use APENAS advogados ou representantes credenciados pelo DOJ. 'Notarios' NÃO são advogados e podem causar danos graves.\n• SE O ICE ENTRAR EM CONTATO COM VOCÊ: Você tem o direito de permanecer em silêncio. Não responda perguntas sobre local de nascimento ou status. Peça um advogado.\n• A polícia local não pergunta sobre status imigratório em assuntos rotineiros.\n• AJUDA JURÍDICA GRATUITA: Catholic Charities e New Hope ILS fornecem serviços jurídicos de imigração credenciados pelo DOJ.",
    fr: "IMPORTANT — AIDE JURIDIQUE EN MATIÈRE D'IMMIGRATION À NEW YORK :\n• Utilisez UNIQUEMENT des avocats ou des représentants accrédités par le DOJ. Les 'Notarios' NE SONT PAS des avocats et peuvent causer de graves préjudices.\n• SI ICE VOUS CONTACTE : Vous avez le droit de garder le silence. Ne répondez pas aux questions sur votre lieu de naissance ou votre statut. Demandez un avocat.\n• La police locale ne pose pas de questions sur le statut d'immigration pour des questions courantes.\n• AIDE JURIDIQUE GRATUITE : Catholic Charities et New Hope ILS fournissent des services juridiques d'immigration accrédités par le DOJ.",
    hi: "महत्वपूर्ण — न्यूयॉर्क में आव्रजन कानूनी सहायता:\n• केवल वकीलों या DOJ-मान्यताप्राप्त प्रतिनिधियों का उपयोग करें। 'Notarios' वकील नहीं हैं और गंभीर नुकसान पहुंचा सकते हैं।\n• यदि ICE आपसे संपर्क करे: आपको चुप रहने का अधिकार है। जन्म स्थान या स्थिति के बारे में सवालों का जवाब न दें। वकील मांगें।\n• स्थानीय पुलिस सामान्य मामलों में आव्रजन स्थिति के बारे में नहीं पूछती।\n• मुफ्त कानूनी सहायता: Catholic Charities और New Hope ILS DOJ-मान्यताप्राप्त आव्रजन कानूनी सेवाएं प्रदान करते हैं।",
    ur: "اہم — نیویارک میں امیگریشن قانونی مدد:\n• صرف وکیلوں یا DOJ-منظور شدہ نمائندوں کا استعمال کریں۔ 'Notarios' وکیل نہیں ہیں اور سنگین نقصان پہنچا سکتے ہیں۔\n• اگر ICE آپ سے رابطہ کرے: آپ کو خاموش رہنے کا حق ہے۔ پیدائش کی جگہ یا حیثیت کے بارے میں سوالات کا جواب نہ دیں۔ وکیل کی درخواست کریں۔\n• مقامی پولیس عام معاملات میں امیگریشن حیثیت کے بارے میں نہیں پوچھتی۔\n• مفت قانونی مدد: Catholic Charities اور New Hope ILS DOJ-منظور شدہ امیگریشن قانونی خدمات فراہم کرتے ہیں۔",
    fa: "مهم — کمک حقوقی مهاجرت در نیویورک:\n• فقط از وکلا یا نمایندگان مورد تأیید DOJ استفاده کنید. 'Notarios' وکیل نیستند و می‌توانند آسیب جدی وارد کنند.\n• اگر ICE با شما تماس گرفت: شما حق سکوت دارید. به سؤالات درباره محل تولد یا وضعیت پاسخ ندهید. درخواست وکیل کنید.\n• پلیس محلی در مسائل عادی درباره وضعیت مهاجرت نمی‌پرسد.\n• کمک حقوقی رایگان: Catholic Charities و New Hope ILS خدمات حقوقی مهاجرت مورد تأیید DOJ ارائه می‌دهند.",
    ps: "مهم — په نیویارک کې د کډوالۍ حقوقي مرسته:\n• یوازې د وکیلانو یا د DOJ منل شویو استازو څخه ګټه پورته کړئ. 'Notarios' وکیلان نه دي او کولی شي جدي زیان ورسوي.\n• که ICE تاسو سره اړیکه ونیسي: تاسو د چپ پاتې کیدو حق لرئ. د زیږون ځای یا حالت په اړه پوښتنو ته ځواب مه ورکوئ. د وکیل غوښتنه وکړئ.\n• محلي پولیس په عادي چارو کې د کډوالۍ حالت په اړه نه پوښتي.\n• وړیا حقوقي مرسته: Catholic Charities او New Hope ILS د DOJ لخوا منل شوي د کډوالۍ حقوقي خدمات وړاندې کوي.",
    uk: "ВАЖЛИВО — ІМІГРАЦІЙНА ЮРИДИЧНА ДОПОМОГА У НЬЮ-ЙОРКУ:\n• Користуйтеся ВИКЛЮЧНО адвокатами або представниками, акредитованими DOJ. 'Notarios' — НЕ адвокати і можуть завдати серйозної шкоди.\n• ЯКЩО ICE ЗВ'ЯЖЕТЬСЯ З ВАМИ: Ви маєте право мовчати. Не відповідайте на запитання про місце народження або статус. Попросіть адвоката.\n• Місцева поліція не питає про імміграційний статус у рутинних справах.\n• БЕЗКОШТОВНА ЮРИДИЧНА ДОПОМОГА: Catholic Charities та New Hope ILS надають імміграційні юридичні послуги, акредитовані DOJ.",
  },
  legalDiscrim: {
    en: "IF YOU WERE DISCRIMINATED AGAINST IN NEW YORK:\n• PROTECTED IN NY: race, color, national origin, sex, pregnancy, age, disability, religion, sexual orientation, gender identity, marital status, military status, source of income.\n• EMPLOYMENT: File with EEOC (federal) or NYS Division of Human Rights. Deadline: 300 days from the incident. Do not wait.\n• HOUSING: Refusing to rent based on any protected class — including Section 8 vouchers — is illegal.\n• DISABILITY: Employers with 15+ staff must provide reasonable accommodations. Refusing is discrimination.\n• RETALIATION: Filing a complaint is protected. Retaliation is illegal.",
    vi: "NẾU BẠN BỊ PHÂN BIỆT ĐỐI XỬ TẠI NEW YORK:\n• ĐƯỢC BẢO VỆ TẠI NY: chủng tộc, giới tính, tuổi, khuyết tật, khuynh hướng tình dục, nguồn thu nhập.\n• VIỆC LÀM: Nộp đơn với EEOC hoặc NYS Division of Human Rights. Hạn chót: 300 ngày kể từ ngày xảy ra. Đừng chờ đợi.\n• NHÀ Ở: Từ chối cho thuê dựa trên bất kỳ nhóm được bảo vệ nào — bao gồm cả Section 8 — là bất hợp pháp.",
    ko: "뉴욕에서 차별을 당한 경우:\n• 뉴욕에서 보호되는 항목: 인종, 성별, 나이, 장애, 성적 지향, 소득원.\n• 고용: EEOC 또는 뉴욕주 인권부에 신고하세요. 마감: 사건으로부터 300일. 미루지 마세요.\n• 주거: 보호되는 계층(섹션 8 바우처 포함)을 이유로 임대를 거부하는 것은 불법입니다.",
    tl: "KUNG IKAW AY DINISKRIMINA SA NEW YORK:\n• PROTEKTADO SA NY: lahi, kasarian, edad, kapansanan, sexual orientation, pinagmumulan ng kita.\n• EMPLEYO: Mag-file sa EEOC o NYS Division of Human Rights. Deadline: 300 araw mula sa pangyayari. Huwag maghintay.\n• PABAHAY: Ang pagtanggi na magpaupa batay sa anumang protected class — kasama ang Section 8 vouchers — ay labag sa batas.",
    ru: "ЕСЛИ ВАС ДИСКРИМИНИРОВАЛИ В НЬЮ-ЙОРКЕ:\n• ЗАЩИЩЕНО В НЬЮ-ЙОРКЕ: раса, пол, возраст, инвалидность, сексуальная ориентация, источник дохода.\n• ТРУДОУСТРОЙСТВО: Подайте жалобу в EEOC или NYS Division of Human Rights. Срок: 300 дней с момента инцидента. Не ждите.\n• ЖИЛЬЁ: Отказ в аренде на основании любого защищённого класса — включая ваучеры Section 8 — незаконен.",
    ht: "SI YO DISKRIMINE OU NAN NEW YORK:\n• PWOTEJE NAN NY: ras, sèks, laj, andikap, oryantasyon seksyèl, sous revni.\n• ANPLWA: Depoze yon plent ak EEOC oswa NYS Division of Human Rights. Dat limit: 300 jou apati ensidan an. Pa tann.\n• LOJMAN: Refize lwe sou baz nenpòt klas pwoteje — ki gen ladan bòn Section 8 — ilegal.",
    pt: "SE VOCÊ FOI DISCRIMINADO EM NOVA YORK:\n• PROTEGIDO EM NY: raça, sexo, idade, deficiência, orientação sexual, fonte de renda.\n• EMPREGO: Apresente queixa ao EEOC ou ao NYS Division of Human Rights. Prazo: 300 dias a partir do incidente. Não espere.\n• MORADIA: Recusar alugar com base em qualquer classe protegida — incluindo vouchers da Section 8 — é ilegal.",
    fr: "SI VOUS AVEZ ÉTÉ VICTIME DE DISCRIMINATION À NEW YORK :\n• PROTÉGÉ À NY : race, sexe, âge, handicap, orientation sexuelle, source de revenus.\n• EMPLOI : Déposez une plainte auprès de l'EEOC ou du NYS Division of Human Rights. Délai : 300 jours à partir de l'incident. N'attendez pas.\n• LOGEMENT : Refuser de louer sur la base d'une classe protégée — y compris les bons Section 8 — est illégal.",
    hi: "यदि न्यूयॉर्क में आपके साथ भेदभाव हुआ है:\n• NY में संरक्षित: नस्ल, लिंग, उम्र, विकलांगता, यौन अभिविन्यास, आय का स्रोत।\n• रोजगार: EEOC या NYS Division of Human Rights में शिकायत दर्ज करें। समय सीमा: घटना से 300 दिन। प्रतीक्षा न करें।\n• आवास: किसी भी संरक्षित वर्ग — Section 8 वाउचर सहित — के आधार पर किराये पर देने से इनकार करना गैरकानूनी है।",
    ur: "اگر نیویارک میں آپ کے ساتھ امتیازی سلوک ہوا ہے:\n• NY میں محفوظ: نسل، جنس، عمر، معذوری، جنسی رجحان، آمدنی کا ذریعہ۔\n• ملازمت: EEOC یا NYS Division of Human Rights میں شکایت درج کریں۔ ڈیڈ لائن: واقعے سے 300 دن۔ انتظار نہ کریں۔\n• رہائش: کسی بھی محفوظ طبقے — بشمول Section 8 واؤچرز — کی بنیاد پر کرایہ پر دینے سے انکار کرنا غیر قانونی ہے۔",
    fa: "اگر در نیویورک با شما تبعیض شده است:\n• محافظت‌شده در NY: نژاد، جنسیت، سن، معلولیت، گرایش جنسی، منبع درآمد.\n• اشتغال: شکایت خود را به EEOC یا NYS Division of Human Rights ارائه دهید. مهلت: ۳۰۰ روز از زمان حادثه. منتظر نمانید.\n• مسکن: امتناع از اجاره دادن بر اساس هر طبقه محافظت‌شده — از جمله کوپن‌های Section 8 — غیرقانونی است.",
    ps: "که په نیویارک کې له تاسو سره توپیر شوی وي:\n• په NY کې ساتل شوي: نژاد، جنس، عمر، معلولیت، جنسي تمایل، د عاید سرچینه.\n• دنده: EEOC یا NYS Division of Human Rights ته شکایت وکړئ. وروستۍ نېټه: د پېښې څخه ۳۰۰ ورځې. مه انتظار کوئ.\n• استوګنه: د هر ساتل شوي طبقې — د Section 8 کوپونونو په ګډون — پر بنسټ د کرایې ورکولو څخه انکار غیرقانوني دی.",
    uk: "ЯКЩО ВАС ДИСКРИМІНУВАЛИ У НЬЮ-ЙОРКУ:\n• ЗАХИЩЕНО У НЬЮ-ЙОРКУ: раса, стать, вік, інвалідність, сексуальна орієнтація, джерело доходу.\n• ПРАЦЕВЛАШТУВАННЯ: Подайте скаргу до EEOC або NYS Division of Human Rights. Термін: 300 днів від інциденту. Не чекайте.\n• ЖИТЛО: Відмова в оренді на підставі будь-якого захищеного класу — включаючи ваучери Section 8 — незаконна.",
  },
  legalDebt: {
    en: "IF YOU'RE BEING SUED OR HARASSED OVER DEBT IN NEW YORK:\n• DEBT COLLECTORS CANNOT: call before 8am or after 9pm, threaten arrest, use abusive language, or lie about what you owe. These violate federal law (FDCPA).\n• YOU CAN STOP THE CALLS: Send a written cease-communication letter. They must stop except to notify you of legal action.\n• STATUTE OF LIMITATIONS: Most debts in NY expire after 3 years. They may not be able to sue you on old debt — but do NOT ignore a court summons.\n• IF SUED: Respond. Ignoring it = automatic default judgment against you.\n• WAGE GARNISHMENT: NY creditors can garnish up to 10% of gross wages. SNAP, SSI, and unemployment CANNOT be garnished.",
    vi: "NẾU BẠN BỊ KIỆN HOẶC QUẤY RỐI VỀ NỢ TẠI NEW YORK:\n• NGƯỜI THU NỢ KHÔNG ĐƯỢC: gọi trước 8 giờ sáng hoặc sau 9 giờ tối, đe dọa bắt giữ, hoặc nói dối về số tiền bạn nợ.\n• THỜI HẠN: Hầu hết các khoản nợ tại NY hết hạn sau 3 năm.\n• NẾU BỊ KIỆN: Hãy phản hồi. Bỏ qua = phán quyết mặc định chống lại bạn.",
    ko: "뉴욕에서 빚 때문에 소송을 당하거나 괴롭힘을 당하는 경우:\n• 채권 추심원은 다음을 할 수 없습니다: 오전 8시 이전이나 오후 9시 이후 전화, 체포 위협, 빚에 대해 거짓말.\n• 시효: 뉴욕에서 대부분의 빚은 3년 후 만료됩니다.\n• 소송을 당한 경우: 응답하세요. 무시 = 당신에게 불리한 자동 판결.",
    tl: "KUNG IKAW AY DEMANDADO O HINAHARASS DAHIL SA UTANG SA NEW YORK:\n• ANG MGA DEBT COLLECTOR AY HINDI MAAARING: tumawag bago ng 8am o pagkatapos ng 9pm, magbanta ng pag-aresto, o magsinungaling tungkol sa iyong utang.\n• STATUTE OF LIMITATIONS: Karamihan sa mga utang sa NY ay nagtatapos pagkatapos ng 3 taon.\n• KUNG DEMANDADO: Sumagot. Pagbalewala = automatic na default judgment laban sa iyo.",
    ru: "ЕСЛИ НА ВАС ПОДАЛИ В СУД ИЛИ ПРЕСЛЕДУЮТ ИЗ-ЗА ДОЛГА В НЬЮ-ЙОРКЕ:\n• СБОРЩИКИ ДОЛГОВ НЕ МОГУТ: звонить до 8 утра или после 9 вечера, угрожать арестом, или лгать о вашем долге.\n• СРОК ДАВНОСТИ: Большинство долгов в Нью-Йорке истекают через 3 года.\n• ЕСЛИ ВАС СУДЯТ: Отвечайте. Игнорирование = автоматическое решение не в вашу пользу.",
    ht: "SI YO POURSWIV OU OSWA YO AP ANBÈTE W POU YON DÈT NAN NEW YORK:\n• KOLEKTÈ DÈT YO PA KA: rele anvan 8è dimaten oswa apre 9è diswa, menase w avèk arestasyon, oswa bay manti sou sa ou dwe.\n• DELÈ LEGAL: Pifò dèt nan NY ekspire apre 3 lane.\n• SI YO POURSWIV OU: Reponn. Inyore l = jijman otomatik kont ou.",
    pt: "SE VOCÊ ESTÁ SENDO PROCESSADO OU ASSEDIADO POR DÍVIDA EM NOVA YORK:\n• COBRADORES DE DÍVIDA NÃO PODEM: ligar antes das 8h ou depois das 21h, ameaçar prisão, ou mentir sobre o que você deve.\n• PRAZO DE PRESCRIÇÃO: A maioria das dívidas em NY expira após 3 anos.\n• SE PROCESSADO: Responda. Ignorar = julgamento automático contra você.",
    fr: "SI VOUS ÊTES POURSUIVI OU HARCELÉ POUR UNE DETTE À NEW YORK :\n• LES AGENTS DE RECOUVREMENT NE PEUVENT PAS : appeler avant 8h ou après 21h, menacer d'arrestation, ou mentir sur ce que vous devez.\n• DÉLAI DE PRESCRIPTION : La plupart des dettes à NY expirent après 3 ans.\n• SI POURSUIVI : Répondez. Ignorer = jugement automatique contre vous.",
    hi: "यदि न्यूयॉर्क में आप पर कर्ज के लिए मुकदमा चल रहा है या आपको परेशान किया जा रहा है:\n• कर्ज वसूल करने वाले ये नहीं कर सकते: सुबह 8 बजे से पहले या रात 9 बजे के बाद फोन करना, गिरफ्तारी की धमकी देना, या आपके कर्ज के बारे में झूठ बोलना।\n• सीमा अवधि: NY में अधिकांश कर्ज 3 साल बाद समाप्त हो जाते हैं।\n• यदि मुकदमा हो: जवाब दें। नज़रअंदाज़ करना = आपके खिलाफ स्वचालित निर्णय।",
    ur: "اگر نیویارک میں آپ پر قرض کے لیے مقدمہ چل رہا ہے یا آپ کو ہراساں کیا جا رہا ہے:\n• قرض وصول کرنے والے یہ نہیں کر سکتے: صبح 8 بجے سے پہلے یا رات 9 بجے کے بعد فون کرنا، گرفتاری کی دھمکی دینا، یا آپ کے قرض کے بارے میں جھوٹ بولنا۔\n• حد بندی: NY میں زیادہ تر قرض 3 سال بعد ختم ہو جاتے ہیں۔\n• اگر مقدمہ ہو: جواب دیں۔ نظرانداز کرنا = آپ کے خلاف خودکار فیصلہ۔",
    fa: "اگر در نیویورک به دلیل بدهی از شما شکایت می‌شود یا اذیت می‌شوید:\n• وصول‌کنندگان بدهی نمی‌توانند: قبل از ساعت ۸ صبح یا بعد از ۹ شب تماس بگیرند، تهدید به دستگیری کنند، یا درباره بدهی شما دروغ بگویند.\n• مرور زمان: بیشتر بدهی‌ها در NY پس از ۳ سال منقضی می‌شوند.\n• اگر شکایت شد: پاسخ دهید. نادیده گرفتن = حکم خودکار علیه شما.",
    ps: "که په نیویارک کې ستاسو پر ضد د پور لپاره دعوه شوې وي یا تاسو ځورول کیږئ:\n• د پور راټولوونکي نه شي کولی: د سهار له ۸ بجو دمخه یا د ماښام له ۹ بجو وروسته زنګ ووهي، د نیولو ګواښ وکړي، یا ستاسو د پور په اړه دروغ ووایي.\n• د محدودیت موده: په NY کې ډېری پورونه له ۳ کلونو وروسته منقضي کیږي.\n• که دعوه شوې وي: ځواب ووایاست. نادیده کول = ستاسو پر ضد اتومات حکم.",
    uk: "ЯКЩО ВАС СУДЯТЬ АБО ПЕРЕСЛІДУЮТЬ ЧЕРЕЗ БОРГ У НЬЮ-ЙОРКУ:\n• ЗБИРАЧІ БОРГІВ НЕ МОЖУТЬ: телефонувати до 8 ранку або після 9 вечора, погрожувати арештом, або брехати про ваш борг.\n• СТРОК ПОЗОВНОЇ ДАВНОСТІ: Більшість боргів у Нью-Йорку спливають через 3 роки.\n• ЯКЩО ВАС СУДЯТЬ: Відповідайте. Ігнорування = автоматичне рішення проти вас.",
  },
  legalSmallClaims: {
    en: "SMALL CLAIMS COURT IN NEW YORK — NO LAWYER NEEDED:\n• Handles disputes up to $10,000 (City Court) or $3,000 (Town/Village Court).\n• COMMON USES: Landlord won't return security deposit, contractor did bad work, someone owes you money, property damage.\n• HOW TO FILE: Go to Rochester City Court, 99 Exchange Blvd. Filing fee: $15–$20. Court date usually within 2–3 months.\n• BRING: All documentation — receipts, contracts, photos, texts, estimates. Organize everything.\n• SECURITY DEPOSITS: In NY, your landlord must return your deposit within 14 days with an itemized list. If they don't, you can sue for DOUBLE the amount.",
    vi: "TÒA ÁN KHIẾU NẠI NHỎ TẠI NEW YORK — KHÔNG CẦN LUẬT SƯ:\n• Xử lý tranh chấp lên đến $10,000.\n• Sử dụng phổ biến: Chủ nhà không trả lại tiền đặt cọc, nhà thầu làm việc kém.\n• CÁCH NỘP ĐƠN: Tòa án Thành phố Rochester, 99 Exchange Blvd. Phí: $15-$20.\n• TIỀN ĐẶT CỌC: Chủ nhà phải trả lại trong vòng 14 ngày. Nếu không, bạn có thể kiện đòi GẤP ĐÔI số tiền.",
    ko: "뉴욕 소액 청구 법원 — 변호사 필요 없음:\n• 최대 $10,000까지의 분쟁 처리.\n• 일반적 사용: 보증금 미반환, 부실한 계약 작업.\n• 신청 방법: Rochester City Court, 99 Exchange Blvd. 수수료: $15-$20.\n• 보증금: 집주인은 14일 이내에 반환해야 합니다. 그렇지 않으면 두 배 금액을 청구할 수 있습니다.",
    tl: "SMALL CLAIMS COURT SA NEW YORK — WALANG ABOGADONG KAILANGAN:\n• Humahawak ng mga away hanggang $10,000.\n• KARANIWANG GAMIT: Hindi ibinabalik na security deposit, masamang trabaho ng contractor.\n• PAANO MAG-FILE: Rochester City Court, 99 Exchange Blvd. Bayad: $15-$20.\n• SECURITY DEPOSITS: Dapat ibalik ng nagpapaupa sa loob ng 14 araw. Kung hindi, maaari kang mag-demanda ng DOBLE ng halaga.",
    ru: "СУД МАЛЫХ ИСКОВ В НЬЮ-ЙОРКЕ — АДВОКАТ НЕ НУЖЕН:\n• Рассматривает споры до $10,000.\n• ТИПИЧНЫЕ СЛУЧАИ: Невозврат залога, плохая работа подрядчика.\n• КАК ПОДАТЬ: Rochester City Court, 99 Exchange Blvd. Пошлина: $15-$20.\n• ЗАЛОГ: Арендодатель обязан вернуть его в течение 14 дней. Если нет, вы можете подать иск на ДВОЙНУЮ сумму.",
    ht: "TRIBINAL POU TI REKLAMASYON NAN NEW YORK — PA BEZWEN AVOKA:\n• Trete diskisyon jiska $10,000.\n• ITILIZASYON KOMEN: Pwopriyetè ki pa retounen depo sekirite, kontraktè ki fè move travay.\n• KIJAN POU DEPOZE: Rochester City Court, 99 Exchange Blvd. Frè: $15-$20.\n• DEPO SEKIRITE: Pwopriyetè a dwe retounen li nan 14 jou. Si li pa fè sa, ou ka pousuiv li pou DOUB kantite a.",
    pt: "TRIBUNAL DE PEQUENAS CAUSAS EM NOVA YORK — SEM ADVOGADO:\n• Lida com disputas até $10,000.\n• USOS COMUNS: Caução não devolvida, trabalho mal feito de empreiteiro.\n• COMO ABRIR: Rochester City Court, 99 Exchange Blvd. Taxa: $15-$20.\n• CAUÇÃO: O proprietário deve devolver dentro de 14 dias. Caso contrário, você pode processar pelo DOBRO do valor.",
    fr: "TRIBUNAL DES PETITES CRÉANCES À NEW YORK — PAS BESOIN D'AVOCAT :\n• Traite les litiges jusqu'à 10 000 $.\n• UTILISATIONS COURANTES : Caution non restituée, mauvais travail d'un entrepreneur.\n• COMMENT DÉPOSER : Rochester City Court, 99 Exchange Blvd. Frais : 15-20 $.\n• CAUTIONS : Le propriétaire doit la restituer dans les 14 jours. Sinon, vous pouvez le poursuivre pour le DOUBLE du montant.",
    hi: "न्यूयॉर्क में छोटे दावों की अदालत — वकील की जरूरत नहीं:\n• $10,000 तक के विवादों को संभालती है।\n• सामान्य उपयोग: मकान मालिक ने सुरक्षा जमा नहीं लौटाई, ठेकेदार ने खराब काम किया।\n• कैसे दर्ज करें: Rochester City Court, 99 Exchange Blvd. शुल्क: $15-$20।\n• सुरक्षा जमा: मकान मालिक को 14 दिनों के भीतर लौटाना होगा। यदि नहीं, तो आप दोगुनी राशि के लिए मुकदमा कर सकते हैं।",
    ur: "نیویارک میں چھوٹے دعووں کی عدالت — وکیل کی ضرورت نہیں:\n• $10,000 تک کے تنازعات کو سنبھالتی ہے۔\n• عام استعمال: مالک مکان نے سیکیورٹی ڈپازٹ واپس نہیں کیا، ٹھیکیدار نے خراب کام کیا۔\n• کیسے درج کریں: Rochester City Court, 99 Exchange Blvd۔ فیس: $15-$20۔\n• سیکیورٹی ڈپازٹ: مالک مکان کو 14 دنوں کے اندر واپس کرنا ہوگا۔ اگر نہیں، تو آپ دوگنی رقم کے لیے مقدمہ کر سکتے ہیں۔",
    fa: "دادگاه دعاوی کوچک در نیویورک — نیاز به وکیل ندارد:\n• اختلافات تا ۱۰٬۰۰۰ دلار را رسیدگی می‌کند.\n• استفاده‌های رایج: بازپس‌ندادن ودیعه، کار بد پیمانکار.\n• چگونه شکایت کنید: Rochester City Court, 99 Exchange Blvd. هزینه: ۱۵-۲۰ دلار.\n• ودیعه: صاحبخانه باید آن را در ۱۴ روز بازگرداند. در غیر این صورت، می‌توانید برای دو برابر مبلغ شکایت کنید.",
    ps: "په نیویارک کې د کوچنیو ادعاو محکمه — وکیل ته اړتیا نشته:\n• تر ۱۰٬۰۰۰ ډالرو پورې شخړې اداره کوي.\n• عام کارونې: د کور خاوند چې د خوندیتوب امانت نه راګرځوي، د قرارداد بد کار.\n• ډوسیې جوړولو څرنګوالی: Rochester City Court, 99 Exchange Blvd. فیس: ۱۵-۲۰ ډالر.\n• د خوندیتوب امانت: د کور خاوند باید په ۱۴ ورځو کې یې راوګرځوي. که نه، تاسو د دوه‌چنده پیسو لپاره دعوه کولی شئ.",
    uk: "СУД МАЛИХ ПОЗОВІВ У НЬЮ-ЙОРКУ — АДВОКАТ НЕ ПОТРІБЕН:\n• Розглядає спори до $10,000.\n• ТИПОВІ ВИПАДКИ: Неповернення завдатку, погана робота підрядника.\n• ЯК ПОДАТИ: Rochester City Court, 99 Exchange Blvd. Збір: $15-$20.\n• ЗАВДАТОК: Орендодавець повинен повернути його протягом 14 днів. Якщо ні, ви можете подати позов на ПОДВІЙНУ суму.",
  },
  legalCrimRecord: {
    en: "CLEARING YOUR CRIMINAL RECORD IN NEW YORK:\n• NY CLEAN SLATE ACT (2024): As of November 2024, most misdemeanors are automatically sealed after 3 years and most felonies after 8 years — if no new convictions. This happened automatically.\n• SEALED vs. EXPUNGED: Sealed records are hidden from most background checks but still visible to courts and law enforcement.\n• CERTIFICATES OF RELIEF: Removes automatic bars to employment and licensing. Apply through the sentencing court.\n• MARIJUANA: Most marijuana convictions were automatically expunged under the MRTA (2021).\n• FREE HELP: RAWNY and the Judicial Process Commission help with this process for free.",
    vi: "XÓA HỒ SƠ TIỀN ÁN TẠI NEW YORK:\n• ĐẠO LUẬT CLEAN SLATE NY (2024): Hầu hết các tội nhẹ được tự động niêm phong sau 3 năm và trọng tội sau 8 năm — nếu không có kết tội mới.\n• CHỨNG CHỈ MIỄN TRỪ: Loại bỏ các rào cản đối với việc làm và cấp phép.\n• CẦN SA: Hầu hết các kết tội liên quan đến cần sa đã được tự động xóa theo MRTA (2021).\n• TRỢ GIÚP MIỄN PHÍ: RAWNY và Judicial Process Commission giúp đỡ miễn phí.",
    ko: "뉴욕에서 범죄 기록 삭제:\n• NY 클린 슬레이트 법(2024): 대부분의 경범죄는 3년 후, 중범죄는 8년 후 자동 봉인됩니다 — 새로운 유죄 판결이 없다면.\n• 구제 증명서: 고용 및 면허에 대한 자동 장벽을 제거합니다.\n• 마리화나: 대부분의 마리화나 유죄 판결은 MRTA(2021)에 따라 자동으로 말소되었습니다.\n• 무료 도움: RAWNY와 사법 절차 위원회가 무료로 도와줍니다.",
    tl: "PAGLILINIS NG IYONG CRIMINAL RECORD SA NEW YORK:\n• NY CLEAN SLATE ACT (2024): Karamihan sa mga maliliit na krimen ay awtomatikong sinasarado pagkatapos ng 3 taon at malalaking krimen pagkatapos ng 8 taon — kung walang bagong paratang.\n• CERTIFICATES OF RELIEF: Inaalis ang mga awtomatikong harang sa empleyo at lisensya.\n• MARIJUANA: Karamihan sa mga conviction ng marijuana ay awtomatikong nawala sa ilalim ng MRTA (2021).\n• LIBRENG TULONG: Ang RAWNY at Judicial Process Commission ay tumutulong nang libre.",
    ru: "ОЧИЩЕНИЕ ВАШЕЙ СУДИМОСТИ В НЬЮ-ЙОРКЕ:\n• ЗАКОН CLEAN SLATE НЬЮ-ЙОРКА (2024): Большинство мисдиминоров автоматически опечатываются через 3 года, а фелонии — через 8 лет, если нет новых обвинений.\n• СЕРТИФИКАТЫ ОБЛЕГЧЕНИЯ: Снимают автоматические барьеры для трудоустройства и лицензирования.\n• МАРИХУАНА: Большинство приговоров по марихуане были автоматически аннулированы согласно MRTA (2021).\n• БЕСПЛАТНАЯ ПОМОЩЬ: RAWNY и Judicial Process Commission помогают бесплатно.",
    ht: "NETWAYE DOSYE KRIMINÈL OU NAN NEW YORK:\n• LWA CLEAN SLATE NY (2024): Pifò deli yo otomatikman fèmen apre 3 lane epi krim grav apre 8 lane — si pa gen okenn nouvo kondanasyon.\n• SÈTIFIKA SOULAJMAN: Retire baryè otomatik pou anplwa ak lisans.\n• MARIJUANA: Pifò kondanasyon marijuana yo te otomatikman efase dapre MRTA (2021).\n• ÈD GRATIS: RAWNY ak Judicial Process Commission ede gratis.",
    pt: "LIMPANDO SEUS ANTECEDENTES CRIMINAIS EM NOVA YORK:\n• LEI CLEAN SLATE DE NY (2024): A maioria dos delitos menores são automaticamente selados após 3 anos e crimes graves após 8 anos — se não houver novas condenações.\n• CERTIFICADOS DE ALÍVIO: Removem barreiras automáticas ao emprego e licenciamento.\n• MACONHA: A maioria das condenações por maconha foram automaticamente expungidas sob a MRTA (2021).\n• AJUDA GRATUITA: RAWNY e a Judicial Process Commission ajudam gratuitamente.",
    fr: "EFFACER VOTRE CASIER JUDICIAIRE À NEW YORK :\n• LOI CLEAN SLATE DE NY (2024) : La plupart des délits sont automatiquement scellés après 3 ans et les crimes graves après 8 ans — en l'absence de nouvelles condamnations.\n• CERTIFICATS DE SOULAGEMENT : Éliminent les barrières automatiques à l'emploi et aux licences.\n• MARIJUANA : La plupart des condamnations pour marijuana ont été automatiquement effacées en vertu du MRTA (2021).\n• AIDE GRATUITE : RAWNY et la Judicial Process Commission aident gratuitement.",
    hi: "न्यूयॉर्क में अपना आपराधिक रिकॉर्ड साफ करना:\n• NY क्लीन स्लेट एक्ट (2024): अधिकांश छोटे अपराध 3 साल बाद और गंभीर अपराध 8 साल बाद स्वचालित रूप से सील हो जाते हैं — यदि कोई नई दोषसिद्धि नहीं है।\n• राहत प्रमाणपत्र: रोजगार और लाइसेंसिंग के लिए स्वचालित बाधाओं को हटाते हैं।\n• मारिजुआना: अधिकांश मारिजुआना दोषसिद्धियाँ MRTA (2021) के तहत स्वचालित रूप से समाप्त कर दी गईं।\n• मुफ्त सहायता: RAWNY और न्यायिक प्रक्रिया आयोग मुफ्त में मदद करते हैं।",
    ur: "نیویارک میں اپنا مجرمانہ ریکارڈ صاف کرنا:\n• NY کلین سلیٹ ایکٹ (2024): زیادہ تر چھوٹے جرائم 3 سال بعد اور بڑے جرائم 8 سال بعد خود بخود بند ہو جاتے ہیں — اگر کوئی نئی سزا نہ ہو۔\n• ریلیف سرٹیفکیٹ: ملازمت اور لائسنسنگ کے لیے خودکار رکاوٹوں کو ہٹاتے ہیں۔\n• چرس: زیادہ تر چرس کی سزاؤں کو MRTA (2021) کے تحت خود بخود ختم کر دیا گیا۔\n• مفت مدد: RAWNY اور عدالتی عمل کمیشن مفت میں مدد کرتے ہیں۔",
    fa: "پاک کردن سابقه کیفری شما در نیویورک:\n• قانون Clean Slate نیویورک (۲۰۲۴): اکثر جرایم کوچک پس از ۳ سال و جرایم بزرگ پس از ۸ سال به طور خودکار مهر و موم می‌شوند — اگر محکومیت جدیدی وجود نداشته باشد.\n• گواهی‌نامه‌های تخفیف: موانع خودکار اشتغال و صدور مجوز را برطرف می‌کنند.\n• ماری‌جوانا: اکثر محکومیت‌های ماری‌جوانا تحت MRTA (۲۰۲۱) به طور خودکار از بین رفتند.\n• کمک رایگان: RAWNY و کمیسیون فرآیند قضایی به صورت رایگان کمک می‌کنند.",
    ps: "په نیویارک کې د خپل جرمي ریکارډ پاکول:\n• د NY Clean Slate قانون (۲۰۲۴): ډېری کوچني جرمونه له ۳ کلونو وروسته او لوی جرمونه له ۸ کلونو وروسته په اتومات ډول مهر کیږي — که نوې محکومیت نه وي.\n• د اسانتیا تصدیقنامې: د دندې او جواز لپاره اتومات خنډونه له منځه وړي.\n• چرس: د چرس ډېری محکومیتونه د MRTA (۲۰۲۱) لاندې په اتومات ډول له منځه تللي.\n• وړیا مرسته: RAWNY او د قضایي پروسې کمیسیون په وړیا توګه مرسته کوي.",
    uk: "ОЧИЩЕННЯ ВАШОЇ СУДИМОСТІ У НЬЮ-ЙОРКУ:\n• ЗАКОН CLEAN SLATE НЬЮ-ЙОРКА (2024): Більшість дрібних правопорушень автоматично закриваються через 3 роки, а тяжкі злочини — через 8 років, якщо немає нових засуджень.\n• СЕРТИФІКАТИ ПОЛЕГШЕННЯ: Усувають автоматичні бар'єри для працевлаштування та ліцензування.\n• МАРИХУАНА: Більшість засуджень за марихуану були автоматично анульовані відповідно до MRTA (2021).\n• БЕЗКОШТОВНА ДОПОМОГА: RAWNY та Judicial Process Commission допомагають безкоштовно.",
  },
};

// Haversine distance in miles
function distanceMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ── CRISIS CATEGORIES (show crisis intercept) ──
const CRISIS_CATS = new Set(["crisis","domesticSvc","mental"]);

// ════════════════════════════════════
// COMPONENTS
// ════════════════════════════════════

const QuickExit = ({ lang }) => {
  const isRTL = lang === "ar";
  return (
    <a
      href="https://www.weather.com"
      onClick={(e) => { e.preventDefault(); window.location.replace("https://www.weather.com"); }}
      style={{
        position: "fixed", top: "max(12px, env(safe-area-inset-top, 12px))", zIndex: 9999,
        ...(isRTL ? { left: 12 } : { right: 12 }),
        background: "#d32f2f", color: "#fff", border: "none",
        padding: "8px 18px", borderRadius: 20, fontWeight: 700,
        fontSize: 14, textDecoration: "none", cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      ✕ {t(lang, "quickExit")}
    </a>
  );
};

const PrivacyBadge = ({ lang, sensitive }) => (
  <div style={{
    background: sensitive ? "#e8f5e9" : "#f5f5f5",
    border: sensitive ? "1px solid #a5d6a7" : "1px solid #e0e0e0",
    borderRadius: 10, padding: "10px 14px", margin: "12px 0",
    fontSize: 13, color: "#333", textAlign: "center",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  }}>
    <span style={{ fontSize: 16 }}>🔒</span>
    {sensitive ? t(lang, "privacySensitive") : t(lang, "privacy")}
  </div>
  );

const CrisisIntercept = ({ lang, category }) => {
  if (!CRISIS_CATS.has(category)) return null;
  const crisisPrograms = PROGRAMS.filter(
    (p) => p.c === "crisis" || (p.c === "mental" && (p.id === "988" || p.id === "crisistext"))
  );
  return (
    <div style={{
      background: "#fff3e0", border: "2px solid #ff9800", borderRadius: 12,
      padding: 16, margin: "12px 0",
    }}>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: "#e65100" }}>
        {t(lang, "crisisNotice")}
      </div>
      {crisisPrograms.slice(0, 3).map((p) => (
        <div key={p.id} style={{ marginBottom: 8 }}>
          <strong>{p.n}</strong>
          {p.ph && (
            <a href={telHref(p.ph)} style={{
              display: "inline-block", marginLeft: 8, background: "#e65100",
              color: "#fff", padding: "3px 10px", borderRadius: 6, fontSize: 13,
              textDecoration: "none", fontWeight: 600,
            }}>
              {t(lang, "callNow")} {p.ph}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

const DVSafetyNotice = ({ lang, category }) => {
  if (!DV_CATS.has(category)) return null;
  return (
    <div style={{
      background: "#fce4ec", border: "1px solid #ef9a9a", borderRadius: 10,
      padding: 12, margin: "8px 0", fontSize: 13, color: "#880e4f",
    }}>
      🛡️ {t(lang, "dvSafety")}
    </div>
  );
};

const InterpreterNotice = ({ lang }) => {
  if (lang === "en") return null;
  return (
    <div style={{
      background: "#e8eaf6", border: "1px solid #9fa8da", borderRadius: 10,
      padding: 12, margin: "8px 0", fontSize: 13, color: "#283593",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontSize: 18 }}>🗣️</span>
      <span>{t(lang, "interpreter")}</span>
    </div>
  );
};

const ProgramCard = ({ program: p, lang, expanded, onToggle }) => {
  const desc = (p.tr && p.tr[lang]) || p.d;
  const catInfo = CATEGORIES[p.c];
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: 16,
      marginBottom: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      border: "1px solid #e8e8e8", transition: "box-shadow 0.2s",
    }}>
      <div
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
        style={{ cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}
      >
        <span style={{ fontSize: 22, flexShrink: 0 }}>{catInfo?.icon || "📌"}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", lineHeight: 1.3 }}>{p.n}</div>
          <div style={{ fontSize: 13, color: "#555", marginTop: 3, lineHeight: 1.45 }}><GlossaryText text={desc} maxHighlights={2} /></div>
          {p.walkthroughEntryId && (
            <a href={"/know-your-rights/" + p.walkthroughEntryId}
              onClick={(e) => { e.stopPropagation(); trackClick(p.id + "-walkthrough"); }}
              style={{
                display: "inline-block", marginTop: 8,
                background: "#fdf6ec", color: "#a07626", padding: "5px 12px",
                borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: "none",
                border: "1px solid #f0dab0",
              }}>
              📝 Form prep guide
            </a>
          )}
        </div>
        <span style={{ fontSize: 12, color: "#767676", flexShrink: 0, marginTop: 2 }}>
          {expanded ? "▲" : "▼"}
        </span>
      </div>

      {expanded && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #eee" }}>
          {p.ph && (
            <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 13, color: "#636363" }}>📞</span>
              <a href={telHref(p.ph)} onClick={() => trackClick(p.id + "-call")}
                 style={{ color: "#1565c0", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                {p.ph}
              </a>
            </div>
          )}
          {p.ad && (
            <div style={{ marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 6 }}>
              <span style={{ fontSize: 13, color: "#636363" }}>📍</span>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.ad)}`}
                 onClick={(e) => { mapsHandoff(e, p.ad); trackClick(p.id + "-directions"); }}
                 target="_blank" rel="noopener noreferrer"
                 style={{ color: "#1565c0", fontSize: 13, textDecoration: "none" }}>
                {p.ad}
              </a>
            </div>
          )}
          {p.hr && (
            <div style={{ marginBottom: 8, fontSize: 13, color: "#555", display: "flex", gap: 6 }}>
              <span>🕐</span> {p.hr}
            </div>
          )}
          {p.doc && p.doc !== "None" && (
            <div style={{ marginBottom: 8, fontSize: 13, color: "#636363", display: "flex", gap: 6 }}>
              <span>📋</span> <strong>{t(lang, "bring")}:</strong>&nbsp;{translateDoc(p.doc, lang)}
            </div>
          )}
          {p.inc && (
            <div style={{ marginBottom: 8, fontSize: 13, color: "#555", display: "flex", gap: 6 }}>
              <span>💰</span> {t(lang, "income")}: {p.inc}% {t(lang, "fpl")}
            </div>
          )}
          {p.nt && (
            <div style={{
              marginBottom: 8, fontSize: 13, background: "#f3f8ff",
              padding: "6px 10px", borderRadius: 6, color: "#37474f",
            }}>
              ℹ️ {p.nt}
            </div>
          )}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(p.id)} style={{
                background: "#e3f2fd", color: "#1565c0", padding: "6px 14px",
                borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none",
              }}>
                {t(lang, "website")} ↗
              </a>
            )}
            {p.aurl && (
              <a href={p.aurl} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(p.id + "-apply")} style={{
                background: "#e8f5e9", color: "#2e7d32", padding: "6px 14px",
                borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none",
              }}>
                {t(lang, "apply")} ↗
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const CommunitySection = ({ lang, category }) => {
  const groups = category ? COMMUNITY.filter(g => !g.cats || g.cats.includes(category)) : COMMUNITY;
  if (groups.length === 0) return null;
  return (
  <div style={{ marginTop: 32 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "#2e7d32" }}>
      🤝 {t(lang, "communityTitle")}
    </h2>
    <p style={{ fontSize: 13, color: "#636363", marginBottom: 14, marginTop: 0 }}>
      {t(lang, "communityDesc")}
    </p>
    {groups.map((g, i) => (
      <div key={i} style={{
        background: "#f1f8e9", borderRadius: 10, padding: 12, marginBottom: 8,
        border: "1px solid #c5e1a5",
      }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{g.n}</div>
        <div style={{ fontSize: 13, color: "#444", marginTop: 2 }}>{g.d}</div>
        {g.loc && <div style={{ fontSize: 12, color: "#636363", marginTop: 3 }}>📍 {g.loc}</div>}
        {g.url && (
          <a href={g.url} target="_blank" rel="noopener noreferrer" onClick={() => trackClick("community-" + (g.n || "").replace(/\s+/g, "-").toLowerCase())}
             style={{ fontSize: 12, color: "#2e7d32", textDecoration: "none", fontWeight: 600 }}>
            {t(lang, "website")} ↗
          </a>
        )}
      </div>
    ))}
  </div>
  );
};

// ════════════════════════════════════
// SHARED STYLES
// ════════════════════════════════════
const btnStyle = (accent) => ({
  background: accent || "#fff",
  color: accent ? "#fff" : "#333",
  border: accent ? "none" : "2px solid #e0e0e0",
  borderRadius: 12, padding: "14px 18px",
  fontSize: 15, fontWeight: 600,
  cursor: "pointer", textAlign: "left",
  display: "flex", alignItems: "center", gap: 10,
  width: "100%", transition: "all 0.15s",
  lineHeight: 1.3,
});

// ════════════════════════════════════
// MAIN APP
// ════════════════════════════════════
const STEPS = { HOME: 0, WHAT_TAB: 1, WHAT_CAT: 2, WHO: 3, HOW: 4, RESULTS: 5, QUESTION: 6 };

function RocHelpInner({ onExit, city = "your area", jurisdictions = [] }) {
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(STEPS.HOME);
  const [tab, setTab] = useState(null);
  const [category, setCategory] = useState(null);
  const [nearMe, setNearMe] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [geoError, setGeoError] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [who, setWho] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [showDVExit, setShowDVExit] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentQuestionKey, setCurrentQuestionKey] = useState(null);
  const [userTown, setUserTown] = useState(null);  // null = no town filter; auto-set from jurisdiction stack
  const [resultsQuery, setResultsQuery] = useState("");

  // Auto-set userTown from jurisdiction stack (most specific match first)
  useEffect(() => {
    if (jurisdictions.length > 0 && !userTown) {
      const slug = jurisdictions[0].name.toLowerCase().replace(/\s+/g, '-');
      setUserTown(slug);
    }
  }, [jurisdictions]);
  const [enteredViaDeepLink, setEnteredViaDeepLink] = useState(false);  // true when the session was entered via a hash deep-link (e.g. /help#c=pets) — Back button uses this to call onExit() from RESULTS instead of walking the state machine backward
  const containerRef = useRef(null);


  // ── FIX 14: Deep linking via URL hash ──
  React.useEffect(() => {
    try {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const params = new URLSearchParams(hash);
      const c = params.get("c");
      if (c && CATEGORIES[c]) {
        setCategory(c);
        setEnteredViaDeepLink(true);
        if (DV_CATS.has(c)) setShowDVExit(true);
        if (isDirectToResults(c)) {
          setStep(STEPS.RESULTS);
        } else {
          const firstQ = getFirstQuestion(c);
          if (firstQ) {
            setCurrentQuestionKey(firstQ);
            setStep(STEPS.QUESTION);
          } else {
            setStep(STEPS.WHO);
          }
        }
      }
      // URL-based language hydration removed 2026-04-30: site is English-only.
    } catch (e) { /* ignore malformed hashes */ }
  }, []);

  // Update hash when results are shown
  React.useEffect(() => {
    // Hash-write on RESULTS removed in migration 18 — it was polluting
    // the URL on normal-flow navigation and causing remounts to appear
    // as deep-link sessions. Deep-links still work via FIX 14 useEffect.
    if (step === STEPS.HOME) {
      try { if (window.location.hash) window.history.replaceState(null, "", " "); } catch (e) {}
    }
  }, [step, category, lang]);

  const scrollTop = () => {
    requestAnimationFrame(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  };

  const goTo = (s) => { setStep(s); setExpandedCard(null); scrollTop(); };

  const selectTab = (key) => { setTab(key); goTo(STEPS.WHAT_CAT); };
  const selectCategory = (key) => {
    setCategory(key);
    if (DV_CATS.has(key)) setShowDVExit(true);
    setAnswers({});
    setCurrentQuestionKey(null);
    if (isDirectToResults(key)) {
      goTo(STEPS.RESULTS);
    } else {
      const firstQ = getFirstQuestion(key);
      if (firstQ) {
        setCurrentQuestionKey(firstQ);
        goTo(STEPS.QUESTION);
      } else {
        goTo(STEPS.WHO);
      }
    }
  };
  const selectWho = (val) => { setWho(val); goTo(STEPS.RESULTS); };

  const answerQuestion = (questionKey, value) => {
    const newAnswers = { ...answers, [questionKey]: value };
    setAnswers(newAnswers);
    const question = QUESTIONS[questionKey];
    const option = question && question.options && question.options.find(o => o.key === value);
    const next = option && option.next;
    if (next === "how") goTo(STEPS.RESULTS);
    else if (next === "who") goTo(STEPS.WHO);
    else if (next === "results" || next === null || next === undefined) goTo(STEPS.RESULTS);
    else {
      setCurrentQuestionKey(next);
      goTo(STEPS.QUESTION);
    }
  };

  const reset = () => {
    setStep(STEPS.HOME); setTab(null); setCategory(null);
    setEnteredViaDeepLink(false);
    setNearMe(false); setUserCoords(null); setGeoError(false);
    setWho(null); setExpandedCard(null);
    setAnswers({}); setCurrentQuestionKey(null);
    // NOTE: showDVExit intentionally NOT cleared — once activated, stays visible for safety
    scrollTop();
  };

  // ── FILTERING ──
  const filteredPrograms = useMemo(() => {
    if (!category) return [];
    let progs = getInitialPrograms(PROGRAMS, category);
    progs = applyAnswerFilters(progs, answers);
    progs = applyTownFilter(progs, userTown);

    // WHO filter (targeting tags)
    const whoTags = {
      self: ["any", "hh"],
      family: ["any", "hh"],
      child: ["any", "kids", "u5", "hh"],
      senior: ["any", "sen", "hh"],
      veteran: ["any", "vet", "hh"],
      pregnant: ["any", "preg", "u5", "hh"],
      disability: ["any", "dis", "hh"],
      anyone: null, // no filter
    };
    const tags = who ? whoTags[who] : null;
    if (tags) {
      progs = progs.filter(
        (p) => !p.tg || p.tg.length === 0 || p.tg.some((t) => tags.includes(t))
      );
    }


    // NEAR ME: when user enables location, sort by distance from user.
    // Programs with addressSuppressed:true (crisis nurseries, DV shelters)
    // sort to the END so they remain visible but never lead the list with
    // a fake distance — those resources are reached by phone, not by directions.
    if (nearMe && userCoords) {
      const [userLat, userLng] = userCoords;
      progs = progs
        .map((p) => {
          const usable = !p.addressSuppressed
            && typeof p.lat === "number"
            && typeof p.lng === "number";
          return {
            prog: p,
            dist: usable ? distanceMiles(userLat, userLng, p.lat, p.lng) : Infinity,
          };
        })
        .sort((a, b) => a.dist - b.dist)
        .map((x) => x.prog);
    }

    return progs;
  }, [category, who, nearMe, userCoords, answers, userTown]);

  // Per-entry safety override — see SAFETY_SENSITIVE doc block above DV_CATS.
  // If ANY visible program is flagged safetySensitive, escalate to Quick Exit.
  const hasSensitiveProgram = useMemo(
    () => filteredPrograms.some(p => p.safetySensitive),
    [filteredPrograms]
  );

  useEffect(() => {
    if (hasSensitiveProgram) {
      setShowDVExit(true);
    }
  }, [hasSensitiveProgram]);

  // ── STEP INDICATOR ──
  const stepLabels = [
    t(lang, "stepWhat"),
    t(lang, "stepWho"),
    t(lang, "stepResults"),
  ];
  const currentStepIndex =
    step === STEPS.WHAT_TAB || step === STEPS.WHAT_CAT ? 0
    : step === STEPS.WHO || step === STEPS.QUESTION ? 1
    : step === STEPS.RESULTS ? 2
    : -1;

  return (
    <div ref={containerRef} dir={lang === "ar" ? "rtl" : "ltr"} style={{
      fontFamily: "'Segoe UI', 'Helvetica Neue', system-ui, -apple-system, sans-serif",
      maxWidth: 480, margin: "0 auto", minHeight: "100vh",
      background: "#fafaf7", color: "#1a1a1a", position: "relative",
      overflowY: "auto",
    }}>
      {/* Touch feedback for mobile — inline styles can't do :active */}
      <style>{`
        .roc-btn:active { border-color: #2e7d32 !important; background: #f1f8e9 !important; }
        @media (hover: hover) {
          .roc-btn:hover { border-color: #2e7d32 !important; background: #f1f8e9 !important; }
        }
        .roc-btn:focus-visible { outline: 2px solid #2e7d32; outline-offset: 2px; }
        a:focus-visible, button:focus-visible, select:focus-visible { outline: 2px solid #2e7d32; outline-offset: 2px; }
        @media print {
          .roc-btn { break-inside: avoid; page-break-inside: avoid; }
          a[href]::after { content: " (" attr(href) ")"; font-size: 10px; color: #636363; }
          * { box-shadow: none !important; }
          body { background: #fff !important; }
        }
      `}</style>
      {/* Quick Exit is now site-wide via App.jsx — no longer rendered here */}

      {/* HEADER */}
      <div style={{
        background: "#fafaf7", borderBottom: "1px solid #e8e4dc",
        color: "#1a1a1a", padding: "14px 20px", position: "relative",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: onExit ? "pointer" : "default" }} onClick={() => onExit && onExit()}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#2e7d32", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: -1, flexShrink: 0 }}>HF</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                {t(lang, "title")}
              </div>
              <div style={{ fontSize: 11, color: "#767676", marginTop: 1 }}>
                <select
                  value={userTown || ""}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => { e.stopPropagation(); setUserTown(e.target.value || null); }}
                  style={{
                    background: "none", border: "none", color: "#2e7d32",
                    fontSize: 11, fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit", padding: 0, marginLeft: 2,
                    appearance: "auto",
                  }}
                  aria-label="Select your town"
                >
                  <option value="">{userTown ? "All Monroe County" : (city && city !== "your area" ? city : "Select your town")}</option>
                  {MONROE_TOWNS.map(t => (
                    <option key={t} value={t}>{TOWN_LABELS[t] || t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 8, textAlign: "center" }}>
          <ShareButton
            title="HelpFinder"
            text={t(lang, "shareText")}
            url="https://helpfinder.help"
            label={t(lang, "shareLabel")}
            ariaLabel={t(lang, "shareAriaLabel")}
          />
        </div>

        {/* Step indicator */}
        {currentStepIndex >= 0 && (
          <div role="progressbar" aria-valuenow={currentStepIndex + 1} aria-valuemin={1} aria-valuemax={4} aria-label={stepLabels[currentStepIndex]} style={{ display: "flex", gap: 4, marginTop: 12 }}>
            {stepLabels.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: 3, borderRadius: 2,
                  background: i <= currentStepIndex ? "#2e7d32" : "#e0e0e0",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* NAV — only show when user is mid-flow, not on HOME */}
      {step > STEPS.HOME && (
        <div style={{ display: "flex", gap: 8, padding: "10px 20px 0" }}>
          <button onClick={() => { if (enteredViaDeepLink) { if (onExit) onExit(); } else if (step === STEPS.WHAT_CAT) { goTo(STEPS.HOME); } else { goTo(Math.max(0, step - 1)); } }} aria-label={t(lang, "back")} style={{
            background: "none", border: "1px solid #e8e4dc", borderRadius: 20,
            padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#555",
          }}>
            ← {t(lang, "back")}
          </button>
          {!enteredViaDeepLink && (
            <button onClick={reset} style={{
              background: "none", border: "1px solid #e8e4dc", borderRadius: 20,
              padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#555",
            }}>
              {t(lang, "startOver")}
            </button>
          )}
        </div>
      )}

      {/* CONTENT */}
      <div style={{ padding: "16px 20px 80px" }}>

        {/* ── HOME ── */}
        {step === STEPS.HOME && (
          <div style={{ paddingTop: 12 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#333", marginBottom: 6, lineHeight: 1.3 }}>
                {PROGRAMS.filter(p => !p.town || !userTown || p.town === userTown || (p.serves && p.serves.includes(userTown))).length} free programs{userTown ? ` in ${TOWN_LABELS[userTown] || city}` : (city && city !== "your area" ? ` in ${city}` : "")}
              </h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.5 }}>
                {t(lang, "subtitle")}
              </p>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#333", marginBottom: 10 }}>
              {t(lang, "stepWhat")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {Object.entries(TABS).map(([key, tabData]) => {
                const count = tabData.needs.reduce((sum, catKey) => sum + PROGRAMS.filter(p => p.c === catKey).length, 0);
                return (
                  <button
                    key={key}
                    onClick={() => selectTab(key)}
                    className="roc-btn" style={{
                      ...btnStyle(),
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{tabData.icon}</span>
                      <span>{tabData[lang] || tabData.en}</span>
                    </span>
                    <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>
                      {count} →
                    </span>
                  </button>
                );
              })}
            </div>

            <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginBottom: 20 }}>
              Every program has a phone number, hours, and address.
            </p>

            <PrivacyBadge lang={lang} />

            {/* Featured */}
            <div style={{ textAlign: "start", marginTop: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#333", marginBottom: 10 }}>
                ⭐ {t(lang, "featuredTitle")}
              </h3>
              {PROGRAMS.filter((p) => FEATURED_IDS.includes(p.id)).map((p) => (
                <div key={p.id} style={{
                  background: "#fff", borderRadius: 10, padding: 12,
                  marginBottom: 8, border: "1px solid #e8e8e8",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ fontSize: 20 }}>{CATEGORIES[p.c]?.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.n}</div>
                    <div style={{ fontSize: 12, color: "#636363" }}>
                      {(p.tr && p.tr[lang]) || p.d}
                    </div>
                  </div>
                  {p.ph ? (
                    <a href={telHref(p.ph)} onClick={() => trackClick(p.id + "-call")} style={{
                      background: "#2e7d32", color: "#fff", padding: "6px 12px",
                      borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}>
                      {p.ph}
                    </a>
                  ) : p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(p.id)} style={{
                      background: "#e3f2fd", color: "#1565c0", padding: "6px 12px",
                      borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}>
                      {t(lang, "website")} ↗
                    </a>
                  ) : null}
                </div>
              ))}
            </div>

            {/* 211 banner */}
            <div style={{
              background: "#e3f2fd", borderRadius: 12, padding: 14,
              marginTop: 20, textAlign: "center",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1565c0" }}>
                {t(lang, "call211")}
              </div>
              <a href="tel:211" style={{
                display: "inline-block", marginTop: 8, background: "#1565c0",
                color: "#fff", padding: "8px 24px", borderRadius: 8,
                fontSize: 16, fontWeight: 700, textDecoration: "none",
              }}>
                📞 211
              </a>
            </div>
          </div>
        )}

        {/* ── WHAT: TAB SELECTION ── */}
        {step === STEPS.WHAT_TAB && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>
              {t(lang, "stepWhat")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(TABS).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => selectTab(key)}
                  className="roc-btn" style={btnStyle()}
                >
                  <span style={{ fontSize: 24 }}>{tab.icon}</span>
                  <span>{tab[lang] || tab.en}</span>
                </button>
              ))}
            </div>
            <PrivacyBadge lang={lang} />
          </div>
        )}

        {/* ── WHAT: CATEGORY SELECTION ── */}
        {step === STEPS.WHAT_CAT && tab && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>
              {t(lang, "stepWhat")}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {TABS[tab].needs.filter(catKey => !isHiddenCategory(catKey)).map((catKey) => {
                const cat = CATEGORIES[catKey];
                if (!cat) return null;
                return (
                  <button
                    key={catKey}
                    onClick={() => selectCategory(catKey)}
                    className="roc-btn" style={btnStyle()}
                  >
                    <span style={{ fontSize: 22 }}>{cat.icon}</span>
                    <span>{cat[lang] || cat.en}</span>
                  </button>
                );
              })}
            </div>
            {TABS[tab].needs.some((c) => SENSITIVE.has(c)) && (
              <PrivacyBadge lang={lang} sensitive />
            )}
          </div>
        )}

        {/* ── QUESTION (registry-driven) ── */}
        {step === STEPS.QUESTION && currentQuestionKey && QUESTIONS[currentQuestionKey] && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
              {QUESTIONS[currentQuestionKey].prompt}
            </h2>
            {SENSITIVE.has(category) && <PrivacyBadge lang={lang} sensitive />}
            <DVSafetyNotice lang={lang} category={category} />
            <CrisisIntercept lang={lang} category={category} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              {QUESTIONS[currentQuestionKey].options.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => answerQuestion(currentQuestionKey, opt.key)}
                  className="roc-btn"
                  style={btnStyle()}
                >
                  {opt.icon && <span style={{ fontSize: 22, marginRight: 4 }}>{opt.icon}</span>}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── WHO ── */}
        {step === STEPS.WHO && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              {t(lang, "stepWho")}
            </h2>

            {SENSITIVE.has(category) && <PrivacyBadge lang={lang} sensitive />}
            <DVSafetyNotice lang={lang} category={category} />
            <CrisisIntercept lang={lang} category={category} />

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              {[
                { key: "self", label: t(lang, "whoSelf"), icon: "👤" },
                { key: "family", label: t(lang, "whoFamily"), icon: "👨‍👩‍👧" },
                { key: "child", label: t(lang, "whoChild"), icon: "👶" },
                { key: "senior", label: t(lang, "whoSenior"), icon: "🧓" },
                { key: "veteran", label: t(lang, "whoVeteran"), icon: "🎖️" },
                { key: "pregnant", label: t(lang, "whoPregnant"), icon: "🤰" },
                { key: "disability", label: t(lang, "whoDisability"), icon: "♿" },
                { key: "anyone", label: t(lang, "whoAnyone"), icon: "🙂" },
              ].map((opt) => (
                <button key={opt.key} onClick={() => selectWho(opt.key)} className="roc-btn" style={btnStyle()}
                >
                  <span style={{ fontSize: 20 }}>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === STEPS.RESULTS && (
          <div>
            {getUrgencyLevel(answers) === 'critical' && (
              <div style={{
                background: "#ffebee", border: "2px solid #c62828",
                borderRadius: 12, padding: 14, marginBottom: 16,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#c62828", marginBottom: 4 }}>
                  🚨 This is urgent — call today
                </div>
                <div style={{ fontSize: 13, color: "#5d1a1a" }}>
                  Don't wait. The first program below is the fastest path to help.
                </div>
              </div>
            )}
            {getUrgencyLevel(answers) === 'high' && (
              <div style={{
                background: "#fff3e0", border: "2px solid #ef6c00",
                borderRadius: 12, padding: 14, marginBottom: 16,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#ef6c00", marginBottom: 4 }}>
                  ⏰ Time-sensitive — call this week
                </div>
                <div style={{ fontSize: 13, color: "#5d2a00" }}>
                  Don't wait until your court date. Free legal help is available now.
                </div>
              </div>
            )}
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
              {t(lang, "stepResults")}
            </h2>
            <div style={{ fontSize: 13, color: "#636363", marginBottom: 14 }}>
              {CATEGORIES[category]?.icon} {CATEGORIES[category]?.[lang] || CATEGORIES[category]?.en}
              {" · "}
              <strong>{filteredPrograms.length}</strong> {({es:"programas",ne:"कार्यक्रमहरू",ar:"برامج",sw:"programu",my:"အစီအစဉ်",so:"barnaamijyo",zh:"项目"}[lang] || "programs")}
            </div>

            {/* Near Me button — food category only */}
            {category === "food" && (
              <div style={{ marginBottom: 16 }}>
                {!nearMe ? (
                  <button
                    onClick={() => {
                      setGeoLoading(true);
                      navigator.geolocation.getCurrentPosition(
                        (pos) => { setUserCoords([pos.coords.latitude, pos.coords.longitude]); setNearMe(true); setGeoLoading(false); },
                        () => { setGeoError(true); setGeoLoading(false); },
                        { timeout: 8000 }
                      );
                    }}
                    style={{ background: "#2e7d32", color: "#fff", border: "none", borderRadius: 20, padding: "10px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {geoLoading ? "Finding you..." : "📍 Food within walking distance"}
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: "#2e7d32", fontWeight: 600 }}>📍 Sorted by distance from you</span>
                    <button onClick={() => { setNearMe(false); setUserCoords(null); }} style={{ background: "none", border: "1px solid #ccc", borderRadius: 12, padding: "4px 12px", fontSize: 12, cursor: "pointer", color: "#767676" }}>Clear</button>
                  </div>
                )}
                {geoError && <div style={{ fontSize: 12, color: "#c0392b", marginTop: 6 }}>Location unavailable. Enable location access in your browser.</div>}
              </div>
            )}

            <div style={{ fontSize: 14, color: "#2e7d32", marginBottom: 14, fontWeight: 500 }}>
              {({
              }[lang] || "These are real programs, and they want to help.")}
            </div>

            {SENSITIVE.has(category) && <PrivacyBadge lang={lang} sensitive />}
            <DVSafetyNotice lang={lang} category={category} />

            {/* Legal disclaimer + plain language explainer */}
            {LEGAL_CATS.has(category) && (
              <div style={{ margin: "8px 0" }}>
                <div style={{ background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 10, padding: "10px 14px", marginBottom: 8, fontSize: 12, color: "#5d4037" }}>
                  ⚖️ <strong>Not legal advice.</strong> This information explains your general rights. Laws change. For your specific situation, use the free legal resources below.
                </div>
                {LEGAL_EXPLAINERS[category] && (
                  <details style={{ background: "#f3f8ff", border: "1px solid #bbdefb", borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
                    <summary style={{ fontSize: 13, fontWeight: 700, color: "#1565c0", cursor: "pointer", userSelect: "none" }}>
                      📖 Know your rights — plain language explainer
                    </summary>
                    <pre style={{ fontSize: 12, color: "#1a1a1a", lineHeight: 1.6, marginTop: 10, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                      {LEGAL_EXPLAINERS[category][lang] || LEGAL_EXPLAINERS[category].en}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <InterpreterNotice lang={lang} />

            {/* Results search bar — narrow visible programs by name/desc/tag */}
            {filteredPrograms.length > 3 && (
              <div style={{ marginBottom: 14 }}>
                <input
                  type="search"
                  value={resultsQuery}
                  onChange={(e) => setResultsQuery(e.target.value)}
                  placeholder="Search these programs by name..."
                  style={{
                    width: "100%", padding: "11px 14px", fontSize: 14,
                    fontFamily: "inherit", color: "#1a1a1a", background: "#fff",
                    border: "2px solid #e0e0e0", borderRadius: 10, outline: "none",
                    boxSizing: "border-box", transition: "border-color 0.15s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#2e7d32")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
                />
              </div>
            )}

            {filteredPrograms.length === 0 && (
              <div style={{
                background: "#fff3e0", borderRadius: 12, padding: 20,
                textAlign: "center", marginBottom: 14, border: "1px solid #ffe0b2",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📞</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#e65100", marginBottom: 6 }}>
                  {({
                  }[lang] || "No exact match yet. Try broadening your filters, or call 211.")}
                </div>
                <a href="tel:211" style={{
                  display: "inline-block", marginTop: 8, background: "#e65100",
                  color: "#fff", padding: "10px 24px", borderRadius: 8,
                  fontSize: 16, fontWeight: 700, textDecoration: "none",
                }}>📞 211</a>
              </div>
            )}

            {filteredPrograms.filter((p) => {
              const q = resultsQuery.trim().toLowerCase();
              if (q.length < 2) return true;
              const name = (p.n || "").toLowerCase();
              const desc = (p.d || "").toLowerCase();
              const tags = (p.tg || []).join(" ").toLowerCase();
              return name.includes(q) || desc.includes(q) || tags.includes(q);
            }).map((p) => (
              <ProgramCard
                key={p.id}
                program={p}
                lang={lang}
                expanded={expandedCard === p.id}
                onToggle={() => setExpandedCard(expandedCard === p.id ? null : p.id)}
              />
            ))}

            {/* 211 referral link */}
            <div style={{
              background: "#e3f2fd", borderRadius: 12, padding: 14,
              marginTop: 16, textAlign: "center",
            }}>
              <div style={{ fontSize: 13, color: "#1565c0", fontWeight: 600 }}>
                {t(lang, "call211")}
              </div>
              <a href="tel:211" style={{
                display: "inline-block", marginTop: 6, background: "#1565c0",
                color: "#fff", padding: "8px 20px", borderRadius: 8,
                fontSize: 15, fontWeight: 700, textDecoration: "none",
              }}>
                📞 211
              </a>
            </div>

            {/* Also need help with something else */}
            <button
              onClick={() => { setCategory(null); goTo(STEPS.WHAT_TAB); }}
              style={{
                width: "100%", marginTop: 12, padding: "14px 18px",
                background: "#fff", border: "2px solid #c8e6c9", borderRadius: 12,
                fontSize: 15, fontWeight: 600, color: "#2e7d32", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              ➕ {t(lang, "alsoNeed")}
            </button>

            {/* Community groups */}
            <CommunitySection lang={lang} category={category} />

            {/* Common phrases in [topic] — glossary cross-link */}
            {(() => {
              const gCat = helpFinderToGlossaryCategory(category);
              const gTerms = gCat ? GLOSSARY_TERMS_BY_CATEGORY[gCat] : null;
              if (!gTerms || gTerms.length === 0) return null;
              return (
                <a
                  href={"/glossary/category/" + gCat}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    marginTop: 16, padding: "12px 16px",
                    background: "#ede7f6", border: "1px solid #5e35b1",
                    borderRadius: 12, color: "#4527a0",
                    fontSize: 14, fontWeight: 600, textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: 20 }}>📖</span>
                  <span style={{ flex: 1 }}>Common phrases in {glossaryCategoryLabel(gCat)} — {gTerms.length} words explained</span>
                  <span>→</span>
                </a>
              );
            })()}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: "center", padding: "16px 20px 24px",
        fontSize: 11, color: "#767676", borderTop: "1px solid #e8e4dc",
      }}>
        Sedral Studios · {userTown ? (TOWN_LABELS[userTown] || city) : city}<br />
        Built with nothing. Built for everyone.<br />
        <span style={{ fontSize: 9, color: "#bbb" }}>© 2026 Sedral Studios. All rights reserved.</span>
        <div style={{ marginTop: 12 }}>
          <button
            onClick={() => {
              try { window.location.hash = "#support"; } catch (e) {}
              if (onExit) onExit();
            }}
            style={{
              background: "none", border: "1px solid #c8e6c9", borderRadius: 16,
              padding: "6px 14px", fontSize: 12, fontWeight: 600,
              color: "#2e7d32", cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.15s",
            }}
            onMouseOver={e => { e.currentTarget.style.background = "#e8f5e9"; }}
            onMouseOut={e => { e.currentTarget.style.background = "none"; }}
          >
            ❤ {({es:"Apoyar HelpFinder",ne:"HelpFinder लाई समर्थन",ar:"دعم HelpFinder",sw:"Saidia HelpFinder",my:"HelpFinder ကိုထောက်ပံ့",so:"Taageer HelpFinder",zh:"支持 HelpFinder"}[lang] || "Support HelpFinder")}
          </button>
        </div>
        <div style={{ marginTop: 10 }}>
          <span style={{ marginTop: 4, display: "inline-block" }}>
            {({es:"Datos verificados",ne:"डाटा प्रमाणित",ar:"تم التحقق من البيانات",sw:"Data imethibitishwa",my:"အချက်အလက်စစ်ဆေးပြီး",so:"Xogta waa la xaqiijiyay",zh:"数据已验证"}[lang] || "Data verified")}: {DATA_VERIFIED}
          </span>
        </div>
        <div style={{ fontSize: 9, color: "#aaa", lineHeight: 1.5, marginTop: 10, maxWidth: 400, margin: "10px auto 0" }}>
          {({es:"HelpFinder es una herramienta informativa. Los detalles de los programas pueden cambiar. Contacte directamente a los programas para confirmar elegibilidad y horarios.",zh:"HelpFinder仅为信息工具。项目详情可能会变更。"}[lang] || "HelpFinder is an informational tool. Program details may change without notice. Always contact programs directly to confirm eligibility, hours, and availability. This is not legal, medical, or financial advice.")}
        </div>
      </div>
    </div>
  );
}

export default function RocHelp({ onExit, city = "your area", jurisdictions = [] }) {
  return (
    <ErrorBoundary>
      <RocHelpInner onExit={onExit} city={city} jurisdictions={jurisdictions} />
    </ErrorBoundary>
  );
}
