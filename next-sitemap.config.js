/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.NEXT_PUBLIC_ROOH_URL, // Домен сайта
    generateRobotsTxt: true, // Генерировать robots.txt
    sitemapSize: 5000, // Количество URL в одном файле карты сайта
    changefreq: 'monthly', // Частота обновления (по умолчанию)
    priority: 0.7, // Приоритет (по умолчанию)
    exclude: ["/admin*", "/secret"], // Исключенные страницы (если есть)
};

module.exports = config;
