import Slideshow from "@/components/organisms/Slideshow";
import { Montserrat, Playfair_Display } from "next/font/google";
import AboutSection from "@/components/organisms/AboutSection";
import ServicesSection from "@/components/organisms/ServicesSection";
import BlogSection from "@/components/organisms/BlogSection";
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Mahmut Ulvi Kayali</title>
        <meta name="description" content="Mahmut Ulvi Kayali" />
      </Head>
      <main>
        <Slideshow/>
        <AboutSection/>
        <ServicesSection/>
        <BlogSection
          isIndex={true}
        />
      </main>
    </>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar', 'common', 'slideshow', 'about', 'aboutSection', 'services', 'footer', 'blog'])),
    },
  };
}