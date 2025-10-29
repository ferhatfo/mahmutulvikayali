'use client';

import Image from 'next/image';
import Link from 'next/link';
import services from '@/data/services.json';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');
  const { mainServices } = services;

  return (
    <footer className="py-10 md:py-15 pb-0 md:pb-0 bg-gray-100 rounded-t-[30px]">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="pb-[40px] md:pb-[50px] text-center">
          <div className="flex justify-center">
            <Image 
              src="/images/svg/logo.svg" 
              alt={t('logo.alt')} 
              width={200} 
              height={100} 
              className="max-w-[300px] mx-auto"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-[40px] md:pb-[40px] border-t border-[#151515]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Links */}
            <div>
              <h6 className="font-medium pb-[15px] text-[#151515]">{t('sections.about.title')}</h6>
              <ul className="space-y-1">
                <li><FooterLink href="/hakkimizda" text={t('sections.about.links.about')} /></li>
                <li><FooterLink href="/ameliyatlar" text={t('sections.about.links.services')} /></li>
                <li><FooterLink href="/blog" text={t('sections.about.links.blog')} /></li>
                <li><FooterLink href="/iletisim" text={t('sections.about.links.contact')} /></li>
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h6 className="font-medium pb-[15px] text-[#151515]">{t('sections.services.title')}</h6>
              <ul className="space-y-1">
                {mainServices.map((service, index) => (
                  <li key={index}>
                    <Link 
                      href={`/ameliyatlar/${service.slug}`} 
                      className='text-[14px] font-normal hover:text-[#151515] transition-colors'
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies Links */}
            <div>
              <h6 className="font-medium pb-[15px] text-[#151515]">{t('sections.policies.title')}</h6>
              <ul className="space-y-1">
                <li><FooterLink href="" text={t('sections.policies.links.privacy')} /></li>
                <li><FooterLink href="" text={t('sections.policies.links.cookies')} /></li>
                <li><FooterLink href="" text={t('sections.policies.links.dataRequest')} /></li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h6 className="font-medium pb-[15px] text-[#151515]">{t('sections.contact.title')}</h6>
              <p className="text-[14px] pb-[10px]">
                {t('sections.contact.address.line1')}<br/>
                {t('sections.contact.address.line2')}<br/>
                {t('sections.contact.address.line3')}
              </p>
              <div className="flex items-center pb-[20px] gap-3">
                <Link href="https://www.instagram.com/drmahmutulvikayali/" target="_blank" rel="noopener noreferrer" aria-label={t('socialMedia.instagram')}>
                  <FaInstagram size={24} color="#151515" />
                </Link>
              </div>
           
              <p className="py-[5px] text-[14px]">
                <Link href="tel:+902423220212">{t('sections.contact.phones.office')}</Link>
              </p>
              <p className="text-[14px]">
                <Link href="tel:+905550520212">{t('sections.contact.phones.mobile')}</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-[40px] mt-[40px] md:mt-[0] border-t border-[#151515]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[13px]">{t('bottom.copyright')}</p>
            <p className="text-[13px]">{t('bottom.createdBy')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable FooterLink component
const FooterLink = ({ href, text }) => (
  <Link 
    href={href} 
    className="text-[14px] font-normal hover:text-[#151515] transition-colors"
  >
    {text}
  </Link>
);

export default Footer;