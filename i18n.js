import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import nextI18NextConfig from './next-i18next.config';

i18n
    .use(initReactI18next)
    .init({
        ...nextI18NextConfig,
        lng: 'uk',
        fallbackLng: 'uk',
        debug: false,
    });

export default i18n;
