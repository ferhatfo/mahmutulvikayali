import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';
import BlogSection from '@/components/organisms/BlogSection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function BlogsPage() {
  const { t } = useTranslation('blog');

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
      />
       
      <BlogSection/>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'navbar', 'blog', 'footer'])),
    },
  };
}