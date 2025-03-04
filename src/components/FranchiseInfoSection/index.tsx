import { useTranslation } from "next-i18next";
import Image from "next/image";

import iconObj from "@/public/icons/utils";

import "./style.scss";

interface FranchiseInfoCard {
  title: string;
  description: string;
  image: string;
}

interface FranchiseInfoSectionProps {}

const FranchiseInfoSection: React.FC<FranchiseInfoSectionProps> = () => {
  const { t } = useTranslation("common");

  // Получаем массив карточек из переводов
  const cards = t("franchise_info_cards", {
    returnObjects: true,
  }) as FranchiseInfoCard[];

  return (
    <section className='franchise-info-section'>
      <div className='container'>
        <div className='franchise-info-section__cards-container'>
          {cards.map((card, index) => (
            <div key={index} className='franchise-info-section__card'>
              <div className='franchise-info-section__img-box'>
                <Image
                  className='img'
                  src={iconObj[card.image]}
                  alt={card.title}
                />
              </div>
              <div className='franchise-info-section__card-info'>
                <h3>{card.title}</h3>
                <h4>{card.description}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FranchiseInfoSection;
