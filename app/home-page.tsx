"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { CALL_DISPLAY, CALL_HREF, EMAIL, EMAIL_HREF, WHATSAPP_URL } from "./contact-details";

type Lang = "en" | "ar";
const gallery = ["7-1", "1", "3", "8", "2", "4", "6"].map((n) => `/images/cooking-classes-${n}.jpg`);

const copy = {
  en: {
    dir: "ltr", close: "Close",
    quote: "Request a quote", eyebrow: "Culinary atelier · Riyadh",
    hero: ["Be a guest", "at your own", "celebration."],
    intro: "Family dinners, date nights, brunches, galas and weeklong menus — cooked, styled and served by a Riyadh kitchen where Saudi heritage meets modern craft.",
    viewServices: "View services", proof: [["1,200+", "Events served"], ["5", "Service lines"], ["3", "Specialty houses"]],
    ticker: ["Corporate Events", "Weddings & Galas", "Special Events", "Cooking Classes", "Event Consulting", "Private Chef"],
    aboutTag: "About Tiara", aboutTitle: <>Flavours that <em>tell a story</em></>,
    aboutBody: "Welcome to Tiara Catering, where culinary excellence meets the heart of Saudi tradition. Based in Riyadh, we craft unforgettable dining experiences with warm hospitality and modern culinary imagination.",
    highlights: [["Saudi heritage, modern craft", "Traditional recipes reinterpreted with contemporary technique and plating."], ["One team, every detail", "Kitchen, styling, staffing and logistics under one trusted point of contact."], ["Three specialty houses", "Florals, bakery and chocolate in-house — one supplier for the whole table."]],
    servicesTag: "What we do", servicesTitle: <>Five ways to <em>host well</em></>, servicesLead: "Every line is handled end to end, from your first tasting to the last plate cleared.",
    services: [
      ["Corporate Events", "Business events delivered with precision, punctuality and menus shaped around your objectives.", "7-1"],
      ["Weddings & Galas", "Complete celebration catering with exceptional food, elegant styling and gracious service.", "1"],
      ["Special Events", "Distinctive menus and polished hospitality for intimate gatherings and grand occasions.", "8"],
      ["Cooking Classes", "Memorable hands-on experiences led by Tiara’s professional chefs.", "3"],
      ["Event Consulting", "Concept, planning, vendor coordination and on-site management in one place.", "2"],
    ],
    signatureTag: "The signature experience", signatureTitle: <>We take care of <em>all the details</em></>, signatureBody: "Our event consulting pairs expert advice with flawless execution, tailored to your occasion, venue and guests.", start: "Start planning",
    process: [["Discover", "We listen first — guests, setting, mood and the story you want told."], ["Plan", "Menus, staffing and timings mapped against your budget and venue."], ["Design", "Tablescape, service style and plating composed as one visual language."], ["Organise", "Vendor coordination and logistics handled so nothing lands on you."], ["Deliver", "On-site management and polished service from arrival to farewell."]],
    galleryTag: "The gallery", galleryTitle: <>Plated with <em>intention</em></>, galleryHint: "Tap an image to explore",
    brandsTag: "Specialty houses", brandsTitle: <>Our <em>Brands</em></>,
    brands: [["Flower Scent", "Florist", "Where fragrance meets elegance — floral arrangements that tell stories.", "Asset-2-370x343.png", null], ["Baker’s Bakery", "Bakery", "Freshly baked goodness made from traditional recipes and fine ingredients.", "Asset-3-370x343.png", "http://bakerisbakery.com/"], ["éléments du chocolat", "Chocolatier", "The art of fine chocolate, crafted from exceptional cocoa and delicate flavours.", "Asset-1-370x343.png", "https://elementsduchocolat.com/"]],
    testimonialTag: "Client notes", testimonialTitle: <>Hospitality people <em>remember</em></>,
    testimonials: [["Customer service responds quickly and helps you understand everything. I highly recommend Tiara for events, big or small.", "Loubnah", "Private event"], ["Professional and wonderful treatment. The food was delicious, and the customer service was exceptional.", "Mona", "Special occasion"], ["Delicious food, excellent cooking, high quality — and very precise with delivery time.", "Mohammad", "Corporate catering"], ["Distinguished service and delicious food. A unique experience from beginning to end.", "Johara", "Family celebration"]],
    ctaTag: "Begin with your occasion", ctaTitle: <>A table that brings<br />everyone <em>together.</em></>, ctaBody: "Tell us who you’re gathering and how you want it to feel. We’ll create the menu, service and details around your occasion.",
    formTitle: <>Tell us about your <em>occasion</em></>, fields: ["Full name", "Phone", "Email", "Event type", "Event date", "Guests", "Details"], eventOptions: ["Select an event", "Corporate event", "Wedding or gala", "Special event", "Cooking class", "Other"], details: "Location, service style, dietary needs or anything else", send: "Send request on WhatsApp", response: "Usually replies during business hours", contactTag: "Direct contact", address: "2744 Abdullah Al-Ahwani Street, Al Qirawan District, RRQA6432, 6432, Riyadh 13531, Saudi Arabia", whatsapp: "WhatsApp us",
  },
  ar: {
    dir: "rtl", close: "إغلاق",
    quote: "اطلب عرض سعر", eyebrow: "أتيليه الطهي · الرياض",
    hero: ["كن ضيفاً", "في مناسبتك", "الخاصة."],
    intro: "عشاء عائلي أو لقاء خاص أو حفل كبير — نطبخ وننسّق ونقدّم تجربة ضيافة يلتقي فيها الإرث السعودي بالحرفة الحديثة.",
    viewServices: "استعرض الخدمات", proof: [["+١٢٠٠", "مناسبة نُفّذت"], ["٥", "خطوط خدمة"], ["٣", "بيوت متخصصة"]],
    ticker: ["فعاليات الشركات", "الأعراس والحفلات", "المناسبات الخاصة", "دروس الطهي", "استشارات الفعاليات", "الشيف الخاص"],
    aboutTag: "عن تيارا", aboutTitle: <>نكهات <em>تحكي قصة</em></>,
    aboutBody: "مرحباً بكم في تيارا للضيافة، حيث يلتقي التميّز في الطهي بقلب التقاليد السعودية. من الرياض نصنع تجارب ضيافة لا تُنسى بروح دافئة وخيال معاصر.",
    highlights: [["إرث سعودي بحرفة حديثة", "وصفات تقليدية نعيد تقديمها بتقنيات ولمسات معاصرة."], ["فريق واحد لكل التفاصيل", "المطبخ والتنسيق والطاقم والخدمات اللوجستية عبر نقطة اتصال واحدة."], ["ثلاثة بيوت متخصصة", "الزهور والمخبوزات والشوكولاتة تحت سقف واحد لطاولة متكاملة."]],
    servicesTag: "خدماتنا", servicesTitle: <>خمس طرق <em>لضيافة أجمل</em></>, servicesLead: "نتولى كل خدمة من أول تذوق وحتى مغادرة آخر ضيف.",
    services: [["فعاليات الشركات", "ضيافة احترافية دقيقة في المواعيد وقوائم مصممة حول أهدافكم.", "7-1"], ["الأعراس والحفلات", "خدمة متكاملة بطعام استثنائي وتنسيق أنيق وضيافة راقية.", "1"], ["المناسبات الخاصة", "قوائم مميزة وخدمة متقنة للقاءات الحميمة والاحتفالات الكبرى.", "8"], ["دروس الطهي", "تجارب عملية ممتعة بقيادة طهاة تيارا المحترفين.", "3"], ["استشارات الفعاليات", "الفكرة والتخطيط وتنسيق الموردين والإدارة الميدانية في مكان واحد.", "2"]],
    signatureTag: "تجربة تيارا", signatureTitle: <>نهتم <em>بكل التفاصيل</em></>, signatureBody: "تجمع استشاراتنا بين الخبرة والتنفيذ المتقن بما يناسب مناسبتكم وموقعها وضيوفها.", start: "ابدأ التخطيط",
    process: [["نكتشف", "نستمع أولاً إلى تفاصيل الضيوف والمكان والمزاج والقصة."], ["نخطط", "نرسم القوائم والطاقم والتوقيت بما يناسب الميزانية والموقع."], ["نصمم", "ننسّق الطاولة وأسلوب الخدمة والتقديم بلغة بصرية واحدة."], ["ننظّم", "نتولى الموردين والخدمات اللوجستية بالكامل."], ["ننفّذ", "إدارة ميدانية وخدمة متقنة من وصول الضيف حتى الوداع."]],
    galleryTag: "المعرض", galleryTitle: <>تقدم <em>بعناية</em></>, galleryHint: "اضغط على الصورة لاستعراضها",
    brandsTag: "بيوتنا المتخصصة", brandsTitle: <>علاماتنا <em>التجارية</em></>,
    brands: [["فلور سنت", "زهور", "حيث يلتقي العطر بالأناقة — تنسيقات زهور تحكي قصصاً.", "Asset-2-370x343.png", null], ["بيكرز بيكري", "مخبوزات", "مخبوزات طازجة من وصفات تقليدية وأجود المكونات.", "Asset-3-370x343.png", "http://bakerisbakery.com/"], ["إليمنتس دو شوكولا", "شوكولاتة", "فن الشوكولاتة الفاخرة من أجود الكاكاو ومزيج راقٍ من النكهات.", "Asset-1-370x343.png", "https://elementsduchocolat.com/"]],
    testimonialTag: "آراء العملاء", testimonialTitle: <>ضيافة تبقى <em>في الذاكرة</em></>,
    testimonials: [["خدمة العملاء سريعة وتساعدك على فهم كل شيء. أنصح بتيارا للمناسبات الكبيرة والصغيرة.", "لبنى", "مناسبة خاصة"], ["تعامل احترافي ورائع، والطعام لذيذ جداً وخدمة العملاء استثنائية.", "منى", "مناسبة خاصة"], ["طعام لذيذ وطهي ممتاز وجودة عالية ودقة كبيرة في وقت التسليم.", "محمد", "ضيافة مؤسسية"], ["خدمة متميزة وطعام لذيذ. تجربة فريدة من البداية إلى النهاية.", "جوهرة", "احتفال عائلي"]],
    ctaTag: "نبدأ من مناسبتك", ctaTitle: <>مائدة تجمعكم.<br /><em>وذكرى تبقى.</em></>, ctaBody: "شاركنا ضيوفك وتفاصيل مناسبتك، ونصمم لك قائمة وخدمة وتجربة تليق باللحظة.",
    formTitle: <>حدّثنا عن <em>مناسبتك</em></>, fields: ["الاسم الكامل", "الجوال", "البريد الإلكتروني", "نوع المناسبة", "تاريخ المناسبة", "عدد الضيوف", "التفاصيل"], eventOptions: ["اختر المناسبة", "فعالية شركة", "عرس أو حفل", "مناسبة خاصة", "درس طهي", "أخرى"], details: "الموقع وأسلوب الخدمة والاحتياجات الغذائية وأي تفاصيل أخرى", send: "إرسال الطلب عبر واتساب", response: "نرد عادة خلال ساعات العمل", contactTag: "تواصل مباشر", address: "2744 عبدالله الأهواني, حي القيروان", whatsapp: "تواصل عبر واتساب",
  },
} as const;

export default function HomePage({ lang = "en" }: { lang?: Lang }) {
  const t = copy[lang];
  const [activeService, setActiveService] = useState(0);
  const [quote, setQuote] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
const touchStartX = useRef<number | null>(null);
const touchEndX = useRef<number | null>(null);

const nextImage = () => {
  setLightbox((current) =>
    current === null ? null : (current + 1) % gallery.length
  );
};

const previousImage = () => {
  setLightbox((current) =>
    current === null
      ? null
      : (current - 1 + gallery.length) % gallery.length
  );
};

const handleTouchStart = (event: React.TouchEvent) => {
  touchEndX.current = null;
  touchStartX.current = event.targetTouches[0].clientX;
};

const handleTouchMove = (event: React.TouchEvent) => {
  touchEndX.current = event.targetTouches[0].clientX;
};

const handleTouchEnd = () => {
  if (
    touchStartX.current === null ||
    touchEndX.current === null
  ) {
    return;
  }

  const distance = touchStartX.current - touchEndX.current;

  // Prevent tiny movements from changing image
  const minimumSwipeDistance = 50;

  if (distance > minimumSwipeDistance) {
    // Swipe left → next
    nextImage();
  } else if (distance < -minimumSwipeDistance) {
    // Swipe right → previous
    previousImage();
  }

  touchStartX.current = null;
  touchEndX.current = null;
};

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setLightbox(null);
    }

    if (event.key === "ArrowLeft") {
      setLightbox((current) =>
        current === null
          ? null
          : (current - 1 + gallery.length) % gallery.length
      );
    }

    if (event.key === "ArrowRight") {
      setLightbox((current) =>
        current === null
          ? null
          : (current + 1) % gallery.length
      );
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  useEffect(() => {
    const timer = window.setInterval(() => setQuote((q) => (q + 1) % t.testimonials.length), 7000);
    return () => window.clearInterval(timer);
  }, [t.testimonials.length]);
  // useEffect(() => {
  //   const close = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(null);
  //   window.addEventListener("keydown", close);
  //   return () => window.removeEventListener("keydown", close);
  // }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = lang === "ar"
      ? [`طلب ضيافة جديد`, `الاسم: ${data.get("name")}`, `الجوال: ${data.get("phone")}`, `البريد: ${data.get("email")}`, `المناسبة: ${data.get("event")}`, `التاريخ: ${data.get("date")}`, `الضيوف: ${data.get("guests")}`, `التفاصيل: ${data.get("details")}`]
      : [`New catering enquiry`, `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Email: ${data.get("email")}`, `Event: ${data.get("event")}`, `Date: ${data.get("date")}`, `Guests: ${data.get("guests")}`, `Details: ${data.get("details")}`];
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  return <main dir={t.dir} className={`site-shell ${lang}`}>
      <section id="top" className="hero">
        <div className="hero-copy"><p className="eyebrow reveal"><span />{t.eyebrow}</p><h1 className={lang === "ar" ? "arabic-hero-title" : undefined}>{lang === "ar" ? <><span>كن ضيفاً في</span><span>مناسبتك <em>الخاصة.</em></span></> : t.hero.map((line, i) => i === 2 ? <em key={line}>{line}</em> : <span key={line}>{line}</span>)}</h1><p className="lead">{t.intro}</p><div className="buttons"><a className="pill dark" href="#contact">{t.quote}<span>↗</span></a><a className="text-link" href="#services">{t.viewServices}<span>↓</span></a></div><div className="stats">{t.proof.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
        <div className="hero-visual"><img className="hero-photo" src="/images/cooking-classes-7-1.jpg" alt={lang === "ar" ? "طبق فاخر من إعداد تيارا للضيافة في الرياض" : "Elegant plated course by Tiara Catering in Riyadh"} fetchPriority="high" /><div className="hero-shade" /><img className="mark" src="/tiara-mark.png" alt="" /><div className="availability"><i /><span>{lang === "ar" ? "نستقبل حجوزات المناسبات" : "Now booking private events"}</span></div></div>
      </section>

      <div className="ticker" aria-label={lang === "ar" ? "خدمات تيارا" : "Tiara services"}><div>{[...t.ticker, ...t.ticker].map((item, i) => <span key={`${item}-${i}`}>{item}<i /></span>)}</div></div>

      <section id="about" className="section about"><div className="copy"><p className="kicker">{t.aboutTag}</p><h2>{t.aboutTitle}</h2><p className="body-copy">{t.aboutBody}</p><ol>{t.highlights.map(([title, body], i) => <li key={title}><small>0{i + 1}</small><div><b>{title}</b><span>{body}</span></div></li>)}</ol></div><div className="about-images"><img src={gallery[1]} alt={lang === "ar" ? "حرفة مطبخ تيارا" : "Tiara Catering kitchen craft"} loading="lazy" /><img src={gallery[2]} alt={lang === "ar" ? "تفاصيل خدمة راقية" : "Fine dining service detail"} loading="lazy" /><img src={gallery[3]} alt={lang === "ar" ? "تنسيق طاولة أنيق" : "Elegant table styling"} loading="lazy" /></div></section>

      <section id="services" className="section services"><div className="section-head"><div><p className="kicker">{t.servicesTag}</p><h2>{t.servicesTitle}</h2></div><p>{t.servicesLead}</p></div><div className="services-grid"><div className="service-list">{t.services.map(([title, desc], i) => <a href="#contact" className={activeService === i ? "active" : ""} onMouseEnter={() => setActiveService(i)} onFocus={() => setActiveService(i)} key={title}><small>0{i + 1}</small><span><b>{title}</b><em>{desc}</em></span><i>↗</i></a>)}</div><figure><div className="service-image"><img src={`/images/cooking-classes-${t.services[activeService][2]}.jpg`} alt={t.services[activeService][0]} /></div><figcaption><span>0{activeService + 1}</span>{t.services[activeService][0]}</figcaption></figure></div></section>

      <section className="signature"><div className="signature-copy"><p className="kicker">{t.signatureTag}</p><h2>{t.signatureTitle}</h2><p>{t.signatureBody}</p><a className="pill gold" href="#contact">{t.start}<span>↗</span></a></div><div className="process">{t.process.map(([title, desc], i) => <article key={title}><small>{["I", "II", "III", "IV", "V"][i]}</small><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section id="gallery" className="gallery section-wide">
  <div className="section-head gallery-head">
    <div>
      <p className="kicker">{t.galleryTag}</p>
      <h2>{t.galleryTitle}</h2>
    </div>

    <p>{t.galleryHint}</p>
  </div>

  <div className="gallery-rail">
    {gallery.map((src, i) => (
      <button
        onClick={() => setLightbox(i)}
        aria-label={
          lang === "ar"
            ? `فتح صورة المعرض ${i + 1}`
            : `Open gallery image ${i + 1}`
        }
        key={src}
      >
        <img
          src={src}
          alt={
            lang === "ar"
              ? `تفاصيل من مناسبات تيارا ${i + 1}`
              : `Tiara Catering event detail ${i + 1}`
          }
          loading="lazy"
        />

        <span>0{i + 1}</span>
      </button>
    ))}
  </div>
</section>

      <section id="brands" className="section brands"><div className="section-head"><div><p className="kicker">{t.brandsTag}</p><h2>{t.brandsTitle}</h2></div></div><div className="brand-grid">{t.brands.map(([title, tag, desc, image, url], i) => { const content = <><div className="brand-image"><span>0{i + 1}</span><img src={`/images/${image}`} alt={title} loading="lazy" /></div><small>{tag}</small><div className="brand-card-heading"><h3>{title}</h3>{url && <span aria-hidden="true">↗</span>}</div><p>{desc}</p></>; return url ? <a className="brand-card linked" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${title} — ${lang === "ar" ? "زيارة الموقع" : "Visit website"}`} key={title}>{content}</a> : <article className="brand-card" key={title}>{content}</article>; })}</div></section>

      <section className="testimonials"><div className="testimonial-aside"><p className="kicker">{t.testimonialTag}</p><h2>{t.testimonialTitle}</h2><div className="quote-dots">{t.testimonials.map((item, i) => <button key={item[1]} onClick={() => setQuote(i)} className={i === quote ? "active" : ""} aria-label={`${t.testimonialTag} ${i + 1}`} />)}</div></div><blockquote key={quote}><span>“</span><p>{t.testimonials[quote][0]}</p><footer><b>{t.testimonials[quote][1]}</b><small>{t.testimonials[quote][2]}</small></footer></blockquote></section>

      <section className="conversion"><img src="/images/tiara-catering-tables-showcase.jpg" alt="" loading="lazy" /><div className="conversion-shade" /><div><p className="kicker">{t.ctaTag}</p><h2>{t.ctaTitle}</h2><p>{t.ctaBody}</p><a className="pill gold" href="#contact">{t.quote}<span>↗</span></a></div></section>

      <section id="contact" className="contact section"><div className="contact-intro"><p className="kicker">{t.contactTag}</p><h2>{t.formTitle}</h2><p>{t.ctaBody}</p><address><a href={CALL_HREF}>{CALL_DISPLAY}</a><a href={EMAIL_HREF}>{EMAIL}</a><span>{t.address}</span></address></div><form onSubmit={submit}><div className="field"><label htmlFor="name">{t.fields[0]}</label><input id="name" name="name" autoComplete="name" required /></div><div className="field"><label htmlFor="phone">{t.fields[1]}</label><input id="phone" name="phone" type="tel" autoComplete="tel" required /></div><div className="field"><label htmlFor="email">{t.fields[2]}</label><input id="email" name="email" type="email" autoComplete="email" /></div><div className="field"><label htmlFor="event">{t.fields[3]}</label><select id="event" name="event" required defaultValue=""><option value="" disabled>{t.eventOptions[0]}</option>{t.eventOptions.slice(1).map((option) => <option key={option}>{option}</option>)}</select></div><div className="field"><label htmlFor="date">{t.fields[4]}</label><input id="date" name="date" type="date" /></div><div className="field"><label htmlFor="guests">{t.fields[5]}</label><input id="guests" name="guests" type="number" min="1" inputMode="numeric" /></div><div className="field full"><label htmlFor="details">{t.fields[6]}</label><textarea id="details" name="details" rows={4} placeholder={t.details} /></div><div className="form-submit"><button className="pill dark" type="submit">{t.send}<span>↗</span></button><small>{t.response}</small></div></form></section>
  {lightbox !== null && (
  <div
    className="lightbox"
    role="dialog"
    aria-modal="true"
    aria-label={t.galleryTag}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  >
    <button
      className="lightbox-close"
      aria-label={t.close}
      onClick={() => setLightbox(null)}
    >
      ×
    </button>

    <button
      className="lightbox-nav lightbox-prev"
      aria-label={
        lang === "ar" ? "الصورة السابقة" : "Previous image"
      }
      onClick={previousImage}
    >
      ←
    </button>

    <div className="lightbox-image-wrapper">
      <img
        key={lightbox}
        src={gallery[lightbox]}
        alt={
          lang === "ar"
            ? `صورة المعرض ${lightbox + 1}`
            : `Gallery image ${lightbox + 1}`
        }
        draggable={false}
      />
    </div>

    <button
      className="lightbox-nav lightbox-next"
      aria-label={
        lang === "ar" ? "الصورة التالية" : "Next image"
      }
      onClick={nextImage}
    >
      →
    </button>

    <div className="lightbox-counter">
      {lightbox + 1} / {gallery.length}
    </div>
  </div>
)}
  </main>;
}
