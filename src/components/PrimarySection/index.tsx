import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Image from "next/image";

import imgObj from "@/public/img/utils";

import "./style.scss";

interface PrimarySectionProps {}

const PrimarySection: React.FC<PrimarySectionProps> = () => {
  const { t } = useTranslation("common");
  const [downloadLink, setDownloadLink] = useState<string>(
    "https://apps.apple.com/ua/app/rooh-ua/id6478281644?l=uk"
  ); // По умолчанию ссылка на App Store
  const [isMobile, setIsMobile] = useState<boolean>(false); // Определяем мобильное устройство

  useEffect(() => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window !== "undefined") {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;

      if (/android/i.test(userAgent)) {
        // Пользователь на Android
        setDownloadLink(
          "https://play.google.com/store/apps/details?id=com.rooh.app"
        );
      } else {
        // Все остальные платформы — ссылка на App Store (по умолчанию)
        setDownloadLink(
          "https://apps.apple.com/ua/app/rooh-ua/id6478281644?l=uk"
        );
      }

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
    <section className='primary-section' id='about_us'>
      <div className='container'>
        <div className='primary-section__info_block'>
          <div className='primary-section__text-info'>
            <h1 className='primary-section__title'>
              {t("primary_title_1")}{" "}
              <span className='red'>{t("primary_title_2")}</span>{" "}
              {t("primary_title_3")}
            </h1>
            <p className='primary-section__description'>
              {t("primary_description")}
            </p>
          </div>
          <div className='btn-container'>
            {downloadLink && (
              <a href={downloadLink} className='btn btn-primary'>
                {t("download")}
              </a>
            )}
            <a href='/franchise' className='btn btn-secondary'>
              {t("about_franchise")}
            </a>
          </div>
        </div>
        <div className='primary-section__img-box'>
          <Image
            src={
              isMobile ? imgObj.primarySectionImgSm : imgObj.primarySectionImgLg
            }
            alt='Rooh'
            priority={true}
            layout='contain'
            width={isMobile ? 320 : 600}
            height={isMobile ? 372 : 400}
          />
        </div>
      </div>
    </section>
  );
};

export default PrimarySection;
