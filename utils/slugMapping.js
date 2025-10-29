export const slugMapping = {
  // Türkçe slug -> İngilizce slug
  'tr': {
    // Ana hizmetler
    'burun-estetigi': 'rhinoplasty',
    'meme-estetigi': 'breast-aesthetics',
    'tickle-liposuction': 'tickle-liposuction',
    'yuz-estetigi': 'facial-aesthetics',
    'vucut-estetigi': 'body-aesthetics',
    
    // Burun Estetiği Alt Hizmetleri
    'ameliyatsiz-burun-estetigi': 'non-surgical-rhinoplasty',
    'primer-rinoplasti': 'primary-rhinoplasty',
    'sekonder-ve-tersiyer-rinoplasti': 'secondary-and-tertiary-rhinoplasty',
    'deviasyon-ve-konka-tedavisi': 'septum-deviation-and-concha-treatment',
    
    // Meme Estetiği Alt Hizmetleri
    'meme-asimetrisi': 'breast-asymmetry',
    'meme-buyutme': 'breast-augmentation',
    'meme-buyutme-ve-diklestirme': 'breast-augmentation-and-lift',
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
    'liposuction-yag-alma': 'liposuction-fat-removal',
    'karin-germe': 'tummy-tuck',
    'yag-enjeksiyonlari-vucut': 'fat-injections-body',
    'mini-karin-germe': 'mini-tummy-tuck',
    'cevresel-karin-germe': 'circumferential-abdominoplasty',
    'kol-germe': 'arm-lift',
    'uyluk-germe': 'thigh-lift',
    'kalca-kaldirma-ve-kalca-protezi': 'buttock-lift-and-buttock-implants',
    'ayak-ve-ayak-bilegi-estetigi': 'foot-and-ankle-aesthetics',
    'diz-kapagi-estetigi': 'knee-aesthetics'
  },
  
  // İngilizce slug -> Türkçe slug
  'en': {
    // Main Services
    'rhinoplasty': 'burun-estetigi',
    'breast-aesthetics': 'meme-estetigi',
    'tickle-liposuction': 'tickle-liposuction',
    'facial-aesthetics': 'yuz-estetigi',
    'body-aesthetics': 'vucut-estetigi',
    
    // Rhinoplasty Sub-Services
    'non-surgical-rhinoplasty': 'ameliyatsiz-burun-estetigi',
    'primary-rhinoplasty': 'primer-rinoplasti',
    'secondary-and-tertiary-rhinoplasty': 'sekonder-ve-tersiyer-rinoplasti',
    'septum-deviation-and-concha-treatment': 'deviasyon-ve-konka-tedavisi',
    
    // Breast Aesthetics Sub-Services
    'breast-asymmetry': 'meme-asimetrisi',
    'breast-augmentation': 'meme-buyutme',
    'breast-augmentation-and-lift': 'meme-buyutme-ve-diklestirme',
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
    'liposuction-fat-removal': 'liposuction-yag-alma',
    'tummy-tuck': 'karin-germe',
    'fat-injections-body': 'yag-enjeksiyonlari-vucut',
    'mini-tummy-tuck': 'mini-karin-germe',
    'circumferential-abdominoplasty': 'cevresel-karin-germe',
    'arm-lift': 'kol-germe',
    'thigh-lift': 'uyluk-germe',
    'buttock-lift-and-buttock-implants': 'kalca-kaldirma-ve-kalca-protezi',
    'foot-and-ankle-aesthetics': 'ayak-ve-ayak-bilegi-estetigi',
    'knee-aesthetics': 'diz-kapagi-estetigi'
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