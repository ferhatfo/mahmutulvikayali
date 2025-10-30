// components/organisms/Navbar.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Slug mapping'i import edin
import { blogSlugMapping } from '@/utils/blogSlugMapping';

export default function Navbar({ multiPageNavbar }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const langRef = useRef(null);
  const { t, i18n } = useTranslation('navbar');
  const router = useRouter();

  const languages = [
    { code: 'tr', name: 'Tr', native: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'En', native: 'English', flag: '🇬🇧' }
  ];

  // Menu items'ı al
  const menuItems = Object.values(t('menuItems', { returnObjects: true, defaultValue: {} }))
    .filter(item => item && item.href && item.label);

  // Blog slug'larını çeviren fonksiyon
  const translateBlogSlug = (slug, fromLang, toLang) => {
    if (fromLang === toLang) return slug;
    
    const mapping = blogSlugMapping[fromLang];
    return mapping?.[slug] || slug;
  };

  // Dil değiştirme fonksiyonu - BLOG DESTEKLİ
  // components/organisms/Navbar.jsx - dil değiştirme fonksiyonunu güncelleyin
  const changeLanguage = async (lang) => {
    try {
      const { pathname, asPath, query } = router;
      const currentLocale = i18n?.language || router.locale;
      
      let newPath = asPath;
      
      console.log('🔄 Dil değiştirme başlıyor:', { 
        currentLocale, 
        newLang: lang, 
        currentPath: newPath 
      });

      // URL mapping - Türkçe ve İngilizce URL'leri birbirine çevir
      const urlMappings = {
        // Türkçe -> İngilizce
        '/hakkimizda': '/about',
        '/ameliyatlar': '/surgeries',
        '/iletisim': '/contact',
        // İngilizce -> Türkçe
        '/about': '/hakkimizda',
        '/surgeries': '/ameliyatlar',
        '/contact': '/iletisim',
      };
      
      // Mevcut path'teki Türkçe/İngilizce URL'leri çevir
      Object.entries(urlMappings).forEach(([fromPath, toPath]) => {
        // Eğer mevcut dil Türkçe ve yeni dil İngilizce ise, Türkçe -> İngilizce
        if (currentLocale === 'tr' && lang === 'en' && newPath.includes(fromPath)) {
          newPath = newPath.replace(fromPath, toPath);
          console.log(`🔀 URL çevirisi: ${fromPath} -> ${toPath}`);
        }
        // Eğer mevcut dil İngilizce ve yeni dil Türkçe ise, İngilizce -> Türkçe
        else if (currentLocale === 'en' && lang === 'tr' && newPath.includes(fromPath)) {
          newPath = newPath.replace(fromPath, toPath);
          console.log(`🔀 URL çevirisi: ${fromPath} -> ${toPath}`);
        }
      });
      
      // AMELİYATLAR SAYFALARI İÇİN SLUG MAPPING - GÜNCELLENDİ
      if (newPath.includes('/ameliyatlar/') || newPath.includes('/surgeries/')) {
        const pathParts = newPath.split('/');
        const currentSlug = pathParts[pathParts.length - 1];
        
        console.log(`🔪 Ameliyat slug çevirisi: ${currentSlug} (${currentLocale} -> ${lang})`);
        
        // Ameliyat slug mapping
        const surgeryMappings = {
          // Türkçe -> İngilizce
          'burun-estetigi': 'rhinoplasty',
          'ameliyatsiz-burun-estetigi-antalya': 'non-surgical-rhinoplasty-antalya',
          'primer-rinoplasti-antalya': 'primary-rhinoplasty-antalya',
          'sekonder-ve-tersiyer-rinoplasti-antalya': 'secondary-and-tertiary-rhinoplasty-antalya',
          'antalya-deviasyon-ve-konka-tedavisi': 'antalya-septum-deviation-and-concha-treatment',
          'meme-estetigi-antalya': 'breast-surgery-turkey',
          'meme-asimetrisi-antalya': 'breast-asymmetry-antalya',
          'meme-buyutme-antalya': 'breast-augmentation-antalya',
          'meme-buyutme-ve-diklestirme-antalya': 'breast-augmentation-and-lift-turkey',
          'meme-diklestirme': 'breast-lift',
          'meme-kucultme': 'breast-reduction',
          'jinekomasti': 'gynecomastia',
          'tickle-liposuction': 'tickle-liposuction',
          'tickle-liposuction-sureci': 'tickle-liposuction-process',
          'nasil-yapilir': 'how-is-it-performed',
          'yuz-estetigi': 'facial-aesthetics',
          'derin-plan-yuz-germe': 'deep-plane-facelift',
          'endoskopik-kas-kaldirma': 'endoscopic-brow-lift',
          'temporal-lift': 'temporal-lift',
          'orta-yuz-kaldirma': 'midface-lift',
          'goz-kapagi-estetigi': 'eyelid-surgery',
          'yag-enjeksiyonlari': 'fat-injections',
          'kepce-kulak': 'prominent-ears',
          'cene-implantlari': 'chin-implants',
          'vucut-estetigi': 'body-aesthetics',
          'liposuction-yag-alma-antalya': 'liposuction-fat-removal-antalya',
          'karin-germe-ameliyati-antalya': 'tummy-tuck-surgery-antalya',
          'yag-enjeksiyonlari-antalya': 'fat-injections-antalya',
          'mini-karin-germe-antalya': 'mini-tummy-tuck-antalya',
          'cevresel-karin-germe-antalya': 'circumferential-tummy-tuck-antalya',
          'kol-germe-ameliyati-antalya': 'arm-lift-surgery-antalya',
          'uyluk-germe-ameliyati-antalya': 'thigh-lift-surgery-antalya',
          'kalca-kaldirma-protezi-antalya': 'buttock-lift-and-implants-antalya',
          'ayak-ayak-bilegi-estetigi-antalya': 'foot-and-ankle-aesthetics-antalya',
          'diz-kapagi-estetigi-antalya': 'knee-aesthetics-antalya',
          
          // İngilizce -> Türkçe
          'rhinoplasty': 'burun-estetigi',
          'non-surgical-rhinoplasty': 'ameliyatsiz-burun-estetigi',
          'primary-rhinoplasty': 'primer-rinoplasti',
          'secondary-and-tertiary-rhinoplasty': 'sekonder-ve-tersiyer-rinoplasti',
          'septum-deviation-and-concha-treatment': 'deviasyon-ve-konka-tedavisi',
          'breast-surgery-turkey': 'meme-estetigi-antalya',
          'breast-asymmetry-antalya': 'meme-asimetrisi-antalya',
          'breast-augmentation-antalya': 'meme-buyutme-antalya',
          'breast-augmentation-and-lift-turkey': 'meme-buyutme-ve-diklestirme-antalya',
          'breast-lift': 'meme-diklestirme',
          'breast-reduction': 'meme-kucultme',
          'gynecomastia': 'jinekomasti',
          'tickle-liposuction-process': 'tickle-liposuction-sureci',
          'how-is-it-performed': 'nasil-yapilir',
          'facial-aesthetics': 'yuz-estetigi',
          'deep-plane-facelift': 'derin-plan-yuz-germe',
          'endoscopic-brow-lift': 'endoskopik-kas-kaldirma',
          'midface-lift': 'orta-yuz-kaldirma',
          'eyelid-surgery': 'goz-kapagi-estetigi',
          'fat-injections': 'yag-enjeksiyonlari',
          'prominent-ears': 'kepce-kulak',
          'chin-implants': 'cene-implantlari',
          'body-aesthetics': 'vucut-estetigi',
          'liposuction-fat-removal-antalya': 'liposuction-yag-alma-antalya',
          'tummy-tuck-surgery-antalya': 'karin-germe-ameliyati-antalya',
          'fat-injections-antalya': 'yag-enjeksiyonlari-antalya',
          'mini-tummy-tuck-antalya': 'mini-karin-germe-antalya',
          'circumferential-tummy-tuck-antalya': 'cevresel-karin-germe-antalya',
          'arm-lift-surgery-antalya': 'kol-germe-ameliyati-antalya',
          'thigh-lift-surgery-antalya': 'uyluk-germe-ameliyati-antalya',
          'buttock-lift-and-implants-antalya': 'kalca-kaldirma-protezi-antalya',
          'foot-and-ankle-aesthetics-antalya': 'ayak-ayak-bilegi-estetigi-antalya',
          'knee-aesthetics-antalya': 'diz-kapagi-estetigi-antalya'
        };
        
        const translatedSlug = surgeryMappings[currentSlug] || currentSlug;
        
        if (translatedSlug !== currentSlug) {
          newPath = newPath.replace(currentSlug, translatedSlug);
          console.log(`✅ Ameliyat slug çevrildi: ${currentSlug} -> ${translatedSlug}`);
        } else {
          console.log(`ℹ️ Ameliyat slug çevrilemedi, aynı kalıyor: ${currentSlug}`);
        }
        
        // ÖNEMLİ: /en/ameliyatlar/... yerine /en/surgeries/... kullan
        if (lang === 'en' && newPath.includes('/ameliyatlar/')) {
          newPath = newPath.replace('/ameliyatlar/', '/surgeries/');
          console.log(`🔀 Ameliyat route değiştirildi: /ameliyatlar/ -> /surgeries/`);
        } else if (lang === 'tr' && newPath.includes('/surgeries/')) {
          newPath = newPath.replace('/surgeries/', '/ameliyatlar/');
          console.log(`🔀 Ameliyat route değiştirildi: /surgeries/ -> /ameliyatlar/`);
        }
      }
      
      // BLOG SAYFALARI İÇİN SLUG MAPPING
      if (newPath.includes('/blog/')) {
        const pathParts = newPath.split('/');
        const currentSlug = pathParts[pathParts.length - 1];
        
        console.log(`📖 Blog slug çevirisi: ${currentSlug} (${currentLocale} -> ${lang})`);
        
        // TÜM BLOG SLUG MAPPING'İ
        const blogMappings = {
          // İngilizce -> Türkçe
          'naturalness-and-facial-proportions-harmony-in-rhinoplasty': 'burun-estetiginde-dogallik-ve-yuz-oranlarinin-uyumu',
          'breast-aesthetics-regaining-balance-in-female-silhouette': 'meme-estetigi-kadin-siluetinde-dengenin-yeniden-kazanimi',
          'tickle-liposuction-next-generation-fat-removal-experience': 'tickle-liposuction-yeni-nesil-yag-aldirma-deneyimi',
          'facial-aesthetics-the-secret-of-natural-expression-and-youthful-appearance': 'yuz-estetigi-dogal-ifade-ve-genc-gorunumun-sirri',
          'body-aesthetics-rediscovering-balanced-lines-and-natural-form': 'vucut-estetigi-dengeli-hatlar-ve-dogal-formun-yeniden-kesfi',
          'the-importance-of-personalized-approach-in-aesthetic-surgery': 'estetik-cerrahide-kisiye-ozel-yaklasimin-onemi',
          'aesthetic-guide-for-patients-coming-from-abroad': 'yurt-disindan-gelen-hastalar-icin-estetik-rehberi',
          'psychological-effect-of-natural-appearance-increase-in-self-confidence': 'dogal-gorunumun-psikolojik-etkisi-kendine-guvenin-artisi',
          'what-should-be-considered-in-the-recovery-process-after-aesthetic-surgery': 'estetik-operasyon-sonrasi-iyilesme-surecinde-nelere-dikkat-edilmeli',
          'safety-in-aesthetic-surgery-guide-for-conscious-patients': 'estetik-cerrahide-guvenlik-bilincli-hastalar-icin-kilavuz',
          
          // Türkçe -> İngilizce
          'burun-estetiginde-dogallik-ve-yuz-oranlarinin-uyumu': 'naturalness-and-facial-proportions-harmony-in-rhinoplasty',
          'meme-estetigi-kadin-siluetinde-dengenin-yeniden-kazanimi': 'breast-aesthetics-regaining-balance-in-female-silhouette',
          'tickle-liposuction-yeni-nesil-yag-aldirma-deneyimi': 'tickle-liposuction-next-generation-fat-removal-experience',
          'yuz-estetigi-dogal-ifade-ve-genc-gorunumun-sirri': 'facial-aesthetics-the-secret-of-natural-expression-and-youthful-appearance',
          'vucut-estetigi-dengeli-hatlar-ve-dogal-formun-yeniden-kesfi': 'body-aesthetics-rediscovering-balanced-lines-and-natural-form',
          'estetik-cerrahide-kisiye-ozel-yaklasimin-onemi': 'the-importance-of-personalized-approach-in-aesthetic-surgery',
          'yurt-disindan-gelen-hastalar-icin-estetik-rehberi': 'aesthetic-guide-for-patients-coming-from-abroad',
          'dogal-gorunumun-psikolojik-etkisi-kendine-guvenin-artisi': 'psychological-effect-of-natural-appearance-increase-in-self-confidence',
          'estetik-operasyon-sonrasi-iyilesme-surecinde-nelere-dikkat-edilmeli': 'what-should-be-considered-in-the-recovery-process-after-aesthetic-surgery',
          'estetik-cerrahide-guvenlik-bilincli-hastalar-icin-kilavuz': 'safety-in-aesthetic-surgery-guide-for-conscious-patients'
        };
        
        const translatedSlug = blogMappings[currentSlug] || currentSlug;
        
        if (translatedSlug !== currentSlug) {
          newPath = newPath.replace(currentSlug, translatedSlug);
          console.log(`✅ Blog slug çevrildi: ${currentSlug} -> ${translatedSlug}`);
        } else {
          console.log(`ℹ️ Blog slug çevrilemedi, aynı kalıyor: ${currentSlug}`);
        }
      }
      
      console.log('🎯 Son URL:', newPath);
      
      // i18n değiştirme
      if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(lang);
      }
      
      // Router ile yönlendirme
      await router.push(newPath, newPath, { 
        locale: lang,
        scroll: false
      });
      
      setIsLangOpen(false);
      if (isOpen) setIsOpen(false);
      
    } catch (error) {
      console.error('❌ Dil değiştirme hatası:', error);
    }
  };

  // Router locale değiştiğinde i18n'i senkronize et
  useEffect(() => {
    if (router.locale && i18n && typeof i18n.changeLanguage === 'function' && i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale, i18n]);

  // Tıklama dışı handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // GSAP animasyonları
  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { x: '-100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
      
      if (linksRef.current.length > 0) {
        gsap.fromTo(
          linksRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.2,
          }
        );
      }
    } else if (menuRef.current) {
      gsap.to(menuRef.current, {
        x: '-100%',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  // i18n instance kontrolü
  const currentLanguage = languages.find(lang => lang.code === (i18n?.language || router.locale)) || languages[0];

  return (
    <header className="relative top-0 left-0 w-full z-50 bg-transparent">
      <div className={`pl-[8%] pr-[3%] py-6 flex justify-between items-center ${multiPageNavbar ? 'border-b' : ''}`}
        style={{ borderColor: multiPageNavbar ? '#aa7cce' : 'transparent' }}>
        
        <Link href="/" locale={i18n?.language || router.locale}>
          {multiPageNavbar ? (
            <Image src="/images/svg/logo-white.svg" alt="Logo" width={200} height={50} />
          ) : (
            <Image src="/images/svg/logo.svg" alt="Logo" width={200} height={50} />
          )}
        </Link>

        {/* MOBİL MENÜ */}
        <div className="lg:hidden flex items-center">
          
          <div className="relative mr-4" ref={langRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLangOpen(!isLangOpen);
              }}
              className={`flex items-center text-sm font-medium ${multiPageNavbar ? 'text-white' : 'text-[#363636]'}`}
            >
              <span className="mr-1 text-lg">{currentLanguage?.flag}</span>
              <span>{currentLanguage?.name}</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLangOpen && (
              <div className="absolute left-[-50px] mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      changeLanguage(lang.code);
                    }}
                    className={`flex items-center w-full text-left px-3 py-2 text-sm ${
                      (i18n?.language || router.locale) === lang.code
                        ? 'bg-purple-100 text-purple-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2 text-lg">{lang.flag}</span>
                    <span>{lang.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`text-3xl z-[60] ${
              multiPageNavbar
                ? isOpen
                  ? 'text-[#363636]'
                  : 'text-white'
                : 'text-[#363636]'
            }`}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex text-sm gap-4 font-medium">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                locale={i18n?.language || router.locale}
                className={`flex items-center gap-2 ${multiPageNavbar ? 'text-white' : 'text-[#363636]'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="relative" ref={langRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLangOpen(!isLangOpen);
              }}
              className={`flex items-center text-sm font-medium ${multiPageNavbar ? 'text-white' : 'text-[#363636]'}`}
            >
              <span className="mr-1 text-lg">{currentLanguage?.flag}</span>
              <span>{currentLanguage?.name}</span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${isLangOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={(e) => {
                      e.stopPropagation();
                      changeLanguage(lang.code);
                    }}
                    className={`flex items-center w-full text-left px-3 py-2 text-sm ${
                      (i18n?.language || router.locale) === lang.code
                        ? 'bg-purple-100 text-purple-800'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2 text-lg">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{lang.native}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MOBİL SİDEBAR */}
        <div
          ref={menuRef}
          className="absolute top-0 left-0 h-screen w-full bg-white z-40 flex flex-col justify-center items-center lg:hidden"
          style={{ transform: 'translateX(-100%)' }}
        >
          <ul className="space-y-6 text-center">
            {menuItems.map((item, index) => (
              <li key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  href={item.href}
                  locale={i18n?.language || router.locale}
                  className="text-xl font-medium flex items-center justify-center gap-2 text-[#363636]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}