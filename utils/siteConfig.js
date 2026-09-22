// utils/siteConfig.js
// Kanonik adres üretimi için tek kaynak. Vercel'de NEXT_PUBLIC_SITE_URL ile ezilebilir.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mahmutulvikayali.com'
).replace(/\/$/, '');

export const DEFAULT_LOCALE = 'tr';

// Ameliyat sayfalarının dile göre taban yolu (ServiceSideBar ile aynı mantık)
export function surgeryBasePath(locale) {
  return locale === 'tr' ? '/ameliyatlar' : '/surgeries';
}

// next/link için yerel yol; locale prefix'ini Next kendisi ekler
export function surgeryPath(locale, slug) {
  return `${surgeryBasePath(locale)}/${slug}`;
}

// canonical / hreflang için tam adres
export function absoluteUrl(locale, path) {
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

export function surgeryUrl(locale, slug) {
  return absoluteUrl(locale, surgeryPath(locale, slug));
}
