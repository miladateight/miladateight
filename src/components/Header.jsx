import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Languages, Menu, X } from "lucide-react";
import { projects } from "../data/projects";
import logoUrl from "../assets/at8-logo.png";
import { localize } from "../utils/localize";

const languages = [
  { key: "en", short: "EN", label: "English" },
  { key: "fa", short: "FA", label: "فارسی" },
  { key: "ar", short: "AR", label: "العربية" },
  { key: "de", short: "DE", label: "Deutsch" },
];

const shellText = {
  skip: {
    en: "Skip to content",
    fa: "پرش به محتوا",
    ar: "تخطي إلى المحتوى",
    de: "Zum Inhalt springen",
  },
  openNav: {
    en: "Open navigation",
    fa: "باز کردن منو",
    ar: "فتح التنقل",
    de: "Navigation öffnen",
  },
  closeNav: {
    en: "Close navigation",
    fa: "بستن منو",
    ar: "إغلاق التنقل",
    de: "Navigation schließen",
  },
  language: {
    en: "Language",
    fa: "زبان",
    ar: "اللغة",
    de: "Sprache",
  },
  projectIntro: {
    en: "Selected builds, tools, and infrastructure notes.",
    fa: "ابزارها، پروژه‌ها و یادداشت‌های زیرساختی منتخب.",
    ar: "أدوات ومشاريع وملاحظات بنية تحتية مختارة.",
    de: "Ausgewählte Builds, Tools und Infrastruktur-Notizen.",
  },
};

const panelMotion = {
  initial: { opacity: 0, y: 10, scale: 0.98, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: 8, scale: 0.98, filter: "blur(6px)" },
  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
};

export default function Header({ t, language, setLanguage, isRtl }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const projectsRef = useRef(null);
  const projectsButtonRef = useRef(null);
  const langRef = useRef(null);
  const langButtonRef = useRef(null);
  const mobileFirstLinkRef = useRef(null);

  const normalizedPath = location.pathname.endsWith("/") ? location.pathname : `${location.pathname}/`;
  const activeProject = projects.some((project) => project.pageUrl === normalizedPath);
  const activeLanguage = languages.find((item) => item.key === language) || languages[0];

  const navItems = useMemo(() => [
    { to: "/", label: t.nav[0], active: normalizedPath === "/" },
    { to: "/about/", label: t.nav[1], active: normalizedPath === "/about/" },
    { to: "/contact/", label: t.nav[3], active: normalizedPath === "/contact/" },
  ], [normalizedPath, t.nav]);

  useEffect(() => {
    const sentinel = document.createElement("span");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:18px;left:0;width:1px;height:1px;pointer-events:none;";
    document.body.prepend(sentinel);
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: "0px 0px 0px 0px",
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (projectsRef.current && !projectsRef.current.contains(event.target)) setProjectsOpen(false);
      if (langRef.current && !langRef.current.contains(event.target)) setLanguageOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (projectsOpen) {
        setProjectsOpen(false);
        projectsButtonRef.current?.focus();
      }
      if (languageOpen) {
        setLanguageOpen(false);
        langButtonRef.current?.focus();
      }
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [languageOpen, mobileOpen, projectsOpen]);

  useEffect(() => {
    setProjectsOpen(false);
    setLanguageOpen(false);
    setMobileOpen(false);
  }, [location.pathname, language]);

  useEffect(() => {
    document.body.classList.toggle("nav-locked", mobileOpen);
    if (mobileOpen) window.setTimeout(() => mobileFirstLinkRef.current?.focus(), 80);
    return () => document.body.classList.remove("nav-locked");
  }, [mobileOpen]);

  const focusFirstProject = () => {
    window.setTimeout(() => {
      projectsRef.current?.querySelector(".header-projects-panel a")?.focus();
    }, 30);
  };

  const focusFirstLanguage = () => {
    window.setTimeout(() => {
      langRef.current?.querySelector(".header-language-panel button")?.focus();
    }, 30);
  };

  const onProjectsKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setProjectsOpen(true);
      focusFirstProject();
    }
  };

  const onLanguageKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setLanguageOpen(true);
      focusFirstLanguage();
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">{localize(shellText.skip, language)}</a>
      <header className={`at8-header ${scrolled ? "is-scrolled" : ""} ${isRtl ? "rtl" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="header-brand" aria-label="AT8 home">
            <span className="brand-mark-shell" aria-hidden="true">
              <img src={logoUrl} alt="" width="44" height="44" />
            </span>
            <span className="header-brand-copy">
              <strong>Milad Ateight</strong>
              <small>AT8 · Ateight</small>
            </span>
          </Link>

          <nav className="header-nav" aria-label="Main navigation">
            <Link to={navItems[0].to} className={navItems[0].active ? "is-active" : ""}>{navItems[0].label}</Link>
            <Link to={navItems[1].to} className={navItems[1].active ? "is-active" : ""}>{navItems[1].label}</Link>
            <div className="header-projects-menu" ref={projectsRef}>
              <button
                ref={projectsButtonRef}
                type="button"
                className={`header-projects-trigger ${activeProject ? "is-active" : ""}`}
                aria-expanded={projectsOpen}
                aria-controls="projects-menu"
                aria-haspopup="menu"
                onClick={() => setProjectsOpen((open) => !open)}
                onKeyDown={onProjectsKeyDown}
              >
                {t.nav[2]}
                <ChevronDown size={15} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {projectsOpen && (
                  <motion.div id="projects-menu" className="header-projects-panel" role="menu" {...panelMotion}>
                    <div className="header-panel-intro">
                      <strong>{t.projectMenu}</strong>
                      <small>{localize(shellText.projectIntro, language)}</small>
                    </div>
                    {projects.map((project) => (
                      <Link
                        key={project.slug}
                        to={project.pageUrl}
                        role="menuitem"
                        onClick={() => setProjectsOpen(false)}
                      >
                        <span>{project.title}</span>
                        <small>{localize(project.type, language)}</small>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to={navItems[2].to} className={navItems[2].active ? "is-active" : ""}>{navItems[2].label}</Link>
          </nav>

          <div className="header-actions">
            <div className="header-language" ref={langRef}>
              <button
                ref={langButtonRef}
                type="button"
                className="header-language-trigger"
                aria-expanded={languageOpen}
                aria-controls="language-menu"
                aria-haspopup="listbox"
                onClick={() => setLanguageOpen((open) => !open)}
                onKeyDown={onLanguageKeyDown}
              >
                <Languages size={15} aria-hidden="true" />
                <span>{activeLanguage.short}</span>
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    id="language-menu"
                    className="header-language-panel"
                    role="listbox"
                    aria-label={localize(shellText.language, language)}
                    {...panelMotion}
                  >
                    {languages.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        role="option"
                        aria-selected={language === item.key}
                        onClick={() => {
                          setLanguage(item.key);
                          setLanguageOpen(false);
                          langButtonRef.current?.focus();
                        }}
                      >
                        <span>{item.short}</span>
                        <small>{item.label}</small>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="header-toggle"
              aria-label={mobileOpen ? localize(shellText.closeNav, language) : localize(shellText.openNav, language)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.button
                className="mobile-scrim"
                type="button"
                aria-label={localize(shellText.closeNav, language)}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                id="mobile-navigation"
                className="header-drawer"
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <nav className="header-drawer-links" aria-label="Mobile navigation">
                  <div className="drawer-brand-lockup" aria-hidden="true">
                    <img src={logoUrl} alt="" width="52" height="52" />
                    <span>
                      <strong>Milad Ateight</strong>
                      <small>AT8 · Ateight</small>
                    </span>
                  </div>
                  <Link ref={mobileFirstLinkRef} to="/">{t.nav[0]}</Link>
                  <Link to="/about/">{t.nav[1]}</Link>
                  <Link to="/contact/">{t.nav[3]}</Link>
                </nav>
                <div className="header-drawer-section">
                  <strong>{t.projectMenu}</strong>
                  <div className="header-drawer-projects">
                    {projects.map((project) => (
                      <Link key={project.slug} to={project.pageUrl}>
                        <span>{project.title}</span>
                        <small>{localize(project.type, language)}</small>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="header-drawer-section">
                  <strong>{localize(shellText.language, language)}</strong>
                  <div className="header-drawer-language" role="listbox" aria-label={localize(shellText.language, language)}>
                    {languages.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        role="option"
                        aria-selected={language === item.key}
                        onClick={() => setLanguage(item.key)}
                      >
                        {item.short}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
