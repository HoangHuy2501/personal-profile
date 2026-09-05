'use client';
import { LanguageProvider } from '../hook/useLanguage';
import { ThemeProvider } from '../hook/useLightDark';
import AntdThemeWrapper from '../hook/AntdThemeWrapper';
import Header from '../components/Header';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider><ThemeProvider><AntdThemeWrapper><Header /><main className="pt-20">{children}</main><footer className="border-t border-slate-200/70 dark:border-slate-700/60"><div className="page-wrap !py-6 flex flex-col sm:flex-row gap-2 justify-between text-sm muted"><span>© {new Date().getFullYear()} Nguyen Hoang Huy</span><span>Built with React · Crafted in Da Nang</span></div></footer></AntdThemeWrapper></ThemeProvider></LanguageProvider>;
}
