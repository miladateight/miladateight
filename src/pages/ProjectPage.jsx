import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Download, Github, Layers3 } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { projectPages } from "../data/projectPages";
import { VisualBoundary } from "../components/ErrorBoundary";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import { spring } from "../utils/motion";
import { localize } from "../utils/localize";

const ProjectVisual = lazy(() => import("../components/ProjectVisuals"));

const pageText = {
  role: {
    en: "Role",
    fa: "نقش",
    ar: "الدور",
    de: "Rolle",
  },
  objective: {
    en: "Objective",
    fa: "هدف",
    ar: "الهدف",
    de: "Ziel",
  },
  stack: {
    en: "Technology stack",
    fa: "پشته فناوری",
    ar: "المكدس التقني",
    de: "Technologie-Stack",
  },
  source: {
    en: "Source repository",
    fa: "مخزن سورس",
    ar: "مستودع المصدر",
    de: "Quell-Repository",
  },
  visual: {
    en: "Project system view",
    fa: "نمای سیستمی پروژه",
    ar: "عرض النظام للمشروع",
    de: "Systemansicht des Projekts",
  },
  other: {
    en: "More AT8 projects",
    fa: "پروژه‌های دیگر AT8",
    ar: "مشاريع AT8 أخرى",
    de: "Weitere AT8 Projekte",
  },
  previous: {
    en: "Previous",
    fa: "قبلی",
    ar: "السابق",
    de: "Zurück",
  },
  next: {
    en: "Next",
    fa: "بعدی",
    ar: "التالي",
    de: "Weiter",
  },
  roleBody: {
    en: "Personal AT8 project: research, architecture, implementation, documentation, and release presentation.",
    fa: "پروژه شخصی AT8: تحقیق، معماری، پیاده‌سازی، مستندسازی و ارائه انتشار.",
    ar: "مشروع AT8 شخصي: بحث ومعمارية وتنفيذ وتوثيق وعرض الإصدار.",
    de: "Persönliches AT8 Projekt: Recherche, Architektur, Umsetzung, Dokumentation und Release-Darstellung.",
  },
};

const detailLabels = {
  architecture: { en: "Architecture and workflow", fa: "معماری و روند کار", ar: "البنية وسير العمل", de: "Architektur und Ablauf" },
  decisions: { en: "Technical decisions", fa: "تصمیم‌های فنی", ar: "قرارات تقنية", de: "Technische Entscheidungen" },
  limits: { en: "Limits", fa: "محدودیت‌ها", ar: "القيود", de: "Grenzen" },
  security: { en: "Security and privacy", fa: "امنیت و حریم خصوصی", ar: "الأمان والخصوصية", de: "Sicherheit und Datenschutz" },
  result: { en: "Result and use", fa: "نتیجه و کاربرد", ar: "النتيجة والاستخدام", de: "Ergebnis und Nutzung" },
};

const notesKicker = { en: "AT8 Project Notes", fa: "یادداشت‌های پروژه AT8", ar: "ملاحظات مشروع AT8", de: "AT8 Projektnotizen" };

function notesTitleFor(title, language) {
  if (language === "fa") return `یادداشت‌های فنی ${title}`;
  if (language === "ar") return `الملاحظات الفنية لـ ${title}`;
  if (language === "de") return `Technische Notizen zu ${title}`;
  return `${title} technical notes`;
}

const projectDetails = {
  keyfix: {
    architecture: {
      en: "KeyFix stays in the Windows tray, watches a short in-memory word buffer, compares that word with enabled keyboard-layout maps and dictionaries, then acts only after a clear trigger such as Space.",
      fa: "KeyFix در tray ویندوز باقی می‌ماند، یک بافر کوتاه از کلمه‌ی در حال تایپ را در حافظه بررسی می‌کند، آن کلمه را با نقشه‌های چیدمان کیبورد و دیکشنری‌های فعال مقایسه می‌کند و فقط بعد از یک محرک مشخص مثل Space وارد عمل می‌شود.",
      ar: "يبقى KeyFix في شريط مهام Windows، ويراقب مخزناً قصيراً للكلمة الجاري كتابتها داخل الذاكرة، ويقارن تلك الكلمة بخرائط تخطيط لوحة المفاتيح والقواميس المفعّلة، ثم يتصرف فقط بعد محفّز واضح مثل زر Space.",
      de: "KeyFix bleibt im Windows-Tray, beobachtet einen kurzen Wortpuffer im Speicher, vergleicht dieses Wort mit aktivierten Tastaturlayout-Zuordnungen und Wörterbüchern und handelt erst nach einem klaren Auslöser wie Space.",
    },
    decisions: {
      en: "The project favors local scoring, per-language enablement, excluded apps, conservative handling for short words, and a release path that does not require users to build from source.",
      fa: "این پروژه امتیازدهی محلی، فعال‌سازی جداگانه برای هر زبان، برنامه‌های مستثنی‌شده، برخورد محتاطانه با کلمات کوتاه و مسیر انتشاری را ترجیح می‌دهد که نیازی به build کردن سورس توسط کاربر ندارد.",
      ar: "يفضّل المشروع التقييم المحلي، والتفعيل حسب اللغة، والتطبيقات المستثناة، والتعامل الحذر مع الكلمات القصيرة، ومسار إصدار لا يتطلب من المستخدمين بناء المصدر بأنفسهم.",
      de: "Das Projekt setzt auf lokale Bewertung, sprachspezifische Aktivierung, ausgeschlossene Apps, vorsichtigen Umgang mit kurzen Wörtern und einen Release-Weg, der keinen Build aus dem Quellcode durch die Nutzer erfordert.",
    },
    limits: {
      en: "It cannot guarantee every ambiguous short word is wrong, and unsupported layouts or sensitive apps should stay excluded so correction never becomes intrusive.",
      fa: "نمی‌تواند تضمین کند هر کلمه کوتاه مبهم اشتباه است و چیدمان‌های پشتیبانی‌نشده یا برنامه‌های حساس باید مستثنی بمانند تا اصلاح هرگز مزاحم نشود.",
      ar: "لا يمكنه ضمان أن كل كلمة قصيرة غامضة خاطئة، ويجب أن تبقى التخطيطات غير المدعومة أو التطبيقات الحساسة مستثناة حتى لا يصبح التصحيح مزعجاً أبداً.",
      de: "Es kann nicht garantieren, dass jedes mehrdeutige kurze Wort falsch ist, und nicht unterstützte Layouts oder sensible Apps sollten ausgeschlossen bleiben, damit die Korrektur nie aufdringlich wird.",
    },
    security: {
      en: "Typed text is not uploaded or stored as telemetry. The working buffer is temporary and the privacy model is based on local-only processing.",
      fa: "متن تایپ‌شده به‌عنوان telemetry آپلود یا ذخیره نمی‌شود. بافر کاری موقتی است و مدل حریم خصوصی بر پایه پردازش کاملاً محلی است.",
      ar: "لا يُرفَع النص المكتوب أو يُخزَّن كبيانات تتبّع. المخزن المؤقت للعمل مؤقت ونموذج الخصوصية يقوم على المعالجة المحلية فقط.",
      de: "Getippter Text wird nicht als Telemetrie hochgeladen oder gespeichert. Der Arbeitspuffer ist temporär, und das Datenschutzmodell basiert auf ausschließlich lokaler Verarbeitung.",
    },
    result: {
      en: "The practical outcome is a small desktop utility for multilingual typists who often switch between English, Persian, Arabic, and German layouts.",
      fa: "نتیجه عملی یک ابزار کوچک دسکتاپ برای کاربرانی است که به چند زبان تایپ می‌کنند و مدام بین چیدمان انگلیسی، فارسی، عربی و آلمانی جابجا می‌شوند.",
      ar: "النتيجة العملية أداة سطح مكتب صغيرة لمستخدمين متعددي اللغات ينتقلون كثيراً بين تخطيطات الإنجليزية والفارسية والعربية والألمانية.",
      de: "Das praktische Ergebnis ist ein kleines Desktop-Werkzeug für mehrsprachige Tipper, die häufig zwischen englischem, persischem, arabischem und deutschem Layout wechseln.",
    },
  },
  netdoctor: {
    architecture: {
      en: "NetDoctor presents a step-by-step diagnostics flow for adapter state, IP configuration, gateway reachability, DNS, latency, proxy settings, and internet connectivity.",
      fa: "NetDoctor یک جریان تشخیصی گام‌به‌گام برای وضعیت آداپتور، پیکربندی IP، دسترسی به گیت‌وی، DNS، تاخیر، تنظیمات پراکسی و اتصال اینترنت ارائه می‌دهد.",
      ar: "يقدّم NetDoctor مساراً تشخيصياً خطوة بخطوة لحالة المحول وتهيئة IP والوصول إلى البوابة وDNS والكمون وإعدادات الوكيل واتصال الإنترنت.",
      de: "NetDoctor bietet einen schrittweisen Diagnoseablauf für Adapterstatus, IP-Konfiguration, Gateway-Erreichbarkeit, DNS, Latenz, Proxy-Einstellungen und Internetverbindung.",
    },
    decisions: {
      en: "The repair model is guided and reversible where possible, so the user can understand what changed instead of running a black-box network reset.",
      fa: "مدل ترمیم هدایت‌شده و تا حد امکان قابل بازگشت است تا کاربر بفهمد چه چیزی تغییر کرده، به‌جای اجرای یک ریست شبکه جعبه‌سیاه.",
      ar: "نموذج الإصلاح موجَّه وقابل للتراجع حيثما أمكن، ليفهم المستخدم ما الذي تغيّر بدلاً من تشغيل إعادة ضبط شبكة غامضة (صندوق أسود).",
      de: "Das Reparaturmodell ist geführt und, wo möglich, rückgängig machbar, damit der Nutzer versteht, was sich geändert hat, statt einen undurchsichtigen Netzwerk-Reset auszuführen.",
    },
    limits: {
      en: "The tool can identify common Windows connectivity faults, but it does not replace ISP-side troubleshooting, damaged hardware checks, or enterprise network policy review.",
      fa: "این ابزار می‌تواند خطاهای رایج اتصال ویندوز را شناسایی کند، اما جایگزین عیب‌یابی سمت ISP، بررسی سخت‌افزار آسیب‌دیده یا بازبینی سیاست‌های شبکه سازمانی نیست.",
      ar: "يمكن للأداة تحديد أعطال الاتصال الشائعة في Windows، لكنها لا تحل محل استكشاف الأعطال لدى مزود الخدمة، أو فحص العتاد التالف، أو مراجعة سياسات الشبكة المؤسسية.",
      de: "Das Tool kann häufige Windows-Verbindungsfehler erkennen, ersetzt aber keine ISP-seitige Fehlersuche, Prüfung defekter Hardware oder Überprüfung von Unternehmensnetzwerk-Richtlinien.",
    },
    security: {
      en: "The diagnostic focus is local network state. Repair actions should remain explicit, documented, and scoped to the setting being fixed.",
      fa: "تمرکز تشخیص روی وضعیت شبکه محلی است. اقدام‌های ترمیم باید صریح، مستند و محدود به همان تنظیمی باشند که در حال اصلاح آن هستیم.",
      ar: "يتركّز التشخيص على حالة الشبكة المحلية. يجب أن تبقى إجراءات الإصلاح صريحة وموثّقة ومحصورة بالإعداد الذي يتم إصلاحه.",
      de: "Der diagnostische Fokus liegt auf dem lokalen Netzwerkstatus. Reparaturmaßnahmen sollten explizit, dokumentiert und auf die jeweils zu behebende Einstellung begrenzt bleiben.",
    },
    result: {
      en: "It is useful when a user or technician needs a clearer path from symptom to likely cause before applying a network repair.",
      fa: "زمانی مفید است که کاربر یا تکنسین به مسیری روشن‌تر از علامت تا علت محتمل نیاز دارد، پیش از اعمال یک ترمیم شبکه.",
      ar: "يفيد عندما يحتاج المستخدم أو الفني إلى مسار أوضح من العارض إلى السبب المحتمل قبل تطبيق إصلاح للشبكة.",
      de: "Es ist hilfreich, wenn ein Nutzer oder Techniker einen klareren Weg vom Symptom zur wahrscheinlichen Ursache braucht, bevor eine Netzwerkreparatur angewendet wird.",
    },
  },
  "pdf-sanitizer": {
    architecture: {
      en: "PDF Sanitizer loads a document, builds a rule set describing which repeated blocks to remove, which text or values to replace, and what to insert, then applies those rules across every page in a single batch pass and exports a new clean PDF.",
      fa: "PDF Sanitizer یک سند را بارگذاری می‌کند، یک مجموعه قانون می‌سازد که مشخص می‌کند کدام بلوک‌های تکراری حذف شوند، کدام متن یا مقادیر جایگزین شوند و چه چیزی اضافه شود، سپس آن قانون‌ها را در یک اجرای دسته‌ای روی همه صفحات اعمال می‌کند و یک PDF تمیز جدید خروجی می‌گیرد.",
      ar: "يحمّل PDF Sanitizer مستنداً، ويبني مجموعة قواعد تحدّد أي الكتل المتكررة تُحذف، وأي نص أو قيم تُستبدل، وما الذي يُضاف، ثم يطبّق تلك القواعد على كل صفحة في تمريرة دفعية واحدة ويصدّر ملف PDF نظيفاً جديداً.",
      de: "PDF Sanitizer lädt ein Dokument, erstellt ein Regelwerk, das festlegt, welche wiederkehrenden Blöcke entfernt, welcher Text oder welche Werte ersetzt und was eingefügt werden soll, wendet diese Regeln dann in einem einzigen Stapeldurchgang auf jede Seite an und exportiert ein neues, sauberes PDF.",
    },
    decisions: {
      en: "The tool is built around reusable rules instead of manual page edits, keeps processing local, previews changes before writing the file, and separates a free tier for small jobs from a licensed premium tier for large-scale work.",
      fa: "این ابزار بر پایه قانون‌های قابل استفاده مجدد ساخته شده، نه ویرایش دستی صفحه‌به‌صفحه؛ پردازش را محلی نگه می‌دارد، پیش از نوشتن فایل تغییرات را پیش‌نمایش می‌دهد و یک سطح رایگان برای کارهای کوچک را از یک سطح پریمیوم لایسنس‌دار برای کارهای بزرگ جدا می‌کند.",
      ar: "بُنيت الأداة حول قواعد قابلة لإعادة الاستخدام بدلاً من التحرير اليدوي صفحة بصفحة، وتُبقي المعالجة محلية، وتعاين التغييرات قبل كتابة الملف، وتفصل باقة مجانية للمهام الصغيرة عن باقة بريميوم مرخّصة للعمل واسع النطاق.",
      de: "Das Tool basiert auf wiederverwendbaren Regeln statt manueller Seitenbearbeitung, hält die Verarbeitung lokal, zeigt Änderungen vor dem Schreiben der Datei als Vorschau und trennt eine kostenlose Stufe für kleine Aufgaben von einer lizenzierten Premium-Stufe für umfangreiche Arbeiten.",
    },
    limits: {
      en: "The free tier is capped at 10 pages per file and 2 files per day; very large or unusually structured documents may need rule tuning, and scanned image-only PDFs depend on how their text is stored.",
      fa: "سطح رایگان به ۱۰ صفحه در هر فایل و ۲ فایل در روز محدود است؛ اسناد بسیار بزرگ یا با ساختار غیرمعمول ممکن است نیاز به تنظیم دقیق‌تر قانون‌ها داشته باشند و PDFهای اسکن‌شده‌ی فقط‌تصویری به نحوه ذخیره متن‌شان بستگی دارند.",
      ar: "الباقة المجانية محدودة بـ 10 صفحات لكل ملف وملفين في اليوم؛ قد تحتاج المستندات الكبيرة جداً أو ذات البنية غير المعتادة إلى ضبط دقيق للقواعد، وتعتمد ملفات PDF الممسوحة ضوئياً (صور فقط) على طريقة تخزين نصها.",
      de: "Die kostenlose Stufe ist auf 10 Seiten pro Datei und 2 Dateien pro Tag begrenzt; sehr große oder ungewöhnlich strukturierte Dokumente benötigen eventuell Regel-Feinabstimmung, und gescannte, reine Bild-PDFs hängen davon ab, wie ihr Text gespeichert ist.",
    },
    security: {
      en: "Documents are processed locally on the user's machine. Nothing is uploaded, and the premium tier is unlocked with a per-user license issued over Telegram rather than an account.",
      fa: "اسناد روی سیستم خود کاربر پردازش می‌شوند. هیچ‌چیز آپلود نمی‌شود و سطح پریمیوم با یک لایسنس اختصاصی که از طریق تلگرام صادر می‌شود باز می‌شود، نه با ساخت حساب کاربری.",
      ar: "تُعالَج المستندات محلياً على جهاز المستخدم. لا يُرفَع أي شيء، وتُفتَح الباقة البريميوم بترخيص خاص بكل مستخدم يُصدَر عبر Telegram بدلاً من إنشاء حساب.",
      de: "Dokumente werden lokal auf dem Rechner des Nutzers verarbeitet. Nichts wird hochgeladen, und die Premium-Stufe wird mit einer benutzerbezogenen Lizenz freigeschaltet, die über Telegram statt über ein Konto ausgestellt wird.",
    },
    result: {
      en: "The practical outcome is that commercial and trading teams can clean or update huge PDFs — hundreds to thousands of pages — in one pass instead of editing them page by page.",
      fa: "نتیجه عملی این است که تیم‌های بازرگانی و تجاری می‌توانند PDFهای بسیار بزرگ — از صدها تا هزاران صفحه — را در یک مرحله پاک‌سازی یا به‌روزرسانی کنند، به‌جای ویرایش صفحه‌به‌صفحه.",
      ar: "النتيجة العملية أن الفرق التجارية يمكنها تنظيف أو تحديث ملفات PDF ضخمة — من مئات إلى آلاف الصفحات — في تمريرة واحدة بدلاً من تحريرها صفحة بصفحة.",
      de: "Das praktische Ergebnis ist, dass Handels- und Geschäftsteams riesige PDFs — Hunderte bis Tausende Seiten — in einem Durchgang bereinigen oder aktualisieren können, statt sie Seite für Seite zu bearbeiten.",
    },
  },
  "hybrid-web-mail-infrastructure": {
    architecture: {
      en: "The case study separates local and public environments: users and LAN services connect through MikroTik and WireGuard to a VPS, then HAProxy/Caddy routes web and mail traffic with DNS, TLS, and backup paths documented separately.",
      fa: "این مطالعه موردی محیط محلی و عمومی را از هم جدا می‌کند: کاربران و سرویس‌های LAN از طریق MikroTik و WireGuard به یک VPS وصل می‌شوند، سپس HAProxy/Caddy ترافیک وب و ایمیل را مسیریابی می‌کند، در حالی که DNS، TLS و مسیرهای بکاپ جداگانه مستند شده‌اند.",
      ar: "تفصل دراسة الحالة بين البيئتين المحلية والعامة: يتصل المستخدمون وخدمات LAN عبر MikroTik وWireGuard بخادم VPS، ثم يوجّه HAProxy/Caddy حركة الويب والبريد، بينما تُوثَّق مسارات DNS وTLS والنسخ الاحتياطي بشكل منفصل.",
      de: "Die Fallstudie trennt lokale und öffentliche Umgebungen: Nutzer und LAN-Dienste verbinden sich über MikroTik und WireGuard mit einem VPS, danach leitet HAProxy/Caddy Web- und Mail-Verkehr weiter, während DNS-, TLS- und Backup-Wege separat dokumentiert sind.",
    },
    decisions: {
      en: "The design keeps the local site private, uses the VPS as a public edge, splits web and mail flows deliberately, and treats DNS, TLS, monitoring, and backup as first-class operational concerns.",
      fa: "این طراحی سایت محلی را خصوصی نگه می‌دارد، از VPS به‌عنوان لبه عمومی استفاده می‌کند، جریان‌های وب و ایمیل را عمداً از هم جدا می‌کند و DNS، TLS، مانیتورینگ و بکاپ را به‌عنوان دغدغه‌های عملیاتی درجه‌یک در نظر می‌گیرد.",
      ar: "يحافظ التصميم على خصوصية الموقع المحلي، ويستخدم VPS كحافة عامة، ويفصل تدفقات الويب والبريد عمداً، ويتعامل مع DNS وTLS والمراقبة والنسخ الاحتياطي باعتبارها اهتمامات تشغيلية أساسية.",
      de: "Das Design hält die lokale Seite privat, nutzt den VPS als öffentlichen Edge, trennt Web- und Mail-Flows bewusst und behandelt DNS, TLS, Monitoring und Backup als zentrale betriebliche Anliegen.",
    },
    limits: {
      en: "The published material is sanitized. It avoids exposing sensitive hostnames, secrets, customer details, and private network values.",
      fa: "مطالب منتشرشده پاک‌سازی شده‌اند و از افشای hostnameهای حساس، اطلاعات محرمانه، جزئیات مشتری و مقادیر شبکه خصوصی پرهیز می‌کنند.",
      ar: "المواد المنشورة منظّفة، وتتجنّب كشف أسماء المضيفين الحساسة والأسرار وتفاصيل العملاء وقيم الشبكة الخاصة.",
      de: "Das veröffentlichte Material ist bereinigt. Es vermeidet die Offenlegung sensibler Hostnamen, Geheimnisse, Kundendetails und privater Netzwerkwerte.",
    },
    security: {
      en: "WireGuard, DNS records, TLS handling, service separation, and encrypted backups are described as architecture decisions rather than leaked production configuration.",
      fa: "WireGuard، رکوردهای DNS، مدیریت TLS، جداسازی سرویس‌ها و بکاپ‌های رمزگذاری‌شده به‌عنوان تصمیم‌های معماری توصیف شده‌اند، نه به‌عنوان پیکربندی واقعی افشاشده.",
      ar: "يُوصَف WireGuard وسجلات DNS ومعالجة TLS وفصل الخدمات والنسخ الاحتياطية المشفّرة كقرارات معمارية وليس كإعدادات إنتاج مسرَّبة.",
      de: "WireGuard, DNS-Einträge, TLS-Handling, Service-Trennung und verschlüsselte Backups werden als Architekturentscheidungen beschrieben, nicht als durchgesickerte Produktionskonfiguration.",
    },
    result: {
      en: "The page works as a readable infrastructure note for planning, reviewing, or explaining a hybrid web and mail migration.",
      fa: "این صفحه به‌عنوان یک یادداشت زیرساختی قابل‌خواندن برای برنامه‌ریزی، بازبینی یا توضیح یک مهاجرت ترکیبی وب و ایمیل عمل می‌کند.",
      ar: "تعمل الصفحة كملاحظة بنية تحتية سهلة القراءة للتخطيط أو المراجعة أو شرح عملية ترحيل هجينة للويب والبريد.",
      de: "Die Seite dient als gut lesbare Infrastruktur-Notiz zum Planen, Überprüfen oder Erklären einer hybriden Web- und Mail-Migration.",
    },
  },
  "instagram-youtube-soundcloud-downloader": {
    architecture: {
      en: "The Telegram bot receives a media URL from an authorized user, detects the platform, fetches metadata, selects a download format when available, queues work, and returns the file inside Telegram.",
      fa: "ربات تلگرامی یک URL رسانه را از کاربر مجاز دریافت می‌کند، پلتفرم را تشخیص می‌دهد، متادیتا را می‌گیرد، در صورت وجود فرمت دانلود را انتخاب می‌کند، کار را در صف قرار می‌دهد و فایل را داخل تلگرام برمی‌گرداند.",
      ar: "يستقبل بوت Telegram رابط وسائط من مستخدم مصرَّح له، ويكتشف المنصة، ويجلب البيانات الوصفية، ويختار تنسيق التنزيل عند توفره، ويضع العمل في قائمة انتظار، ويعيد الملف داخل Telegram.",
      de: "Der Telegram-Bot empfängt eine Medien-URL von einem autorisierten Nutzer, erkennt die Plattform, ruft Metadaten ab, wählt bei Verfügbarkeit ein Download-Format, reiht die Aufgabe in eine Warteschlange ein und liefert die Datei innerhalb von Telegram zurück.",
    },
    decisions: {
      en: "Admin activation, queueing, cookie-based authentication where needed, and platform-specific handling keep the workflow controlled instead of exposing a public downloader surface.",
      fa: "فعال‌سازی توسط ادمین، صف‌بندی، احراز هویت مبتنی بر کوکی در صورت نیاز و مدیریت اختصاصی هر پلتفرم، جریان کار را کنترل‌شده نگه می‌دارند، به‌جای در معرض قرار دادن یک رابط دانلود عمومی.",
      ar: "يحافظ التفعيل من قبل المسؤول والوضع في قائمة الانتظار والمصادقة القائمة على الكوكيز عند الحاجة والمعالجة الخاصة بكل منصة على انضباط سير العمل، بدلاً من كشف واجهة تنزيل عامة.",
      de: "Admin-Aktivierung, Warteschlangen, cookie-basierte Authentifizierung bei Bedarf und plattformspezifische Behandlung halten den Ablauf kontrolliert, statt eine öffentliche Downloader-Oberfläche offenzulegen.",
    },
    limits: {
      en: "Availability depends on platform behavior, account access, rate limits, media rights, and the size limits of the delivery channel.",
      fa: "دسترس‌پذیری به رفتار پلتفرم، دسترسی حساب، محدودیت نرخ، حقوق رسانه و محدودیت حجم کانال تحویل بستگی دارد.",
      ar: "يعتمد التوفر على سلوك المنصة، والوصول إلى الحساب، وحدود المعدل، وحقوق الوسائط، وحدود حجم قناة التسليم.",
      de: "Die Verfügbarkeit hängt vom Plattformverhalten, Kontozugriff, Ratenlimits, Medienrechten und den Größenbeschränkungen des Zustellkanals ab.",
    },
    security: {
      en: "Access is limited to approved Telegram users. Cookie handling and logs should stay minimal because downloader workflows can expose sensitive account or media metadata.",
      fa: "دسترسی فقط برای کاربران تأییدشده تلگرام امکان‌پذیر است. مدیریت کوکی و لاگ‌ها باید حداقلی بمانند، چون جریان‌های دانلود می‌توانند متادیتای حساس حساب یا رسانه را افشا کنند.",
      ar: "يقتصر الوصول على مستخدمي Telegram المعتمدين. يجب أن تبقى معالجة الكوكيز والسجلات في حدها الأدنى لأن مسارات التنزيل قد تكشف بيانات وصفية حساسة للحساب أو الوسائط.",
      de: "Der Zugriff ist auf genehmigte Telegram-Nutzer beschränkt. Cookie-Handling und Logs sollten minimal bleiben, da Downloader-Abläufe sensible Konto- oder Medien-Metadaten offenlegen können.",
    },
    result: {
      en: "The useful result is a private automation tool that removes the need to jump between multiple ad-heavy download sites or browser extensions.",
      fa: "نتیجه مفید یک ابزار خودکار خصوصی است که نیاز به جابجایی بین چند سایت دانلود پر از تبلیغ یا افزونه مرورگر را از بین می‌برد.",
      ar: "النتيجة المفيدة أداة أتمتة خاصة تلغي الحاجة إلى التنقل بين عدة مواقع تنزيل مزدحمة بالإعلانات أو إضافات المتصفح.",
      de: "Das nützliche Ergebnis ist ein privates Automatisierungstool, das den Wechsel zwischen mehreren werbelastigen Download-Seiten oder Browser-Erweiterungen überflüssig macht.",
    },
  },
  "ai-chat-rtl-fixer": {
    architecture: {
      en: "A .NET 8 Windows tray app detects known desktop AI chat apps, and for Electron targets connects over the Chrome DevTools Protocol on local loopback, injecting scoped CSS, the Vazirmatn font, and a runtime script that classifies each chat block and applies the correct text direction.",
      fa: "یک اپ tray ویندوز مبتنی بر .NET 8، اپ‌های شناخته‌شده‌ی دسکتاپ چت هوش مصنوعی را تشخیص می‌دهد و برای هدف‌های Electron از طریق Chrome DevTools Protocol روی loopback محلی وصل می‌شود؛ سپس CSS محدود، فونت Vazirmatn و یک اسکریپت زمان‌اجرا را تزریق می‌کند که هر بلوک چت را دسته‌بندی و جهت درست متن را اعمال می‌کند.",
      ar: "يكتشف تطبيق شريط مهام Windows مبني على .NET 8 تطبيقات دردشة الذكاء الاصطناعي المعروفة على سطح المكتب، ولأهداف Electron يتصل عبر بروتوكول Chrome DevTools على الاسترجاع المحلي، حاقناً CSS محدود النطاق وخط Vazirmatn وسكربت وقت تشغيل يصنّف كل كتلة دردشة ويطبّق اتجاه النص الصحيح.",
      de: "Eine .NET-8-Windows-Tray-App erkennt bekannte Desktop-KI-Chat-Apps und verbindet sich bei Electron-Zielen über das Chrome DevTools Protocol auf lokalem Loopback, wobei begrenztes CSS, die Vazirmatn-Schrift und ein Laufzeitskript eingefügt werden, das jeden Chat-Block klassifiziert und die richtige Textrichtung anwendet.",
    },
    decisions: {
      en: "The tool is deliberately scoped to the chat surface, keeps code and English left-to-right, stays runtime-only instead of patching app files, and only relaunches a target on a random free debug port after explicit user consent.",
      fa: "این ابزار عمداً به سطح چت محدود شده، کد و متن انگلیسی را چپ‌به‌راست نگه می‌دارد، به‌جای پچ‌کردن فایل‌های اپ فقط در زمان اجرا عمل می‌کند و اپ هدف را فقط بعد از رضایت صریح کاربر روی یک پورت دیباگ آزاد تصادفی دوباره اجرا می‌کند.",
      ar: "الأداة محصورة عمداً بسطح الدردشة، وتُبقي الكود والنص الإنجليزي من اليسار إلى اليمين، وتعمل وقت التشغيل فقط بدلاً من تعديل ملفات التطبيق، ولا تعيد تشغيل الهدف إلا على منفذ تصحيح حر عشوائي وبعد موافقة صريحة من المستخدم.",
      de: "Das Tool ist bewusst auf die Chat-Oberfläche begrenzt, hält Code und Englisch von links nach rechts, bleibt reines Laufzeit-Tool statt App-Dateien zu patchen, und startet ein Ziel nur nach ausdrücklicher Nutzerzustimmung auf einem zufälligen freien Debug-Port neu.",
    },
    limits: {
      en: "It is a pre-release framework build: detecting an app is not the same as a verified fix, no app profile is marked stable yet, and selectors may need updating after target apps change their UI.",
      fa: "این یک بیلد pre-release از فریم‌ورک است: تشخیص یک اپ به معنای اصلاح تأییدشده نیست، هیچ پروفایل اپی هنوز stable علامت‌گذاری نشده و ممکن است selectorها بعد از تغییر UI اپ‌های هدف نیاز به به‌روزرسانی داشته باشند.",
      ar: "هذا بناء ما قبل الإصدار للإطار: اكتشاف تطبيق ليس مثل إصلاح مُتحقَّق منه، ولا يوجد ملف تطبيق موسوم كمستقر بعد، وقد تحتاج المحدِّدات إلى تحديث بعد تغيير واجهة التطبيقات المستهدفة.",
      de: "Dies ist ein Vorab-Release-Build des Frameworks: Eine App zu erkennen ist nicht dasselbe wie ein verifizierter Fix, kein App-Profil ist bisher als stabil markiert, und Selektoren müssen möglicherweise aktualisiert werden, wenn Ziel-Apps ihre UI ändern.",
    },
    security: {
      en: "There is no telemetry, no account, and no external network calls — only local loopback to a debug-enabled target app. Chat text and clipboard content are never stored, and logs keep safe metadata only.",
      fa: "هیچ telemetry، حساب کاربری یا تماس شبکه‌ی خارجی وجود ندارد — فقط loopback محلی به یک اپ هدف با دیباگ فعال. متن چت و محتوای کلیپ‌بورد هرگز ذخیره نمی‌شوند و لاگ‌ها فقط متادیتای امن نگه می‌دارند.",
      ar: "لا توجد telemetry ولا حساب ولا اتصالات شبكة خارجية — فقط استرجاع محلي إلى تطبيق هدف مفعَّل فيه التصحيح. لا يُخزَّن نص الدردشة أو محتوى الحافظة أبداً، وتحتفظ السجلات ببيانات وصفية آمنة فقط.",
      de: "Es gibt keine Telemetrie, kein Konto und keine externen Netzwerkaufrufe — nur lokales Loopback zu einer debug-fähigen Ziel-App. Chat-Text und Zwischenablage-Inhalt werden nie gespeichert, und Logs enthalten nur sichere Metadaten.",
    },
    result: {
      en: "The practical outcome is readable right-to-left chat in desktop AI apps for Persian, Arabic, Hebrew, and Urdu users, with a clean revert whenever the tool is disabled or the app is restarted normally.",
      fa: "نتیجه عملی چت راست‌به‌چپ خوانا در اپ‌های دسکتاپ هوش مصنوعی برای کاربران فارسی، عربی، عبری و اردو است، همراه با بازگشت تمیز هر وقت ابزار غیرفعال شود یا اپ به‌طور عادی ری‌استارت شود.",
      ar: "النتيجة العملية دردشة مقروءة من اليمين إلى اليسار في تطبيقات الذكاء الاصطناعي على سطح المكتب لمستخدمي الفارسية والعربية والعبرية والأردية، مع تراجع نظيف كلما عُطِّلت الأداة أو أُعيد تشغيل التطبيق بشكل عادي.",
      de: "Das praktische Ergebnis ist lesbarer Rechts-nach-links-Chat in Desktop-KI-Apps für persische, arabische, hebräische und urdu Nutzer, mit sauberem Rückgängigmachen, sobald das Tool deaktiviert oder die App normal neu gestartet wird.",
    },
  },
  veyna: {
    architecture: {
      en: "VEYNA combines a Flutter desktop interface with shared Go profile contracts, a Windows Core built around Xray-core, and Wintun support for TUN mode. Profiles, routing choices, DNS policy, and connection state meet in one desktop workflow.",
      fa: "VEYNA یک رابط دسکتاپ Flutter را با قراردادهای مشترک پروفایل به زبان Go، یک Core ویندوزی ساخته‌شده بر پایه Xray-core و پشتیبانی Wintun برای حالت TUN ترکیب می‌کند. پروفایل‌ها، انتخاب مسیر، سیاست DNS و وضعیت اتصال در یک جریان کاری دسکتاپ به هم می‌رسند.",
      ar: "يجمع VEYNA بين واجهة سطح مكتب مبنية بـ Flutter وعقود ملفات تعريف مشتركة بلغة Go، ونواة Windows مبنية حول Xray-core، ودعم Wintun لوضع TUN. تلتقي الملفات وخيارات التوجيه وسياسة DNS وحالة الاتصال في مسار عمل واحد على سطح المكتب.",
      de: "VEYNA verbindet eine Flutter-Desktop-Oberfläche mit gemeinsamen Go-Profilverträgen, einem Windows-Core rund um Xray-core und Wintun-Unterstützung für den TUN-Modus. Profile, Routing-Entscheidungen, DNS-Richtlinie und Verbindungsstatus treffen in einem einzigen Desktop-Workflow zusammen.",
    },
    decisions: {
      en: "The client accepts standard links, subscriptions, and Xray JSON while keeping locked VEYNA imports opaque. Smart, System Proxy, and TUN modes are explicit choices, and English, Persian, dark, and light interfaces are built into the product.",
      fa: "این کلاینت لینک‌های استاندارد، اشتراک‌ها و Xray JSON را می‌پذیرد و در عین حال ورودی‌های قفل‌شده VEYNA را پنهان نگه می‌دارد. حالت‌های Smart، System Proxy و TUN انتخاب‌های صریح هستند و رابط انگلیسی، فارسی، تیره و روشن در محصول تعبیه شده‌اند.",
      ar: "يقبل العميل الروابط القياسية والاشتراكات وXray JSON مع إبقاء واردات VEYNA المقفلة مبهمة. أوضاع Smart وSystem Proxy وTUN خيارات صريحة، والواجهات الإنجليزية والفارسية والداكنة والفاتحة مدمجة في المنتج.",
      de: "Der Client akzeptiert Standard-Links, Abonnements und Xray JSON, während gesperrte VEYNA-Importe undurchsichtig bleiben. Smart-, System-Proxy- und TUN-Modi sind explizite Optionen, und englische, persische, dunkle und helle Oberflächen sind fest im Produkt verankert.",
    },
    limits: {
      en: "The current public release targets Windows 10 and 11 on x64. Android, iOS, macOS, and Linux are planned, and locked links created by the bundled local Gateway currently stay scoped to the same Windows installation.",
      fa: "نسخه عمومی فعلی، ویندوز ۱۰ و ۱۱ روی x64 را هدف قرار می‌دهد. Android، iOS، macOS و Linux برنامه‌ریزی شده‌اند و لینک‌های قفل‌شده‌ای که توسط Gateway محلی همراه ساخته می‌شوند، فعلاً به همان نصب ویندوز محدود می‌مانند.",
      ar: "يستهدف الإصدار العام الحالي Windows 10 وWindows 11 على x64. Android وiOS وmacOS وLinux مخطط لها، وتبقى الروابط المقفلة التي تنشئها بوابة Gateway المحلية المدمجة محصورة حالياً بنفس تثبيت Windows.",
      de: "Die aktuelle öffentliche Version zielt auf Windows 10 und 11 auf x64 ab. Android, iOS, macOS und Linux sind geplant, und gesperrte Links, die vom mitgelieferten lokalen Gateway erstellt werden, bleiben derzeit auf dieselbe Windows-Installation beschränkt.",
    },
    security: {
      en: "Locked profiles do not reveal or share their source configuration. The project documents sanitized diagnostics, checksum verification, clean proxy and route restoration, and a clear split between the public interface code and private security-sensitive components.",
      fa: "پروفایل‌های قفل‌شده هرگز پیکربندی منبع خود را نمایش یا اشتراک‌گذاری نمی‌کنند. این پروژه تشخیص‌های پاک‌سازی‌شده، تأیید checksum، بازگردانی تمیز پراکسی و مسیر و یک جداسازی روشن بین کد رابط عمومی و اجزای حساس امنیتی خصوصی را مستند می‌کند.",
      ar: "لا تكشف الملفات المقفلة إعداد المصدر أو تشاركه أبداً. يوثّق المشروع تشخيصات منظّفة، والتحقق من checksum، واستعادة نظيفة للوكيل والمسار، وفصلاً واضحاً بين كود الواجهة العامة والمكونات الحساسة أمنياً الخاصة.",
      de: "Gesperrte Profile zeigen oder teilen ihre Quellkonfiguration nie. Das Projekt dokumentiert bereinigte Diagnosen, Checksummenprüfung, saubere Proxy- und Routenwiederherstellung sowie eine klare Trennung zwischen öffentlichem Oberflächencode und privaten, sicherheitsrelevanten Komponenten.",
    },
    result: {
      en: "The result is a focused connectivity client that brings standard Xray workflows and protected profile distribution into one polished Windows application.",
      fa: "نتیجه یک کلاینت اتصال متمرکز است که جریان‌های کاری استاندارد Xray و توزیع پروفایل محافظت‌شده را در یک برنامه ویندوزی پرداخت‌شده گرد هم می‌آورد.",
      ar: "النتيجة عميل اتصال مركّز يجمع سير عمل Xray القياسي وتوزيع الملفات المحمية في تطبيق Windows واحد مصقول.",
      de: "Das Ergebnis ist ein fokussierter Connectivity-Client, der Standard-Xray-Workflows und die Verteilung geschützter Profile in einer ausgereiften Windows-Anwendung zusammenführt.",
    },
  },
};

function ProjectMetaPanel({ project, data, language }) {
  return (
    <RevealGroup className="project-meta-grid">
      <Reveal className="project-meta-card">
        <span>{localize(pageText.role, language)}</span>
        <p>{localize(pageText.roleBody, language)}</p>
      </Reveal>
      <Reveal className="project-meta-card">
        <span>{localize(pageText.objective, language)}</span>
        <p>{localize(data.hero, language)}</p>
      </Reveal>
      <Reveal className="project-meta-card wide">
        <span>{localize(pageText.stack, language)}</span>
        <p>{project.stack}</p>
      </Reveal>
    </RevealGroup>
  );
}

function ProjectDetailBlocks({ project, language }) {
  const details = projectDetails[project.slug];
  if (!details) return null;
  return (
    <section className="section project-detail-section">
      <Reveal className="section-header">
        <p className="section-label">{localize(notesKicker, language)}</p>
        <h2 className="section-title">{notesTitleFor(project.title, language)}</h2>
      </Reveal>
      <RevealGroup className="project-detail-grid">
        {Object.entries(details).map(([key, body], index) => (
          <Reveal className="project-detail-card" key={key} delay={index * 0.025}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{localize(detailLabels[key], language)}</h3>
            <p>{localize(body, language)}</p>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}

function ProjectNavigation({ project }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  return {
    previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  };
}

export default function ProjectPage({ project, language, t }) {
  const data = projectPages[project.slug];
  if (!data) return null;

  const { previous, next } = ProjectNavigation({ project });
  const relatedProjects = projects.filter((item) => item.slug !== project.slug);

  return (
    <div className={`project-page project-${project.accent}`}>
      <div className="page-container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t.nav[0]}</Link>
          <span aria-hidden="true">/</span>
          <Link to="/#projects">{t.nav[2]}</Link>
          <span aria-hidden="true">/</span>
          <span>{project.title}</span>
        </nav>

        <section className="project-hero">
          <motion.div className="project-hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="section-label"><Layers3 size={14} aria-hidden="true" />{localize(project.type, language)}</p>
            <h1><TextReveal>{localize(data.hero, language)}</TextReveal></h1>
            <p className="project-hero-lead">{localize(data.lead, language)}</p>
            <div className="project-hero-actions">
              {project.url ? (
                <>
                  <a href={project.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    <Github size={17} aria-hidden="true" />
                    {localize(pageText.source, language)}
                  </a>
                  {data.downloads?.[0] && (
                    <a href={data.downloads[0].url} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                      <ArrowUpRight size={17} aria-hidden="true" />
                      {localize(data.downloads[0].label, language)}
                    </a>
                  )}
                </>
              ) : (
                data.downloads?.[0] && (
                  <a href={data.downloads[0].url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight size={17} aria-hidden="true" />
                    {localize(data.downloads[0].label, language)}
                  </a>
                )
              )}
            </div>
          </motion.div>

          <Reveal className="project-hero-visual">
            <div className="visual-demo-card">
              <VisualBoundary label={`${project.title} visual demonstration`}>
                <Suspense fallback={<div className="visual-fallback" aria-hidden="true" />}>
                  <ProjectVisual slug={project.slug} language={language} />
                </Suspense>
              </VisualBoundary>
              <span className="visual-demo-label">{localize(pageText.visual, language)}</span>
            </div>
          </Reveal>
        </section>

        <ProjectMetaPanel project={project} data={data} language={language} />
        <ProjectDetailBlocks project={project} language={language} />

        {data.problem && data.solution && (
          <section className="section">
            <RevealGroup className="split-grid">
              <Reveal className="split-card">
                <span>{t.problemLabel}</span>
                <h2>{t.problemLabel}</h2>
                <p>{localize(data.problem, language)}</p>
              </Reveal>
              <Reveal className="split-card solution">
                <span>{t.solutionLabel}</span>
                <h2>{t.solutionLabel}</h2>
                <p>{localize(data.solution, language)}</p>
              </Reveal>
            </RevealGroup>
          </section>
        )}

        {data.features && (
          <section className="section">
            <Reveal className="section-header">
              <p className="section-label">{t.featuresLabel}</p>
              <h2 className="section-title">{t.featuresLabel}</h2>
            </Reveal>
            <RevealGroup className="feature-grid">
              {data.features.map((feature, index) => (
                <Reveal className="feature-card" key={index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{localize(feature.title, language)}</h3>
                  <p>{localize(feature.body, language)}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        {data.screenshots && (
          <section className="section">
            <Reveal className="section-header">
              <p className="section-label">{t.screenshotsLabel}</p>
              <h2 className="section-title">{t.screenshotsLabel}</h2>
            </Reveal>
            <RevealGroup className="screenshot-grid">
              {data.screenshots.map((shot, index) => (
                <Reveal key={index}>
                  <a className="screenshot-card" href={shot.src} target="_blank" rel="noopener noreferrer">
                    <img src={shot.src} alt={localize(shot.caption, language)} loading="lazy" />
                    <span>{localize(shot.caption, language)}</span>
                  </a>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        {data.editions && (
          <section className="section">
            <Reveal className="section-header">
              <p className="section-label">{t.editionsLabel}</p>
              <h2 className="section-title">{t.editionsLabel}</h2>
            </Reveal>
            <RevealGroup className="feature-grid">
              {data.editions.map((edition, index) => (
                <Reveal className="feature-card" key={index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{localize(edition.title, language)}</h3>
                  <p>{localize(edition.body, language)}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        {data.plans && (
          <section className="section">
            <Reveal className="section-header">
              <p className="section-label">{t.plansLabel}</p>
              <h2 className="section-title">{t.plansLabel}</h2>
            </Reveal>
            <RevealGroup className="plan-grid">
              {data.plans.map((plan, index) => (
                <Reveal className={`plan-card ${plan.highlight ? "is-featured" : ""}`} key={index}>
                  <div className="plan-head">
                    <h3>{localize(plan.name, language)}</h3>
                    {plan.badge && <span className="plan-badge">{localize(plan.badge, language)}</span>}
                  </div>
                  <p className="plan-price">{localize(plan.price, language)}</p>
                  {plan.note && <p className="plan-note">{localize(plan.note, language)}</p>}
                  <ul className="plan-features">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <Check size={15} aria-hidden="true" />
                        <span>{localize(feature, language)}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.cta && (
                    <a
                      href={plan.cta.url}
                      className={`btn ${plan.highlight ? "btn-primary" : "btn-ghost"} plan-cta`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowUpRight size={16} aria-hidden="true" />
                      {localize(plan.cta.label, language)}
                    </a>
                  )}
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        {data.steps && (
          <section className="section">
            <Reveal className="section-header">
              <p className="section-label">{t.workflowLabel}</p>
              <h2 className="section-title">{t.workflowLabel}</h2>
            </Reveal>
            <div className="timeline project-timeline">
              <motion.div
                className="timeline-line"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {data.steps.map((step, index) => (
                <motion.article
                  className="timeline-item"
                  key={index}
                  initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 220, damping: 22, delay: index * 0.04 }}
                >
                  <span className="timeline-step">{String(index + 1).padStart(2, "0")}</span>
                  <div className="timeline-content">
                    <h3>{localize(step.title, language)}</h3>
                    <p>{localize(step.body, language)}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {data.downloads && (
          <section className="section download-section">
            <Reveal className="section-header compact">
              <p className="section-label">{t.downloadsLabel}</p>
              <h2 className="section-title">{t.downloadsLabel}</h2>
            </Reveal>
            <RevealGroup className="download-row">
              {data.downloads.map((download, index) => (
                <Reveal key={index}>
                  <motion.a
                    href={download.url}
                    className={`btn ${download.primary ? "btn-primary" : "btn-ghost"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring}
                  >
                    {download.primary ? <Download size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
                    {localize(download.label, language)}
                  </motion.a>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        <section className="section project-switcher-section">
          <Reveal className="project-switcher">
            {previous ? (
              <Link to={previous.pageUrl} className="project-switch-link previous">
                <ChevronLeft size={18} aria-hidden="true" />
                <span>{localize(pageText.previous, language)}</span>
                <strong>{previous.title}</strong>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={next.pageUrl} className="project-switch-link next">
                <span>{localize(pageText.next, language)}</span>
                <strong>{next.title}</strong>
                <ChevronRight size={18} aria-hidden="true" />
              </Link>
            ) : <span />}
          </Reveal>
        </section>

        <section className="section related-section">
          <Reveal className="section-header">
            <p className="section-label">{localize(pageText.other, language)}</p>
            <h2 className="section-title">{localize(pageText.other, language)}</h2>
          </Reveal>
          <RevealGroup className="related-grid">
            {relatedProjects.map((item) => (
              <Reveal key={item.slug}>
                <Link to={item.pageUrl} className="related-card">
                  <strong>{item.title}</strong>
                  <small>{localize(item.type, language)}</small>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </RevealGroup>
        </section>
      </div>
    </div>
  );
}
