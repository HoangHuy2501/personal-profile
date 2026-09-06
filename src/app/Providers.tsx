'use client';

import { LanguageProvider } from '../hook/useLanguage';
import { ThemeProvider } from '../hook/useLightDark';
import AntdThemeWrapper from '../hook/AntdThemeWrapper';
import Header from '../components/Header';
import ScrollProgress from '../components/ScrollProgress';
import dynamic from 'next/dynamic';

const TechBackground = dynamic(() => import('../components/TechBackground'), {
  ssr: false,
  loading: () => <div className="tech-background-fallback" aria-hidden="true" />,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider><ThemeProvider><AntdThemeWrapper><TechBackground /><ScrollProgress /><Header /><main className="pt-24">{children}</main><footer className="site-footer"><div className="page-wrap !py-12 sm:!py-16 flex flex-col sm:flex-row gap-5 justify-between text-sm muted"><div><a href="mailto:huy04.developer@gmail.com" className="footer-email">huy04.developer@gmail.com</a><p className="mt-4">(c) {new Date().getFullYear()} Nguyen Hoang Huy</p></div><p>Built with Next.js - Crafted in Da Nang</p></div></footer></AntdThemeWrapper></ThemeProvider></LanguageProvider>;
}
