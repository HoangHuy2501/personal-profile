// src/utils/i18nUtil.js
import locales from "../locales";
import { saveLanguage,getLanguage } from "./authUtils";

const DEFAULT_LANG = "en-US";
const STORAGE_KEY = "app_lang";

let currentLang = DEFAULT_LANG;

/**
 * Init language (gọi khi app start)
 */
export const initLang = () => {
  const savedLang = getLanguage();
  if (savedLang && locales[savedLang]) {
    currentLang = savedLang;
  }
};

/**
 * Set current language
 */
export const setLang = (lang) => {
  if (!locales[lang]) return;
  currentLang = lang;
  saveLanguage(lang);
};

/**
 * Get current language
 */
export const getLang = () => currentLang;

/**
 * Translate message
 * mess("role.title")
 * mess("role.table.permissionCount", { count: 3 })
 */
export const mess = (id, params = {}) => {
  const keys = id.split(".");
  let result = locales[currentLang];

  for (const key of keys) {
    result = result?.[key];
    if (result == null) return id;
  }

  if (typeof result === "string") {
    return result.replace(/\{(\w+)\}/g, (_, p) => params[p] ?? `{${p}}`);
  }

  return result;
};
