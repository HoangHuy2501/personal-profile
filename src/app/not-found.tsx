'use client';

import { useLanguage } from '../hook/useLanguage';

export default function NotFound() {
  const { t } = useLanguage();
  return <main className="page-wrap"><p className="eyebrow">404</p><h1 className="section-title mt-3">{t.ui.notFound.title}</h1><a className="inline-flex mt-6 rounded-full bg-[#0f9f8c] px-5 py-3 text-white" href="/">{t.ui.notFound.backHome}</a></main>;
}
