/**
 * Lightweight i18n engine (no external deps).
 * Usage:
 *   const { t, lang, setLang } = useI18n();
 *   t('hero.greeting')          → "Bonjour, je suis"
 *   t('about.formation', true)  → returns the array as-is
 */

import { createContext, useContext, useState, useCallback } from "react";
import fr from "./locales/fr.json";
import en from "./locales/en.json";

const LOCALES = { fr, en };
const SUPPORTED = ["fr", "en"];

const I18nContext = createContext(null);

/** Resolve a dot-path key inside a nested object */
function resolve(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

export function I18nProvider({ children, defaultLang = "fr" }) {
  const [lang, setLangState] = useState(() => {
    const saved = typeof localStorage !== "undefined" && localStorage.getItem("portfolio_lang");
    return SUPPORTED.includes(saved) ? saved : defaultLang;
  });

  const setLang = useCallback((l) => {
    if (!SUPPORTED.includes(l)) return;
    setLangState(l);
    if (typeof localStorage !== "undefined") localStorage.setItem("portfolio_lang", l);
  }, []);

  const t = useCallback(
    (key) => {
      const result = resolve(LOCALES[lang], key);
      if (result === null) {
        // Fallback to fr
        const fallback = resolve(LOCALES["fr"], key);
        return fallback !== null ? fallback : key;
      }
      return result;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ t, lang, setLang, supportedLangs: SUPPORTED }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
