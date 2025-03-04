import { useTranslation } from "next-i18next";
import Image from "next/image";

import iconObj from "@/public/icons/utils";
import imgObj from "@/public/img/utils";

import "./style.scss";

interface TariffSectionProps {}

const TariffSection: React.FC<TariffSectionProps> = () => {
  const { t } = useTranslation("common");

  // Получаем карточки из переводов
  const cards = t("tariff_cards", { returnObjects: true }) as Array<{
    title: string;
    price: string;
    icon: string;
  }>;

  // Разделяем карточки на две половины
  const midIndex = Math.ceil(cards.length / 2);
  const leftCards = cards.slice(0, midIndex);
  const rightCards = cards.slice(midIndex);

  return (
    <section className='tariff-section' id='tariffs'>
      <div className='container'>
        <div className='tariff-section__header'>
          <h2 className='section-title'>{t("tariff_title")}</h2>
          <h3 className='section-description'>{t("tariff_description")}</h3>
        </div>
        <div className='tariff-section__content'>
          <div className='tariff-section__cards-left'>
            {leftCards.map((card, index) => (
              <div key={index} className='tariff-card'>
                <Image
                  className='tariff-card__icon'
                  src={iconObj[card.icon]}
                  alt={card.title}
                  width={50}
                  height={50}
                />
                <div className='tariff-card__info'>
                  <h4>{card.title}</h4>
                  <h5>{card.price}</h5>
                </div>
              </div>
            ))}
          </div>

          <div className='tariff-section__scooter'>
            <Image className='img' src={imgObj.Scooter} alt='Scooter' />
          </div>

          <div className='tariff-section__cards-right'>
            {rightCards.map((card, index) => (
              <div key={index} className='tariff-card'>
                <Image
                  className='tariff-card__icon'
                  src={iconObj[card.icon]}
                  alt={card.title}
                  width={50}
                  height={50}
                />
                <div className='tariff-card__info'>
                  <h4>{card.title}</h4>
                  <h5>{card.price}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
        <a href='/payment-policy' className='tariff-section__link'>
          {t("tariff_learn_more")}
        </a>
      </div>
    </section>
  );
};

export default TariffSection;
