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

const consoleRows = [
  "deploy ateight.xyz → stable",
  "wg0 handshake 24ms",
  "haproxy web:443 healthy",
  "mail tls queue clear",
];

const dashboardBars = [42, 76, 58, 88, 64];

function HeroCommandDeck({ language }) {
  const reduceMotion = useReducedMotion();
  const steamMotion = reduceMotion ? undefined : { opacity: [0, 0.7, 0], y: [0, -16, -30], scale: [0.8, 1.05, 1.2] };

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
        <svg className="workstation-svg" viewBox="0 0 760 600" role="img" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="ck-roomglow" cx="54%" cy="36%" r="64%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.34" />
              <stop offset="42%" stopColor="#2dd4bf" stopOpacity="0.13" />
              <stop offset="72%" stopColor="#8b5cf6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#04070d" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ck-wall" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#101a2b" />
              <stop offset="58%" stopColor="#0a1220" />
              <stop offset="100%" stopColor="#050a12" />
            </linearGradient>
            <linearGradient id="ck-floor" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0c1624" />
              <stop offset="55%" stopColor="#08101b" />
              <stop offset="100%" stopColor="#04070d" />
            </linearGradient>
            <linearGradient id="ck-desk" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#263247" />
              <stop offset="48%" stopColor="#172338" />
              <stop offset="100%" stopColor="#0b1220" />
            </linearGradient>
            <linearGradient id="ck-deskfront" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#111a2a" />
              <stop offset="100%" stopColor="#050914" />
            </linearGradient>
            <linearGradient id="ck-screen" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#12365a" />
              <stop offset="54%" stopColor="#071b2f" />
              <stop offset="100%" stopColor="#030812" />
            </linearGradient>
            <linearGradient id="ck-shirt" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#2a425d" />
              <stop offset="48%" stopColor="#17263a" />
              <stop offset="100%" stopColor="#0b1322" />
            </linearGradient>
            <radialGradient id="ck-hair" cx="42%" cy="30%" r="76%">
              <stop offset="0%" stopColor="#4c362a" />
              <stop offset="42%" stopColor="#2a1b14" />
              <stop offset="100%" stopColor="#0d0806" />
            </radialGradient>
            <linearGradient id="ck-skin" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffd5b8" />
              <stop offset="48%" stopColor="#f0b58f" />
              <stop offset="100%" stopColor="#bd7d58" />
            </linearGradient>
            <linearGradient id="ck-rgb" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="52%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <radialGradient id="ck-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.52" />
              <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
            </radialGradient>
            <filter id="ck-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ck-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* semi-isometric room */}
          <rect className="ck-room-wall" x="0" y="0" width="760" height="346" fill="url(#ck-wall)" />
          <path className="ck-room-floor" d="M0 346 L760 318 L760 600 H0 Z" fill="url(#ck-floor)" />
          <ellipse className="ck-room-glow" cx="410" cy="236" rx="332" ry="218" fill="url(#ck-roomglow)" filter="url(#ck-glow)" />
          <g className="ck-floorlines">
            <path d="M92 600 L318 344 M272 600 L378 338 M492 600 L454 332 M708 600 L548 326" />
            <path d="M0 438 L760 410 M0 520 L760 476" />
          </g>

          <g className="ck-room-detail">
            <path className="ck-wall-seam" d="M92 0 L132 346 M640 0 L594 324" />
            <g className="ck-shelf">
              <path d="M70 132 L220 118 L220 126 L70 140 Z" />
              <rect className="ck-book" x="90" y="92" width="12" height="37" rx="2" />
              <rect className="ck-book" x="108" y="98" width="12" height="29" rx="2" />
              <rect className="ck-book" x="126" y="88" width="14" height="37" rx="2" />
              <path className="ck-plant" d="M182 126 C176 104 194 96 198 82 C204 100 222 104 210 126 M194 126 C192 110 204 104 212 94" />
              <path className="ck-pot" d="M184 120 L212 118 L208 138 L188 140 Z" />
            </g>
            <g className="ck-wallpanel">
              <path d="M520 72 L688 58 L688 178 L520 190 Z" />
              <text x="536" y="96" className="ck-panel-label">uptime · 99.98%</text>
              <path className="ck-panel-line" d="M536 156 L560 138 L584 148 L608 122 L632 132 L656 108 L676 116" />
              <circle cx="676" cy="116" r="3" className="ck-panel-dot" />
            </g>
          </g>

          {/* perspective desk */}
          <g className="ck-desk">
            <path className="ck-desk-shadow" d="M70 500 L670 472 L724 548 L48 572 Z" />
            <path className="ck-desk-top" d="M118 344 L596 318 L688 454 L70 486 Z" />
            <path className="ck-desk-front" d="M70 486 L688 454 L688 488 L76 522 Z" />
            <path className="ck-desk-side" d="M596 318 L688 454 L688 488 L606 356 Z" />
            <path className="ck-desk-rim" d="M124 350 L596 324 L680 450" />
          </g>

          {/* angled displays */}
          <g className="ck-monitor ck-monitor-primary">
            <ellipse className="ck-monitor-glow" cx="280" cy="218" rx="156" ry="112" />
            <path className="ck-stand" d="M300 298 L338 294 L352 354 L286 360 Z" />
            <ellipse className="ck-stand-base" cx="318" cy="360" rx="45" ry="8" />
            <path className="ck-bezel" d="M164 144 L394 126 L408 300 L176 318 Z" />
            <path className="ck-screen" d="M178 158 L378 143 L390 286 L190 302 Z" />
            <path className="ck-screen-shine" d="M188 164 L378 150 L378 178 L190 196 Z" />
            <g className="ck-screen-content">
              <circle className="ck-dot dot-r" cx="196" cy="177" r="3" />
              <circle className="ck-dot dot-y" cx="208" cy="176" r="3" />
              <circle className="ck-dot dot-g" cx="220" cy="175" r="3" />
              <text className="ck-screen-title" x="238" y="176">terminal — ops</text>
              {consoleRows.map((row, index) => (
                <g key={row} className="ck-code-row" transform={`translate(198 ${204 + index * 19})`}>
                  <motion.rect
                    x="0" y="-8" width={72 + index * 12} height="6" rx="3"
                    animate={reduceMotion ? undefined : { opacity: [0.42, 0.84, 0.42], scaleX: [0.72, 1, 0.72] }}
                    transition={{ duration: 3.2 + index * 0.36, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="0" y="9">{row}</text>
                </g>
              ))}
              <motion.rect
                className="ck-cursor" x="160" y="272" width="7" height="11" rx="1"
                animate={reduceMotion ? undefined : { opacity: [0, 1, 1, 0], x: [0, 6, 6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          </g>

          <g className="ck-monitor ck-monitor-side">
            <ellipse className="ck-monitor-glow" cx="520" cy="214" rx="136" ry="102" />
            <path className="ck-stand" d="M502 292 L532 292 L546 354 L492 358 Z" />
            <ellipse className="ck-stand-base" cx="520" cy="358" rx="38" ry="7" />
            <path className="ck-bezel" d="M414 138 L608 122 L616 286 L424 308 Z" />
            <path className="ck-screen" d="M428 153 L594 139 L600 272 L436 292 Z" />
            <g className="ck-screen-content">
              <text className="ck-screen-title" x="446" y="176">monitoring</text>
              {dashboardBars.map((h, index) => {
                const bh = h * 0.6;
                return (
                  <rect
                    key={index}
                    className="ck-bar"
                    x={448 + index * 22}
                    y={256 - bh}
                    width="13"
                    height={bh}
                    rx="2"
                    style={{ animationDelay: `${index * 0.26}s` }}
                  />
                );
              })}
              <path className="ck-spark" d="M446 228 L470 214 L494 222 L518 198 L544 208 L568 190" />
              <circle className="ck-spark-dot" cx="568" cy="190" r="2.8" />
            </g>
          </g>

          {/* room hardware and desk lighting */}
          <g className="ck-tower">
            <path className="ck-tower-side" d="M652 354 L718 374 L718 540 L652 512 Z" />
            <path className="ck-tower-front" d="M592 378 L652 354 L652 512 L592 546 Z" />
            <path className="ck-tower-glass" d="M606 392 L640 380 L640 500 L606 518 Z" />
            <motion.path
              className="ck-tower-rgb"
              d="M646 382 L646 506"
              animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <path className="ck-tower-vents" d="M610 404 L636 394 M610 414 L636 404 M610 424 L632 416" />
            <circle className="ck-tower-fan" cx="624" cy="466" r="19" />
            <circle className="ck-tower-fan-core" cx="624" cy="466" r="5" />
          </g>

          <g className="ck-lamp">
            <ellipse className="ck-lamp-glow" cx="176" cy="370" rx="86" ry="32" fill="url(#ck-lamp)" />
            <path className="ck-lamp-arm" d="M156 384 C160 342 184 326 218 304" />
            <path className="ck-lamp-head" d="M212 294 L244 306 L232 326 L198 312 Z" />
            <circle className="ck-lamp-base" cx="154" cy="386" r="10" />
          </g>

          <g className="ck-deskprops">
            <path className="ck-keyboard" d="M270 402 L456 390 L488 426 L294 444 Z" />
            <g className="ck-keys">
              <path d="M292 410 L450 400 M298 420 L462 410 M306 430 L470 420" />
              <path d="M330 406 L344 436 M374 402 L388 432 M418 398 L432 426" />
            </g>
            <ellipse className="ck-key-glow" cx="390" cy="418" rx="96" ry="20" />
            <path className="ck-mouse" d="M506 402 C522 398 534 408 532 424 C530 438 512 442 504 430 C498 420 498 406 506 402 Z" />
            <g className="ck-mug">
              <path className="ck-mug-body" d="M226 390 L266 386 L262 432 L230 436 Z" />
              <path className="ck-mug-handle" d="M266 396 C288 396 288 424 264 422" />
              <ellipse className="ck-mug-top" cx="246" cy="389" rx="20" ry="5" />
              {[0, 1, 2].map((index) => (
                <motion.path
                  key={index}
                  className="ck-steam"
                  d={`M${238 + index * 10} 380 C${228 + index * 11} 360 ${252 + index * 7} 354 ${244 + index * 10} 332`}
                  animate={steamMotion}
                  transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.48, ease: "easeInOut" }}
                />
              ))}
            </g>
          </g>

          {/* chair behind operator */}
          <g className="ck-chair">
            <path className="ck-chair-shadow" d="M226 526 C262 486 438 484 490 530 C446 560 272 562 226 526 Z" />
            <path className="ck-chair-back" d="M260 468 C262 412 302 382 372 382 C434 382 470 412 476 468 L458 546 L270 546 Z" />
            <path className="ck-chair-stripe" d="M294 468 C296 424 324 404 374 402 C422 402 446 424 446 468" />
            <path className="ck-chair-seat" d="M252 486 C304 466 430 464 490 490 C462 526 286 532 252 486 Z" />
            <path className="ck-armrest" d="M230 462 C264 456 286 466 294 484 L238 494 C228 486 224 474 230 462 Z" />
            <path className="ck-armrest" d="M452 462 C484 456 510 466 514 482 L456 496 C448 486 444 472 452 462 Z" />
          </g>

          {/* operator in three-quarter profile, facing the displays */}
          <motion.g
            className="ck-operator"
            animate={reduceMotion ? undefined : { y: [0, -2.2, 0] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path className="ck-shirt" d="M266 548 C270 494 292 446 326 424 C344 414 390 412 414 424 C448 442 466 492 462 548 Z" />
            <path className="ck-shirt-collar" d="M332 426 C350 442 382 442 402 426 C394 452 344 452 332 426 Z" />
            <path className="ck-neck" d="M344 392 C358 404 384 404 398 392 L400 426 C384 438 352 438 338 426 Z" />

            <g className="ck-head-group">
              <path className="ck-ear" d="M326 348 C314 352 314 376 328 382 C336 370 336 358 326 348 Z" />
              <path className="ck-face" d="M330 318 C350 294 392 300 408 332 C424 362 408 394 376 404 C346 414 318 392 316 360 C314 342 320 328 330 318 Z" />
              <path className="ck-face-shadow" d="M386 322 C408 336 416 364 402 388 C418 380 426 352 410 330 C402 320 394 316 386 322 Z" />
              <path className="ck-cheek-light" d="M392 350 C404 356 406 374 394 384 C390 374 388 360 392 350 Z" />
              <path className="ck-nose" d="M398 350 C410 354 410 364 398 366" />

              <path className="ck-hair-base" d="M314 344 C306 312 328 284 366 278 C404 272 428 296 424 326 C420 340 408 348 394 344 C378 350 354 350 336 344 C328 350 320 350 314 344 Z" />
              <g className="ck-curls">
                {[
                  "M324 338 C304 324 316 294 344 294 C336 306 346 316 334 330",
                  "M342 314 C338 286 374 278 388 296 C370 296 370 314 354 318",
                  "M376 302 C396 280 426 300 420 328 C410 316 392 324 388 306",
                  "M314 360 C300 344 312 322 334 328 C326 342 338 354 326 366",
                  "M352 348 C340 330 358 310 382 318 C368 330 374 344 356 354",
                  "M398 342 C420 338 430 366 410 382 C410 366 392 362 398 342",
                  "M330 388 C314 378 318 356 342 354 C336 370 350 378 330 388",
                  "M370 382 C356 366 372 346 396 354 C384 366 392 378 370 382"
                ].map((d) => (
                  <path key={d} className="ck-curl-lock" d={d} />
                ))}
                <path className="ck-curl-shadow" d="M318 348 C350 366 388 362 416 342 C408 386 332 404 318 348 Z" />
                <path className="ck-curl-highlight" d="M342 304 C362 292 394 296 408 314 M326 348 C348 360 382 360 402 346" />
              </g>

              <g className="ck-glasses">
                <path className="ck-glasses-lens" d="M354 342 L380 340 L382 362 L356 364 Z" />
                <path className="ck-glasses-lens" d="M390 342 L412 346 L410 366 L388 362 Z" />
                <path className="ck-glasses-bridge" d="M382 352 L390 352" />
                <path className="ck-glasses-temple" d="M354 350 L334 344" />
              </g>
            </g>

            <motion.g
              className="ck-arm-right"
              animate={reduceMotion ? undefined : { y: [0, 2, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
            >
              <path className="ck-sleeve" d="M416 440 C444 444 462 460 470 482 L438 492 C430 472 416 460 398 452 Z" />
              <path className="ck-forearm" d="M438 484 C462 472 488 448 514 426" />
              <path className="ck-hand" d="M506 422 C526 416 540 424 538 438 C526 446 508 440 500 430 Z" />
              <path className="ck-fingers" d="M512 432 L532 434 M512 438 L528 442" />
            </motion.g>
            <g className="ck-arm-left">
              <path className="ck-sleeve" d="M310 438 C286 446 272 464 262 486 L296 496 C306 474 324 462 344 452 Z" />
              <path className="ck-forearm" d="M294 486 C314 468 334 448 356 430" />
              <path className="ck-hand" d="M348 426 C366 420 382 428 382 440 C370 448 350 442 342 432 Z" />
              <path className="ck-fingers" d="M350 436 L372 438 M354 442 L368 446" />
            </g>
          </motion.g>
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
