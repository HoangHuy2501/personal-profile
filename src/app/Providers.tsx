'use client';

import { LanguageProvider } from '../hook/useLanguage';
import { ThemeProvider } from '../hook/useLightDark';
import AntdThemeWrapper from '../hook/AntdThemeWrapper';
import Header from '../components/Header';
import ScrollProgress from '../components/ScrollProgress';
import dynamic from 'next/dynamic';
import VisitorTracker from '../components/visitor/VisitorTracker';
import { Toaster } from 'sonner';

const TechBackground = dynamic(() => import('../components/TechBackground'), {
  ssr: false,
  loading: () => <div className="tech-background-fallback" aria-hidden="true" />,
});

export default function Providers({ children, trackingEnabled }: { children: React.ReactNode; trackingEnabled: boolean }) {
  return <LanguageProvider><ThemeProvider><AntdThemeWrapper><TechBackground /><ScrollProgress /><Header /><VisitorTracker enabled={trackingEnabled} /><Toaster position="top-right" richColors closeButton duration={3800} /><main className="pt-24">{children}</main><footer className="site-footer"><div className="page-wrap !py-12 sm:!py-16 flex flex-col sm:flex-row gap-5 justify-between text-sm muted"><div><a href="mailto:huy04.developer@gmail.com" className="footer-email">huy04.developer@gmail.com</a><p className="mt-4">(c) {new Date().getFullYear()} Nguyen Hoang Huy</p></div><p>Built with Next.js - Crafted in Da Nang</p></div></footer></AntdThemeWrapper></ThemeProvider></LanguageProvider>;
}
