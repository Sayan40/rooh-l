// next-i18next.config.js

module.exports = {
    i18n: {
        defaultLocale: 'uk',
        locales: ['uk', 'en'],
    },
    localePath: './public/locales',
    localeExtension: 'json',
    localeStructure: '{{lng}}/{{ns}}',
    fallbackLng: 'uk',
    detection: {
        order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['cookie', 'localStorage'],
    },
    supportedLngs: ['uk', 'en'],
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    returnObjects: true,
    // Добавляем переопределение языка
    lng: 'uk',
    resources: {
        uk: {
            common: require('./public/locales/uk/common.json'),
        },
        en: {
            common: require('./public/locales/en/common.json'),
        },
    },
};
