import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/*
 * Animates content the first time it scrolls into view.
 *   variant "up"    fades and rises into place (default)
 *   variant "wipe"  uncovers from bottom to top with a slight settle, for photos
 */
const Reveal = ({ children, delay = 0, y = 28, as = "div", className = "", variant = "up" }) => {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const from = variant === "wipe" ? { clipPath: "inset(100% 0 0 0)", scale: 1.06 } : { opacity: 0, y };
  const to = variant === "wipe" ? { clipPath: "inset(0% 0 0 0)", scale: 1 } : { opacity: 1, y: 0 };

  return (
    <Tag
      className={className}
      initial={reduce ? false : from}
      whileInView={to}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: variant === "wipe" ? 1.2 : 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
