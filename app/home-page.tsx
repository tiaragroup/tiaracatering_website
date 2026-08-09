"use client";

import { useEffect, useState } from "react";

const services = [
  { title: "Corporate Events", desc: "Professional catering planned end to end around your objectives.", image: "cooking-classes-7-1.jpg" },
  { title: "Weddings & Galas", desc: "Beautiful celebrations, from the first tasting to the final service.", image: "cooking-classes-1.jpg" },
  { title: "Special Events", desc: "Distinctive menus and polished hospitality for every occasion.", image: "cooking-classes-8.jpg" },
  { title: "Cooking Classes", desc: "Hands-on experiences led by Tiara's professional chefs.", image: "cooking-classes-3.jpg" },
  { title: "Event Consulting", desc: "Concept, planning, vendors and on-site management in one place.", image: "cooking-classes-2.jpg" },
];
const gallery = ["7-1", "1", "3", "8", "2", "4"].map((n) => `https://tiaracatering.com/wp-content/uploads/2017/09/cooking-classes-${n}.jpg`);
const ar = {
  nav: ["عن تيارا", "خدماتنا", "المعرض", "تواصل معنا"],
  eyebrow: "أتيليه الطهي · الرياض",
  line1: "كن ضيفاً",
  line2: "في مناسبتك",
  line3: "الخاصة.",
  intro: "عشاء عائلي أو حفل كبير — نطبخ وننسّق ونقدّم تجربة ضيافة يلتقي فيها الإرث السعودي بالحرفة الحديثة.",
  quote: "اطلب عرض سعر",
  services: "استعرض الخدمات",
};

export default function HomePage() {
  const [menu, setMenu] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [active, setActive] = useState(0);
  useEffect(() => {
    document.documentElement.lang = arabic ? "ar" : "en";
    document.documentElement.dir = arabic ? "rtl" : "ltr";
  }, [arabic]);
  const nav = arabic ? ar.nav : ["About", "Services", "Gallery", "Contact"];

  return <main>
    <header className="site-header">
      <a href="#top" aria-label="Tiara Catering home"><img src="/tiara-logo.png" alt="Tiara Catering" /></a>
      <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
        {nav.map((label, i) => <a key={label} href={["#about", "#services", "#gallery", "#contact"][i]} onClick={() => setMenu(false)}>{label}</a>)}
      </nav>
      <div className="header-actions"><button className="language" onClick={() => setArabic(!arabic)} aria-label="Switch language">{arabic ? "EN" : "ع"}</button><a className="pill dark desktop-cta" href="#contact">{arabic ? ar.quote : "Request a quote"}</a><button className="menu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Open menu">{menu ? "×" : "☰"}</button></div>
    </header>

    <section id="top" className="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span />{arabic ? ar.eyebrow : "Culinary atelier · Riyadh"}</p>
        <h1><span>{arabic ? ar.line1 : "Be a guest"}</span><span>{arabic ? ar.line2 : "at your own"}</span><em>{arabic ? ar.line3 : "celebration."}</em></h1>
        <p className="lead">{arabic ? ar.intro : "Family dinners, date nights, brunches and galas — cooked, styled and served by a Riyadh kitchen where Saudi heritage meets modern craft."}</p>
        <div className="buttons"><a className="pill dark" href="#contact">{arabic ? ar.quote : "Request a quote"}</a><a className="pill outline" href="#services">{arabic ? ar.services : "View services"}</a></div>
        <div className="stats"><div><strong>1,200+</strong><span>Events served</span></div><div><strong>5</strong><span>Service lines</span></div><div><strong>3</strong><span>Specialty houses</span></div></div>
      </div>
      <div className="hero-image"><img src="https://tiaracatering.com/wp-content/uploads/2017/09/cooking-classes-7-1.jpg" alt="An elegant course prepared by Tiara Catering in Riyadh" /><img className="mark" src="/tiara-mark.png" alt="" /></div>
    </section>

    <div className="ticker" aria-label="Tiara services"><div>{["Corporate Events", "Weddings & Galas", "Special Events", "Cooking Classes", "Event Consulting", "Private Chef"].map(x => <span key={x}>{x}<i /></span>)}</div></div>

    <section id="about" className="section about">
      <div className="copy"><p className="kicker">About Tiara</p><h2>Flavours that <em>tell a story</em></h2><p>Welcome to Tiara Catering, where culinary excellence meets the heart of Saudi tradition. Based in Riyadh, we craft unforgettable dining experiences with gracious service and modern culinary imagination.</p>
        <ol><li><b>Saudi heritage, modern craft</b><span>Traditional recipes reinterpreted with contemporary technique.</span></li><li><b>One team, every detail</b><span>Kitchen, styling, staffing and logistics under one roof.</span></li><li><b>Three specialty houses</b><span>Florals, bakery and chocolate for the whole table.</span></li></ol>
      </div>
      <div className="about-images"><img src={gallery[1]} alt="Tiara Catering kitchen craft" /><img src={gallery[2]} alt="Fine dining service detail" /><img src={gallery[3]} alt="Elegant table setting" /></div>
    </section>

    <section id="services" className="section services"><div className="section-head"><div><p className="kicker">What we do</p><h2>Five ways to <em>host well</em></h2></div><p>Every service is managed end to end, from the first tasting to the last plate cleared.</p></div>
      <div className="services-grid"><div className="service-list">{services.map((s, i) => <a href="#contact" className={active === i ? "active" : ""} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} key={s.title}><small>0{i + 1}</small><span><b>{s.title}</b><em>{s.desc}</em></span><i>↗</i></a>)}</div><figure><img src={`https://tiaracatering.com/wp-content/uploads/2017/09/${services[active].image}`} alt={services[active].title} /><figcaption>{services[active].title}</figcaption></figure></div>
    </section>

    <section className="signature"><div><p className="kicker">The signature experience</p><h2>We take care of <em>all the details</em></h2><p>Concept development, planning, vendor coordination and on-site management, tailored to your occasion.</p><a className="pill gold" href="#contact">Start planning</a></div><div className="process">{["Discover", "Plan", "Design", "Organise", "Deliver"].map((x, i) => <article key={x}><small>0{i + 1}</small><h3>{x}</h3><p>{["We listen to the guests, setting and story.", "Menus, staffing and timings shaped to your brief.", "Tablescape and plating composed as one language.", "Vendors and logistics handled by one team.", "Polished service from arrival to farewell."][i]}</p></article>)}</div></section>

    <section id="gallery" className="section gallery"><div className="section-head"><div><p className="kicker">The gallery</p><h2>Plated with <em>intention</em></h2></div></div><div className="gallery-grid">{gallery.map((src, i) => <img src={src} alt={`Tiara Catering event and culinary detail ${i + 1}`} loading="lazy" key={src} />)}</div></section>

    <section id="contact" className="contact"><div><p className="kicker">Planning something?</p><h2>Let’s make it <em>unforgettable.</em></h2><p>Tell us about your occasion and our Riyadh team will help shape the right experience.</p><a className="pill gold" href="https://wa.me/966112733888">WhatsApp us</a></div><address><span>Tiara Catering</span><p>7982 King Fahad Road, Olaya District<br />Riyadh, Saudi Arabia</p><a href="tel:+966112733888">+966 11 273 3888</a><a href="mailto:info@tiaracatering.com">info@tiaracatering.com</a></address></section>

    <footer><img src="/tiara-logo.png" alt="Tiara Catering" /><p>Culinary excellence meets the heart of Saudi tradition.</p><div><a href="https://www.instagram.com/tiara.catering.sa">Instagram</a><a href="https://wa.me/966112733888">WhatsApp</a></div><small>© 2026 Tiara Catering. All rights reserved.</small></footer>
    <a className="floating" href="https://wa.me/966112733888" aria-label="Contact Tiara Catering on WhatsApp">WhatsApp</a>
  </main>;
}
