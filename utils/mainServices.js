// utils/mainServices.js
// Footer gibi her sayfada mount olan bileşenler için ana hizmet listesi.
// Kaynak: public/locales/{tr,en}/services.json içindeki slug + title alanları.
// (Footer eskiden kullanılmayan data/services.json'u okuyordu; oradaki slug'lar
// güncel olmadığı için her sayfadaki footer linklerinden biri 404 veriyordu.)
export const MAIN_SERVICES = {
  tr: [
    { slug: 'burun-estetigi', title: "Burun Estetiği" },
    { slug: 'antalya-meme-estetigi', title: "Antalya Meme Estetiği" },
    { slug: 'tickle-liposuction', title: "Tickle Liposuction" },
    { slug: 'yuz-estetigi', title: "Yüz Estetiği" },
    { slug: 'vucut-estetigi', title: "Vücut Estetiği" },
  ],
  en: [
    { slug: 'rhinoplasty', title: "Rhinoplasty" },
    { slug: 'breast-surgery-in-turkey', title: "Breast Surgery in Turkey" },
    { slug: 'tickle-liposuction', title: "Tickle Liposuction" },
    { slug: 'facial-aesthetics', title: "Facial Aesthetics" },
    { slug: 'body-aesthetics', title: "Body Aesthetics" },
  ],
};

export const getMainServices = (locale) => MAIN_SERVICES[locale] || MAIN_SERVICES.tr;
