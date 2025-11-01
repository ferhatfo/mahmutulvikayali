// components/organisms/ServiceSideBar.jsx
'use client';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Slug mapping'i buraya taşıyalım
const surgerySlugMapping = {
  'burun-estetigi': 'rhinoplasty',
  'ameliyatsiz-burun-estetigi-antalya': 'non-surgical-rhinoplasty-antalya',
  'primer-rinoplasti-antalya': 'primary-rhinoplasty-antalya',
  'sekonder-ve-tersiyer-rinoplasti-antalya': 'secondary-and-tertiary-rhinoplasty-antalya',
  'antalya-deviasyon-ve-konka-tedavisi': 'antalya-deviation-and-concha-treatment',

  'antalya-meme-estetigi': 'breast-surgery-in-turkey',
  'meme-asimetrisi-antalya': 'breast-asymmetry-antalya',
  'meme-buyutme-antalya': 'breast-augmentation-antalya',
  'meme-buyutme-ve-diklestirme-antalya': 'breast-augmentation-and-lift-turkey',
  'protezsiz-meme-diklestirme-antalya': 'breast-lift-without-implants-antalya',
  'meme-kucultme-antalya': 'breast-reduction-antalya',
  'jinekomasti-erkek-meme-kucultme-antalya': 'gynecomastia-surgery-antalya',

  'tickle-liposuction': 'tickle-liposuction',
  'tickle-liposuction-sureci': 'tickle-liposuction-process',
  'tickle-liposuction-nasil-yapilir': 'how-is-tickle-liposuction-performed',

  'yuz-estetigi': 'facial-aesthetics',
  'derin-plan-yuz-germe-antalya': 'deep-plane-facelift-turkey',
  'endoskopik-kas-kaldirma-antalya': 'endoscopic-brow-lift-turkey',
  'temporal-lift-sakak-germe-antalya': 'temporal-lift-surgery-antalya',
  'orta-yuz-kaldirma-antalya': 'subperiosteal-midface-lift-turkey',
  'goz-kapagi-estetigi-antalya': 'eyelid-surgery-antalya',
  'yuz-yag-enjeksiyonu-antalya': 'facial-fat-transfer-injections',
  'antalyada-kepce-kulak-estetigi-otoplasti': 'prominent-ears-surgery-antalya',
  'medpor-cene-implantlari-antalya': 'medpor-chin-implants-turkey',

  'vucut-estetigi': 'body-aesthetics',
  'liposuction-yag-alma-antalya': 'liposuction-fat-removal-antalya',
  'karin-germe-ameliyati-antalya': 'tummy-tuck-surgery-antalya',
  'yag-enjeksiyonlari-antalya': 'fat-injections-antalya',
  'mini-karin-germe-antalya': 'mini-tummy-tuck-antalya',
  'cevresel-karin-germe-antalya': 'circumferential-tummy-tuck-antalya',
  'kol-germe-ameliyati-antalya': 'arm-lift-surgery-antalya',
  'uyluk-germe-ameliyati-antalya': 'thigh-lift-surgery-antalya',
  'kalca-kaldirma-protezi-antalya': 'buttock-lift-implants-antalya',
  'ayak-ve-ayak-bilegi-estetigi-antalya': 'foot-and-ankle-aesthetics-antalya',
  'diz-kapagi-estetigi-antalya': 'knee-aesthetics-antalya',

  // İngilizce -> Türkçe (ters mapping)
  'rhinoplasty': 'burun-estetigi',
  'non-surgical-rhinoplasty-antalya': 'ameliyatsiz-burun-estetigi-antalya',
  'primary-rhinoplasty-antalya': 'primer-rinoplasti-antalya',
  'secondary-and-tertiary-rhinoplasty-antalya': 'sekonder-ve-tersiyer-rinoplasti-antalya',
  'antalya-deviation-and-concha-treatment': 'antalya-deviasyon-ve-konka-tedavisi',

  'breast-surgery-in-turkey': 'antalya-meme-estetigi',
  'breast-asymmetry-antalya': 'meme-asimetrisi-antalya',
  'breast-augmentation-antalya': 'meme-buyutme-antalya',
  'breast-augmentation-and-lift-turkey': 'meme-buyutme-ve-diklestirme-antalya',
  'breast-lift-without-implants-antalya': 'protezsiz-meme-diklestirme-antalya',
  'breast-reduction-antalya': 'meme-kucultme-antalya',
  'gynecomastia-surgery-antalya': 'jinekomasti-erkek-meme-kucultme-antalya',

  'tickle-liposuction': 'tickle-liposuction',
  'tickle-liposuction-process': 'tickle-liposuction-sureci',
  'how-is-tickle-liposuction-performed': 'tickle-liposuction-nasil-yapilir',

  'facial-aesthetics': 'yuz-estetigi',
  'deep-plane-facelift-turkey': 'derin-plan-yuz-germe-antalya',
  'endoscopic-brow-lift-turkey': 'endoskopik-kas-kaldirma-antalya',
  'temporal-lift-surgery-antalya': 'temporal-lift-sakak-germe-antalya',
  'subperiosteal-midface-lift-turkey': 'orta-yuz-kaldirma-antalya',
  'eyelid-surgery-antalya': 'goz-kapagi-estetigi-antalya',
  'facial-fat-transfer-injections': 'yuz-yag-enjeksiyonu-antalya',
  'prominent-ears-surgery-antalya': 'antalyada-kepce-kulak-estetigi-otoplasti',
  'medpor-chin-implants-turkey': 'medpor-cene-implantlari-antalya',

  'body-aesthetics': 'vucut-estetigi',
  'liposuction-fat-removal-antalya': 'liposuction-yag-alma-antalya',
  'tummy-tuck-surgery-antalya': 'karin-germe-ameliyati-antalya',
  'fat-injections-antalya': 'yag-enjeksiyonlari-antalya',
  'mini-tummy-tuck-antalya': 'mini-karin-germe-antalya',
  'circumferential-tummy-tuck-antalya': 'cevresel-karin-germe-antalya',
  'arm-lift-surgery-antalya': 'kol-germe-ameliyati-antalya',
  'thigh-lift-surgery-antalya': 'uyluk-germe-ameliyati-antalya',
  'buttock-lift-implants-antalya': 'kalca-kaldirma-protezi-antalya',
  'foot-and-ankle-aesthetics-antalya': 'ayak-ve-ayak-bilegi-estetigi-antalya',
  'knee-aesthetics-antalya': 'diz-kapagi-estetigi-antalya'
};

export default function ServiceSidebar({ services, currentSlug, parentSlug }) {
  const { t } = useTranslation('surgeries');
  const router = useRouter();
  const currentLocale = router.locale;
  const [expandedServices, setExpandedServices] = useState({});

  // Slug çeviri fonksiyonu - BASİTLEŞTİRİLDİ
  const translateSlug = (slug, targetLang) => {
    if (targetLang === currentLocale) return slug;
    
    if (currentLocale === 'tr' && targetLang === 'en') {
      // Türkçe'den İngilizce'ye çeviri
      return surgerySlugMapping[slug] || slug;
    } else if (currentLocale === 'en' && targetLang === 'tr') {
      // İngilizce'den Türkçe'ye çeviri
      const reverseMapping = {};
      Object.entries(surgerySlugMapping).forEach(([key, value]) => {
        reverseMapping[value] = key;
      });
      return reverseMapping[slug] || slug;
    }
    
    return slug;
  };

  // URL oluşturma fonksiyonu - YENİ MANTIK
  const getServiceUrl = (slug) => {
    const basePath = currentLocale === 'tr' ? '/ameliyatlar' : '/surgeries';
    
    // Mevcut dildeki slug'ı doğrudan kullan
    console.log(`🔗 URL Oluşturma: ${slug} (${currentLocale}) -> ${basePath}/${slug}`);
    
    return `${basePath}/${slug}`;
  };

  // Aktif servis kontrolü - BASİTLEŞTİRİLDİ
  const isServiceActive = (service) => {
    // Doğrudan slug karşılaştırması
    return service.slug === currentSlug || 
           service.slug === parentSlug ||
           service.subServices?.some(sub => sub.slug === currentSlug);
  };

  // Servis genişletme/daraltma fonksiyonu
  const toggleService = (serviceSlug) => {
    setExpandedServices(prev => ({
      ...prev,
      [serviceSlug]: !prev[serviceSlug]
    }));
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
                    const isSubActive = subService.slug === currentSlug;
                    
                    return (
                      <Link
                        key={index}
                        href={getServiceUrl(subService.slug)}
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