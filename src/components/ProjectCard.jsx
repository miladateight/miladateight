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
  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const Icon = project.Icon;
  const glowOpacity = useTransform(x, [-100, 0, 100], [0, 0.9, 0]);
  const glowX = useTransform(x, [-100, 0, 100], [-40, 0, 40]);
  const glowY = useTransform(y, [-100, 0, 100], [-40, 0, 40]);

  return (
    <Reveal className="project-card" as="article">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d", position: "relative" }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="project-card-glow"
          style={{ opacity: glowOpacity, x: glowX, y: glowY }}
          aria-hidden="true"
        />
        <motion.div className="project-card-top"
          style={{ transformStyle: "preserve-3d" }}>
          <motion.div className="project-card-icon"
            style={{ z: 30 }}
            whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.3 }}>
            <Icon size={18} />
          </motion.div>
          <span className="project-card-tag" style={{ transform: "translateZ(20px)" }}>{project.tag[language]}</span>
        </motion.div>
        <motion.div className="project-card-body" style={{ transformStyle: "preserve-3d" }}>
          <motion.p className="project-card-type" style={{ transform: "translateZ(15px)" }}>{project.type[language]}</motion.p>
          <h3 style={{ transform: "translateZ(25px)" }}>{project.title}</h3>
          <p style={{ transform: "translateZ(10px)" }}>{project.lines[language]}</p>
        </motion.div>
        <motion.div className="project-card-footer" style={{ transformStyle: "preserve-3d" }}>
          <motion.small style={{ transform: "translateZ(15px)" }}>{project.stack}</motion.small>
          <Link to={project.pageUrl} className="project-card-link" style={{ transform: "translateZ(20px)" }}>
            {project.type[language]}
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}
