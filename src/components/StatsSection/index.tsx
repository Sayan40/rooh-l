import { useTranslation } from "next-i18next";
import CountUp from "react-countup";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface StatsCard {
  icon: string;
  number: string;
  title: string;
}

interface StatsSectionProps {}

const StatsSection: React.FC<StatsSectionProps> = () => {
  const { t } = useTranslation("common");
  const statsCards = t("stats_cards", { returnObjects: true }) as StatsCard[];
  const [isVisible, setIsVisible] = useState(false); // Отслеживаем видимость секции
  const sectionRef = useRef<HTMLElement | null>(null); // Реф для секции

  // Используем Intersection Observer для отслеживания видимости секции
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.3, // Секция будет считаться видимой, когда 30% её площади появится на экране
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Анимация запустится, когда секция станет видимой
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
    <section className='stats-section' id='stats' ref={sectionRef}>
      <div className='container'>
        <div className='stats-cards'>
          {statsCards.map((card, index) => (
            <div key={index} className='stats-card'>
              <div className='icon-box'>
                <Image
                  src={iconObj[card.icon]}
                  alt={card.title}
                  width={120}
                  height={120}
                />
              </div>
              <div className='stats-number'>
                {isVisible && ( // Анимация срабатывает только если секция видима
                  <CountUp
                    start={0}
                    end={parseInt(card.number.replace(/[^0-9]/g, ""))}
                    duration={3}
                    suffix={card.number.includes("+") ? "+" : ""}
                  />
                )}
              </div>
              <div className='stats-title'>{card.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
