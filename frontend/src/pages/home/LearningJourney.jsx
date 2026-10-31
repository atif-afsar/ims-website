import { useState } from "react";
import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import Button from "../../ui/Button";
import { PatternBg } from "../../ui/Ornaments";

// Faces sit in different places in each library photo
const FOCUS = {
  "media:pre-primary-2": "38% 70%",
  "media:summer-camp-2025-img-20250610-wa0016": "50% 30%",
  "media:science-exhibition-9": "42% 35%",
  "media:robotics-lab-3": "38% 45%",
  "media:chemistry-lab-img-2659": "50% 25%",
};

const linkOf = (s) => (s.group ? `/classes?group=${s.group}` : "/classes");

/*
 * Stages from Play Group to Class XII. Desktop: panels side by side, the
 * hovered (or focused) one widens to show its details. Phones: stacked cards.
 */
const LearningJourney = ({ content }) => {
  const stages = content.stages || [];
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-emerald-900 py-24 md:py-32">
      <PatternBg opacity={0.06} />
      <div className="relative mx-auto max-w-site px-4 md:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            {content.eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-eyebrow text-gold-300">{content.eyebrow}</p>}
            <h2 className="font-display text-4xl font-bold leading-[1.08] text-ivory-50 md:text-6xl">{content.title}</h2>
          </div>
          {content.buttonText && <Button to="/classes" className="self-start md:self-auto">{content.buttonText}</Button>}
        </Reveal>

        {/* Desktop: expanding panels */}
        <Reveal delay={0.1} className="mt-14 hidden h-[34rem] gap-3 lg:flex">
          {stages.map((s, i) => {
            const open = i === active;
            return (
              <Link
                key={`${s.title}-${i}`}
                to={linkOf(s)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative min-w-0 overflow-hidden rounded-t-[999px] rounded-b-3xl transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "flex-[3]" : "flex-[1]"}`}
              >
                <SmartImg src={s.image} position={FOCUS[s.image]} sizes="(min-width: 1024px) 45vw, 100vw" fill className={`transition-transform duration-1000 ${open ? "scale-100" : "scale-110"}`} />
                <div className={`absolute inset-0 transition-colors duration-700 ${open ? "bg-gradient-to-t from-emerald-950/90 via-emerald-900/20 to-transparent" : "bg-emerald-900/55"}`} aria-hidden="true" />
                <span className={`absolute left-1/2 top-[18%] -translate-x-1/2 font-display text-5xl font-bold text-gold-300/90 transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}>{String(i + 1).padStart(2, "0")}</span>

                {/* Collapsed: vertical title */}
                <span className={`absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-2xl font-bold text-ivory-50 transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 ${open ? "opacity-0" : "opacity-100"}`}>
                  {s.title}
                </span>

                {/* Open: details */}
                <div className={`absolute inset-x-0 bottom-0 p-8 transition-all duration-500 ${open ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-0"}`}>
                  <span className="mb-4 block h-px w-14 bg-gold-400" aria-hidden="true" />
                  <h3 className="whitespace-nowrap font-display text-4xl font-bold text-ivory-50">{s.title}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">{s.grades}</p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-ivory-50 px-5 py-2.5 text-sm font-semibold text-emerald-900 transition group-hover:bg-gold-400">
                    Explore {s.title} <HiArrowRight aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </Reveal>

        {/* Phones and tablets: cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden">
          {stages.map((s, i) => (
            <Reveal key={`${s.title}-${i}`} delay={(i % 2) * 0.08}>
              <Link to={linkOf(s)} className="group relative block h-72 overflow-hidden rounded-t-[160px] rounded-b-2xl">
                <SmartImg src={s.image} position={FOCUS[s.image]} sizes="(min-width: 640px) 50vw, 100vw" fill className="transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/25 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="font-display text-sm font-bold text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-2xl font-bold text-ivory-50">{s.title}</h3>
                  <p className="mt-1 flex items-end justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">
                    {s.grades}
                    <HiArrowRight className="shrink-0 text-base text-ivory-50 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;
