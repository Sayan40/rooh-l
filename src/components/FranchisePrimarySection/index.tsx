import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";

import imgObj from "@/public/img/utils";

import "./style.scss";

interface PrimaryFranchiseSectionProps {}

const PrimaryFranchiseSection: React.FC<PrimaryFranchiseSectionProps> = () => {
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
    <section className='franchise-primary-section'>
      <div className='container'>
        <div className='franchise-primary-section__info_block'>
          <div className='franchise-primary-section__text-info'>
            <h1 className='franchise-primary-section__title'>
              {t("franchise_primary_title_1")}{" "}
              <span className='red'>{t("franchise_primary_title_2")}</span>{" "}
            </h1>
            <p className='franchise-primary-section__description'>
              {t("franchise_primary_description")}
            </p>
          </div>
          <div className='btn-container'>
            <a href='/franchise#git' className='btn btn-primary'>
              {t("join_us")}
            </a>
          </div>
        </div>
        <div className='franchise-primary-section__img-box'>
          <Image
            src={
              isMobile
                ? imgObj.FranchisePrimarySectionImgSm
                : imgObj.FranchisePrimarySectionImgLg
            }
            alt='Rooh franchise'
            priority={true}
            width={isMobile ? 320 : 600}
            height={isMobile ? 372 : 400}
          />
        </div>
      </div>
    </section>
  );
};

export default PrimaryFranchiseSection;
