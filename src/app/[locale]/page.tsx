import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Home from '../../page/Home';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!['en', 'vi'].includes(locale)) return {};
  return { title: locale === 'vi' ? 'Trang chu' : 'Home', alternates: { canonical: `/${locale}` } };
}

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!['en', 'vi'].includes(locale)) notFound();
  return <Home />;
}
