import { motion } from "framer-motion";
import { Github, Send, Globe2, AtSign, ExternalLink } from "lucide-react";
import { profile } from "../data/profile";
import { Reveal, RevealGroup, TextReveal } from "../components/ScrollReveal";
import { fadeUp, stagger, springFast } from "../utils/motion";

export default function Contact({ t, language }) {
  const methods = [
    {
      icon: Send,
      title: "Telegram",
      desc: { en: "Fastest way to reach me", fa: "سریع‌ترین راه ارتباطی", ar: "أسرع طريقة للتواصل", de: "Schnellster Weg" },
      link: profile.telegram,
      label: profile.telegram.replace("https://", ""),
    },
    {
      icon: AtSign,
      title: "Email",
      desc: { en: "For detailed discussions", fa: "برای بحث‌های مفصل‌تر", ar: "للمباحثات التفصيلية", de: "Für ausführliche Diskussionen" },
      link: `mailto:${profile.email}`,
      label: profile.email,
    },
    {
      icon: Github,
      title: "GitHub",
      desc: { en: "Open source and repositories", fa: "سورس باز و مخزن‌ها", ar: "المصادر المفتوحة والمستودعات", de: "Open Source und Repositories" },
      link: profile.github,
      label: profile.github.replace("https://", ""),
      external: true,
    },
  ];

  return (
    <div className="page-shell">
      <section className="contact-hero">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p className="section-label" variants={fadeUp}>
            <AtSign size={14} />
            {t.nav[3]}
          </motion.p>
          <motion.h1 variants={fadeUp}>
            <TextReveal>{t.contactTitle}</TextReveal>
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>{t.contactLead}</motion.p>
        </motion.div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <RevealGroup className="contact-methods">
          {methods.map((m) => (
            <Reveal key={m.title}>
              <motion.a
                href={m.link}
                className="contact-method"
                target={m.external ? "_blank" : undefined}
                rel={m.external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -3, borderColor: "var(--accent)" }}
                transition={springFast}
              >
                <div className="contact-method-icon">
                  <m.icon size={20} />
                </div>
                <div className="contact-method-info">
                  <h3>{m.title}</h3>
                  <p>{m.desc[language]}</p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {m.label}
                    {m.external && <ExternalLink size={12} />}
                  </span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <section className="contact-cta-section">
        <div className="contact-cta-inner">
          <Reveal>
            <h2>{t.contactTitle}</h2>
            <p className="lead">{t.contactLead}</p>
            <motion.a
              className="btn btn-primary"
              href={profile.telegram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 12px 36px rgba(56,189,248,0.3)" }}
              whileTap={{ scale: 0.96 }}
              transition={springFast}
            >
              <Send size={16} />{t.contactButton}
            </motion.a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
