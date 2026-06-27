import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] } }
};

const groupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

export function Reveal({ children, className, as: Component = motion.div, ...rest }) {
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={itemVariants}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealGroup({ children, className }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={groupVariants}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({ children, className, delay = 0 }) {
  const words = children.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="text-reveal-word">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ display: "inline-block" }}
          >
            {word}{i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
