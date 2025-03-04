import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import PrimaryFranchiseSection from "@/src/components/FranchisePrimarySection";
import FranchiseInfoSection from "@/src/components/FranchiseInfoSection";
import FranchiseWhyUsSection from "@/src/components/FranchiseWhyUsSection";
import AdvantagesOfCooperationSection from "@/src/components/FranchiseAdvantagesCooperationSection";
import FranchiseHITSection from "@/src/components/FranchiseHITSection";
import FranchiseAboutProfitSection from "@/src/components/FranchiseAboutProfitSection";
import OurEquipmentSection from "@/src/components/FranchiseOurEquipmentSection";
import FranchiseCreatorSection from "@/src/components/FranchiseCreatorSection";
import FaqSection from "@/src/components/FAQSection";
import FranchiseGITSection from "@/src/components/FranchiseGITSection";
import Footer from "@/src/components/Footer";

import "@/src/app/globals.scss";

export default function Franchise() {
  const { t } = useTranslation("common");

  const canonicalUrl = `${process.env.NEXT_PUBLIC_ROOH_URL}/franchise`;

  return (
    <div id='main'>
      <HeadComponent
        pageTitle={t("franchise_page_title")}
        pageDescription={t("franchise_page_description")}
        pageUrl={canonicalUrl}
      />
      <Header />
      <PrimaryFranchiseSection />
      <FranchiseInfoSection />
      <FranchiseWhyUsSection />
      <AdvantagesOfCooperationSection />
      <FranchiseHITSection />
      <FranchiseAboutProfitSection />
      <OurEquipmentSection />
      <FranchiseCreatorSection />
      <FaqSection />
      <FranchiseGITSection />
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
