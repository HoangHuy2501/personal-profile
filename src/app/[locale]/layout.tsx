import LocaleSync from '../LocaleSync';

/** Renders locale content alongside any active modal from the @modal parallel slot. */
export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <><LocaleSync locale={locale} />{children}{modal}</>;
}
