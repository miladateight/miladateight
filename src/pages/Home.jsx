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
import HeroStars from "../components/hero/HeroStars";
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
            <radialGradient id="ck-roomglow" cx="50%" cy="34%" r="60%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.36" />
              <stop offset="46%" stopColor="#6366f1" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#04070d" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ck-wall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0b1322" />
              <stop offset="100%" stopColor="#070d18" />
            </linearGradient>
            <linearGradient id="ck-floor" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#0a1019" />
              <stop offset="100%" stopColor="#05080e" />
            </linearGradient>
            <linearGradient id="ck-desk" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#16202f" />
              <stop offset="100%" stopColor="#0c131e" />
            </linearGradient>
            <linearGradient id="ck-screen" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0f2742" />
              <stop offset="60%" stopColor="#081522" />
              <stop offset="100%" stopColor="#040a12" />
            </linearGradient>
            <linearGradient id="ck-hoodie" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#243244" />
              <stop offset="100%" stopColor="#0e1622" />
            </linearGradient>
            <linearGradient id="ck-tee" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4a6290" />
              <stop offset="55%" stopColor="#243658" />
              <stop offset="100%" stopColor="#10192e" />
            </linearGradient>
            <radialGradient id="ck-hair" cx="42%" cy="32%" r="74%">
              <stop offset="0%" stopColor="#3b2c25" />
              <stop offset="100%" stopColor="#160f0c" />
            </radialGradient>
            <linearGradient id="ck-skin" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f0c2a0" />
              <stop offset="100%" stopColor="#c08a64" />
            </linearGradient>
            <linearGradient id="ck-rgb" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
            <radialGradient id="ck-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#fcd34d" stopOpacity="0" />
            </radialGradient>
            <filter id="ck-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* room */}
          <rect x="0" y="0" width="760" height="384" fill="url(#ck-wall)" />
          <path d="M0 384 H760 V600 H0 Z" fill="url(#ck-floor)" />
          <ellipse cx="384" cy="232" rx="312" ry="206" fill="url(#ck-roomglow)" filter="url(#ck-glow)" />
          <g className="ck-floorlines">
            <path d="M150 600 L300 384 M360 600 L380 384 M610 600 L470 384" />
          </g>

          {/* wall shelf + plant */}
          <g className="ck-shelf">
            <rect x="70" y="132" width="150" height="8" rx="3" />
            <rect x="86" y="98" width="14" height="34" rx="2" />
            <rect x="104" y="104" width="12" height="28" rx="2" />
            <rect x="120" y="100" width="13" height="32" rx="2" />
            <path className="ck-plant" d="M186 132 C182 112 196 104 198 92 C202 106 214 110 206 130" />
            <rect x="188" y="120" width="20" height="14" rx="3" className="ck-pot" />
          </g>

          {/* wall monitoring panel */}
          <g className="ck-wallpanel">
            <rect x="516" y="74" width="170" height="112" rx="10" />
            <text x="532" y="98" className="ck-panel-label">uptime · 99.98%</text>
            <path className="ck-panel-line" d="M532 156 L556 140 L580 150 L604 124 L628 134 L652 112 L672 120" />
            <circle cx="672" cy="120" r="3" className="ck-panel-dot" />
          </g>

          {/* desk */}
          <g className="ck-desk">
            <path className="ck-desk-shadow" d="M70 480 L690 480 L724 540 L40 540 Z" />
            <path className="ck-desk-top" d="M150 356 L612 356 L674 472 L84 472 Z" />
            <path className="ck-desk-edge" d="M84 472 L674 472 L674 486 L84 486 Z" />
          </g>

          {/* left primary monitor */}
          <g className="ck-monitor">
            <path className="ck-stand" d="M306 296 H338 L348 356 H296 Z" />
            <ellipse className="ck-stand-base" cx="322" cy="358" rx="40" ry="7" />
            <rect className="ck-bezel" x="206" y="148" width="224" height="152" rx="12" />
            <rect className="ck-screen" x="218" y="160" width="200" height="128" rx="6" />
            <g className="ck-screen-content" clipPath="none">
              <circle className="ck-dot dot-r" cx="234" cy="176" r="3" />
              <circle className="ck-dot dot-y" cx="246" cy="176" r="3" />
              <circle className="ck-dot dot-g" cx="258" cy="176" r="3" />
              <text className="ck-screen-title" x="276" y="180">terminal — ops</text>
              {consoleRows.map((row, index) => (
                <g key={row} className="ck-code-row" transform={`translate(234 ${204 + index * 19})`}>
                  <motion.rect
                    x="0" y="-7" height="6" rx="3"
                    animate={reduceMotion ? undefined : { width: [54 + index * 14, 96 + index * 9, 54 + index * 14] }}
                    transition={{ duration: 3.4 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <text x="0" y="9">{row}</text>
                </g>
              ))}
              <motion.rect
                className="ck-cursor" x="150" y="274" width="7" height="10" rx="1"
                animate={reduceMotion ? undefined : { opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.05, repeat: Infinity }}
              />
            </g>
          </g>

          {/* right secondary monitor (angled dashboard) */}
          <g className="ck-monitor ck-monitor-side">
            <path className="ck-stand" d="M512 286 H532 L540 352 H504 Z" />
            <ellipse className="ck-stand-base" cx="522" cy="354" rx="34" ry="6" />
            <path className="ck-bezel" d="M446 158 L598 146 L598 286 L446 296 Z" />
            <path className="ck-screen" d="M456 168 L588 158 L588 278 L456 286 Z" />
            <g className="ck-screen-content">
              <text className="ck-screen-title" x="470" y="184">monitoring</text>
              {dashboardBars.map((h, index) => {
                const bh = h * 0.6;
                return (
                  <rect
                    key={index}
                    className="ck-bar"
                    x={470 + index * 22}
                    y={252 - bh}
                    width="13"
                    height={bh}
                    rx="2"
                    style={{ animationDelay: `${index * 0.26}s` }}
                  />
                );
              })}
              <path className="ck-spark" d="M468 224 L492 210 L516 218 L540 198 L566 206 L584 192" />
              <circle className="ck-spark-dot" cx="584" cy="192" r="2.6" />
            </g>
          </g>

          {/* lamp */}
          <g className="ck-lamp">
            <ellipse cx="208" cy="360" rx="58" ry="14" fill="url(#ck-lamp)" />
            <path className="ck-lamp-arm" d="M176 356 C178 320 196 312 214 292" />
            <path className="ck-lamp-head" d="M210 286 L232 296 L222 312 L200 302 Z" />
            <circle className="ck-lamp-base" cx="176" cy="356" r="7" />
          </g>

          {/* keyboard + mouse + mug on desk */}
          <g className="ck-deskprops">
            <path className="ck-keyboard" d="M286 402 L452 396 L470 432 L300 440 Z" />
            <g className="ck-keys">
              <path d="M300 408 L444 403 M303 416 L448 411 M306 424 L452 419" />
            </g>
            <path className="ck-mouse" d="M486 410 C498 408 506 416 504 428 C502 438 488 440 482 430 C478 422 480 412 486 410 Z" />
            <g className="ck-mug">
              <path className="ck-mug-body" d="M238 396 H274 L270 436 H242 Z" />
              <path className="ck-mug-handle" d="M274 404 C292 404 292 426 272 424" />
              <ellipse className="ck-mug-top" cx="256" cy="396" rx="18" ry="4" />
              {[0, 1, 2].map((index) => (
                <motion.path
                  key={index}
                  className="ck-steam"
                  d={`M${248 + index * 8} 388 C${242 + index * 9} 372 ${256 + index * 6} 366 ${250 + index * 8} 350`}
                  animate={steamMotion}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
                />
              ))}
            </g>
          </g>

          {/* chair behind operator — tall back that visibly supports the shoulders */}
          <g className="ck-chair">
            <path className="ck-chair-back" d="M228 482 C224 372 286 348 360 348 C434 348 496 372 492 482 L496 544 L224 544 Z" />
            <path className="ck-chair-stripe" d="M260 482 C258 404 300 376 360 374 C420 376 462 404 460 482" />
            <path className="ck-chair-top" d="M244 366 C260 352 296 346 360 346 C424 346 460 352 476 366" />
            <rect className="ck-armrest" x="214" y="464" width="62" height="22" rx="10" />
            <rect className="ck-armrest" x="444" y="464" width="62" height="22" rx="10" />
          </g>

          {/* operator — over-the-shoulder back/profile view, subtle recline */}
          <g transform="rotate(1.2 360 470)">
            <motion.g
              className="ck-operator"
              animate={reduceMotion ? undefined : { y: [0, -2.2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* t-shirt torso — clear shirt silhouette with shoulders, sleeves, hem */}
              <path
                className="ck-tee"
                d="M284 442
                   C272 440 258 448 252 460
                   L238 478
                   C240 486 252 490 266 486
                   L286 480
                   L290 540
                   L430 540
                   L434 480
                   L454 486
                   C468 490 480 486 482 478
                   L468 460
                   C462 448 448 440 436 442
                   L420 444
                   C414 446 408 446 402 444
                   C396 442 390 442 384 444
                   C378 446 372 446 366 444
                   C360 442 354 442 348 444
                   C342 446 336 446 330 444
                   C324 442 318 442 312 444
                   C306 446 300 446 294 444 Z"
              />
              {/* short sleeves capping the shoulders */}
              <path
                className="ck-tee-sleeve"
                d="M252 460 C244 466 236 476 236 484 C238 488 250 490 266 486 L286 480 L290 466 Z"
              />
              <path
                className="ck-tee-sleeve"
                d="M468 460 C476 466 484 476 484 484 C482 488 470 490 454 486 L434 480 L430 466 Z"
              />
              {/* collar — crew neck */}
              <path
                className="ck-tee-collar"
                d="M338 444 C346 454 354 458 360 458 C366 458 374 454 382 444 L378 444 C372 448 366 450 360 450 C354 450 348 448 342 444 Z"
              />
              {/* neck */}
              <path className="ck-neck" d="M340 406 H380 L382 428 H338 Z" />
              {/* head */}
              <ellipse className="ck-head" cx="360" cy="372" rx="44" ry="50" />
              {/* hair — curly: base cap + cluster of curls */}
              <path
                className="ck-hair-cap"
                d="M312 380
                   C308 350 322 326 344 320
                   C360 316 376 318 392 326
                   C406 336 412 354 410 376
                   C408 388 404 398 398 408
                   L390 402
                   C392 392 388 382 380 376
                   C368 368 350 368 340 378
                   C330 388 326 402 326 414
                   L320 416
                   C314 408 312 394 312 380 Z"
              />
              <g className="ck-curls">
                {[
                  [322, 332, 14], [344, 324, 16], [368, 322, 15], [392, 326, 14], [410, 338, 13],
                  [316, 352, 13], [336, 344, 15], [360, 340, 16], [384, 342, 15], [404, 352, 13],
                  [320, 372, 12], [342, 364, 14], [366, 362, 14], [388, 366, 13], [406, 378, 11],
                  [330, 392, 11], [352, 386, 12], [376, 386, 12], [396, 392, 11],
                ].map(([cx, cy, r], i) => (
                  <circle key={i} cx={cx} cy={cy} r={r} />
                ))}
              </g>
              {/* front hair fringe — curly bangs */}
              <path
                className="ck-hair-front"
                d="M322 358
                   C326 344 342 332 360 332
                   C378 332 394 344 398 360
                   C392 352 384 348 376 350
                   C368 352 362 358 356 362
                   C350 366 342 366 336 362
                   C332 360 328 360 324 362 Z"
              />
              {/* profile sliver on the right */}
              <path className="ck-cheek" d="M398 360 C410 366 410 392 400 402 C396 394 396 372 398 360 Z" />
              <path className="ck-glasses-temple" d="M392 372 H406" />
              {/* headphones */}
              <path className="ck-hp-band" d="M316 360 C322 318 398 318 404 360" />
              <ellipse className="ck-hp-cup" cx="314" cy="374" rx="10" ry="17" />
              <ellipse className="ck-hp-cup ck-hp-cup-right" cx="406" cy="374" rx="9" ry="16" />
              {/* arms reaching to desk */}
              <motion.g
                className="ck-arm-right"
                animate={reduceMotion ? undefined : { y: [0, 2.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <path className="ck-arm" d="M420 452 C440 452 452 446 460 430" />
                <ellipse className="ck-hand" cx="462" cy="426" rx="15" ry="10" transform="rotate(-18 462 426)" />
              </motion.g>
              <g className="ck-arm-left">
                <path className="ck-arm" d="M300 452 C284 452 272 444 264 430" />
                <ellipse className="ck-hand" cx="262" cy="426" rx="14" ry="10" transform="rotate(16 262 426)" />
              </g>
            </motion.g>
          </g>

          {/* PC tower with RGB */}
          <g className="ck-tower">
            <path className="ck-tower-side" d="M714 380 L734 390 L734 580 L714 570 Z" />
            <rect className="ck-tower-front" x="636" y="380" width="78" height="190" rx="8" />
            <rect className="ck-tower-glass" x="648" y="394" width="40" height="162" rx="4" />
            <motion.rect
              className="ck-tower-rgb"
              x="694" y="396" width="6" height="158" rx="3"
              fill="url(#ck-rgb)"
              animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <path className="ck-tower-vents" d="M650 404 H678 M650 412 H678 M650 420 H672" />
            <circle className="ck-tower-fan" cx="668" cy="475" r="20" />
            <circle className="ck-tower-fan-core" cx="668" cy="475" r="5" />
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
