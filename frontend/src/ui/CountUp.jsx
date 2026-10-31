import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/*
 * Counts a number up when it scrolls into view: "1200+" → 0…1200+.
 * Values that aren't a plain number ("UP407", "PG–XII") or look like a year
 * ("2008") are shown as they are.
 */
const PLAIN = /^(\D{0,2})(\d[\d,]*)(\D{0,3})$/;

const CountUp = ({ value, className = "" }) => {
  const text = String(value ?? "");
  const match = text.match(PLAIN);
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN;
  const countable = match && Number.isFinite(target) && !(target >= 1900 && target <= 2100 && !match[1] && !match[3]);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(countable && !reduce ? 0 : target);

  useEffect(() => {
    if (!countable || reduce || !inView) return;
    const controls = animate(0, target, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [countable, reduce, inView, target]);

  if (!countable) return <span className={className}>{text}</span>;
  return (
    <span ref={ref} className={className}>
      {match[1]}
      {shown.toLocaleString("en-IN")}
      {match[3]}
    </span>
  );
};

export default CountUp;
