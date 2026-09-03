"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CALL_DISPLAY, CALL_HREF, EMAIL, EMAIL_HREF, LOCATION_AR, LOCATION_EN, LOCATION_MAP_URL, WHATSAPP_URL } from "./contact-details";
import { socialLinks } from "./social-links";

type Lang = "en" | "ar";
type SocialLabel = (typeof socialLinks)[number]["label"];

function SocialIcon({ label }: { label: SocialLabel }) {
  const mark = label === "Facebook" ? "f" : label === "LinkedIn" ? "in" : label === "X" ? "𝕏" : "";
  return <span className={`footer-social-icon ${label.toLowerCase()}`} aria-hidden="true">{mark}</span>;
}

const chrome = {
    en: {
      dir: "ltr",
      home: "/",
      skip: "Skip to content",
      switchLabel: "العربية",
      switchAria: "التبديل إلى العربية",
      navLabel: "Main navigation",
      menu: "Menu",
      close: "Close",
      quote: "Request a quote",

      nav: [
        ["About", "#about"],
        ["Services", "#services"],
        ["Menus", "/menus"],
        ["Gallery", "#gallery"],
        ["Houses", "#brands"],
        ["Contact", "#contact"],
      ],

      connect: "Connect",
      explore: "Explore",
      call: "Call",
      location: LOCATION_EN,

      privacy: "Privacy Policy",

      footerBody:
        "Culinary excellence meets the heart of Saudi tradition. Based in Riyadh, crafting dining experiences people remember.",

      rights: "© 2026 Tiara Catering. All rights reserved.",
    },
  ar: {
    dir: "rtl",
    home: "/ar",
    skip: "انتقل إلى المحتوى",
    switchLabel: "EN",
    switchAria: "Switch to English",
    navLabel: "القائمة الرئيسية",
    menu: "القائمة",
    close: "إغلاق",
    quote: "اطلب عرض سعر",

    nav: [
      ["عن تيارا", "#about"],
      ["خدماتنا", "#services"],
      ["القوائم", "/ar/menus"],
      ["المعرض", "#gallery"],
      ["بيوتنا", "#brands"],
      ["تواصل معنا", "#contact"],
    ],

    connect: "تواصل",
    explore: "اكتشف",
    call: "اتصل",
    location: LOCATION_AR,

    privacy: "سياسة الخصوصية",

    footerBody:
      "التميّز في الطهي يلتقي بقلب التراث السعودي. من الرياض نصنع تجارب ضيافة تبقى في الذاكرة.",

    rights: "© ٢٠٢٦ تيارا للضيافة. جميع الحقوق محفوظة.",
  },
} as const;

// The fixed header is transparent over the hero and picks up a glass surface once the page moves.
const subscribeToScroll = (onChange: () => void) => { window.addEventListener("scroll", onChange, { passive: true }); return () => window.removeEventListener("scroll", onChange); };
const readScrolled = () => window.scrollY > 24;
const readTopOfPage = () => false;

const isArabic = (pathname: string) => pathname === "/ar" || pathname.startsWith("/ar/");
// The language switch always lands on the same page in the other locale: /menus <-> /ar/menus.
const counterpart = (pathname: string) => isArabic(pathname) ? pathname.slice(3) || "/" : pathname === "/" ? "/ar" : `/ar${pathname}`;

// The router skips fixed-position elements when it looks for somewhere to scroll after a
// navigation, and the fixed header is the first thing in the layout — so it leaves whatever
// scroll position the previous page had. The chrome therefore drives scrolling itself: it
// records a position per history URL, starts a page-to-page navigation at the top, and puts
// the visitor back where they were on a back/forward step. Hash links own their own target.
const scrollPositions = new Map<string, number>();
const locationKey = () => `${window.location.pathname}${window.location.hash}`;
const jumpTo = (top: number) => window.scrollTo({ top, behavior: "instant" });

// Lazy images finish laying out a moment after the page renders and nudge the position, so a
// restored one is applied a second time once that has settled — unless the visitor, who may
// well start scrolling immediately, has already taken over.
function settleAt(top: number) {
  jumpTo(top);
  const inputs = ["wheel", "touchstart", "keydown"] as const;
  const stop = () => {
    window.clearTimeout(retry);
    inputs.forEach((event) => window.removeEventListener(event, stop));
  };
  const retry = window.setTimeout(() => { jumpTo(top); stop(); }, 300);
  inputs.forEach((event) => window.addEventListener(event, stop, { passive: true }));
}

// Hash targets live on the home page, so they are prefixed when the visitor is elsewhere.
// Plain anchors keep same-page jumps free of a router navigation.
function ChromeLink({ href, children, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith("#")) {
    const followSection = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      // The shared chrome stays mounted between pages. Reinforce the browser's fragment
      // jump after the click so a repeated click (where no hashchange fires) still works.
      window.requestAnimationFrame(() => {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    return <a href={href} className="font-ar-15" onClick={followSection} {...rest}>{children}</a>;
  }
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    scrollPositions.set(locationKey(), window.scrollY);
    if (!href.includes("#")) jumpTo(0);
  };
  return <Link href={href} onClick={navigate} {...rest}>{children}</Link>;
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lang: Lang = isArabic(pathname) ? "ar" : "en";
  const t = chrome[lang];
  const onHome = pathname === t.home;
  const onMenus = pathname === "/menus" || pathname === "/ar/menus";
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeToScroll, readScrolled, readTopOfPage);
  const committed = useRef(pathname);
  const here = useRef("");
  const pendingRestore = useRef<number | null>(null);

  const resolve = (href: string) => href.startsWith("#") && !onHome ? `${t.home}${href}` : href;
  // The menus page carries its own quotation builder; everywhere else the CTA leads to the contact form.
  const quoteHref = onMenus ? "#quotation" : resolve("#contact");
  const privacyHref =
  lang === "ar" ? "/ar/privacy-policy" : "/privacy-policy";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  useEffect(() => {
    // Nothing else may move the page: the browser restores a position of its own measured
    // before the new page rendered, and it would otherwise win the race.
    history.scrollRestoration = "manual";
    here.current = locationKey();
    // A back/forward step reports the URL it is going to, while the page is still showing —
    // and still scrolled to — the one it is leaving, so both can be recorded here. A step
    // within the same page can be restored at once; one that swaps the page has to wait.
    const restore = () => {
      scrollPositions.set(here.current, window.scrollY);
      const hashTarget = window.location.hash.slice(1);
      if (window.location.pathname === committed.current && hashTarget) {
        here.current = locationKey();
        window.requestAnimationFrame(() => {
          document.getElementById(hashTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
      const target = scrollPositions.get(locationKey()) ?? 0;
      here.current = locationKey();
      if (window.location.pathname === committed.current) settleAt(target);
      // A fragment is a more precise return destination than the recorded pixel
      // position. Let the post-navigation hash effect own that restoration.
      else pendingRestore.current = hashTarget ? null : target;
    };
    const followHash = () => {
      here.current = locationKey();
      const target = window.location.hash.slice(1);
      if (target) window.requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    };
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", followHash);
    return () => {
      history.scrollRestoration = "auto";
      window.removeEventListener("popstate", restore);
      window.removeEventListener("hashchange", followHash);
    };
  }, []);
  useEffect(() => {
    committed.current = pathname;
    here.current = locationKey();
    if (pendingRestore.current === null) return;
    settleAt(pendingRestore.current);
    pendingRestore.current = null;
  }, [pathname]);
  useEffect(() => {
    // A smooth fragment scroll needs animation frames, and a page opened in a background tab
    // gets none — so a link such as /menus#menu-3, the URL published in our structured data,
    // would leave the visitor at the top. Land on the target if nothing scrolled by itself.
    const target = window.location.hash.slice(1);
    if (!target) return;
    const startingY = window.scrollY;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    const rescue = window.setTimeout(() => {
      if (window.scrollY === startingY) document.getElementById(target)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, 400);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(rescue);
    };
  }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return <div className={`site-chrome ${lang}`} dir={t.dir}>
    <a className="skip-link" href="#content">{t.skip}</a>

    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <ChromeLink className="brand" href={t.home} aria-label="Tiara Catering"><img src="/tiara-logo.png" alt="Tiara Catering" /></ChromeLink>
    <nav
  className={open ? "nav open" : "nav"}
  aria-label={t.navLabel}
>
        {t.nav.map(([label, href]) => <ChromeLink href={resolve(href)} onClick={() => setOpen(false)} aria-current={href === pathname ? "page" : undefined} key={href}>{label}</ChromeLink>)}
        <ChromeLink className="mobile-quote" href={quoteHref} onClick={() => setOpen(false)}>{t.quote}</ChromeLink>
      </nav>
      <div className="header-actions">
        <ChromeLink className="language" href={counterpart(pathname)} hrefLang={lang === "ar" ? "en" : "ar"} aria-label={t.switchAria} onClick={() => setOpen(false)}>{t.switchLabel}</ChromeLink>
        <ChromeLink className="pill dark desktop-cta" href={quoteHref} onClick={() => setOpen(false)}>{t.quote}<span aria-hidden="true">↗</span></ChromeLink>
      <button
  type="button"
  className="menu"
  onClick={() => setOpen((current) => !current)}
  aria-expanded={open}
  aria-label={open ? t.close : t.menu}
>
  {open ? "×" : "☰"}
</button>
      </div>

    </header>

    {open && (
      <button
        type="button"
        className="mobile-menu-backdrop"
        aria-label={t.close}
        onClick={() => setOpen(false)}
      />
    )}

    <div id="content">{children}</div>

    <footer className="site-footer">
      <div className="footer-brand"><img src="/tiara-logo.png" alt="Tiara Catering" /><p>{t.footerBody}</p></div>
      <div>
        <span>{t.connect}</span>
     <a href={CALL_HREF} className="footer-phone">
  <span>{t.call}:</span>
  <span className="phone-number">{CALL_DISPLAY}</span>
        </a>
        <a href={EMAIL_HREF}>{EMAIL}</a>
        <a className="footer-address" href={LOCATION_MAP_URL} target="_blank" rel="noopener noreferrer">{t.location}</a>
      </div>
     <div>
      <span>{t.explore}</span>

      {t.nav.slice(0, 4).map(([label, href]) => (
        <ChromeLink href={resolve(href)} key={href}>
          {label}
        </ChromeLink>
      ))}

      <ChromeLink href={privacyHref}>
        {t.privacy}
      </ChromeLink>
    </div>
      <div className="footer-bottom">
        <small>{t.rights}</small>
        <div className="footer-socials" aria-label={lang === "ar" ? "حسابات تيارا على منصات التواصل" : "Tiara Catering social media"}>
          {socialLinks.map(({ label, href }) => <a className="footer-social-link" href={href} key={label} target="_blank" rel="noopener noreferrer" aria-label={`${label} — Tiara Catering`} title={label}><SocialIcon label={label} /></a>)}
          <a className="footer-social-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp — Tiara Catering" title="WhatsApp"><MessageCircle size={17} strokeWidth={1.7} aria-hidden="true" /></a>
        </div>
      </div>
    </footer>
  </div>;
}
