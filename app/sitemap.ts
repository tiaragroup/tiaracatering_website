import type { MetadataRoute } from "next";

// Required so the route is emitted as a static file under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://tiaracatering.com/", lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages: { en: "https://tiaracatering.com/", ar: "https://tiaracatering.com/ar" } } },
    { url: "https://tiaracatering.com/ar", lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: "https://tiaracatering.com/", ar: "https://tiaracatering.com/ar" } } },
    { url: "https://tiaracatering.com/menus", lastModified, changeFrequency: "monthly", priority: 0.95, alternates: { languages: { en: "https://tiaracatering.com/menus", ar: "https://tiaracatering.com/ar/menus" } } },
    { url: "https://tiaracatering.com/ar/menus", lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: "https://tiaracatering.com/menus", ar: "https://tiaracatering.com/ar/menus" } } },
  ];
}
