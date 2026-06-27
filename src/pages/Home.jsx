import { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck, RadioTower, Cpu, Zap, Github, Languages, AtSign, Globe2, Send, UserRound,
  Layers3, CheckCircle2, BookOpen, FolderGit2, Home as HomeIcon, ArrowUpRight
} from "lucide-react";
import { profile } from "../data/profile";
import { projects, specialties } from "../data/projects";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import ProjectCard from "../components/ProjectCard";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function HeroVisual() {
  const [Hero, setHero] = useState(null);
  useEffect(() => {
    import("../components/hero/HeroCore3D").then(
      (m) => setHero(() => m.default),
      () => {}
    );
  }, []);
  return (
    <div className="hero-canvas-wrap">
      {Hero ? <Hero /> : <div className="hero-canvas-placeholder" />}
    </div>
  );
}

export default function Home({ t, language, isRtl }) {
  const contactLinks = useMemo(() => [
    [Github, "GitHub", profile.github, profile.github.replace("https://", "")],
    [Send, "Telegram", profile.telegram, profile.telegram.replace("https://", "")],
    [AtSign, "Email", `mailto:${profile.email}`, profile.email],
    [Globe2, "Website", profile.website, profile.website.replace("https://", "")]
  ], []);

  const scrollTo = (sel) => document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div className="hero-outer">
        <section className="hero">
          <motion.div
            className="hero-copy"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="hero-kicker" variants={fadeUp}>
              {t.heroKicker}
            </motion.p>
            <h1>
              <TextReveal delay={0.15}>{t.headline}</TextReveal>
            </h1>
            <motion.p className="hero-intro" variants={fadeUp}>
              {t.intro}
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <button className="btn btn-primary" type="button" onClick={() => scrollTo("#projects")}>
                <Layers3 size={16} />
                {t.primary}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => scrollTo("#about")}>
                <UserRound size={16} />
                {t.secondary}
              </button>
            </motion.div>
            <motion.div className="hero-specs" variants={fadeUp}>
              {t.specialties.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={12} />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.15 }}
          >
            <HeroVisual />
            <div className="hero-badge">
              <span>{t.heroSubtitle}</span>
            </div>
          </motion.div>
        </section>
      </div>

      <div className="page-container">
        <section id="about" className="section">
          <Reveal className="section-heading">
            <p className="eyebrow">
              <ShieldCheck size={15} />
              {t.nav[1]}
            </p>
            <h2>{t.identityTitle}</h2>
            <p>{t.identityLead}</p>
          </Reveal>
          <RevealGroup className="identity-grid">
            {t.identityCards.map(([title, body], i) => (
              <Reveal className="card identity-card" key={title} as="article">
                <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        <section className="section">
          <Reveal className="section-heading compact">
            <p className="eyebrow">
              <Cpu size={15} />
              {t.specialtiesTitle}
            </p>
            <h2>{t.specialtiesTitle}</h2>
            <p>{t.specialtiesLead}</p>
          </Reveal>
          <RevealGroup className="spec-grid">
            {specialties.map((spec, i) => {
              const label = spec[language] || spec.en;
              return (
                <Reveal className="spec-card" as="div" key={label}>
                  <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{label}</span>
                </Reveal>
              );
            })}
          </RevealGroup>
        </section>

        <section className="section blueprint-section">
          <Reveal className="section-heading">
            <p className="eyebrow">
              <RadioTower size={15} />
              {t.nav[0]} / {t.nav[2]}
            </p>
            <h2>How this site works</h2>
            <p>Identity first, then projects, then a way to reach me — every project page shares this same navigation.</p>
          </Reveal>
          <RevealGroup className="blueprint-grid">
            {[
              [HomeIcon, "01", t.nav[0], "Who I am and what I work on, in one clear view."],
              [FolderGit2, "02", t.projectMenu, "Every repository as a readable page, not just a raw link."],
              [BookOpen, "03", "Project detail", "Architecture, screenshots, downloads, and release notes."]
            ].map(([Icon, num, title, desc]) => (
              <Reveal className="blueprint-card" as="article" key={num}>
                <span>{num}</span>
                <Icon size={18} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        <section className="section">
          <Reveal className="section-heading compact">
            <p className="eyebrow">
              <Zap size={15} />
              {t.methodTitle}
            </p>
            <h2>{t.methodTitle}</h2>
          </Reveal>
          <div className="timeline">
            <div className="timeline-line" />
            {t.method.map(([title, body], i) => (
              <Reveal className="timeline-item" as="article" key={title}>
                <span className="timeline-step">{String(i + 1).padStart(2, "0")}</span>
                <div className="timeline-content">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <Reveal className="section-heading">
            <p className="eyebrow">
              <Github size={15} />
              {t.nav[2]}
            </p>
            <h2>{t.projectsTitle}</h2>
            <p>{t.projectsLead}</p>
          </Reveal>
          <RevealGroup className="project-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} language={language} index={i} />
            ))}
          </RevealGroup>
        </section>

        <section id="contact" className="section contact-section">
          <Reveal className="contact-copy" as="div">
            <p className="eyebrow">
              <Languages size={15} />
              {t.nav[3]}
            </p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactLead}</p>
            <a className="btn btn-primary contact-cta" href={profile.telegram}>
              <Send size={16} />
              {t.contactButton}
            </a>
          </Reveal>
          <RevealGroup className="contact-links">
            {contactLinks.map(([Icon, label, href, text]) => (
              <Reveal className="contact-link" as="a" href={href} key={label}>
                <Icon size={18} />
                <span>{label}</span>
                <small>{text}</small>
              </Reveal>
            ))}
          </RevealGroup>
        </section>
      </div>
    </>
  );
}
