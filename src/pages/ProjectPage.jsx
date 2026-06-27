import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Download } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import { projectPages } from "../data/projectPages";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import ProjectVisual from "../components/ProjectVisuals";
import Magnetic from "../components/Magnetic";
import { spring } from "../utils/motion";

export default function ProjectPage({ project, language, t }) {
  const data = projectPages[project.slug];
  if (!data) return null;
  const related = projects.filter((p) => p.slug !== project.slug);

  return (
    <div className="project-page">
      <div className="page-container">
        <section className="project-hero">
          <motion.div className="project-hero-copy"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="eyebrow">{project.type[language]}</p>
            <h1><TextReveal>{data.hero[language]}</TextReveal></h1>
            <p className="project-hero-lead">{data.lead[language]}</p>
            <div className="project-hero-chips">
              <span className="chip">{project.stack}</span>
              <motion.a href={project.url} className="chip chip-link" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: "var(--accent)" }} transition={spring}>
                <Github size={12} />{t.sourceCode}<ArrowUpRight size={12} />
              </motion.a>
            </div>
          </motion.div>
        </section>

        <Reveal>
          <motion.div className="visual-demo-card"
            whileHover={{ boxShadow: "0 0 60px rgba(34,211,148,0.08)" }} transition={spring}>
            <ProjectVisual slug={project.slug} />
            <span className="visual-demo-label">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
              Interactive 3D visualization
            </span>
          </motion.div>
        </Reveal>

        {data.problem && data.solution && (
          <section className="section">
            <RevealGroup className="split-grid">
              <Reveal className="split-card" as={motion.article}
                whileHover={{ y: -4, borderColor: "var(--accent)" }} transition={spring}>
                <span className="card-num">01</span>
                <h3>{t.problemLabel}</h3>
                <p>{data.problem[language]}</p>
              </Reveal>
              <Reveal className="split-card" as={motion.article}
                whileHover={{ y: -4, borderColor: "var(--accent)" }} transition={spring}>
                <span className="card-num">02</span>
                <h3>{t.solutionLabel}</h3>
                <p>{data.solution[language]}</p>
              </Reveal>
            </RevealGroup>
          </section>
        )}

        {data.features && (
          <section className="section">
            <Reveal className="section-heading compact">
              <p className="eyebrow">03</p>
              <h2>{t.featuresLabel}</h2>
            </Reveal>
            <RevealGroup className="feature-grid">
              {data.features.map((f, i) => (
                <Reveal className="feature-card" as={motion.article} key={i}
                  whileHover={{ y: -6, borderColor: "var(--accent)", boxShadow: "0 12px 40px rgba(34,211,148,0.06)" }}
                  transition={spring}>
                  <h3>{f.title[language]}</h3>
                  <p>{f.body[language]}</p>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        {data.steps && (
          <section className="section">
            <Reveal className="section-heading compact">
              <p className="eyebrow">04</p>
              <h2>{t.workflowLabel}</h2>
            </Reveal>
            <div className="timeline">
              <motion.div className="timeline-line" initial={{ height: 0 }} whileInView={{ height: "calc(100% - 24px)" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
              {data.steps.map((step, i) => (
                <motion.article className="timeline-item" key={i}
                  initial={{ opacity: 0, x: i % 2 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, delay: i * 0.08 }}>
                  <motion.span className="timeline-step" whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(34,211,148,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}>
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

        {data.downloads && (
          <section className="section">
            <Reveal className="section-heading compact">
              <p className="eyebrow">05</p>
              <h2>{t.downloadsLabel}</h2>
            </Reveal>
            <RevealGroup className="download-row">
              {data.downloads.map((d, i) => (
                <Reveal key={i}>
                  <Magnetic strength={8}>
                    <motion.a href={d.url}
                      className={`btn ${d.primary ? "btn-primary" : "btn-ghost"}`}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      {d.primary ? <Download size={16} /> : <ArrowUpRight size={16} />}
                      {d.label[language]}
                    </motion.a>
                  </Magnetic>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}

        {related.length > 0 && (
          <section className="section">
            <Reveal className="section-heading compact">
              <p className="eyebrow">06</p>
              <h2>{t.projectsList}</h2>
            </Reveal>
            <RevealGroup className="related-grid">
              {related.map((p) => (
                <Reveal className="related-card" as={motion(Link)} to={p.pageUrl} key={p.slug}
                  whileHover={{ y: -6, borderColor: "var(--accent)", boxShadow: "0 12px 40px rgba(34,211,148,0.06)" }}
                  transition={spring}>
                  <strong>{p.title}</strong>
                  <small>{p.type[language]}</small>
                </Reveal>
              ))}
            </RevealGroup>
          </section>
        )}
      </div>
    </div>
  );
}
