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

const projectDetails = {
  keyfix: {
    architecture: "KeyFix stays in the Windows tray, watches a short in-memory word buffer, compares that word with enabled keyboard-layout maps and dictionaries, then acts only after a clear trigger such as Space.",
    decisions: "The project favors local scoring, per-language enablement, excluded apps, conservative handling for short words, and a release path that does not require users to build from source.",
    limits: "It cannot guarantee every ambiguous short word is wrong, and unsupported layouts or sensitive apps should stay excluded so correction never becomes intrusive.",
    security: "Typed text is not uploaded or stored as telemetry. The working buffer is temporary and the privacy model is based on local-only processing.",
    result: "The practical outcome is a small desktop utility for multilingual typists who often switch between English, Persian, Arabic, and German layouts.",
  },
  netdoctor: {
    architecture: "NetDoctor presents a step-by-step diagnostics flow for adapter state, IP configuration, gateway reachability, DNS, latency, proxy settings, and internet connectivity.",
    decisions: "The repair model is guided and reversible where possible, so the user can understand what changed instead of running a black-box network reset.",
    limits: "The tool can identify common Windows connectivity faults, but it does not replace ISP-side troubleshooting, damaged hardware checks, or enterprise network policy review.",
    security: "The diagnostic focus is local network state. Repair actions should remain explicit, documented, and scoped to the setting being fixed.",
    result: "It is useful when a user or technician needs a clearer path from symptom to likely cause before applying a network repair.",
  },
  "pdf-sanitizer": {
    architecture: "PDF Sanitizer loads a document, builds a rule set describing which repeated blocks to remove, which text or values to replace, and what to insert, then applies those rules across every page in a single batch pass and exports a new clean PDF.",
    decisions: "The tool is built around reusable rules instead of manual page edits, keeps processing local, previews changes before writing the file, and separates a free tier for small jobs from a licensed premium tier for large-scale work.",
    limits: "The free tier is capped at 10 pages per file and 2 files per day; very large or unusually structured documents may need rule tuning, and scanned image-only PDFs depend on how their text is stored.",
    security: "Documents are processed locally on the user's machine. Nothing is uploaded, and the premium tier is unlocked with a per-user license issued over Telegram rather than an account.",
    result: "The practical outcome is that commercial and trading teams can clean or update huge PDFs — hundreds to thousands of pages — in one pass instead of editing them page by page.",
  },
  "hybrid-web-mail-infrastructure": {
    architecture: "The case study separates local and public environments: users and LAN services connect through MikroTik and WireGuard to a VPS, then HAProxy/Caddy routes web and mail traffic with DNS, TLS, and backup paths documented separately.",
    decisions: "The design keeps the local site private, uses the VPS as a public edge, splits web and mail flows deliberately, and treats DNS, TLS, monitoring, and backup as first-class operational concerns.",
    limits: "The published material is sanitized. It avoids exposing sensitive hostnames, secrets, customer details, and private network values.",
    security: "WireGuard, DNS records, TLS handling, service separation, and encrypted backups are described as architecture decisions rather than leaked production configuration.",
    result: "The page works as a readable infrastructure note for planning, reviewing, or explaining a hybrid web and mail migration.",
  },
  "instagram-youtube-soundcloud-downloader": {
    architecture: "The Telegram bot receives a media URL from an authorized user, detects the platform, fetches metadata, selects a download format when available, queues work, and returns the file inside Telegram.",
    decisions: "Admin activation, queueing, cookie-based authentication where needed, and platform-specific handling keep the workflow controlled instead of exposing a public downloader surface.",
    limits: "Availability depends on platform behavior, account access, rate limits, media rights, and the size limits of the delivery channel.",
    security: "Access is limited to approved Telegram users. Cookie handling and logs should stay minimal because downloader workflows can expose sensitive account or media metadata.",
    result: "The useful result is a private automation tool that removes the need to jump between multiple ad-heavy download sites or browser extensions.",
  },
  "ai-chat-rtl-fixer": {
    architecture: "A .NET 8 Windows tray app detects known desktop AI chat apps, and for Electron targets connects over the Chrome DevTools Protocol on local loopback, injecting scoped CSS, the Vazirmatn font, and a runtime script that classifies each chat block and applies the correct text direction.",
    decisions: "The tool is deliberately scoped to the chat surface, keeps code and English left-to-right, stays runtime-only instead of patching app files, and only relaunches a target on a random free debug port after explicit user consent.",
    limits: "It is a pre-release framework build: detecting an app is not the same as a verified fix, no app profile is marked stable yet, and selectors may need updating after target apps change their UI.",
    security: "There is no telemetry, no account, and no external network calls — only local loopback to a debug-enabled target app. Chat text and clipboard content are never stored, and logs keep safe metadata only.",
    result: "The practical outcome is readable right-to-left chat in desktop AI apps for Persian, Arabic, Hebrew, and Urdu users, with a clean revert whenever the tool is disabled or the app is restarted normally.",
  },
  veyna: {
    architecture: "VEYNA combines a Flutter desktop interface with shared Go profile contracts, a Windows Core built around Xray-core, and Wintun support for TUN mode. Profiles, routing choices, DNS policy, and connection state meet in one desktop workflow.",
    decisions: "The client accepts standard links, subscriptions, and Xray JSON while keeping locked VEYNA imports opaque. Smart, System Proxy, and TUN modes are explicit choices, and English, Persian, dark, and light interfaces are built into the product.",
    limits: "The current public release targets Windows 10 and 11 on x64. Android, iOS, macOS, and Linux are planned, and locked links created by the bundled local Gateway currently stay scoped to the same Windows installation.",
    security: "Locked profiles do not reveal or share their source configuration. The project documents sanitized diagnostics, checksum verification, clean proxy and route restoration, and a clear split between the public interface code and private security-sensitive components.",
    result: "The result is a focused connectivity client that brings standard Xray workflows and protected profile distribution into one polished Windows application.",
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
        <p className="section-label">AT8 Project Notes</p>
        <h2 className="section-title">{project.title} technical notes</h2>
      </Reveal>
      <RevealGroup className="project-detail-grid">
        {Object.entries(details).map(([key, body], index) => (
          <Reveal className="project-detail-card" key={key} delay={index * 0.025}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{localize(detailLabels[key], language)}</h3>
            <p>{body}</p>
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
