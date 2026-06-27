import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./ScrollReveal";

export default function ProjectCard({ project, language, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(y, [-100, 100], [4, -4]);
  const rotateY = useTransform(x, [-100, 100], [-4, 4]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const Icon = project.Icon;
  const glowOpacity = useTransform(x, [-100, 0, 100], [0, 0.7, 0]);
  const glowX = useTransform(x, [-100, 0, 100], [-30, 0, 30]);
  const glowY = useTransform(y, [-100, 0, 100], [-30, 0, 30]);

  return (
    <Reveal className="project-card" as="article">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d", position: "relative" }}
      >
        <motion.div
          style={{
            position: "absolute",
            width: 160, height: 160,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            top: -40, right: -40,
            opacity: glowOpacity,
            x: glowX, y: glowY,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        <motion.div className="project-card-head" style={{ transformStyle: "preserve-3d" }}>
          <motion.div
            className="project-card-icon"
            style={{ z: 20 }}
            whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0] }}
            transition={{ duration: 0.25 }}
          >
            <Icon size={18} />
          </motion.div>
          <span className="project-card-tag" style={{ transform: "translateZ(16px)" }}>
            {project.tag[language]}
          </span>
        </motion.div>
        <motion.div className="project-card-body" style={{ transformStyle: "preserve-3d" }}>
          <motion.p className="project-card-type" style={{ transform: "translateZ(12px)" }}>
            {project.type[language]}
          </motion.p>
          <h3 style={{ transform: "translateZ(20px)" }}>{project.title}</h3>
          <p className="project-card-desc" style={{ transform: "translateZ(8px)" }}>
            {project.lines[language]}
          </p>
        </motion.div>
        <motion.div className="project-card-footer" style={{ transformStyle: "preserve-3d" }}>
          <span className="project-card-stack" style={{ transform: "translateZ(12px)" }}>
            {project.stack}
          </span>
          <Link to={project.pageUrl} className="project-card-link" style={{ transform: "translateZ(16px)" }}>
            {t_viewProject(language)}
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}

function t_viewProject(lang) {
  const map = { en: "View project", fa: "مشاهده پروژه", ar: "عرض المشروع", de: "Projekt ansehen" };
  return map[lang] || map.en;
}
