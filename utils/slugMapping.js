export const slugMapping = {
  // Türkçe slug -> İngilizce slug
  'tr': {
    // Ana hizmetler
    'burun-estetigi': 'rhinoplasty',
    'meme-estetigi-antalya': 'breast-surgery-turkey',
    'tickle-liposuction': 'tickle-liposuction',
    'yuz-estetigi': 'facial-aesthetics',
    'vucut-estetigi': 'body-aesthetics',
    
    // Burun Estetiği Alt Hizmetleri
    'ameliyatsiz-burun-estetigi-antalya': 'non-surgical-rhinoplasty-antalya',
    'primer-rinoplasti-antalya': 'primary-rhinoplasty-antalya',
    'sekonder-ve-tersiyer-rinoplasti-antalya': 'secondary-and-tertiary-rhinoplasty-antalya',
    'antalya-deviasyon-ve-konka-tedavisi': 'antalya-septum-deviation-and-concha-treatment',
    
    // Meme Estetiği Alt Hizmetleri
    'meme-asimetrisi-antalya': 'breast-asymmetry-antalya',
    'meme-buyutme-antalya': 'breast-augmentation-antalya',
    'meme-buyutme-ve-diklestirme-antalya': 'breast-augmentation-and-lift-turkey',
    'meme-diklestirme': 'breast-lift',
    'meme-kucultme': 'breast-reduction',
    'jinekomasti': 'gynecomastia',
    
    // Tickle Liposuction Alt Hizmetleri
    'tickle-liposuction-sureci': 'tickle-liposuction-process',
    'nasil-yapilir': 'how-is-it-performed',
    
    // Yüz Estetiği Alt Hizmetleri
    'derin-plan-yuz-germe': 'deep-plane-facelift',
    'endoskopik-kas-kaldirma': 'endoscopic-brow-lift',
    'temporal-lift': 'temporal-lift',
    'orta-yuz-kaldirma': 'midface-lift',
    'goz-kapagi-estetigi': 'eyelid-surgery',
    'yag-enjeksiyonlari': 'fat-injections',
    'kepce-kulak': 'prominent-ears',
    'cene-implantlari': 'chin-implants',
    
    // Vücut Estetiği Alt Hizmetleri
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
  },
  
  // İngilizce slug -> Türkçe slug
  'en': {
    // Main Services
    'rhinoplasty': 'burun-estetigi',
    'breast-surgery-turkey': 'meme-estetigi-antalya',
    'tickle-liposuction': 'tickle-liposuction',
    'facial-aesthetics': 'yuz-estetigi',
    'body-aesthetics': 'vucut-estetigi',
    
    // Rhinoplasty Sub-Services
    'non-surgical-rhinoplasty': 'ameliyatsiz-burun-estetigi',
    'primary-rhinoplasty': 'primer-rinoplasti',
    'secondary-and-tertiary-rhinoplasty': 'sekonder-ve-tersiyer-rinoplasti',
    'septum-deviation-and-concha-treatment': 'deviasyon-ve-konka-tedavisi',
    
    // Breast Aesthetics Sub-Services
    'breast-asymmetry-antalya': 'meme-asimetrisi-antalya',
    'breast-augmentation-antalya': 'meme-buyutme-antalya',
    'breast-augmentation-and-lift-turkey': 'meme-buyutme-ve-diklestirme-antalya',
    'breast-lift': 'meme-diklestirme',
    'breast-reduction': 'meme-kucultme',
    'gynecomastia': 'jinekomasti',
    
    // Tickle Liposuction Sub-Services
    'tickle-liposuction-process': 'tickle-liposuction-sureci',
    'how-is-it-performed': 'nasil-yapilir',
    
    // Facial Aesthetics Sub-Services
    'deep-plane-facelift': 'derin-plan-yuz-germe',
    'endoscopic-brow-lift': 'endoskopik-kas-kaldirma',
    'temporal-lift': 'temporal-lift',
    'midface-lift': 'orta-yuz-kaldirma',
    'eyelid-surgery': 'goz-kapagi-estetigi',
    'fat-injections': 'yag-enjeksiyonlari',
    'prominent-ears': 'kepce-kulak',
    'chin-implants': 'cene-implantlari',
    
    // Body Aesthetics Sub-Services
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
  }
};

export const getTranslatedSlug = (currentSlug, fromLang, toLang) => {
  if (fromLang === toLang) return currentSlug;
  
  // Önce doğrudan mapping'i kontrol et
  const directMapping = slugMapping[fromLang]?.[currentSlug];
  if (directMapping) return directMapping;
  
  // Eğer doğrudan mapping yoksa, diğer dildeki tüm mapping'leri kontrol et
  const reverseLang = fromLang === 'tr' ? 'en' : 'tr';
  const allMappings = slugMapping[reverseLang];
  
  for (const [key, value] of Object.entries(allMappings)) {
    if (value === currentSlug) {
      return key;
    }
  }
  
  // Hiçbir eşleşme yoksa orijinal slug'ı döndür
  return currentSlug;
};