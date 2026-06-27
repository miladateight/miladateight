import { useMemo, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ShieldCheck, RadioTower, Cpu, Zap, Github, Languages, AtSign, Globe2, Send, UserRound,
  Layers3, CheckCircle2, BookOpen, FolderGit2, Home as HomeIcon, Sparkles
} from "lucide-react";
import { profile } from "../data/profile";
import { projects, specialties } from "../data/projects";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import ProjectCard from "../components/ProjectCard";

const spring = { type: "spring", stiffness: 300, damping: 20 };
const springSnap = { type: "spring", stiffness: 400, damping: 12 };
const springGentle = { type: "spring", stiffness: 200, damping: 25 };

const containerStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const itemScaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { ...spring, duration: 0.5 } },
};

const itemSlideLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { ...springGentle } },
};

const itemSlideRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { ...springGentle } },
};

const floatBadge = {
  y: [0, -8, 0],
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
};

function HeroVisual() {
  const [Hero, setHero] = useState(null);
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    import("../components/hero/HeroCore3D").then((m) => setHero(() => m.default), () => {});
  }, []);

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / rect.width * 10);
    mouseY.set((e.clientY - cy) / rect.height * 10);
  };

  return (
    <motion.div
      ref={ref}
      className="hero-canvas-wrap"
      onMouseMove={handleMouse}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ x: springX, y: springY }}
    >
      {Hero ? <Hero /> : <div className="hero-canvas-placeholder" />}
    </motion.div>
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
          <motion.div className="hero-copy" variants={containerStagger} initial="hidden" animate="visible">
            <motion.p className="hero-kicker" variants={itemFadeUp}>{t.heroKicker}</motion.p>
            <motion.div variants={itemScaleIn}>
              <h1><TextReveal delay={0.15}>{t.headline}</TextReveal></h1>
            </motion.div>
            <motion.p className="hero-intro" variants={itemFadeUp}>{t.intro}</motion.p>
            <motion.div className="hero-actions" variants={containerStagger}>
              <motion.button className="btn btn-primary" type="button" onClick={() => scrollTo("#projects")}
                variants={itemFadeUp}
                whileHover={{ scale: 1.06, boxShadow: "0 16px 48px rgba(34,211,148,0.4)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Layers3 size={16} />{t.primary}
              </motion.button>
              <motion.button className="btn btn-ghost" type="button" onClick={() => scrollTo("#about")}
                variants={itemFadeUp}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <UserRound size={16} />{t.secondary}
              </motion.button>
            </motion.div>
            <motion.div className="hero-specs" variants={containerStagger}>
              {t.specialties.map((item) => (
                <motion.span key={item} variants={itemFadeUp}
                  whileHover={{ scale: 1.06, borderColor: "var(--accent)", background: "rgba(34,211,148,0.12)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <CheckCircle2 size={12} />{item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}>
            <HeroVisual />
            <motion.div className="hero-badge" animate={floatBadge}>
              <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.4 }}>
                {t.heroSubtitle}
              </motion.span>
            </motion.div>
          </motion.div>
        </section>
      </div>

      <div className="page-container">

        <section id="about" className="section">
          <Reveal className="section-heading">
            <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ height: 2, background: "var(--accent)", opacity: 0.2, marginBottom: 16, borderRadius: 2 }} />
            <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <ShieldCheck size={15} />{t.nav[1]}
            </motion.p>
            <h2>{t.identityTitle}</h2>
            <p>{t.identityLead}</p>
          </Reveal>
          <RevealGroup className="identity-grid">
            {t.identityCards.map(([title, body], i) => {
              const icons = [UserRound, Cpu, Sparkles];
              const Icon = icons[i] || UserRound;
              return (
                <Reveal className="card identity-card" key={title} as="article">
                  <motion.div className="identity-card-icon"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}>
                    <Icon size={18} />
                  </motion.div>
                  <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </Reveal>
              );
            })}
          </RevealGroup>
        </section>

        <section className="section">
          <Reveal className="section-heading compact">
            <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <Cpu size={15} />{t.specialtiesTitle}
            </motion.p>
            <h2>{t.specialtiesTitle}</h2>
            <p>{t.specialtiesLead}</p>
          </Reveal>
          <RevealGroup className="spec-grid">
            {specialties.map((spec, i) => {
              const label = spec[language] || spec.en;
              return (
                <Reveal className="spec-card" as={motion.div} key={label}
                  whileHover={{ y: -6, scale: 1.02, borderColor: "var(--accent)", background: "rgba(34,211,148,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                  <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{label}</span>
                </Reveal>
              );
            })}
          </RevealGroup>
        </section>

        <section className="section blueprint-section">
          <Reveal className="section-heading">
            <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <RadioTower size={15} />{t.nav[0]} / {t.nav[2]}
            </motion.p>
            <h2>How this site works</h2>
            <p>Identity first, then projects, then a way to reach me — every project page shares this same navigation.</p>
          </Reveal>
          <RevealGroup className="blueprint-grid">
            {[
              [HomeIcon, "01", t.nav[0], "Who I am and what I work on, in one clear view."],
              [FolderGit2, "02", t.projectMenu, "Every repository as a readable page, not just a raw link."],
              [BookOpen, "03", "Project detail", "Architecture, screenshots, downloads, and release notes."]
            ].map(([Icon, num, title, desc]) => (
              <Reveal className="blueprint-card" as={motion.article} key={num}
                whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(34,211,148,0.12)", transition: { type: "spring", stiffness: 300, damping: 15 } }}>
                <div className="blueprint-card-header"><span>{num}</span><Icon size={18} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </section>

        <section className="section">
          <Reveal className="section-heading compact">
            <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <Zap size={15} />{t.methodTitle}
            </motion.p>
            <h2>{t.methodTitle}</h2>
          </Reveal>
          <div className="timeline">
            <motion.div className="timeline-line" initial={{ height: 0 }} whileInView={{ height: "calc(100% - 24px)" }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
            {t.method.map(([title, body], i) => (
              <Reveal className={`timeline-item ${i % 2 ? "timeline-right" : ""}`} as={motion.article} key={title}
                variants={i % 2 ? itemSlideRight : itemSlideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}>
                <motion.span className="timeline-step"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 40px rgba(34,211,148,0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
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
            <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <Github size={15} />{t.nav[2]}
            </motion.p>
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
            <motion.p className="eyebrow" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <Languages size={15} />{t.nav[3]}
            </motion.p>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactLead}</p>
            <motion.a className="btn btn-primary contact-cta" href={profile.telegram}
              whileHover={{ scale: 1.06, boxShadow: "0 16px 48px rgba(34,211,148,0.4)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Send size={16} />{t.contactButton}
            </motion.a>
          </Reveal>
          <RevealGroup className="contact-links">
            {contactLinks.map(([Icon, label, href, text]) => (
              <Reveal className="contact-link" as={motion.a} href={href} key={label}
                whileHover={{ y: -6, scale: 1.02, borderColor: "var(--accent)", background: "rgba(34,211,148,0.06)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                <motion.span
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}>
                  <Icon size={18} />
                </motion.span>
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
