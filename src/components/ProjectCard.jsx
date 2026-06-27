import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./ScrollReveal";

export default function ProjectCard({ project, language, index }) {
  const Icon = project.Icon;
  return (
    <Reveal className="project-card" as="article">
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
    </Reveal>
  );
}
