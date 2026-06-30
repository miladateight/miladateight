import { lazy, Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Github,
  Globe2,
  Layers3,
  Network,
  Send,
  Server,
  ShieldCheck,
  TerminalSquare,
  Wrench,
  Zap,
} from "lucide-react";
import { profile } from "../data/profile";
import { projects, specialties } from "../data/projects";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import ProjectCard from "../components/ProjectCard";
import HeroBackground from "../components/hero/HeroBackground";
import HeroStars from "../components/hero/HeroStars";

const Cockpit3D = lazy(() => import("../components/hero/Cockpit3D"));
import { fadeUp, springFast, stagger } from "../utils/motion";
import { localize } from "../utils/localize";

const homeCopy = {
  heroTitle: {
    en: "Systems between infrastructure and interface.",
    fa: "سیستم‌های میان زیرساخت و رابط کاربر.",
    ar: "أنظمة بين البنية التحتية والواجهة.",
    de: "Systeme zwischen Infrastruktur und Oberfläche.",
  },
  heroLead: {
    en: "I work where operations, networking, servers, automation, and web systems overlap. The goal is simple: diagnose clearly, build carefully, verify honestly, and leave systems easier to run.",
    fa: "در نقطه تلاقی عملیات، شبکه، سرور، اتوماسیون و سیستم‌های وب کار می‌کنم. هدف روشن است: تشخیص دقیق، ساخت سنجیده، تأیید واقعی و تحویل سیستمی که نگهداری آن ساده‌تر باشد.",
    ar: "أعمل عند تقاطع العمليات والشبكات والخوادم والأتمتة وأنظمة الويب. الهدف واضح: تشخيص دقيق، بناء منضبط، تحقق صريح، وأنظمة أسهل في التشغيل.",
    de: "Ich arbeite dort, wo Betrieb, Netzwerke, Server, Automatisierung und Web-Systeme zusammenkommen. Das Ziel ist klar: sauber diagnostizieren, sorgfältig bauen, ehrlich prüfen und Systeme leichter betreibbar machen.",
  },
  heroPrimary: {
    en: "Explore projects",
    fa: "مشاهده پروژه‌ها",
    ar: "استعراض المشاريع",
    de: "Projekte ansehen",
  },
  heroSecondary: {
    en: "Start a conversation",
    fa: "شروع گفتگو",
    ar: "ابدأ محادثة",
    de: "Gespräch starten",
  },
  commandTitle: {
    en: "Systems cockpit",
    fa: "کاکپیت سیستم",
    ar: "قمرة الأنظمة",
    de: "System-Cockpit",
  },
  identityTitle: {
    en: "From rack-level detail to user-facing systems",
    fa: "از جزئیات رک تا سیستم‌های روبه‌روی کاربر",
    ar: "من تفاصيل الرف إلى الأنظمة المواجهة للمستخدم",
    de: "Vom Rack-Detail bis zum nutzerseitigen System",
  },
  identityLead: {
    en: "The portfolio is not only web development. It reflects a practical technology range: routers, tunnels, servers, DNS, mail flow, desktop tools, scripts, documentation, and user experience.",
    fa: "این پورتفولیو فقط توسعه وب نیست. گستره‌ای عملی از فناوری را نشان می‌دهد: روتر، تونل، سرور، DNS، جریان ایمیل، ابزار دسکتاپ، اسکریپت، مستندات و تجربه کاربر.",
    ar: "هذه ليست محفظة تطوير ويب فقط. إنها تعكس نطاقا عمليا من التقنية: موجهات وأنفاق وخوادم وDNS وتدفق بريد وأدوات سطح مكتب وسكربتات وتوثيق وتجربة مستخدم.",
    de: "Dieses Portfolio ist nicht nur Webentwicklung. Es zeigt eine praktische technische Spannweite: Router, Tunnel, Server, DNS, Mail-Flows, Desktop-Tools, Skripte, Dokumentation und Nutzererfahrung.",
  },
  capabilitiesTitle: {
    en: "Capabilities",
    fa: "توانمندی‌ها",
    ar: "القدرات",
    de: "Fähigkeiten",
  },
  capabilitiesLead: {
    en: "Seven operating layers, one consistent habit: understand the system before changing it.",
    fa: "هفت لایه عملیاتی با یک عادت ثابت: قبل از تغییر، سیستم را درست بفهم.",
    ar: "سبع طبقات تشغيلية بعادة واحدة: افهم النظام قبل تغييره.",
    de: "Sieben Betriebsebenen, eine Haltung: das System verstehen, bevor es verändert wird.",
  },
  contactLead: {
    en: "For infrastructure reviews, automation, internal tools, or technical collaboration, the direct channels are open.",
    fa: "برای بررسی زیرساخت، اتوماسیون، ابزارهای داخلی یا همکاری فنی، مسیرهای مستقیم ارتباط باز هستند.",
    ar: "لمراجعة البنية التحتية أو الأتمتة أو الأدوات الداخلية أو التعاون التقني، القنوات المباشرة مفتوحة.",
    de: "Für Infrastruktur-Reviews, Automatisierung, interne Tools oder technische Zusammenarbeit sind die direkten Kanäle offen.",
  },
};

const capabilityItems = [
  {
    icon: Server,
    accent: "cyan",
    featured: true,
    title: { en: "Infrastructure", fa: "زیرساخت", ar: "البنية التحتية", de: "Infrastruktur" },
    body: {
      en: "Linux and Windows Server estates, virtualization, and storage built to stay available through failures, patches, and growth.",
      fa: "سرورهای لینوکس و ویندوز، مجازی‌سازی و ذخیره‌سازی که در برابر خرابی، به‌روزرسانی و رشد، در دسترس می‌مانند.",
      ar: "بيئات خوادم Linux وWindows والمحاكاة الافتراضية والتخزين، مبنية لتبقى متاحة خلال الأعطال والتحديثات والنمو.",
      de: "Linux- und Windows-Server-Umgebungen, Virtualisierung und Storage, die durch Ausfälle, Updates und Wachstum verfügbar bleiben.",
    },
    chips: ["Linux", "Windows Server", "Virtualization", "Backup"],
    highlights: [
      { en: "Service continuity with tested, repeatable restores", fa: "تداوم سرویس با بازیابی تست‌شده و تکرارپذیر", ar: "استمرارية الخدمة مع استعادة مُختبرة وقابلة للتكرار", de: "Servicekontinuität mit getesteten, wiederholbaren Restores" },
      { en: "Operational runbooks and clear documentation", fa: "ران‌بوک عملیاتی و مستندسازی روشن", ar: "أدلة تشغيل وتوثيق واضح", de: "Betriebs-Runbooks und klare Dokumentation" },
      { en: "Proactive monitoring and capacity headroom", fa: "مانیتورینگ پیش‌گیرانه و ظرفیت ذخیره", ar: "مراقبة استباقية وهامش سعة", de: "Proaktives Monitoring und Kapazitätsreserven" },
    ],
  },
  {
    icon: Network,
    accent: "teal",
    title: { en: "Networking", fa: "شبکه", ar: "الشبكات", de: "Netzwerke" },
    body: {
      en: "MikroTik routing, firewall policy, VLANs, VPNs, NAT, multi-WAN failover, and traffic troubleshooting.",
      fa: "مسیریابی MikroTik، سیاست فایروال، VLAN، VPN، NAT، failover چند-WAN و عیب‌یابی ترافیک.",
      ar: "توجيه MikroTik وسياسات الجدار الناري وVLAN وVPN وNAT وتجاوز multi-WAN وتحليل المرور.",
      de: "MikroTik-Routing, Firewall-Policies, VLANs, VPNs, NAT, Multi-WAN-Failover und Traffic-Analyse.",
    },
    chips: ["MikroTik", "VPN", "VLAN"],
  },
  {
    icon: Cloud,
    accent: "violet",
    title: { en: "DevOps and Cloud", fa: "DevOps و ابر", ar: "DevOps والسحابة", de: "DevOps und Cloud" },
    body: {
      en: "Docker, CI/CD pipelines, infrastructure as code, observability, and an active path into cloud engineering.",
      fa: "Docker، خط‌لوله CI/CD، Infrastructure as Code، مشاهده‌پذیری و مسیر فعال به سمت مهندسی ابر.",
      ar: "Docker وخطوط CI/CD والبنية ككود والمراقبة ومسار نشط نحو هندسة السحابة.",
      de: "Docker, CI/CD-Pipelines, Infrastructure as Code, Observability und ein aktiver Weg ins Cloud Engineering.",
    },
    chips: ["Docker", "CI/CD", "IaC"],
  },
  {
    icon: Globe2,
    accent: "sky",
    title: { en: "Web Systems", fa: "سیستم‌های وب", ar: "أنظمة الويب", de: "Web-Systeme" },
    body: {
      en: "Nginx, Caddy, HAProxy, DNS, SSL/TLS, WordPress, and React delivered to production with TLS that actually validates.",
      fa: "Nginx، Caddy، HAProxy، DNS، SSL/TLS، WordPress و React که با TLS معتبر در محیط واقعی تحویل می‌شوند.",
      ar: "Nginx وCaddy وHAProxy وDNS وSSL/TLS وWordPress وReact تُسلَّم للإنتاج بشهادات TLS صالحة فعلاً.",
      de: "Nginx, Caddy, HAProxy, DNS, SSL/TLS, WordPress und React, in Produktion mit wirklich gültigem TLS.",
    },
    chips: ["Nginx", "DNS", "React"],
  },
  {
    icon: Code2,
    accent: "indigo",
    title: { en: "Programming", fa: "برنامه‌نویسی", ar: "البرمجة", de: "Programmierung" },
    body: {
      en: "Python, Bash, and C# / .NET desktop tools, Unity experiments, and pragmatic scripts that pay for themselves.",
      fa: "ابزارهای دسکتاپ Python، Bash و C# / .NET، تجربه‌های Unity و اسکریپت‌های کاربردی که هزینه‌شان را برمی‌گردانند.",
      ar: "أدوات سطح مكتب بلغة Python وBash وC# / .NET وتجارب Unity وسكربتات عملية تُغطّي تكلفتها.",
      de: "Python, Bash und C# / .NET-Desktop-Tools, Unity-Experimente und pragmatische Skripte, die sich auszahlen.",
    },
    chips: ["Python", ".NET", "Bash"],
  },
  {
    icon: Bot,
    accent: "magenta",
    title: { en: "Automation", fa: "اتوماسیون", ar: "الأتمتة", de: "Automatisierung" },
    body: {
      en: "Telegram bots, repeatable scripts, maintenance flows, and small tools that remove manual friction.",
      fa: "ربات تلگرام، اسکریپت تکرارپذیر، روندهای نگهداری و ابزارهای کوچک برای حذف کار دستی اضافی.",
      ar: "بوتات Telegram وسكربتات قابلة للتكرار وتدفقات صيانة وأدوات صغيرة تقلل العمل اليدوي.",
      de: "Telegram-Bots, wiederholbare Skripte, Wartungsabläufe und kleine Tools gegen manuelle Reibung.",
    },
    chips: ["Bots", "Scripts", "Ops"],
  },
  {
    icon: ShieldCheck,
    accent: "emerald",
    title: { en: "IT Operations", fa: "عملیات IT", ar: "عمليات تقنية المعلومات", de: "IT-Betrieb" },
    body: {
      en: "Support, incident response, asset coordination, monitoring, continuity checks, and clear reporting.",
      fa: "پشتیبانی، پاسخ به رخداد، هماهنگی دارایی‌ها، مانیتورینگ، بررسی تداوم و گزارش شفاف.",
      ar: "دعم واستجابة للحوادث وتنسيق الأصول ومراقبة وفحوص استمرارية وتقارير واضحة.",
      de: "Support, Incident Response, Asset-Koordination, Monitoring, Kontinuitätschecks und klare Berichte.",
    },
    chips: ["Support", "Monitoring", "Reports"],
  },
];

const operatorSignals = [
  { key: "web", label: { en: "Web edge", fa: "لبه وب", ar: "حافة الويب", de: "Web-Edge" }, metric: "HTTPS 200", icon: Globe2 },
  { key: "deploy", label: { en: "Deploy", fa: "استقرار", ar: "النشر", de: "Deploy" }, metric: { en: "green", fa: "سالم", ar: "أخضر", de: "grün" }, icon: GitBranch },
  { key: "net", label: { en: "Network", fa: "شبکه", ar: "الشبكة", de: "Netzwerk" }, metric: "24 ms", icon: Network },
  { key: "backup", label: { en: "Backup", fa: "بکاپ", ar: "نسخ", de: "Backup" }, metric: { en: "verified", fa: "تأییدشده", ar: "مُتحقَّق", de: "verifiziert" }, icon: Database },
];

function HeroCommandDeck({ language }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      className="hero-command-deck"
      initial={{ opacity: 0, x: 28, rotateY: -8 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      aria-label={localize(homeCopy.commandTitle, language)}
    >
      <div className="command-deck-top">
        <span>{localize(homeCopy.commandTitle, language)}</span>
        <Activity size={16} aria-hidden="true" />
      </div>
      <div className="workstation-scene" aria-hidden="true">
        <Suspense fallback={<div className="cockpit3d cockpit3d-loading" />}>
          <Cockpit3D />
        </Suspense>

        <div className="workbench-telemetry">
          {operatorSignals.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                className={`workbench-signal signal-${item.key}`}
                key={item.key}
                animate={reduceMotion ? undefined : { opacity: [0.72, 1, 0.72], y: [0, index % 2 ? -3 : 3, 0] }}
                transition={{ duration: 3.8 + index * 0.28, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon size={14} aria-hidden="true" />
                <span>{localize(item.label, language)}</span>
                <strong>{localize(item.metric, language)}</strong>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.aside>
  );
}

function CapabilityCard({ item, language, index }) {
  const Icon = item.icon;
  return (
    <Reveal
      className={`capability-card cap-${item.accent} ${item.featured ? "is-featured" : ""}`}
      delay={index * 0.025}
    >
      <div className="capability-visual" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="capability-content">
        <div className="capability-main">
          <div className="capability-icon"><Icon size={20} /></div>
          <h3>{localize(item.title, language)}</h3>
          <p>{localize(item.body, language)}</p>
          <div className="capability-chips">
            {item.chips.map((chip) => <span key={chip}>{chip}</span>)}
          </div>
        </div>
        {item.highlights && (
          <ul className="capability-highlights">
            {item.highlights.map((point) => (
              <li key={localize(point, "en")}>
                <CheckCircle2 size={15} aria-hidden="true" />
                <span>{localize(point, language)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

export default function Home({ t, language }) {
  const reduceMotion = useReducedMotion();
  const contactLinks = useMemo(() => [
    [Github, "GitHub", profile.github],
    [Send, "Telegram", profile.telegram],
    [Globe2, "Email", `mailto:${profile.email}`],
  ], []);

  return (
    <>
      <section className="hero">
        <HeroBackground />
        <HeroStars />
        <div className="hero-inner">
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={stagger}>
            <motion.p className="hero-eyebrow" variants={fadeUp}>
              <TerminalSquare size={14} aria-hidden="true" />
              {t.heroKicker}
            </motion.p>
            <motion.h1 variants={fadeUp}>
              <TextReveal delay={0.05}>{localize(homeCopy.heroTitle, language)}</TextReveal>
            </motion.h1>
            <motion.p className="hero-sub" variants={fadeUp}>{localize(homeCopy.heroLead, language)}</motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <Link className="btn btn-primary" to="/#projects">
                <Layers3 size={17} aria-hidden="true" />
                {localize(homeCopy.heroPrimary, language)}
              </Link>
              <Link className="btn btn-ghost" to="/contact/">
                <Send size={17} aria-hidden="true" />
                {localize(homeCopy.heroSecondary, language)}
              </Link>
            </motion.div>
          </motion.div>
          <HeroCommandDeck language={language} />
        </div>
      </section>

      <div className="page-container home-sections">
        <section className="section identity-section">
          <Reveal className="identity-copy">
            <p className="section-label"><Cpu size={14} aria-hidden="true" />AT8</p>
            <h2 className="section-title">{localize(homeCopy.identityTitle, language)}</h2>
            <p className="section-subtitle">{localize(homeCopy.identityLead, language)}</p>
          </Reveal>
          <RevealGroup className="identity-rail">
            {t.identityCards.map(([title, body]) => (
              <Reveal className="identity-rail-item" key={title}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        <section className="section" id="capabilities">
          <Reveal className="section-header">
            <p className="section-label"><Zap size={14} aria-hidden="true" />{localize(homeCopy.capabilitiesTitle, language)}</p>
            <h2 className="section-title">{localize(homeCopy.capabilitiesTitle, language)}</h2>
            <p className="section-subtitle">{localize(homeCopy.capabilitiesLead, language)}</p>
          </Reveal>
          <div className="capability-bento">
            {capabilityItems.map((item, index) => (
              <CapabilityCard item={item} language={language} index={index} key={localize(item.title, "en")} />
            ))}
          </div>
        </section>

        <section className="section compact-section">
          <RevealGroup className="signal-strip">
            {specialties.slice(0, 15).map((item) => (
              <Reveal className="signal-chip" key={item.en}>
                <span />
                {localize(item, language)}
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        <section className="section" id="projects">
          <Reveal className="section-header">
            <p className="section-label"><Layers3 size={14} aria-hidden="true" />{t.projectsTitle}</p>
            <h2 className="section-title">{t.projectsTitle}</h2>
            <p className="section-subtitle">{t.projectsLead}</p>
          </Reveal>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} language={language} index={index} />
            ))}
          </div>
        </section>

        <section className="section">
          <Reveal className="section-header">
            <p className="section-label"><Wrench size={14} aria-hidden="true" />{t.methodTitle}</p>
            <h2 className="section-title">{t.methodTitle}</h2>
          </Reveal>
          <RevealGroup className="process-steps">
            {t.method.map(([title, body], index) => (
              <Reveal className="process-step" key={title}>
                <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        <section className="contact-cta-section" id="contact">
          <Reveal className="contact-cta-inner">
            <p className="section-label"><Send size={14} aria-hidden="true" />{t.contactTitle}</p>
            <h2>{t.contactTitle}</h2>
            <p className="lead">{localize(homeCopy.contactLead, language)}</p>
            <motion.a
              className="btn btn-primary"
              href={profile.telegram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { scale: 1.035 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={springFast}
            >
              <Send size={17} aria-hidden="true" />
              {t.contactButton}
            </motion.a>
            <div className="contact-links-row">
              {contactLinks.map(([Icon, label, href]) => (
                <a
                  className="contact-link-btn"
                  href={href}
                  key={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
