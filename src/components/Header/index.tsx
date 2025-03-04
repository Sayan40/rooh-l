import { useState, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import Image from "next/image";

import "./style.scss";

import imgObj from "@/public/img/utils";
import iconObj from "@/public/icons/utils";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { t, i18n } = useTranslation("common");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const [windowWidth, setWindowWidth] = useState(0); // State for window width
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to change language and preserve scroll position
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    router.push(router.pathname, router.asPath, { locale: lng, scroll: false });
    setIsDropdownOpen(false);
  };

  // Restore language from localStorage on load
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
      router.push(router.pathname, router.asPath, {
        locale: savedLanguage,
        scroll: false,
      });
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 1200) {
        setIsMenuOpen(false);
        document.body.classList.remove("no-scroll");
      }
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Block scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);

  // Current language
  const currentLanguage = i18n.language || "uk";

  // Active section state
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sectionIds = [
      "about_us",
      "own_advantages",
      "how_it_works",
      "tariffs",
      "faq",
    ];

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header>
      <div className='container'>
        <a href='/' className='logo-link'>
          <Image
            src={imgObj.logo}
            alt='logo'
            width={94}
            height={42}
            priority={true}
          />
        </a>
        {windowWidth > 1200 && (
          <nav>
            {[
              "about_us",
              "own_advantages",
              "how_it_works",
              "tariffs",
              "faq",
            ].map((id) => (
              <a
                key={id}
                href={`/#${id}`}
                className={activeSection === id ? "active" : ""}
              >
                {t(id)}
              </a>
            ))}
            <a
              href='/franchise'
              className={router.pathname === "/franchise" ? "active" : ""}
            >
              {t("franchise")}
            </a>
          </nav>
        )}
        <div className='content'>
          <div
            className={`lang-select ${isDropdownOpen ? "active" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={dropdownRef}
          >
            <div className='selected'>
              <Image
                src={iconObj[currentLanguage]}
                alt={currentLanguage}
                width={18}
                height={18}
              />
              <p>{currentLanguage.toUpperCase()}</p>
            </div>
            <Image
              src={iconObj.triangleDown}
              alt='down'
              width={24}
              height={24}
            />
            <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
              <div
                className='dropdown-item'
                onClick={() => changeLanguage("uk")}
              >
                <Image
                  src={iconObj.uk}
                  alt='Ukrainian'
                  width={18}
                  height={18}
                />
                <p>{t("uk")}</p>
              </div>
              <div
                className='dropdown-item'
                onClick={() => changeLanguage("en")}
              >
                <Image src={iconObj.en} alt='English' width={18} height={18} />
                <p>{t("en")}</p>
              </div>
            </div>
          </div>
          {windowWidth <= 1200 && (
            <>
              <div
                id='menu-trigger'
                className={`menu-trigger ${isMenuOpen ? "open" : ""}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </>
          )}
          {windowWidth > 1200 && (
            <div className='download-btns'>
              <a
                target='_blank'
                href='https://play.google.com/store/apps/details?id=com.rooh.app'
              >
                <Image
                  className='download-btn'
                  src={imgObj.googlePlay}
                  alt='Google Play Store'
                  width={136}
                  height={40}
                  priority={true}
                />
              </a>
              <a
                target='_blank'
                href='https://apps.apple.com/ua/app/rooh-ua/id6478281644?l=uk'
              >
                <Image
                  className='download-btn'
                  src={imgObj.appStore}
                  alt='App Store'
                  width={136}
                  height={40}
                  priority={true}
                />
              </a>
            </div>
          )}
        </div>
      </div>
      {windowWidth <= 1200 && (
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <div className='container'>
            <nav>
              {[
                "about_us",
                "own_advantages",
                "how_it_works",
                "tariffs",
                "faq",
              ].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={activeSection === id ? "active" : ""}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(id)}
                </a>
              ))}
              <a href='/franchise' onClick={() => setIsMenuOpen(false)}>
                {t("franchise")}
              </a>
            </nav>
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
      )}
    </header>
  );
};

export default Header;
