// i18nContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import locales from "../locales";
import { initLang, getLang, setLang, mess } from "../Utils/uti";

const LanguageContext = createContext<any>({
  lang: "vi-VN",
  setLang: () => {},
  t: {},
  translate: (id) => id,
});

export const LanguageProvider = ({ children }) => {
  const pathname = usePathname();
  const [lang, setLangState] = useState(() =>
    pathname?.startsWith("/en") ? "en-US" : pathname?.startsWith("/vi") ? "vi-VN" : "vi-VN",
  );

  useEffect(() => {
    initLang();
    const pathLang = pathname?.startsWith("/en") ? "en-US" : pathname?.startsWith("/vi") ? "vi-VN" : undefined;
    setLangState(pathLang || getLang());
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = lang === 'vi-VN' ? 'vi' : 'en';
  }, [lang]);

  const changeLang = (newLang) => {
    setLang(newLang);
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: changeLang,
        t: locales[lang],
        translate: mess,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
