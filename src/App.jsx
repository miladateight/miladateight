import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImmersiveBackground from "./components/background/ImmersiveBackground";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import { useLanguage } from "./hooks/useLanguage";
import { projects } from "./data/projects";

window.addEventListener("error", (e) => {
  const el = document.getElementById("loader");
  if (el) {
    el.innerHTML = `<div style="padding:40px;text-align:center;color:#ef4444;font-family:monospace;font-size:14px">
      <strong>Error loading app</strong><br><br>
      <code style="color:#94a3b8">${e.message || "Unknown error"}</code>
    </div>`;
  }
});

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

  useEffect(() => {
    document.getElementById("loader")?.remove();
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

  return (
    <div className={`app ${isRtl ? "rtl" : "ltr"}`}>
      <ImmersiveBackground />
      <div className="page-shell">
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
    </div>
  );
}
