export type Locale = 'en' | 'vi';

export function normalizeLocale(value?: string | null): Locale {
  return value?.toLowerCase().startsWith('vi') ? 'vi' : 'en';
}

export function localeFromPath(pathname?: string | null): Locale | null {
  const segment = pathname?.split('/').filter(Boolean)[0];
  return segment === 'en' || segment === 'vi' ? segment : null;
}

export function localizedPath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const cleanPath = path.replace(/^\/(en|vi)(?=\/|$)/, '') || '/';
  return cleanPath === '/' ? `/${locale}` : `/${locale}${cleanPath}`;
}
