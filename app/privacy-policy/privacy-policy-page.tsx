"use client";

import Link from "next/link";
import {
  CALL_DISPLAY,
  CALL_HREF,
  EMAIL,
  EMAIL_HREF,
} from "../contact-details";

type Lang = "en" | "ar";

const content = {
  en: {
    dir: "ltr" as const,

    eyebrow: "Tiara Catering · Legal",
    title: "Privacy Policy",
    intro:
      "Your privacy matters to us. This Privacy Policy explains how Tiara Catering collects, uses, protects and handles personal information when you use our website or contact us regarding our catering and event services.",

    updated: "Last updated",
    updatedDate: "11 August 2026",

    sections: [
      {
        number: "01",
        title: "About Tiara Catering",
        paragraphs: [
          "Tiara Catering is a catering and hospitality business based in Riyadh, Saudi Arabia. We provide catering, private events, corporate events, weddings, special events, culinary experiences and related hospitality services.",
          "This Privacy Policy applies to personal information collected through the Tiara Catering website and through enquiries initiated from the website.",
        ],
      },

      {
        number: "02",
        title: "Personal data we may collect",
        paragraphs: [
          "Depending on how you interact with us, we may collect information that you voluntarily provide when requesting information, contacting us or requesting a quotation.",
        ],
        bullets: [
          "Full name",
          "Telephone or mobile number",
          "Email address",
          "Event type",
          "Event date",
          "Number of guests",
          "Event location",
          "Dietary requirements or preferences that you choose to provide",
          "Service requirements",
          "Messages, notes and enquiry details",
          "Information you provide when communicating with us through WhatsApp, telephone or email",
          "Technical website information where analytics or similar technologies are enabled",
        ],
      },

      {
        number: "03",
        title: "How we collect your information",
        paragraphs: [
          "We primarily collect personal information directly from you when you submit or prepare an enquiry through our website, contact us by telephone or email, communicate with us through WhatsApp, or otherwise request our services.",
          "Certain technical information may also be collected automatically through cookies, analytics or similar technologies when those services are enabled on our website.",
        ],
      },

      {
        number: "04",
        title: "Why we use personal information",
        paragraphs: [
          "We use personal information only for legitimate purposes connected with operating Tiara Catering and providing our services.",
        ],
        bullets: [
          "Responding to enquiries and quotation requests",
          "Preparing catering and event proposals",
          "Understanding your event requirements",
          "Communicating about bookings and services",
          "Planning and delivering events",
          "Providing customer service",
          "Maintaining business and transaction records where required",
          "Improving our website, services and customer experience",
          "Meeting legal, regulatory, accounting and security obligations",
          "Preventing misuse, fraud or security incidents",
        ],
      },

      {
        number: "05",
        title: "Legal basis for processing",
        paragraphs: [
          "We process personal information only where an appropriate legal basis is available under applicable laws in the Kingdom of Saudi Arabia, including the Saudi Personal Data Protection Law.",
          "Depending on the processing activity, this may include your consent, processing necessary in connection with your request or contractual relationship with Tiara Catering, compliance with a legal obligation, or another lawful basis permitted by applicable law.",
          "Where processing is based on your consent, you may withdraw that consent subject to applicable legal requirements.",
        ],
      },

      {
        number: "06",
        title: "WhatsApp and third-party services",
        paragraphs: [
          "When you choose to send an enquiry through WhatsApp, the website prepares the information you entered and redirects you to WhatsApp so that you can send the message.",
          "Your use of WhatsApp and other third-party platforms is also governed by the privacy terms and policies of those providers. Those providers may process information independently from Tiara Catering.",
          "We encourage you to review the privacy policies of third-party services you use.",
        ],
      },

      {
        number: "07",
        title: "Sharing personal information",
        paragraphs: [
          "We do not sell your personal information.",
          "We may disclose information where reasonably necessary to employees, authorised service providers, technology providers, event partners or other parties involved in delivering a service you requested.",
          "We may also disclose information where required by applicable law, regulation, court order or competent government authority.",
          "Service providers are expected to handle personal information only for the purposes for which it was provided and in accordance with applicable data protection requirements.",
        ],
      },

      {
        number: "08",
        title: "International data transfers",
        paragraphs: [
          "Some third-party technology or communication services used in connection with the website may process information using infrastructure located outside Saudi Arabia.",
          "Where Tiara Catering transfers personal data outside the Kingdom, any such transfer will be handled in accordance with applicable Saudi data protection requirements.",
        ],
      },

      {
        number: "09",
        title: "Cookies and analytics",
        paragraphs: [
          "Our website may use cookies or similar technologies that are necessary for website functionality, security and performance.",
          "Where analytics or other non-essential technologies are enabled, they may collect information such as browser type, device information, pages visited and general usage information.",
          "You can control cookies through your browser settings. Disabling some technologies may affect certain website functionality.",
        ],
      },

      {
        number: "10",
        title: "How long we keep your data",
        paragraphs: [
          "We keep personal information only for as long as necessary for the purpose for which it was collected, to provide requested services, resolve enquiries, maintain appropriate business records, or satisfy applicable legal and regulatory requirements.",
          "When personal information is no longer required, it will be securely deleted, destroyed or anonymised where appropriate and subject to applicable law.",
        ],
      },

      {
        number: "11",
        title: "How we protect personal information",
        paragraphs: [
          "Tiara Catering takes reasonable administrative, organisational and technical measures intended to protect personal information against unauthorised access, loss, misuse, alteration or disclosure.",
          "No website or electronic communication system can provide absolute security, but we continually work to use appropriate safeguards relative to the nature of the information being processed.",
        ],
      },

      {
        number: "12",
        title: "Your personal data rights",
        paragraphs: [
          "Subject to the Saudi Personal Data Protection Law and other applicable requirements, you may have rights relating to your personal information.",
        ],
        bullets: [
          "The right to be informed about how your personal data is processed",
          "The right to access your personal data",
          "The right to obtain a copy of your personal data where applicable",
          "The right to request correction of inaccurate, incomplete or outdated information",
          "The right to request destruction of personal data where applicable",
          "The right to withdraw consent where processing relies on consent",
          "The right to raise questions or complaints regarding the processing of your data",
        ],
      },

      {
        number: "13",
        title: "How to exercise your rights",
        paragraphs: [
          "To request access, correction, deletion or another privacy-related request, contact Tiara Catering using the contact details provided below.",
          "We may need to verify your identity before completing a request to protect your personal information from unauthorised disclosure.",
        ],
      },

      {
        number: "14",
        title: "Children's privacy",
        paragraphs: [
          "Our website and catering enquiry services are not specifically directed toward children. We do not knowingly request personal information directly from children through our general website enquiry forms.",
          "Where information relating to a child is necessary for an event or service, it should be provided by a parent, guardian or another authorised adult where required.",
        ],
      },

      {
        number: "15",
        title: "External links",
        paragraphs: [
          "Our website may contain links to websites or services operated by other organisations. Tiara Catering is not responsible for the privacy practices or content of those independent websites.",
        ],
      },

      {
        number: "16",
        title: "Changes to this Privacy Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time to reflect changes to our services, technologies or legal requirements.",
          "The latest version will be published on this page together with its most recent update date.",
        ],
      },
    ],

    contactTag: "Privacy enquiries",
    contactTitle: "Questions about your data?",
    contactBody:
      "For questions, requests or complaints concerning this Privacy Policy or your personal information, contact Tiara Catering.",
    address:
      "2744 Abdullah Al-Ahwani Street, Al Qirawan District, RRQA6432, 6432, Riyadh 13531, Saudi Arabia",

    back: "Back to Tiara Catering",
    language: "العربية",
  },

  ar: {
    dir: "rtl" as const,

    eyebrow: "تيارا للضيافة · قانوني",
    title: "سياسة الخصوصية",
    intro:
      "خصوصيتكم مهمة بالنسبة لنا. توضح سياسة الخصوصية هذه كيفية قيام تيارا للضيافة بجمع البيانات الشخصية واستخدامها وحمايتها والتعامل معها عند استخدام موقعنا الإلكتروني أو التواصل معنا بخصوص خدمات الضيافة والمناسبات.",

    updated: "آخر تحديث",
    updatedDate: "11 أغسطس 2026",

    sections: [
      {
        number: "01",
        title: "عن تيارا للضيافة",
        paragraphs: [
          "تيارا للضيافة هي منشأة متخصصة في خدمات الضيافة والمناسبات ومقرها مدينة الرياض في المملكة العربية السعودية. نقدم خدمات ضيافة الشركات والمناسبات الخاصة والأعراس والفعاليات وتجارب الطهي والخدمات المرتبطة بها.",
          "تنطبق هذه السياسة على البيانات الشخصية التي يتم جمعها من خلال موقع تيارا للضيافة أو من خلال طلبات التواصل التي تبدأ عبر الموقع.",
        ],
      },

      {
        number: "02",
        title: "البيانات الشخصية التي قد نجمعها",
        paragraphs: [
          "بحسب طريقة تواصلك معنا، قد نقوم بجمع البيانات التي تقدمها لنا طوعاً عند التواصل معنا أو طلب معلومات أو عرض سعر.",
        ],
        bullets: [
          "الاسم الكامل",
          "رقم الهاتف أو الجوال",
          "البريد الإلكتروني",
          "نوع المناسبة",
          "تاريخ المناسبة",
          "عدد الضيوف",
          "موقع المناسبة",
          "الاحتياجات أو التفضيلات الغذائية التي تختار مشاركتها",
          "متطلبات الخدمة",
          "الرسائل والملاحظات وتفاصيل الطلب",
          "المعلومات التي تقدمها أثناء التواصل معنا عبر واتساب أو الهاتف أو البريد الإلكتروني",
          "بعض المعلومات التقنية المتعلقة باستخدام الموقع عند تفعيل خدمات التحليلات أو التقنيات المشابهة",
        ],
      },

      {
        number: "03",
        title: "كيف نجمع بياناتك",
        paragraphs: [
          "نجمع البيانات الشخصية بشكل أساسي منك مباشرة عندما تقوم بإعداد أو إرسال طلب عبر الموقع، أو التواصل معنا بالهاتف أو البريد الإلكتروني أو واتساب، أو عند طلب إحدى خدماتنا.",
          "وقد يتم جمع بعض البيانات التقنية بشكل تلقائي من خلال ملفات تعريف الارتباط أو أدوات التحليل أو التقنيات المشابهة عند تفعيلها على الموقع.",
        ],
      },

      {
        number: "04",
        title: "لماذا نستخدم البيانات الشخصية",
        paragraphs: [
          "نستخدم البيانات الشخصية للأغراض المشروعة المرتبطة بتشغيل تيارا للضيافة وتقديم خدماتنا.",
        ],
        bullets: [
          "الرد على الاستفسارات وطلبات عروض الأسعار",
          "إعداد عروض الضيافة والمناسبات",
          "فهم متطلبات المناسبة",
          "التواصل بخصوص الحجوزات والخدمات",
          "تخطيط وتنفيذ المناسبات",
          "تقديم خدمة العملاء",
          "الاحتفاظ بالسجلات التجارية عند الحاجة",
          "تحسين الموقع والخدمات وتجربة العملاء",
          "الوفاء بالمتطلبات النظامية والمحاسبية والأمنية",
          "المساعدة في منع إساءة الاستخدام أو الاحتيال أو الحوادث الأمنية",
        ],
      },

      {
        number: "05",
        title: "الأساس النظامي للمعالجة",
        paragraphs: [
          "نقوم بمعالجة البيانات الشخصية عندما يتوفر مسوغ نظامي مناسب وفق الأنظمة المعمول بها في المملكة العربية السعودية، بما في ذلك نظام حماية البيانات الشخصية.",
          "قد يشمل ذلك موافقتك عند الحاجة، أو المعالجة المتعلقة بطلبك أو بالعلاقة التعاقدية مع تيارا للضيافة، أو الالتزام بمتطلب نظامي، أو أي مسوغ آخر يسمح به النظام.",
          "عندما تعتمد المعالجة على موافقتك، يمكنك سحب هذه الموافقة وفقاً للمتطلبات النظامية المطبقة.",
        ],
      },

      {
        number: "06",
        title: "واتساب والخدمات الخارجية",
        paragraphs: [
          "عند اختيار إرسال طلب عبر واتساب، يقوم الموقع بإعداد المعلومات التي أدخلتها وتحويلك إلى واتساب لتتمكن أنت من إرسال الرسالة.",
          "يخضع استخدامك لواتساب أو أي منصة خارجية أيضاً لشروط وسياسات الخصوصية الخاصة بمقدم تلك الخدمة، وقد يقوم مقدم الخدمة بمعالجة البيانات بشكل مستقل عن تيارا للضيافة.",
          "ننصح بمراجعة سياسات الخصوصية للخدمات الخارجية التي تستخدمها.",
        ],
      },

      {
        number: "07",
        title: "مشاركة البيانات الشخصية",
        paragraphs: [
          "لا نقوم ببيع بياناتك الشخصية.",
          "قد تتم مشاركة البيانات عند الحاجة مع الموظفين المخولين أو مقدمي الخدمات أو مزودي التقنية أو الأطراف المشاركة في تنفيذ الخدمة التي طلبتها.",
          "وقد يتم الإفصاح عن البيانات عندما يكون ذلك مطلوباً بموجب الأنظمة أو اللوائح أو أوامر الجهات القضائية أو الحكومية المختصة.",
          "نتوقع من مقدمي الخدمات التعامل مع البيانات فقط للأغراض التي تم تقديمها من أجلها ووفق متطلبات حماية البيانات المطبقة.",
        ],
      },

      {
        number: "08",
        title: "نقل البيانات خارج المملكة",
        paragraphs: [
          "قد تستخدم بعض خدمات التقنية أو الاتصال الخارجية المرتبطة بالموقع بنية تقنية موجودة خارج المملكة العربية السعودية.",
          "وفي حال قيام تيارا للضيافة بنقل بيانات شخصية خارج المملكة، فسيتم التعامل مع النقل وفق المتطلبات المطبقة لحماية البيانات الشخصية في المملكة.",
        ],
      },

      {
        number: "09",
        title: "ملفات تعريف الارتباط والتحليلات",
        paragraphs: [
          "قد يستخدم موقعنا ملفات تعريف الارتباط أو تقنيات مشابهة تكون ضرورية لعمل الموقع وأمنه وأدائه.",
          "وعند تفعيل أدوات التحليل أو التقنيات غير الضرورية، فقد يتم جمع بيانات مثل نوع المتصفح والجهاز والصفحات التي تمت زيارتها وبعض معلومات الاستخدام العامة.",
          "يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك، وقد يؤثر تعطيل بعضها على بعض وظائف الموقع.",
        ],
      },

      {
        number: "10",
        title: "مدة الاحتفاظ بالبيانات",
        paragraphs: [
          "نحتفظ بالبيانات الشخصية فقط للمدة اللازمة لتحقيق الغرض الذي جمعت من أجله، أو لتقديم الخدمة المطلوبة، أو معالجة الاستفسارات، أو الاحتفاظ بالسجلات اللازمة، أو الوفاء بالمتطلبات النظامية.",
          "عندما تنتفي الحاجة إلى البيانات، يتم حذفها أو إتلافها أو إخفاء هويتها بصورة آمنة عند الاقتضاء ووفق الأنظمة المطبقة.",
        ],
      },

      {
        number: "11",
        title: "حماية البيانات الشخصية",
        paragraphs: [
          "تتخذ تيارا للضيافة إجراءات إدارية وتنظيمية وتقنية مناسبة تهدف إلى حماية البيانات الشخصية من الوصول غير المصرح به أو الفقد أو سوء الاستخدام أو التغيير أو الإفصاح.",
          "لا يمكن لأي موقع أو وسيلة اتصال إلكترونية ضمان الأمان المطلق، ولذلك نعمل على تطبيق إجراءات حماية تتناسب مع طبيعة البيانات التي تتم معالجتها.",
        ],
      },

      {
        number: "12",
        title: "حقوق صاحب البيانات الشخصية",
        paragraphs: [
          "وفقاً لنظام حماية البيانات الشخصية والمتطلبات المطبقة، قد يكون لك عدد من الحقوق المتعلقة ببياناتك الشخصية.",
        ],
        bullets: [
          "الحق في العلم بكيفية معالجة بياناتك الشخصية",
          "الحق في الوصول إلى بياناتك الشخصية",
          "الحق في الحصول على نسخة من بياناتك عند انطباق ذلك",
          "الحق في طلب تصحيح البيانات غير الدقيقة أو غير المكتملة أو القديمة",
          "الحق في طلب إتلاف البيانات الشخصية عند انطباق ذلك",
          "الحق في سحب الموافقة عندما تستند المعالجة إلى الموافقة",
          "الحق في تقديم استفسار أو شكوى تتعلق بمعالجة بياناتك",
        ],
      },

      {
        number: "13",
        title: "كيفية ممارسة حقوقك",
        paragraphs: [
          "لطلب الوصول أو التصحيح أو الإتلاف أو أي طلب آخر يتعلق بالخصوصية، يمكنك التواصل مع تيارا للضيافة عبر بيانات الاتصال الموضحة أدناه.",
          "قد نحتاج إلى التحقق من هويتك قبل تنفيذ الطلب لحماية بياناتك من الوصول أو الإفصاح غير المصرح به.",
        ],
      },

      {
        number: "14",
        title: "خصوصية الأطفال",
        paragraphs: [
          "موقعنا وخدمات طلبات الضيافة ليست موجهة بشكل خاص للأطفال، ولا نطلب عن علم بيانات شخصية مباشرة من الأطفال من خلال نماذج التواصل العامة في الموقع.",
          "إذا كانت هناك حاجة إلى بيانات متعلقة بطفل لتنفيذ مناسبة أو خدمة، فيجب تقديمها من ولي الأمر أو شخص بالغ مخول عند الحاجة.",
        ],
      },

      {
        number: "15",
        title: "الروابط الخارجية",
        paragraphs: [
          "قد يحتوي موقعنا على روابط إلى مواقع أو خدمات تديرها جهات أخرى. ولا تتحمل تيارا للضيافة مسؤولية ممارسات الخصوصية أو محتوى تلك المواقع المستقلة.",
        ],
      },

      {
        number: "16",
        title: "تحديث سياسة الخصوصية",
        paragraphs: [
          "قد نقوم بتحديث هذه السياسة من وقت لآخر لتعكس التغييرات في خدماتنا أو التقنيات المستخدمة أو المتطلبات النظامية.",
          "سيتم نشر أحدث نسخة على هذه الصفحة مع توضيح تاريخ آخر تحديث.",
        ],
      },
    ],

    contactTag: "استفسارات الخصوصية",
    contactTitle: "لديك سؤال حول بياناتك؟",
    contactBody:
      "لأي استفسار أو طلب أو شكوى متعلقة بسياسة الخصوصية أو بياناتك الشخصية، يمكنك التواصل مع تيارا للضيافة.",

    address:
      "2744 عبدالله الأهواني، حي القيروان، الرياض 13531، المملكة العربية السعودية",

    back: "العودة إلى تيارا للضيافة",
    language: "English",
  },
} as const;

export default function PrivacyPolicyPage({
  lang = "en",
}: {
  lang?: Lang;
}) {
  const t = content[lang];

 

  return (
    <main className={`privacy-site ${lang}`} dir={t.dir}>
      <section className="privacy-hero">
        <nav className="privacy-nav">
         

          
        </nav>

        <div className="privacy-hero-content">
          <p className="privacy-kicker">{t.eyebrow}</p>

          <h1>{t.title}</h1>

          <p className="privacy-intro">{t.intro}</p>

          <div className="privacy-updated">
            <span>{t.updated}</span>
            <strong>{t.updatedDate}</strong>
          </div>
        </div>
      </section>

      <section className="privacy-layout">
        <aside className="privacy-index">
          <span>{lang === "ar" ? "المحتويات" : "Contents"}</span>

          <ol>
            {t.sections.map((section) => {
  const id = `privacy-${section.number}`;

  return (
    <li key={section.number}>
      <a
        href={`#${id}`}
        onClick={(event) => {
          event.preventDefault();

          const element = document.getElementById(id);

          if (!element) return;

          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}#${id}`
          );

          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
      >
        <small>{section.number}</small>
        {section.title}
      </a>
    </li>
  );
})}
          </ol>
        </aside>

        <div className="privacy-content">
          {t.sections.map((section) => (
            <article
              id={`privacy-${section.number}`}
              className="privacy-section"
              key={section.number}
            >
              <header>
                <span>{section.number}</span>
                <h2>{section.title}</h2>
              </header>

              <div className="privacy-section-body">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {"bullets" in section && section.bullets && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-contact">
        <div>
          <p className="privacy-kicker">{t.contactTag}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
        </div>

        <address>
          <a href={CALL_HREF}>
            <small>{lang === "ar" ? "الهاتف" : "Telephone"}</small>
            {CALL_DISPLAY}
          </a>

          <a href={EMAIL_HREF}>
            <small>
              {lang === "ar" ? "البريد الإلكتروني" : "Email"}
            </small>
            {EMAIL}
          </a>

          <div>
            <small>{lang === "ar" ? "العنوان" : "Address"}</small>
            <span>{t.address}</span>
          </div>
        </address>
      </section>

      <div className="privacy-back">
        <Link href={lang === "ar" ? "/ar" : "/"}>
          <span aria-hidden="true">{lang === "ar" ? "→" : "←"}</span>
          {t.back}
        </Link>
      </div>
    </main>
  );
}
