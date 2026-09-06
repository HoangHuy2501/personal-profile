"use client";
import { ThemeContext } from "../hook/useLightDark";
import { useContext } from "react";
import { useLanguage } from "../hook/useLanguage";
export default function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);
  const { t } = useLanguage();
  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label={dark ? t.header.light : t.header.dark}
      className="text-sm px-3 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-text-light dark:text-text-dark hover:border-[#0f9f8c]"
    >
      {dark ? t.header.light + "☀️" : t.header.dark + "🌙"}
    </button>
  );
}
