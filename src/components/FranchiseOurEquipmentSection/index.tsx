import { useTranslation } from "next-i18next";
import Image from "next/image";

import imgObj from "@/public/img/utils";

import "./style.scss";

interface AdvantagesOfCooperationCard {
  image: string;
  model_name: string;
  occasion_info: string;
  battery_info: string;
  max_speed_info: string;
  tires_info: string;
  charging_time_info: string;
}

interface OurEquipmentSectionProps {}

const OurEquipmentSection: React.FC<OurEquipmentSectionProps> = () => {
  const { t } = useTranslation("common");

  // Получаем массив карточек из переводов
  const cards = t("our_equipment_cards", {
    returnObjects: true,
  }) as AdvantagesOfCooperationCard[];

  return (
    <section className='our-equipment-section'>
      <div className='container'>
        <div className='our-equipment-section__title-box'>
          <h2 className='our-equipment-section__title section-title'>
            {t("our_equipment_title")}
          </h2>
          <h3 className='our-equipment-section__description'>
            {t("our_equipment_description")}
          </h3>
        </div>
        <div className='our-equipment-section__cards-container'>
          {cards.map((card, index) => (
            <div key={index} className='our-equipment-section__card'>
              <div className='our-equipment-section__img-box'>
                <Image
                  className='img'
                  src={imgObj[card.image]}
                  alt={card.model_name}
                  priority={true}
                />
              </div>
              <div className='our-equipment-section__card-info'>
                <div className='our-equipment-section__card-characteristics'>
                  <h3 className='our-equipment-section__card-model'>
                    {card.model_name}
                  </h3>
                  <div className='our-equipment-section__card-characteristics-list'>
                    <div className='our-equipment-section__card-characteristics-list-item'>
                      <p className='characteristics-name'>{t("occasion")}</p>
                      <p className='characteristics-value'>
                        {card.occasion_info}
                      </p>
                    </div>
                    <div className='our-equipment-section__card-characteristics-list-item'>
                      <p className='characteristics-name'>{t("battery")}</p>
                      <p className='characteristics-value'>
                        {card.battery_info}
                      </p>
                    </div>
                    <div className='our-equipment-section__card-characteristics-list-item'>
                      <p className='characteristics-name'>{t("max_speed")}</p>
                      <p className='characteristics-value'>
                        {card.max_speed_info}
                      </p>
                    </div>
                    <div className='our-equipment-section__card-characteristics-list-item'>
                      <p className='characteristics-name'>{t("tires")}</p>
                      <p className='characteristics-value'>{card.tires_info}</p>
                    </div>
                    <div className='our-equipment-section__card-characteristics-list-item'>
                      <p className='characteristics-name'>
                        {t("charging_time")}
                      </p>
                      <p className='characteristics-value'>
                        {card.charging_time_info}
                      </p>
                    </div>
                  </div>
                </div>
                <a className='btn btn-primary' href='/franchise#git'>
                  {t("join_us")}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurEquipmentSection;
