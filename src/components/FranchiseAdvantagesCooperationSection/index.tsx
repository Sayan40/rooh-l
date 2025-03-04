import { useTranslation } from "next-i18next";
import Image from "next/image";

import imgObj from "@/public/img/utils";

import "./style.scss";

interface AdvantagesOfCooperationCard {
  title: string;
  description: string;
  image: string;
}

interface AdvantagesOfCooperationSectionProps {}

const AdvantagesOfCooperationSection: React.FC<
  AdvantagesOfCooperationSectionProps
> = () => {
  const { t } = useTranslation("common");

  // Получаем массив карточек из переводов
  const cards = t("advantages_of_cooperation_cards", {
    returnObjects: true,
  }) as AdvantagesOfCooperationCard[];

  return (
    <section className='advantages-of-cooperation-section'>
      <div className='container'>
        <h2 className='advantages-of-cooperation-section__title section-title'>
          {t("advantages_of_cooperation_title_1")}{" "}
          <span className='red'>{t("advantages_of_cooperation_title_2")}</span>
        </h2>

        <div className='advantages-of-cooperation-section__cards-container'>
          {cards.map((card, index) => (
            <div
              key={index}
              className='advantages-of-cooperation-section__card'
            >
              <div className='advantages-of-cooperation-section__img-box'>
                <Image
                  className='img'
                  src={imgObj[card.image]}
                  alt={card.title}
                  priority={true}
                />
              </div>
              <div className='advantages-of-cooperation-section__card-info'>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesOfCooperationSection;
