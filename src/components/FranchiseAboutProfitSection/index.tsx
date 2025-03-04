import { useTranslation } from "next-i18next";
import CountUp from "react-countup";
import { useState, useEffect, useRef } from "react";

import "./style.scss";

interface AboutProfitSectionProps {}

const AboutProfitSection: React.FC<AboutProfitSectionProps> = () => {
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState(false); // Отслеживаем видимость секции
  const sectionRef = useRef<HTMLElement | null>(null); // Реф для секции

  // Используем Intersection Observer для отслеживания видимости секции
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.3, // Секция считается видимой, когда 30% её площади появляется на экране
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Анимация запустится при видимости секции
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className='about-profit-section' ref={sectionRef}>
      <div className='container'>
        <h4 className='about-profit-section__title section-title'>
          {t("about_profit_title")}
        </h4>
        <h3 className='about-profit-section__numbers'>
          <span>+</span>
          {isVisible ? (
            <CountUp
              start={0}
              end={parseInt(t("about_profit_numbers").replace(/[^0-9]/g, ""))}
              duration={2.5}
              suffix={t("about_profit_numbers").includes("+") ? "+" : ""}
            />
          ) : (
            t("about_profit_numbers")
          )}
          <span>₴</span>
        </h3>
        <h4 className='about-profit-section__description'>
          {t("about_profit_description")}
        </h4>
        <a className='btn btn-primary' href='/franchise#git'>
          {t("join_us")}
        </a>
      </div>
    </section>
  );
};

export default AboutProfitSection;
