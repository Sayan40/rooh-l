import fs from "fs";
import path from "path";
import Script from "next/script";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import PrimarySection from "@/src/components/PrimarySection";
import AdvantagesSection from "@/src/components/AdvantagesSection";
import HITSection from "@/src/components/HITSection";
import TariffSection from "@/src/components/TariffSection";
import StatsSection from "@/src/components/StatsSection";
import GallerySection from "@/src/components/GallerySection";
import FaqSection from "@/src/components/FAQSection";
import Footer from "@/src/components/Footer";

import "@/src/app/globals.scss";

export default function Home({ images }: { images: string[] }) {
  const { t } = useTranslation("common");

  return (
    <div id="main">
      <HeadComponent
        pageTitle={t("main_page_title")}
        pageDescription={t("main_page_description")}
      />

      <Script id="redirect-script" strategy="afterInteractive">
        {`
          (function () {
            var urlParams = new URLSearchParams(window.location.search);
            var appStore = 'https://apps.apple.com/app/rooh-ua/id6478281644';
            var googlePlay = 'https://play.google.com/store/apps/details?id=com.rooh.app';

            if (urlParams.has('qr')) {
              var userAgent = navigator.userAgent || navigator.vendor || window.opera;
              var isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
              var isAndroid = /android/i.test(userAgent);

              if (isIOS) {
                window.location.href = appStore;
              } else if (isAndroid) {
                window.location.href = googlePlay;
              }
            }
          })();
        `}
      </Script>
      <Header />
      <PrimarySection />
      <AdvantagesSection />
      <HITSection />
      <TariffSection />
      <StatsSection />
      <GallerySection images={images} />
      <FaqSection />
      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const imagesDirectory = path.join(process.cwd(), "public/img/GallerySection");
  const imageFiles = fs.readdirSync(imagesDirectory);
  const images = imageFiles.map((file) => `/img/GallerySection/${file}`);

  return {
    props: {
      images,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
