import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

export default function Footer({ t, language }) {
  return (
    <footer className="at8-footer">
      <div className="footer-inner">
        <div className="footer-info">
          <strong>{profile.name}</strong>
          <span>{t.footer}</span>
        </div>
        <nav className="footer-links" aria-label="Quick links">
          <Link to="/">{t.nav[0]}</Link>
          <Link to="/#about">{t.nav[1]}</Link>
          <Link to="/#contact">{t.nav[3]}</Link>
          {projects.map((p) => (
            <Link key={p.slug} to={p.pageUrl}>{p.title}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
