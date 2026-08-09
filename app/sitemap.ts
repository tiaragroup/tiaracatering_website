import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://tiaracatering.com/", lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages: { en: "https://tiaracatering.com/", ar: "https://tiaracatering.com/ar" } } },
    { url: "https://tiaracatering.com/ar", lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: "https://tiaracatering.com/", ar: "https://tiaracatering.com/ar" } } },
  ];
}
