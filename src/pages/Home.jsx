import { useMemo, useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ShieldCheck, Cpu, Zap, Github, Send, UserRound,
  Layers3, CheckCircle2, FolderGit2, ArrowUpRight,
  Globe2, Server, Network, Bot, Wrench, Cloud, Code2, Settings, Activity
} from "lucide-react";
import { profile } from "../data/profile";
import { projects, specialties } from "../data/projects";
import { Reveal, RevealGroup, TextReveal, SlideUp } from "../components/ScrollReveal";
import ProjectCard from "../components/ProjectCard";
import HeroBackground from "../components/hero/HeroBackground";
import { fadeUp, stagger, springFast } from "../utils/motion";

const TechOrbit = lazy(() => import("../components/TechOrbit"));

const hoverLift = { type: "spring", stiffness: 300, damping: 18 };

export default function Home({ t, language, isRtl }) {
  const contactLinks = useMemo(() => [
    [Github, "GitHub", profile.github, profile.github.replace("https://", "")],
    [Send, "Telegram", profile.telegram, profile.telegram.replace("https://", "")],
    [Globe2, "Email", `mailto:${profile.email}`, profile.email],
  ], []);

  const scrollTo = (s) => {
    if (location.pathname !== "/") {
      window.location.href = "/" + s;
    } else {
      document.querySelector(s)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <div className="hero-outer">
        <section className="hero" id="main-content">
          <HeroBackground />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{ position: "relative", zIndex: 1 }}
          >
            <motion.div className="hero-eyebrow" variants={fadeUp}>
              <Activity size={12} />
              {t.heroKicker}
            </motion.div>

            <motion.h1 variants={fadeUp}>
              <TextReveal delay={0.1}>
                {language === "en" ? (
                  <>Infrastructure, networks, and <span className="accent-text">systems that hold</span> under real load.</>
                ) : language === "fa" ? (
                  <>زیرساخت، شبکه و <span className="accent-text">سیستم‌هایی که</span> در بار واقعی دوام می‌آورند.</>
                ) : language === "ar" ? (
                  <>البنية التحتية والشبكات و<span className="accent-text">الأنظمة التي تصمد</span> تحت الحمل الحقيقي.</>
                ) : (
                  <>Infrastruktur, Netzwerke und <span className="accent-text">Systeme, die unter</span> realer Last halten.</>
                )}
              </TextReveal>
            </motion.h1>

            <motion.p className="hero-sub" variants={fadeUp}>
              {t.intro}
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <motion.button
                className="btn btn-primary"
                type="button"
                onClick={() => scrollTo("#projects")}
                whileHover={{ scale: 1.04, boxShadow: "0 12px 36px rgba(56,189,248,0.3)" }}
                whileTap={{ scale: 0.96 }}
                transition={springFast}
              >
                <Layers3 size={16} />{t.primary}
              </motion.button>
              <motion.button
                className="btn btn-ghost"
                type="button"
                onClick={() => scrollTo("#contact")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={springFast}
              >
                <UserRound size={16} />{t.secondary}
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="hero-scroll-line" />
            <span>SCROLL</span>
          </motion.div>
        </section>
      </div>

      <div className="page-shell">
        {/* ===== IDENTITY STRIP ===== */}
        <section className="section" style={{ paddingTop: "clamp(40px, 6vw, 80px)" }}>
          <RevealGroup className="identity-strip">
            {[
              { num: "01", title: t.identityCards[0][0], desc: t.identityCards[0][1] },
              { num: "02", title: t.identityCards[1][0], desc: t.identityCards[1][1] },
              { num: "03", title: t.identityCards[2][0], desc: t.identityCards[2][1] },
            ].map((item) => (
              <Reveal className="identity-strip-item" key={item.num}>
                <span className="num">{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        {/* ===== CAPABILITIES BENTO ===== */}
        <section className="section" id="about">
          <Reveal className="section-header">
            <motion.p className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Cpu size={14} />{t.specialtiesTitle}
            </motion.p>
            <h2 className="section-title">{t.specialtiesTitle}</h2>
            <p className="section-subtitle">{t.specialtiesLead}</p>
          </Reveal>
          <RevealGroup className="bento-grid">
            {[
              { icon: Server, label: specialties[6]?.[language] || specialties[6].en, col: "wide", variant: "variant-cyan" },
              { icon: Network, label: specialties[1]?.[language] || specialties[1].en, col: "medium", variant: "variant-violet" },
              { icon: Cloud, label: specialties[9]?.[language] || specialties[9].en, col: "medium", variant: "variant-teal" },
              { icon: Globe2, label: specialties[11]?.[language] || specialties[11].en, col: "medium", variant: "variant-cyan" },
              { icon: Code2, label: specialties[12]?.[language] || specialties[12].en, col: "medium", variant: "variant-violet" },
              { icon: Settings, label: specialties[10]?.[language] || specialties[10].en, col: "half", variant: "variant-teal" },
              { icon: ShieldCheck, label: specialties[0]?.[language] || specialties[0].en, col: "half", variant: "variant-cyan" },
            ].map((cell, i) => (
              <Reveal className={`bento-cell ${cell.col} ${cell.variant}`} key={i}>
                <div className="cell-icon"><cell.icon size={20} /></div>
                <span className="cell-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{cell.label}</h3>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        {/* ===== SPECIALTIES LIST ===== */}
        <section className="section" style={{ paddingTop: 0 }}>
          <RevealGroup className="skills-grid">
            {specialties.map((spec, i) => {
              const label = spec[language] || spec.en;
              return (
                <Reveal className="skill-chip" key={label}>
                  <span className="dot" />
                  {label}
                </Reveal>
              );
            })}
          </RevealGroup>
        </section>

        {/* ===== PROJECTS ===== */}
        <section className="section" id="projects">
          <Reveal className="section-header">
            <motion.p className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <FolderGit2 size={14} />{t.nav[2]}
            </motion.p>
            <h2 className="section-title">{t.projectsTitle}</h2>
            <p className="section-subtitle">{t.projectsLead}</p>
          </Reveal>
          <RevealGroup className="projects-grid">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} language={language} index={i} />
            ))}
          </RevealGroup>
        </section>

        {/* ===== TECH UNIVERSE ===== */}
        <section className="section">
          <Reveal className="section-header" style={{ textAlign: "center", margin: "0 auto clamp(32px, 5vw, 56px)" }}>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              {language === "en" ? "Technical Universe" : language === "fa" ? "جهان فنی" : language === "ar" ? "العالم التقني" : "Technisches Universum"}
            </h2>
            <p className="section-subtitle" style={{ textAlign: "center", margin: "0 auto" }}>
              {language === "en" ? "Tools, platforms, and protocols I work with daily."
                : language === "fa" ? "ابزارها، پلتفرم‌ها و پروتکل‌هایی که روزانه با آن‌ها کار می‌کنم."
                : language === "ar" ? "الأدوات والمنصات والبروتوكولات التي أعمل بها يوميا."
                : "Tools, Plattformen und Protokolle, mit denen ich täglich arbeite."}
            </p>
          </Reveal>
          <Reveal>
            <Suspense fallback={<div style={{ height: 400 }} />}>
              <TechOrbit />
            </Suspense>
          </Reveal>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="section">
          <Reveal className="section-header">
            <motion.p className="section-label" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Zap size={14} />{t.methodTitle}
            </motion.p>
            <h2 className="section-title">{t.methodTitle}</h2>
          </Reveal>
          <RevealGroup className="process-steps">
            {t.method.map(([title, body], i) => (
              <Reveal className="process-step" key={title}>
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        {/* ===== CONTACT CTA ===== */}
        <section className="contact-cta-section" id="contact">
          <div className="contact-cta-inner">
            <Reveal>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {t.contactTitle}
              </motion.h2>
              <motion.p
                className="lead"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t.contactLead}
              </motion.p>
              <motion.a
                className="btn btn-primary"
                href={profile.telegram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 12px 36px rgba(56,189,248,0.3)" }}
                whileTap={{ scale: 0.96 }}
                transition={springFast}
              >
                <Send size={16} />{t.contactButton}
              </motion.a>
            </Reveal>
            <RevealGroup className="contact-links-row">
              {contactLinks.map(([Icon, label, href, text]) => (
                <motion.a
                  className="contact-link-btn"
                  href={href}
                  key={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -2, borderColor: "var(--accent)" }}
                  transition={hoverLift}
                >
                  <Icon size={16} />
                  {label}
                </motion.a>
              ))}
            </RevealGroup>
          </div>
        </section>
      </div>
    </>
  );
}
