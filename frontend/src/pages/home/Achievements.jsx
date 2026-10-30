import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import SectionHeading from "../../ui/SectionHeading";
import { Sparkle } from "../../ui/Ornaments";

/* Achievement cards: photo with a gold label, headline and short story */
const Achievements = ({ content }) => {
  const items = content.items || [];
  if (!items.length) return null;
  return (
    <section className="bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto max-w-site px-4 md:px-8">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>
        <div className={`mt-14 grid gap-6 ${items.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((a, i) => {
            const Card = a.link ? Link : "div";
            return (
              <Reveal key={`${a.title}-${i}`} delay={i * 0.08}>
                <Card {...(a.link ? { to: a.link } : {})} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-ivory-50 shadow-card transition-shadow hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SmartImg src={a.image} alt={a.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                    {a.tag && (
                      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-emerald-900 shadow-card">
                        <Sparkle className="h-3 w-3" /> {a.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="font-display text-2xl font-bold leading-snug text-ink">{a.title}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-ink/70">{a.text}</p>
                    {a.link && (
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                        Read more <HiArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
