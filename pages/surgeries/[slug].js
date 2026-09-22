// surgeries/[slug].js
import { slugify } from "@/utils/slugify";
import Head from "next/head";
import MultiPageHeader from "@/components/organisms/MultiPageHeader";
import ServiceSidebar from "@/components/organisms/ServiceSideBar";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getTranslation, getAvailableLocales } from '@/utils/i18nUtils';
import { surgerySlugMapping } from '@/utils/surgerySlugMapping';
import { absoluteUrl, surgeryBasePath, surgeryPath, surgeryUrl, DEFAULT_LOCALE } from '@/utils/siteConfig';

// Alt hizmetin URL slug'ı: JSON'daki "slug" alanı tek doğru kaynaktır.
// (Eski davranış başlıktan üretiyordu; başlık değişince URL kırılıyordu.)
const subServiceSlug = (subService) => subService.slug || slugify(subService.title);

// surgeries/[slug].js - getStaticPaths güncellemesi
export async function getStaticPaths() {
  const locales = getAvailableLocales();
  const paths = [];


  locales.forEach((locale) => {
    const translations = getTranslation(locale, 'services');
    const mainServices = translations.mainServices || [];


    mainServices.forEach((service) => {
      // Main service path - TÜM DİLLER İÇİN SLUG'LARI EKLE
      const mainSlug = service.slug;
      paths.push({
        params: { slug: mainSlug },
        locale,
      });

      // Ayrıca İngilizce slug'ı da ekle (eğer mapping varsa)
      if (locale === 'tr' && surgerySlugMapping[mainSlug]) {
        const englishSlug = surgerySlugMapping[mainSlug];
        paths.push({
          params: { slug: englishSlug },
          locale: 'en',
        });
      }

      // Sub-service paths
      (service.subServices || []).forEach((subService) => {
        const subSlug = subServiceSlug(subService);
        paths.push({
          params: { slug: subSlug },
          locale,
        });

        // Ayrıca İngilizce sub-service slug'larını da ekle
        if (locale === 'tr' && surgerySlugMapping[subSlug]) {
          const englishSubSlug = surgerySlugMapping[subSlug];
          paths.push({
            params: { slug: englishSubSlug },
            locale: 'en',
          });
        }
      });
    });
  });

  console.log(`Total paths generated: ${paths.length}`);

  return { 
    paths, 
    fallback: 'blocking'
  };
}

// hreflang için: aynı hizmetin diğer dillerdeki slug'ları.
// Diller aynı sırayı paylaştığı için index üzerinden eşleştiriyoruz,
// bulunamazsa slug mapping'e düşüyoruz.
function getAlternateSlugs({ mainIndex, subIndex, currentLocale, currentSlug }) {
  const alternates = {};

  getAvailableLocales().forEach((locale) => {
    const mainServices = getTranslation(locale, 'services').mainServices || [];
    const service = mainServices[mainIndex];
    if (!service) return;

    if (subIndex === null) {
      if (service.slug) alternates[locale] = service.slug;
      return;
    }

    const sub = (service.subServices || [])[subIndex];
    if (sub) alternates[locale] = subServiceSlug(sub);
  });

  alternates[currentLocale] = currentSlug;

  getAvailableLocales().forEach((locale) => {
    if (!alternates[locale]) {
      const mapped = surgerySlugMapping[currentSlug];
      if (mapped) alternates[locale] = mapped;
    }
  });

  return alternates;
}

export async function getStaticProps({ params, locale }) {
  
  // Servisleri dil dosyasından al
  const translations = getTranslation(locale, 'services');
  const mainServices = translations.mainServices || [];
  
  // ÖNEMLİ: Slug mapping uygula
  let targetSlug = params.slug;
  
  // Eğer slug mapping'de varsa, doğru slug'a çevir
  if (surgerySlugMapping[params.slug]) {
    targetSlug = surgerySlugMapping[params.slug];
  }
  
  // Ters mapping de kontrol et (İngilizce -> Türkçe)
  const reverseMapping = {};
  Object.entries(surgerySlugMapping).forEach(([key, value]) => {
    reverseMapping[value] = key;
  });
  
  if (reverseMapping[params.slug]) {
    targetSlug = reverseMapping[params.slug];
  }

  // Find main service - ÖNCE ORJİNAL SLUG İLE ARA
  let mainIndex = mainServices.findIndex((s) => s.slug === targetSlug);

  // Eğer bulunamazsa, translated slug ile ara
  if (mainIndex === -1) {
    mainIndex = mainServices.findIndex((s) => s.slug === params.slug);
  }

  let mainService = mainIndex === -1 ? null : mainServices[mainIndex];

  // Find sub-service
  let subService = null;
  let subIndex = null;
  let parentServiceData = null;
  
  mainServices.forEach((service, serviceIndex) => {
    const foundIndex = (service.subServices || []).findIndex(sub => {
      const subSlug = subServiceSlug(sub);
      return subSlug === targetSlug || subSlug === params.slug;
    });
    if (foundIndex !== -1) {
      subService = service.subServices[foundIndex];
      subIndex = foundIndex;
      mainIndex = serviceIndex;
      parentServiceData = {
        title: service.title,
        slug: service.slug,
        image: service.image,
      };
    }
  });

  // Eğer sayfa bulunamazsa 404 döndür
  if (!mainService && !subService) {
    console.log('❌ Service not found, returning 404 for:', params.slug);
    console.log('Available main service slugs:', mainServices.map(s => s.slug));
    console.log('Available sub-services:', mainServices.flatMap(s => 
      (s.subServices || []).map(sub => subServiceSlug(sub))
    ));
    return {
      notFound: true,
    };
  }


  const serializedMainService = mainService ? {
    title: mainService.title,
    description: mainService.description,
    image: mainService.image,
    slug: mainService.slug,
    seo: mainService.seo || null,
    subServices: (mainService.subServices || []).map(sub => ({
      title: sub.title,
      description: sub.description,
      content: sub.content,
      slug: subServiceSlug(sub),
    }))
  } : null;

  // ÖNEMLİ: subService'e seo alanını ekleyin
  const serializedSubService = subService ? {
    title: subService.title,
    slug: subServiceSlug(subService),
    description: subService.description,
    content: subService.content,
    seo: subService.seo || null, // SEO alanını burada ekliyoruz
    parentService: parentServiceData
  } : null;

  const serializedAllServices = mainServices.map(service => ({
    title: service.title,
    slug: service.slug,
    subServices: (service.subServices || []).map(sub => ({
      title: sub.title,
      description: sub.description,
      slug: subServiceSlug(sub)
    }))
  }));

  const currentSlug = serializedSubService ? serializedSubService.slug : serializedMainService.slug;

  return {
    props: {
      mainService: serializedMainService,
      subService: serializedSubService,
      allServices: serializedAllServices,
      locale: locale || DEFAULT_LOCALE,
      alternateSlugs: getAlternateSlugs({
        mainIndex,
        subIndex: serializedSubService ? subIndex : null,
        currentLocale: locale || DEFAULT_LOCALE,
        currentSlug,
      }),
      // 'footer' de client'a gönderilmeli: Footer her sayfada mount oluyor,
      // eksik olunca sunucu/istemci çıktısı ayrışıp hydration hatası veriyordu.
      ...(await serverSideTranslations(locale, ['common', 'navbar', 'surgeries', 'footer'])),
    },
    revalidate: 3600,
  };
}

export default function ServiceDetailPage({ mainService, subService, allServices, locale, alternateSlugs }) {
  const { t } = useTranslation('surgeries');

  if (!mainService && !subService) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('serviceNotFound')}</h1>
          <Link href="/ameliyatlar" className="text-blue-600 hover:text-blue-800">
            {t('cta.viewAllProcedures')}
          </Link>
        </div>
      </div>
    );
  }

  const currentService = subService || mainService;
  const parentService = subService ? subService.parentService : mainService;
  const currentLocale = locale || DEFAULT_LOCALE;
  const alternates = alternateSlugs || {};

  const seo = currentService.seo || {};
  const pageTitle = seo.title || currentService.title;
  const pageDescription = seo.description || currentService.description;

  const currentSlug = alternates[currentLocale] || currentService.slug || slugify(currentService.title);
  const canonicalUrl = surgeryUrl(currentLocale, currentSlug);
  const surgeriesIndexPath = surgeryBasePath(currentLocale);

  // Breadcrumb: Anasayfa > Ameliyatlar > (Ana hizmet) > Bu sayfa
  const breadcrumbItems = [
    { name: t('breadcrumb.home'), href: '/', url: absoluteUrl(currentLocale, '/') },
    {
      name: t('common:procedureDetails'),
      href: surgeriesIndexPath,
      url: absoluteUrl(currentLocale, surgeriesIndexPath),
    },
  ];

  if (subService && parentService?.slug) {
    breadcrumbItems.push({
      name: parentService.title,
      href: surgeryPath(currentLocale, parentService.slug),
      url: surgeryUrl(currentLocale, parentService.slug),
    });
  }

  breadcrumbItems.push({
    name: currentService.title,
    href: surgeryPath(currentLocale, currentSlug),
    url: canonicalUrl,
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={currentLocale === 'tr' ? 'tr_TR' : 'en_US'} />

        {/* Her dil kendi adresini canonical gösterir */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Diller arası hreflang bağlantıları */}
        {Object.entries(alternates).map(([altLocale, altSlug]) => (
          <link
            key={altLocale}
            rel="alternate"
            hrefLang={altLocale}
            href={surgeryUrl(altLocale, altSlug)}
          />
        ))}
        {alternates[DEFAULT_LOCALE] && (
          <link
            rel="alternate"
            hrefLang="x-default"
            href={surgeryUrl(DEFAULT_LOCALE, alternates[DEFAULT_LOCALE])}
          />
        )}

        {seo.keywords && <meta name="keywords" content={seo.keywords} />}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <MultiPageHeader
        subtitle={subService ? parentService.title : t('common:procedureDetails')}
        title={currentService.title}
        isImage={false}
      />

      <div className="container mx-auto p-2 md:p-8">
        <nav aria-label="breadcrumb" className="mb-4 px-2 md:px-0">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return (
                <li key={item.url} className="flex items-center gap-x-2">
                  {isLast ? (
                    <span className="text-gray-700 font-medium" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link href={item.href} className="hover:text-gray-900 hover:underline">
                        {item.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <ServiceSidebar 
              services={allServices} 
              currentSlug={currentSlug}
              parentSlug={parentService?.slug}
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/4">
            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              {/* Service Header */}
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  {currentService.title}
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {currentService.description}
                </p>
              </div>

              {/* Content */}
              {subService && subService.content && (
                <div className="prose max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={createMarkup(subService.content)}
                  />
                </div>
              )}

              {/* Main Service Sub-services Grid */}
              {mainService && !subService && (
                <div className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mainService.subServices.map((sub, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-colors">
                        <h4 className="font-semibold text-lg mb-3 text-gray-900">{sub.title}</h4>
                        <p className="text-gray-600 mb-4 leading-relaxed">{sub.description}</p>
                        <Link 
                          href={surgeryPath(currentLocale, sub.slug)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          {t('common:details')}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
