import { useRef } from "react";
import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import { Sparkle } from "../../ui/Ornaments";

/* Achievement stories in a row you can swipe or move with the arrows */
const Achievements = ({ content }) => {
  const items = content.items || [];
  const rail = useRef(null);
  if (!items.length) return null;

  const scroll = (dir) => {
    const el = rail.current;
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto max-w-site px-4 md:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            {content.eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-eyebrow text-emerald-600">{content.eyebrow}</p>}
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-ink md:text-6xl">{content.title}</h2>
          </div>
          {items.length > 1 && (
            <div className="flex gap-3">
              <button onClick={() => scroll(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-emerald-800/30 text-emerald-800 transition hover:bg-emerald-800 hover:text-ivory-50" aria-label="Previous story"><PiCaretLeft /></button>
              <button onClick={() => scroll(1)} className="grid h-12 w-12 place-items-center rounded-full bg-emerald-800 text-ivory-50 transition hover:bg-gold-400 hover:text-emerald-900" aria-label="Next story"><PiCaretRight /></button>
            </div>
          )}
        </Reveal>
      </div>

      {/* The rail starts in line with the page content and runs to the screen edge */}
      <ul
        ref={rail}
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:none] scroll-px-4 md:px-8 md:scroll-px-8 xl:px-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))] xl:scroll-px-[max(2rem,calc((100vw_-_1280px)/2_+_2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((a, i) => {
          const Card = a.link ? Link : "div";
          return (
            <li key={`${a.title}-${i}`} className="w-[85%] shrink-0 snap-start sm:w-[26rem]">
              <Reveal delay={Math.min(i, 3) * 0.08} className="h-full">
                <Card {...(a.link ? { to: a.link } : {})} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-ivory-50 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <SmartImg src={a.image} alt={a.title} fill sizes="(min-width: 640px) 416px, 85vw" className="transition-transform duration-700 group-hover:scale-105" />
                    {a.tag && (
                      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-emerald-900 shadow-card">
                        <Sparkle className="h-3 w-3" /> {a.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl font-bold leading-snug text-ink">{a.title}</h3>
                    <p className="mt-3 line-clamp-4 flex-1 leading-relaxed text-ink/70">{a.text}</p>
                    {a.link && (
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">
                        Read more <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </Card>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Achievements;
