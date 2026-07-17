import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { localize } from "../utils/localize";

const L = (value, language) => localize(value, language);

const visualCopy = {
  veynaCaption: {
    en: "Protected profile and connection-mode system",
    fa: "سیستم پروفایل محافظت‌شده و حالت اتصال",
    ar: "نظام الملف المحمي ووضع الاتصال",
    de: "System für geschützte Profile und Verbindungsmodi",
  },
  veynaStatus: {
    en: "profile protected, route selected, connection ready",
    fa: "پروفایل محافظت‌شده، مسیر انتخاب‌شده، اتصال آماده",
    ar: "الملف محمي، المسار محدد، الاتصال جاهز",
    de: "Profil geschützt, Route gewählt, Verbindung bereit",
  },
  veynaProtected: { en: "Protected profile", fa: "پروفایل محافظت‌شده", ar: "ملف محمي", de: "Geschütztes Profil" },
  veynaSmart: { en: "Smart", fa: "هوشمند", ar: "ذكي", de: "Smart" },
  veynaSystem: { en: "System Proxy", fa: "پراکسی سیستم", ar: "وكيل النظام", de: "Systemproxy" },
  veynaTun: { en: "TUN", fa: "TUN", ar: "TUN", de: "TUN" },
  keyfixCaption: {
    en: "Functional illustration based on documented KeyFix behavior",
    fa: "نمایش کارکردی بر پایه رفتار مستند KeyFix",
    ar: "توضيح وظيفي مبني على سلوك KeyFix الموثق",
    de: "Funktionale Darstellung des dokumentierten KeyFix-Verhaltens",
  },
  keyfixStatus: {
    en: "local buffer, dictionary score, corrective rewrite",
    fa: "بافر محلی، امتیاز دیکشنری، بازنویسی اصلاحی",
    ar: "مخزن محلي، تقييم القاموس، إعادة كتابة تصحيحية",
    de: "lokaler Puffer, Wörterbuch-Score, korrigierende Umschrift",
  },
  keyfixBuffer: { en: "KeyFix buffer", fa: "بافر KeyFix", ar: "مخزن KeyFix", de: "KeyFix-Puffer" },
  keyfixReplace: { en: "replace", fa: "جایگزینی", ar: "استبدال", de: "ersetzen" },
  netdoctorCaption: {
    en: "Functional illustration of the diagnostic and repair workflow",
    fa: "نمایش کارکردی روند تشخیص و ترمیم",
    ar: "توضيح وظيفي لسير عمل التشخيص والإصلاح",
    de: "Funktionale Darstellung des Diagnose- und Reparaturablaufs",
  },
  ndWindowTitle: {
    en: "NetDoctor diagnostic session",
    fa: "نشست تشخیص NetDoctor",
    ar: "جلسة تشخيص NetDoctor",
    de: "NetDoctor-Diagnosesitzung",
  },
  ndNavDashboard: { en: "Dashboard", fa: "داشبورد", ar: "لوحة التحكم", de: "Dashboard" },
  ndNavDns: { en: "DNS Lab", fa: "آزمایشگاه DNS", ar: "مختبر DNS", de: "DNS-Labor" },
  ndNavAdapters: { en: "Adapters", fa: "آداپتورها", ar: "المحولات", de: "Adapter" },
  ndNavFixes: { en: "Safe Fixes", fa: "ترمیم‌های امن", ar: "إصلاحات آمنة", de: "Sichere Reparaturen" },
  ndLiveLabel: { en: "Live diagnosis", fa: "تشخیص زنده", ar: "تشخيص مباشر", de: "Live-Diagnose" },
  ndHeadline: {
    en: "International access is degraded",
    fa: "دسترسی بین‌المللی مختل شده",
    ar: "الوصول الدولي متدهور",
    de: "Internationaler Zugriff ist beeinträchtigt",
  },
  ndRunning: { en: "running", fa: "در حال اجرا", ar: "قيد التشغيل", de: "läuft" },
  ndGateway: { en: "Local gateway", fa: "گیت‌وی محلی", ar: "البوابة المحلية", de: "Lokales Gateway" },
  ndGatewayValue: { en: "Healthy", fa: "سالم", ar: "سليم", de: "Fehlerfrei" },
  ndDnsQuality: { en: "DNS quality", fa: "کیفیت DNS", ar: "جودة DNS", de: "DNS-Qualität" },
  ndDnsValue: { en: "Unstable", fa: "ناپایدار", ar: "غير مستقر", de: "Instabil" },
  ndPacketLoss: { en: "Packet loss", fa: "افت بسته", ar: "فقدان الحزم", de: "Paketverlust" },
  ndRepairTitle: { en: "Recommended repair", fa: "ترمیم پیشنهادی", ar: "الإصلاح الموصى به", de: "Empfohlene Reparatur" },
  ndRepairBody: {
    en: "Switch DNS to a tested preset, keep the old values, and offer one-click undo after verification.",
    fa: "DNS را به یک پیش‌تنظیم آزمایش‌شده تغییر بده، مقادیر قبلی را نگه دار و بعد از تأیید یک بازگشت یک‌کلیکی پیشنهاد بده.",
    ar: "بدّل DNS إلى إعداد مسبق مُختبر، واحتفظ بالقيم القديمة، وقدّم تراجعاً بضغطة واحدة بعد التحقق.",
    de: "DNS auf eine getestete Voreinstellung umstellen, die alten Werte behalten und nach der Prüfung ein Undo per Klick anbieten.",
  },
  ndIssueLicense: { en: "Issue license", fa: "صدور لایسنس", ar: "إصدار الترخيص", de: "Lizenz ausstellen" },
  ndViewUi: { en: "View UI", fa: "مشاهده رابط", ar: "عرض الواجهة", de: "UI ansehen" },
  ndTraceLabel: { en: "Trace", fa: "ردیابی", ar: "تتبع", de: "Trace" },
  ndTraceTitle: { en: "What passed", fa: "چه چیزی سالم بود", ar: "ما الذي نجح", de: "Was bestanden hat" },
  ndAdapterOnline: { en: "Adapter online", fa: "آداپتور آنلاین", ar: "المحول متصل", de: "Adapter online" },
  ndPublicDns: { en: "Public DNS", fa: "DNS عمومی", ar: "DNS العام", de: "Öffentliches DNS" },
  ndProxyStale: { en: "Proxy stale", fa: "پراکسی قدیمی", ar: "الوكيل قديم", de: "Proxy veraltet" },
  ndSlow: { en: "slow", fa: "کند", ar: "بطيء", de: "langsam" },
  ndFix: { en: "fix", fa: "ترمیم", ar: "إصلاح", de: "reparieren" },
  infraCaption: {
    en: "Functional illustration of the hybrid web and mail topology",
    fa: "نمایش کارکردی توپولوژی ترکیبی وب و ایمیل",
    ar: "توضيح وظيفي لطوبولوجيا الويب والبريد الهجينة",
    de: "Funktionale Darstellung der hybriden Web- und Mail-Topologie",
  },
  infraActiveFlow: { en: "Active flow", fa: "جریان فعال", ar: "التدفق النشط", de: "Aktiver Fluss" },
  infraHint: {
    en: "Select a flow to trace its path across the topology.",
    fa: "یک جریان را انتخاب کنید تا مسیر آن در توپولوژی دنبال شود.",
    ar: "اختر تدفقًا لتتبع مساره عبر الطوبولوجيا.",
    de: "Wähle einen Fluss, um seinen Pfad durch die Topologie zu verfolgen.",
  },
  infraAuto: { en: "auto", fa: "خودکار", ar: "تلقائي", de: "auto" },
  infraLegendTitle: { en: "Path key", fa: "راهنمای مسیر", ar: "مفتاح المسارات", de: "Pfad-Legende" },
  botCaption: {
    en: "Functional illustration of the Telegram download workflow",
    fa: "نمایش کارکردی روند دانلود در تلگرام",
    ar: "توضيح وظيفي لسير عمل التنزيل عبر Telegram",
    de: "Funktionale Darstellung des Telegram-Download-Ablaufs",
  },
  botTitle: { en: "AT8 Downloader", fa: "دانلودر AT8", ar: "AT8 Downloader", de: "AT8 Downloader" },
  airtlCaption: {
    en: "Functional illustration of the chat-surface RTL fix",
    fa: "نمایش کارکردی اصلاح راست‌به‌چپ سطح چت",
    ar: "توضيح وظيفي لإصلاح RTL على سطح الدردشة",
    de: "Funktionale Darstellung der RTL-Korrektur auf der Chat-Oberfläche",
  },
  airtlWindow: { en: "AI chat app", fa: "اپ چت هوش مصنوعی", ar: "تطبيق دردشة الذكاء الاصطناعي", de: "KI-Chat-App" },
  airtlOff: { en: "RTL fix off", fa: "اصلاح خاموش", ar: "الإصلاح متوقف", de: "RTL-Fix aus" },
  airtlOn: { en: "RTL fix on", fa: "اصلاح روشن", ar: "الإصلاح مفعّل", de: "RTL-Fix an" },
  airtlCodeStays: { en: "code stays LTR", fa: "کد چپ‌به‌راست می‌ماند", ar: "الكود يبقى LTR", de: "Code bleibt LTR" },
  airtlStatus: {
    en: "chat surface only · code stays LTR · runtime-only",
    fa: "فقط سطح چت · کد چپ‌به‌راست · فقط زمان اجرا",
    ar: "سطح الدردشة فقط · الكود LTR · وقت التشغيل فقط",
    de: "nur Chat-Oberfläche · Code LTR · nur Laufzeit",
  },
  airtlRaw: { en: "before", fa: "قبل", ar: "قبل", de: "vorher" },
  airtlFixed: { en: "after", fa: "بعد", ar: "بعد", de: "nachher" },
  airtlUser: {
    en: "Please show this answer right-to-left",
    fa: "لطفاً این پاسخ را راست‌به‌چپ نشان بده",
    ar: "من فضلك اعرض هذه الإجابة من اليمين إلى اليسار",
    de: "Bitte zeige diese Antwort von rechts nach links",
  },
  pdfCaption: {
    en: "Functional illustration of rule-based batch PDF editing",
    fa: "نمایش کارکردی ویرایش دسته‌ای PDF بر پایه قانون",
    ar: "توضيح وظيفي لتحرير PDF الدفعي القائم على القواعد",
    de: "Funktionale Darstellung der regelbasierten Stapel-PDF-Bearbeitung",
  },
  pdfWindow: { en: "PDF Sanitizer", fa: "PDF Sanitizer", ar: "PDF Sanitizer", de: "PDF Sanitizer" },
  pdfBatch: { en: "batch", fa: "دسته‌ای", ar: "دفعة", de: "Stapel" },
  pdfRules: { en: "Rule set", fa: "مجموعه قانون", ar: "مجموعة القواعد", de: "Regelsatz" },
  pdfRemove: { en: "remove", fa: "حذف", ar: "حذف", de: "entfernen" },
  pdfReplace: { en: "replace", fa: "جایگزینی", ar: "استبدال", de: "ersetzen" },
  pdfInsert: { en: "insert", fa: "افزودن", ar: "إضافة", de: "einfügen" },
  pdfPages: { en: "pages", fa: "صفحه", ar: "صفحة", de: "Seiten" },
  pdfApplied: { en: "rules applied to every page", fa: "قانون‌ها روی همه صفحات اعمال شد", ar: "طُبِّقت القواعد على كل صفحة", de: "Regeln auf jede Seite angewendet" },
  pdfStatus: {
    en: "rule-based · local processing · large documents",
    fa: "بر پایه قانون · پردازش محلی · اسناد بزرگ",
    ar: "قائم على القواعد · معالجة محلية · مستندات كبيرة",
    de: "regelbasiert · lokale Verarbeitung · große Dokumente",
  },
};

const keyfixExamples = [
  { wrong: "sghl", right: "سلام", layout: "EN → FA", keys: ["S", "G", "H", "L"] },
  { wrong: "l,sd", right: "mail", layout: "FA → EN", keys: ["M", "A", "I", "L"] },
  { wrong: "ىخف", right: "net", layout: "AR → EN", keys: ["N", "E", "T"] },
];

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

function useLoop(max, duration = 2400, paused = false) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || paused) return undefined;
    const id = window.setInterval(() => setIndex((value) => (value + 1) % max), duration);
    return () => window.clearInterval(id);
  }, [duration, max, reduce, paused]);

  return reduce ? 0 : index;
}

function KeyFixVisual({ language }) {
  const active = useLoop(keyfixExamples.length, 2600);
  const example = keyfixExamples[active];

  return (
    <div className="project-visual-scene keyfix-demo" aria-label="KeyFix functional illustration of layout correction">
      <div className="demo-caption">{L(visualCopy.keyfixCaption, language)}</div>
      <div className="keyfix-stage">
        <div className="keyfix-editor">
          <div className="window-bar">
            <span />
            <strong>{L(visualCopy.keyfixBuffer, language)}</strong>
            <em>{example.layout}</em>
          </div>
          <div className="typed-line" dir="ltr">
            <motion.span
              key={`wrong-${active}`}
              className="wrong-token"
              initial={{ width: "0ch" }}
              animate={{ width: `${example.wrong.length}ch` }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {example.wrong}
            </motion.span>
            <motion.span
              className="cursor"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          </div>
          <motion.div
            key={`fix-${active}`}
            className="correction-line"
            initial={{ opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
            transition={{ delay: 0.72, duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{L(visualCopy.keyfixReplace, language)}</span>
            <strong>{example.right}</strong>
          </motion.div>
        </div>
        <div className="keyboard-grid" aria-hidden="true">
          {keyboardRows.map((row) => (
            <div className="keyboard-row" key={row.join("")}>
              {row.map((key) => (
                <motion.span
                  className={example.keys.includes(key) ? "is-lit" : ""}
                  key={key}
                  animate={example.keys.includes(key) ? { y: [0, 4, 0] } : undefined}
                  transition={{ duration: 0.42, repeat: Infinity, repeatDelay: 1.4 }}
                >
                  {key}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="visual-status-line">
        <span />
        {L(visualCopy.keyfixStatus, language)}
      </div>
    </div>
  );
}

const ndNavItems = [
  { key: "ndNavDashboard", active: true },
  { key: "ndNavDns", active: false },
  { key: "ndNavAdapters", active: false },
  { key: "ndNavFixes", active: false },
];

const ndMetrics = [
  { labelKey: "ndGateway", valueKey: "ndGatewayValue", value: 96 },
  { labelKey: "ndDnsQuality", valueKey: "ndDnsValue", value: 52 },
  { labelKey: "ndPacketLoss", value: "2.8%", meter: 31 },
];

const ndTraceItems = [
  { labelKey: "ndAdapterOnline", value: "12ms", state: "ok" },
  { labelKey: "ndPublicDns", valueKey: "ndSlow", state: "warn" },
  { labelKey: "ndProxyStale", valueKey: "ndFix", state: "fail" },
];

function NetDoctorVisual({ language }) {
  return (
    <div className="project-visual-scene netdoctor-demo" aria-label="NetDoctor diagnostic workflow illustration">
      <div className="demo-caption">{L(visualCopy.netdoctorCaption, language)}</div>
      <div className="nd-dashboard">
        <div className="nd-dashboard-bar">
          <span className="nd-dot nd-dot-red" />
          <span className="nd-dot nd-dot-amber" />
          <span className="nd-dot nd-dot-green" />
          <em>{L(visualCopy.ndWindowTitle, language)}</em>
        </div>
        <div className="nd-dashboard-body">
          <aside className="nd-dashboard-nav" aria-hidden="true">
            {ndNavItems.map((item) => (
              <span key={item.key} className={item.active ? "is-active" : ""}>
                {L(visualCopy[item.key], language)}
              </span>
            ))}
          </aside>
          <div className="nd-dashboard-main">
            <div className="nd-dashboard-head">
              <div>
                <span className="nd-live-label">{L(visualCopy.ndLiveLabel, language)}</span>
                <h3>{L(visualCopy.ndHeadline, language)}</h3>
              </div>
              <span className="nd-running-pill">
                <i />
                {L(visualCopy.ndRunning, language)}
              </span>
            </div>

            <div className="nd-metric-row">
              {ndMetrics.map((metric) => (
                <div className="nd-metric" key={metric.labelKey}>
                  <span>{L(visualCopy[metric.labelKey], language)}</span>
                  <strong>{metric.valueKey ? L(visualCopy[metric.valueKey], language) : metric.value}</strong>
                  <i className="nd-meter">
                    <motion.i
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.meter ?? metric.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </i>
                </div>
              ))}
            </div>

            <div className="nd-panel-row">
              <div className="nd-repair-card">
                <h4>{L(visualCopy.ndRepairTitle, language)}</h4>
                <p>{L(visualCopy.ndRepairBody, language)}</p>
                <div className="nd-repair-actions">
                  <span className="nd-chip nd-chip-primary">{L(visualCopy.ndIssueLicense, language)}</span>
                  <span className="nd-chip">{L(visualCopy.ndViewUi, language)}</span>
                </div>
              </div>
              <div className="nd-trace-card">
                <span className="nd-trace-label">{L(visualCopy.ndTraceLabel, language)}</span>
                <h4>{L(visualCopy.ndTraceTitle, language)}</h4>
                <ul>
                  {ndTraceItems.map((item) => (
                    <li key={item.labelKey}>
                      <i className={`nd-trace-dot nd-trace-${item.state}`} />
                      <span>{L(visualCopy[item.labelKey], language)}</span>
                      <b>{item.valueKey ? L(visualCopy[item.valueKey], language) : item.value}</b>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const infraNodes = [
  {
    id: "users",
    label: { en: "Users", fa: "کاربران", ar: "المستخدمون", de: "Benutzer" },
    meta: { en: "requests", fa: "درخواست‌ها", ar: "طلبات", de: "Anfragen" },
    status: { en: "active", fa: "فعال", ar: "نشط", de: "aktiv" },
    x: 72, y: 126, w: 96, zone: "local",
  },
  {
    id: "site",
    label: { en: "Local Site", fa: "سایت محلی", ar: "الموقع المحلي", de: "Lokal" },
    meta: { en: "LAN services", fa: "سرویس LAN", ar: "خدمات LAN", de: "LAN-Dienste" },
    status: { en: "private", fa: "خصوصی", ar: "خاص", de: "privat" },
    x: 72, y: 248, w: 116, zone: "local",
  },
  {
    id: "mikrotik",
    label: { en: "MikroTik", fa: "MikroTik", ar: "MikroTik", de: "MikroTik" },
    meta: { en: "firewall / NAT", fa: "فایروال / NAT", ar: "جدار / NAT", de: "Firewall / NAT" },
    status: { en: "edge", fa: "لبه", ar: "الحافة", de: "Edge" },
    x: 220, y: 188, w: 120, zone: "local",
  },
  {
    id: "wireguard",
    label: { en: "WireGuard", fa: "WireGuard", ar: "WireGuard", de: "WireGuard" },
    meta: { en: "encrypted", fa: "رمزگذاری‌شده", ar: "مشفّر", de: "verschlüsselt" },
    status: { en: "tunnel", fa: "تونل", ar: "نفق", de: "Tunnel" },
    x: 356, y: 188, w: 124, zone: "bridge",
  },
  {
    id: "vps",
    label: { en: "VPS", fa: "VPS", ar: "VPS", de: "VPS" },
    meta: { en: "public IP", fa: "IP عمومی", ar: "IP عام", de: "öffentl. IP" },
    status: { en: "online", fa: "آنلاین", ar: "متصل", de: "online" },
    x: 494, y: 188, w: 94, zone: "public",
  },
  {
    id: "proxy",
    label: { en: "HAProxy / Caddy", fa: "HAProxy / Caddy", ar: "HAProxy / Caddy", de: "HAProxy / Caddy" },
    meta: { en: "TCP + TLS", fa: "TCP + TLS", ar: "TCP + TLS", de: "TCP + TLS" },
    status: { en: "routing", fa: "مسیریابی", ar: "توجيه", de: "Routing" },
    x: 636, y: 188, w: 140, zone: "public",
  },
  {
    id: "web",
    label: { en: "Web", fa: "وب", ar: "الويب", de: "Web" },
    meta: { en: "HTTPS app", fa: "اپ HTTPS", ar: "تطبيق HTTPS", de: "HTTPS-App" },
    status: "HTTP 200",
    x: 734, y: 100, w: 88, zone: "public",
  },
  {
    id: "mail",
    label: { en: "Mail", fa: "ایمیل", ar: "البريد", de: "Mail" },
    meta: { en: "SMTP / IMAP", fa: "SMTP / IMAP", ar: "SMTP / IMAP", de: "SMTP / IMAP" },
    status: { en: "queue ok", fa: "صف سالم", ar: "الطابور جيد", de: "Queue ok" },
    x: 734, y: 276, w: 96, zone: "public",
  },
  {
    id: "dns",
    label: { en: "DNS / TLS", fa: "DNS / TLS", ar: "DNS / TLS", de: "DNS / TLS" },
    meta: { en: "MX · SPF · DKIM", fa: "MX · SPF · DKIM", ar: "MX · SPF · DKIM", de: "MX · SPF · DKIM" },
    status: { en: "valid", fa: "معتبر", ar: "صالح", de: "gültig" },
    x: 494, y: 70, w: 120, zone: "public",
  },
  {
    id: "backup",
    label: { en: "Backup", fa: "بکاپ", ar: "نسخ احتياطي", de: "Backup" },
    meta: { en: "encrypted", fa: "رمزگذاری‌شده", ar: "مشفّر", de: "verschlüsselt" },
    status: { en: "verified", fa: "تأییدشده", ar: "مُتحقَّق", de: "verifiziert" },
    x: 494, y: 320, w: 112, zone: "public",
  },
];

const infraPathMap = {
  usersToDns: { id: "usersToDns", d: "M120 126 C232 56 362 54 438 70", kind: "dns" },
  dnsToVps: { id: "dnsToVps", d: "M548 70 C572 98 562 142 540 188", kind: "dns" },
  usersToMikrotik: { id: "usersToMikrotik", d: "M120 126 C152 142 182 164 220 188", kind: "web" },
  siteToMikrotik: { id: "siteToMikrotik", d: "M130 248 C156 226 184 204 220 188", kind: "local" },
  mikrotikToWireguard: { id: "mikrotikToWireguard", d: "M280 188 C306 188 330 188 356 188", kind: "tunnel" },
  wireguardToVps: { id: "wireguardToVps", d: "M418 188 C444 188 468 188 494 188", kind: "tunnel" },
  vpsToProxy: { id: "vpsToProxy", d: "M541 188 C572 188 600 188 636 188", kind: "web" },
  proxyToWeb: { id: "proxyToWeb", d: "M700 188 C720 160 728 132 734 100", kind: "web" },
  proxyToMail: { id: "proxyToMail", d: "M700 188 C720 216 728 248 734 276", kind: "mail" },
  mailToDns: { id: "mailToDns", d: "M734 276 C662 210 608 112 548 70", kind: "dns" },
  webToBackup: { id: "webToBackup", d: "M734 100 C684 214 612 294 548 320", kind: "backup" },
  mailToBackup: { id: "mailToBackup", d: "M734 276 C666 306 604 320 548 320", kind: "backup" },
};

const infraFlows = [
  {
    id: "web",
    label: { en: "Web", fa: "وب", ar: "الويب", de: "Web" },
    detail: {
      en: "Users resolve DNS, reach the VPS, and hit the web app through HAProxy and Caddy.",
      fa: "کاربران DNS را حل می‌کنند، به VPS می‌رسند و از طریق HAProxy و Caddy به اپ وب می‌رسند.",
      ar: "يحل المستخدمون DNS، يصلون إلى VPS، ويبلغون تطبيق الويب عبر HAProxy و Caddy.",
      de: "Nutzer lösen DNS auf, erreichen den VPS und treffen die Web-App über HAProxy und Caddy.",
    },
    paths: ["usersToDns", "dnsToVps", "vpsToProxy", "proxyToWeb"],
    nodes: ["users", "dns", "vps", "proxy", "web"],
  },
  {
    id: "mail",
    label: { en: "Mail", fa: "ایمیل", ar: "البريد", de: "Mail" },
    detail: {
      en: "Mail relies on public DNS records, TLS, and the proxy path into SMTP and IMAP services.",
      fa: "ایمیل به رکوردهای عمومی DNS، TLS و مسیر پراکسی به سرویس‌های SMTP و IMAP متکی است.",
      ar: "يعتمد البريد على سجلات DNS العامة و TLS ومسار الوكيل إلى خدمات SMTP و IMAP.",
      de: "Mail nutzt öffentliche DNS-Einträge, TLS und den Proxy-Pfad zu SMTP- und IMAP-Diensten.",
    },
    paths: ["usersToDns", "dnsToVps", "vpsToProxy", "proxyToMail", "mailToDns"],
    nodes: ["users", "dns", "vps", "proxy", "mail"],
  },
  {
    id: "tunnel",
    label: { en: "Tunnel", fa: "تونل", ar: "النفق", de: "Tunnel" },
    detail: {
      en: "Local services leave through MikroTik, cross the WireGuard tunnel, and terminate at the VPS.",
      fa: "سرویس‌های محلی از طریق MikroTik خارج می‌شوند، از تونل WireGuard عبور می‌کنند و در VPS پایان می‌یابند.",
      ar: "تخرج الخدمات المحلية عبر MikroTik، تعبر نفق WireGuard، وتنتهي عند VPS.",
      de: "Lokale Dienste verlassen über MikroTik, durchqueren den WireGuard-Tunnel und enden am VPS.",
    },
    paths: ["siteToMikrotik", "mikrotikToWireguard", "wireguardToVps"],
    nodes: ["site", "mikrotik", "wireguard", "vps"],
  },
  {
    id: "backup",
    label: { en: "Backup", fa: "بکاپ", ar: "النسخ", de: "Backup" },
    detail: {
      en: "Web and mail snapshots move to an encrypted backup target after the public split.",
      fa: "اسنپ‌شات‌های وب و ایمیل پس از تفکیک عمومی به مقصد بکاپ رمزگذاری‌شده منتقل می‌شوند.",
      ar: "تنتقل لقطات الويب والبريد إلى هدف نسخ احتياطي مشفر بعد التقسيم العام.",
      de: "Web- und Mail-Snapshots wandern nach dem öffentlichen Split zu einem verschlüsselten Backup-Ziel.",
    },
    paths: ["proxyToWeb", "webToBackup", "proxyToMail", "mailToBackup"],
    nodes: ["proxy", "web", "mail", "backup"],
  },
];

const infraZones = {
  local: {
    title: { en: "Local environment", fa: "محیط محلی", ar: "البيئة المحلية", de: "Lokale Umgebung" },
    sub: {
      en: "users · LAN · router · tunnel origin",
      fa: "کاربران · LAN · روتر · مبدأ تونل",
      ar: "مستخدمون · LAN · موجّه · مصدر النفق",
      de: "Nutzer · LAN · Router · Tunnel-Ursprung",
    },
  },
  public: {
    title: { en: "Public environment", fa: "محیط عمومی", ar: "البيئة العامة", de: "Öffentliche Umgebung" },
    sub: {
      en: "DNS · VPS · proxy · web · mail · backup",
      fa: "DNS · VPS · پراکسی · وب · ایمیل · بکاپ",
      ar: "DNS · VPS · وكيل · ويب · بريد · نسخ",
      de: "DNS · VPS · Proxy · Web · Mail · Backup",
    },
  },
};

const infraLegend = [
  { kind: "web", label: { en: "Web", fa: "وب", ar: "ويب", de: "Web" } },
  { kind: "mail", label: { en: "Mail", fa: "ایمیل", ar: "بريد", de: "Mail" } },
  { kind: "tunnel", label: { en: "Tunnel", fa: "تونل", ar: "نفق", de: "Tunnel" } },
  { kind: "dns", label: { en: "DNS", fa: "DNS", ar: "DNS", de: "DNS" } },
  { kind: "backup", label: { en: "Backup", fa: "بکاپ", ar: "نسخ", de: "Backup" } },
];

function InfrastructureVisual({ language }) {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const auto = useLoop(infraFlows.length, 3200, selectedFlow !== null);
  const activeFlow = infraFlows.find((flow) => flow.id === selectedFlow) || infraFlows[auto];
  const activePaths = useMemo(() => new Set(activeFlow.paths), [activeFlow]);
  const activeNodes = useMemo(() => new Set(activeFlow.nodes), [activeFlow]);
  const visiblePaths = Object.values(infraPathMap);

  return (
    <div
      className="project-visual-scene infrastructure-demo"
      data-visual="hybrid-infrastructure"
      aria-label="Hybrid web and mail infrastructure topology illustration"
    >
      <div className="demo-caption">{L(visualCopy.infraCaption, language)}</div>

      <div className="infra-flow-controls" role="group" aria-label="Infrastructure flow selector">
        {infraFlows.map((flow) => (
          <button
            type="button"
            key={flow.id}
            className={activeFlow.id === flow.id ? "is-active" : ""}
            aria-pressed={activeFlow.id === flow.id}
            onClick={() => setSelectedFlow((current) => (current === flow.id ? null : flow.id))}
          >
            <span className={`flow-dot flow-dot-${flow.id}`} aria-hidden="true" />
            <strong>{L(flow.label, language)}</strong>
          </button>
        ))}
      </div>

      <svg viewBox="0 0 800 388" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="infra-zone-local" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.025" />
          </linearGradient>
          <linearGradient id="infra-zone-public" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.03" />
          </linearGradient>
          <filter id="infra-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="infra-zone zone-local">
          <rect x="28" y="34" width="396" height="322" rx="22" />
          <text className="zone-title" x="50" y="62">{L(infraZones.local.title, language)}</text>
          <text className="zone-sub" x="50" y="342">{L(infraZones.local.sub, language)}</text>
        </g>
        <g className="infra-zone zone-cloud">
          <rect x="438" y="34" width="338" height="322" rx="22" />
          <text className="zone-title" x="460" y="62">{L(infraZones.public.title, language)}</text>
          <text className="zone-sub" x="460" y="342">{L(infraZones.public.sub, language)}</text>
        </g>

        <path className="infra-tunnel-body" d="M280 188 C306 188 330 188 356 188 C390 188 440 188 494 188" />

        {visiblePaths.map((path) => (
          <motion.path
            className={`infra-path infra-${path.kind} ${activePaths.has(path.id) ? "is-active" : ""}`}
            d={path.d}
            key={path.id}
            initial={false}
            animate={{ pathLength: activePaths.has(path.id) ? 1 : 0.72, opacity: activePaths.has(path.id) ? 0.98 : 0.08 }}
            transition={{ duration: 0.55 }}
          />
        ))}

        {activeFlow.paths.map((pathId, index) => {
          const path = infraPathMap[pathId];
          return (
            <motion.circle
              key={`${activeFlow.id}-${pathId}`}
              r={path.kind === "tunnel" ? "5.5" : "4.6"}
              className={`packet packet-${path.kind}`}
            >
              <animateMotion
                dur={path.kind === "tunnel" ? "2.9s" : "3.7s"}
                repeatCount="indefinite"
                begin={`${index * 0.22}s`}
                path={path.d}
              />
            </motion.circle>
          );
        })}

        {infraNodes.map((node) => {
          const isActive = activeNodes.has(node.id);
          const startX = node.x - node.w / 2;
          return (
            <g className={`infra-node node-${node.zone} ${isActive ? "is-active" : ""}`} key={node.id}>
              <rect x={startX} y={node.y - 29} width={node.w} height="58" rx="10" />
              <circle cx={startX + 14} cy={node.y - 14} r="3.4" />
              <text className="node-label" x={startX + 26} y={node.y - 10}>{L(node.label, language)}</text>
              <text className="node-meta" x={startX + 14} y={node.y + 4}>{L(node.meta, language)}</text>
              <text className="node-status" x={startX + 14} y={node.y + 18}>{L(node.status, language)}</text>
            </g>
          );
        })}
      </svg>

      <div className="infra-mobile-flow" aria-hidden="true">
        {activeFlow.nodes.map((nodeId) => {
          const node = infraNodes.find((item) => item.id === nodeId);
          return (
            <motion.div
              className="infra-mobile-node"
              key={`${activeFlow.id}-${nodeId}`}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
            >
              <strong>{L(node?.label, language)}</strong>
              <span>{L(node?.status, language)}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="infra-summary">
        <div className="infra-active-panel">
          <span className="infra-active-tag">
            <span className={`flow-dot flow-dot-${activeFlow.id}`} aria-hidden="true" />
            {L(visualCopy.infraActiveFlow, language)}: <strong>{L(activeFlow.label, language)}</strong>
            {selectedFlow === null && <em className="infra-auto-pill">{L(visualCopy.infraAuto, language)}</em>}
          </span>
          <p>{L(activeFlow.detail, language)}</p>
        </div>
        <div className="infra-legend-block" aria-hidden="true">
          {infraLegend.map((item) => (
            <span className={`infra-legend-item legend-${item.kind}`} key={item.kind}>
              <span className={`flow-dot flow-dot-${item.kind}`} />
              {L(item.label, language)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const botSteps = [
  { label: { en: "YouTube link", fa: "لینک YouTube", ar: "رابط YouTube", de: "YouTube-Link" }, value: { en: "sent", fa: "ارسال شد", ar: "أُرسل", de: "gesendet" } },
  { label: { en: "platform", fa: "پلتفرم", ar: "المنصة", de: "Plattform" }, value: { en: "detected", fa: "شناسایی شد", ar: "تم الكشف", de: "erkannt" } },
  { label: { en: "metadata", fa: "متادیتا", ar: "البيانات", de: "Metadaten" }, value: { en: "retrieved", fa: "دریافت شد", ar: "تم الجلب", de: "abgerufen" } },
  { label: { en: "format", fa: "فرمت", ar: "الصيغة", de: "Format" }, value: { en: "selected", fa: "انتخاب شد", ar: "تم الاختيار", de: "gewählt" } },
  { label: { en: "processing", fa: "پردازش", ar: "المعالجة", de: "Verarbeitung" }, value: "68%" },
  { label: { en: "file", fa: "فایل", ar: "الملف", de: "Datei" }, value: { en: "returned", fa: "بازگردانده شد", ar: "تم الإرجاع", de: "geliefert" } },
];

function BotVisual({ language }) {
  const active = useLoop(botSteps.length, 1250);
  const progress = Math.min(100, Math.max(18, active * 19));
  return (
    <div className="project-visual-scene bot-demo" data-visual="downloader" aria-label="Telegram media downloader workflow illustration">
      <div className="demo-caption">{L(visualCopy.botCaption, language)}</div>
      <div className="bot-phone">
        <div className="phone-top"><span />{L(visualCopy.botTitle, language)}</div>
        <motion.div className="bot-bubble is-user" layout dir="ltr">
          https://youtu.be/demo
        </motion.div>
        {botSteps.map((step, index) => (
          <motion.div
            className={`bot-bubble is-bot ${index <= active ? "is-visible" : ""}`}
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: index <= active ? 1 : 0.18, y: index <= active ? 0 : 10 }}
          >
            <span>{L(step.label, language)}</span>
            <em>{L(step.value, language)}</em>
          </motion.div>
        ))}
        <div className="download-progress">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="bot-platforms" aria-hidden="true">
        {["YouTube", "Instagram", "SoundCloud"].map((item, index) => (
          <motion.span
            key={item}
            animate={{ y: [0, -6, 0], opacity: active % 3 === index ? 1 : 0.55 }}
            transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.18 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function AiRtlVisual({ language }) {
  const fixed = useLoop(2, 3000) === 1;
  return (
    <div
      className={`project-visual-scene airtl-demo ${fixed ? "is-fixed" : "is-raw"}`}
      data-visual="ai-chat-rtl-fixer"
      aria-label="AI Chat RTL Fixer chat-surface illustration"
    >
      <div className="demo-caption">{L(visualCopy.airtlCaption, language)}</div>
      <div className="airtl-window">
        <div className="window-bar">
          <span />
          <strong>{L(visualCopy.airtlWindow, language)}</strong>
          <motion.em className={`airtl-toggle ${fixed ? "is-on" : ""}`} layout>
            <i className="airtl-toggle-dot" />
            {L(fixed ? visualCopy.airtlOn : visualCopy.airtlOff, language)}
          </motion.em>
        </div>
        <div className="airtl-thread">
          <div className="airtl-msg is-user" dir="rtl">{L(visualCopy.airtlUser, language)}</div>
          <motion.div
            key={`chat-${fixed}`}
            className={`airtl-msg is-bot ${fixed ? "" : "is-broken"}`}
            dir={fixed ? "rtl" : "ltr"}
            initial={{ opacity: 0.35, filter: "blur(3px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="airtl-msg-tag">{L(fixed ? visualCopy.airtlFixed : visualCopy.airtlRaw, language)}</span>
            سلام! این یک پاسخ فارسی است، همراه با یک واژهٔ <span className="airtl-inline-en" dir="ltr">English</span> و علامت‌گذاری درست.
          </motion.div>
          <div className="airtl-code" dir="ltr" aria-hidden="true">
            <span className="airtl-code-tag">{L(visualCopy.airtlCodeStays, language)}</span>
            <code>npm run build --prefix ./app</code>
          </div>
        </div>
      </div>
      <div className="visual-status-line">
        <span />
        {L(visualCopy.airtlStatus, language)}
      </div>
    </div>
  );
}

const pdfRules = [
  { kind: "remove", tagKey: "pdfRemove", from: "CONFIDENTIAL — DRAFT", to: null },
  { kind: "replace", tagKey: "pdfReplace", from: "€ 1,250.00", to: "$ 1,375.00" },
  { kind: "insert", tagKey: "pdfInsert", from: null, to: "Approved · AT8" },
];

const pdfPageRows = [
  { w: "82%", state: "keep" },
  { w: "64%", state: "remove" },
  { w: "90%", state: "keep" },
  { w: "54%", state: "replace" },
  { w: "74%", state: "keep" },
  { w: "48%", state: "insert" },
];

const PDF_TOTAL = 3000;
const PDF_STEPS = 26;

function PdfSanitizerVisual({ language }) {
  const step = useLoop(PDF_STEPS, 150);
  const ratio = step / (PDF_STEPS - 1);
  const pct = Math.round(ratio * 100);
  const pages = Math.min(PDF_TOTAL, Math.round(ratio * PDF_TOTAL));

  return (
    <div className="project-visual-scene pdf-demo" data-visual="pdf-sanitizer" aria-label="PDF Sanitizer batch editing illustration">
      <div className="demo-caption">{L(visualCopy.pdfCaption, language)}</div>
      <div className="pdf-stage">
        <div className="pdf-rules" aria-hidden="true">
          <span className="pdf-rules-title">{L(visualCopy.pdfRules, language)}</span>
          {pdfRules.map((rule) => (
            <div className={`pdf-rule pdf-rule-${rule.kind}`} key={rule.kind}>
              <em>{L(visualCopy[rule.tagKey], language)}</em>
              <span className="pdf-rule-body" dir="ltr">
                {rule.from && <b className="pdf-from">{rule.from}</b>}
                {rule.from && rule.to && <i className="pdf-arrow">→</i>}
                {rule.to && <b className="pdf-to">{rule.to}</b>}
              </span>
            </div>
          ))}
        </div>

        <div className="pdf-doc">
          <div className="window-bar">
            <span />
            <strong>{L(visualCopy.pdfWindow, language)}</strong>
            <em>{L(visualCopy.pdfBatch, language)}</em>
          </div>
          <div className="pdf-pages">
            <div className="pdf-page-lines" aria-hidden="true">
              {pdfPageRows.map((row, index) => (
                <span
                  key={index}
                  className={`pdf-line pdf-line-${row.state}`}
                  style={{ width: row.w }}
                />
              ))}
            </div>
            <motion.span
              className="pdf-scan"
              aria-hidden="true"
              animate={{ top: `${pct}%` }}
              transition={{ ease: "linear", duration: 0.14 }}
            />
          </div>
          <div className="pdf-progress" aria-hidden="true">
            <motion.span animate={{ width: `${pct}%` }} transition={{ ease: "linear", duration: 0.14 }} />
          </div>
          <div className="pdf-counter" dir="ltr">
            <b>{pages.toLocaleString("en-US")}</b> / {PDF_TOTAL.toLocaleString("en-US")} {L(visualCopy.pdfPages, language)}
          </div>
        </div>
      </div>
      <div className="visual-status-line">
        <span />
        {L(visualCopy.pdfStatus, language)}
      </div>
    </div>
  );
}

function VeynaVisual({ language }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="project-visual-scene veyna-demo" data-visual="veyna" aria-label="VEYNA protected connectivity illustration">
      <div className="demo-caption">{L(visualCopy.veynaCaption, language)}</div>
      <div className="veyna-stage">
        <div className="veyna-orbit" aria-hidden="true">
          <motion.span
            className="veyna-orbit-ring veyna-orbit-ring-outer"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="veyna-orbit-ring veyna-orbit-ring-inner"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          <div className="veyna-logo-shell">
            <img src="/projects/veyna/veyna-logo.png" alt="" />
          </div>
        </div>

        <div className="veyna-profile">
          <span className="veyna-lock" aria-hidden="true" />
          <div>
            <strong>VEYNA Secure</strong>
            <small>{L(visualCopy.veynaProtected, language)}</small>
          </div>
        </div>

        <div className="veyna-modes" aria-label="VEYNA connection modes">
          <span className="is-active">{L(visualCopy.veynaSmart, language)}</span>
          <span>{L(visualCopy.veynaSystem, language)}</span>
          <span>{L(visualCopy.veynaTun, language)}</span>
        </div>
      </div>
      <div className="visual-status-line">
        <span />
        {L(visualCopy.veynaStatus, language)}
      </div>
    </div>
  );
}

const sceneMap = {
  keyfix: KeyFixVisual,
  netdoctor: NetDoctorVisual,
  "pdf-sanitizer": PdfSanitizerVisual,
  "hybrid-web-mail-infrastructure": InfrastructureVisual,
  "instagram-youtube-soundcloud-downloader": BotVisual,
  "ai-chat-rtl-fixer": AiRtlVisual,
  veyna: VeynaVisual,
};

export default function ProjectVisual({ slug, language = "en" }) {
  const Scene = useMemo(() => sceneMap[slug], [slug]);
  if (!Scene) return null;
  return <Scene language={language} />;
}
