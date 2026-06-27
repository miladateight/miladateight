import { motion } from "framer-motion";
import { ArrowUpRight, AtSign, Github, Send, ShieldCheck } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import { fadeUp, stagger, springFast } from "../utils/motion";
import { localize } from "../utils/localize";

const contactCopy = {
  title: {
    en: "Open a technical conversation.",
    fa: "یک گفتگوی فنی را شروع کنید.",
    ar: "ابدأ محادثة تقنية.",
    de: "Starte ein technisches Gespräch.",
  },
  lead: {
    en: "Use the direct channels below for project reviews, infrastructure questions, automation work, or collaboration around web and mail systems.",
    fa: "برای بررسی پروژه، پرسش زیرساختی، کار اتوماسیون یا همکاری درباره سیستم‌های وب و ایمیل از مسیرهای مستقیم زیر استفاده کنید.",
    ar: "استخدم القنوات المباشرة أدناه لمراجعة المشاريع أو أسئلة البنية التحتية أو الأتمتة أو التعاون حول أنظمة الويب والبريد.",
    de: "Nutze die direkten Kanäle unten für Projekt-Reviews, Infrastrukturfragen, Automatisierung oder Zusammenarbeit rund um Web- und Mail-Systeme.",
  },
  fastest: {
    en: "Fastest for short coordination",
    fa: "سریع‌ترین مسیر برای هماهنگی کوتاه",
    ar: "الأسرع للتنسيق المختصر",
    de: "Schnellster Weg für kurze Abstimmung",
  },
  detailed: {
    en: "Best for detailed context",
    fa: "مناسب برای توضیح کامل‌تر",
    ar: "الأفضل للسياق التفصيلي",
    de: "Am besten für ausführlichen Kontext",
  },
  source: {
    en: "Repositories and public work",
    fa: "مخزن‌ها و کارهای عمومی",
    ar: "المستودعات والعمل العام",
    de: "Repositorien und öffentliche Arbeit",
  },
  fallbackTitle: {
    en: "Mail fallback",
    fa: "مسیر جایگزین ایمیل",
    ar: "بديل البريد الإلكتروني",
    de: "E-Mail-Fallback",
  },
  fallbackBody: {
    en: "If a Telegram link does not open on your device, email is the reliable fallback. Include a short context, target system, and any constraints you can share safely.",
    fa: "اگر لینک تلگرام روی دستگاه شما باز نشد، ایمیل مسیر مطمئن جایگزین است. خلاصه‌ای از زمینه، سیستم هدف و محدودیت‌هایی که می‌توانید امن به اشتراک بگذارید را بنویسید.",
    ar: "إذا لم يفتح رابط Telegram على جهازك، فالبريد الإلكتروني هو البديل الموثوق. أرسل سياقا مختصرا والنظام المستهدف وأي قيود يمكن مشاركتها بأمان.",
    de: "Wenn der Telegram-Link auf deinem Gerät nicht öffnet, ist E-Mail der zuverlässige Fallback. Sende kurzen Kontext, Zielsystem und sicher teilbare Einschränkungen mit.",
  },
};

export default function Contact({ t, language }) {
  const methods = [
    {
      icon: Send,
      title: "Telegram",
      desc: contactCopy.fastest,
      link: profile.telegram,
      label: profile.telegram.replace("https://", ""),
      external: true,
      primary: true,
    },
    {
      icon: AtSign,
      title: "Email",
      desc: contactCopy.detailed,
      link: `mailto:${profile.email}?subject=AT8%20technical%20collaboration`,
      label: profile.email,
    },
    {
      icon: Github,
      title: "GitHub",
      desc: contactCopy.source,
      link: profile.github,
      label: profile.github.replace("https://", ""),
      external: true,
    },
  ];

  return (
    <div className="page-container">
      <section className="subpage-hero contact-hero">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p className="section-label" variants={fadeUp}>
            <AtSign size={14} aria-hidden="true" />
            {t.nav[3]}
          </motion.p>
          <motion.h1 variants={fadeUp}>
            <TextReveal>{localize(contactCopy.title, language)}</TextReveal>
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>{localize(contactCopy.lead, language)}</motion.p>
        </motion.div>
      </section>

      <section className="section compact-section">
        <RevealGroup className="contact-methods">
          {methods.map((method) => {
            const Icon = method.icon;
            return (
              <Reveal key={method.title}>
                <motion.a
                  href={method.link}
                  className={`contact-method ${method.primary ? "primary" : ""}`}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springFast}
                >
                  <span className="contact-method-icon"><Icon size={21} aria-hidden="true" /></span>
                  <span className="contact-method-info">
                    <strong>{method.title}</strong>
                    <small>{localize(method.desc, language)}</small>
                    <em>
                      {method.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </em>
                  </span>
                </motion.a>
              </Reveal>
            );
          })}
        </RevealGroup>
      </section>

      <section className="section contact-fallback-section">
        <Reveal className="contact-fallback">
          <div className="contact-fallback-icon"><ShieldCheck size={22} aria-hidden="true" /></div>
          <div>
            <h2>{localize(contactCopy.fallbackTitle, language)}</h2>
            <p>{localize(contactCopy.fallbackBody, language)}</p>
          </div>
          <a href={`mailto:${profile.email}?subject=AT8%20technical%20collaboration`} className="btn btn-ghost">
            <AtSign size={16} aria-hidden="true" />
            {profile.email}
          </a>
        </Reveal>
      </section>

      <section className="contact-cta-section">
        <Reveal className="contact-cta-inner">
          <p className="section-label"><Send size={14} aria-hidden="true" />Telegram</p>
          <h2>{t.contactTitle}</h2>
          <p className="lead">{t.contactLead}</p>
          <motion.a
            className="btn btn-primary"
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
            transition={springFast}
          >
            <Send size={17} aria-hidden="true" />
            {t.contactButton}
          </motion.a>
        </Reveal>
      </section>
    </div>
  );
}
