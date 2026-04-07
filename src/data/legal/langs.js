// LEGAL SECTION LANGUAGES (20 — federal LEP standard + refugee priority)
// Used by the Legal Library surface. The main HelpFinder directory uses
// its own 8-language LANGS because the directory data is 8-language.
// Two scopes, two pickers, both honest.

export const LEGAL_LANGS = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "zh", label: "中文" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ko", label: "한국어" },
  { code: "tl", label: "Tagalog" },
  { code: "ar", label: "العربية" },
  { code: "ru", label: "Русский" },
  { code: "ht", label: "Kreyòl Ayisyen" },
  { code: "pt", label: "Português" },
  { code: "fr", label: "Français" },
  { code: "hi", label: "हिन्दी" },
  { code: "ur", label: "اردو" },
  { code: "fa", label: "فارسی" },
  { code: "ps", label: "پښتو" },
  { code: "uk", label: "Українська" },
  { code: "ne", label: "नेपाली" },
  { code: "my", label: "မြန်မာ" },
  { code: "so", label: "Soomaali" },
  { code: "sw", label: "Kiswahili" },
];

export const RTL_LEGAL_LANGS = new Set(["ar", "ur", "fa", "ps"]);
