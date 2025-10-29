// utils/i18nUtils.js
import path from 'path';

// Sadece server-side fonksiyonları - fs kullanıyor
export function getTranslation(locale, namespace) {
  // Bu fonksiyon sadece getStaticProps/getServerSideProps'da kullanılmalı
  try {
    // Dinamik import ile dil dosyalarını yükle
    const translation = require(`../public/locales/${locale}/${namespace}.json`);
    return translation;
  } catch (error) {
    console.warn(`Translation not found for ${locale}/${namespace}:`, error);
    return {};
  }
}

// Client-side için safe versiyon
export function getTranslationClient(locale, namespace) {
  if (typeof window === 'undefined') {
    // Server-side: normal fonksiyonu kullan
    return getTranslation(locale, namespace);
  } else {
    // Client-side: boş obje döndür veya farklı bir yaklaşım kullan
    console.warn('getTranslationClient: fs not available on client');
    return {};
  }
}

export function getAvailableLocales() {
  return ['en', 'tr']; // Manuel olarak tanımla, fs kullanma
}

// Alternatif: next-i18next config kullan
export const i18nConfig = {
  locales: ['en', 'tr'],
  defaultLocale: 'tr',
};