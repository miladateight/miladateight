import { Wrench, Network, Server, Bot, AlignRight, FileStack, ShieldCheck } from "lucide-react";
import { repos } from "./profile";

export const projectAccents = {
  keyfix: "#2dd4bf",
  netdoctor: "#38bdf8",
  pdfsan: "#fb7185",
  hwmi: "#8b5cf6",
  downloader: "#e879f9",
  airtl: "#f59e0b",
  veyna: "#4da3ff"
};

export const projects = [
  {
    slug: "keyfix",
    accent: "keyfix",
    visualTone: "precision-input",
    title: "KeyFix",
    type: {
      en: "Privacy-first Windows utility",
      fa: "ابزار ویندوز با تمرکز بر حریم خصوصی",
      ar: "أداة Windows تركز على الخصوصية",
      de: "Datenschutzfreundliches Windows-Tool"
    },
    stack: ".NET 8 / WinForms / Local-only",
    url: repos.keyfix,
    pageUrl: repos.keyfixPage,
    Icon: Wrench,
    tag: { en: "desktop tool", fa: "ابزار دسکتاپ", ar: "أداة سطح المكتب", de: "Desktop-Tool" },
    lines: {
      en: "A tray app that detects wrong keyboard-layout typing, switches input language, and corrects the previous word after Space — without telemetry.",
      fa: "اپلیکیشن tray ویندوز که تایپ با زبان اشتباه کیبورد را تشخیص می‌دهد، زبان ورودی را عوض می‌کند و بدون ارسال داده، کلمه قبلی را اصلاح می‌کند.",
      ar: "تطبيق صغير في شريط Windows يكتشف الكتابة بتخطيط لوحة مفاتيح خاطئ، يغيّر لغة الإدخال، ويصحّح الكلمة السابقة محلياً دون إرسال بيانات.",
      de: "Eine Tray-App, die falsche Tastaturlayouts erkennt, die Eingabesprache wechselt und das letzte Wort lokal korrigiert — ohne Telemetrie."
    }
  },
  {
    slug: "netdoctor",
    accent: "netdoctor",
    visualTone: "network-diagnostics",
    title: "NetDoctor",
    type: {
      en: "Network diagnosis and safe repair",
      fa: "تشخیص شبکه و ترمیم امن",
      ar: "تشخيص الشبكة وإصلاح آمن",
      de: "Netzwerkdiagnose und sichere Reparatur"
    },
    stack: ".NET 8 / Diagnostics / UX",
    url: repos.netDoctor,
    pageUrl: repos.netDoctorPage,
    Icon: Network,
    tag: { en: "diagnostics", fa: "عیب‌یابی", ar: "تشخيص", de: "Diagnose" },
    lines: {
      en: "A Windows network diagnostic app for DNS, latency, proxy state, and connectivity issues, with guided and reversible repair flows.",
      fa: "ابزار ویندوز برای بررسی DNS، تاخیر، وضعیت proxy و مشکلات اتصال، با ترمیم‌های هدایت‌شده و قابل بازگشت.",
      ar: "تطبيق Windows لتشخيص DNS والكمون وحالة proxy ومشاكل الاتصال، مع مسارات إصلاح موجَّهة وقابلة للتراجع.",
      de: "Ein Windows-Tool zur Diagnose von DNS, Latenz, Proxy-Status und Verbindungsproblemen mit geführten, rückgängig machbaren Reparaturen."
    }
  },
  {
    slug: "pdf-sanitizer",
    accent: "pdfsan",
    visualTone: "pdf-batch",
    title: "PDF Sanitizer",
    type: {
      en: "Bulk PDF cleanup and find-replace",
      fa: "ویرایش و پاک‌سازی دسته‌ای PDF",
      ar: "تنظيف واستبدال دفعي في PDF",
      de: "Stapel-PDF-Bereinigung und Suchen/Ersetzen"
    },
    stack: ".NET 8 / Batch PDF engine / Local-only",
    url: null,
    pageUrl: repos.pdfSanitizerPage,
    Icon: FileStack,
    tag: { en: "document tool", fa: "ابزار سند", ar: "أداة مستندات", de: "Dokumenten-Tool" },
    lines: {
      en: "A Windows tool that bulk-edits large PDFs — find, replace, remove, or insert repeated content across hundreds or thousands of pages from one rule set. Free up to 10 pages, unlimited on a Telegram license.",
      fa: "ابزار ویندوز برای ویرایش دسته‌ای PDFهای بزرگ — پیدا کردن، جایگزینی، حذف یا افزودن محتوای تکراری روی صدها یا هزاران صفحه با یک مجموعه قانون. رایگان تا ۱۰ صفحه، نامحدود با لایسنس تلگرام.",
      ar: "أداة Windows لتحرير ملفات PDF الكبيرة دفعةً واحدة — بحث واستبدال وحذف وإضافة للمحتوى المتكرر عبر مئات أو آلاف الصفحات من مجموعة قواعد واحدة. مجاني حتى 10 صفحات، وغير محدود بترخيص عبر Telegram.",
      de: "Ein Windows-Tool zum Stapel-Bearbeiten großer PDFs — Inhalte über Hunderte oder Tausende Seiten aus einem Regelsatz finden, ersetzen, entfernen oder einfügen. Kostenlos bis 10 Seiten, unbegrenzt mit Telegram-Lizenz."
    }
  },
  {
    slug: "hybrid-web-mail-infrastructure",
    accent: "hwmi",
    visualTone: "infrastructure-map",
    title: "Hybrid Web & Mail Infrastructure",
    type: {
      en: "Production case study",
      fa: "مطالعه موردی عملیاتی",
      ar: "دراسة حالة تشغيلية",
      de: "Praxisnaher Betriebsfall"
    },
    stack: "Linux / HestiaCP / Nginx / Exim / WireGuard / MikroTik",
    url: repos.infrastructure,
    pageUrl: repos.infrastructurePage,
    Icon: Server,
    tag: { en: "infrastructure", fa: "زیرساخت", ar: "بنية تحتية", de: "Infrastruktur" },
    lines: {
      en: "A sanitized production case study covering Linux hosting, the web/mail stack, HAProxy, WireGuard, MikroTik, DNS, and backup decisions.",
      fa: "مطالعه موردی پاک‌سازی‌شده از یک محیط واقعی، شامل هاستینگ لینوکس، پشته وب و ایمیل، HAProxy، WireGuard، MikroTik، DNS و تصمیم‌های بکاپ.",
      ar: "دراسة حالة من بيئة حقيقية بعد إزالة التفاصيل الحساسة، تشمل استضافة Linux ومنظومة الويب والبريد و HAProxy و WireGuard و MikroTik و DNS والنسخ الاحتياطي.",
      de: "Eine bereinigte Fallstudie aus dem realen Betrieb mit Linux-Hosting, Web/Mail-Stack, HAProxy, WireGuard, MikroTik, DNS und Backup-Entscheidungen."
    }
  },
  {
    slug: "instagram-youtube-soundcloud-downloader",
    accent: "downloader",
    visualTone: "automation-flow",
    title: "Media Downloader Bot",
    type: {
      en: "Telegram automation",
      fa: "اتوماسیون تلگرام",
      ar: "أتمتة Telegram",
      de: "Telegram-Automation"
    },
    stack: "Python / Telegram Bot API",
    url: repos.downloader,
    pageUrl: repos.downloaderPage,
    Icon: Bot,
    tag: { en: "automation", fa: "اتوماسیون", ar: "أتمتة", de: "Automation" },
    lines: {
      en: "A private Telegram bot that downloads from Instagram, YouTube, and SoundCloud, with admin activation and cookie management.",
      fa: "ربات تلگرامی خصوصی برای دانلود از Instagram، YouTube و SoundCloud، با فعال‌سازی توسط ادمین و مدیریت کوکی.",
      ar: "بوت Telegram خاص للتنزيل من Instagram و YouTube و SoundCloud، مع تفعيل من المسؤول وإدارة لملفات تعريف الارتباط.",
      de: "Ein privater Telegram-Bot zum Herunterladen von Instagram, YouTube und SoundCloud mit Admin-Aktivierung und Cookie-Verwaltung."
    }
  },
  {
    slug: "ai-chat-rtl-fixer",
    accent: "airtl",
    visualTone: "rtl-typography",
    title: "AI Chat RTL Fixer",
    type: {
      en: "Open-source RTL utility for AI chat apps",
      fa: "ابزار متن‌باز راست‌به‌چپ برای اپ‌های چت هوش مصنوعی",
      ar: "أداة RTL مفتوحة المصدر لتطبيقات دردشة الذكاء الاصطناعي",
      de: "Open-Source-RTL-Tool für KI-Chat-Apps"
    },
    stack: ".NET 8 / Tray app / CDP injection / Local-only",
    url: repos.aiRtl,
    pageUrl: repos.aiRtlPage,
    Icon: AlignRight,
    tag: { en: "desktop tool", fa: "ابزار دسکتاپ", ar: "أداة سطح المكتب", de: "Desktop-Tool" },
    lines: {
      en: "A Windows tray tool that fixes right-to-left rendering inside AI desktop chat apps for Persian, Arabic, Hebrew, and Urdu — while code, paths, and English stay left-to-right. Runtime-only, no telemetry.",
      fa: "ابزار tray ویندوز که رندر راست‌به‌چپ را داخل اپ‌های دسکتاپ چت هوش مصنوعی برای فارسی، عربی، عبری و اردو اصلاح می‌کند — در حالی که کد، مسیرها و انگلیسی چپ‌به‌راست می‌مانند. فقط زمان اجرا، بدون ارسال داده.",
      ar: "أداة في شريط مهام Windows تصحّح العرض من اليمين إلى اليسار داخل تطبيقات دردشة الذكاء الاصطناعي للفارسية والعربية والعبرية والأردية — مع بقاء الكود والمسارات والإنجليزية من اليسار إلى اليمين. وقت التشغيل فقط، دون إرسال بيانات.",
      de: "Eine Windows-Tray-App, die die Rechts-nach-links-Darstellung in KI-Desktop-Chat-Apps für Persisch, Arabisch, Hebräisch und Urdu korrigiert — während Code, Pfade und Englisch von links nach rechts bleiben. Nur zur Laufzeit, ohne Telemetrie."
    }
  },
  {
    slug: "veyna",
    accent: "veyna",
    visualTone: "secure-connectivity",
    title: "VEYNA",
    type: {
      en: "Privacy-focused Xray client",
      fa: "کلاینت Xray با تمرکز بر حریم خصوصی",
      ar: "عميل Xray يركز على الخصوصية",
      de: "Datenschutzorientierter Xray-Client"
    },
    stack: "Flutter / Dart / Go / Xray-core / Wintun",
    url: repos.veyna,
    pageUrl: repos.veynaPage,
    Icon: ShieldCheck,
    tag: { en: "connectivity", fa: "اتصال امن", ar: "اتصال آمن", de: "Sichere Verbindung" },
    lines: {
      en: "A modern Windows Xray client for standard links, subscriptions, and protected VEYNA profiles, with Smart, System Proxy, and TUN connection modes.",
      fa: "کلاینت مدرن Xray برای ویندوز با پشتیبانی از لینک‌ها و اشتراک‌های استاندارد، پروفایل‌های محافظت‌شده VEYNA و حالت‌های اتصال Smart، System Proxy و TUN.",
      ar: "عميل Xray حديث لنظام Windows يدعم الروابط والاشتراكات القياسية وملفات VEYNA المحمية، مع أوضاع اتصال Smart وSystem Proxy وTUN.",
      de: "Ein moderner Xray-Client für Windows mit Standard-Links, Abonnements, geschützten VEYNA-Profilen sowie Smart-, System-Proxy- und TUN-Verbindungsmodi."
    }
  }
];

export const specialties = [
  { en: "IT Operations", fa: "عملیات IT", ar: "عمليات تقنية المعلومات", de: "IT-Betrieb" },
  { en: "Network Infrastructure", fa: "زیرساخت شبکه", ar: "البنية التحتية للشبكة", de: "Netzwerkinfrastruktur" },
  { en: "MikroTik", fa: "MikroTik", ar: "MikroTik", de: "MikroTik" },
  { en: "Linux Servers", fa: "سرورهای لینوکس", ar: "خوادم Linux", de: "Linux-Server" },
  { en: "Windows Server", fa: "Windows Server", ar: "Windows Server", de: "Windows Server" },
  { en: "Virtualization", fa: "مجازی‌سازی", ar: "المحاكاة الافتراضية", de: "Virtualisierung" },
  { en: "VPN & Secure Tunneling", fa: "VPN و تونل امن", ar: "VPN والأنفاق الآمنة", de: "VPN und sichere Tunnel" },
  { en: "Mail & Web Infrastructure", fa: "زیرساخت ایمیل و وب", ar: "بنية البريد الإلكتروني والويب", de: "Mail- und Web-Infrastruktur" },
  { en: "DevOps", fa: "DevOps", ar: "DevOps", de: "DevOps" },
  { en: "Cloud", fa: "ابر", ar: "السحابة", de: "Cloud" },
  { en: "Automation", fa: "اتوماسیون", ar: "الأتمتة", de: "Automatisierung" },
  { en: "Web Development", fa: "توسعه وب", ar: "تطوير الويب", de: "Webentwicklung" },
  { en: "Programming", fa: "برنامه‌نویسی", ar: "البرمجة", de: "Programmierung" },
  { en: "Troubleshooting", fa: "عیب‌یابی", ar: "استكشاف الأخطاء", de: "Fehlerbehebung" },
  { en: "System Operations", fa: "عملیات سیستم", ar: "عمليات النظام", de: "Systembetrieb" }
];
