import { ThemeContext } from "../hook/useLightDark.jsx";
import { useContext, useEffect, useState } from "react";
import { saveLightDark, getLightDark,removeLightDark } from '../Utils/authUtils.js';
export default function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-2 text-xl py-1 rounded bg-slate-200 dark:bg-slate-700"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
