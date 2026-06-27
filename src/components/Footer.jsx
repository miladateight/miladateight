import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Footer({ t, language }) {
  return (
    <motion.footer className="at8-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
      }}>
      <div className="footer-inner">
        <motion.div className="footer-info" variants={fadeUp}>
          <strong>{profile.name}</strong>
          <span>{t.footer}</span>
        </motion.div>
        <motion.nav className="footer-links" aria-label="Quick links"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
          }}>
          {[
            ["/", t.nav[0]],
            ["/#about", t.nav[1]],
            ["/#contact", t.nav[3]],
            ...projects.map((p) => [p.pageUrl, p.title]),
          ].map(([to, label]) => (
            <motion.div key={label} variants={fadeUp}>
              <Link to={to}
                style={{ position: "relative", display: "inline-block" }}>
                {label}
                <motion.span
                  style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: 1, background: "var(--accent)", transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.nav>
      </div>
    </motion.footer>
  );
}
