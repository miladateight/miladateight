import { Link } from "react-router-dom";
import {
  Activity,
  BookOpen,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Network,
  Send,
  Server,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import { fadeUp, stagger } from "../utils/motion";
import { localize } from "../utils/localize";

const aboutCopy = {
  title: {
    en: "Milad Ateight works across the full operating surface.",
    fa: "Milad Ateight در تمام سطح عملیاتی فناوری کار می‌کند.",
    ar: "Milad Ateight يعمل عبر السطح التشغيلي الكامل للتقنية.",
    de: "Milad Ateight arbeitet über die gesamte operative Technikfläche.",
  },
  lead: {
    en: "I am an IT Lead working in an EPC company, focused on infrastructure, networks, servers, secure access, web and mail systems, backup, monitoring, technical continuity, documentation, and internal tools.",
    fa: "من IT Lead در یک شرکت EPC هستم و روی زیرساخت، شبکه، سرورها، دسترسی امن، سیستم‌های وب و ایمیل، بکاپ، مانیتورینگ، تداوم فنی، مستندسازی و ابزارهای داخلی تمرکز دارم.",
    ar: "أنا IT Lead في شركة EPC، أركز على البنية التحتية والشبكات والخوادم والوصول الآمن وأنظمة الويب والبريد والنسخ الاحتياطي والمراقبة والاستمرارية التقنية والتوثيق والأدوات الداخلية.",
    de: "Ich bin IT Lead in einem EPC-Unternehmen und arbeite an Infrastruktur, Netzwerken, Servern, sicherem Zugriff, Web- und Mail-Systemen, Backups, Monitoring, technischer Kontinuität, Dokumentation und internen Tools.",
  },
  approachTitle: {
    en: "Operating approach",
    fa: "رویکرد کاری",
    ar: "نهج العمل",
    de: "Arbeitsweise",
  },
  approachLead: {
    en: "I do not start by forcing a tool onto the problem. I read the architecture, constraints, risks, and expected outcome, then choose a fix that can be tested, documented, and maintained.",
    fa: "کار را با تحمیل یک ابزار شروع نمی‌کنم. معماری، محدودیت‌ها، ریسک‌ها و نتیجه مورد انتظار را می‌خوانم، سپس راه‌حلی انتخاب می‌کنم که قابل تست، مستندسازی و نگهداری باشد.",
    ar: "لا أبدأ بفرض أداة على المشكلة. أقرأ المعمارية والقيود والمخاطر والنتيجة المطلوبة، ثم أختار حلا قابلا للاختبار والتوثيق والصيانة.",
    de: "Ich beginne nicht damit, ein Werkzeug auf ein Problem zu drücken. Ich lese Architektur, Grenzen, Risiken und Zielbild und wähle dann eine Lösung, die testbar, dokumentierbar und wartbar ist.",
  },
  journeyTitle: {
    en: "Training and growth",
    fa: "آموزش و مسیر رشد",
    ar: "التدريب ومسار النمو",
    de: "Training und Entwicklung",
  },
  journeyLead: {
    en: "I completed Python and Artificial Intelligence training through Irancell Labs and continue building toward DevOps and Cloud Engineering through Docker, CI/CD, infrastructure as code, automation, Kubernetes, monitoring, and Linux security.",
    fa: "دوره‌های Python و هوش مصنوعی را در Irancell Labs گذرانده‌ام و مسیر خود را به سمت DevOps و Cloud Engineering با Docker، CI/CD، Infrastructure as Code، اتوماسیون، Kubernetes، مانیتورینگ و امنیت لینوکس ادامه می‌دهم.",
    ar: "أكملت تدريبات Python والذكاء الاصطناعي عبر Irancell Labs وأواصل البناء نحو DevOps وCloud Engineering عبر Docker وCI/CD والبنية ككود والأتمتة وKubernetes والمراقبة وأمن Linux.",
    de: "Ich habe Python- und KI-Trainings über Irancell Labs abgeschlossen und baue meinen Weg zu DevOps und Cloud Engineering über Docker, CI/CD, Infrastructure as Code, Automatisierung, Kubernetes, Monitoring und Linux-Sicherheit weiter aus.",
  },
};

const focusAreas = [
  {
    icon: Server,
    accent: "cyan",
    featured: true,
    title: { en: "Systems administration", fa: "مدیریت سیستم", ar: "إدارة الأنظمة", de: "Systemadministration" },
    body: {
      en: "Linux, Ubuntu Server, and Windows Server estates kept available through virtualization, backups, monitoring, and disciplined hardening.",
      fa: "سرورهای Linux، Ubuntu و Windows که با مجازی‌سازی، بکاپ، مانیتورینگ و سخت‌سازی منظم در دسترس می‌مانند.",
      ar: "بيئات Linux وUbuntu Server وWindows Server تبقى متاحة عبر المحاكاة الافتراضية والنسخ الاحتياطي والمراقبة والتحصين المنضبط.",
      de: "Linux-, Ubuntu- und Windows-Server, durch Virtualisierung, Backups, Monitoring und konsequentes Hardening verfügbar gehalten.",
    },
    highlights: [
      { en: "Backup integrity proven with restore drills", fa: "صحت بکاپ با تمرین بازیابی اثبات می‌شود", ar: "سلامة النسخ مثبتة بتدريبات الاستعادة", de: "Backup-Integrität durch Restore-Übungen belegt" },
      { en: "SSH, least-privilege access, and hardening", fa: "SSH، دسترسی کمینه و سخت‌سازی", ar: "SSH وصلاحيات الحد الأدنى والتحصين", de: "SSH, Least-Privilege-Zugriff und Hardening" },
      { en: "Service health and uptime monitoring", fa: "پایش سلامت سرویس و آپتایم", ar: "مراقبة صحة الخدمة ووقت التشغيل", de: "Service-Health- und Uptime-Monitoring" },
    ],
  },
  {
    icon: Network,
    accent: "teal",
    title: { en: "Network infrastructure", fa: "زیرساخت شبکه", ar: "بنية الشبكات", de: "Netzwerkinfrastruktur" },
    body: {
      en: "MikroTik RouterOS, routing, NAT, firewalling, VLANs, multi-WAN, failover, WireGuard, OpenVPN, L2TP, and connectivity diagnosis.",
      fa: "MikroTik RouterOS، مسیریابی، NAT، فایروال، VLAN، چند WAN، failover، WireGuard، OpenVPN، L2TP و تشخیص اتصال.",
      ar: "MikroTik RouterOS والتوجيه وNAT والجدار الناري وVLAN وmulti-WAN والتجاوز وWireGuard وOpenVPN وL2TP وتشخيص الاتصال.",
      de: "MikroTik RouterOS, Routing, NAT, Firewalling, VLANs, Multi-WAN, Failover, WireGuard, OpenVPN, L2TP und Konnektivitätsdiagnose.",
    },
  },
  {
    icon: Database,
    accent: "sky",
    title: { en: "Web and mail infrastructure", fa: "زیرساخت وب و ایمیل", ar: "بنية الويب والبريد", de: "Web- und Mail-Infrastruktur" },
    body: {
      en: "Nginx, Caddy, HAProxy, HestiaCP, DNS, SSL/TLS, reverse proxies, SMTP relays, delivery troubleshooting, and migrations.",
      fa: "Nginx، Caddy، HAProxy، HestiaCP، DNS، SSL/TLS، reverse proxy، SMTP relay، عیب‌یابی تحویل ایمیل و مهاجرت سرویس‌ها.",
      ar: "Nginx وCaddy وHAProxy وHestiaCP وDNS وSSL/TLS ووكلاء عكسيون وSMTP relay وتحليل تسليم البريد والترحيل.",
      de: "Nginx, Caddy, HAProxy, HestiaCP, DNS, SSL/TLS, Reverse Proxies, SMTP-Relays, Zustellungsanalyse und Migrationen.",
    },
  },
  {
    icon: Code2,
    accent: "indigo",
    title: { en: "Programming and automation", fa: "برنامه‌نویسی و اتوماسیون", ar: "البرمجة والأتمتة", de: "Programmierung und Automatisierung" },
    body: {
      en: "Python, Bash, C#, Unity, Git, GitHub, reusable tooling, infrastructure scripts, and operational automation.",
      fa: "Python، Bash، C#، Unity، Git، GitHub، ابزارهای قابل استفاده مجدد، اسکریپت زیرساخت و اتوماسیون عملیاتی.",
      ar: "Python وBash وC# وUnity وGit وGitHub وأدوات قابلة لإعادة الاستخدام وسكربتات بنية تحتية وأتمتة تشغيلية.",
      de: "Python, Bash, C#, Unity, Git, GitHub, wiederverwendbare Tools, Infrastruktur-Skripte und Betriebsautomatisierung.",
    },
  },
  {
    icon: Activity,
    accent: "violet",
    title: { en: "Business IT operations", fa: "عملیات IT سازمانی", ar: "عمليات تقنية معلومات الأعمال", de: "Business-IT-Betrieb" },
    body: {
      en: "Equipment, permissions, technical assets, attendance systems, VoIP, continuity checks, user support, and cross-department coordination.",
      fa: "تجهیزات، دسترسی‌ها، دارایی‌های فنی، سیستم حضور و غیاب، VoIP، بررسی تداوم، پشتیبانی کاربران و هماهنگی بین واحدها.",
      ar: "معدات وصلاحيات وأصول تقنية وأنظمة حضور وVoIP وفحوص استمرارية ودعم مستخدمين وتنسيق بين الأقسام.",
      de: "Ausrüstung, Berechtigungen, technische Assets, Zeiterfassung, VoIP, Kontinuitätschecks, User Support und Abstimmung zwischen Abteilungen.",
    },
  },
  {
    icon: BookOpen,
    accent: "magenta",
    title: { en: "Technical communication", fa: "ارتباط فنی", ar: "التواصل التقني", de: "Technische Kommunikation" },
    body: {
      en: "Presentations, diagrams, documentation, reports, architecture explanation, visual communication, and clearer handoff material.",
      fa: "پرزنتیشن، دیاگرام، مستندات، گزارش، توضیح معماری، ارتباط بصری و تحویل قابل فهم‌تر.",
      ar: "عروض ومخططات وتوثيق وتقارير وشرح معمارية وتواصل بصري ومواد تسليم أوضح.",
      de: "Präsentationen, Diagramme, Dokumentation, Berichte, Architekturerklärung, visuelle Kommunikation und klarere Übergaben.",
    },
  },
];

const tools = [
  "Linux", "Ubuntu Server", "Windows Server", "MikroTik", "RouterOS", "Nginx", "Caddy", "HAProxy",
  "HestiaCP", "Exim", "Dovecot", "DNS", "SSL/TLS", "WireGuard", "OpenVPN", "Docker", "GitHub Actions",
  "Python", "Bash", "C#", ".NET", "React", "WordPress", "Photoshop",
];

export default function About({ t, language }) {
  return (
    <div className="page-container">
      <section className="subpage-hero about-hero">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p className="section-label" variants={fadeUp}>
            <UserRound size={14} aria-hidden="true" />
            {t.nav[1]}
          </motion.p>
          <motion.h1 variants={fadeUp}>
            <TextReveal>{localize(aboutCopy.title, language)}</TextReveal>
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>{localize(aboutCopy.lead, language)}</motion.p>
        </motion.div>
      </section>

      <section className="section compact-section">
        <RevealGroup className="about-focus-grid">
          {focusAreas.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal
                className={`about-focus-card cap-${item.accent}${item.featured ? " is-featured" : ""}`}
                key={localize(item.title, "en")}
              >
                <div className="about-focus-main">
                  <div className="about-focus-icon"><Icon size={20} aria-hidden="true" /></div>
                  <h2>{localize(item.title, language)}</h2>
                  <p>{localize(item.body, language)}</p>
                </div>
                {item.highlights && (
                  <ul className="about-focus-highlights">
                    {item.highlights.map((point) => (
                      <li key={localize(point, "en")}>
                        <CheckCircle2 size={15} aria-hidden="true" />
                        <span>{localize(point, language)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            );
          })}
        </RevealGroup>
      </section>

      <section className="section about-approach">
        <Reveal className="section-header">
          <p className="section-label"><ShieldCheck size={14} aria-hidden="true" />{localize(aboutCopy.approachTitle, language)}</p>
          <h2 className="section-title">{localize(aboutCopy.approachTitle, language)}</h2>
          <p className="section-subtitle">{localize(aboutCopy.approachLead, language)}</p>
        </Reveal>
        <RevealGroup className="approach-steps">
          {t.method.map(([title, body], index) => (
            <Reveal className="approach-step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <section className="section journey-section">
        <Reveal className="journey-panel">
          <div>
            <p className="section-label"><Cloud size={14} aria-hidden="true" />{localize(aboutCopy.journeyTitle, language)}</p>
            <h2 className="section-title">{localize(aboutCopy.journeyTitle, language)}</h2>
          </div>
          <p>{localize(aboutCopy.journeyLead, language)}</p>
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="section-header">
          <p className="section-label"><Wrench size={14} aria-hidden="true" />{t.specialtiesTitle}</p>
          <h2 className="section-title">{t.specialtiesTitle}</h2>
          <p className="section-subtitle">{t.specialtiesLead}</p>
        </Reveal>
        <RevealGroup className="tool-cloud">
          {tools.map((tool) => (
            <Reveal className="tool-token" key={tool}>{tool}</Reveal>
          ))}
        </RevealGroup>
      </section>

      <section className="contact-cta-section">
        <Reveal className="contact-cta-inner">
          <p className="section-label"><Send size={14} aria-hidden="true" />{t.contactTitle}</p>
          <h2>{t.contactTitle}</h2>
          <p className="lead">{t.contactLead}</p>
          <Link to="/contact/" className="btn btn-primary">
            <Send size={17} aria-hidden="true" />
            {t.contactButton}
          </Link>
          <p className="contact-note">{profile.email}</p>
        </Reveal>
      </section>
    </div>
  );
}
