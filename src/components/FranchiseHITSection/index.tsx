import { useTranslation } from "next-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination"; // Не забудьте импортировать стили для модуля Pagination
import "./style.scss";

interface Card {
  title: string;
  description: string;
}

interface FranchiseHITSectionProps {}

const FranchiseHITSection: React.FC<FranchiseHITSectionProps> = () => {
  const { t } = useTranslation("common");
  const cards = t("franchise_hit_cards", { returnObjects: true }) as Card[];

  const [progress, setProgress] = useState(0);

  const handleSlideChange = (swiper: any) => {
    const totalSlides = swiper.snapGrid.length - 1;
    const currentIndex = swiper.activeIndex;
    const newProgress = (currentIndex / totalSlides) * 100;
    setProgress(newProgress);
  };

  return (
    <section className='franchise-hit-section'>
      <div className='container'>
        <div className='franchise-hit-section__title-box'>
          <h2 className='franchise-hit-section__title'>
            {t("franchise_hit_title")}
          </h2>
          <h3 className='franchise-hit-section__description'>
            {t("franchise_hit_description")}
          </h3>
        </div>

        <Swiper
          direction={"vertical"}
          spaceBetween={45}
          slidesPerView={2}
          slidesPerGroup={1} // Добавлено
          modules={[Mousewheel]}
          mousewheel={{
            enabled: true,
            releaseOnEdges: true,
            sensitivity: 50,
            forceToAxis: true,
            eventsTarget: ".franchise-hit-section",
          }}
          onSlideChange={handleSlideChange}
          className='franchise-hit-section__slider'
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className='franchise-hit-section__card'>
                <p className='number'>{index + 1}</p>
                <div className='text-info'>
                  <p className='title'>{card.title}</p>
                  <p className='description'>{card.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className='progress-bar'>
            <div
              className='progress-bar__fill'
              style={{ height: `${progress}%` }}
            ></div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default FranchiseHITSection;
