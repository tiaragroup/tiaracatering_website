"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CALL_DISPLAY, CALL_HREF, WHATSAPP_URL } from "../contact-details";
import { socialLinks } from "../social-links";
import { menusAr, menusEn } from "./menu-data";

type Lang = "en" | "ar";
const ui = {
  en: {
    dir: "ltr", back: "Home", switch: "العربية", switchHref: "/ar/menus", quote: "Request quotation", chat: "Chat on WhatsApp",
    eyebrow: "Tiara Catering · 2026 collection", title: <>A menu for every <em>kind of gathering.</em></>,
    lead: "Three considered catering menus, each bringing together generous Saudi hospitality, international favourites and a complete dining rhythm from first welcome to final coffee.",
    explore: "Explore the menus", helper: "Not sure which menu fits?", helperLink: "Let our team guide you",
    trust: [["3", "Complete menus"], ["6", "Courses in every menu"], ["Riyadh", "Prepared and served locally"]],
    collectionTag: "Choose your experience", collectionTitle: <>Compare at a glance.<br /><em>Decide with confidence.</em></>,
    collectionLead: "Use the menus as a starting point. Your final proposal is shaped around guest count, date, venue and service requirements.", from: "SAR", packageRate: "menu package", view: "View full menu", selected: "Selected", popular: "Most popular", signature: "Signature",
    fit: [["A generous, versatile foundation", "25 listed dishes & beverages"], ["More variety for elevated occasions", "27 listed dishes & beverages"], ["Our fullest signature selection", "31 listed dishes & beverages"]],
    detailTag: "Full menu detail", detailTitle: "Everything included in", servingNote: "Menu selections and pricing are subject to availability and final event requirements.",
    quoteCardTag: "Build your enquiry", quoteCardTitle: "Get a tailored proposal", quoteCardBody: "Tell us the essentials. We’ll open WhatsApp with a complete request ready for you to send.",
    guests: "Number of guests", date: "Event date", event: "Event type", eventOptions: ["Private gathering", "Corporate event", "Wedding or gala", "Special event", "Other"], note: "Anything we should know?", notePlaceholder: "Venue, dietary needs, service style…", send: "Request this menu", reply: "A Tiara event specialist will review your request.",
    whyTag: "Why Tiara", whyTitle: <>A menu is only the <em>beginning.</em></>, why: [["Tailored guidance", "We help align the menu with your guests, venue and occasion."], ["One point of contact", "Clear coordination from the first conversation through event day."], ["Considered presentation", "Food, service and styling designed to feel like one experience."]],
    faqTag: "Good to know", faqTitle: "Before you request a quote", faqs: [["Is the displayed price the final event total?", "No. The menu rate is a starting point. Your final quotation depends on guest count, event date, venue and required service."], ["Can the menu be adjusted?", "Share your preferences and dietary requirements in the quotation request. Our team will confirm what can be tailored."], ["Which menu should I choose?", "Menu One is a versatile foundation, Menu Two adds more variety, and Menu Three offers the fullest signature selection. Our team can recommend the right fit."], ["How quickly can I speak to someone?", "Use WhatsApp for the fastest route to our event team, or send a quotation request with your menu, date and guest count already included."]],
    finalTitle: <>Your guests remember the feeling.<br /><em>Let’s shape it together.</em></>, finalBody: "Choose a menu, share your event details and let Tiara turn the brief into a considered proposal.", rights: "© 2026 Tiara Catering. All rights reserved.",
  },
  ar: {
    dir: "rtl", back: "الرئيسية", switch: "EN", switchHref: "/menus", quote: "اطلب عرض سعر", chat: "تحدث عبر واتساب",
    eyebrow: "تيارا للضيافة · مجموعة ٢٠٢٦", title: <>قائمة لكل <em>نوع من المناسبات.</em></>,
    lead: "ثلاث قوائم ضيافة متكاملة تجمع كرم الضيافة السعودية مع الأطباق العالمية المحبوبة، من أول ترحيب وحتى القهوة الختامية.",
    explore: "استعرض القوائم", helper: "لست متأكداً من القائمة الأنسب؟", helperLink: "دع فريقنا يساعدك",
    trust: [["٣", "قوائم متكاملة"], ["٦", "أقسام في كل قائمة"], ["الرياض", "إعداد وخدمة محلية"]],
    collectionTag: "اختر تجربتك", collectionTitle: <>قارن بسهولة.<br /><em>واختر بثقة.</em></>,
    collectionLead: "اعتبر القوائم نقطة بداية. نصمم العرض النهائي حسب عدد الضيوف والتاريخ والموقع ومتطلبات الخدمة.", from: "ر.س", packageRate: "سعر القائمة", view: "استعرض التفاصيل", selected: "تم الاختيار", popular: "الأكثر طلباً", signature: "التجربة المميزة",
    fit: [["أساس متنوع وسخي", "٢٥ طبقاً ومشروباً"], ["تنوع أكبر للمناسبات الراقية", "٢٧ طبقاً ومشروباً"], ["تجربتنا الأكثر اكتمالاً", "٣١ طبقاً ومشروباً"]],
    detailTag: "تفاصيل القائمة", detailTitle: "كل ما تتضمنه", servingNote: "اختيارات القوائم والأسعار خاضعة للتوفر ومتطلبات المناسبة النهائية.",
    quoteCardTag: "جهّز طلبك", quoteCardTitle: "احصل على عرض مخصص", quoteCardBody: "شاركنا المعلومات الأساسية وسنفتح واتساب بطلب متكامل وجاهز للإرسال.",
    guests: "عدد الضيوف", date: "تاريخ المناسبة", event: "نوع المناسبة", eventOptions: ["لقاء خاص", "فعالية شركة", "عرس أو حفل", "مناسبة خاصة", "أخرى"], note: "أي تفاصيل مهمة؟", notePlaceholder: "الموقع، الاحتياجات الغذائية، أسلوب الخدمة…", send: "اطلب هذه القائمة", reply: "سيقوم مختص مناسبات من تيارا بمراجعة طلبك.",
    whyTag: "لماذا تيارا", whyTitle: <>القائمة ليست سوى <em>البداية.</em></>, why: [["إرشاد مخصص", "نساعدك في مواءمة القائمة مع ضيوفك وموقعك ومناسبتك."], ["نقطة اتصال واحدة", "تنسيق واضح من المحادثة الأولى وحتى يوم المناسبة."], ["تقديم مدروس", "الطعام والخدمة والتنسيق مصممة لتبدو كتجربة واحدة."]],
    faqTag: "معلومات مهمة", faqTitle: "قبل طلب عرض السعر", faqs: [["هل السعر المعروض هو التكلفة النهائية للمناسبة؟", "لا. سعر القائمة هو نقطة بداية، ويعتمد العرض النهائي على عدد الضيوف والتاريخ والموقع والخدمة المطلوبة."], ["هل يمكن تعديل القائمة؟", "اذكر تفضيلاتك واحتياجاتك الغذائية في طلب العرض، وسيؤكد فريقنا الخيارات التي يمكن تخصيصها."], ["أي قائمة أختار؟", "القائمة الأولى أساس متنوع، والثانية تضيف خيارات أكثر، والثالثة تقدم تجربتنا الأكثر اكتمالاً. ويمكن لفريقنا ترشيح الأنسب."], ["كيف أتحدث مع الفريق بسرعة؟", "واتساب هو أسرع وسيلة للوصول إلى فريق المناسبات، أو أرسل طلب عرض يتضمن القائمة والتاريخ وعدد الضيوف."]],
    finalTitle: <>يتذكر ضيوفك الإحساس.<br /><em>فلنصنعه معاً.</em></>, finalBody: "اختر قائمتك وشارك تفاصيل المناسبة ودع تيارا تحول فكرتك إلى عرض مدروس.", rights: "© ٢٠٢٦ تيارا للضيافة. جميع الحقوق محفوظة.",
  },
} as const;

export default function MenuPage({ lang = "en" }: { lang?: Lang }) {
  const t = ui[lang];
  const menus = lang === "ar" ? menusAr : menusEn;
  const [selected, setSelected] = useState(1);
  const menu = menus[selected];
  const itemCount = useMemo(() => menu.categories.reduce((sum, category) => sum + category.items.length, 0), [menu]);

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = t.dir; }, [lang, t.dir]);

  function choose(index: number) {
    setSelected(index);
    window.setTimeout(() => document.getElementById("menu-detail")?.scrollIntoView({ behavior: "smooth" }), 20);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lines = lang === "ar"
      ? ["طلب عرض سعر لقائمة تيارا ٢٠٢٦", `القائمة: ${menu.name} — ${menu.price} ر.س`, `عدد الضيوف: ${form.get("guests")}`, `التاريخ: ${form.get("date")}`, `نوع المناسبة: ${form.get("event")}`, `ملاحظات: ${form.get("note") || "-"}`]
      : ["Tiara Catering 2026 menu quotation request", `Menu: ${menu.name} — SAR ${menu.price}`, `Guests: ${form.get("guests")}`, `Date: ${form.get("date")}`, `Event: ${form.get("event")}`, `Notes: ${form.get("note") || "-"}`];
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  return <main className={`menu-site ${lang}`} dir={t.dir}>
    <header className="menu-header"><a className="menu-brand" href={lang === "ar" ? "/ar" : "/"}><img src="/tiara-logo.png" alt="Tiara Catering" /></a><nav><a href={lang === "ar" ? "/ar" : "/"}>{t.back}</a><a href="#collection">{t.explore}</a><a href="#faq">FAQ</a></nav><div><a className="menu-language" href={t.switchHref} hrefLang={lang === "ar" ? "en" : "ar"}>{t.switch}</a><a className="menu-pill dark" href="#quotation">{t.quote}<span>↗</span></a></div></header>

    <section className="menu-hero"><div className="menu-hero-copy"><p className="menu-kicker">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p><div className="menu-actions"><a className="menu-pill dark" href="#collection">{t.explore}<span>↓</span></a><a className="menu-text-link" href={WHATSAPP_URL}>{t.chat}<span>↗</span></a></div><p className="menu-helper">{t.helper} <a href={WHATSAPP_URL}>{t.helperLink} →</a></p></div><div className="menu-hero-image"><img src="/images/cooking-classes-4.jpg" alt={lang === "ar" ? "مائدة ضيافة أنيقة من تيارا" : "Elegant Tiara Catering menu presentation"} fetchPriority="high" /><div className="menu-price-note"><small>{t.from}</small><strong>283</strong><span>{t.packageRate}</span></div></div></section>
    <div className="menu-trust">{t.trust.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>

    <section id="collection" className="menu-section menu-collection"><div className="menu-section-head"><div><p className="menu-kicker">{t.collectionTag}</p><h2>{t.collectionTitle}</h2></div><p>{t.collectionLead}</p></div><div className="package-grid">{menus.map((pkg, i) => <article className={`${selected === i ? "selected" : ""} ${i === 1 ? "featured" : ""}`} key={pkg.id}>{pkg.badge && <span className="package-badge">{lang === "ar" ? (i === 1 ? t.popular : t.signature) : pkg.badge}</span>}<small>0{i + 1}</small><h3>{pkg.name}</h3><div className="package-price"><span>{t.from}</span><strong>{pkg.price}</strong></div><p>{t.fit[i][0]}</p><span className="package-count">{t.fit[i][1]}</span><ul>{pkg.categories.map((category) => <li key={category.title}>{category.title}<span>{category.items.length}</span></li>)}</ul><button onClick={() => choose(i)}>{selected === i ? t.selected : t.view}<span>{selected === i ? "✓" : "→"}</span></button></article>)}</div></section>

    <section id="menu-detail" className="menu-detail"><div className="detail-heading"><p className="menu-kicker">{t.detailTag}</p><h2>{t.detailTitle} <em>{menu.name}</em></h2><div className="detail-meta"><span>{itemCount} {lang === "ar" ? "اختياراً" : "selections"}</span><span>6 {lang === "ar" ? "أقسام" : "courses"}</span><span>{t.from} {menu.price}</span></div></div><div className="detail-layout"><div className="course-list">{menu.categories.map((category, categoryIndex) => <section id={`${menu.id}-course-${categoryIndex}`} key={category.title}><header><span>0{categoryIndex + 1}</span><h3>{category.title}</h3><small>{category.items.length}</small></header><ul>{category.items.map((item) => <li key={item}><span>{item}</span><i /></li>)}</ul></section>)}</div><aside id="quotation" className="quote-builder"><p className="menu-kicker">{t.quoteCardTag}</p><h3>{t.quoteCardTitle}</h3><p>{t.quoteCardBody}</p><div className="chosen-menu"><span>{menu.name}</span><strong>{t.from} {menu.price}</strong></div><form onSubmit={submit}><label>{t.guests}<input name="guests" type="number" min="1" required placeholder="50" /></label><label>{t.date}<input name="date" type="date" required /></label><label>{t.event}<select name="event" required>{t.eventOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>{t.note}<textarea name="note" rows={3} placeholder={t.notePlaceholder} /></label><button className="menu-pill gold" type="submit">{t.send}<span>↗</span></button><small>{t.reply}</small></form></aside></div><p className="serving-note">{t.servingNote}</p></section>

    <section className="menu-why menu-section"><div className="menu-section-head"><div><p className="menu-kicker">{t.whyTag}</p><h2>{t.whyTitle}</h2></div></div><div>{t.why.map(([title, desc], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section id="faq" className="menu-faq menu-section"><div><p className="menu-kicker">{t.faqTag}</p><h2>{t.faqTitle}</h2></div><div>{t.faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="menu-final"><img src="/images/cooking-classes-8.jpg" alt="" loading="lazy" /><div /><article><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><div className="menu-actions"><a className="menu-pill gold" href="#quotation">{t.quote}<span>↗</span></a><a className="menu-text-link light" href={WHATSAPP_URL}>{t.chat}<span>↗</span></a></div></article></section>
    <footer className="menu-footer"><img src="/tiara-logo.png" alt="Tiara Catering" /><div><a href={lang === "ar" ? "/ar" : "/"}>{t.back}</a><a href={CALL_HREF}>{CALL_DISPLAY}</a><a href="mailto:info@tiaracatering.com">info@tiaracatering.com</a>{socialLinks.map(({ label, href }) => <a href={href} key={label} target="_blank" rel="noopener noreferrer" aria-label={`${label} — Tiara Catering`}>{label}</a>)}</div><small>{t.rights}</small></footer>
    <div className="mobile-menu-cta"><span><small>{menu.name}</small><b>{t.from} {menu.price}</b></span><a href="#quotation">{t.quote}</a></div>
  </main>;
}
