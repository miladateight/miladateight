import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Compass, Home } from "lucide-react";
import { TextReveal } from "../components/ScrollReveal";
import { localize } from "../utils/localize";

const notFoundCopy = {
  title: {
    en: "Signal lost in the AT8 mesh.",
    fa: "سیگنال در شبکه AT8 گم شد.",
    ar: "فقدت الإشارة داخل شبكة AT8.",
    de: "Signal im AT8 Netz verloren.",
  },
  body: {
    en: "The route does not exist, or an old link points to a page that moved. The main navigation still has a clean path back.",
    fa: "این مسیر وجود ندارد، یا یک لینک قدیمی به صفحه‌ای منتقل‌شده اشاره می‌کند. ناوبری اصلی مسیر بازگشت روشن دارد.",
    ar: "هذا المسار غير موجود، أو أن رابطا قديما يشير إلى صفحة تم نقلها. التنقل الرئيسي يوفر طريقا واضحا للعودة.",
    de: "Diese Route existiert nicht, oder ein alter Link zeigt auf eine verschobene Seite. Die Hauptnavigation führt sauber zurück.",
  },
  home: {
    en: "Return home",
    fa: "بازگشت به خانه",
    ar: "العودة للرئيسية",
    de: "Zur Startseite",
  },
  projects: {
    en: "View projects",
    fa: "مشاهده پروژه‌ها",
    ar: "عرض المشاريع",
    de: "Projekte ansehen",
  },
};

export default function NotFound({ language }) {
  return (
    <div className="not-found">
      <motion.div
        className="not-found-visual"
        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <span className="not-found-ring ring-a" />
        <span className="not-found-ring ring-b" />
        <span className="not-found-code">404</span>
        <Compass size={28} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
      >
        <TextReveal>{localize(notFoundCopy.title, language)}</TextReveal>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {localize(notFoundCopy.body, language)}
      </motion.p>
      <motion.div
        className="not-found-actions"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.28 }}
      >
        <Link to="/" className="btn btn-primary">
          <Home size={16} aria-hidden="true" />
          {localize(notFoundCopy.home, language)}
        </Link>
        <Link to="/#projects" className="btn btn-ghost">
          <ArrowLeft size={16} aria-hidden="true" />
          {localize(notFoundCopy.projects, language)}
        </Link>
      </motion.div>
    </div>
  );
}
