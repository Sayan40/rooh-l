import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import LegacyContent from "@/src/components/LegacyContent";
import Footer from "@/src/components/Footer";

import "@/src/app/globals.scss";

export default function PrivacyPolicy() {
  const { t } = useTranslation("common");

  const legalContent = t("privacy-policy", { returnObjects: true }) as {
    title: string;
    legal_name: string;
    sections: {
      section_title: string;
      paragraphs: string[];
    }[];
  };

  const canonicalUrl = `${process.env.NEXT_PUBLIC_ROOH_URL}/privacy-policy`;

  return (
    <div id='main'>
      <HeadComponent
        pageTitle={t("privacy-policy-page-title")}
        pageDescription={t("privacy-policy-page-title")}
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
