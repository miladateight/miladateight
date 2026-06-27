import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { TextReveal } from "../components/ScrollReveal";

export default function NotFound({ t, language }) {
  return (
    <div className="not-found">
      <motion.div
        className="not-found-code"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        404
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <TextReveal>
          {language === "en" ? "Page not found" :
           language === "fa" ? "صفحه یافت نشد" :
           language === "ar" ? "الصفحة غير موجودة" :
           "Seite nicht gefunden"}
        </TextReveal>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {language === "en" ? "The page you are looking for does not exist or has been moved." :
         language === "fa" ? "صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است." :
         language === "ar" ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها." :
         "Die gesuchte Seite existiert nicht oder wurde verschoben."}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          {t.backHome}
        </Link>
      </motion.div>
    </div>
  );
}
