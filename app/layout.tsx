import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./menus/menu.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tiaracatering.com"),
  title: { default: "Tiara Catering | Luxury Catering in Riyadh", template: "%s | Tiara Catering" },
  description: "Luxury catering in Riyadh for corporate events, weddings, private celebrations, cooking classes and bespoke event consulting.",
  keywords: ["catering Riyadh", "luxury catering Riyadh", "wedding catering Saudi Arabia", "corporate catering Riyadh", "تموين الرياض", "ضيافة الرياض"],
  alternates: { canonical: "/", languages: { "en-SA": "/", "ar-SA": "/ar", "x-default": "/" } },
  openGraph: {
    type: "website",
    locale: "en_SA",
    alternateLocale: "ar_SA",
    url: "/",
    siteName: "Tiara Catering",
    title: "Tiara Catering | Be a guest at your own celebration",
    description: "Saudi heritage meets modern culinary craft in Riyadh.",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Tiara Catering — Be a guest at your own celebration" }],
  },
  twitter: { card: "summary_large_image", title: "Tiara Catering Riyadh", description: "Be a guest at your own celebration.", images: ["/og.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/tiara-mark.png", apple: "/tiara-mark.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbf8f3" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
