import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUp, Github, Send, AtSign } from "lucide-react";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function Footer({ t, language }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.footer
      className="at8-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
    >
      <div className="footer-inner">
        <div className="footer-grid">
          <motion.div className="footer-brand-col" variants={fadeUp}>
            <div className="footer-brand-name">AT8 / Ateight</div>
            <p className="footer-brand-desc">
              {language === "en" && "IT specialist focused on infrastructure, networks, and systems that hold up under real production load."}
              {language === "fa" && "کارشناس IT با تمرکز بر زیرساخت، شبکه و سیستم‌هایی که در بار واقعی عملیاتی دوام می‌آورند."}
              {language === "ar" && "متخصص تكنولوجيا المعلومات متخصص في البنية التحتية والشبكات والأنظمة التي تصمد في بيئة الإنتاج الحقيقية."}
              {language === "de" && "IT-Spezialist mit Fokus auf Infrastruktur, Netzwerke und Systeme, die unter realer Produktionslast standhalten."}
            </p>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>{language === "en" ? "Navigation" : language === "fa" ? "ناوبری" : language === "ar" ? "التنقل" : "Navigation"}</h4>
            <ul>
              <li><Link to="/">{t.nav[0]}</Link></li>
              <li><Link to="/about/">{t.nav[1]}</Link></li>
              <li><Link to="/#projects">{t.nav[2]}</Link></li>
              <li><Link to="/contact/">{t.nav[3]}</Link></li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>{t.projectMenu}</h4>
            <ul>
              {projects.map((p) => (
                <li key={p.slug}><Link to={p.pageUrl}>{p.title}</Link></li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>{language === "en" ? "Connect" : language === "fa" ? "ارتباط" : language === "ar" ? "تواصل" : "Kontakt"}</h4>
            <ul>
              <li><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={14} /> GitHub</a></li>
              <li><a href={profile.telegram} target="_blank" rel="noopener noreferrer"><Send size={14} /> Telegram</a></li>
              <li><a href={`mailto:${profile.email}`}><AtSign size={14} /> Email</a></li>
            </ul>
          </motion.div>
        </div>

        <motion.div className="footer-bottom" variants={fadeUp}>
          <span>&copy; {new Date().getFullYear()} Milad Ateight. All rights reserved.</span>
          <button type="button" className="footer-back-top" onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={14} />
            {language === "en" ? "Back to top" : language === "fa" ? "بازگشت به بالا" : language === "ar" ? "العودة للأعلى" : "Nach oben"}
          </button>
        </motion.div>
      </div>
    </motion.footer>
  );
}
