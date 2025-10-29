// surgeries/[slug].js
import Image from "next/image";
import { slugify } from "@/utils/slugify";
import Head from "next/head";
import MultiPageHeader from "@/components/organisms/MultiPageHeader";
import ServiceSidebar from "@/components/organisms/ServiceSideBar";
import Link from "next/link";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getTranslation, getAvailableLocales } from '@/utils/i18nUtils';
import { surgerySlugMapping, translateSurgerySlug } from '@/utils/surgerySlugMapping';

export async function getStaticPaths() {
  const locales = getAvailableLocales();
  const paths = [];

  console.log('Generating static paths for locales:', locales);

  locales.forEach((locale) => {
    const translations = getTranslation(locale, 'services');
    const mainServices = translations.mainServices || [];

    console.log(`Processing ${locale} with ${mainServices.length} main services`);

    mainServices.forEach((service) => {
      // Main service path
      paths.push({
        params: { slug: service.slug },
        locale,
      });

      console.log(`Added main service path: /${locale}/ameliyatlar/${service.slug}`);

      // Sub-service paths
      (service.subServices || []).forEach((subService) => {
        const subSlug = slugify(subService.title);
        paths.push({
          params: { slug: subSlug },
          locale,
        });
        console.log(`Added sub-service path: /${locale}/ameliyatlar/${subSlug}`);
      });
    });
  });

  console.log(`Total paths generated: ${paths.length}`);

  return { 
    paths, 
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params, locale }) {
  console.log('🔍 Generating props for surgery:', params.slug, 'in locale:', locale);
  
  // Servisleri dil dosyasından al
  const translations = getTranslation(locale, 'services');
  const mainServices = translations.mainServices || [];
  
  // ÖNEMLİ: Slug mapping uygula
  let targetSlug = params.slug;
  
  // Eğer slug mapping'de varsa, doğru slug'a çevir
  if (surgerySlugMapping[params.slug]) {
    targetSlug = surgerySlugMapping[params.slug];
    console.log(`🔄 Slug mapped: ${params.slug} -> ${targetSlug}`);
  }
  
  // Ters mapping de kontrol et (İngilizce -> Türkçe)
  const reverseMapping = {};
  Object.entries(surgerySlugMapping).forEach(([key, value]) => {
    reverseMapping[value] = key;
  });
  
  if (reverseMapping[params.slug]) {
    targetSlug = reverseMapping[params.slug];
    console.log(`🔄 Reverse slug mapped: ${params.slug} -> ${targetSlug}`);
  }

  console.log(`🎯 Searching for service with slug: ${targetSlug} in ${locale}`);
  
  // Find main service - ÖNCE ORJİNAL SLUG İLE ARA
  let mainService = mainServices.find((s) => s.slug === targetSlug);
  
  // Eğer bulunamazsa, translated slug ile ara
  if (!mainService) {
    mainService = mainServices.find((s) => s.slug === params.slug);
    if (mainService) {
      console.log(`✅ Found main service with original slug: ${params.slug}`);
    }
  }
  
  // Find sub-service
  let subService = null;
  let parentServiceData = null;
  
  mainServices.forEach(service => {
    const found = (service.subServices || []).find(sub => {
      const subSlug = slugify(sub.title);
      return subSlug === targetSlug || subSlug === params.slug;
    });
    if (found) {
      subService = found;
      parentServiceData = {
        title: service.title,
        slug: service.slug,
        image: service.image,
      };
      console.log(`✅ Found sub-service: ${found.title}`);
    }
  });

  // Eğer sayfa bulunamazsa 404 döndür
  if (!mainService && !subService) {
    console.log('❌ Service not found, returning 404 for:', params.slug);
    console.log('Available main service slugs:', mainServices.map(s => s.slug));
    console.log('Available sub-services:', mainServices.flatMap(s => 
      (s.subServices || []).map(sub => slugify(sub.title))
    ));
    return {
      notFound: true,
    };
  }

  console.log('✅ Found service:', mainService ? 'main' : 'sub', mainService?.title || subService?.title);

  const serializedMainService = mainService ? {
    title: mainService.title,
    description: mainService.description,
    image: mainService.image,
    slug: mainService.slug,
    subServices: (mainService.subServices || []).map(sub => ({
      title: sub.title,
      description: sub.description,
      content: sub.content,
    }))
  } : null;

  const serializedSubService = subService ? {
    title: subService.title,
    description: subService.description,
    content: subService.content,
    parentService: parentServiceData
  } : null;

  const serializedAllServices = mainServices.map(service => ({
    title: service.title,
    slug: service.slug,
    subServices: (service.subServices || []).map(sub => ({
      title: sub.title,
      description: sub.description,
      slug: slugify(sub.title)
    }))
  }));

  return {
    props: {
      mainService: serializedMainService,
      subService: serializedSubService,
      allServices: serializedAllServices,
      ...(await serverSideTranslations(locale, ['common', 'navbar', 'surgeries'])),
    },
    revalidate: 3600,
  };
}

// Kalan kod aynı...
export default function ServiceDetailPage({ mainService, subService, allServices }) {
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

  const seoTitle = currentService.title;
  const seoDescription = currentService.description;

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <>
      <Head>
        <title>{seoTitle} - {t('doctorName')}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="website" />
      </Head>

      <MultiPageHeader
        subtitle={subService ? parentService.title : t('common:procedureDetails')}
        title={currentService.title}
        isImage={false}
      />

      <div className="container mx-auto p-2 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <ServiceSidebar 
              services={allServices} 
              currentSlug={currentService.slug || slugify(currentService.title)}
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
                <p className="text-lg text-gray-700 leading-relaxed">
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
                          href={`/ameliyatlar/${slugify(sub.title)}`}
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