import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enGB from "../../content/locales/en-GB.json";
import zhCN from "../../content/locales/zh-CN.json";

// Supported languages. To add a new language:
//   1. Create a new JSON file in content/locales/ (copy en-GB.json and translate it)
//   2. Add one line to this list, e.g. { code: "ja-JP", label: "日本語" }
//   3. Import the file and add it to the resources object below
export const languages = [
    { code: "zh-CN", label: "简体中文" },
    { code: "en-GB", label: "English (UK)" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "zh-CN";

// Detect the visitor's language from the browser (client only).
// Priority: remembered choice (localStorage) → browser preference.
// There is no built-in default fallback — if nothing matches, the site
// simply keeps whichever language it was rendered in.
// NOTE: We intentionally do NOT detect during SSR — Node >= 21 exposes a
// global `navigator` with the server's locale, which would override the
// default for everyone. Client-side detection runs after hydration instead.
export function detectLanguage(): LanguageCode | undefined {
    if (typeof window === "undefined") return undefined;
    const stored = window.localStorage?.getItem(storageKey);
    if (stored && languages.some((l) => l.code === stored)) return stored as LanguageCode;
    const candidates = navigator.languages ?? [navigator.language];
    for (const candidate of candidates) {
        const match = languages.find((l) => candidate.toLowerCase() === l.code.toLowerCase() || candidate.toLowerCase().startsWith(l.code.split("-")[0].toLowerCase() + "-") || candidate.toLowerCase() === l.code.split("-")[0].toLowerCase());
        if (match) return match.code;
    }
    return undefined;
}

const storageKey = "ssn-language";

// Remember the visitor's language choice for their next visit.
export function rememberLanguage(code: LanguageCode) {
    try {
        window.localStorage?.setItem(storageKey, code);
    } catch {
        // Storage may be unavailable (private mode); ignore.
    }
}

const resources = {
    "en-GB": { translation: enGB },
    "zh-CN": { translation: zhCN },
} as const;

if (!i18n.isInitialized) {
    void i18n.use(initReactI18next).init({
        resources,
        lng: defaultLanguage,
        fallbackLng: defaultLanguage,
        // Apply the language synchronously so SSR renders the right locale.
        initAsync: false,
        react: { useSuspense: false },
        interpolation: { escapeValue: false },
    });
}

// After hydration on the client, switch to the visitor's preferred language
// (remembered choice first, then browser preference). No default fallback.
if (typeof window !== "undefined") {
    const detected = detectLanguage();
    if (detected && detected !== i18n.language) {
        void i18n.changeLanguage(detected);
    }
}

export default i18n;
