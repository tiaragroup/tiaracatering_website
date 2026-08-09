"use client";

import { FormEvent, useEffect, useState } from "react";

type Lang = "en" | "ar";
const gallery = ["7-1", "1", "3", "8", "2", "4", "6"].map((n) => `/images/cooking-classes-${n}.jpg`);

const copy = {
  en: {
    dir: "ltr", switchLabel: "العربية", switchHref: "/ar", menu: "Menu", close: "Close",
    nav: [["About", "#about"], ["Services", "#services"], ["Menus", "/menus"], ["Gallery", "#gallery"], ["Houses", "#brands"], ["Contact", "#contact"]],
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
    brandsTag: "Specialty houses", brandsTitle: <>A family of houses for <em>diverse tastes</em></>,
    brands: [["Flower Scent", "Florist", "Where fragrance meets elegance — floral arrangements that tell stories.", "Asset-2-370x343.png"], ["Baker’s Bakery", "Bakery", "Freshly baked goodness made from traditional recipes and fine ingredients.", "Asset-3-370x343.png"], ["éléments du chocolat", "Chocolatier", "The art of fine chocolate, crafted from exceptional cocoa and delicate flavours.", "Asset-1-370x343.png"]],
    testimonialTag: "Client notes", testimonialTitle: <>Hospitality people <em>remember</em></>,
    testimonials: [["Customer service responds quickly and helps you understand everything. I highly recommend Tiara for events, big or small.", "Loubnah", "Private event"], ["Professional and wonderful treatment. The food was delicious, and the customer service was exceptional.", "Mona", "Special occasion"], ["Delicious food, excellent cooking, high quality — and very precise with delivery time.", "Mohammad", "Corporate catering"], ["Distinguished service and delicious food. A unique experience from beginning to end.", "Johara", "Family celebration"]],
    ctaTag: "Your occasion, beautifully handled", ctaTitle: <>You enjoy the moment.<br />We’ll handle <em>everything else.</em></>, ctaBody: "Share a few details and our team will help you shape the right menu, service and experience.",
    formTitle: <>Tell us about your <em>occasion</em></>, fields: ["Full name", "Phone", "Email", "Event type", "Event date", "Guests", "Details"], eventOptions: ["Select an event", "Corporate event", "Wedding or gala", "Special event", "Cooking class", "Other"], details: "Location, service style, dietary needs or anything else", send: "Send request on WhatsApp", response: "Usually replies during business hours", contactTag: "Direct contact", address: "7982 King Fahad Road, Olaya District, Riyadh", whatsapp: "WhatsApp us",
    footerBody: "Culinary excellence meets the heart of Saudi tradition. Based in Riyadh, crafting dining experiences people remember.", rights: "© 2026 Tiara Catering. All rights reserved.",
  },
  ar: {
    dir: "rtl", switchLabel: "EN", switchHref: "/", menu: "القائمة", close: "إغلاق",
    nav: [["عن تيارا", "#about"], ["خدماتنا", "#services"], ["القوائم", "/ar/menus"], ["المعرض", "#gallery"], ["بيوتنا", "#brands"], ["تواصل معنا", "#contact"]],
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
    galleryTag: "المعرض", galleryTitle: <>تقديم <em>بعناية</em></>, galleryHint: "اضغط على الصورة لاستعراضها",
    brandsTag: "بيوتنا المتخصصة", brandsTitle: <>عائلة من البيوت <em>لأذواق متنوعة</em></>,
    brands: [["عبق الزهور", "زهور", "حيث يلتقي العطر بالأناقة — تنسيقات زهور تحكي قصصاً.", "Asset-2-370x343.png"], ["مخبز بيكرز", "مخبوزات", "مخبوزات طازجة من وصفات تقليدية وأجود المكونات.", "Asset-3-370x343.png"], ["إليمنتس دو شوكولا", "شوكولاتة", "فن الشوكولاتة الفاخرة من أجود الكاكاو ومزيج راقٍ من النكهات.", "Asset-1-370x343.png"]],
    testimonialTag: "آراء العملاء", testimonialTitle: <>ضيافة تبقى <em>في الذاكرة</em></>,
    testimonials: [["خدمة العملاء سريعة وتساعدك على فهم كل شيء. أنصح بتيارا للمناسبات الكبيرة والصغيرة.", "لبنى", "مناسبة خاصة"], ["تعامل احترافي ورائع، والطعام لذيذ جداً وخدمة العملاء استثنائية.", "منى", "مناسبة خاصة"], ["طعام لذيذ وطهي ممتاز وجودة عالية ودقة كبيرة في وقت التسليم.", "محمد", "ضيافة مؤسسية"], ["خدمة متميزة وطعام لذيذ. تجربة فريدة من البداية إلى النهاية.", "جوهرة", "احتفال عائلي"]],
    ctaTag: "مناسبتك بأيدٍ خبيرة", ctaTitle: <>استمتع باللحظة.<br />ونحن نتولى <em>كل ما عداها.</em></>, ctaBody: "شاركنا بعض التفاصيل وسيساعدك فريقنا في اختيار القائمة والخدمة والتجربة الأنسب.",
    formTitle: <>حدّثنا عن <em>مناسبتك</em></>, fields: ["الاسم الكامل", "الجوال", "البريد الإلكتروني", "نوع المناسبة", "تاريخ المناسبة", "عدد الضيوف", "التفاصيل"], eventOptions: ["اختر المناسبة", "فعالية شركة", "عرس أو حفل", "مناسبة خاصة", "درس طهي", "أخرى"], details: "الموقع وأسلوب الخدمة والاحتياجات الغذائية وأي تفاصيل أخرى", send: "إرسال الطلب عبر واتساب", response: "نرد عادة خلال ساعات العمل", contactTag: "تواصل مباشر", address: "٧٩٨٢ طريق الملك فهد، حي العليا، الرياض", whatsapp: "تواصل عبر واتساب",
    footerBody: "التميّز في الطهي يلتقي بقلب التراث السعودي. من الرياض نصنع تجارب ضيافة تبقى في الذاكرة.", rights: "© ٢٠٢٦ تيارا للضيافة. جميع الحقوق محفوظة.",
  },
} as const;

export default function HomePage({ lang = "en" }: { lang?: Lang }) {
  const t = copy[lang];
  const [menu, setMenu] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [quote, setQuote] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);
  useEffect(() => {
    const timer = window.setInterval(() => setQuote((q) => (q + 1) % t.testimonials.length), 7000);
    return () => window.clearInterval(timer);
  }, [t.testimonials.length]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && (setMenu(false), setLightbox(null));
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = lang === "ar"
      ? [`طلب ضيافة جديد`, `الاسم: ${data.get("name")}`, `الجوال: ${data.get("phone")}`, `البريد: ${data.get("email")}`, `المناسبة: ${data.get("event")}`, `التاريخ: ${data.get("date")}`, `الضيوف: ${data.get("guests")}`, `التفاصيل: ${data.get("details")}`]
      : [`New catering enquiry`, `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Email: ${data.get("email")}`, `Event: ${data.get("event")}`, `Date: ${data.get("date")}`, `Guests: ${data.get("guests")}`, `Details: ${data.get("details")}`];
    window.open(`https://wa.me/966112733888?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  return <main dir={t.dir} className={`site-shell ${lang}`}>
    <a className="skip-link" href="#content">{lang === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Tiara Catering"><img src="/tiara-logo.png" alt="Tiara Catering" /></a>
      <nav className={menu ? "nav open" : "nav"} aria-label={lang === "ar" ? "القائمة الرئيسية" : "Main navigation"}>
        {t.nav.map(([label, href]) => <a href={href} onClick={() => setMenu(false)} key={href}>{label}</a>)}
        <a className="mobile-quote" href="#contact" onClick={() => setMenu(false)}>{t.quote}</a>
      </nav>
      <div className="header-actions"><a className="language" href={t.switchHref} hrefLang={lang === "ar" ? "en" : "ar"} aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}>{t.switchLabel}</a><a className="pill dark desktop-cta" href="#contact">{t.quote}<span>↗</span></a><button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? t.close : t.menu}>{menu ? "×" : "☰"}</button></div>
    </header>

    <div id="content">
      <section id="top" className="hero">
        <div className="hero-copy"><p className="eyebrow reveal"><span />{t.eyebrow}</p><h1>{t.hero.map((line, i) => i === 2 ? <em key={line}>{line}</em> : <span key={line}>{line}</span>)}</h1><p className="lead">{t.intro}</p><div className="buttons"><a className="pill dark" href="#contact">{t.quote}<span>↗</span></a><a className="text-link" href="#services">{t.viewServices}<span>↓</span></a></div><div className="stats">{t.proof.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>
        <div className="hero-visual"><img className="hero-photo" src="/images/cooking-classes-7-1.jpg" alt={lang === "ar" ? "طبق فاخر من إعداد تيارا للضيافة في الرياض" : "Elegant plated course by Tiara Catering in Riyadh"} fetchPriority="high" /><div className="hero-shade" /><img className="mark" src="/tiara-mark.png" alt="" /><div className="availability"><i /><span>{lang === "ar" ? "نستقبل حجوزات المناسبات" : "Now booking private events"}</span></div></div>
      </section>

      <div className="ticker" aria-label={lang === "ar" ? "خدمات تيارا" : "Tiara services"}><div>{[...t.ticker, ...t.ticker].map((item, i) => <span key={`${item}-${i}`}>{item}<i /></span>)}</div></div>

      <section id="about" className="section about"><div className="copy"><p className="kicker">{t.aboutTag}</p><h2>{t.aboutTitle}</h2><p className="body-copy">{t.aboutBody}</p><ol>{t.highlights.map(([title, body], i) => <li key={title}><small>0{i + 1}</small><div><b>{title}</b><span>{body}</span></div></li>)}</ol></div><div className="about-images"><img src={gallery[1]} alt={lang === "ar" ? "حرفة مطبخ تيارا" : "Tiara Catering kitchen craft"} loading="lazy" /><img src={gallery[2]} alt={lang === "ar" ? "تفاصيل خدمة راقية" : "Fine dining service detail"} loading="lazy" /><img src={gallery[3]} alt={lang === "ar" ? "تنسيق طاولة أنيق" : "Elegant table styling"} loading="lazy" /></div></section>

      <section id="services" className="section services"><div className="section-head"><div><p className="kicker">{t.servicesTag}</p><h2>{t.servicesTitle}</h2></div><p>{t.servicesLead}</p></div><div className="services-grid"><div className="service-list">{t.services.map(([title, desc, image], i) => <a href="#contact" className={activeService === i ? "active" : ""} onMouseEnter={() => setActiveService(i)} onFocus={() => setActiveService(i)} key={title}><small>0{i + 1}</small><span><b>{title}</b><em>{desc}</em></span><i>↗</i></a>)}</div><figure><div className="service-image"><img src={`/images/cooking-classes-${t.services[activeService][2]}.jpg`} alt={t.services[activeService][0]} /></div><figcaption><span>0{activeService + 1}</span>{t.services[activeService][0]}</figcaption></figure></div></section>

      <section className="signature"><div className="signature-copy"><p className="kicker">{t.signatureTag}</p><h2>{t.signatureTitle}</h2><p>{t.signatureBody}</p><a className="pill gold" href="#contact">{t.start}<span>↗</span></a></div><div className="process">{t.process.map(([title, desc], i) => <article key={title}><small>{["I", "II", "III", "IV", "V"][i]}</small><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section id="gallery" className="gallery section-wide"><div className="section-head gallery-head"><div><p className="kicker">{t.galleryTag}</p><h2>{t.galleryTitle}</h2></div><p>{t.galleryHint}</p></div><div className="gallery-rail">{gallery.map((src, i) => <button onClick={() => setLightbox(src)} aria-label={lang === "ar" ? `فتح صورة المعرض ${i + 1}` : `Open gallery image ${i + 1}`} key={src}><img src={src} alt={lang === "ar" ? `تفاصيل من مناسبات تيارا ${i + 1}` : `Tiara Catering event detail ${i + 1}`} loading="lazy" /><span>0{i + 1}</span></button>)}</div></section>

      <section id="brands" className="section brands"><div className="section-head"><div><p className="kicker">{t.brandsTag}</p><h2>{t.brandsTitle}</h2></div></div><div className="brand-grid">{t.brands.map(([title, tag, desc, image], i) => <article key={title}><div className="brand-image"><span>0{i + 1}</span><img src={`/images/${image}`} alt={title} loading="lazy" /></div><small>{tag}</small><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section className="testimonials"><div className="testimonial-aside"><p className="kicker">{t.testimonialTag}</p><h2>{t.testimonialTitle}</h2><div className="quote-dots">{t.testimonials.map((item, i) => <button key={item[1]} onClick={() => setQuote(i)} className={i === quote ? "active" : ""} aria-label={`${t.testimonialTag} ${i + 1}`} />)}</div></div><blockquote key={quote}><span>“</span><p>{t.testimonials[quote][0]}</p><footer><b>{t.testimonials[quote][1]}</b><small>{t.testimonials[quote][2]}</small></footer></blockquote></section>

      <section className="conversion"><img src="/images/cooking-classes-6.jpg" alt="" loading="lazy" /><div className="conversion-shade" /><div><p className="kicker">{t.ctaTag}</p><h2>{t.ctaTitle}</h2><p>{t.ctaBody}</p><a className="pill gold" href="#contact">{t.quote}<span>↗</span></a></div></section>

      <section id="contact" className="contact section"><div className="contact-intro"><p className="kicker">{t.contactTag}</p><h2>{t.formTitle}</h2><p>{t.ctaBody}</p><address><a href="tel:+966112733888">+966 11 273 3888</a><a href="mailto:info@tiaracatering.com">info@tiaracatering.com</a><span>{t.address}</span></address></div><form onSubmit={submit}><div className="field"><label htmlFor="name">{t.fields[0]}</label><input id="name" name="name" autoComplete="name" required /></div><div className="field"><label htmlFor="phone">{t.fields[1]}</label><input id="phone" name="phone" type="tel" autoComplete="tel" required /></div><div className="field"><label htmlFor="email">{t.fields[2]}</label><input id="email" name="email" type="email" autoComplete="email" /></div><div className="field"><label htmlFor="event">{t.fields[3]}</label><select id="event" name="event" required defaultValue=""><option value="" disabled>{t.eventOptions[0]}</option>{t.eventOptions.slice(1).map((option) => <option key={option}>{option}</option>)}</select></div><div className="field"><label htmlFor="date">{t.fields[4]}</label><input id="date" name="date" type="date" /></div><div className="field"><label htmlFor="guests">{t.fields[5]}</label><input id="guests" name="guests" type="number" min="1" inputMode="numeric" /></div><div className="field full"><label htmlFor="details">{t.fields[6]}</label><textarea id="details" name="details" rows={4} placeholder={t.details} /></div><div className="form-submit"><button className="pill dark" type="submit">{t.send}<span>↗</span></button><small>{t.response}</small></div></form></section>
    </div>

    <footer className="site-footer"><div className="footer-brand"><img src="/tiara-logo.png" alt="Tiara Catering" /><p>{t.footerBody}</p></div><div><span>{lang === "ar" ? "تواصل" : "Connect"}</span><a href="https://www.instagram.com/tiara.catering.sa">Instagram</a><a href="https://wa.me/966112733888">WhatsApp</a></div><div><span>{lang === "ar" ? "اكتشف" : "Explore"}</span>{t.nav.slice(0, 4).map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><small>{t.rights}</small></footer>
    <a className="floating" href="https://wa.me/966112733888" aria-label={t.whatsapp}><i />{t.whatsapp}</a>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={t.galleryTag} onClick={() => setLightbox(null)}><button aria-label={t.close} onClick={() => setLightbox(null)}>×</button><img src={lightbox} alt="" /></div>}
  </main>;
}
