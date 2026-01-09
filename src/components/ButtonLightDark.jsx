import { ThemeContext } from "../hook/useLightDark.jsx";
import { useContext, useEffect, useState } from "react";
import { useLanguage } from "../hook/useLanguage.jsx";
export default function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);
  const { t } = useLanguage();
  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-full text-base px-2 md:w-auto text-xl py-1 rounded bg-slate-200 dark:bg-slate-700 text-text-light dark:text-text-dark"
    >
      {dark ? t.header.light+"☀️" : t.header.dark+"🌙"}
    </button>
  );
}
