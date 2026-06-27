import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Server, Network, Cloud, Code2, Settings, ShieldCheck,
  Globe2, Wrench, Activity, Database, Send, ArrowUpRight
} from "lucide-react";
import { profile } from "../data/profile";
import { specialties } from "../data/projects";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import { fadeUp, stagger } from "../utils/motion";

const expertise = [
  {
    icon: Server,
    title: { en: "Server Administration", fa: "مدیریت سرور", ar: "إدارة الخوادم", de: "Serververwaltung" },
    desc: {
      en: "Linux and Windows server setup, hardening, monitoring, and maintenance. From bare-metal to cloud VMs.",
      fa: "راه‌اندازی، امن‌سازی، نظارت و نگهداری سرورهای لینوکس و ویندوز. از سخت‌افزار واقعی تا ماشین‌های مجازی ابری.",
      ar: "إعداد وأمن ومراقبة وصيانة خوادم Linux وWindows. من الأجهزة المادية إلى الآلات الافتراضية السحابية.",
      de: "Linux- und Windows-Server-Setup, Absicherung, Überwachung und Wartung. Von Bare-Metal bis Cloud-VMs."
    }
  },
  {
    icon: Network,
    title: { en: "Network Infrastructure", fa: "زیرساخت شبکه", ar: "بنية الشبكة", de: "Netzwerkinfrastruktur" },
    desc: {
      en: "MikroTik routing, VLANs, firewall rules, VPN tunnels, and site-to-site connectivity.",
      fa: "مسیریابی MikroTik، VLAN‌ها، قوانین فایروال، تونل‌های VPN و اتصال سایت به سایت.",
      ar: "توجيه MikroTik وقواعد جدار الحماية وأنفاق VPN والاتصال بين المواقع.",
      de: "MikroTik-Routing, VLANs, Firewall-Regeln, VPN-Tunnel und Site-to-Site-Konnektivität."
    }
  },
  {
    icon: Cloud,
    title: { en: "DevOps & Cloud", fa: "DevOps و ابر", ar: "DevOps والسحابة", de: "DevOps & Cloud" },
    desc: {
      en: "Containerization, CI/CD, deployment automation, and cloud service integration.",
      fa: "کانتینرسازی، CI/CD، اتوماسیون استقرار و یکپارچه‌سازی سرویس‌های ابری.",
      ar: "حاويات وخط أنابيب النشر الآلي وتكامل الخدمات السحابية.",
      de: "Containerisierung, CI/CD, Deployment-Automatisierung und Cloud-Service-Integration."
    }
  },
  {
    icon: Globe2,
    title: { en: "Web & Mail Systems", fa: "سیستم‌های وب و ایمیل", ar: "أنظمة الويب والبريد", de: "Web- und Mail-Systeme" },
    desc: {
      en: "Nginx, HAProxy, Exim, Dovecot, DNS records, SSL/TLS, and mail deliverability.",
      fa: "Nginx، HAProxy، Exim، Dovecot، رکوردهای DNS، SSL/TLS و قابلیت تحویل ایمیل.",
      ar: "Nginx وHAProxy وExim وDovecot وسجلات DNS وSSL/TLS وقابلية تسليم البريد.",
      de: "Nginx, HAProxy, Exim, Dovecot, DNS-Einträge, SSL/TLS und Zustellbarkeit von E-Mails."
    }
  },
  {
    icon: Code2,
    title: { en: "Programming & Automation", fa: "برنامه‌نویسی و اتوماسیون", ar: "البرمجة والأتمتة", de: "Programmierung & Automatisierung" },
    desc: {
      en: "Python scripting, .NET desktop tools, Telegram bots, and infrastructure automation.",
      fa: "اسکریپت‌نویسی Python، ابزارهای دسکتاپ .NET، ربات‌های تلگرام و اتوماسیون زیرساخت.",
      ar: "سكربتات Python وأدوات سطح المكتب .NET وبوتات Telegram وأتمتة البنية التحتية.",
      de: "Python-Skripting, .NET-Desktop-Tools, Telegram-Bots und Infrastruktur-Automatisierung."
    }
  },
  {
    icon: ShieldCheck,
    title: { en: "Security & Troubleshooting", fa: "امنیت و عیب‌یابی", ar: "الأمن واستكشاف الأخطاء", de: "Sicherheit & Fehlerbehebung" },
    desc: {
      en: "Systematic diagnosis, root cause analysis, and security-first problem resolution.",
      fa: "تشخیص سیستماتیک، تحلیل ریشه‌ای و حل مسئله با اولویت امنیت.",
      ar: "تشخيص منهجي وتحليل الأسباب الجذرية وحل المشاكل مع أولوية الأمان.",
      de: "Systematische Diagnose, Ursachenanalyse und sicherheitsorientierte Problemlösung."
    }
  },
];

const tools = [
  "Linux", "Windows Server", "MikroTik", "Nginx", "HAProxy", "Exim", "Dovecot",
  "Docker", "WireGuard", "HestiaCP", "DNS", "Python", ".NET", "React", "Git",
  "PostgreSQL", "Bash", "Ansible", "Telegram API", "SSL/TLS"
];

const experience = [
  {
    period: "2020 — Present",
    title: { en: "IT Infrastructure Specialist", fa: "متخصص زیرساخت IT", ar: "متخصص بنية التحتية لتقنية المعلومات", de: "IT-Infrastruktur-Spezialist" },
    desc: {
      en: "Managing network infrastructure, server operations, web/mail systems, and building internal tools.",
      fa: "مدیریت زیرساخت شبکه، عملیات سرور، سیستم‌های وب و ایمیل و ساخت ابزارهای داخلی.",
      ar: "إدارة البنية التحتية للشبكة وعمليات الخوادم وأنظمة الويب والبريد وبناء الأدوات الداخلية.",
      de: "Verwaltung der Netzwerkinfrastruktur, Serverbetrieb, Web-/Mail-Systeme und interne Tools."
    }
  },
];

export default function About({ t, language }) {
  return (
    <div className="page-shell">
      {/* Hero */}
      <section className="about-hero">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p className="section-label" variants={fadeUp}>
            <UserRound size={14} />
            {t.nav[1]}
          </motion.p>
          <motion.h1 variants={fadeUp}>
            <TextReveal>
              {language === "en" ? "About Milad Ateight" :
               language === "fa" ? "درباره میلاد ایت‌هایت" :
               language === "ar" ? "عن ميلاد اتيت" :
               "Über Milad Ateight"}
            </TextReveal>
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            {t.identityLead}
          </motion.p>
        </motion.div>
      </section>

      {/* Expertise */}
      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal className="section-header">
          <h2 className="section-title">
            {language === "en" ? "What I Do" : language === "fa" ? "چه کاری انجام می‌دهم" : language === "ar" ? "ماذا أفعل" : "Was ich tue"}
          </h2>
        </Reveal>
        <RevealGroup className="about-grid">
          {expertise.map((item, i) => (
            <Reveal className="about-card" key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 36, height: 36, display: "grid", placeItems: "center",
                  borderRadius: "var(--radius-md)", background: "var(--accent-dim)", color: "var(--accent)"
                }}>
                  <item.icon size={18} />
                </div>
                <h3 style={{ margin: 0 }}>{item.title[language]}</h3>
              </div>
              <p>{item.desc[language]}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      {/* Experience Timeline */}
      <section className="section">
        <Reveal className="section-header">
          <h2 className="section-title">
            {language === "en" ? "Experience" : language === "fa" ? "تجربه" : language === "ar" ? "الخبرة" : "Erfahrung"}
          </h2>
        </Reveal>
        <div className="timeline">
          <motion.div
            className="timeline-line"
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 24px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {experience.map((exp, i) => (
            <motion.article
              className="timeline-item"
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <span className="timeline-step">{String(i + 1).padStart(2, "0")}</span>
              <div className="timeline-content">
                <small style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.76rem" }}>
                  {exp.period}
                </small>
                <h3 style={{ marginTop: 6 }}>{exp.title[language]}</h3>
                <p>{exp.desc[language]}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="section">
        <Reveal className="section-header">
          <h2 className="section-title">
            {language === "en" ? "Tools & Technologies" : language === "fa" ? "ابزارها و فناوری‌ها" : language === "ar" ? "الأدوات والتقنيات" : "Tools & Technologien"}
          </h2>
        </Reveal>
        <RevealGroup className="skills-grid">
          {tools.map((tool) => (
            <Reveal className="skill-chip" key={tool}>
              <span className="dot" />
              {tool}
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <section className="contact-cta-section">
        <div className="contact-cta-inner">
          <Reveal>
            <h2>
              {language === "en" ? "Let's work together" :
               language === "fa" ? "بیایید با هم کار کنیم" :
               language === "ar" ? "دعنا نعمل معا" :
               "Lass uns zusammenarbeiten"}
            </h2>
            <p className="lead">
              {language === "en" ? "For collaboration, project reviews, or infrastructure work, reach out anytime." :
               language === "fa" ? "برای همکاری، بررسی پروژه یا کار زیرساختی، هر زمان تماس بگیرید." :
               language === "ar" ? "للتعاون أو مراجعة المشاريع أو أعمال البنية التحتية، تواصل في أي وقت." :
               "Für Zusammenarbeit, Projekt-Reviews oder Infrastrukturarbeit — jederzeit ansprechbar."}
            </p>
            <Link to="/contact/" className="btn btn-primary">
              <Send size={16} />
              {t.contactButton}
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function UserRound(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}
