// src/components/LegacyContent/index.tsx
import React from "react";
import "./style.scss";

interface Section {
  section_title: string;
  paragraphs: string[];
}

interface LegalContent {
  title: string;
  legal_name: string;
  sections: Section[];
}

interface LegacyContentProps {
  legalContent: LegalContent;
}

const LegacyContent: React.FC<LegacyContentProps> = ({ legalContent }) => {
  return (
    <section className='legacy-content'>
      <div className='container'>
        <h2>{legalContent.title}</h2>
        <h1>{legalContent.legal_name}</h1>
        {legalContent.sections.map((section, index) => (
          <div key={index} className='section'>
            <h3>{section.section_title}</h3>
            <div className='content'>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LegacyContent;
