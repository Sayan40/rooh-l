import { useTranslation } from "next-i18next";
import React, { useState } from "react";

import "./style.scss";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {}

const FaqSection: React.FC<FaqSectionProps> = () => {
  const { t } = useTranslation("common");
  const faqItems = t("faq_cards", { returnObjects: true }) as FaqItem[];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className='faq-section' id='faq'>
      <div className='container'>
        <div className='faq-section__header'>
          <h2 className='section-title'>{t("faq_title")}</h2>
        </div>
        <div className='faq-section__content'>
          {faqItems.map((item, index) => (
            <div
              className={`accordion-item ${
                activeIndex === index ? "active" : ""
              }`}
              key={index}
            >
              <div
                className='accordion-header'
                onClick={() => toggleAccordion(index)}
              >
                <h3 className='accordion-question'>{item.question}</h3>
                <div
                  className={`accordion-icon ${
                    activeIndex === index ? "rotated" : ""
                  }`}
                >
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className='accordion-content'>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
