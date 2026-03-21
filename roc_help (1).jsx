import { useState } from "react";

/* ═══════════════════════════════════════════════════
   ROC HELP FINDER — v2
   Built by Sedral Studios · Rochester NY
   Free forever · Collects nothing · Helps everyone
   ═══════════════════════════════════════════════════ */

// ── LANGUAGES ──
const LANGS = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇵🇷" },
  ne: { name: "नेपाली", flag: "🇳🇵" },
  ar: { name: "العربية", flag: "🇸🇾" },
  sw: { name: "Kiswahili", flag: "🇨🇩" },
  my: { name: "မြန်မာ", flag: "🇲🇲" },
  so: { name: "Soomaali", flag: "🇸🇴" },
  zh: { name: "中文", flag: "🇨🇳" },
};

// ── UI STRINGS ──
const T = {
  en: {
    hero: "You're not alone.",
    heroSub: "Let's find help together. It takes about 2 minutes.",
    safe: "🔒 This is completely private. We don't collect, save, or send any of your information. Everything stays on your phone and disappears when you close this page.",
    safeBold: "Your information is safe.",
    immigration: "🛡️ This tool has no connection to any government agency. Nothing you enter here is reported, tracked, or shared with anyone — including immigration authorities. Rochester is a sanctuary city.",
    start: "Let's find help →",
    langSwitch: "Change language",

    // STEP 1: NEEDS (now first)
    step1: "What brings you here today?",
    step1sub: "Pick whatever applies. There's no wrong answer.",
    food: "Food & groceries",
    utilities: "Heating & electric bills",
    cash: "Cash, rent, or bills",
    health: "Health insurance or medical care",
    housing: "A place to live",
    childcare: "Childcare or parenting support",
    employment: "A job or training",
    crisis: "I'm in crisis right now",
    legal: "Legal help",
    mental: "Mental health support",
    addiction: "Addiction & recovery",
    seniorSvc: "Help for a senior",
    youth: "Programs for my kids/teens",
    domesticSvc: "Domestic violence or abuse",
    disabilitySvc: "Disability services",
    refugeeSvc: "Refugee or immigrant services",
    education: "Education, GED, or English classes",
    lgbtq: "LGBTQ+ support",
    veteranSvc: "Veteran services",

    // Crisis intercept
    crisisIntercept: "Help is available right now.",
    crisisInterceptSub: "You don't have to wait. These are free, 24/7, and confidential.",
    crisisContinue: "Continue to find more programs →",

    // DV safety
    dvSafety: "🛡️ If someone may be monitoring your phone or internet:",
    dvSafe1: "Call 211 from a safe phone (friend's phone, library, hospital)",
    dvSafe2: "Clear your browser history after visiting this page",
    dvSafe3: "Or go directly to any emergency room and tell them you need help",
    dvSafe4: "Willow Center 24-hour hotline: 585-222-SAFE (7233)",

    // STEP 2: HOUSEHOLD (now second)
    step2: "A few questions to find the right programs",
    step2sub: "Answer what you can — estimates are fine.",
    people: "How many people live in your home?",
    income: "About how much does your household earn per year?",
    incomeTip: "Your best guess is fine. Include all income — jobs, benefits, child support.",
    incomePrivacy: "💚 This helps us find programs for you. Many programs are based on income, so even a rough estimate helps. We never save this number. It stays on your screen and disappears when you're done.",
    hasKids: "Children under 18 in your home",
    kidsU5: "Any children under 5",
    pregnant: "Someone is pregnant",
    working: "Someone is currently working",
    senior: "Someone is 60 or older",
    veteran: "A veteran lives in the home",
    disabled: "Someone has a disability",

    next: "Next →",
    back: "← Back",
    find: "Find help for me →",

    resultsCount: "programs that may help you",
    crisisBanner: "If you need help right now — call 211. Free, 24 hours a day, 7 days a week. Someone will answer.",
    callNow: "Call 211 now",
    textNow: "Text your ZIP to 898-211",
    call988: "Call or text 988",
    matchedTitle: "Programs that match what you need",
    otherTitle: "Other programs you may qualify for",
    communityTitle: "Community groups & mutual aid",
    communitySub: "Run by volunteers and neighbors. Not affiliated with ROC Help Finder.",
    allPrograms: "Looking for something else?",
    allProgramsSub: "We can't list every program here. For a complete search of ALL services in Monroe County:",
    call211: "Call 211 (24/7)",
    visit211: "Search at 211lifeline.org",
    visitFindHelp: "Search at findhelp.org",
    featuredResource: "⭐ Every Saturday",
    featuredBody: "Rochester Hope — free food, clothing, haircuts, health screenings, legal aid, 50+ agencies on site. 9:30am–3:30pm at 869 N Clinton Ave.",
    startOver: "Start a new search",
    call: "Call",
    address: "Address",
    hours: "Hours",
    bring: "What to bring",
    applyOnline: "Apply online →",
    importantNote: "Important",
    website: "Visit website",
    translationBanner: "🌐 Need help in your language?",
    translationBody: "You have the right to a free interpreter at any agency. When you call, just say:",
    translationQuote: "\"I need an interpreter for [your language].\"",
    translationMore: "They will connect you with one over the phone at no cost. This is federal law.",
    translationContacts: "For extra help:",
    langLine: "Language Line (any language, any agency): 1-800-874-6686",
    iberoLine: "Ibero-American Action League (Español): 585-256-8900",
    cfcLine: "Catholic Family Center Refugee Services: 585-262-7050",
    disclaimer: "About this tool",
    disclaimerText: "ROC Help Finder is a free community resource directory built by Sedral Studios in Rochester, NY. It is not affiliated with any government agency.\n\nThis tool provides general guidance only — not legal, medical, or financial advice. Eligibility for any program is determined by that program, not by this tool. Information may change at any time. Always contact programs directly to confirm details.\n\nWe are not responsible for decisions made based on this information, or for any programs that may not be listed here.\n\nIf you need comprehensive help, call 211 — they have access to the full database of services in Monroe County.",
    privacyTitle: "Your Privacy",
    privacyText: "This tool collects absolutely nothing.\n\nNo names. No addresses. No phone numbers. No IP addresses. No cookies. No tracking. No analytics. No data is saved, transmitted, or stored — anywhere, ever.\n\nYour answers exist only on your device, only while this page is open. When you close it, everything is gone.\n\nWe built it this way on purpose. Everyone deserves help without surveillance.",
    builtBy: "Built with love in Rochester, NY · Sedral Studios · Free forever",
  },
  es: {
    hero: "No estás solo.",
    heroSub: "Busquemos ayuda juntos. Toma unos 2 minutos.",
    safe: "🔒 Esto es completamente privado. No recopilamos, guardamos ni enviamos ninguna de su información. Todo queda en su teléfono y desaparece cuando cierra esta página.",
    safeBold: "Su información está segura.",
    immigration: "🛡️ Esta herramienta no tiene conexión con ninguna agencia del gobierno. Nada de lo que ingrese aquí se reporta, rastrea o comparte con nadie — incluyendo autoridades de inmigración. Rochester es una ciudad santuario.",
    start: "Buscar ayuda →",
    langSwitch: "Cambiar idioma",
    step1: "¿Qué le trae aquí hoy?",
    step1sub: "Elija lo que aplique. No hay respuesta incorrecta.",
    food: "Comida y alimentos",
    utilities: "Calefacción y electricidad",
    cash: "Efectivo, renta o cuentas",
    health: "Seguro médico o atención médica",
    housing: "Un lugar para vivir",
    childcare: "Cuidado de niños o apoyo para padres",
    employment: "Trabajo o capacitación",
    crisis: "Estoy en crisis ahora",
    legal: "Ayuda legal",
    mental: "Salud mental",
    addiction: "Adicción y recuperación",
    seniorSvc: "Ayuda para adultos mayores",
    youth: "Programas para jóvenes",
    domesticSvc: "Violencia doméstica o abuso",
    disabilitySvc: "Servicios de discapacidad",
    refugeeSvc: "Servicios para refugiados o inmigrantes",
    education: "Educación, GED o clases de inglés",
    lgbtq: "Apoyo LGBTQ+",
    veteranSvc: "Servicios para veteranos",
    crisisIntercept: "Hay ayuda disponible ahora mismo.",
    crisisInterceptSub: "No tiene que esperar. Estos son gratis, 24/7 y confidenciales.",
    crisisContinue: "Continuar para encontrar más programas →",
    dvSafety: "🛡️ Si alguien puede estar monitoreando su teléfono o internet:",
    dvSafe1: "Llame al 211 desde un teléfono seguro (teléfono de un amigo, biblioteca, hospital)",
    dvSafe2: "Borre su historial de navegación después de visitar esta página",
    dvSafe3: "O vaya directamente a cualquier sala de emergencias y dígales que necesita ayuda",
    dvSafe4: "Línea de ayuda 24 horas de Willow Center: 585-222-SAFE (7233)",
    step2: "Algunas preguntas para encontrar los programas correctos",
    step2sub: "Responda lo que pueda — estimados están bien.",
    people: "¿Cuántas personas viven en su hogar?",
    income: "¿Aproximadamente cuánto gana su hogar al año?",
    incomeTip: "Su mejor estimación está bien. Incluya todos los ingresos.",
    incomePrivacy: "💚 Esto nos ayuda a encontrar programas para usted. Muchos programas se basan en ingresos. Nunca guardamos este número. Desaparece cuando cierra la página.",
    hasKids: "Niños menores de 18 en su hogar",
    kidsU5: "Algún niño menor de 5 años",
    pregnant: "Alguien está embarazada",
    working: "Alguien está trabajando actualmente",
    senior: "Alguien tiene 60 años o más",
    veteran: "Un veterano vive en el hogar",
    disabled: "Alguien tiene una discapacidad",
    next: "Siguiente →",
    back: "← Atrás",
    find: "Buscar ayuda →",
    resultsCount: "programas que pueden ayudarle",
    crisisBanner: "Si necesita ayuda ahora mismo — llame al 211. Gratis, 24 horas al día, 7 días a la semana.",
    callNow: "Llamar al 211",
    textNow: "Envíe su código postal al 898-211",
    call988: "Llamar o enviar texto al 988",
    matchedTitle: "Programas que coinciden con su necesidad",
    otherTitle: "Otros programas para los que puede calificar",
    communityTitle: "Grupos comunitarios y ayuda mutua",
    communitySub: "Administrados por voluntarios y vecinos. No afiliados con ROC Help Finder.",
    allPrograms: "¿Busca algo más?",
    allProgramsSub: "Para una búsqueda completa de TODOS los servicios en el Condado de Monroe:",
    call211: "Llame al 211 (24/7)",
    visit211: "Buscar en 211lifeline.org",
    visitFindHelp: "Buscar en findhelp.org",
    featuredResource: "⭐ Cada sábado",
    featuredBody: "Rochester Hope — comida gratis, ropa, cortes de pelo, exámenes de salud, ayuda legal, más de 50 agencias. 9:30am–3:30pm en 869 N Clinton Ave.",
    startOver: "Nueva búsqueda",
    call: "Llamar",
    address: "Dirección",
    hours: "Horario",
    bring: "Qué llevar",
    applyOnline: "Aplicar en línea →",
    importantNote: "Importante",
    website: "Visitar sitio web",
    translationBanner: "🌐 ¿Necesita ayuda en su idioma?",
    translationBody: "Tiene derecho a un intérprete gratis en cualquier agencia. Cuando llame, solo diga:",
    translationQuote: "\"Necesito un intérprete para español.\"",
    translationMore: "Lo conectarán con uno por teléfono sin costo. Esto es ley federal.",
    translationContacts: "Para ayuda adicional:",
    langLine: "Language Line (cualquier idioma): 1-800-874-6686",
    iberoLine: "Ibero-American Action League (Español): 585-256-8900",
    cfcLine: "Catholic Family Center Servicios de Refugiados: 585-262-7050",
    disclaimer: "Sobre esta herramienta",
    disclaimerText: "ROC Help Finder es un directorio comunitario gratuito creado por Sedral Studios en Rochester, NY. No está afiliado con ninguna agencia del gobierno.\n\nEsta herramienta proporciona orientación general solamente — no es consejo legal, médico o financiero. La elegibilidad la determina cada programa. La información puede cambiar. Siempre contacte los programas directamente.\n\nSi necesita ayuda completa, llame al 211.",
    privacyTitle: "Su Privacidad",
    privacyText: "Esta herramienta no recopila absolutamente nada.\n\nNi nombres. Ni direcciones. Ni teléfonos. Ni cookies. Ni rastreo. Ningún dato se guarda, transmite o almacena — nunca.\n\nSus respuestas existen solo en su dispositivo, solo mientras esta página esté abierta. Cuando la cierra, todo desaparece.",
    builtBy: "Hecho con amor en Rochester, NY · Sedral Studios · Gratis para siempre",
  },
};

const t = (lang, key) => (T[lang] && T[lang][key]) ? T[lang][key] : T.en[key];

// ── NEED CATEGORIES & ICONS ──
const IC = {
  food:"🍎", utilities:"🔥", cash:"💵", health:"❤️", housing:"🏠",
  childcare:"👶", employment:"💼", crisis:"🆘", youth:"🌟", legal:"⚖️",
  mental:"💚", addiction:"🔄", seniorSvc:"🧓", domesticSvc:"🛡️",
  disabilitySvc:"♿", refugeeSvc:"🌍", education:"📚", lgbtq:"🏳️‍🌈",
  veteranSvc:"🎖️",
};

// ── PROGRAMS ──
const P = [
  // ─── FOOD ───
  { id:"snap", n:"SNAP (Food Assistance)", c:"food", d:"Monthly funds for groceries on an EBT card. Most families qualify.", inc:130, ph:"585-753-6960", ad:"691 St. Paul St, Rochester NY 14605", url:"https://mybenefits.ny.gov", aurl:"https://mybenefits.ny.gov/mybenefits/begin", hr:"Monday–Friday, 8am–4pm", doc:"ID, proof of income, proof of address", tg:["hh"] },
  { id:"wic", n:"WIC (Women, Infants & Children)", c:"food", d:"Free healthy food for pregnant moms, new moms, and kids under 5. Includes formula, milk, eggs, fruits, and veggies.", inc:185, ph:"585-753-5164", ad:"111 Westfall Rd, Rochester NY 14620", url:"https://www.health.ny.gov/prevention/nutrition/wic/", hr:"Monday–Friday, 8:30am–5pm", doc:"ID, proof of income, immunization records for children", tg:["kids","u5","preg"] },
  { id:"foodlink", n:"Foodlink / Food Pantries", c:"food", d:"Free groceries from local pantries — no paperwork, no income check, no questions asked at most locations.", ph:"585-328-3380", url:"https://foodlinkny.org/find-food/", hr:"Varies by location — check website", doc:"None at most pantries", tg:["any"] },
  { id:"meals", n:"Free School Meals", c:"food", d:"Every student in Rochester City Schools gets free breakfast and lunch. No application needed.", ph:"585-262-8100", url:"https://www.rcsdk12.org/nutrition", hr:"School hours", doc:"None — automatic for RCSD students", tg:["kids","any"] },
  { id:"market", n:"Rochester Public Market + Double Up", c:"food", d:"Fresh produce at the Public Market. SNAP/EBT accepted. Double Up Food Bucks matches your SNAP spending on fruits and veggies.", ad:"280 N Union St, Rochester NY 14609", url:"https://www.cityofrochester.gov/publicmarket", hr:"Tue & Thu 6am–1pm, Sat 5am–3pm", doc:"Your EBT card", tg:["any"] },
  { id:"mow", n:"Meals on Wheels", c:"food", d:"Hot meals delivered to your home if you're 60+ or homebound. No cost.", ph:"585-461-4263", url:"https://www.lifespan-roch.org/meals-on-wheels", hr:"Delivered Monday–Friday", doc:"None — just call to sign up", tg:["sen"] },
  { id:"trillfood", n:"Trillium Health Food Pantry", c:"food", d:"Walk-in food pantry. No income check. No ID needed. Everyone welcome.", ph:"585-545-7200", ad:"259 Monroe Ave, Rochester NY 14607", url:"https://trilliumhealth.org", hr:"Monday–Friday, 8am–5pm", doc:"None", tg:["any"] },
  { id:"housemercy", n:"House of Mercy", c:"food", d:"Food pantry, clothing, shelter, advocacy. No restrictions, no ID required.", ph:"585-436-9497", ad:"285 Ormond St, Rochester NY 14605", url:"https://houseofmercyrochester.org", hr:"Check website for hours", doc:"None — no ID required", tg:["any"] },
  { id:"communityplace", n:"Community Place of Greater Rochester", c:"food", d:"Food, rent assistance, clothing, case management. Serves specific zip codes — call to check.", ph:"585-288-0021", url:"https://communityplace.org", hr:"Monday–Friday", doc:"Call to check eligibility", tg:["any"] },

  // ─── UTILITIES ───
  { id:"heap", n:"HEAP (Heating Help)", c:"utilities", d:"Help paying your heating bill. If your heat is shut off or about to be, Emergency HEAP can help right away.", inc:150, ph:"585-753-6960", ad:"691 St. Paul St, Rochester NY 14605", url:"https://otda.ny.gov/programs/heap/", aurl:"https://mybenefits.ny.gov/mybenefits/begin", hr:"Monday–Friday, 8am–4pm", doc:"ID, proof of income, your utility bill", tg:["hh"], nt:"Emergency HEAP opens each winter and runs until funds are gone. Call to check if funds are still available — don't wait." },
  { id:"herr", n:"Furnace Repair/Replacement (Free)", c:"utilities", d:"If you're 60+ and own your home, you may get free furnace repair or a new furnace.", inc:150, ph:"585-753-6960", ad:"111 Westfall Rd, Rochester NY 14620", url:"https://otda.ny.gov/programs/heap/", hr:"Monday–Friday, 8am–4pm", doc:"ID, proof of income, proof of homeownership", tg:["sen","hh"], nt:"Limited funding — apply as soon as possible." },
  { id:"rge", n:"RG&E Payment Help", c:"utilities", d:"Behind on your electric or gas bill? RG&E has payment plans and assistance. Call before they shut you off.", ph:"877-266-3492", url:"https://www.rge.com/w/home-energy-assistance-program", hr:"Monday–Friday, 8am–6pm", doc:"Your account number, proof of income", tg:["hh"] },
  { id:"empower", n:"EmPower NY (Free Home Upgrades)", c:"utilities", d:"Free insulation, air sealing, and energy improvements to lower your bills. For renters and homeowners.", inc:200, ph:"585-546-8030", url:"https://www.nyserda.ny.gov/All-Programs/EmPower-New-York-Program", hr:"Monday–Friday, 9am–5pm", doc:"Proof of income, utility bill", tg:["hh"] },

  // ─── CASH ───
  { id:"ta", n:"Temporary Assistance (Cash Help)", c:"cash", d:"Monthly cash to help with rent, utilities, and basic needs while you get back on your feet.", inc:100, ph:"585-753-6960", ad:"691 St. Paul St, Rochester NY 14605", url:"https://mybenefits.ny.gov", aurl:"https://mybenefits.ny.gov/mybenefits/begin", hr:"Monday–Friday, 8am–4pm", doc:"ID, Social Security card, proof of income, bank statements, proof of address", tg:["hh"] },
  { id:"eitc", n:"Earned Income Tax Credit", c:"cash", d:"If you work, you may get a tax refund of up to $7,430 — even if you don't owe taxes. Free tax prep available.", inc:400, ph:"585-258-3500", ad:"255 N Goodman St, Rochester NY 14607", url:"https://www.irs.gov/eitc", hr:"Tax season: January–April", doc:"W-2, Social Security numbers, ID", tg:["work","hh"] },
  { id:"vita", n:"Free Tax Filing (VITA)", c:"cash", d:"Get your taxes done for free if your household earns under $67,000.", ph:"211", url:"https://www.auw.org/freetaxprep", hr:"January–April, multiple locations", doc:"W-2, Social Security cards, ID, last year's return", tg:["work","any"] },
  { id:"fec", n:"Free Financial Counseling", c:"cash", d:"One-on-one help with debt, credit, savings, and budgeting. Completely free and confidential.", ph:"585-252-7110", url:"https://www.rochesterfec.org", hr:"Monday–Friday, by appointment", doc:"None to get started", tg:["any"] },
  { id:"rmapi", n:"RMAPI (Coaching & Mobility)", c:"cash", d:"Free coaching, financial counseling, and help building a path forward. Part of Rochester's anti-poverty initiative.", ph:"585-399-1285", url:"https://www.racf.org/rmapi", hr:"Monday–Friday, 9am–5pm", doc:"Varies", tg:["any"] },
  { id:"myb", n:"myBenefits.ny.gov (Apply for Many at Once)", c:"cash", d:"One online application for SNAP, cash assistance, Medicaid, HEAP, and childcare subsidy. Apply from your phone.", url:"https://mybenefits.ny.gov", aurl:"https://mybenefits.ny.gov/mybenefits/begin", hr:"24/7 online", doc:"ID, Social Security numbers, proof of income, proof of address", tg:["hh","any"], nt:"This one application covers SNAP, Temporary Assistance, Medicaid, HEAP, and child care. Start here." },

  // ─── HEALTH ───
  { id:"medicaid", n:"Medicaid (Free Health Insurance)", c:"health", d:"Free or very low-cost health insurance. Covers doctors, prescriptions, hospital, dental, vision, and mental health.", inc:138, ph:"585-753-6960", url:"https://nystateofhealth.ny.gov", aurl:"https://nystateofhealth.ny.gov/individual", hr:"Monday–Friday, 8am–4pm", doc:"ID, Social Security number, proof of income", tg:["hh"] },
  { id:"chip", n:"Child Health Plus", c:"health", d:"Free or low-cost health insurance for children under 19 who don't qualify for Medicaid.", inc:400, ph:"800-698-4543", url:"https://nystateofhealth.ny.gov", aurl:"https://nystateofhealth.ny.gov/individual", hr:"Monday–Friday, 8am–8pm", doc:"Child's birth certificate, Social Security number, proof of income", tg:["kids","hh"] },
  { id:"trill", n:"Trillium Health (Pay What You Can)", c:"health", d:"Doctors, dentists, counselors, pharmacy — sliding scale. Also a leader in LGBTQ+ healthcare including gender-affirming care, PrEP, and trans health services.", ph:"585-545-7200", ad:"259 Monroe Ave, Rochester NY 14607", url:"https://trilliumhealth.org", hr:"Monday–Friday, 8am–5pm", doc:"None required", tg:["any"] },
  { id:"jordan", n:"Jordan Health Center", c:"health", d:"Community health center. Primary care, dental, mental health, WIC. Accepts everyone.", ph:"585-423-5800", ad:"82 Holland St, Rochester NY 14605", url:"https://www.jordanhealth.org", hr:"Monday–Friday, 8am–5pm", doc:"None — walk-ins welcome", tg:["any"] },
  { id:"pp", n:"Planned Parenthood", c:"health", d:"Reproductive health, birth control, STI testing, cancer screening. Sliding scale — nobody turned away.", ph:"585-546-2595", ad:"114 University Ave, Rochester NY 14605", url:"https://www.plannedparenthood.org/health-center/new-york/rochester", hr:"Monday–Saturday, varies", doc:"None required", tg:["any"] },

  // ─── MENTAL HEALTH ───
  { id:"988", n:"988 Suicide & Crisis Lifeline", c:"mental", d:"Call or text 988 anytime you need to talk. Free, confidential, 24/7. You don't have to be suicidal — any emotional crisis counts.", ph:"988", url:"https://988lifeline.org", hr:"24/7", doc:"None", tg:["any"] },
  { id:"strong", n:"Strong Memorial Psych Emergency", c:"mental", d:"Walk-in psychiatric emergency room. No appointment needed.", ph:"585-275-4501", ad:"300 Crittenden Blvd, Rochester NY 14642", url:"https://www.urmc.rochester.edu/mental-health-wellness/", hr:"24/7", doc:"ID if you have it — they'll help you regardless", tg:["any"] },

  // ─── ADDICTION & RECOVERY ───
  { id:"ncadd", n:"NCADD-RA (Addiction Help)", c:"addiction", d:"Information, peer support, recovery coaching, referrals to treatment. Judgment-free.", ph:"585-719-3480", url:"https://ncadd-ra.org", hr:"Monday–Friday, 8:30am–5pm", doc:"None", tg:["any"] },
  { id:"huther", n:"Huther Doyle Memorial Institute", c:"addiction", d:"Outpatient addiction treatment, MAT (Suboxone/Vivitrol), evaluations, same-day appointments. Sliding scale — no one turned away.", ph:"585-325-5100", ad:"360 East Ave, Rochester NY 14604", url:"https://hutherdoyle.com", hr:"Monday–Friday, 8am–5pm", doc:"None to get started", tg:["any"] },
  { id:"rocovery", n:"ROCovery Fitness", c:"addiction", d:"Free fitness-based recovery support. Exercise classes, peer support, sober community. No cost.", ph:"585-330-2350", ad:"50 Public Market, Rochester NY 14609", url:"https://rocoveryfitness.org", hr:"See schedule online", doc:"None", tg:["any"] },
  { id:"na", n:"Narcotics Anonymous Rochester", c:"addiction", d:"Free meetings across Rochester. No signup, no cost, just show up.", ph:"585-325-0186", url:"https://nny-na.org", hr:"Multiple locations, daily meetings", doc:"None", tg:["any"] },
  { id:"aa", n:"Alcoholics Anonymous Rochester", c:"addiction", d:"Free meetings every day across Monroe County. Open and closed meetings.", ph:"585-232-6720", url:"https://rochesteraa.com", hr:"Multiple locations, daily", doc:"None", tg:["any"] },
  { id:"depaul", n:"DePaul (Mental Health + Addiction Housing)", c:"addiction", d:"Residential treatment, supportive housing, and community services for mental health and addiction challenges.", ph:"585-426-8000", url:"https://depaul.org", hr:"Call for info", doc:"Varies by program", tg:["any"] },
  { id:"easthouse", n:"East House", c:"addiction", d:"Substance abuse treatment, residential programs, community reintegration.", ph:"585-238-2150", url:"https://easthouse.org", hr:"Call for info", doc:"Varies by program", tg:["any"] },
  { id:"unitycd", n:"Unity Hospital Chemical Dependency", c:"addiction", d:"Inpatient and outpatient addiction treatment.", ph:"585-368-3544", url:"https://rochesterregional.org", hr:"Call for info", doc:"Varies", tg:["any"] },
  { id:"strongrec", n:"Strong Recovery (URMC)", c:"addiction", d:"Comprehensive addiction medicine. Outpatient, intensive outpatient, MAT, psychiatry.", ph:"585-275-1550", url:"https://urmc.rochester.edu/mental-health-wellness/addiction", hr:"Monday–Friday", doc:"Call for info", tg:["any"] },

  // ─── HOUSING ───
  { id:"s8", n:"Section 8 Housing Voucher", c:"housing", d:"A voucher that pays a big portion of your rent, directly to your landlord.", inc:50, ph:"585-697-6000", ad:"675 W Main St, Rochester NY 14611", url:"https://www.rochesterhousing.org", hr:"Monday–Friday, 8am–4:30pm", doc:"ID, Social Security cards, proof of income, birth certificates", tg:["hh"], nt:"The waitlist opens and closes periodically. Check the website or call." },
  { id:"ph", n:"Public Housing", c:"housing", d:"Affordable apartments where rent is based on your income (about 30% of what you earn).", inc:80, ph:"585-697-6000", ad:"675 W Main St, Rochester NY 14611", url:"https://www.rochesterhousing.org", hr:"Monday–Friday, 8am–4:30pm", doc:"ID, Social Security cards, proof of income", tg:["hh"] },
  { id:"shelter", n:"Emergency Shelter (Homeless)", c:"housing", d:"If you have nowhere to sleep tonight, call for emergency shelter placement.", ph:"585-753-2780", ad:"111 Westfall Rd, Rochester NY 14620", url:"https://www.monroecounty.gov/hs", hr:"Monday–Friday, 8am–3pm", doc:"ID if you have it — they'll help without it", tg:["any"], nt:"After 3pm and on weekends/holidays: call 585-442-1742" },
  { id:"prov", n:"Providence Housing (Supportive)", c:"housing", d:"Permanent housing with support services for people with disabilities, veterans, and families.", ph:"585-529-9555", ad:"1150 Buffalo Rd, Rochester NY 14624", url:"https://providencehousing.org/programs/", hr:"Monday–Friday, 8:30am–5pm", doc:"Must be on the Coordinated Entry list through a shelter", tg:["dis","vet"] },
  { id:"hab", n:"Habitat for Humanity", c:"housing", d:"Help building and buying your own affordable home. You put in sweat equity — and get a home.", inc:80, ph:"585-546-1470", url:"https://www.rochesterhabitat.org", hr:"Monday–Friday, 9am–5pm", doc:"Proof of income, current housing situation", tg:["hh"] },
  { id:"nw", n:"NeighborWorks (Homebuyer Help)", c:"housing", d:"Classes and coaching for first-time homebuyers. Home repair loans too.", ph:"585-325-4170", url:"https://www.nwrochester.org", hr:"Monday–Friday, 9am–5pm", doc:"Varies by program", tg:["any"] },
  { id:"tenant", n:"Tenant Defense Project", c:"housing", d:"Free lawyer if you're facing eviction. You don't have to go to court alone.", ph:"585-504-6195", url:"https://www.tenantdefense.org", hr:"Monday–Friday, 9am–5pm", doc:"Your eviction papers if you have them", tg:["any"] },
  { id:"fpgroc", n:"Family Promise of Greater Rochester", c:"housing", d:"Housing and support for families with children experiencing homelessness.", ph:"585-420-7610", url:"https://fpgroc.org", hr:"Call for info", doc:"Varies", tg:["kids","any"] },

  // ─── CHILDCARE & PARENTING ───
  { id:"ccsub", n:"Child Care Subsidy", c:"childcare", d:"Help paying for daycare, babysitter, or after-school care so you can work or go to school.", inc:200, ph:"585-753-6960", ad:"691 St. Paul St, Rochester NY 14605", aurl:"https://mybenefits.ny.gov/mybenefits/begin", hr:"Monday–Friday, 8am–4pm", doc:"ID, proof of income, proof of work or school, childcare provider info", tg:["kids","work","hh"] },
  { id:"hs", n:"Head Start / Free Pre-K", c:"childcare", d:"Free preschool for children 3–4 from low-income families. Full-day programs.", inc:100, ph:"585-271-0778", url:"https://www.abvi.org/education/head-start/", hr:"School year, Monday–Friday", doc:"Birth certificate, proof of income, immunization records", tg:["kids","u5"] },
  { id:"healthyfam", n:"Healthy Families Monroe County", c:"childcare", d:"Free home visiting for new and expectant parents. Support, education, connection to services.", ph:"585-753-5437", hr:"By appointment", doc:"None", tg:["preg","u5","any"] },
  { id:"pat", n:"Parents as Teachers", c:"childcare", d:"Free home visiting program for families with children birth to 5.", ph:"585-271-0778", hr:"By appointment", doc:"None", tg:["u5","kids","any"] },
  { id:"lll", n:"La Leche League Rochester", c:"childcare", d:"Free breastfeeding support. Meetings and phone help.", url:"https://lllrochester.org", hr:"See website for meeting schedule", doc:"None", tg:["preg","u5","any"] },
  { id:"momshm", n:"Moms Helping Moms Foundation", c:"childcare", d:"Free diapers, formula, wipes, and baby essentials. Distribution events posted on their website.", url:"https://momshelpingmoms.org", hr:"See website/Facebook for events", doc:"None", tg:["u5","kids","any"] },
  { id:"frc", n:"Family Resource Centers (RCSD)", c:"childcare", d:"Every Rochester City School has a family resource center. Help with food, clothing, housing, school supplies. Contact your child's school directly.", ph:"585-262-8100", url:"https://www.rcsdk12.org", hr:"School hours", doc:"None", tg:["kids","any"] },

  // ─── EMPLOYMENT ───
  { id:"rw", n:"RochesterWorks! (Job Center)", c:"employment", d:"Free help finding a job. Resume writing, interview practice, job listings, training.", ph:"585-258-3500", ad:"255 N Goodman St, Rochester NY 14607", url:"https://rochesterworks.org", hr:"Monday–Friday, 8am–5pm", doc:"ID", tg:["any"] },
  { id:"ps", n:"PathStone (Jobs & Training)", c:"employment", d:"Job training, farmworker assistance, small business help. Bilingual services.", ph:"585-340-3300", url:"https://www.pathstone.org", hr:"Monday–Friday, 8:30am–5pm", doc:"Varies", tg:["any"] },
  { id:"gw", n:"Goodwill (Career Help)", c:"employment", d:"Career coaching, job readiness programs, youth employment. Everyone welcome.", ph:"585-922-1250", url:"https://goodwillfingerlakes.org", hr:"Monday–Friday, 8:30am–5pm", doc:"ID", tg:["any"] },

  // ─── LEGAL ───
  { id:"la", n:"Legal Aid Society", c:"legal", d:"Free lawyers for low-income residents. Eviction, benefits, family law, immigration.", inc:200, ph:"585-232-4090", ad:"1 W Main St Suite 800, Rochester NY 14614", url:"https://lasroc.org", hr:"Monday–Friday, 9am–5pm", doc:"Proof of income", tg:[] },
  { id:"lawny", n:"LawNY (Free Legal Services)", c:"legal", d:"Free civil legal help. Housing, public benefits, family, consumer, disability rights.", ph:"585-295-5700", url:"https://www.lawny.org", hr:"Monday–Friday, 9am–5pm", doc:"Proof of income", tg:[] },
  { id:"vlsp", n:"Volunteer Legal Services (Free Clinics)", c:"legal", d:"Free legal clinics for family law, bankruptcy, immigration, and more.", ph:"585-232-3051", url:"https://vlsp.org", hr:"By appointment", doc:"Proof of income", tg:[] },

  // ─── SENIOR ───
  { id:"ofa", n:"Office for the Aging", c:"seniorSvc", d:"Help for people 60+. Meals, transportation, Medicare help, caregiver support, home care.", ph:"585-753-6280", ad:"111 Westfall Rd, Rochester NY 14620", url:"https://www.monroecounty.gov/aging", hr:"Monday–Friday, 8am–4pm", doc:"Proof of age", tg:["sen"] },
  { id:"life", n:"Lifespan (Senior Advocacy)", c:"seniorSvc", d:"Elder abuse prevention, Medicare counseling, nursing home advocacy, caregiver support.", ph:"585-244-8400", url:"https://www.lifespan-roch.org", hr:"Monday–Friday, 8am–5pm", doc:"None to get started", tg:["sen"] },
  { id:"safejrny", n:"Safe Journey (Elder Abuse)", c:"seniorSvc", d:"Help for seniors experiencing physical, emotional, or financial abuse. Through Lifespan.", ph:"585-244-8400", url:"https://lifespan-roch.org", hr:"Monday–Friday, 8am–5pm", doc:"None", tg:["sen"] },

  // ─── YOUTH ───
  { id:"te", n:"Teen Empowerment", c:"youth", d:"For young people 14–21. Leadership programs, paid jobs, community organizing, and a safe place to be.", ph:"585-445-5380", ad:"1298 Dewey Ave, Rochester NY 14613", url:"https://teenempowerment.org", hr:"After school hours", doc:"None", tg:["kids","any"] },
  { id:"yb", n:"Rochester Youth Bureau", c:"youth", d:"Connects young people to programs, activities, and services across Monroe County.", ph:"585-753-6280", url:"https://www.monroecounty.gov/hs-youth", hr:"Monday–Friday, 8am–4pm", doc:"None", tg:["kids","any"] },

  // ─── DOMESTIC VIOLENCE & ABUSE ───
  { id:"willow", n:"Willow Center (Domestic Violence)", c:"domesticSvc", d:"24-hour hotline. Emergency shelter. Counseling. Legal advocacy. Safety planning. Children's services. Support groups. You are not alone and this is not your fault.", ph:"585-222-7233", url:"https://www.willowcenterny.org", hr:"24/7", doc:"Nothing — just call", tg:["dom"] },
  { id:"biv", n:"Bivona Child Advocacy Center", c:"domesticSvc", d:"One-stop for child abuse victims. Forensic interviews, therapy, medical exams, family advocacy — all under one roof.", ph:"585-935-7800", ad:"1 Mt. Hope Ave, Rochester NY 14620", url:"https://www.bivonacac.org", hr:"Monday–Friday, 8:30am–5pm", doc:"None", tg:["kids"] },
  { id:"restore", n:"RESTORE Sexual Assault Services", c:"domesticSvc", d:"24-hour hotline for sexual assault survivors. Counseling, legal advocacy, hospital accompaniment.", ph:"585-546-2777", url:"https://restoresas.org", hr:"24/7 hotline", doc:"None", tg:[] },
  { id:"cps", n:"Child Protective Services (CPS)", c:"domesticSvc", d:"Report suspected child abuse or neglect. Anonymous.", ph:"585-753-6532", hr:"After hours: 585-753-2699", doc:"None", tg:["kids"] },
  { id:"nysdvh", n:"NYS Domestic Violence Hotline", c:"domesticSvc", d:"Statewide 24/7 hotline.", ph:"800-942-6906", url:"https://opdv.ny.gov", hr:"24/7", doc:"None", tg:["dom"] },
  { id:"ndvh", n:"National Domestic Violence Hotline", c:"domesticSvc", d:"24/7, multilingual support.", ph:"800-799-7233", url:"https://thehotline.org", hr:"24/7 · Text START to 88788", doc:"None", tg:["dom"] },
  { id:"ncah", n:"National Child Abuse Hotline", c:"domesticSvc", d:"24/7 support for child abuse concerns.", ph:"800-422-4453", url:"https://childhelp.org", hr:"24/7", doc:"None", tg:["kids"] },
  { id:"rainn", n:"RAINN (Sexual Assault Hotline)", c:"domesticSvc", d:"24/7 national sexual assault hotline.", ph:"800-656-4673", url:"https://rainn.org", hr:"24/7", doc:"None", tg:[] },

  // ─── DISABILITY ───
  { id:"rcil", n:"Center for Independent Living", c:"disabilitySvc", d:"Services for people with any disability. Housing, jobs, benefits help, advocacy, homebuying.", ph:"585-442-6470", url:"https://www.rcil.org", hr:"Monday–Friday, 8:30am–5pm", doc:"None to get started", tg:["dis"] },
  { id:"opwdd", n:"OPWDD (Developmental Disabilities)", c:"disabilitySvc", d:"State services for people with developmental disabilities. Housing, day programs, support.", ph:"866-946-9733", url:"https://opwdd.ny.gov", hr:"Monday–Friday, 9am–5pm", doc:"Disability documentation", tg:["dis"] },
  { id:"cproch", n:"CP Rochester", c:"disabilitySvc", d:"Services for people with cerebral palsy and other developmental disabilities.", ph:"585-334-6000", url:"https://cprochester.org", hr:"Call for info", doc:"Varies", tg:["dis"] },
  { id:"marycariola", n:"Mary Cariola Children's Center", c:"disabilitySvc", d:"Education and services for children with severe disabilities.", ph:"585-271-0309", url:"https://marycariola.org", hr:"Call for info", doc:"Varies", tg:["dis","kids"] },

  // ─── REFUGEE / IMMIGRANT ───
  { id:"cfc", n:"Catholic Family Center (Refugees)", c:"refugeeSvc", d:"Resettlement help, job placement, English classes, and case management for refugees and immigrants.", ph:"585-262-7050", ad:"87 N Clinton Ave, Rochester NY 14604", url:"https://www.cfcrochester.org", hr:"Monday–Friday, 8:30am–5pm", doc:"Immigration documents", tg:["any"] },
  { id:"ibero", n:"Ibero-American Action League", c:"refugeeSvc", d:"Serving Rochester's Latino community. ESL, jobs, legal help, housing, education. Bilingual staff.", ph:"585-256-8900", ad:"817 E Main St, Rochester NY 14605", url:"https://iaal.org", hr:"Monday–Friday, 9am–5pm", doc:"Varies by service", tg:["any"] },
  { id:"mary", n:"Mary's Place (Refugee Welcome)", c:"refugeeSvc", d:"Clothing, household items, and orientation for newly arrived refugees.", ph:"585-232-2590", ad:"55 St. Paul St, Rochester NY 14604", url:"https://www.marysplaceoutreach.org", hr:"Mon, Wed, Fri 10am–2pm", doc:"Refugee documentation", tg:["any"] },

  // ─── EDUCATION ───
  { id:"ged", n:"Free GED / High School Equivalency", c:"education", d:"Free classes to earn your high school diploma. Day and evening options.", ph:"585-262-8100", url:"https://www.rcsdk12.org/adulted", hr:"Monday–Friday, day and evening", doc:"ID", tg:["any"] },
  { id:"esl", n:"Free English Classes (ESL)", c:"education", d:"Learn English for free. Multiple locations and schedules.", ph:"585-262-8100", url:"https://www.literacyrochester.org", hr:"Various schedules", doc:"None", tg:["any"] },
  { id:"lib", n:"Rochester Public Library", c:"education", d:"Free computers, WiFi, printing, homework help, job search help, and thousands of programs. Library card is free.", ph:"585-428-7300", ad:"115 South Ave, Rochester NY 14604", url:"https://roccitylibrary.org", hr:"Monday–Saturday, varies by branch", doc:"Free library card with proof of address", tg:["any"] },

  // ─── LGBTQ+ ───
  { id:"outalliance", n:"Out Alliance", c:"lgbtq", d:"LGBTQ+ community center. Support groups, counseling, youth programs, HIV services.", ph:"585-244-8640", ad:"100 College Ave, Rochester NY 14607", url:"https://outalliance.org", hr:"Check website for hours", doc:"None", tg:["any"] },
  { id:"mocha", n:"MOCHA Center", c:"lgbtq", d:"Services for LGBTQ+ people of color. HIV prevention, support groups, advocacy.", ph:"585-420-1400", url:"https://mochacenter.org", hr:"Check website", doc:"None", tg:["any"] },

  // ─── VETERANS ───
  { id:"va", n:"VA Healthcare (Veterans)", c:"veteranSvc", d:"Medical care, mental health, and substance abuse treatment for veterans.", ph:"585-463-2600", ad:"400 Fort Hill Ave, Canandaigua NY 14424", url:"https://www.va.gov/rochester-health-care/", hr:"Monday–Friday, 7:30am–4pm", doc:"DD-214, VA ID card", tg:["vet"] },
  { id:"voa", n:"VOA Veterans Housing", c:"veteranSvc", d:"Transitional housing for homeless veterans. 24/7 intake.", ph:"585-454-1150", url:"https://www.voaupstateny.org", hr:"24/7", doc:"Proof of veteran status", tg:["vet"] },
  { id:"voc", n:"Veterans Outreach Center", c:"veteranSvc", d:"One-stop for veterans. Housing, employment, counseling, emergency assistance, legal help.", ph:"585-546-1081", ad:"459 South Ave, Rochester NY 14620", url:"https://veteransoutreach.org", hr:"Monday–Friday", doc:"Varies", tg:["vet"] },
  { id:"vetcrisis", n:"Veterans Crisis Line", c:"veteranSvc", d:"24/7 for veterans in crisis. Call 988 — when prompted, press 1 for veterans. Or text 838255.", ph:"988", url:"https://www.veteranscrisisline.net", hr:"24/7", doc:"None", tg:["vet"] },

  // ─── CRISIS ───
  { id:"211", n:"211 Lifeline (Call for Anything)", c:"crisis", d:"Don't know where to start? Call 211. They'll listen, figure out what you need, and connect you — free, anytime.", ph:"211", url:"https://211lifeline.org", aurl:"https://211lifeline.org/search.php", hr:"24/7", doc:"None — just call or text your ZIP to 898-211", tg:["any"] },
];

// ── COMMUNITY GROUPS (separate from programs — volunteer-run) ──
const COMMUNITY = [
  { n:"Rochester Hope", d:"Saturday service festival — free food, clothing, haircuts, health screenings, legal aid, 50+ agencies. Every Saturday 9:30am–3:30pm.", loc:"869 N Clinton Ave", url:"https://rochesterhope.org" },
  { n:"Roc Food Not Bombs", d:"Free hot meals and grocery stands across Rochester. No ID, no questions.", url:"https://facebook.com/search/top?q=roc%20food%20not%20bombs" },
  { n:"Rochester Mutual Aid Network", d:"Connects people who need help with people who can help. Mutual aid, not charity.", url:"https://rocmutualaid.com" },
  { n:"Rochester NY Food Relief", d:"Community members sharing free food, pantry info, meal locations. Very active Facebook group.", url:"https://facebook.com/groups/rochesterNYfoodrelief" },
  { n:"Buy Nothing Rochester", d:"Free items shared among neighbors — furniture, clothes, household goods, baby items. Search \"Buy Nothing\" + your neighborhood on Facebook.", url:"https://facebook.com/search/top?q=buy%20nothing%20rochester" },
  { n:"ROC COVID Mutual Aid", d:"Emergency funds, supplies, rides, community support. Still active.", url:"https://facebook.com/groups/roccovidmutualaid" },
  { n:"Rochester Free Store", d:"Free clothing and household items for anyone. Check Facebook for locations and hours.", url:"https://facebook.com/search/top?q=rochester%20free%20store" },
  { n:"Rochester NY Moms Group", d:"Parenting support, baby items, advice. Active Facebook community.", url:"https://facebook.com/search/top?q=rochester%20ny%20moms%20group" },
  { n:"Rochester Housing Help", d:"Housing leads, roommate searches, rental info. Facebook group.", url:"https://facebook.com/search/top?q=rochester%20housing%20help" },
  { n:"Rochester Job Hunters", d:"Job postings, resume help, networking. Facebook group.", url:"https://facebook.com/search/top?q=rochester%20job%20hunters" },
];

// ── FPL & MATCHING ──
const FPL = {1:15650,2:21150,3:26650,4:32150,5:37650,6:43150,7:48650,8:54150};
const fpl = s => s<=8?FPL[s]:FPL[8]+(s-8)*5500;

// ── NEEDS ORDER (display order) ──
const NEED_ORDER = [
  "crisis","food","housing","cash","utilities","health","mental","addiction",
  "childcare","employment","education","domesticSvc","seniorSvc","youth",
  "disabilitySvc","refugeeSvc","lgbtq","veteranSvc","legal",
];

export default function App() {
  const [lang, setLang] = useState(null);
  const [step, setStep] = useState(-1);
  const [a, setA] = useState({
    needs:[], size:1, income:"", kids:false, u5:false, preg:false,
    work:false, sen:false, vet:false, dis:false,
  });
  const [results, setResults] = useState(null);
  const [showLegal, setShowLegal] = useState(null);
  const [showTrans, setShowTrans] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);

  const L = lang || "en";
  const _ = (k) => t(L, k);
  const dir = L === "ar" ? "rtl" : "ltr";

  // Detect if crisis or DV selected in needs
  const hasCrisis = a.needs.includes("crisis");
  const hasDV = a.needs.includes("domesticSvc");

  const go = () => {
    const inc = parseInt(a.income)||0;
    const fp = fpl(a.size);
    const pct = (inc/fp)*100;
    const needSet = new Set(a.needs.length ? a.needs : Object.keys(IC));

    // ELIGIBILITY FILTER: does this person qualify for this program?
    const eligible = P.filter(p => {
      // DV programs only show if user selected domesticSvc
      if(p.c === "domesticSvc" && !needSet.has("domesticSvc")) return false;

      // Income gate (skip for tg:["any"] — no income restriction)
      if(p.inc && !p.tg.includes("any") && pct > p.inc) return false;

      // Household characteristic gates
      if(p.tg.includes("kids") && !a.kids) return false;
      if(p.tg.includes("u5") && !a.u5 && !a.preg) return false;
      if(p.tg.includes("preg") && !a.preg) return false;
      if(p.tg.includes("work") && !a.work) return false;

      // Demographic tags use OR logic: if program requires sen/vet/dis/dom,
      // user must match at least one (fixes Providence Housing bug from v1)
      const demo = ["sen","vet","dis","dom"].filter(t => p.tg.includes(t));
      if(demo.length > 0) {
        const match = demo.some(t =>
          (t==="sen"&&a.sen)||(t==="vet"&&a.vet)||(t==="dis"&&a.dis)||(t==="dom"&&hasDV)
        );
        if(!match) return false;
      }

      return true;
    });

    // CATEGORY MATCHING: pri = matches selected needs, rest = everything else eligible
    const pri = eligible.filter(p => needSet.has(p.c));
    const rest = eligible.filter(p => !needSet.has(p.c));

    setResults({ pri, rest, pct: Math.round(pct) });
    setStep(3);
    window.scrollTo(0,0);
  };

  // Colors
  const sage = "#2d6a4f";
  const warm = "#c97b3d";
  const cream = "#fdfcf9";
  const paper = "#ffffff";
  const line = "#e8e4dd";
  const txt = "#33302a";
  const soft = "#8a857d";
  const safeBg = "#f0f7f4";
  const safeEdge = "#b7d7c8";
  const warnBg = "#fef9ef";
  const warnEdge = "#f0d9a8";
  const dangerBg = "#fef2f2";
  const dangerEdge = "#fca5a5";
  const dvBg = "#fdf2f8";
  const dvEdge = "#f9a8d4";

  const Btn = ({children, onClick, outline, full, style:sx}) => (
    <button onClick={onClick} style={{padding:"14px 24px",background:outline?"transparent":sage,color:outline?sage:"#fff",border:outline?`2px solid ${sage}`:"none",borderRadius:12,fontSize:16,fontWeight:600,cursor:"pointer",width:full?"100%":"auto",fontFamily:"inherit",lineHeight:1.3,...sx}}>{children}</button>
  );
  const Check = ({on,label,onClick,indent}) => (
    <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",cursor:"pointer",paddingLeft:indent?28:0}}>
      <div style={{width:24,height:24,borderRadius:6,border:`2px solid ${on?sage:line}`,background:on?sage:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,flexShrink:0,transition:"all 0.15s"}}>{on?"✓":""}</div>
      <span style={{fontSize:15,lineHeight:1.4,color:txt}}>{label}</span>
    </div>
  );

  const resetAll = () => {
    setStep(0);
    setResults(null);
    setShowCommunity(false);
    setA({needs:[],size:1,income:"",kids:false,u5:false,preg:false,work:false,sen:false,vet:false,dis:false});
    window.scrollTo(0,0);
  };

  return (
    <div style={{background:cream,minHeight:"100vh",fontFamily:"Georgia, 'Segoe UI', sans-serif",color:txt,direction:dir}}>
      <div style={{maxWidth:520,margin:"0 auto",padding:"0 18px 50px"}}>

        {/* ── LANGUAGE PICKER ── */}
        {!lang && (
          <div style={{paddingTop:50,textAlign:"center"}}>
            <div style={{fontSize:32,fontWeight:700,color:sage,marginBottom:6}}>ROC Help Finder</div>
            <div style={{fontSize:14,color:soft,marginBottom:30}}>Choose your language · Elija su idioma</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {Object.entries(LANGS).map(([c,l])=>(
                <button key={c} onClick={()=>{setLang(c);setStep(0);}} style={{padding:"16px 10px",background:paper,border:`2px solid ${line}`,borderRadius:12,fontSize:16,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s"}}>
                  <span style={{fontSize:22}}>{l.flag}</span><br/><span style={{fontSize:14}}>{l.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {lang && <>
          {/* ── HEADER ── */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0 6px"}}>
            <div style={{fontSize:20,fontWeight:700,color:sage}}>ROC Help Finder</div>
            <button onClick={()=>{setLang(null);setStep(-1);setResults(null);}} style={{background:paper,border:`1px solid ${line}`,borderRadius:8,padding:"6px 12px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{LANGS[L]?.flag} {_("langSwitch")}</button>
          </div>

          {/* ── TRANSLATION BANNER ── */}
          <div style={{marginBottom:8}}>
            <button onClick={()=>setShowTrans(!showTrans)} style={{width:"100%",padding:"10px 14px",background:"#eef6ff",border:"1px solid #c5d9f0",borderRadius:10,cursor:"pointer",fontSize:13,color:"#1e3a5f",textAlign:"left",fontFamily:"inherit",fontWeight:500}}>
              {_("translationBanner")} {showTrans?"▲":"▼"}
            </button>
            {showTrans&&(
              <div style={{padding:16,background:"#f7faff",border:"1px solid #c5d9f0",borderTop:"none",borderRadius:"0 0 10px 10px",fontSize:13,lineHeight:1.7}}>
                <p style={{margin:"0 0 8px"}}>{_("translationBody")}</p>
                <div style={{background:paper,padding:12,borderRadius:8,fontStyle:"italic",fontWeight:600,fontSize:14,margin:"8px 0"}}>{_("translationQuote")}</div>
                <p style={{margin:"8px 0"}}>{_("translationMore")}</p>
                <div style={{marginTop:10,fontSize:12,display:"grid",gap:4}}>
                  <strong>{_("translationContacts")}</strong>
                  <div>📞 {_("langLine")}</div>
                  <div>📞 {_("iberoLine")}</div>
                  <div>📞 {_("cfcLine")}</div>
                </div>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════
              STEP 0: WELCOME
          ══════════════════════════════════ */}
          {step===0&&(
            <div style={{padding:24,background:paper,borderRadius:16,border:`1px solid ${line}`}}>
              <div style={{fontSize:26,fontWeight:700,color:sage,lineHeight:1.2,marginBottom:8}}>{_("hero")}</div>
              <div style={{fontSize:16,color:soft,lineHeight:1.6,marginBottom:20}}>{_("heroSub")}</div>
              <div style={{padding:14,background:safeBg,border:`1px solid ${safeEdge}`,borderRadius:10,marginBottom:12,fontSize:14,lineHeight:1.6}}>
                <strong>{_("safeBold")}</strong> {_("safe")}
              </div>
              <div style={{padding:14,background:warnBg,border:`1px solid ${warnEdge}`,borderRadius:10,marginBottom:20,fontSize:14,lineHeight:1.6}}>
                {_("immigration")}
              </div>
              <Btn full onClick={()=>setStep(1)}>{_("start")}</Btn>
            </div>
          )}

          {/* ══════════════════════════════════
              STEP 1: NEEDS (now FIRST)
          ══════════════════════════════════ */}
          {step===1&&(
            <div style={{padding:24,background:paper,borderRadius:16,border:`1px solid ${line}`}}>
              <div style={{fontSize:20,fontWeight:700,marginBottom:4}}>{_("step1")}</div>
              <div style={{fontSize:14,color:soft,marginBottom:16,lineHeight:1.5}}>{_("step1sub")}</div>

              {NEED_ORDER.map(k => {
                const label = _(k);
                if(!label || label===k) return null;
                const icon = IC[k] || "📋";
                const on = a.needs.includes(k);
                return (
                  <div key={k} onClick={()=>{const n=on?a.needs.filter(x=>x!==k):[...a.needs,k];setA({...a,needs:n});}} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 0",cursor:"pointer"}}>
                    <div style={{width:24,height:24,borderRadius:6,border:`2px solid ${on?warm:line}`,background:on?warm:"transparent",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:14,flexShrink:0}}>{on?"✓":""}</div>
                    <span style={{fontSize:15}}>{icon} {label}</span>
                  </div>
                );
              })}

              {/* ── CRISIS INTERCEPT ── */}
              {hasCrisis && (
                <div style={{padding:16,background:dangerBg,border:`1px solid ${dangerEdge}`,borderRadius:12,marginTop:16,lineHeight:1.6}}>
                  <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>{_("crisisIntercept")}</div>
                  <div style={{fontSize:14,color:soft,marginBottom:12}}>{_("crisisInterceptSub")}</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    <a href="tel:211" style={{padding:"10px 18px",background:"#dc2626",color:"#fff",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:15}}>{_("callNow")}</a>
                    <a href="tel:988" style={{padding:"10px 18px",background:"#7c3aed",color:"#fff",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:14}}>{_("call988")}</a>
                    <a href="sms:898211" style={{padding:"10px 18px",background:paper,color:txt,border:`1px solid ${line}`,borderRadius:10,textDecoration:"none",fontWeight:600,fontSize:13}}>{_("textNow")}</a>
                  </div>
                </div>
              )}

              {/* ── DV SAFETY NOTICE ── */}
              {hasDV && (
                <div style={{padding:16,background:dvBg,border:`1px solid ${dvEdge}`,borderRadius:12,marginTop:16,lineHeight:1.7,fontSize:14}}>
                  <div style={{fontWeight:700,marginBottom:8}}>{_("dvSafety")}</div>
                  <div style={{paddingLeft:8}}>
                    <div style={{marginBottom:4}}>• {_("dvSafe1")}</div>
                    <div style={{marginBottom:4}}>• {_("dvSafe2")}</div>
                    <div style={{marginBottom:4}}>• {_("dvSafe3")}</div>
                    <div style={{marginTop:8,fontWeight:700,color:"#be185d"}}>{_("dvSafe4")}</div>
                  </div>
                </div>
              )}

              <div style={{display:"flex",gap:10,marginTop:18}}>
                <Btn outline onClick={()=>setStep(0)}>{_("back")}</Btn>
                <Btn full onClick={()=>{
                  if(a.needs.length===0) return; // guard: must pick at least one
                  if(hasCrisis && a.needs.length===1){
                    go();
                  } else {
                    setStep(2);
                  }
                }} style={{opacity:a.needs.length===0?0.4:1}}>{hasCrisis && a.needs.length===1 ? _("find") : _("next")}</Btn>
              </div>
              {a.needs.length===0 && (
                <div style={{textAlign:"center",marginTop:8,fontSize:13,color:soft}}>Pick at least one so we can help you find the right programs.</div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════
              STEP 2: HOUSEHOLD (now SECOND)
          ══════════════════════════════════ */}
          {step===2&&(
            <div style={{padding:24,background:paper,borderRadius:16,border:`1px solid ${line}`}}>
              <div style={{fontSize:20,fontWeight:700,marginBottom:4}}>{_("step2")}</div>
              <div style={{fontSize:14,color:soft,marginBottom:8,lineHeight:1.5}}>{_("step2sub")}</div>

              {/* Privacy reassurance */}
              <div style={{padding:12,background:safeBg,border:`1px solid ${safeEdge}`,borderRadius:10,marginBottom:18,fontSize:13,lineHeight:1.6,color:sage}}>
                🔒 {_("safe").replace("🔒 ","")}
              </div>

              <label style={{fontSize:14,fontWeight:600,marginBottom:4,display:"block"}}>{_("people")}</label>
              <select value={a.size} onChange={e=>setA({...a,size:+e.target.value})} style={{padding:14,fontSize:16,border:`2px solid ${line}`,borderRadius:10,width:"100%",boxSizing:"border-box",fontFamily:"inherit",marginBottom:16,background:paper}}>
                {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n}</option>)}
              </select>

              <label style={{fontSize:14,fontWeight:600,marginBottom:4,display:"block"}}>{_("income")}</label>
              <div style={{fontSize:12,color:soft,marginBottom:6}}>{_("incomeTip")}</div>
              {/* Income privacy reassurance */}
              <div style={{padding:10,background:"#f0f7f4",borderRadius:8,marginBottom:10,fontSize:12,lineHeight:1.5,color:"#2d6a4f"}}>
                {_("incomePrivacy")}
              </div>
              <div style={{position:"relative",marginBottom:16}}>
                <span style={{position:"absolute",left:14,top:14,color:soft,fontSize:16}}>$</span>
                <input type="number" inputMode="numeric" placeholder="25000" value={a.income} onChange={e=>setA({...a,income:e.target.value})} style={{padding:14,paddingLeft:28,fontSize:16,border:`2px solid ${line}`,borderRadius:10,width:"100%",boxSizing:"border-box",fontFamily:"inherit"}} />
              </div>

              <Check on={a.kids} label={_("hasKids")} onClick={()=>setA({...a,kids:!a.kids,u5:!a.kids?a.u5:false})} />
              {a.kids&&<Check on={a.u5} label={_("kidsU5")} onClick={()=>setA({...a,u5:!a.u5})} indent />}
              <Check on={a.preg} label={_("pregnant")} onClick={()=>setA({...a,preg:!a.preg})} />
              <Check on={a.work} label={_("working")} onClick={()=>setA({...a,work:!a.work})} />

              {/* These always show — senior/vet/disabled status affects matching across all categories */}
              <Check on={a.sen} label={_("senior")} onClick={()=>setA({...a,sen:!a.sen})} />
              <Check on={a.vet} label={_("veteran")} onClick={()=>setA({...a,vet:!a.vet})} />
              <Check on={a.dis} label={_("disabled")} onClick={()=>setA({...a,dis:!a.dis})} />

              {/* DV safety notice if relevant */}
              {hasDV && (
                <div style={{padding:14,background:dvBg,border:`1px solid ${dvEdge}`,borderRadius:10,marginTop:12,fontSize:13,lineHeight:1.6}}>
                  <strong>{_("dvSafety")}</strong>
                  <div style={{marginTop:4,fontWeight:700,color:"#be185d"}}>{_("dvSafe4")}</div>
                </div>
              )}

              <div style={{display:"flex",gap:10,marginTop:18}}>
                <Btn outline onClick={()=>setStep(1)}>{_("back")}</Btn>
                <Btn full onClick={go}>{_("find")}</Btn>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════
              STEP 3: RESULTS
          ══════════════════════════════════ */}
          {step===3&&results&&(
            <div>
              {/* Count */}
              <div style={{padding:18,background:sage,borderRadius:14,color:"#fff",marginBottom:10}}>
                <div style={{fontSize:24,fontWeight:700}}>{results.pri.length+results.rest.length} {_("resultsCount")}</div>
              </div>

              {/* Crisis banner — always shown */}
              <div style={{padding:16,background:dangerBg,border:`1px solid ${dangerEdge}`,borderRadius:12,marginBottom:12,lineHeight:1.6}}>
                <div style={{fontSize:15,fontWeight:600,marginBottom:8}}>{_("crisisBanner")}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <a href="tel:211" style={{padding:"10px 20px",background:"#dc2626",color:"#fff",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:15}}>{_("callNow")}</a>
                  <a href="tel:988" style={{padding:"10px 16px",background:"#7c3aed",color:"#fff",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:14}}>{_("call988")}</a>
                  <a href="sms:898211" style={{padding:"10px 20px",background:paper,color:txt,border:`1px solid ${line}`,borderRadius:10,textDecoration:"none",fontWeight:600,fontSize:13}}>{_("textNow")}</a>
                </div>
              </div>

              {/* DV safety notice in results if relevant */}
              {hasDV && (
                <div style={{padding:14,background:dvBg,border:`1px solid ${dvEdge}`,borderRadius:12,marginBottom:12,lineHeight:1.6,fontSize:13}}>
                  <div style={{fontWeight:700,marginBottom:6}}>{_("dvSafety")}</div>
                  <div style={{paddingLeft:8}}>
                    <div style={{marginBottom:3}}>• {_("dvSafe1")}</div>
                    <div style={{marginBottom:3}}>• {_("dvSafe2")}</div>
                    <div style={{marginBottom:3}}>• {_("dvSafe3")}</div>
                  </div>
                  <div style={{marginTop:8,fontWeight:700,color:"#be185d"}}>{_("dvSafe4")}</div>
                </div>
              )}

              {/* Featured: Rochester Hope */}
              <div style={{padding:14,background:warnBg,border:`1px solid ${warnEdge}`,borderRadius:12,marginBottom:12,lineHeight:1.6,fontSize:14}}>
                <div style={{fontWeight:700,marginBottom:4}}>{_("featuredResource")}</div>
                <div>{_("featuredBody")}</div>
              </div>

              {/* Matched programs */}
              {results.pri.length>0&&<>
                <div style={{fontSize:14,fontWeight:700,color:warm,margin:"16px 0 8px"}}>{_("matchedTitle")}</div>
                {results.pri.map(p=><Card key={p.id} p={p} _={_} sage={sage} warm={warm} paper={paper} line={line} soft={soft} txt={txt}/>)}
              </>}

              {/* Other programs */}
              {results.rest.length>0&&<>
                <div style={{fontSize:14,fontWeight:700,color:soft,margin:"20px 0 8px"}}>{_("otherTitle")}</div>
                {results.rest.map(p=><Card key={p.id} p={p} _={_} sage={sage} warm={warm} paper={paper} line={line} soft={soft} txt={txt}/>)}
              </>}

              {/* Community Groups */}
              <div style={{marginTop:20}}>
                <button onClick={()=>setShowCommunity(!showCommunity)} style={{width:"100%",padding:"14px 16px",background:"#f0f7f4",border:`1px solid ${safeEdge}`,borderRadius:showCommunity?"12px 12px 0 0":12,cursor:"pointer",fontSize:15,fontWeight:700,color:sage,textAlign:"left",fontFamily:"inherit",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>🤝 {_("communityTitle")}</span>
                  <span style={{fontSize:18}}>{showCommunity?"−":"+"}</span>
                </button>
                {showCommunity&&(
                  <div style={{background:"#f7faf8",border:`1px solid ${safeEdge}`,borderTop:"none",borderRadius:"0 0 12px 12px",padding:16}}>
                    <div style={{fontSize:12,color:soft,marginBottom:12,fontStyle:"italic"}}>{_("communitySub")}</div>
                    {COMMUNITY.map((g,i)=>(
                      <div key={i} style={{padding:"10px 0",borderBottom:i<COMMUNITY.length-1?`1px solid ${safeEdge}`:"none"}}>
                        <div style={{fontSize:14,fontWeight:700,color:txt}}>{g.n}</div>
                        <div style={{fontSize:13,color:soft,lineHeight:1.5,marginTop:3}}>{g.d}</div>
                        {g.loc&&<div style={{fontSize:12,color:sage,marginTop:3}}>📍 {g.loc}</div>}
                        {g.url&&<a href={g.url} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:sage,fontWeight:600,textDecoration:"none"}}>🔗 Visit →</a>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 211 + findhelp.org overflow */}
              <div style={{padding:18,background:safeBg,border:`1px solid ${safeEdge}`,borderRadius:14,marginTop:16,lineHeight:1.6}}>
                <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>{_("allPrograms")}</div>
                <div style={{fontSize:14,color:soft,marginBottom:12}}>{_("allProgramsSub")}</div>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <a href="tel:211" style={{padding:"10px 18px",background:sage,color:"#fff",borderRadius:10,textDecoration:"none",fontWeight:600,fontSize:14}}>{_("call211")}</a>
                  <a href="https://211lifeline.org/search.php" target="_blank" rel="noopener noreferrer" style={{padding:"10px 18px",background:paper,color:sage,border:`2px solid ${sage}`,borderRadius:10,textDecoration:"none",fontWeight:600,fontSize:14}}>{_("visit211")}</a>
                  <a href="https://www.findhelp.org" target="_blank" rel="noopener noreferrer" style={{padding:"10px 18px",background:paper,color:"#6366f1",border:"2px solid #6366f1",borderRadius:10,textDecoration:"none",fontWeight:600,fontSize:14}}>🔍 {_("visitFindHelp")}</a>
                </div>
              </div>

              <Btn outline full onClick={resetAll} style={{marginTop:16}}>{_("startOver")}</Btn>
            </div>
          )}

          {/* ── FOOTER ── */}
          <div style={{marginTop:30,padding:"0 4px"}}>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:10}}>
              <button onClick={()=>setShowLegal(showLegal==="disc"?null:"disc")} style={{background:"none",border:"none",color:soft,fontSize:12,cursor:"pointer",textDecoration:"underline",fontFamily:"inherit"}}>{_("disclaimer")}</button>
              <button onClick={()=>setShowLegal(showLegal==="priv"?null:"priv")} style={{background:"none",border:"none",color:soft,fontSize:12,cursor:"pointer",textDecoration:"underline",fontFamily:"inherit"}}>{_("privacyTitle")}</button>
            </div>
            {showLegal==="disc"&&(
              <div style={{padding:16,background:paper,border:`1px solid ${line}`,borderRadius:12,marginBottom:12,fontSize:12,lineHeight:1.7,color:soft,whiteSpace:"pre-line"}}>{_("disclaimerText")}</div>
            )}
            {showLegal==="priv"&&(
              <div style={{padding:16,background:paper,border:`1px solid ${line}`,borderRadius:12,marginBottom:12,fontSize:12,lineHeight:1.7,color:soft,whiteSpace:"pre-line"}}>{_("privacyText")}</div>
            )}
            <div style={{textAlign:"center",fontSize:10,color:"#ccc"}}>{_("builtBy")}</div>
          </div>
        </>}
      </div>
    </div>
  );
}

function Card({p,_,sage,warm,paper,line,soft,txt}){
  const [open,setOpen]=useState(false);
  const icon = IC[p.c]||"📋";
  return(
    <div style={{background:paper,border:`1px solid ${line}`,borderRadius:14,marginBottom:8,overflow:"hidden",transition:"all 0.15s"}}>
      <div onClick={()=>setOpen(!open)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:700,color:txt,lineHeight:1.3}}>{icon} {p.n}</div>
          <div style={{fontSize:13,color:soft,marginTop:4,lineHeight:1.5}}>{p.d}</div>
        </div>
        <div style={{fontSize:20,color:soft,flexShrink:0,marginLeft:10,marginTop:2}}>{open?"−":"+"}</div>
      </div>
      {open&&(
        <div style={{padding:"0 16px 16px",borderTop:`1px solid ${line}`}}>
          <div style={{display:"grid",gap:10,marginTop:12,fontSize:14}}>
            {p.ph&&<div><strong>{_("call")}: </strong><a href={"tel:"+(p.ph==="211"?"211":p.ph==="988"?"988":p.ph==="911"?"911":p.ph.replace(/[^0-9]/g,"").slice(0,10))} style={{color:sage,fontWeight:700,fontSize:16}}>{p.ph}</a></div>}
            {p.ad&&<div><strong>{_("address")}: </strong><a href={"https://maps.google.com/?q="+encodeURIComponent(p.ad)} style={{color:sage}} target="_blank" rel="noopener noreferrer">{p.ad}</a></div>}
            {p.hr&&<div><strong>{_("hours")}: </strong>{p.hr}</div>}
            {p.doc&&<div><strong>{_("bring")}: </strong>{p.doc}</div>}
            {p.url&&<div><a href={p.url} target="_blank" rel="noopener noreferrer" style={{color:sage,fontWeight:600}}>🔗 {_("website")}</a></div>}
            {p.aurl&&<div style={{marginTop:4}}><a href={p.aurl} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"10px 20px",background:sage,color:"#fff",borderRadius:10,textDecoration:"none",fontWeight:700,fontSize:14}}>📝 {_("applyOnline")}</a></div>}
            {p.nt&&<div style={{padding:10,background:"#fef9ef",border:"1px solid #f0d9a8",borderRadius:8,marginTop:4,fontWeight:600,color:warm,fontSize:13}}>⚠️ {_("importantNote")}: {p.nt}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
