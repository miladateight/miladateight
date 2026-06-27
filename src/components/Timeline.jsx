import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] } }
};

export default function Timeline({ items, language }) {
  return (
    <div className="timeline">
      <div className="timeline-line" />
      {items.map(([title, body], i) => (
        <motion.article
          key={title}
          className="timeline-item"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={itemVariants}
          transition={{ delay: i * 0.12 }}
        >
          <span className="timeline-step">{String(i + 1).padStart(2, "0")}</span>
          <div className="timeline-content">
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
