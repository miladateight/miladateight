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
import { fadeUp, springFast, stagger } from "../utils/motion";
import { localize } from "../utils/localize";

const TechOrbit = lazy(() => import("../components/TechOrbit"));

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
    en: "Operational signal",
    fa: "سیگنال عملیاتی",
    ar: "إشارة تشغيلية",
    de: "Operatives Signal",
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
  techTitle: {
    en: "Technical universe",
    fa: "جهان فنی",
    ar: "العالم التقني",
    de: "Technisches Universum",
  },
  techLead: {
    en: "Tools, protocols, and platforms that appear across the work.",
    fa: "ابزارها، پروتکل‌ها و پلتفرم‌هایی که در کارها تکرار می‌شوند.",
    ar: "أدوات وبروتوكولات ومنصات تظهر عبر العمل.",
    de: "Tools, Protokolle und Plattformen, die in der Arbeit wiederkehren.",
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
    title: { en: "Infrastructure", fa: "زیرساخت", ar: "البنية التحتية", de: "Infrastruktur" },
    body: {
      en: "Linux, Windows Server, virtualization, backups, service continuity, and operational documentation.",
      fa: "لینوکس، Windows Server، مجازی‌سازی، بکاپ، تداوم سرویس و مستندسازی عملیاتی.",
      ar: "Linux وWindows Server والمحاكاة الافتراضية والنسخ الاحتياطي واستمرارية الخدمة والتوثيق التشغيلي.",
      de: "Linux, Windows Server, Virtualisierung, Backups, Servicekontinuität und Betriebsdokumentation.",
    },
    className: "capability-large capability-infra",
    chips: ["Linux", "Windows Server", "Backup"],
  },
  {
    icon: Network,
    title: { en: "Networking", fa: "شبکه", ar: "الشبكات", de: "Netzwerke" },
    body: {
      en: "MikroTik, routing, firewall policy, VLANs, VPNs, NAT, failover, and traffic troubleshooting.",
      fa: "MikroTik، مسیریابی، سیاست فایروال، VLAN، VPN، NAT، failover و عیب‌یابی ترافیک.",
      ar: "MikroTik والتوجيه وسياسات الجدار الناري وVLAN وVPN وNAT والتجاوز وتحليل المرور.",
      de: "MikroTik, Routing, Firewall-Policies, VLANs, VPNs, NAT, Failover und Traffic-Analyse.",
    },
    className: "capability-tall capability-network",
    chips: ["MikroTik", "VPN", "VLAN"],
  },
  {
    icon: Cloud,
    title: { en: "DevOps and Cloud", fa: "DevOps و ابر", ar: "DevOps والسحابة", de: "DevOps und Cloud" },
    body: {
      en: "Docker, CI/CD, infrastructure automation, observability, and current cloud engineering growth.",
      fa: "Docker، CI/CD، اتوماسیون زیرساخت، مشاهده‌پذیری و مسیر رشد فعلی در مهندسی ابر.",
      ar: "Docker وCI/CD وأتمتة البنية التحتية والمراقبة ومسار نمو حالي في هندسة السحابة.",
      de: "Docker, CI/CD, Infrastrukturautomatisierung, Observability und laufender Ausbau in Cloud Engineering.",
    },
    className: "capability-cloud",
    chips: ["Docker", "CI/CD", "IaC"],
  },
  {
    icon: Globe2,
    title: { en: "Web Systems", fa: "سیستم‌های وب", ar: "أنظمة الويب", de: "Web-Systeme" },
    body: {
      en: "Nginx, Caddy, HAProxy, DNS, SSL/TLS, WordPress, React, and production-facing web delivery.",
      fa: "Nginx، Caddy، HAProxy، DNS، SSL/TLS، WordPress، React و تحویل وب در محیط واقعی.",
      ar: "Nginx وCaddy وHAProxy وDNS وSSL/TLS وWordPress وReact وتسليم الويب الإنتاجي.",
      de: "Nginx, Caddy, HAProxy, DNS, SSL/TLS, WordPress, React und produktionsnahe Web-Auslieferung.",
    },
    className: "capability-web",
    chips: ["Nginx", "DNS", "React"],
  },
  {
    icon: Code2,
    title: { en: "Programming", fa: "برنامه‌نویسی", ar: "البرمجة", de: "Programmierung" },
    body: {
      en: "Python, Bash, C#, .NET desktop tools, Unity experiments, and pragmatic scripts.",
      fa: "Python، Bash، C#، ابزارهای دسکتاپ .NET، تجربه‌های Unity و اسکریپت‌های کاربردی.",
      ar: "Python وBash وC# وأدوات سطح مكتب .NET وتجارب Unity وسكربتات عملية.",
      de: "Python, Bash, C#, .NET-Desktop-Tools, Unity-Experimente und pragmatische Skripte.",
    },
    className: "capability-code",
    chips: ["Python", ".NET", "Bash"],
  },
  {
    icon: Bot,
    title: { en: "Automation", fa: "اتوماسیون", ar: "الأتمتة", de: "Automatisierung" },
    body: {
      en: "Telegram bots, repeatable scripts, maintenance flows, and small tools that remove manual friction.",
      fa: "ربات تلگرام، اسکریپت تکرارپذیر، روندهای نگهداری و ابزارهای کوچک برای حذف کار دستی اضافی.",
      ar: "بوتات Telegram وسكربتات قابلة للتكرار وتدفقات صيانة وأدوات صغيرة تقلل العمل اليدوي.",
      de: "Telegram-Bots, wiederholbare Skripte, Wartungsabläufe und kleine Tools gegen manuelle Reibung.",
    },
    className: "capability-automation",
    chips: ["Bots", "Scripts", "Ops"],
  },
  {
    icon: ShieldCheck,
    title: { en: "IT Operations", fa: "عملیات IT", ar: "عمليات تقنية المعلومات", de: "IT-Betrieb" },
    body: {
      en: "Support, incident response, asset coordination, monitoring, continuity checks, and clear reporting.",
      fa: "پشتیبانی، پاسخ به رخداد، هماهنگی دارایی‌ها، مانیتورینگ، بررسی تداوم و گزارش شفاف.",
      ar: "دعم واستجابة للحوادث وتنسيق الأصول ومراقبة وفحوص استمرارية وتقارير واضحة.",
      de: "Support, Incident Response, Asset-Koordination, Monitoring, Kontinuitätschecks und klare Berichte.",
    },
    className: "capability-ops",
    chips: ["Support", "Monitoring", "Reports"],
  },
];

const commandRows = [
  ["edge-router", "routes", "ok"],
  ["linux-host", "services", "ok"],
  ["mail-flow", "tls/dns", "watch"],
  ["backup-set", "integrity", "ok"],
];

function HeroCommandDeck({ language }) {
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
      <div className="command-map" aria-hidden="true">
        <span className="map-ring ring-a" />
        <span className="map-ring ring-b" />
        <span className="map-core">AT8</span>
        <span className="map-node map-node-a" />
        <span className="map-node map-node-b" />
        <span className="map-node map-node-c" />
        <span className="map-node map-node-d" />
      </div>
      <div className="command-rows">
        {commandRows.map(([name, scope, state]) => (
          <div className="command-row" key={name}>
            <span className="command-dot" />
            <strong>{name}</strong>
            <small>{scope}</small>
            <em>{state}</em>
          </div>
        ))}
      </div>
    </motion.aside>
  );
}

function CapabilityCard({ item, language, index }) {
  const Icon = item.icon;
  return (
    <Reveal className={`capability-card ${item.className}`} delay={index * 0.025}>
      <div className="capability-visual" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="capability-content">
        <div className="capability-icon"><Icon size={20} /></div>
        <h3>{localize(item.title, language)}</h3>
        <p>{localize(item.body, language)}</p>
        <div className="capability-chips">
          {item.chips.map((chip) => <span key={chip}>{chip}</span>)}
        </div>
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

        <section className="section tech-universe-section">
          <Reveal className="section-header centered">
            <p className="section-label"><Network size={14} aria-hidden="true" />{localize(homeCopy.techTitle, language)}</p>
            <h2 className="section-title">{localize(homeCopy.techTitle, language)}</h2>
            <p className="section-subtitle">{localize(homeCopy.techLead, language)}</p>
          </Reveal>
          <Reveal>
            <Suspense fallback={<div className="tech-orbit-fallback" aria-hidden="true" />}>
              <TechOrbit />
            </Suspense>
          </Reveal>
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
