import { useTranslation } from 'next-i18next';

export default function AboutPageDescription() {
  const { t } = useTranslation('about');

  return (
    <section className="py-[0] md:py-[80px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">{t('publications.title')}</h2>
            <p className="pb-[15px] text-gray-700 leading-relaxed text-sm">
              {t('publications.list.pub1')}<br/>
              {t('publications.list.pub2')}<br/>
              {t('publications.list.pub3')}<br/>
              {t('publications.list.pub4')}<br/>
              {t('publications.list.pub5')}<br/>
              {t('publications.list.pub6')}<br/>
              {t('publications.list.pub7')}<br/>
              {t('publications.list.pub8')}<br/>
              {t('publications.list.pub9')}
            </p>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-2">{t('presentations.title')}</h2>
            <p className="pb-[15px] text-gray-700 leading-relaxed text-sm">
              {t('presentations.list.section1')}<br/>
              {t('presentations.list.presentation1')}<br/>
              {t('presentations.list.presentation2')}<br/>
              {t('presentations.list.presentation3')}<br/>
              {t('presentations.list.presentation4')}<br/>
              {t('presentations.list.presentation5')}<br/>
              {t('presentations.list.presentation6')}<br/>
              {t('presentations.list.section2')}<br/>
              {t('presentations.list.presentation7')}<br/>
              {t('presentations.list.presentation8')}<br/>
              {t('presentations.list.presentation9')}<br/>
              {t('presentations.list.presentation10')}<br/>
              {t('presentations.list.section3')}<br/>
              {t('presentations.list.presentation11')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about', 'navbar', 'common'])),
    },
  };
}