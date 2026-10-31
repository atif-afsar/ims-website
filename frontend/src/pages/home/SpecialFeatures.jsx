import Reveal from "../../ui/Reveal";
import IconBadge from "../../ui/IconBadge";
import { BlockShape, PatternBg, Sparkle } from "../../ui/Ornaments";

/*
 * The poster's "Special Features": every feature visible at once as a card
 * grid on emerald. Cards come in one after another and lift on hover.
 */
const SpecialFeatures = ({ content }) => {
  const items = content.items || [];
  if (!items.length) return null;

  return (
    <section className="relative overflow-hidden bg-emerald-800 py-20 md:py-28">
      <PatternBg opacity={0.07} />
      <BlockShape variant="star" className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 text-gold-400/[0.06]" />
      <div className="relative mx-auto max-w-site px-4 md:px-8">
        <Reveal className="grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-14">
          <h2 className="flex items-center gap-3 font-display text-4xl font-bold text-ivory-50 md:text-6xl">
            <Sparkle className="h-6 w-6 shrink-0 text-gold-400 md:h-8 md:w-8" /> {content.title}
          </h2>
          {content.intro && <p className="max-w-xl text-lg leading-relaxed text-ivory-100/75">{content.intro}</p>}
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((f, i) => (
            <Reveal as="li" key={`${f.title}-${i}`} delay={Math.min(i, 11) * 0.05} y={20}>
              <div className="group flex h-full items-center gap-4 rounded-2xl bg-ivory-50/[0.06] p-4 ring-1 ring-gold-300/20 transition-all duration-300 hover:-translate-y-1 hover:bg-ivory-50/[0.12] hover:ring-gold-300/50">
                <IconBadge icon={f.icon} className="!bg-gold-400 !text-emerald-900 !ring-0 transition-transform duration-300 group-hover:scale-110" />
                <span className="min-w-0">
                  <span className="block font-semibold leading-snug text-ivory-50">{f.title}</span>
                  {f.detail && <span className="mt-0.5 block text-xs font-semibold uppercase tracking-[0.12em] text-gold-300">{f.detail}</span>}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SpecialFeatures;
