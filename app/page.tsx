import HomePage from "./home-page";

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "FoodService",
  name: "Tiara Catering",
  url: "https://tiaracatering.com",
  logo: "https://tiaracatering.com/tiara-logo.png",
  image: "https://tiaracatering.com/wp-content/uploads/2017/09/cooking-classes-7-1.jpg",
  telephone: "+966112733888",
  email: "info@tiaracatering.com",
  priceRange: "$$$",
  servesCuisine: ["Saudi", "International"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "7982 King Fahad Road, Olaya District",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  areaServed: { "@type": "City", name: "Riyadh" },
  sameAs: [
    "https://www.instagram.com/tiara.catering.sa",
    "https://www.facebook.com/people/Tiara-Catering-%D8%AA%D9%8A%D8%A7%D8%B1%D8%A7-%D9%83%D9%8A%D8%AA%D8%B1%D9%86%D9%82/61577808929063/",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <HomePage />
    </>
  );
}
