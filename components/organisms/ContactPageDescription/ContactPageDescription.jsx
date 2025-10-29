import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

export default function ContactPageDescription(){
    const { t } = useTranslation('contact');
    
    return(
        <section className="py-[40px]">
            <div className="container mx-auto px-4 flex">
                <div className='w-full md:w-1/3'>
                    <h6 className="text-[#151515] pb-1">{t('contactInfo.phone')}</h6>
                    <p className="pb-[3px] text-gray-700 leading-relaxed text-sm">
                        {t('contactInfo.phoneNumbers.mobile')}
                    </p>
                    <p className="pb-[15px] text-gray-700 leading-relaxed text-sm">
                        {t('contactInfo.phoneNumbers.office')}
                    </p>

                    <h6 className="text-[#151515] pb-1">{t('contactInfo.email')}</h6>
                    <p className="pb-[15px] text-gray-700 leading-relaxed text-sm">
                        {t('contactInfo.emailAddress')}
                    </p>

                    <h6 className="text-[#151515] pb-1">{t('contactInfo.address')}</h6>
                    <p className="pb-[15px] text-gray-700 leading-relaxed text-sm">
                        {t('contactInfo.addressLines.0')}<br/>
                        {t('contactInfo.addressLines.1')}<br/>
                        {t('contactInfo.addressLines.2')}<br/>
                    </p>

                    <h6 className="text-[#151515] pb-1">{t('contactInfo.socialMedia')}</h6>
                    <div className="flex items-center pt-[5px] pb-[15px] gap-5">
                        <Link href="https://www.instagram.com/drmahmutulvikayali/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={24} color="#151515" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}