import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import LegacyContent from "@/src/components/LegacyContent";
import Footer from "@/src/components/Footer";

import "@/src/app/globals.scss";

export default function TermsOfService() {
  const { t } = useTranslation("common");

  // Получаем данные правовых документов из переводов
  const legalContent = t("terms-of-service", { returnObjects: true }) as {
    title: string;
    legal_name: string;
    sections: {
      section_title: string;
      paragraphs: string[];
    }[];
  };

  const canonicalUrl = `${process.env.NEXT_PUBLIC_ROOH_URL}/terms-of-service`;

  return (
    <div id='main'>
      <HeadComponent
        pageTitle={t("terms-of-service-page-title")}
        pageDescription={t("terms-of-service-page-title")}
        pageUrl={canonicalUrl}
      />
      <Header />

      <LegacyContent legalContent={legalContent} />

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
