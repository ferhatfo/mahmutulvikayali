// utils/surgerySlugMapping.js
// Tek doğru kaynak: public/locales/{tr,en}/services.json içindeki "slug" alanları.
// Çiftler tek listede tutulur; iki yönlü tablo ve dil kümeleri buradan türetilir,
// böylece eskiden olduğu gibi ters tablonun ayrı tutulup kaymasına gerek kalmaz.
export const surgerySlugPairs = [
  ['burun-estetigi', 'rhinoplasty'], // Burun Estetiği
  ['ameliyatsiz-burun-estetigi-antalya', 'non-surgical-rhinoplasty-antalya'], // Ameliyatsız Burun Estetiği Antalya
  ['primer-rinoplasti-antalya', 'primary-rhinoplasty-antalya'], // Primer Rinoplasti Antalya
  ['sekonder-ve-tersiyer-rinoplasti-antalya', 'secondary-and-tertiary-rhinoplasty-antalya'], // Sekonder ve Tersiyer Rinoplasti Antalya
  ['antalya-deviasyon-ve-konka-tedavisi', 'antalya-deviation-and-concha-treatment'], // Antalya Deviasyon ve Konka Tedavisi

  ['antalya-meme-estetigi', 'breast-surgery-in-turkey'], // Antalya Meme Estetiği
  ['meme-asimetrisi-antalya', 'breast-asymmetry-antalya'], // Meme Asimetrisi Antalya
  ['meme-buyutme-antalya', 'breast-augmentation-antalya'], // Meme Büyütme Antalya
  ['meme-buyutme-ve-diklestirme-antalya', 'breast-augmentation-and-lift-turkey'], // Meme Büyütme ve Dikleştirme Antalya
  ['protezsiz-meme-diklestirme-antalya', 'breast-lift-without-implants-antalya'], // Protezsiz Meme Dikleştirme Antalya
  ['meme-kucultme-antalya', 'breast-reduction-antalya'], // Meme Küçültme Antalya
  ['jinekomasti-erkek-meme-kucultme-antalya', 'gynecomastia-surgery-antalya'], // Jinekomasti Erkek Meme Küçültme Antalya

  ['tickle-liposuction', 'tickle-liposuction'], // Tickle Liposuction
  ['tickle-liposuction-sureci', 'tickle-liposuction-process'], // Tickle Liposuction Süreci
  ['tickle-liposuction-nasil-yapilir', 'how-is-tickle-liposuction-performed'], // Tickle Liposuction Nasıl Yapılır?

  ['yuz-estetigi', 'facial-aesthetics'], // Yüz Estetiği
  ['derin-plan-yuz-germe-antalya', 'deep-plane-facelift-turkey'], // Derin Plan Yüz Germe Antalya
  ['endoskopik-kas-kaldirma-antalya', 'endoscopic-brow-lift-turkey'], // Endoskopik Kaş Kaldırma Antalya
  ['temporal-lift-ve-sakak-germe-antalya', 'temporal-lift-surgery-antalya'], // Temporal Lift ve Şakak Germe Antalya
  ['orta-yuz-kaldirma-antalya', 'subperiosteal-midface-lift-turkey'], // Orta Yüz Kaldırma Antalya
  ['goz-kapagi-estetigi-antalya', 'eyelid-surgery-antalya'], // Göz Kapağı Estetiği Antalya
  ['yuz-yag-enjeksiyonu-antalya', 'facial-fat-transfer-injections'], // Yağ Enjeksiyonları Antalya
  ['antalyada-kepce-kulak-estetigi-otoplasti', 'prominent-ears-surgery-antalya'], // Antalyada Kepçe Kulak Estetiği Otoplasti
  ['medpor-cene-implantlari-antalya', 'medpor-chin-implants-turkey'], // Medpor Çene İmplantları Antalya

  ['vucut-estetigi', 'body-aesthetics'], // Vücut Estetiği
  ['liposuction-yag-alma-antalya', 'liposuction-fat-removal-antalya'], // Liposuction (Yağ Alma) ve Vücut Şekillendirme Antalya
  ['karin-germe-ameliyati-antalya', 'tummy-tuck-surgery-antalya'], // Karın Germe Ameliyatı Antalya
  ['yag-enjeksiyonlari-antalya', 'fat-injections-antalya'], // Yağ Enjeksiyonları Antalya
  ['mini-karin-germe-antalya', 'mini-tummy-tuck-antalya'], // Mini Karın Germe Antalya
  ['cevresel-karin-germe-antalya', 'circumferential-tummy-tuck-antalya'], // Çevresel Karın Germe Antalya
  ['kol-germe-ameliyati-antalya', 'arm-lift-surgery-antalya'], // Kol Germe Ameliyatı Antalya
  ['uyluk-germe-ameliyati-antalya', 'thigh-lift-surgery-antalya'], // Uyluk Germe Ameliyatı Antalya
  ['kalca-kaldirma-protezi-antalya', 'buttock-lift-implants-antalya'], // Kalça Kaldırma Protezi Antalya
  ['ayak-ve-ayak-bilegi-estetigi-antalya', 'foot-and-ankle-aesthetics-antalya'], // Ayak ve Ayak Bileği Estetiği Antalya
  ['diz-kapagi-estetigi-antalya', 'knee-aesthetics-antalya'], // Diz Kapağı Estetiği Antalya
];

export const surgerySlugMapping = Object.fromEntries(
  surgerySlugPairs.flatMap(([tr, en]) => [[tr, en], [en, tr]])
);

export const trSurgerySlugs = new Set(surgerySlugPairs.map(([tr]) => tr));
export const enSurgerySlugs = new Set(surgerySlugPairs.map(([, en]) => en));

// Slug'ı hedef dilin slug'ına çevirir. Zaten o dildeyse olduğu gibi bırakır;
// böylece URL her zaman önceden üretilmiş (prerendered) yola denk gelir.
export const localizeSurgerySlug = (slug, locale) => {
  const alreadyInLocale = locale === 'en' ? enSurgerySlugs.has(slug) : trSurgerySlugs.has(slug);
  if (alreadyInLocale) return slug;
  return surgerySlugMapping[slug] || slug;
};

export const translateSurgerySlug = (slug, fromLang, toLang) => {
  if (fromLang === toLang) return slug;
  return localizeSurgerySlug(slug, toLang);
};
