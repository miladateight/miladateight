import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./ScrollReveal";
import { localize } from "../utils/localize";

const labels = {
  view: {
    en: "View project",
    fa: "مشاهده پروژه",
    ar: "عرض المشروع",
    de: "Projekt ansehen",
  },
};

function ProjectPreview({ project }) {
  return (
    <div className={`project-preview ${project.visualTone || project.slug}`} aria-hidden="true">
      <span className="preview-grid" />
      <span className="preview-core">{project.title.slice(0, 2).toUpperCase()}</span>
      <span className="preview-line line-a" />
      <span className="preview-line line-b" />
      <span className="preview-node node-a" />
      <span className="preview-node node-b" />
      <span className="preview-node node-c" />
    </div>
  );
}

export default function ProjectCard({ project, language, index = 0 }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22 });
  const springY = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(springY, [-120, 120], [4, -4]);
  const rotateY = useTransform(springX, [-120, 120], [-4, 4]);
  const glowX = useTransform(springX, [-160, 160], ["18%", "82%"]);
  const glowY = useTransform(springY, [-160, 160], ["18%", "82%"]);

  const handleMove = (event) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = project.Icon;

  return (
    <Reveal className="project-card-shell" as="article" delay={index * 0.03}>
      <motion.div
        ref={ref}
        className="project-card"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, "--glow-x": glowX, "--glow-y": glowY }}
      >
        <ProjectPreview project={project} />
        <div className="project-card-content">
          <div className="project-card-head">
            <span className="project-card-icon"><Icon size={18} aria-hidden="true" /></span>
            <span className="project-card-tag">{localize(project.tag, language)}</span>
          </div>
          <p className="project-card-type">{localize(project.type, language)}</p>
          <h3>{project.title}</h3>
          <p className="project-card-desc">{localize(project.lines, language)}</p>
          <div className="project-card-footer">
            <span className="project-card-stack">{project.stack}</span>
            <Link to={project.pageUrl} className="project-card-link" aria-label={`${localize(labels.view, language)}: ${project.title}`}>
              {localize(labels.view, language)}
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}
