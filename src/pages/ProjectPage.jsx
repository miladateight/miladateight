import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { projectPages } from "../data/projectPages";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import ProjectVisual from "../components/ProjectVisuals";
import { spring } from "../utils/motion";

export default function ProjectPage({ project, language, t }) {
  const data = projectPages[project.slug];
  if (!data) return null;

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="project-page">
      <div className="page-container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">{t.nav[0]}</Link>
          <span className="sep">/</span>
          <Link to="/#projects">{t.nav[2]}</Link>
          <span className="sep">/</span>
          <span>{project.title}</span>
        </nav>

        {/* Hero */}
        <section className="project-hero">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-label">{project.type[language]}</p>
            <h1><TextReveal>{data.hero[language]}</TextReveal></h1>
            <p className="project-hero-lead">{data.lead[language]}</p>
            <div className="project-hero-chips">
              <span className="chip">{project.stack}</span>
              <a href={project.url} className="chip chip-link" target="_blank" rel="noopener noreferrer">
                <Github size={12} />{t.sourceCode}<ArrowUpRight size={12} />
              </a>
            </div>
          </motion.div>
        </section>

        {/* Visual */}
        <Reveal>
          <motion.div
            className="visual-demo-card"
            whileHover={{ boxShadow: "0 0 48px rgba(56,189,248,0.06)" }}
            transition={spring}
          >
            <ProjectVisual slug={project.slug} />
            <span className="visual-demo-label">
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
              Interactive visualization
            </span>
          </motion.div>
        </Reveal>

        {/* Problem / Solution */}
        {data.problem && data.solution && (
          <section className="section">
            <RevealGroup className="split-grid">
              <Reveal className="split-card">
                <span className="section-label" style={{ marginBottom: 10 }}>{t.problemLabel}</span>
                <h3>{t.problemLabel}</h3>
                <p>{data.problem[language]}</p>
              </Reveal>
              <Reveal className="split-card">
                <span className="section-label" style={{ marginBottom: 10 }}>{t.solutionLabel}</span>
                <h3>{t.solutionLabel}</h3>
                <p>{data.solution[language]}</p>
              </Reveal>
            </RevealGroup>
          </section>
        )}

        {/* Features */}
        {data.features && (
          <section className="section">
            <Reveal className="section-header compact">
              <h2 className="section-title">{t.featuresLabel}</h2>
            </Reveal>
            <RevealGroup className="feature-grid">
              {data.features.map((f, i) => (
                <Reveal className="feature-card" key={i}>
                  <h3>{f.title[language]}</h3>
                  <p>{f.body[language]}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        {/* Workflow */}
        {data.steps && (
          <section className="section">
            <Reveal className="section-header compact">
              <h2 className="section-title">{t.workflowLabel}</h2>
            </Reveal>
            <div className="timeline">
              <motion.div
                className="timeline-line"
                initial={{ height: 0 }}
                whileInView={{ height: "calc(100% - 24px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              {data.steps.map((step, i) => (
                <motion.article
                  className="timeline-item"
                  key={i}
                  initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 220, damping: 22, delay: i * 0.06 }}
                >
                  <motion.span
                    className="timeline-step"
                    whileHover={{ scale: 1.08, boxShadow: "0 0 24px rgba(56,189,248,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <div className="timeline-content">
                    <h3>{step.title[language]}</h3>
                    <p>{step.body[language]}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Downloads */}
        {data.downloads && (
          <section className="section">
            <Reveal className="section-header compact">
              <h2 className="section-title">{t.downloadsLabel}</h2>
            </Reveal>
            <RevealGroup className="download-row">
              {data.downloads.map((d, i) => (
                <Reveal key={i}>
                  <motion.a
                    href={d.url}
                    className={`btn ${d.primary ? "btn-primary" : "btn-ghost"}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    {d.primary ? <Download size={16} /> : <ArrowUpRight size={16} />}
                    {d.label[language]}
                  </motion.a>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        {/* Prev / Next navigation */}
        <section className="section" style={{ paddingTop: 0 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              {prevProject ? (
                <Link
                  to={prevProject.pageUrl}
                  className="btn btn-ghost"
                  style={{ minWidth: 200, justifyContent: "flex-start" }}
                >
                  <ChevronLeft size={16} />
                  <span>{prevProject.title}</span>
                </Link>
              ) : <div />}
              {nextProject ? (
                <Link
                  to={nextProject.pageUrl}
                  className="btn btn-ghost"
                  style={{ minWidth: 200, justifyContent: "flex-end" }}
                >
                  <span>{nextProject.title}</span>
                  <ChevronRight size={16} />
                </Link>
              ) : <div />}
            </div>
          </Reveal>
        </section>

        {/* Related */}
        {projects.filter((p) => p.slug !== project.slug).length > 0 && (
          <section className="section">
            <Reveal className="section-header compact">
              <h2 className="section-title">{t.projectsList}</h2>
            </Reveal>
            <RevealGroup className="related-grid">
              {projects.filter((p) => p.slug !== project.slug).map((p) => (
                <Reveal key={p.slug}>
                  <Link to={p.pageUrl} className="related-card">
                    <strong>{p.title}</strong>
                    <small>{p.type[language]}</small>
                  </Link>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}
      </div>
    </div>
  );
}
