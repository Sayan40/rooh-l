import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import SwiperCore from "swiper";
import { useRef, useState, useEffect } from "react";

import iconObj from "@/public/icons/utils";

import "swiper/css";
import "./style.scss";

interface GallerySectionProps {
  images: string[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  const { t } = useTranslation("common");
  const swiperRef = useRef<SwiperCore>();
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 550);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSlideChange = (index: number) => setActiveSlide(index);

  return (
    <section className='gallery-section' id='gallery'>
      <div className='container'>
        <div className='gallery-section__header'>
          <h2 className='section-title'>{t("gallery_title")}</h2>
        </div>
        <div className='gallery-section__content'>
          <Swiper
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={20}
            mousewheel={true}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => handleSlideChange(swiper.realIndex)}
            modules={[Mousewheel]}
            className='gallery-section__swiper'
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className='image-container'>
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    width={446}
                    height={446}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Кастомная пагинация */}
          <div className='custom-pagination'>
            {images.map((_, index) => (
              <div
                key={index}
                className={`pagination-dot ${
                  activeSlide === index ? "active" : ""
                }`}
                onClick={() => swiperRef.current?.slideTo(index)}
              ></div>
            ))}
          </div>

          {/* Навигация для десктопа */}
          {!isMobile && (
            <div className='custom-navigation'>
              <button
                className='custom-prev'
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <Image
                  src={iconObj.arrowLeft}
                  alt='Previous Image'
                  width={32}
                  height={32}
                />
              </button>
              <button
                className='custom-next'
                onClick={() => swiperRef.current?.slideNext()}
              >
                <Image
                  src={iconObj.arrowRight}
                  alt='Next Image'
                  width={32}
                  height={32}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
