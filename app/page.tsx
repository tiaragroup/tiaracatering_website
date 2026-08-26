import HomePage from "./home-page";
import { CALL_NUMBER } from "./contact-details";

const schema = {
  "@context": "https://schema.org", "@type": "FoodService", name: "Tiara Catering",
  url: "https://tiaracatering.com/", logo: "https://tiaracatering.com/tiara-logo.png",
  image: "https://tiaracatering.com/images/tiara-catering-tables-showcase-event.webp", telephone: CALL_NUMBER,
  email: "info@tiaracatering.com", priceRange: "$$$", servesCuisine: ["Saudi", "International"],
  address: { "@type": "PostalAddress", streetAddress: "7982 King Fahad Road, Olaya District", addressLocality: "Riyadh", addressCountry: "SA" },
  areaServed: { "@type": "City", name: "Riyadh" },
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Catering services", itemListElement: ["Corporate Events", "Weddings & Galas", "Special Events", "Cooking Classes", "Event Consulting"].map(name => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })) },
  sameAs: ["https://www.instagram.com/tiara.catering.sa", "https://www.facebook.com/people/Tiara-Catering-%D8%AA%D9%8A%D8%A7%D8%B1%D8%A7-%D9%83%D9%8A%D8%AA%D8%B1%D9%86%D9%82/61577808929063/", "https://www.linkedin.com/company/tiara-catering/", "https://x.com/Tiaracateriing"]
};

export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><HomePage lang="en" /></>; }
