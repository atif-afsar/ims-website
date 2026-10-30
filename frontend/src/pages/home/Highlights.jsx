import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import SectionHeading from "../../ui/SectionHeading";
import IconBadge from "../../ui/IconBadge";
import Button from "../../ui/Button";
import { Star8 } from "../../ui/Ornaments";

// Faces sit in different places in each library photo
const FOCUS = {
  "media:science-exhibition-7": "40% 50%",
  "media:science-exhibition-6": "50% 60%",
  "media:student-speech-2": "50% 30%",
};

const Highlights = ({ content }) => {
  const programmes = content.programmes || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = programmes[Math.min(activeIndex, programmes.length - 1)];
  if (!active) return null;

  return (
    <section className="relative overflow-hidden bg-ivory-100 py-24 md:py-32">
      <Star8 className="pointer-events-none absolute -right-28 top-16 h-96 w-96 text-emerald-700/[0.06]" strokeWidth={0.8} />
      <div className="relative mx-auto max-w-site px-4 md:px-8">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div role="tablist" aria-label="Programmes" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
            {programmes.map((p, i) => {
              const selected = p === active;
              return (
                <button
                  key={`${p.label}-${i}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="programme-panel"
                  onClick={() => setActiveIndex(i)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                    selected ? "border-emerald-700 bg-emerald-700 text-ivory-50 shadow-card" : "border-emerald-700/20 text-ink/70 hover:border-emerald-700/60 hover:text-emerald-700"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div id="programme-panel" role="tabpanel" className="relative mt-10 lg:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${active.label}-${activeIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center lg:grid-cols-12"
            >
              <div className="lg:col-start-1 lg:col-end-9 lg:row-start-1">
                <SmartImg src={active.image} position={FOCUS[active.image]} sizes="(min-width: 1024px) 66vw, 100vw" className="aspect-[16/10] rounded-2xl shadow-lift" />
              </div>
              <div className="relative z-10 mx-4 -mt-16 lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mx-0 lg:mt-0">
                <div className="rounded-2xl border-t-4 border-gold-400 bg-ivory-50 p-8 shadow-lift md:p-10">
                  <IconBadge icon={active.icon} size="lg" />
                  <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-ink">{active.title}</h3>
                  {active.kicker && (
                    <p className="mt-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">
                      <span className="h-px w-8 bg-gold-500" aria-hidden="true" /> {active.kicker}
                    </p>
                  )}
                  <p className="mt-5 leading-relaxed text-ink/70">{active.text}</p>
                  {active.link && <Button to={active.link} variant="emerald" className="mt-8">Learn more</Button>}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
