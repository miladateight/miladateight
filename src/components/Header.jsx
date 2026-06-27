import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { projects } from "../data/projects";

const springFast = { type: "spring", stiffness: 500, damping: 18 };

export default function Header({ t, language, setLanguage, isRtl }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const isHome = location.pathname === "/";
  const langs = ["en", "fa", "ar", "de"];
  const langLabels = { en: "EN", fa: "FA", ar: "AR", de: "DE" };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") { setMobileOpen(false); setMenuOpen(false); } };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => { setMobileOpen(false); setMenuOpen(false); }, [location.pathname, language]);

  const scrollTo = (hash) => {
    if (location.pathname !== "/") {
      window.location.href = "/" + hash;
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLink = (to, label, hash) => {
    const isActive = hash
      ? isHome && location.hash === hash
      : location.pathname === to;
    return (
      <Link
        to={hash ? "/" : to}
        onClick={(e) => {
          if (hash) { e.preventDefault(); scrollTo(hash); }
          setMobileOpen(false);
        }}
        className={isActive ? "nav-active" : ""}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className={`at8-header ${scrolled ? "is-scrolled" : ""} ${isRtl ? "rtl" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="header-brand">
            <motion.span
              className="header-brand-mark"
              whileHover={{ scale: 1.05 }}
              transition={springFast}
            >
              AT8
            </motion.span>
            <span className="header-brand-text">
              <strong>Milad</strong>
              <small>AT8</small>
            </span>
          </Link>

          <nav className="header-nav" aria-label="Main navigation">
            {navLink("/", t.nav[0])}
            {navLink("/about/", t.nav[1])}
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
                aria-haspopup="true"
              >
                {t.nav[2]}
                <ChevronDown size={14} style={{ transform: menuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="header-projects-panel is-open"
                    onMouseLeave={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {navLink("/contact/", t.nav[3])}
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

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="header-drawer is-open"
              initial={{ opacity: 0, y: -8, maxHeight: 0 }}
              animate={{ opacity: 1, y: 0, maxHeight: "min(85vh, 700px)" }}
              exit={{ opacity: 0, y: -8, maxHeight: 0 }}
              transition={{ duration: 0.25 }}
            >
              <nav className="header-drawer-links" aria-label="Mobile navigation">
                {navLink("/", t.nav[0])}
                {navLink("/about/", t.nav[1])}
                {navLink("/#projects", t.nav[2])}
                {navLink("/contact/", t.nav[3])}
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
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
