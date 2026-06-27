import { motion, useReducedMotion } from "framer-motion";

const springReveal = { type: "spring", stiffness: 250, damping: 22, mass: 0.8 };

export function Reveal({ children, className = "", as, delay = 0 }) {
  const reduce = useReducedMotion();
  const Tag = as || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...springReveal, delay }}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.06, delayChildren: 0.08 }}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({ children, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ ...springReveal, delay }}
    >
      {children}
    </motion.span>
  );
}

export function StaggerItem({ children, className = "", as, delay = 0 }) {
  const Tag = as || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...springReveal, delay }}
    >
      {children}
    </Tag>
  );
}
