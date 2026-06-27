import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.7, 0.2, 1] } }
};

export default function SpecCard({ spec, index }) {
  const colSpan = index === 0 ? "spec-card-featured" : "";
  const delay = (index % 4) * 0.06;
  return (
    <motion.div
      className={`spec-card ${colSpan}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={itemVariants}
      transition={{ delay }}
    >
      <span className="spec-card-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="spec-card-label">{spec}</span>
    </motion.div>
  );
}
