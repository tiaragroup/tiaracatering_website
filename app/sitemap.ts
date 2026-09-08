import type { MetadataRoute } from "next";

// Required so the route is emitted as a static file under `output: "export"`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://tiaracatering.com/", lastModified, changeFrequency: "monthly", priority: 1, alternates: { languages: { en: "https://tiaracatering.com/", ar: "https://tiaracatering.com/ar" } } },
    { url: "https://tiaracatering.com/ar", lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: "https://tiaracatering.com/", ar: "https://tiaracatering.com/ar" } } },
    // The English /menus route is unpublished (TG-1132/TG-1133) and returns a 404, so it is
    // listed neither as its own entry nor as the `en` alternate of the Arabic menus page.
    { url: "https://tiaracatering.com/ar/menus", lastModified, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { ar: "https://tiaracatering.com/ar/menus" } } },
  ];
}
