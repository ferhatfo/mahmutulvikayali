// utils/surgerySlugMapping.js
export const surgerySlugMapping = {
  // Türkçe -> İngilizce
  'burun-estetigi': 'rhinoplasty',
  'ameliyatsiz-burun-estetigi': 'non-surgical-rhinoplasty',
  'primer-rinoplasti': 'primary-rhinoplasty',
  'sekonder-ve-tersiyer-rinoplasti': 'secondary-and-tertiary-rhinoplasty',
  'deviasyon-ve-konka-tedavisi': 'septum-deviation-and-concha-treatment',
  'meme-estetigi': 'breast-aesthetics',
  'meme-asimetrisi': 'breast-asymmetry',
  'meme-buyutme': 'breast-augmentation',
  'meme-buyutme-ve-diklestirme': 'breast-augmentation-and-lift',
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
  
  // İngilizce -> Türkçe (ters mapping)
  'rhinoplasty': 'burun-estetigi',
  'non-surgical-rhinoplasty': 'ameliyatsiz-burun-estetigi',
  'primary-rhinoplasty': 'primer-rinoplasti',
  'secondary-and-tertiary-rhinoplasty': 'sekonder-ve-tersiyer-rinoplasti',
  'septum-deviation-and-concha-treatment': 'deviasyon-ve-konka-tedavisi',
  'breast-aesthetics': 'meme-estetigi',
  'breast-asymmetry': 'meme-asimetrisi',
  'breast-augmentation': 'meme-buyutme',
  'breast-augmentation-and-lift': 'meme-buyutme-ve-diklestirme',
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
  'chin-implants': 'cene-implantlari'
};

export const translateSurgerySlug = (slug, fromLang, toLang) => {
  if (fromLang === toLang) return slug;
  
  if (fromLang === 'tr' && toLang === 'en') {
    return surgerySlugMapping[slug] || slug;
  } else if (fromLang === 'en' && toLang === 'tr') {
    // Ters mapping için
    const reverseMapping = {};
    Object.entries(surgerySlugMapping).forEach(([key, value]) => {
      reverseMapping[value] = key;
    });
    return reverseMapping[slug] || slug;
  }
  
  return slug;
};