"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { WHATSAPP_URL } from "../contact-details";
import { createQuotation } from "../quotation-service";
import { countItems, faqsFor, formatNumber, type Lang, lowestPrice, menusFor } from "./menu-data";

const DEFAULT_MENU = 1;
const subscribeToHash = (onChange: () => void) => { window.addEventListener("hashchange", onChange); return () => window.removeEventListener("hashchange", onChange); };
const readHash = () => window.location.hash.slice(1);
const readNoHash = () => "";
const localToday = () => { const now = new Date(); return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };

const ui = {
  en: {
    dir: "ltr", quote: "Request quotation", chat: "Chat on WhatsApp",
    eyebrow: "Tiara Catering · 2026 collection", title: <>A menu for every <em>kind of gathering.</em></>,
    lead: "Three considered catering menus, each bringing together generous Saudi hospitality, international favourites and a complete dining rhythm from first welcome to final coffee.",
    explore: "Explore the menus", helper: "Not sure which menu fits?", helperLink: "Let our team guide you",
    trust: [["3", "Complete menus"], ["6", "Courses in every menu"], ["Riyadh", "Prepared and served locally"]],
    collectionTag: "Choose your experience", collectionTitle: <>Compare at a glance.<br /><em>Decide with confidence.</em></>,
    collectionLead: "Use the menus as a starting point. Your final proposal is shaped around guest count, date, venue and service requirements.", from: "SAR", packageRate: "menu package", view: "View full menu", selected: "Selected",
    fit: ["A generous, versatile foundation", "More variety for elevated occasions", "Our fullest signature selection"],
    dishes: "listed dishes & beverages", selections: "selections", courses: "courses",
    detailTag: "Full menu detail", detailTitle: "Everything included in", servingNote: "Menu selections and pricing are subject to availability and final event requirements.",
    quoteCardTag: "Build your enquiry", quoteCardTitle: "Get a tailored proposal", quoteCardBody: "Share the essentials and your request will be sent securely to Tiara’s event team.",
    name: "Full name", phone: "Phone", email: "Email (optional)", guests: "Number of guests", date: "Event date", event: "Event type", eventOptions: ["Private gathering", "Corporate event", "Wedding or gala", "Special event", "Other"], note: "Anything we should know?", notePlaceholder: "Venue, dietary needs, service style…", send: "Request this menu", sending: "Submitting…", reply: "A Tiara event specialist will review your request.", success: "Request received. Your reference is", error: "We could not submit your request. Please try again.", consent: "I agree to the Privacy Policy and to being contacted about this request.",
    whyTag: "Why Tiara", whyTitle: <>A menu is only the <em>beginning.</em></>, why: [["Tailored guidance", "We help align the menu with your guests, venue and occasion."], ["One point of contact", "Clear coordination from the first conversation through event day."], ["Considered presentation", "Food, service and styling designed to feel like one experience."]],
    faqTag: "Good to know", faqTitle: "Before you request a quote",
    finalTitle: <>Your guests remember the feeling.<br /><em>Let’s shape it together.</em></>, finalBody: "Choose a menu, share your event details and let Tiara turn the brief into a considered proposal.",
  },
  ar: {
    dir: "rtl", quote: "اطلب عرض سعر", chat: "تحدث عبر واتساب",
    eyebrow: "تيارا للضيافة · مجموعة ٢٠٢٦", title: <>قائمة لكل <em>نوع من المناسبات.</em></>,
    lead: "ثلاث قوائم ضيافة متكاملة تجمع كرم الضيافة السعودية مع الأطباق العالمية المحبوبة، من أول ترحيب وحتى القهوة الختامية.",
    explore: "استعرض القوائم", helper: "لست متأكداً من القائمة الأنسب؟", helperLink: "دع فريقنا يساعدك",
    trust: [["٣", "قوائم متكاملة"], ["٦", "أقسام في كل قائمة"], ["الرياض", "إعداد وخدمة محلية"]],
    collectionTag: "اختر تجربتك", collectionTitle: <>قارن بسهولة.<br /><em>واختر بثقة.</em></>,
    collectionLead: "اعتبر القوائم نقطة بداية. نصمم العرض النهائي حسب عدد الضيوف والتاريخ والموقع ومتطلبات الخدمة.", from: "ر.س", packageRate: "سعر القائمة", view: "استعرض التفاصيل", selected: "تم الاختيار",
    fit: ["أساس متنوع وسخي", "تنوع أكبر للمناسبات الراقية", "تجربتنا الأكثر اكتمالاً"],
    dishes: "طبقاً ومشروباً", selections: "اختياراً", courses: "أقسام",
    detailTag: "تفاصيل القائمة", detailTitle: "كل ما تتضمنه", servingNote: "اختيارات القوائم والأسعار خاضعة للتوفر ومتطلبات المناسبة النهائية.",
    quoteCardTag: "جهّز طلبك", quoteCardTitle: "احصل على عرض مخصص", quoteCardBody: "شاركنا المعلومات الأساسية وسيتم إرسال طلبك بأمان إلى فريق مناسبات تيارا.",
    name: "الاسم الكامل", phone: "رقم الجوال", email: "البريد الإلكتروني (اختياري)", guests: "عدد الضيوف", date: "تاريخ المناسبة", event: "نوع المناسبة", eventOptions: ["لقاء خاص", "فعالية شركة", "عرس أو حفل", "مناسبة خاصة", "أخرى"], note: "أي تفاصيل مهمة؟", notePlaceholder: "الموقع، الاحتياجات الغذائية، أسلوب الخدمة…", send: "اطلب هذه القائمة", sending: "جارٍ الإرسال…", reply: "سيقوم مختص مناسبات من تيارا بمراجعة طلبك.", success: "تم استلام طلبك. الرقم المرجعي", error: "تعذر إرسال طلبك. يرجى المحاولة مرة أخرى.", consent: "أوافق على سياسة الخصوصية وعلى التواصل معي بخصوص هذا الطلب.",
    whyTag: "لماذا تيارا", whyTitle: <>القائمة ليست سوى <em>البداية.</em></>, why: [["إرشاد مخصص", "نساعدك في مواءمة القائمة مع ضيوفك وموقعك ومناسبتك."], ["نقطة اتصال واحدة", "تنسيق واضح من المحادثة الأولى وحتى يوم المناسبة."], ["تقديم مدروس", "الطعام والخدمة والتنسيق مصممة لتبدو كتجربة واحدة."]],
    faqTag: "معلومات مهمة", faqTitle: "قبل طلب عرض السعر",
    finalTitle: <>يتذكر ضيوفك الإحساس.<br /><em>فلنصنعه معاً.</em></>, finalBody: "اختر قائمتك وشارك تفاصيل المناسبة ودع تيارا تحول فكرتك إلى عرض مدروس.",
  },
} as const;

export default function MenuPage({ lang = "en" }: { lang?: Lang }) {
  const t = ui[lang];
  const menus = menusFor(lang);
  const faqs = faqsFor(lang);
  // A link such as /menus#menu-3 (the URL published in our structured data) opens on that menu.
  const hash = useSyncExternalStore(subscribeToHash, readHash, readNoHash);
  const linked = menus.findIndex((pkg) => pkg.id === hash);
  const [picked, setPicked] = useState<number | null>(null);
  const [submission, setSubmission] = useState<{ state: "idle" | "sending" | "success" | "error"; reference?: string }>({ state: "idle" });
  const selected = picked ?? (linked >= 0 ? linked : DEFAULT_MENU);
  const menu = menus[selected];
  const dateInput = useRef<HTMLInputElement>(null);
  const num = (value: number) => formatNumber(lang, value);
  const counts = menus.map(countItems);
  const fromPrice = lowestPrice(menus);

  // Bookings cannot be made for a past date; set on the client so the prerendered HTML stays cacheable.
  useEffect(() => { if (dateInput.current) dateInput.current.min = localToday(); }, []);

  function choose(index: number) {
    setPicked(index);
    window.history.replaceState(null, "", `#${menus[index].id}`);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    requestAnimationFrame(() => document.getElementById("menu-detail")?.scrollIntoView({ behavior, block: "start" }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setSubmission({ state: "sending" });
    try {
      const reference = await createQuotation({
        customerName: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        email: String(form.get("email") ?? ""),
        guestCount: Number(form.get("guests") || 0),
        eventDate: String(form.get("date") ?? ""),
        eventType: String(form.get("event") ?? ""),
        details: String(form.get("note") ?? ""),
        menuId: menu.id,
        menuName: menu.name,
        menuPriceSar: menu.price,
        source: "menus",
        locale: lang,
        privacyAccepted: true,
      });
      setSubmission({ state: "success", reference });
      const value = (field: string) => String(form.get(field) || "-");
      const lines = lang === "ar"
        ? [
            "طلب عرض سعر لقائمة تيارا",
            `الرقم المرجعي: ${reference}`,
            `الاسم: ${value("name")}`,
            `الجوال: ${value("phone")}`,
            `البريد الإلكتروني: ${value("email")}`,
            `القائمة: ${menu.name}`,
            `السعر الأساسي: ${num(menu.price)} ر.س`,
            `عدد الضيوف: ${value("guests")}`,
            `تاريخ المناسبة: ${value("date")}`,
            `نوع المناسبة: ${value("event")}`,
            `التفاصيل: ${value("note")}`,
          ]
        : [
            "Tiara Catering menu quotation request",
            `Reference: ${reference}`,
            `Name: ${value("name")}`,
            `Phone: ${value("phone")}`,
            `Email: ${value("email")}`,
            `Menu: ${menu.name}`,
            `Starting price: SAR ${menu.price}`,
            `Guests: ${value("guests")}`,
            `Event date: ${value("date")}`,
            `Event type: ${value("event")}`,
            `Details: ${value("note")}`,
          ];
      window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(lines.join("\n"))}`, "_self");
    } catch (error) {
      console.error("Quotation submission failed", error);
      setSubmission({ state: "error" });
    }
  }

  return <main className={`menu-site ${lang}`} dir={t.dir}>
    <section className="menu-hero"><div className="menu-hero-copy"><p className="menu-kicker">{t.eyebrow}</p><h1>{t.title}</h1><p>{t.lead}</p><div className="menu-actions"><a className="menu-pill dark" href="#collection">{t.explore}<span aria-hidden="true">↓</span></a><a className="menu-text-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t.chat}<span aria-hidden="true">↗</span></a></div><p className="menu-helper">{t.helper} <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t.helperLink} →</a></p></div><div className="menu-hero-image"><img src="/images/cooking-classes-4.jpg" alt={lang === "ar" ? "مائدة ضيافة أنيقة من تيارا" : "Elegant Tiara Catering menu presentation"} fetchPriority="high" /><div className="menu-price-note"><small>{t.from}</small><strong>{num(fromPrice)}</strong><span>{t.packageRate}</span></div></div></section>
    <div className="menu-trust">{t.trust.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>

    <section id="collection" className="menu-section menu-collection"><div className="menu-section-head"><div><p className="menu-kicker">{t.collectionTag}</p><h2>{t.collectionTitle}</h2></div><p>{t.collectionLead}</p></div><div className="package-grid">{menus.map((pkg, i) => <article id={pkg.id} className={`${selected === i ? "selected" : ""} ${i === 1 ? "featured" : ""}`} key={pkg.id}>{pkg.badge && <span className="package-badge">{pkg.badge}</span>}<small aria-hidden="true">0{i + 1}</small><h3>{pkg.name}</h3><div className="package-price"><span>{t.from}</span><strong>{num(pkg.price)}</strong></div><p>{t.fit[i]}</p><span className="package-count">{num(counts[i])} {t.dishes}</span><ul>{pkg.categories.map((category) => <li key={category.title}>{category.title}<span>{num(category.items.length)}</span></li>)}</ul><button type="button" aria-pressed={selected === i} onClick={() => choose(i)}>{selected === i ? t.selected : t.view}<span aria-hidden="true">{selected === i ? "✓" : "→"}</span></button></article>)}</div></section>

    <section id="menu-detail" className="menu-detail"><div className="detail-heading" aria-live="polite"><p className="menu-kicker">{t.detailTag}</p><h2>{t.detailTitle} <em>{menu.name}</em></h2><div className="detail-meta"><span>{num(counts[selected])} {t.selections}</span><span>{num(menu.categories.length)} {t.courses}</span><span>{t.from} {num(menu.price)}</span></div></div><div className="detail-layout"><div className="course-list">{menu.categories.map((category, categoryIndex) => <section id={`${menu.id}-course-${categoryIndex}`} key={category.title}><header><span aria-hidden="true">0{categoryIndex + 1}</span><h3>{category.title}</h3><small>{num(category.items.length)}</small></header><ul>{category.items.map((item) => <li key={item}><span>{item}</span><i aria-hidden="true" /></li>)}</ul></section>)}</div><aside id="quotation" className="quote-builder"><p className="menu-kicker">{t.quoteCardTag}</p><h3>{t.quoteCardTitle}</h3><p>{t.quoteCardBody}</p><div className="chosen-menu"><span>{menu.name}</span><strong>{t.from} {num(menu.price)}</strong></div><form onSubmit={submit}><label>{t.name}<input name="name" autoComplete="name" minLength={2} maxLength={100} required /></label><label>{t.phone}<input name="phone" type="tel" autoComplete="tel" minLength={7} maxLength={25} required /></label><label>{t.email}<input name="email" type="email" autoComplete="email" maxLength={254} /></label><label>{t.guests}<input name="guests" type="number" inputMode="numeric" min="1" max="5000" required placeholder="50" /></label><label>{t.date}<input ref={dateInput} name="date" type="date" required /></label><label>{t.event}<select name="event" required>{t.eventOptions.map((option) => <option key={option}>{option}</option>)}</select></label><label>{t.note}<textarea name="note" rows={3} maxLength={2000} placeholder={t.notePlaceholder} /></label><label className="quote-consent"><input name="privacy" type="checkbox" required /><span>{t.consent} <Link href={lang === "ar" ? "/ar/privacy-policy" : "/privacy-policy"}>{lang === "ar" ? "اقرأ السياسة" : "Read the policy"}</Link></span></label><button className="menu-pill gold" type="submit" disabled={submission.state === "sending"}>{submission.state === "sending" ? t.sending : t.send}<span aria-hidden="true">↗</span></button><small className={`submission-message ${submission.state}`} aria-live="polite">{submission.state === "success" ? `${t.success}: ${submission.reference}` : submission.state === "error" ? t.error : t.reply}</small></form></aside></div><p className="serving-note">{t.servingNote}</p></section>

    <section className="menu-why menu-section"><div className="menu-section-head"><div><p className="menu-kicker">{t.whyTag}</p><h2>{t.whyTitle}</h2></div></div><div>{t.why.map(([title, desc], i) => <article key={title}><span aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

    <section id="faq" className="menu-faq menu-section"><div><p className="menu-kicker">{t.faqTag}</p><h2>{t.faqTitle}</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="menu-final"><img src="/images/cooking-classes-8.jpg" alt="" loading="lazy" /><div /><article><h2>{t.finalTitle}</h2><p>{t.finalBody}</p><div className="menu-actions"><a className="menu-pill gold" href="#quotation">{t.quote}<span aria-hidden="true">↗</span></a><a className="menu-text-link light" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t.chat}<span aria-hidden="true">↗</span></a></div></article></section>
    <div className="mobile-menu-cta"><span><small>{menu.name}</small><b>{t.from} {num(menu.price)}</b></span><a href="#quotation">{t.quote}</a></div>
  </main>;
}
