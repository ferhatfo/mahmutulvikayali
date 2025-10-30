// components/organisms/ServiceSideBar.jsx
'use client';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Slug mapping'i buraya taşıyalım
const surgerySlugMapping = {
  // Türkçe -> İngilizce
  'burun-estetigi': 'rhinoplasty',
  'ameliyatsiz-burun-estetigi-antalya': 'non-surgical-rhinoplasty-antalya',
  'primer-rinoplasti-antalya': 'primary-rhinoplasty-antalya',
  'sekonder-ve-tersiyer-rinoplasti-antalya': 'secondary-and-tertiary-rhinoplasty-antalya',
  'antalya-deviasyon-ve-konka-tedavisi': 'antalya-septum-deviation-and-concha-treatment',
  'meme-estetigi-antalya': 'breast-surgery-turkey',
  'meme-asimetrisi-antalya': 'breast-asymmetry-antalya',
  'meme-buyutme-antalya': 'breast-augmentation-antalya',
  'meme-buyutme-ve-diklestirme-antalya': 'breast-augmentation-and-lift-turkey',
  'meme-diklestirme': 'breast-lift',
  'meme-kucultme': 'breast-reduction',
  'jinekomasti': 'gynecomastia',
  'tickle-liposuction': 'tickle-liposuction',
  'tickle-liposuction-sureci': 'tickle-liposuction-process',
  'nasil-yapilir': 'how-is-it-performed',
  'yuz-estetigi': 'facial-aesthetics',
  'derin-plan-yuz-germe': 'deep-plane-facelift',
  'endoskopik-kas-kaldirma': 'endoscopic-brow-lift',
  'temporal-lift': 'temporal-lift',
  'orta-yuz-kaldirma': 'midface-lift',
  'goz-kapagi-estetigi': 'eyelid-surgery',
  'yag-enjeksiyonlari': 'fat-injections',
  'kepce-kulak': 'prominent-ears',
  'cene-implantlari': 'chin-implants',
  'vucut-estetigi': 'body-aesthetics',
  'liposuction-yag-alma-antalya': 'liposuction-fat-removal-antalya',
  'karin-germe-ameliyati-antalya': 'tummy-tuck-surgery-antalya',
  'yag-enjeksiyonlari-antalya': 'fat-injections-antalya',
  'mini-karin-germe-antalya': 'mini-tummy-tuck-antalya',
  'cevresel-karin-germe-antalya': 'circumferential-tummy-tuck-antalya',
  'kol-germe-ameliyati-antalya': 'arm-lift-surgery-antalya',
  'uyluk-germe-ameliyati-antalya': 'thigh-lift-surgery-antalya',
  'kalca-kaldirma-protezi-antalya': 'buttock-lift-and-implants-antalya',
  'ayak-ayak-bilegi-estetigi-antalya': 'foot-and-ankle-aesthetics-antalya',
  'diz-kapagi-estetigi-antalya': 'knee-aesthetics-antalya',
  
  // İngilizce -> Türkçe
  'rhinoplasty': 'burun-estetigi',
  'non-surgical-rhinoplasty': 'ameliyatsiz-burun-estetigi',
  'primary-rhinoplasty': 'primer-rinoplasti',
  'secondary-and-tertiary-rhinoplasty': 'sekonder-ve-tersiyer-rinoplasti',
  'septum-deviation-and-concha-treatment': 'deviasyon-ve-konka-tedavisi',
  'breast-surgery-turkey': 'meme-estetigi-antalya',
  'breast-asymmetry-antalya': 'meme-asimetrisi-antalya',
  'breast-augmentation-antalya': 'meme-buyutme-antalya',
  'breast-augmentation-and-lift-turkey': 'meme-buyutme-ve-diklestirme-antalya',
  'breast-lift': 'meme-diklestirme',
  'breast-reduction': 'meme-kucultme',
  'gynecomastia': 'jinekomasti',
  'tickle-liposuction-process': 'tickle-liposuction-sureci',
  'how-is-it-performed': 'nasil-yapilir',
  'facial-aesthetics': 'yuz-estetigi',
  'deep-plane-facelift': 'derin-plan-yuz-germe',
  'endoscopic-brow-lift': 'endoskopik-kas-kaldirma',
  'midface-lift': 'orta-yuz-kaldirma',
  'eyelid-surgery': 'goz-kapagi-estetigi',
  'fat-injections': 'yag-enjeksiyonlari',
  'prominent-ears': 'kepce-kulak',
  'chin-implants': 'cene-implantlari',
  'body-aesthetics': 'vucut-estetigi',
  'liposuction-fat-removal-antalya': 'liposuction-yag-alma-antalya',
  'tummy-tuck-surgery-antalya': 'karin-germe-ameliyati-antalya',
  'fat-injections-antalya': 'yag-enjeksiyonlari-antalya',
  'mini-tummy-tuck-antalya': 'mini-karin-germe-antalya',
  'circumferential-tummy-tuck-antalya': 'cevresel-karin-germe-antalya',
  'arm-lift-surgery-antalya': 'kol-germe-ameliyati-antalya',
  'thigh-lift-surgery-antalya': 'uyluk-germe-ameliyati-antalya',
  'buttock-lift-and-implants-antalya': 'kalca-kaldirma-protezi-antalya',
  'foot-and-ankle-aesthetics-antalya': 'ayak-ayak-bilegi-estetigi-antalya',
  'knee-aesthetics-antalya': 'diz-kapagi-estetigi-antalya'
};

export default function ServiceSidebar({ services, currentSlug, parentSlug }) {
  const { t } = useTranslation('surgeries');
  const router = useRouter();
  const currentLocale = router.locale;
  const [expandedServices, setExpandedServices] = useState({});

  // Slug çeviri fonksiyonu
  const translateSlug = (slug, fromLang, toLang) => {
    if (fromLang === toLang) return slug;
    
    if (fromLang === 'tr' && toLang === 'en') {
      return surgerySlugMapping[slug] || slug;
    } else if (fromLang === 'en' && toLang === 'tr') {
      const reverseMapping = {};
      Object.entries(surgerySlugMapping).forEach(([key, value]) => {
        reverseMapping[value] = key;
      });
      return reverseMapping[slug] || slug;
    }
    
    return slug;
  };

  // URL oluşturma fonksiyonu - GÜNCELLENDİ
  const getServiceUrl = (slug, isSubService = false) => {
    const basePath = currentLocale === 'tr' ? '/ameliyatlar' : '/surgeries';
    
    // Mevcut slug'ı çevir
    let targetSlug = slug;
    
    if (currentLocale === 'en') {
      // Eğer İngilizce dilindeysek, Türkçe slug'ı İngilizce'ye çevir
      targetSlug = translateSlug(slug, 'tr', 'en');
    } else if (currentLocale === 'tr') {
      // Eğer Türkçe dilindeysek, İngilizce slug'ı Türkçe'ye çevir
      targetSlug = translateSlug(slug, 'en', 'tr');
    }
    
    console.log(`🔗 URL Oluşturma: ${slug} -> ${targetSlug} (${currentLocale})`);
    
    return `${basePath}/${targetSlug}`;
  };

  // Mevcut slug'ı çevirerek kontrol et
  const getCurrentTranslatedSlug = () => {
    if (currentLocale === 'en') {
      return translateSlug(currentSlug, 'tr', 'en');
    }
    return currentSlug;
  };

  // Servis genişletme/daraltma fonksiyonu
  const toggleService = (serviceSlug) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceSlug]: !prev[serviceSlug]
    }));
  };

  // Aktif servis kontrolü - GÜNCELLENDİ
  const isServiceActive = (service) => {
    const translatedServiceSlug = currentLocale === 'en' 
      ? translateSlug(service.slug, 'tr', 'en')
      : service.slug;
    
    const translatedCurrentSlug = getCurrentTranslatedSlug();
    
    return translatedServiceSlug === translatedCurrentSlug || 
           service.slug === parentSlug ||
           service.subServices?.some(sub => {
             const translatedSubSlug = currentLocale === 'en'
               ? translateSlug(sub.slug, 'tr', 'en')
               : sub.slug;
             return translatedSubSlug === translatedCurrentSlug;
           });
  };

  // Otomatik genişletme
  const shouldExpand = (service) => {
    return expandedServices[service.slug] || isServiceActive(service);
  };

  // İlk yüklemede aktif servisleri genişlet
  useEffect(() => {
    const initiallyExpanded = {};
    services.forEach(service => {
      if (isServiceActive(service)) {
        initiallyExpanded[service.slug] = true;
      }
    });
    setExpandedServices(initiallyExpanded);
  }, [services, currentSlug, currentLocale]);

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 border-b pb-3">
        {t('sidebar.title')}
      </h3>
      
      <div className="space-y-2">
        {services.map((service) => {
          const isActive = isServiceActive(service);
          const isExpanded = shouldExpand(service);
          const hasSubServices = service.subServices && service.subServices.length > 0;

          return (
            <div key={service.slug} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Ana Servis Linki */}
              <div className={`flex items-center justify-between p-4 ${
                isActive ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
              } transition-colors`}>
                <Link
                  href={getServiceUrl(service.slug)}
                  locale={currentLocale}
                  className={`flex-1 font-medium ${
                    isActive ? 'text-blue-700' : 'text-gray-700 hover:text-blue-600'
                  } transition-colors`}
                >
                  {service.title}
                </Link>
                
                {hasSubServices && (
                  <button
                    onClick={() => toggleService(service.slug)}
                    className="ml-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Alt Servisler */}
              {hasSubServices && isExpanded && (
                <div className="bg-gray-100 border-t border-gray-200">
                  {service.subServices.map((subService, index) => {
                    const isSubActive = currentLocale === 'en'
                      ? translateSlug(subService.slug, 'tr', 'en') === getCurrentTranslatedSlug()
                      : subService.slug === currentSlug;
                    
                    return (
                      <Link
                        key={index}
                        href={getServiceUrl(subService.slug, true)}
                        locale={currentLocale}
                        className={`block py-3 px-6 border-b border-gray-200 last:border-b-0 ${
                          isSubActive 
                            ? 'bg-blue-100 text-blue-700 font-medium' 
                            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                        } transition-colors text-sm`}
                      >
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></span>
                          {subService.title}
                        </div>
                        {subService.description && (
                          <p className="text-xs text-gray-500 mt-1 ml-5 line-clamp-2">
                            {subService.description}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* İletişim CTA */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-gray-900 mb-2">
          {t('sidebar.consultation.title')}
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          {t('sidebar.consultation.description')}
        </p>
        <Link
          href="/iletisim"
          locale={currentLocale}
          className="inline-block w-full bg-black hover:bg-gray-800 text-white text-center py-2 px-4 rounded-lg transition-colors font-medium text-sm"
        >
          {t('sidebar.consultation.button')}
        </Link>
      </div>
    </div>
  );
}