import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, Download, Github, Layers3 } from "lucide-react";
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
            </div>
          </motion.div>

          <Reveal className="project-hero-visual">
            <div className="visual-demo-card">
              <VisualBoundary label={`${project.title} visual demonstration`}>
                <Suspense fallback={<div className="visual-fallback" aria-hidden="true" />}>
                  <ProjectVisual slug={project.slug} />
                </Suspense>
              </VisualBoundary>
              <span className="visual-demo-label">{localize(pageText.visual, language)}</span>
            </div>
          </Reveal>
        </section>

        <ProjectMetaPanel project={project} data={data} language={language} />

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
