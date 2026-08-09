import type { Metadata } from "next";
import MenuPage from "./menu-page";
import { menusEn } from "./menu-data";

export const metadata: Metadata = {
  title: "Catering Menus 2026 | Tiara Catering Riyadh",
  description: "Explore Tiara Catering’s 2026 menus in Riyadh. Compare three complete catering packages from SAR 283 and request a tailored quotation on WhatsApp.",
  keywords: ["catering menus Riyadh", "catering packages Riyadh", "event menu Saudi Arabia", "buffet catering Riyadh", "Tiara Catering menu 2026"],
  alternates: { canonical: "/menus", languages: { "en-SA": "/menus", "ar-SA": "/ar/menus", "x-default": "/menus" } },
  openGraph: { url: "/menus", title: "Tiara Catering Menus 2026", description: "Three complete menus for gatherings in Riyadh. Compare, choose and request your tailored proposal.", images: [{ url: "/og.png", width: 1734, height: 907 }] },
};
const schema = { "@context": "https://schema.org", "@type": "ItemList", name: "Tiara Catering Menus 2026", itemListElement: menusEn.map((menu, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Offer", name: menu.name, price: menu.price, priceCurrency: "SAR", url: `https://tiaracatering.com/menus#${menu.id}`, availability: "https://schema.org/InStock" } })) };
export default function MenusPage() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><MenuPage lang="en" /></>; }
