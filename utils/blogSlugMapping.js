// utils/blogSlugMapping.js
export const blogSlugMapping = {
  // İngilizce slug -> Türkçe slug mapping
  'en': {
    'naturalness-and-facial-proportions-harmony-in-rhinoplasty': 'burun-estetiginde-dogallik-ve-yuz-oranlarinin-uyumu',
    'breast-aesthetics-regaining-balance-in-female-silhouette': 'meme-estetigi-kadin-siluetinde-dengenin-yeniden-kazanimi',
    'tickle-liposuction-next-generation-fat-removal-experience': 'tickle-liposuction-yeni-nesil-yag-aldirma-deneyimi',
    'facial-aesthetics-the-secret-of-natural-expression-and-youthful-appearance': 'yuz-estetigi-dogal-ifade-ve-genc-gorunumun-sirri',
    'body-aesthetics-rediscovering-balanced-lines-and-natural-form': 'vucut-estetigi-dengeli-hatlar-ve-dogal-formun-yeniden-kesfi',
    'the-importance-of-personalized-approach-in-aesthetic-surgery': 'estetik-cerrahide-kisiye-ozel-yaklasimin-onemi',
    'aesthetic-guide-for-patients-coming-from-abroad': 'yurt-disindan-gelen-hastalar-icin-estetik-rehberi',
    'psychological-effect-of-natural-appearance-increase-in-self-confidence': 'dogal-gorunumun-psikolojik-etkisi-kendine-guvenin-artisi',
    'what-should-be-considered-in-the-recovery-process-after-aesthetic-surgery': 'estetik-operasyon-sonrasi-iyilesme-surecinde-nelere-dikkat-edilmeli',
    'safety-in-aesthetic-surgery-guide-for-conscious-patients': 'estetik-cerrahide-guvenlik-bilincli-hastalar-icin-kilavuz'
  },
  // Türkçe slug -> İngilizce slug mapping
  'tr': {
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
  }
};

// Slug'ı diğer dile çeviren fonksiyon - DEBUG EKLİYORUM
export const translateBlogSlug = (slug, fromLang, toLang) => {
  if (fromLang === toLang) return slug;
  
  console.log(`🔄 translateBlogSlug: ${slug} from ${fromLang} to ${toLang}`);
  
  // Tüm mapping stratejilerini deneyelim
  
  // 1. Doğrudan mapping: fromLang -> toLang
  const directMapping = blogSlugMapping[fromLang];
  if (directMapping && directMapping[slug]) {
    console.log(`✅ Direct mapping found: ${slug} -> ${directMapping[slug]}`);
    return directMapping[slug];
  }
  
  // 2. Ters mapping: toLang -> fromLang (value'ları kontrol et)
  const reverseMapping = blogSlugMapping[toLang];
  if (reverseMapping) {
    // toLang mapping'inde, value'su slug olan key'i bul
    const reverseKey = Object.keys(reverseMapping).find(key => reverseMapping[key] === slug);
    if (reverseKey) {
      console.log(`✅ Reverse mapping found: ${slug} -> ${reverseKey}`);
      return reverseKey;
    }
  }
  
  // 3. Çift yönlü mapping kontrolü
  // fromLang'de bu slug bir value mu?
  if (fromLang === 'tr') {
    // tr mapping'inde value olarak bu slug var mı?
    const trValues = Object.values(blogSlugMapping.tr || {});
    if (trValues.includes(slug)) {
      // Bu slug tr'de bir value, key'ini bul
      const trKey = Object.keys(blogSlugMapping.tr).find(key => blogSlugMapping.tr[key] === slug);
      if (trKey && blogSlugMapping.en && blogSlugMapping.en[trKey]) {
        console.log(`✅ Bidirectional mapping found: ${slug} -> ${blogSlugMapping.en[trKey]}`);
        return blogSlugMapping.en[trKey];
      }
    }
  }
  
  // 4. en mapping'inde doğrudan key olarak ara
  if (fromLang === 'tr' && blogSlugMapping.en && blogSlugMapping.en[slug]) {
    console.log(`✅ Direct EN mapping found: ${slug} -> ${blogSlugMapping.en[slug]}`);
    return blogSlugMapping.en[slug];
  }
  
  console.log(`❌ No mapping found for: ${slug}`);
  return slug;
};

// Tüm geçerli slug'ları içeren liste
export const allValidSlugs = {
  'en': [
    'naturalness-and-facial-proportions-harmony-in-rhinoplasty',
    'breast-aesthetics-regaining-balance-in-female-silhouette',
    'tickle-liposuction-next-generation-fat-removal-experience',
    'facial-aesthetics-the-secret-of-natural-expression-and-youthful-appearance',
    'body-aesthetics-rediscovering-balanced-lines-and-natural-form',
    'the-importance-of-personalized-approach-in-aesthetic-surgery',
    'aesthetic-guide-for-patients-coming-from-abroad',
    'psychological-effect-of-natural-appearance-increase-in-self-confidence',
    'what-should-be-considered-in-the-recovery-process-after-aesthetic-surgery',
    'safety-in-aesthetic-surgery-guide-for-conscious-patients'
  ],
  'tr': [
    'burun-estetiginde-dogallik-ve-yuz-oranlarinin-uyumu',
    'meme-estetigi-kadin-siluetinde-dengenin-yeniden-kazanimi',
    'tickle-liposuction-yeni-nesil-yag-aldirma-deneyimi',
    'yuz-estetigi-dogal-ifade-ve-genc-gorunumun-sirri',
    'vucut-estetigi-dengeli-hatlar-ve-dogal-formun-yeniden-kesfi',
    'estetik-cerrahide-kisiye-ozel-yaklasimin-onemi',
    'yurt-disindan-gelen-hastalar-icin-estetik-rehberi',
    'dogal-gorunumun-psikolojik-etkisi-kendine-guvenin-artisi',
    'estetik-operasyon-sonrasi-iyilesme-surecinde-nelere-dikkat-edilmeli',
    'estetik-cerrahide-guvenlik-bilincli-hastalar-icin-kilavuz'
  ]
};

// Slug'ın geçerli olup olmadığını kontrol et
export const isValidBlogSlug = (slug, locale) => {
  const isValid = allValidSlugs[locale]?.includes(slug) || false;
  console.log(`🔍 isValidBlogSlug: ${slug} for ${locale} -> ${isValid}`);
  return isValid;
};

// Locale göre doğru slug listesini al
export const getSlugsForLocale = (locale) => {
  return allValidSlugs[locale] || [];
};