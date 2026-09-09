"use client";

import React, { useEffect, useMemo, useState } from "react";
import wf from "../assets/image/wf.png";
import { useLanguage } from "../hook/useLanguage";
import ButtonLightDark from "./ButtonLightDark";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ButtonLanguage from "./ButtonLanguage";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  localeFromPath,
  localizedPath,
  normalizeLocale,
  type Locale,
} from "../lib/locale";

function Header() {
  const { t } = useLanguage();
  const copy = t.ui.header;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(
    () => localeFromPath(pathname) ?? "en",
  );
  useEffect(() => {
    const pathLocale = localeFromPath(pathname);
    if (pathLocale) setLocale(pathLocale);
    else if (typeof window !== "undefined")
      setLocale(normalizeLocale(window.localStorage.getItem("language")));
  }, [pathname]);
  const data = useMemo(
    () => [
      [t.header.menu.home, "/home"],
      [t.header.menu.about, "/about"],
      [t.header.menu.project, "/project"],
      [t.header.menu.contact, "/contact"],
    ],
    [t],
  );
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  const isActive = (url: string) =>
    pathname === localizedPath(url, locale) ||
    (url === "/home" && pathname === localizedPath("/", locale));

  return (
    <header className="site-header fixed top-3 sm:top-4 inset-x-3 sm:inset-x-4 z-50">
      <div className="header-shell max-w-[1274px] mx-auto px-3 sm:px-5">
        <div className="header-bar h-[68px] sm:h-[72px] flex items-center justify-between gap-3">
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ rotateX: -3, rotateY: 4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Link
              href={localizedPath("/", locale)}
              className="brand-link flex items-center gap-3"
              onClick={() => setOpen(false)}
              aria-label={t.header.namedev}
            >
              <span className="brand-avatar">
                <img
                  src={wf.src}
                  alt={copy.imageAlt}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover"
                />
                <i aria-hidden="true" />
              </span>
              <span className="hidden sm:block">
                <strong className="block text-sm font-semibold tracking-tight text-white">
                  {t.header.namedev}
                </strong>
                <small className="block mt-0.5 text-[10px] uppercase tracking-[.18em] text-slate-400">
                  {copy.developer}
                </small>
              </span>
            </Link>
          </motion.div>
          <nav
            className="nav-pill hidden md:flex items-center gap-1"
            aria-label={copy.mainNavigation}
          >
            {data.map(([title, url]) => (
              <Link
                key={url}
                href={localizedPath(url, locale)}
                aria-current={isActive(url) ? "page" : undefined}
                className={`header-link px-4 py-2 text-sm font-medium transition-colors ${isActive(url) ? "active" : ""}`}
              >
                {title}
              </Link>
            ))}
          </nav>
          <div className="header-actions hidden md:flex items-center gap-2">
            <ButtonLightDark />
            <ButtonLanguage />
            <a
              className="header-contact"
              href="mailto:huy04.developer@gmail.com"
              aria-label={copy.email}
            >
              <ArrowUpRight size={16} />
            </a>
          </div>
          <button
            className="menu-toggle md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? copy.closeMenu : copy.openMenu}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-menu"
              className="mobile-panel md:hidden"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <nav
                className="flex flex-col gap-1"
                aria-label={copy.mobileNavigation}
              >
                {data.map(([title, url], index) => (
                  <motion.div
                    key={url}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={localizedPath(url, locale)}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(url) ? "page" : undefined}
                      className={`mobile-link ${isActive(url) ? "active" : ""}`}
                    >
                      {title}
                      <ArrowUpRight size={15} />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mobile-actions">
                <ButtonLightDark />
                <ButtonLanguage />
                <a
                  className="mobile-email"
                  href="mailto:huy04.developer@gmail.com"
                >
                  {t.ui.home.connect} <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
