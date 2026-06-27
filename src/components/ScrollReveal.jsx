import { motion, useReducedMotion } from "framer-motion";

const springReveal = { type: "spring", stiffness: 260, damping: 24, mass: 0.8 };

export function Reveal({ children, className = "", as, delay = 0 }) {
  const reduce = useReducedMotion();
  const Tag = as || motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
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
      viewport={{ once: true, amount: 0.08 }}
      transition={{ staggerChildren: 0.05, delayChildren: 0.06 }}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({ children, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ ...springReveal, delay }}
    >
      {children}
    </motion.span>
  );
}

export function FadeIn({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, className = "", delay = 0, distance = 24 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ ...springReveal, delay }}
    >
      {children}
    </motion.div>
  );
}
