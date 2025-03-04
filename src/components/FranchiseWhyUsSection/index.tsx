import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";

import imgObj from "@/public/img/utils";

import "./style.scss";

interface FranchiseWhyUsSectionProps {}

const FranchiseWhyUsSection: React.FC<FranchiseWhyUsSectionProps> = () => {
  const { t } = useTranslation("common");
  const [isMobile, setIsMobile] = useState<boolean>(false); // Определяем мобильное устройство

  useEffect(() => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window !== "undefined") {
      // Проверяем ширину экрана для определения мобильной версии
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Пороговое значение для мобильных устройств
      };

      handleResize(); // Проверка при первой загрузке
      window.addEventListener("resize", handleResize); // Обработчик изменения размера

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <section className='franchise-why-us-section'>
      <div className='container'>
        <div className='franchise-why-us-section__img-box'>
          <Image
            src={
              isMobile
                ? imgObj.FranchiseWhyUsSectionImgLg
                : imgObj.FranchiseWhyUsSectionImgLg
            }
            alt='Rooh franchise'
            priority={true}
            width={isMobile ? 320 : 600}
            height={isMobile ? 372 : 400}
          />
        </div>
        <div className='franchise-why-us-section__info_block'>
          <div className='franchise-why-us-section__text-info'>
            <h2 className='franchise-why-us-section__title'>
              {t("franchise_why_us_title")}{" "}
            </h2>
            <p className='franchise-why-us-section__description'>
              {t("franchise_why_us_description")}
            </p>
          </div>
          <div className='btn-container'>
            <a href='/franchise#git' className='btn btn-primary'>
              {t("franchise_why_us_btn")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseWhyUsSection;
