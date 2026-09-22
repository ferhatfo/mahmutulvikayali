import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nextI18NextConfig from './next-i18next.config.js';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n,

  // Repo dışındaki bir package-lock.json yüzünden Next tracing kökünü yanlış
  // (üst dizin) seçiyordu; kökü projeye sabitliyoruz.
  outputFileTracingRoot: projectRoot,

  // next-i18next çeviri dosyalarını çalışma anında diskten okuyor. Tracing bunları
  // otomatik bulamadığı için serverless fonksiyonda eksik kalıyor ve ISR/on-demand
  // render edilen her sayfa 500 veriyordu.
  outputFileTracingIncludes: {
    '/**': ['./public/locales/**/*.json'],
  },
};

export default nextConfig;
