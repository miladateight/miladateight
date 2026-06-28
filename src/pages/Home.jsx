import { useMemo } from "react";
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

const operatorSignals = [
  { key: "web", label: "Web edge", metric: "HTTPS 200", icon: Globe2 },
  { key: "deploy", label: "Deploy", metric: "green", icon: GitBranch },
  { key: "net", label: "Network", metric: "24ms", icon: Network },
  { key: "backup", label: "Backup", metric: "verified", icon: Database },
];

const consoleRows = [
  "deploy: ateight.xyz -> stable",
  "wg0 tunnel handshake 24ms",
  "haproxy route web:443 healthy",
  "mail tls queue clear",
];

function HeroCommandDeck({ language }) {
  const reduceMotion = useReducedMotion();
  const steamMotion = reduceMotion ? undefined : { opacity: [0, 0.85, 0], y: [0, -18, -34], scale: [0.85, 1.08, 1.24] };
  const glanceMotion = reduceMotion ? undefined : { x: [0, 3, 0, -2, 0] };
  const typingMotion = reduceMotion ? undefined : { rotate: [0, -3, 1, 0], y: [0, 2, 0, 1, 0] };

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
        <svg className="workstation-svg" viewBox="0 0 720 560" role="img">
          <defs>
            <radialGradient id="hero-monitor-light" cx="50%" cy="42%" r="62%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.46" />
              <stop offset="48%" stopColor="#22d3ee" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hero-screen" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#172554" />
              <stop offset="58%" stopColor="#07111f" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="hero-skin" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f5c9aa" />
              <stop offset="100%" stopColor="#b7795a" />
            </linearGradient>
            <radialGradient id="hero-face-light" cx="42%" cy="34%" r="74%">
              <stop offset="0%" stopColor="#ffd6b8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#b7795a" stopOpacity="0.9" />
            </radialGradient>
            <linearGradient id="hero-shirt" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#0b1120" />
            </linearGradient>
            <filter id="hero-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="34" y="30" width="652" height="498" rx="32" fill="#030712" />
          <ellipse cx="365" cy="248" rx="296" ry="210" fill="url(#hero-monitor-light)" filter="url(#hero-soft-glow)" />
          <path d="M72 412 C178 368 246 388 338 356 C440 320 548 326 650 380 L650 528 L72 528 Z" fill="#07111f" opacity="0.8" />

          <g className="workstation-bg">
            <rect x="76" y="70" width="144" height="70" rx="14" />
            <rect x="520" y="78" width="96" height="152" rx="18" />
            <path d="M94 166 H196 M544 112 H592 M544 142 H606 M544 172 H586 M544 202 H598" />
          </g>

          <motion.g
            className="monitor-cluster"
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="132" y="96" width="260" height="176" rx="18" className="monitor-shell" />
            <rect x="147" y="113" width="230" height="134" rx="10" fill="url(#hero-screen)" />
            <rect x="398" y="130" width="182" height="132" rx="16" className="monitor-shell side" />
            <rect x="412" y="146" width="154" height="92" rx="9" fill="url(#hero-screen)" />
            <path d="M268 272 L256 318 H356 L342 272" className="monitor-stand" />
            <path d="M468 262 L458 306 H532 L520 262" className="monitor-stand" />

            {consoleRows.map((row, index) => (
              <g key={row} className="code-row" transform={`translate(166 ${138 + index * 24})`}>
                <circle cx="0" cy="0" r="3.5" />
                <motion.rect
                  x="14"
                  y="-5"
                  height="8"
                  rx="4"
                  animate={reduceMotion ? undefined : { width: [88 + index * 18, 132 + index * 12, 88 + index * 18] }}
                  transition={{ duration: 3.6 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <text x="14" y="17">{row}</text>
              </g>
            ))}
            <motion.rect
              className="screen-cursor"
              x="310"
              y="223"
              width="8"
              height="16"
              rx="2"
              animate={reduceMotion ? undefined : { opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />

            <path className="network-line" d="M430 176 C466 154 494 168 536 154" />
            <path className="network-line network-mail" d="M430 206 C462 226 506 210 546 222" />
            {[0, 1, 2].map((index) => (
              <motion.circle
                key={index}
                className="network-packet"
                r="4"
                animate={reduceMotion ? undefined : { cx: [432, 538], cy: index === 1 ? [206, 222] : [176, 154] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.65, ease: "easeInOut" }}
              />
            ))}
          </motion.g>

          <g className="operator-chair">
            <path d="M286 316 C270 282 286 244 332 234 H406 C448 238 464 278 448 320 L430 420 H306 Z" />
            <path d="M306 420 H434 L462 506 H418 L374 446 L328 506 H286 Z" />
          </g>

          <motion.g className="operator-person" animate={glanceMotion} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
            <path className="operator-neck" d="M352 247 H386 L394 289 H342 Z" />
            <path className="operator-torso" d="M302 298 C322 270 420 268 442 302 C456 344 448 398 430 430 H314 C296 388 288 340 302 298 Z" />
            <path className="operator-leg left-leg" d="M322 424 C306 452 294 476 286 504 H332 C342 474 356 450 376 424" />
            <path className="operator-leg right-leg" d="M412 424 C438 452 454 476 464 504 H418 C404 474 388 450 366 424" />
            <ellipse className="operator-face" cx="370" cy="210" rx="42" ry="50" />
            <g className="operator-curls">
              {[328, 346, 366, 386, 406].map((cx, index) => (
                <circle key={cx} cx={cx} cy={178 + (index % 2) * 6} r={18 - (index % 2) * 3} />
              ))}
              {[332, 352, 392, 414].map((cx, index) => (
                <circle key={cx} cx={cx} cy={204 + index * 2} r={14} />
              ))}
            </g>
            <path className="operator-hair" d="M326 210 C322 162 354 138 394 150 C426 160 434 196 412 230 C406 196 380 190 352 184 C340 194 334 204 326 210 Z" />
            <g className="operator-glasses">
              <rect x="346" y="202" width="25" height="19" rx="4" />
              <rect x="383" y="202" width="25" height="19" rx="4" />
              <path d="M371 211 H383" />
            </g>
            <motion.g animate={reduceMotion ? undefined : { x: [0, 2, 0, -1, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}>
              <path className="operator-eye" d="M356 212 H364 M391 212 H399" />
            </motion.g>
            <path className="operator-nose" d="M378 216 C374 228 376 232 384 235" />
            <path className="operator-mouth" d="M360 242 C368 248 382 248 390 241" />
            <motion.g animate={typingMotion} transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}>
              <path className="operator-arm left" d="M318 318 C276 338 250 366 224 410" />
              <ellipse className="operator-hand" cx="222" cy="411" rx="17" ry="10" />
            </motion.g>
            <motion.g animate={reduceMotion ? undefined : { rotate: [0, 2, -2, 0], y: [0, 1, 0, 2, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.24 }}>
              <path className="operator-arm right" d="M424 318 C456 346 482 366 522 392" />
              <ellipse className="operator-hand" cx="524" cy="394" rx="17" ry="10" />
            </motion.g>
          </motion.g>

          <g className="desk-layer">
            <path d="M104 414 C248 400 426 400 616 414 L652 496 H70 Z" />
            <rect x="234" y="406" width="214" height="34" rx="10" />
            <path d="M260 423 H424 M278 434 H406" />
            <rect x="462" y="400" width="82" height="22" rx="8" />
            <path d="M134 435 C154 420 184 422 204 438" />
          </g>

          <g className="coffee-group">
            <path d="M548 382 H606 L596 438 H558 Z" />
            <path d="M604 392 C636 392 636 426 600 423" />
            <rect x="546" y="438" width="58" height="9" rx="5" />
            {[0, 1, 2].map((index) => (
              <motion.path
                key={index}
                className="steam-path"
                d={`M${562 + index * 13} 372 C${548 + index * 15} 350 ${578 + index * 7} 342 ${566 + index * 11} 320`}
                animate={steamMotion}
                transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.42, ease: "easeInOut" }}
              />
            ))}
          </g>
        </svg>

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
                <span>{item.label}</span>
                <strong>{item.metric}</strong>
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
