import type { Metadata } from "next";
import MenuPage from "../../menus/menu-page";

export const metadata: Metadata = {
  title: "قوائم تيارا للضيافة ٢٠٢٦ | ضيافة الرياض",
  description: "استعرض قوائم تيارا للضيافة ٢٠٢٦ في الرياض. قارن ثلاث باقات متكاملة تبدأ من ٢٨٣ ر.س واطلب عرضاً مخصصاً عبر واتساب.",
  keywords: ["قوائم ضيافة الرياض", "باقات تموين الرياض", "منيو حفلات الرياض", "ضيافة مناسبات", "قائمة تيارا ٢٠٢٦"],
  alternates: { canonical: "/ar/menus", languages: { "en-SA": "/menus", "ar-SA": "/ar/menus", "x-default": "/menus" } },
  openGraph: { locale: "ar_SA", url: "/ar/menus", title: "قوائم تيارا للضيافة ٢٠٢٦", description: "ثلاث قوائم متكاملة لمناسبات الرياض. قارن واختر واطلب عرضك المخصص.", images: [{ url: "/og.png", width: 1734, height: 907 }] },
  other: { "content-language": "ar-SA" },
};
export default function ArabicMenusPage() { return <MenuPage lang="ar" />; }
