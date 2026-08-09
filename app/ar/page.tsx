import type { Metadata } from "next";
import HomePage from "../home-page";

export const metadata: Metadata = {
  title: "تيارا للضيافة | تموين وضيافة فاخرة في الرياض",
  description: "تيارا للضيافة في الرياض للمناسبات والشركات والأعراس والحفلات الخاصة ودروس الطهي والاستشارات المتكاملة.",
  keywords: ["ضيافة الرياض", "تموين الرياض", "ضيافة مناسبات", "ضيافة أعراس الرياض", "كيترنق الرياض"],
  alternates: { canonical: "/ar", languages: { "en-SA": "/", "ar-SA": "/ar", "x-default": "/" } },
  openGraph: { locale: "ar_SA", alternateLocale: "en_SA", url: "/ar", title: "تيارا للضيافة | كن ضيفاً في مناسبتك الخاصة", description: "الإرث السعودي يلتقي بالحرفة الحديثة في تجربة ضيافة متكاملة من الرياض.", images: [{ url: "/og.png", width: 1734, height: 907 }] },
  other: { "content-language": "ar-SA" },
};

const schema = { "@context": "https://schema.org", "@type": "FoodService", name: "تيارا للضيافة", alternateName: "Tiara Catering", url: "https://tiaracatering.com/ar", telephone: "+966112733888", email: "info@tiaracatering.com", address: { "@type": "PostalAddress", streetAddress: "٧٩٨٢ طريق الملك فهد، حي العليا", addressLocality: "الرياض", addressCountry: "SA" }, areaServed: "الرياض" };
export default function ArabicPage() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><HomePage lang="ar" /></>; }
