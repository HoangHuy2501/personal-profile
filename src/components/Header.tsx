'use client';
import React, { useEffect, useMemo, useState } from 'react';
import wf from '../assets/image/wf.png';
import { useLanguage } from '../hook/useLanguage';
import ButtonLightDark from './ButtonLightDark';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ButtonLanguage from './ButtonLanguage';
import { Menu, X } from 'lucide-react';
import { localeFromPath, localizedPath, normalizeLocale, type Locale } from '../lib/locale';

function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(() => localeFromPath(pathname) ?? 'en');
  useEffect(() => {
    const pathLocale = localeFromPath(pathname);
    if (pathLocale) setLocale(pathLocale);
    else if (typeof window !== 'undefined') setLocale(normalizeLocale(window.localStorage.getItem('language')));
  }, [pathname]);
  const data = useMemo(() => [
    [t.header.menu.home, '/home'], [t.header.menu.about, '/about'], [t.header.menu.project, '/project'], [t.header.menu.contact, '/contact']
  ], [t]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  return <header className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/70 dark:border-slate-700/70 bg-[#f5f7f8]/90 dark:bg-[#0b1726]/90 backdrop-blur-xl">
    <div className="max-w-[1180px] mx-auto h-20 px-4 sm:px-6 flex items-center justify-between">
      <Link href={localizedPath('/', locale)} className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label={t.header.namedev}>
        <img src={wf.src} alt="Nguyen Hoang Huy" className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#0f9f8c]/30" />
        <span className="hidden sm:block font-semibold tracking-tight text-text-light dark:text-text-dark">{t.header.namedev}</span>
      </Link>
      <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">{data.map(([title, url]) => <Link key={url} href={localizedPath(url, locale)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${pathname === localizedPath(url, locale) || (url === '/home' && pathname === localizedPath('/', locale)) ? 'bg-[#0f9f8c] text-white' : 'text-slate-600 dark:text-slate-300 hover:text-[#0f9f8c]'}`}>{title}</Link>)}</nav>
      <div className="hidden md:flex items-center gap-2"><ButtonLightDark /><ButtonLanguage /></div>
      <button className="md:hidden p-2 rounded-lg text-text-light dark:text-text-dark" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={22} /> : <Menu size={22} />}</button>
    </div>
    {open && <div id="mobile-menu" className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-[#f5f7f8] dark:bg-[#0b1726] px-4 py-5"><nav className="flex flex-col gap-2" aria-label="Mobile navigation">{data.map(([title, url]) => <Link key={url} href={localizedPath(url, locale)} onClick={() => setOpen(false)} className={`px-4 py-3 rounded-xl text-base ${pathname === localizedPath(url, locale) || (url === '/home' && pathname === localizedPath('/', locale)) ? 'bg-[#0f9f8c] text-white' : 'text-text-light dark:text-text-dark'}`}>{title}</Link>)}</nav><div className="flex items-center gap-3 px-4 pt-4"><ButtonLightDark /><ButtonLanguage /></div></div>}
  </header>;
}
export default Header;
