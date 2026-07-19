import { motion } from "framer-motion";
import { ArrowUpRight, AtSign, Facebook, Github, Globe, Instagram, Linkedin, Megaphone, Send } from "lucide-react";
import { profile } from "../data/profile";
import logoUrl from "../assets/at8-logo.png";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import { fadeUp, stagger, springFast } from "../utils/motion";
import { localize } from "../utils/localize";

const linksCopy = {
  label: {
    en: "Links",
    fa: "لینک‌ها",
    ar: "الروابط",
    de: "Links",
  },
  title: {
    en: "Every way to reach or follow Milad Ateight.",
    fa: "همه راه‌های ارتباط و دنبال‌کردن Milad Ateight در یک صفحه.",
    ar: "كل الطرق للتواصل مع Milad Ateight أو متابعته.",
    de: "Alle Wege, Milad Ateight zu erreichen oder zu folgen.",
  },
  lead: {
    en: "Developer and web designer working across networks, infrastructure, and DevOps. Pick a channel below.",
    fa: "برنامه‌نویس و طراح وب که در کنار آن روی شبکه، زیرساخت و DevOps هم کار می‌کند. یکی از مسیرهای زیر را انتخاب کنید.",
    ar: "مطوّر ومصمم مواقع يعمل أيضًا في الشبكات والبنية التحتية وDevOps. اختر إحدى القنوات أدناه.",
    de: "Entwickler und Webdesigner mit Arbeit an Netzwerken, Infrastruktur und DevOps. Wähle unten einen Kanal.",
  },
  telegram: {
    title: { en: "Telegram", fa: "تلگرام", ar: "تيليجرام", de: "Telegram" },
    desc: {
      en: "Fastest way to reach me directly",
      fa: "سریع‌ترین مسیر برای ارتباط مستقیم",
      ar: "أسرع طريقة للتواصل المباشر",
      de: "Schnellster direkter Kontaktweg",
    },
  },
  telegramChannel: {
    title: { en: "Telegram Channel", fa: "کانال تلگرام", ar: "قناة تيليجرام", de: "Telegram-Kanal" },
    desc: {
      en: "Updates, notes, and posts",
      fa: "بروزرسانی‌ها، یادداشت‌ها و پست‌ها",
      ar: "تحديثات وملاحظات ومنشورات",
      de: "Updates, Notizen und Beiträge",
    },
  },
  website: {
    title: { en: "Website", fa: "سایت", ar: "الموقع", de: "Website" },
    desc: {
      en: "Portfolio, about, and projects",
      fa: "نمونه‌کار، درباره من و پروژه‌ها",
      ar: "الأعمال ونبذة عني والمشاريع",
      de: "Portfolio, über mich und Projekte",
    },
  },
  github: {
    title: { en: "GitHub", fa: "گیت‌هاب", ar: "GitHub", de: "GitHub" },
    desc: {
      en: "Repositories and public work",
      fa: "مخزن‌ها و کارهای عمومی",
      ar: "المستودعات والعمل العام",
      de: "Repositorien und öffentliche Arbeit",
    },
  },
  linkedin: {
    title: { en: "LinkedIn", fa: "لینکدین", ar: "لينكدإن", de: "LinkedIn" },
    desc: {
      en: "Professional profile and history",
      fa: "پروفایل و سابقه حرفه‌ای",
      ar: "الملف المهني والسجل",
      de: "Berufsprofil und Werdegang",
    },
  },
  instagram: {
    title: { en: "Instagram", fa: "اینستاگرام", ar: "إنستغرام", de: "Instagram" },
    desc: {
      en: "Photos and stories",
      fa: "عکس‌ها و استوری‌ها",
      ar: "صور وقصص",
      de: "Fotos und Stories",
    },
  },
  facebook: {
    title: { en: "Facebook", fa: "فیس‌بوک", ar: "فيسبوك", de: "Facebook" },
    desc: {
      en: "Facebook profile",
      fa: "پروفایل فیس‌بوک",
      ar: "الملف الشخصي على فيسبوك",
      de: "Facebook-Profil",
    },
  },
  email: {
    title: { en: "Email", fa: "ایمیل", ar: "البريد الإلكتروني", de: "E-Mail" },
    desc: {
      en: "Best for detailed context",
      fa: "مناسب برای توضیح کامل‌تر",
      ar: "الأفضل للسياق التفصيلي",
      de: "Am besten für ausführlichen Kontext",
    },
  },
};

export default function Links({ language }) {
  const items = [
    {
      key: "telegram",
      icon: Send,
      copy: linksCopy.telegram,
      href: profile.telegram,
      label: profile.telegram.replace("https://", ""),
      external: true,
      primary: true,
    },
    {
      key: "telegramChannel",
      icon: Megaphone,
      copy: linksCopy.telegramChannel,
      href: profile.telegramChannel,
      label: profile.telegramChannel.replace("https://", ""),
      external: true,
    },
    {
      key: "website",
      icon: Globe,
      copy: linksCopy.website,
      href: profile.website,
      label: profile.website.replace("https://", ""),
      external: true,
    },
    {
      key: "github",
      icon: Github,
      copy: linksCopy.github,
      href: profile.github,
      label: profile.github.replace("https://", ""),
      external: true,
    },
    {
      key: "linkedin",
      icon: Linkedin,
      copy: linksCopy.linkedin,
      href: profile.linkedin,
      label: profile.linkedin.replace("https://", ""),
      external: true,
    },
    {
      key: "instagram",
      icon: Instagram,
      copy: linksCopy.instagram,
      href: profile.instagram,
      label: profile.instagram.replace("https://", ""),
      external: true,
    },
    {
      key: "facebook",
      icon: Facebook,
      copy: linksCopy.facebook,
      href: profile.facebook,
      label: "facebook.com/MiladAteight",
      external: true,
    },
    {
      key: "email",
      icon: AtSign,
      copy: linksCopy.email,
      href: `mailto:${profile.email}`,
      label: profile.email,
    },
  ];

  return (
    <div className="page-container">
      <section className="subpage-hero links-hero">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.span className="links-avatar-shell" variants={fadeUp}>
            <span className="brand-mark-shell links-avatar" aria-hidden="true">
              <img src={logoUrl} alt="" width="88" height="88" />
            </span>
          </motion.span>
          <motion.p className="section-label" variants={fadeUp}>
            <Globe size={14} aria-hidden="true" />
            {localize(linksCopy.label, language)}
          </motion.p>
          <motion.h1 variants={fadeUp}>
            <TextReveal>{localize(linksCopy.title, language)}</TextReveal>
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>{localize(linksCopy.lead, language)}</motion.p>
        </motion.div>
      </section>

      <section className="section compact-section">
        <RevealGroup className="contact-methods">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.key}>
                <motion.a
                  href={item.href}
                  className={`contact-method ${item.primary ? "primary" : ""}`}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springFast}
                >
                  <span className="contact-method-icon"><Icon size={21} aria-hidden="true" /></span>
                  <span className="contact-method-info">
                    <strong>{localize(item.copy.title, language)}</strong>
                    <small>{localize(item.copy.desc, language)}</small>
                    <em>
                      {item.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </em>
                  </span>
                </motion.a>
              </Reveal>
            );
          })}
        </RevealGroup>
      </section>
    </div>
  );
}
