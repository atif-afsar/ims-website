import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import IconBadge from "../../ui/IconBadge";
import { Star8 } from "../../ui/Ornaments";

// Faces sit in different places in each library photo
const FOCUS = {
  "media:science-exhibition-7": "40% 50%",
  "media:science-exhibition-6": "50% 60%",
  "media:student-speech-2": "50% 30%",
};

/* One programme: photo with a slow parallax drift, text card beside it */
const Programme = ({ p, i, onActive }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);

  return (
    <article ref={ref} id={`programme-${i}`} className="scroll-mt-28">
      <Reveal variant="wipe" className="relative aspect-[16/10] overflow-hidden rounded-3xl">
        <motion.div className="absolute inset-[-10%_0]" style={{ y }}>
          <SmartImg src={p.image} position={FOCUS[p.image]} fill sizes="(min-width: 1024px) 60vw, 100vw" />
        </motion.div>
        <span className="absolute left-5 top-5 rounded-full bg-ivory-50/95 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 shadow-card">{p.label}</span>
      </Reveal>
      <Reveal delay={0.1} className="relative -mt-12 ml-4 mr-4 rounded-3xl bg-ivory-50 p-7 shadow-lift md:ml-10 md:mr-0 md:p-9">
        <div className="flex items-start gap-5">
          <IconBadge icon={p.icon} size="lg" className="hidden sm:inline-flex" />
          <div>
            {p.kicker && <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-600">{p.kicker}</p>}
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink md:text-3xl">{p.title}</h3>
            <p className="mt-3 leading-relaxed text-ink/70">{p.text}</p>
            {p.link && (
              <Link to={p.link} className="group mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">
                <span className="border-b border-current pb-0.5">Learn more</span>
                <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </article>
  );
};

/*
 * Programme highlights, ISB "Discover & Experience" style: a sticky list of
 * programme names on the left that follows the photo cards scrolling on the right.
 */
const Highlights = ({ content }) => {
  const programmes = content.programmes || [];
  const [active, setActive] = useState(0);
  if (!programmes.length) return null;

  const jump = (i) => document.getElementById(`programme-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative bg-ivory-100 py-24 md:py-32">
      <Star8 className="pointer-events-none absolute -right-28 top-16 h-96 w-96 text-emerald-700/[0.06]" strokeWidth={0.8} />
      <div className="relative mx-auto grid max-w-site gap-12 px-4 md:px-8 lg:grid-cols-12">
        {/* Sticky side */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              {content.eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-eyebrow text-emerald-600">{content.eyebrow}</p>}
              <h2 className="font-display text-4xl font-bold leading-[1.08] text-ink md:text-5xl">{content.title}</h2>
            </Reveal>
            <ol className="mt-10 hidden border-l border-emerald-900/10 lg:block">
              {programmes.map((p, i) => (
                <li key={`${p.label}-${i}`}>
                  <button
                    onClick={() => jump(i)}
                    className={`relative -ml-px flex w-full items-baseline gap-4 border-l-2 py-3 pl-6 text-left transition-all duration-500 ${i === active ? "border-gold-500 text-emerald-800" : "border-transparent text-ink/40 hover:text-ink/70"}`}
                  >
                    <span className="font-display text-sm">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`font-display font-bold transition-all duration-500 ${i === active ? "text-2xl" : "text-lg"}`}>{p.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Scrolling programmes */}
        <div className="space-y-16 md:space-y-24 lg:col-span-8">
          {programmes.map((p, i) => <Programme key={`${p.label}-${i}`} p={p} i={i} onActive={setActive} />)}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
