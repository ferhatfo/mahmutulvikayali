import Link from 'next/link';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';
import Image from "next/image";
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { surgeryPath, DEFAULT_LOCALE } from '@/utils/siteConfig';

export default function ServicesPage() {
  const { t } = useTranslation('services');
  const { locale } = useRouter();
  const currentLocale = locale || DEFAULT_LOCALE;

  // Servisleri dil dosyasından al
  const mainServices = t('mainServices', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{t('common:procedureDetails')}</title>
        <meta name="description" content={t('common:procedureText')} />
      </Head>

      <MultiPageHeader
        subtitle={t('common:procedureDetails')}
        title={t('common:procedureText')}
        isImage={false}
      />
     
      <div className="container mx-auto p-6 py-10 md:py-15 grid grid-cols-1 md:grid-cols-1 gap-6">
        {mainServices.map((service) => {
          const slug = service.slug;
          return (
            <div key={slug} className='flex flex-col md:flex-row bg-gray-100 rounded-xl overflow-hidden'>
              {/* Görsel sütunu sabit oranda; yüksekliği satırın içeriği belirler,
                  böylece sağdaki bağlantılar karttan taşıp kırpılmaz. */}
              <div className='relative w-full md:w-2/5 lg:w-1/3 shrink-0 h-56 md:h-auto md:min-h-full'>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className='flex flex-1 min-w-0 justify-center items-center p-5 md:p-8'>
                <div className="w-full min-w-0">
                  <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={surgeryPath(currentLocale, slug)}
                      className="bg-white hover:bg-gray-200 px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-sm text-center border border-gray-300"
                    >
                      <span className="font-medium text-gray-800">
                        {service.title}
                      </span>
                    </Link>

                    {service.subServices.map((subService, index) => (
                      <Link
                        key={index}
                        href={surgeryPath(currentLocale, subService.slug)}
                        className="bg-white hover:bg-gray-200 px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-sm text-center border border-gray-300"
                      >
                        <span className="font-medium text-gray-800">
                          {subService.title}
                        </span>
                      </Link>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'navbar', 'surgeries', 'services', 'footer'])),
    },
  };
}