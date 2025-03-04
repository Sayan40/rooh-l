import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import LegacyContent from "@/src/components/LegacyContent";
import Footer from "@/src/components/Footer";

import "@/src/app/globals.scss";

export default function RentalAgreement() {
  const { t } = useTranslation("common");

  // Получаем данные правовых документов из переводов
  const legalContentPart1 = t("rental-agreement", { returnObjects: true }) as {
    title: string;
    legal_name: string;
    sections: {
      section_title: string;
      paragraphs: string[];
    }[];
  };

  const legalContentPart2 = t("rental-agreement-part-2", {
    returnObjects: true,
  }) as {
    title: string;
    legal_name: string;
    sections: {
      section_title: string;
      paragraphs: string[];
    }[];
  };

  const canonicalUrl = `${process.env.NEXT_PUBLIC_ROOH_URL}/rental-agreement`;

  return (
    <div id='rental-agreement'>
      <HeadComponent
        pageTitle={t("rental-agreement-page-title")}
        pageDescription={t("rental-agreement-page-title")}
        pageUrl={canonicalUrl}
      />
      <Header />

      <LegacyContent legalContent={legalContentPart1} />
      <LegacyContent legalContent={legalContentPart2} />
      <div className='container table-container'>
        <p className='section-title'>ПІДПИСИ СТОРІН</p>
        <div className='table'>
          <div className='left-side'>
            <p className='bold'>НАЙМОДАВЕЦЬ</p>
            <p className='bold'>ФОП Чесноков Владислав Дмитрович</p>
            <p>РНОКПП 3440404019</p>
            <p>
              Адреса: 62418, Харківська обл., Харківський р-он, селище Пісочин,
              вул. Європейська, буд. 1а, кв. 25
            </p>
            <p>IBAN: UA163220010000026000340068127</p>
            <p>Тел.:+380968052445</p>
            <p>E-mail: vladyslav.chesnokov@gmail.com </p>
            <p>Платник єдиного податку 2 групи</p>
            <p className='bold'>ФОП Чесноков В. Д.</p>
          </div>
          <div className='right-side'>
            <p className='bold'>НАЙМАЧ</p>
            <p>
              повнолітня дієздатна фізична особа (громадянин України, іноземець,
              особа без громадянства), яка акцептувала оферту публічного
              Договору про надання послуг прокату електросамокату у порядку,
              передбаченому умовами Договору
            </p>
          </div>
        </div>
      </div>

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
