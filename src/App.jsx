import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SeoManager from "./components/SeoManager";
import AnimatedBackground from "./components/AnimatedBackground";
import { VisualBoundary } from "./components/ErrorBoundary";
import { useLanguage } from "./hooks/useLanguage";
import { projects } from "./data/projects";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";

const pageTween = { duration: 0.42, ease: [0.16, 1, 0.3, 1] };
const pageVariants = {
  initial: { opacity: 0, y: 14, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
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
      transition={pageTween}
    >
      {children}
    </motion.div>
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
      <VisualBoundary label="animated background">
        <AnimatedBackground />
      </VisualBoundary>
      <Header t={t} language={language} setLanguage={setLanguage} isRtl={isRtl} />
      <main id="main-content" className="main-content" tabIndex={-1}>
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
      </main>
      <Footer t={t} language={language} />
    </div>
  );
}
