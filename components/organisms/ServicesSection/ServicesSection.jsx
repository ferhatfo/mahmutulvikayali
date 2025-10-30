"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import { slugify } from '@/utils/slugify';
import Link from 'next/link';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);
  const serviceRefs = useRef([]);
  const observerRef = useRef(null);

  const { t } = useTranslation('services');
  
  // Translation'dan tüm verileri al
  const sectionData = t('sectionData', { returnObjects: true });
  const mainServices = t('mainServices', { returnObjects: true });

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const index = serviceRefs.current.findIndex(
              (ref) => ref && ref === entry.target
            );
            
            if (index !== -1) {
              setActiveService(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -60% 0px',
        threshold: [0.1, 0.3, 0.5]
      }
    );

    serviceRefs.current.forEach((ref) => {
      if (ref) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [mainServices]);

  const setServiceRef = (index) => (el) => {
    serviceRefs.current[index] = el;
  };

  const scrollToService = (index) => {
    if (serviceRefs.current[index]) {
      const element = serviceRefs.current[index];
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-10 md:py-20 bg-gray-100 w-full"
      style={{ borderRadius: '30px' }}
    >
      {/* Başlık ve Açıklama - Her zaman göster */}
      <div className="w-full text-center mb-12 px-6 block lg:hidden">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{sectionData.title}</h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          {sectionData.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        {/* Sol Menü - Sadece Desktop'ta */}
        <div className="hidden lg:block lg:w-1/3 sticky top-20 h-screen">
          <div className="pl-12 pr-8 pt-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{sectionData.title}</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
              {sectionData.description}
            </p>
            <nav className="space-y-2">
              {mainServices.map((service, index) => (
                <button
                  key={service.slug}
                  onClick={() => scrollToService(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                    activeService === index
                      ? "bg-white shadow-md text-gray-900 font-semibold border-l-4 border-gray-900"
                      : "text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900"
                  }`}
                >
                  <span className="text-base font-medium">{service.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Sağ İçerik - Mobilde tam genişlik, Desktop'ta 2/3 */}
        <div className="w-full lg:w-2/3 space-y-6 md:space-y-8 px-6 lg:pr-8 lg:pl-0">
          {mainServices.map((service, index) => (
            <div
              key={service.slug}
              ref={setServiceRef(index)}
              id={`service-${service.slug}`}
              className="scroll-mt-20 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 min-h-[400px] md:min-h-[500px]"
              data-service-index={index}
            >
              <div className="relative h-60 md:h-80 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>
              
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                  {service.title}
                </h2>
                <p 
                  className="text-gray-600 mb-2 leading-relaxed text-sm md:text-base"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {service.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7">
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {service.subServices.slice(0, 4).map((subService, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/ameliyatlar/${slugify(subService.title)}`}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs md:text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-sm"
                      >
                        {subService.title}
                      </Link>
                    ))}
                    {service.subServices.length > 4 && (
                      <span className="bg-gray-100 px-3 py-2 rounded-lg text-xs md:text-sm text-gray-500">
                        +{service.subServices.length - 4}{sectionData.moreServices}
                      </span>
                    )}
                  </div>
                </div>
                
                <Link href={`/ameliyatlar/${service.slug}`} className="w-full sm:w-auto">
                  <Button
                    text={sectionData.buttonText}
                    backgroundColor="#151515"
                    textColor="#ffffff"
                    icon={<FaArrowRight size={14} />}
                    className="w-full sm:w-auto justify-center"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}