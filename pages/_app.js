import "@/styles/globals.css";
import Navbar from "@/components/organisms/Navbar";
import WhatsAppButton from "@/components/atoms/WhatsAppButton/WhatsAppButton";
import Footer from "@/components/organisms/Footer";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Component {...pageProps} key={router.asPath} />
      <WhatsAppButton />
      <Footer />
    </>
  );
}

export default appWithTranslation(App);