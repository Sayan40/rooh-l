import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";

import imgObj from "@/public/img/utils";

import "./style.scss";

interface FranchiseCreatorSectionProps {}

const FranchiseCreatorSection: React.FC<FranchiseCreatorSectionProps> = () => {
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
    <section className='franchise-creator-section'>
      <div className='container'>
        <div className='franchise-creator-section__img-box'>
          <Image
            src={
              isMobile
                ? imgObj.FranchiseWhyUsSectionImgLg
                : imgObj.FranchiseWhyUsSectionImgLg
            }
            alt='Rooh CEO'
            priority={true}
            width={isMobile ? 320 : 600}
            height={isMobile ? 372 : 400}
          />
        </div>
        <div className='franchise-creator-section__info_block'>
          <div className='franchise-creator-section__text-info'>
            <p className='franchise-creator-section__words'>
              {t("creator_words")}
            </p>
            <div className='franchise-creator-section__content'>
              <h3 className='franchise-creator-section__name'>
                {t("creator_name")}
              </h3>
              <p className='franchise-creator-section__role red'>
                {t("creator_role")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseCreatorSection;
