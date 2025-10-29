'use client';
import Image from 'next/image';
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function AboutSection() {
  const { t } = useTranslation('aboutSection');
  const router = useRouter();

  return (
    <section>
      <div className="bg-[#151515] p-10 w-full max-w-[1140px] mx-auto my-10 md:my-20 flex flex-col md:flex-row items-center gap-12" style={{ borderRadius: '30px' }}>
        {/* Text Area */}
        <div className="text-white md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">{t('aboutSection.title', 'Biz Kimiz?')}</h2>
          <p className="text-md leading-relaxed mb-8">
            {t('aboutSection.description', 'Op. Dr. Mahmut Ulvi Kayalı, Plastik, Rekonstrüktif ve Estetik Cerrahi alanında ulusal ve uluslararası deneyime sahip bir uzmandır. EBOPRAS yeterlilik diplomasına sahip olan Dr. Kayalı, estetik cerrahi ve rekonstrüktif operasyonlarda modern ve güvenilir yöntemler uygulamaktadır. 2008 yılından bu yana çeşitli özel ve kamu kurumlarında görev yapan Dr. Kayalı, 2014\'ten itibaren kendi kliniğinde hastalarına hizmet vermektedir.')}
          </p>
          <Link href="/hakkimizda" locale={router.locale}>
            <Button
              text={t('aboutSection.buttonText', 'Hakkımızda')}
              backgroundColor="#ffffff"
              textColor="#151515"
              icon={<FaArrowRight size={14} />}
            />
          </Link>
        </div>

        {/* Image Area */}
        <div className="md:w-1/2 relative flex justify-start">
          <Image
            src="/images/mahmutulvikayali.webp"
            alt={t('aboutSection.title', 'Biz Kimiz?')}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            style={{ borderRadius: '30px' }}
          />
        </div>
      </div>
    </section>
  );
}