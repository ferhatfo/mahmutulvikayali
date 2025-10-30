// middleware.js
import { NextResponse } from 'next/server';
import { isValidBlogSlug, translateBlogSlug, blogSlugMapping } from './utils/blogSlugMapping';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Statik route mapping'leri
  const routeMappings = {
    '/hakkimizda': '/about',
    '/ameliyatlar': '/surgeries', 
    '/iletisim': '/contact',
  };

  // Ameliyat slug mapping
  const surgerySlugMapping = {
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
    
    // İngilizce -> Türkçe (ters mapping)
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

  // Statik rewrite işlemleri
  for (const [turkishPath, englishPath] of Object.entries(routeMappings)) {
    if (pathname === turkishPath) {
      const url = request.nextUrl.clone();
      url.pathname = englishPath;
      console.log(`🔄 Static rewrite: ${pathname} -> ${url.pathname}`);
      return NextResponse.rewrite(url);
    }
    
    if (pathname === `/en${turkishPath}`) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${englishPath}`;
      console.log(`🔄 Static rewrite: ${pathname} -> ${url.pathname}`);
      return NextResponse.rewrite(url);
    }
  }

  // Dinamik ameliyat sayfaları için rewrite
  const surgeryMatch = pathname.match(/^\/(?:en\/)?ameliyatlar\/(.+)$/);
  if (surgeryMatch) {
    const isEnglish = pathname.startsWith('/en/');
    const slug = surgeryMatch[1];
    
    console.log(`🔪 Ameliyat middleware: ${pathname}, slug: ${slug}`);

    // Slug'ı çevir
    const translatedSlug = surgerySlugMapping[slug] || slug;
    
    const url = request.nextUrl.clone();
    
    if (isEnglish) {
      url.pathname = `/en/surgeries/${translatedSlug}`;
      console.log(`🔄 Ameliyat rewrite: /en/ameliyatlar/${slug} -> /en/surgeries/${translatedSlug}`);
    } else {
      url.pathname = `/surgeries/${translatedSlug}`;
      console.log(`🔄 Ameliyat rewrite: /ameliyatlar/${slug} -> /surgeries/${translatedSlug}`);
    }
    
    return NextResponse.rewrite(url);
  }

  // Dinamik surgeries sayfaları için rewrite
  const surgeriesMatch = pathname.match(/^\/(?:en\/)?surgeries\/(.+)$/);
  if (surgeriesMatch) {
    const isEnglish = pathname.startsWith('/en/');
    const slug = surgeriesMatch[1];
    
    console.log(`🔪 Surgeries middleware: ${pathname}, slug: ${slug}`);

    // Slug'ı çevir (ters mapping)
    const translatedSlug = Object.entries(surgerySlugMapping).find(([key, value]) => value === slug)?.[0] || slug;
    
    const url = request.nextUrl.clone();
    
    if (isEnglish) {
      url.pathname = `/en/surgeries/${slug}`;
      console.log(`🔄 Surgeries rewrite: /en/surgeries/${slug} -> /en/surgeries/${slug} (original: ${translatedSlug})`);
    } else {
      url.pathname = `/surgeries/${slug}`;
      console.log(`🔄 Surgeries rewrite: /surgeries/${slug} -> /surgeries/${slug} (original: ${translatedSlug})`);
    }
    
    return NextResponse.rewrite(url);
  }

  // BLOG SAYFALARI İÇİN AKILLI YÖNLENDİRME
// middleware.js - blog kısmını rewrite ile değiştirelim
const blogMatch = pathname.match(/^\/(?:en\/)?blog\/(.+)$/);
if (blogMatch) {
  const isEnglish = pathname.startsWith('/en/');
  const slug = blogMatch[1];
  
  console.log(`📖 Blog middleware: ${pathname}, slug: ${slug}`);

  // Slug'ın dilini tespit et
  const isSlugEnglish = isValidBlogSlug(slug, 'en');
  const isSlugTurkish = isValidBlogSlug(slug, 'tr');
  
  console.log(`🔍 Slug analysis: English=${isSlugEnglish}, Turkish=${isSlugTurkish}`);

  // Senaryo 1: İngilizce slug, Türkçe URL -> İngilizce'ye REWRITE
  if (!isEnglish && isSlugEnglish && !isSlugTurkish) {
    console.log(`🎯 English slug without /en/ prefix, REWRITING to English...`);
    const url = request.nextUrl.clone();
    url.pathname = `/en/blog/${slug}`;
    return NextResponse.rewrite(url);
  }
  
  // Senaryo 2: Türkçe slug, İngilizce URL -> Türkçe'ye REWRITE  
  if (isEnglish && isSlugTurkish && !isSlugEnglish) {
    console.log(`🎯 Turkish slug with /en/ prefix, REWRITING to Turkish...`);
    const url = request.nextUrl.clone();
    url.pathname = `/blog/${slug}`;
    return NextResponse.rewrite(url);
  }

  // Senaryo 3: Çeviri gerekli
  const currentLocale = isEnglish ? 'en' : 'tr';
  if (!isValidBlogSlug(slug, currentLocale)) {
    const targetLocale = currentLocale === 'en' ? 'tr' : 'en';
    const translatedSlug = translateBlogSlug(slug, currentLocale, targetLocale);
    
    if (translatedSlug !== slug && isValidBlogSlug(translatedSlug, targetLocale)) {
      console.log(`✅ Found translation: ${slug} -> ${translatedSlug}, REWRITING...`);
      const url = request.nextUrl.clone();
      url.pathname = targetLocale === 'en' ? `/en/blog/${translatedSlug}` : `/blog/${translatedSlug}`;
      return NextResponse.rewrite(url);
    }
  }

  // Normal durum - devam et
  console.log(`✅ Proceeding normally with slug: ${slug}`);
  return NextResponse.next();
}

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/hakkimizda',
    '/ameliyatlar', 
    '/iletisim',
    '/en/hakkimizda',
    '/en/ameliyatlar',
    '/en/iletisim',
    '/ameliyatlar/:path*',
    '/en/ameliyatlar/:path*',
    '/surgeries/:path*',
    '/en/surgeries/:path*',
    '/blog/:path*',
    '/en/blog/:path*',
  ],
};