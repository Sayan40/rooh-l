import { useTranslation } from "next-i18next";
import Image from "next/image";

import imgObj from "@/public/img/utils";

import "./style.scss";

interface AdvantagesCard {
  title: string;
  description: string;
  image: string;
}

interface AdvantagesSectionProps {}

const AdvantagesSection: React.FC<AdvantagesSectionProps> = () => {
  const { t } = useTranslation("common");

  // Получаем массив карточек из переводов
  const cards = t("advantages_cards", {
    returnObjects: true,
  }) as AdvantagesCard[];

  return (
    <section className='advantages-section' id='own_advantages'>
      <div className='container'>
        <h2 className='section-title'>{t("advantages_title")}</h2>
        <div className='advantages-section__cards-container'>
          {cards.map((card, index) => (
            <div key={index} className='advantages-section__card'>
              <div className='advantages-section__img-box'>
                <Image
                  className='img'
                  src={imgObj[card.image]}
                  alt={card.title}
                  priority={true}
                />
              </div>
              <div className='advantages-section__card-info'>
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

export default AdvantagesSection;
