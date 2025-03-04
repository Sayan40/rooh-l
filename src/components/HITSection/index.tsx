import { useTranslation } from "next-i18next";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Mousewheel, Pagination } from "swiper/modules";
import Image from "next/image";

import imgObj from "@/public/img/utils";

import "swiper/css";
import "./style.scss";

interface Card {
  title: string;
  description: string;
  image: string;
}

interface HowItWorksSectionProps {}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = () => {
  const { t } = useTranslation("common");
  const cards = t("how_it_works_cards", { returnObjects: true }) as Card[];
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperCore>();
  const paginationContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Определяем ширину экрана
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Прокрутка контейнера пагинации при изменении activeIndex
  useEffect(() => {
    if (
      paginationContainerRef.current &&
      itemRefs.current[activeIndex] &&
      !isMobile // Не выполняем на мобильных
    ) {
      const container = paginationContainerRef.current;
      const activeItem = itemRefs.current[activeIndex];

      // Вычисляем желаемую позицию прокрутки
      const activeItemTop = activeItem.offsetTop;
      const visibleOffset = 20; // Настройте это значение, чтобы показать немного предыдущего элемента

      let scrollPosition = activeItemTop - visibleOffset;

      // Убедимся, что позиция прокрутки находится в пределах допустимых значений
      if (scrollPosition < 0) scrollPosition = 0;
      if (scrollPosition > container.scrollHeight - container.clientHeight) {
        scrollPosition = container.scrollHeight - container.clientHeight;
      }

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [activeIndex, isMobile]);

  // Состояние для аккордеона
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<
    number | null
  >(
    0 // Устанавливаем первый аккордеон открытым по умолчанию
  );

  const toggleAccordion = (index: number) => {
    setActiveAccordionIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <section className='how-it-works-section' id='how_it_works'>
      <h2 className='section-title'>{t("how_it_works_title")}</h2>
      {!isMobile ? (
        // **Десктопная версия**
        <div className='how-it-works-section__container'>
          <div className='pagination-container' ref={paginationContainerRef}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={`pagination-item ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => swiperRef.current?.slideTo(index)}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                <div className='text-info'>
                  <p className='number'>{index + 1}</p>
                  <p className='title'>{card.title}</p>
                </div>
                <p className='description'>{card.description}</p>
              </div>
            ))}
          </div>
          <Swiper
            direction={"vertical"}
            spaceBetween={50}
            modules={[Mousewheel, Pagination]}
            mousewheel={{
              enabled: true,
              eventsTarget: ".how-it-works-section__container",
              releaseOnEdges: true,
              sensitivity: 50, // Увеличиваем чувствительность
              forceToAxis: true, // Принудительная вертикальная прокрутка
            }}
            pagination={{
              dynamicBullets: true,
            }}
            className='how-it-works-section__slider'
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div className='image-wrapper'>
                  <Image
                    src={imgObj[card.image]}
                    alt={card.title}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        // **Мобильная версия**
        <div className='accordion-container'>
          {cards.map((card, index) => (
            <div
              key={index}
              className={`accordion-item ${
                activeAccordionIndex === index ? "active" : ""
              }`}
            >
              <div
                className='accordion-header'
                onClick={() => toggleAccordion(index)}
              >
                <div className='header-content'>
                  <div className='number'>{index + 1}</div>
                  <p className='title'>{card.title}</p>
                </div>
                <div
                  className={`icon ${
                    activeAccordionIndex === index ? "rotated" : ""
                  }`}
                >
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div
                className='accordion-body'
                style={
                  activeAccordionIndex === index
                    ? { maxHeight: "750px" }
                    : { maxHeight: "0px" }
                }
              >
                <p className='description'>{card.description}</p>
                <div className='image-wrapper'>
                  <Image
                    src={imgObj[card.image]}
                    alt={card.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HowItWorksSection;
