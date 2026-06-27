import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StarField from "./components/StarField";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import { useLanguage } from "./hooks/useLanguage";
import { projects } from "./data/projects";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { language, setLanguage, t, isRtl, dir } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("rtl", isRtl);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [isRtl, dir, language]);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const currentProject = projects.find(
    (p) => location.pathname === p.pageUrl || location.pathname.startsWith(p.pageUrl)
  );

  return (
    <div className={`app ${isRtl ? "rtl" : "ltr"}`}>
      <StarField />
      <Header t={t} language={language} setLanguage={setLanguage} isRtl={isRtl} />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home t={t} language={language} isRtl={isRtl} /></PageTransition>} />
            {projects.map((project) => (
              <Route
                key={project.slug}
                path={project.pageUrl}
                element={
                  <PageTransition>
                    <ProjectPage project={project} language={language} t={t} />
                  </PageTransition>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </main>

      <Footer t={t} language={language} />
    </div>
  );
}
