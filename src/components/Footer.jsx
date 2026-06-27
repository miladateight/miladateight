import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUp, AtSign, Github, Send } from "lucide-react";
import { projects } from "../data/projects";
import { profile } from "../data/profile";
import { localize } from "../utils/localize";

const footerText = {
  tagline: {
    en: "Infrastructure, networks, servers, automation, and web systems with an operator's sense of risk.",
    fa: "زیرساخت، شبکه، سرور، اتوماسیون و سیستم‌های وب با نگاه عملیاتی به ریسک.",
    ar: "بنية تحتية وشبكات وخوادم وأتمتة وأنظمة ويب بعين تشغيلية للمخاطر.",
    de: "Infrastruktur, Netzwerke, Server, Automatisierung und Web-Systeme mit operativem Blick für Risiken.",
  },
  nav: {
    en: "Navigation",
    fa: "ناوبری",
    ar: "التنقل",
    de: "Navigation",
  },
  connect: {
    en: "Connect",
    fa: "ارتباط",
    ar: "تواصل",
    de: "Kontakt",
  },
  back: {
    en: "Back to top",
    fa: "بازگشت به بالا",
    ar: "العودة إلى الأعلى",
    de: "Nach oben",
  },
  cta: {
    en: "Available for technical collaboration and project review.",
    fa: "برای همکاری فنی و بررسی پروژه آماده‌ام.",
    ar: "متاح للتعاون التقني ومراجعة المشاريع.",
    de: "Verfügbar für technische Zusammenarbeit und Projekt-Reviews.",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer({ t, language }) {
  const reduceMotion = useReducedMotion();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <motion.footer
      className="at8-footer"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
    >
      <div className="footer-inner">
        <motion.div className="footer-cta" variants={fadeUp}>
          <span>AT8</span>
          <p>{localize(footerText.cta, language)}</p>
          <Link to="/contact/" className="footer-cta-link">{t.nav[3]}</Link>
        </motion.div>

        <div className="footer-grid">
          <motion.div className="footer-brand-col" variants={fadeUp}>
            <Link to="/" className="footer-mark" aria-label="AT8 home">
              <span>AT8</span>
              <small>Ateight</small>
            </Link>
            <p>{localize(footerText.tagline, language)}</p>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h2>{localize(footerText.nav, language)}</h2>
            <ul>
              <li><Link to="/">{t.nav[0]}</Link></li>
              <li><Link to="/about/">{t.nav[1]}</Link></li>
              <li><Link to="/#projects">{t.nav[2]}</Link></li>
              <li><Link to="/contact/">{t.nav[3]}</Link></li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h2>{t.projectMenu}</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}><Link to={project.pageUrl}>{project.title}</Link></li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h2>{localize(footerText.connect, language)}</h2>
            <ul className="footer-contact-list">
              <li><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={15} />GitHub</a></li>
              <li><a href={profile.telegram} target="_blank" rel="noopener noreferrer"><Send size={15} />Telegram</a></li>
              <li><a href={`mailto:${profile.email}`}><AtSign size={15} />Email</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div className="footer-bottom" variants={fadeUp}>
          <span>&copy; {new Date().getFullYear()} Milad Ateight. AT8.</span>
          <button type="button" className="footer-back-top" onClick={scrollToTop} aria-label={localize(footerText.back, language)}>
            <ArrowUp size={15} aria-hidden="true" />
            {localize(footerText.back, language)}
          </button>
        </motion.div>
      </div>
    </motion.footer>
  );
}
