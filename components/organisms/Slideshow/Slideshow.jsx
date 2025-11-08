'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/atoms/Button';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Slide resimleri sabit kalacak, metinler ve URL'ler çeviriden gelecek
const slideData = [
  {
    id: 1,
    image: '/images/slide1.webp'
  },
  {
    id: 2,
    image: '/images/slide2.webp'
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const progressRefs = useRef([]);
  const intervalRef = useRef(null);
  const { t, i18n } = useTranslation('slideshow');
  const router = useRouter();

  // Çevirilerden slide içeriklerini oluştur
  const slides = slideData.map((slide, index) => {
    const slideKey = `slide${index + 1}`;
    return {
      ...slide,
      title: t(`slides.${slideKey}.title`, { defaultValue: '' }),
      desc: t(`slides.${slideKey}.desc`, { defaultValue: '' }),
      btnText: t(`slides.${slideKey}.btnText`, { defaultValue: '' }),
      btnUrl: t(`slides.${slideKey}.btnUrl`, { defaultValue: '#' })
    };
  });

  const goToSlide = (index) => {
    if (isAnimating || index === current) return;
    
    clearTimeout(intervalRef.current);
    setIsAnimating(true);
    
    // Animasyon süresi
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 600);
  };

  useEffect(() => {
    // Progress bar animasyonu
    progressRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index === current) {
          ref.style.transition = 'width 8s linear';
          ref.style.width = '100%';
        } else {
          ref.style.transition = 'none';
          ref.style.width = '0%';
        }
      }
    });

    // Otomatik geçiş
    intervalRef.current = setTimeout(() => {
      const nextIndex = (current + 1) % slides.length;
      goToSlide(nextIndex);
    }, 8000);

    return () => clearTimeout(intervalRef.current);
  }, [current, slides.length]);

  // Link component'ine locale prop'u eklemek için
  const getLocalizedLink = (url) => {
    return {
      pathname: url,
      query: router.query
    };
  };

  return (
    <section>
      <div className="relative w-full h-[calc(100vh-105px)] overflow-hidden bg-white">
        {/* Desktop Layout - Aynı kalacak */}
        <div className="hidden lg:block relative w-full h-full">
          <div className="absolute left-0 top-0 w-1/2 h-full bg-white z-20 flex items-center">
            <div
              className={`pl-[15%] pr-8 pb-25 w-full transition-all duration-600 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {slides[current]?.title}
              </h2>
              {slides[current]?.altTitle && (
                <h6 className="text-xl font-regular mb-4 text-gray-700">
                  {slides[current].altTitle}
                </h6>
              )}
              <p className="mb-8 text-base md:text-lg max-w-xl text-gray-600 leading-relaxed">
                {slides[current]?.desc}
              </p>
              <Link 
                href={slides[current]?.btnUrl || '#'}
                locale={i18n.language}
              >
                <Button
                  text={slides[current]?.btnText}
                  backgroundColor="#151515"
                  textColor="#fff"
                  icon={<FaArrowRight size={14} />}
                />
              </Link>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-1/2 h-full z-10 overflow-hidden">
            <img 
              src={slides[current]?.image} 
              alt={slides[current]?.title} 
              className={`w-full h-full object-cover transition-all duration-600 ${
                isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
            />
          </div>
        </div>

        {/* Mobile Layout - YENİ: Yazılar üstte, fotoğraf altta */}
        <div className="lg:hidden relative w-full h-full flex flex-col">
          {/* Yazılar - Üst Kısım */}
          <div className="flex-1 bg-white z-30 flex items-center justify-center">
            <div
              className={`text-left px-6 w-full max-w-md transition-all duration-600 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {slides[current]?.title}
              </h2>
              {slides[current]?.altTitle && (
                <h6 className="text-lg font-regular mb-4 text-gray-700">
                  {slides[current].altTitle}
                </h6>
              )}
              <p className="mb-6 text-sm md:text-base text-gray-600 leading-relaxed">
                {slides[current]?.desc}
              </p>
              <Link 
                href={slides[current]?.btnUrl || '#'}
                locale={i18n.language}
              >
                <Button
                  text={slides[current]?.btnText}
                  backgroundColor="#151515"
                  textColor="#fff"
                  icon={<FaArrowRight size={14} />}
                  className="mx-auto hover:bg-gray-800"
                />
              </Link>
            </div>
          </div>

          {/* Fotoğraf - Alt Kısım */}
          <div className="flex-1 relative z-20 overflow-hidden">
            <img 
              src={slides[current]?.image} 
              alt={slides[current]?.title} 
              className={`w-full h-full object-cover transition-all duration-600 ${
                isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-15 lg:bottom-15 left-[6%] lg:left-[8%] flex gap-3 z-30 w-[200px]">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className="cursor-pointer w-full h-1 bg-gray-300 rounded overflow-hidden"
            >
              <div
                ref={(el) => (progressRefs.current[index] = el)}
                className="h-full bg-gray-700 lg:bg-gray-700 w-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}