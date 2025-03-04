import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Image from "next/image";

import imgObj from "@/public/img/utils";
import iconObj from "@/public/icons/utils";

import "./style.scss";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation("common");

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='top-section'>
          <div className='left-section'>
            <Image src={imgObj.logoFooter} alt='logo' width={112} height={67} />
          </div>
          <div className='right-section'>
            <div className='contact-section'>
              <h3>{t("contact_title")}</h3>
              <div className='contact-box'>
                <a className='contact-info' href='tel:+380952201500'>
                  <Image
                    src={iconObj.phone}
                    alt='phone'
                    width={24}
                    height={24}
                  />
                  +380 95 220 15 00
                </a>
                <a className='contact-info' href='mailto:ROOHsharing@gmail.com'>
                  <Image
                    src={iconObj.mail}
                    alt='email'
                    width={24}
                    height={24}
                  />
                  ROOHsharing@gmail.com
                </a>
              </div>
            </div>
            <div className='social-section'>
              <h3>{t("social_title")}</h3>
              <div className='social-box'>
                <a
                  href='https://www.instagram.com/rooh_sharing'
                  target='_blank'
                >
                  <Image
                    src={iconObj.instagram}
                    alt='instagram'
                    width={32}
                    height={32}
                  />
                </a>
                <a href='https://t.me/ROOHsharing' target='_blank'>
                  <Image
                    src={iconObj.telegram}
                    alt='facebook'
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div>
            <div className='download-section'>
              <h3>{t("download_title")}</h3>
              <div className='download-box'>
                <a
                  href='https://play.google.com/store/apps/details?id=com.rooh.app'
                  target='_blank'
                >
                  <Image
                    src={imgObj.googlePlay}
                    alt='Google Play Store'
                    width={136}
                    height={40}
                  />
                </a>
                <a
                  href='https://apps.apple.com/ua/app/rooh-ua/id6478281644?l=uk'
                  target='_blank'
                >
                  <Image
                    src={imgObj.appStore}
                    alt='App Store'
                    width={136}
                    height={40}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-section'>
          <div className='left-section'>
            <p className='copyright'>{t("copyright")}</p>
          </div>
          <div className='right-section'>
            <a href='./privacy-policy' className='privacy-policy'>
              {t("privacy_policy_page")}
            </a>
            <a href='./terms-of-service' className='rules'>
              {t("rules_page")}
            </a>
            <a href='./rental-agreement' className='contract'>
              {t("contract_page")}
            </a>
            <a href='./payment-policy' className='payment'>
              {t("payment_page")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
