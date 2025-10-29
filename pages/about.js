import AboutPageDescription from '@/components/organisms/AboutPageDescription';
import MultiPageHeader from '@/components/organisms/MultiPageHeader';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <>
      <Head>
        <title>{t('metadata.title')}</title>
        <meta name="description" content={t('metadata.description')} />
      </Head>
      <MultiPageHeader
        subtitle={t('header.subtitle')}
        title={t('header.title')}
        isImage={true}
        imgUrl="/images/mahmut-ulvi-kayali-kimdir.webp"
      />
      <section className="pt-[50px] pb-[20px] md:pb-0">
        <div className="container mx-auto px-4">
          <p className="md:max-w-[45%] pb-[15px] text-gray-700 leading-relaxed text-sm">
            <strong>{t('doctorInfo.specialty')}:</strong> {t('doctorInfo.specialtyValue')}<br/>
            <strong>{t('doctorInfo.academicTitle')}:</strong> {t('doctorInfo.academicTitleValue')}<br/>
            <strong>{t('doctorInfo.languages')}:</strong> {t('doctorInfo.languagesValue')}<br/>
            <strong>{t('doctorInfo.qualifications')}:</strong><br/>
            • {t('doctorInfo.qualificationsList.ebopras')}<br/>
            • {t('doctorInfo.qualificationsList.writtenExam')}<br/>
            • {t('doctorInfo.qualificationsList.microsurgery')}<br/>
            <strong>{t('doctorInfo.education')}:</strong> <br/>
            • {t('doctorInfo.educationList.residency')}<br/>
            • {t('doctorInfo.educationList.medicalSchool')}<br/>
            <strong>{t('doctorInfo.workExperience')}:</strong><br/>
            • {t('doctorInfo.workExperienceList.current')}<br/>
            • {t('doctorInfo.workExperienceList.medstar')}<br/>
            • {t('doctorInfo.workExperienceList.medicalPark')}<br/>
            • {t('doctorInfo.workExperienceList.stateService')}<br/>
            • {t('doctorInfo.workExperienceList.demiderm')}<br/>
            • {t('doctorInfo.workExperienceList.military')}<br/>
            • {t('doctorInfo.workExperienceList.training')}<br/>
            <strong>{t('doctorInfo.memberships')}:</strong> <br/>
            • {t('doctorInfo.membershipsList.ebopras')}<br/>
            • {t('doctorInfo.membershipsList.turkish')}<br/>
            • {t('doctorInfo.membershipsList.microsurgery')}<br/>
            • {t('doctorInfo.membershipsList.tema')}<br/>
          </p>
        </div>
      </section>
      <AboutPageDescription/>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['about', 'navbar', 'common', 'footer'])),
    },
  };
}