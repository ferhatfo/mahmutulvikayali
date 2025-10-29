import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

export default function ContactForm() {
  const { t } = useTranslation('contact');

  return (
    <section className="py-0 md:py-15">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-5/12 bg-[#151515] rounded-[30px] flex flex-col justify-center items-center text-left px-6 py-10">
              <div>
                <h6 className="text-white text-sm md:text-base mb-4">{t('contactForm.title')}</h6>
                <h2 className="text-white text-2xl md:text-4xl">
                  {t('contactForm.subtitle')}
                </h2>
              </div>
            </div>
            <div className="md:w-7/12 p-3 md:p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      name="text"
                      required
                      className="peer w-full border-b border-gray-400 py-2 text-sm focus:outline-none focus:border-[#151515]"
                      placeholder={t('contactForm.form.name')}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="phone"
                      required
                      className="peer w-full border-b border-gray-400 py-2 text-sm focus:outline-none focus:border-[#151515] color-[#151515]"
                      placeholder={t('contactForm.form.phone')}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="mail"
                      required
                      className="peer w-full border-b border-gray-400 py-2 text-sm focus:outline-none focus:border-[#151515]"
                      placeholder={t('contactForm.form.email')}
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      required
                      className="peer w-full border-b border-gray-400 py-2 text-sm focus:outline-none focus:border-[#151515]"
                      placeholder={t('contactForm.form.subject')}
                    />
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="peer w-full border-b border-gray-400 py-2 text-sm focus:outline-none focus:border-[#151515]"
                    placeholder={t('contactForm.form.message')}
                  ></textarea>
                </div>
                <div className="text-center md:text-right">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#151515] text-white px-6 py-2 rounded-full hover:bg-[#151515] transition"
                  >
                    <span>{t('contactForm.form.submit')}</span>
                    <FaArrowRight size={14} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}