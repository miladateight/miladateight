import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SeoManager from "./components/SeoManager";
import { useLanguage } from "./hooks/useLanguage";
import { projects } from "./data/projects";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const pageSpring = { type: "spring", stiffness: 190, damping: 26, mass: 0.9 };
const pageVariants = {
  initial: { opacity: 0, y: 14, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(5px)" },
};

function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageSpring}
    >
      {children}
    </motion.div>
  );
}

function RouteFallback() {
  return (
    <div className="route-fallback" aria-live="polite" aria-label="Loading page">
      <span className="route-fallback-mark">AT8</span>
      <span className="route-fallback-line" />
    </div>
  );
}

export default function App() {
  const { language, setLanguage, t, isRtl, dir } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    document.getElementById("loader")?.remove();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("rtl", isRtl);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, isRtl, language]);

  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return (
    <div className={`app ${isRtl ? "rtl" : "ltr"}`}>
      <SeoManager language={language} />
      <Header t={t} language={language} setLanguage={setLanguage} isRtl={isRtl} />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <Suspense fallback={<RouteFallback />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home t={t} language={language} isRtl={isRtl} /></PageTransition>} />
              <Route path="/about/" element={<PageTransition><About t={t} language={language} /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About t={t} language={language} /></PageTransition>} />
              <Route path="/contact/" element={<PageTransition><Contact t={t} language={language} /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact t={t} language={language} /></PageTransition>} />
              {projects.map((project) => (
                <Route
                  key={project.slug}
                  path={project.pageUrl}
                  element={<PageTransition><ProjectPage project={project} language={language} t={t} /></PageTransition>}
                />
              ))}
              <Route path="*" element={<PageTransition><NotFound t={t} language={language} /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer t={t} language={language} />
    </div>
  );
}
