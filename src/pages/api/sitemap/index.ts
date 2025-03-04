import { NextApiRequest, NextApiResponse } from "next";

// Получаем домен из переменных окружения
const siteUrl = process.env.NEXT_PUBLIC_ROOH_URL;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pages = [
    { url: "/", changefreq: "monthly", priority: 1.0 },
    { url: "/franchise", changefreq: "monthly", priority: 0.8 },
    { url: "/privacy-policy", changefreq: "yearly", priority: 0.5 },
    { url: "/terms-of-service", changefreq: "yearly", priority: 0.5 },
    { url: "/rental-agreement", changefreq: "yearly", priority: 0.5 },
    { url: "/payment-policy", changefreq: "yearly", priority: 0.5 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
      <url>
        <loc>${siteUrl}${page.url}</loc>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(sitemap);
}
