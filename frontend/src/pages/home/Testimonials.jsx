import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import Reveal from "../../ui/Reveal";
import SectionHeading from "../../ui/SectionHeading";
import { PatternBg } from "../../ui/Ornaments";

const initials = (name = "") => name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("");

/* Real quotes from Admin → Testimonials. Hidden when there are none. */
const Testimonials = ({ content, items = [] }) => {
  const [index, setIndex] = useState(0);
  const count = items.length;

  useEffect(() => {
    if (count < 2) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), 8000);
    return () => clearTimeout(timer);
  }, [index, count]);

  if (!count) return null;
  const t = items[index % count];

  return (
    <section className="relative overflow-hidden bg-emerald-800 py-24 text-ivory-50 md:py-32">
      <PatternBg opacity={0.08} />
      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
        <Reveal>
          <SectionHeading align="center" tone="light" eyebrow={content.eyebrow} title={content.title} />
        </Reveal>
        <div className="relative mt-14 min-h-[16rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure key={t.id ?? index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }}>
              <span className="block font-display text-7xl leading-none text-gold-400" aria-hidden="true">“</span>
              <blockquote className="mt-2 font-display text-2xl leading-relaxed md:text-3xl">{t.quote}</blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-4">
                {t.photo_url ? (
                  <img src={t.photo_url} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-gold-400" />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 font-display text-xl font-bold text-emerald-900" aria-hidden="true">{initials(t.name)}</span>
                )}
                <span className="text-left">
                  <span className="block font-semibold">{t.name}</span>
                  {t.role && <span className="text-sm text-gold-300">{t.role}</span>}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        {count > 1 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button onClick={() => setIndex((i) => (i - 1 + count) % count)} className="rounded-full border border-ivory-50/40 p-3 hover:bg-ivory-50/10" aria-label="Previous quote"><PiCaretLeft /></button>
            <div className="flex gap-2">
              {items.map((item, i) => (
                <button key={item.id ?? i} onClick={() => setIndex(i)} aria-label={`Quote ${i + 1}`} aria-current={i === index % count} className={`h-2 rounded-full transition-all ${i === index % count ? "w-8 bg-gold-400" : "w-2 bg-ivory-50/40"}`} />
              ))}
            </div>
            <button onClick={() => setIndex((i) => (i + 1) % count)} className="rounded-full border border-ivory-50/40 p-3 hover:bg-ivory-50/10" aria-label="Next quote"><PiCaretRight /></button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
