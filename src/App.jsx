import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import { useLanguage } from "./hooks/useLanguage";
import { projects } from "./data/projects";

const pageSpring = { type: "spring", stiffness: 200, damping: 25, mass: 0.8 };

const pageVariants = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
};

function PageTransition({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageSpring}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const { language, setLanguage, t, isRtl, dir } = useLanguage();
  const location = useLocation();

  useEffect(() => { document.getElementById("loader")?.remove(); }, []);

  useEffect(() => {
    document.body.classList.toggle("rtl", isRtl);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [isRtl, dir, language]);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => { document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }); }, 100);
    } else { window.scrollTo(0, 0); }
  }, [location]);

  return (
    <div className={`app ${isRtl ? "rtl" : "ltr"}`}>
      <div className="page-shell">
        <Header t={t} language={language} setLanguage={setLanguage} isRtl={isRtl} />
        <main className="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home t={t} language={language} isRtl={isRtl} /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About t={t} language={language} /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact t={t} language={language} /></PageTransition>} />
              {projects.map((project) => (
                <Route key={project.slug} path={project.pageUrl} element={
                  <PageTransition><ProjectPage project={project} language={language} t={t} /></PageTransition>
                } />
              ))}
              <Route path="*" element={<PageTransition><NotFound t={t} language={language} /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer t={t} language={language} />
      </div>
    </div>
  );
}
