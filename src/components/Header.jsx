import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { projects } from "../data/projects";
import at8Logo from "../assets/at8-logo.png?inline";

const springFast = { type: "spring", stiffness: 500, damping: 12 };

export default function Header({ t, language, setLanguage, isRtl }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const isHome = location.pathname === "/";
  const langs = ["en", "fa", "ar", "de"];
  const langLabels = { en: "English", fa: "\u0641\u0627\u0631\u0633\u06CC", ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", de: "Deutsch" };

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") { setMobileOpen(false); setMenuOpen(false); } };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => { setMobileOpen(false); setMenuOpen(false); }, [language, location]);

  const navLink = (to, label) => {
    const active = location.pathname === to || (to === "/" && isHome);
    return (
      <motion.span style={{ display: "inline-flex" }} whileHover={{ scale: 1.05 }} transition={springFast}>
        <Link to={to} className={active ? "nav-active" : ""} onClick={() => setMobileOpen(false)}>
          <motion.span layoutId={active ? "nav-active" : undefined} style={{ position: "absolute", inset: 0, borderRadius: "var(--radius-pill)", background: "var(--accent-dim)", zIndex: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }} />
          {label}
        </Link>
      </motion.span>
    );
  };

  return (
    <header className={`at8-header ${isRtl ? "rtl" : ""}`}>
      <div className="header-inner">
        <Link to="/" className="header-brand">
          <motion.span className="header-brand-mark"
            animate={{ boxShadow: ["0 0 28px var(--accent-glow)", "0 0 40px var(--accent-glow)", "0 0 28px var(--accent-glow)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={at8Logo} alt="" aria-hidden="true" />
          </motion.span>
          <span className="header-brand-text">
            <strong>Milad</strong>
            <small>AT8</small>
          </span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {navLink("/", t.nav[0])}
          {navLink("/#about", t.nav[1])}
          <div className="header-projects-menu" ref={menuRef}>
            <button
              type="button"
              className="header-projects-trigger"
              onMouseEnter={() => setMenuOpen(true)}
              onClick={(e) => {
                if (!window.matchMedia("(hover: hover)").matches) {
                  e.preventDefault();
                  setMenuOpen((o) => !o);
                }
              }}
              aria-expanded={menuOpen}
            >
              {t.nav[2]}
            </button>
            <div className={`header-projects-panel ${menuOpen ? "is-open" : ""}`}
                 onMouseLeave={() => setMenuOpen(false)}>
              <div className="header-projects-intro">
                <strong>{t.projectMenu}</strong>
                <small>{t.projectMenuLead}</small>
              </div>
              {projects.map((p) => (
                <Link key={p.slug} to={p.pageUrl} onClick={() => { setMenuOpen(false); setMobileOpen(false); }}>
                  <span>{p.title}</span>
                  <small>{p.type[language]}</small>
                </Link>
              ))}
            </div>
          </div>
          {navLink("/#contact", t.nav[3])}
        </nav>

        <div className="header-lang" aria-label="Language switcher">
          {langs.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={language === key}
              onClick={() => setLanguage(key)}
            >
              {langLabels[key]}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="header-toggle"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`header-drawer ${mobileOpen ? "is-open" : ""}`}>
        <nav className="header-drawer-links" aria-label="Mobile navigation">
          {navLink("/", t.nav[0])}
          {navLink("/#about", t.nav[1])}
          {navLink("/#projects", t.nav[2])}
          {navLink("/#contact", t.nav[3])}
        </nav>
        <div className="header-drawer-projects">
          <strong>{t.projectMenu}</strong>
          {projects.map((p) => (
            <Link key={p.slug} to={p.pageUrl} onClick={() => setMobileOpen(false)}>
              <span>{p.title}</span>
              <small>{p.type[language]}</small>
            </Link>
          ))}
        </div>
        <div className="header-drawer-lang">
          {langs.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={language === key}
              onClick={() => setLanguage(key)}
            >
              {langLabels[key]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
