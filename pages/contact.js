import ContactForm from '@/components/organisms/ContactForm';
import ContactPageDescription from '@/components/organisms/ContactPageDescription';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Contact() {
  const { t } = useTranslation('contact');
  
  return (
    <>
      <Head>
        <title>{t('metadata.title')}</title>
        <meta name="description" content={t('metadata.description')} />
      </Head>
      <MultiPageHeader
        subtitle={t('header.subtitle')}
        title={t('header.title')}
        isImage={false}
        isMap={true}
      />
      <ContactPageDescription/>
      <ContactForm/>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['contact', 'common', 'navbar', 'footer'])),
    },
  };
}