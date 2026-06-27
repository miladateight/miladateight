import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./ScrollReveal";

export default function ProjectCard({ project, language, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  const Icon = project.Icon;

  const glowOpacity = useTransform(x, [-100, 0, 100], [0, 0.8, 0]);
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
          className="project-card-glow"
          style={{
            opacity: glowOpacity,
            x: glowX,
            y: glowY,
          }}
          aria-hidden="true"
        />
        <div className="project-card-top">
          <div className="project-card-icon">
            <Icon size={18} />
          </div>
          <span className="project-card-tag">{project.tag[language]}</span>
        </div>
        <div className="project-card-body">
          <p className="project-card-type">{project.type[language]}</p>
          <h3>{project.title}</h3>
          <p>{project.lines[language]}</p>
        </div>
        <div className="project-card-footer">
          <small>{project.stack}</small>
          <Link to={project.pageUrl} className="project-card-link">
            {project.type[language]}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </motion.div>
    </Reveal>
  );
}
