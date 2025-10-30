import Link from 'next/link';
import { slugify } from '@/utils/slugify';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';
import Image from "next/image";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function ServicesPage() {
  const { t } = useTranslation('services');

  // Servisleri dil dosyasından al
  const mainServices = t('mainServices', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{t('metadata.title')}</title>
        <meta name="description" content={t('metadata.description')} />
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
            <div key={slug} className='block md:flex bg-gray-100 rounded-xl overflow-hidden'>
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={300}
                className="rounded-xl w-full md:w-auto h-64 md:h-auto object-cover"
              />
              <div className='flex justify-center items-center p-5 md:p-10 w-full'>
                <div className="w-full">
                  <h2 className="text-xl font-bold mb-2">{service.title}</h2>
                  <p className="text-gray-600 line-clamp-3 mb-4">{service.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    <Link
                      href={`/ameliyatlar/${slug}`}
                      className="bg-white hover:bg-gray-200 px-3 py-3 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-sm text-center border border-gray-300"
                    >
                      <span className="font-medium text-gray-800">
                        {service.title}
                      </span>
                    </Link>

                    {service.subServices.map((subService, index) => (
                      <Link
                        key={index}
                        href={`/ameliyatlar/${slugify(subService.title)}`}
                        className="bg-white hover:bg-gray-200 px-3 py-3 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-sm text-center border border-gray-300"
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