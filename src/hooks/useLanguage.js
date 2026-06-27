import { useState, useEffect, useCallback } from "react";
import { getInitialLanguage, saveLanguage, translations, LANGUAGES } from "../i18n";

export { LANGUAGES };

export function useLanguage() {
  const [language, setLanguageState] = useState(getInitialLanguage);
  const t = translations[language];
  const isRtl = t.dir === "rtl";

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    saveLanguage(lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = t.dir;
  }, [language, t.dir]);

  return { language, setLanguage, t, isRtl, dir: t.dir };
}
