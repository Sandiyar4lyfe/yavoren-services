import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "zh" | "ms";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("yavoren-language");
      if (stored === "en" || stored === "zh" || stored === "ms") return stored;
    } catch {}
    return "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("yavoren-language", language);
    } catch {}
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
