'use client';
import { useEffect } from 'react';
import { useLanguage } from '../hook/useLanguage';

export default function LocaleSync({ locale }: { locale: string }) {
  const { setLang } = useLanguage();
  useEffect(() => {
    if (locale === 'en' || locale === 'vi') setLang(locale === 'en' ? 'en-US' : 'vi-VN');
  }, [locale, setLang]);
  return null;
}
