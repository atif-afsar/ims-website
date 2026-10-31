import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import IconBadge from "../../ui/IconBadge";
import { ArrowLink } from "../../ui/Button";
import { BlockShape, GoldDivider } from "../../ui/Ornaments";

/*
 * "What makes IMS different": heading row, then a grid with the arch photo
 * and one numbered card per pillar. Cards turn emerald on hover.
 */
const ValuesSplit = ({ content }) => {
  const pillars = content.pillars || [];
  return (
    <section className="relative overflow-hidden bg-ivory-100 py-24 md:py-32">
      <div className="relative mx-auto max-w-site px-4 md:px-8">
        {/* Heading row */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            {content.eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-eyebrow text-emerald-600">{content.eyebrow}</p>}
            <h2 className="text-balance font-display text-4xl font-bold leading-[1.08] text-ink md:text-6xl">{content.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <GoldDivider className="mb-6 hidden lg:flex" />
            {content.lede && <p className="text-lg leading-relaxed text-ink/70">{content.lede}</p>}
            {content.linkText && content.link && <ArrowLink to={content.link} className="mt-6">{content.linkText}</ArrowLink>}
          </Reveal>
        </div>

        {/* Photo + pillar cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {content.image && (
            <Reveal variant="wipe" className="relative min-h-[22rem] overflow-hidden rounded-t-[999px] rounded-b-3xl sm:col-span-2 lg:col-span-1 lg:row-span-2">
              <SmartImg src={content.image} fill position="56% 30%" sizes="(min-width: 1024px) 25vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent" aria-hidden="true" />
              <BlockShape variant="star" className="absolute bottom-5 left-5 h-12 w-12 text-gold-400" />
            </Reveal>
          )}
          {pillars.map((p, i) => (
            <Reveal key={`${p.title}-${i}`} delay={(i % 3) * 0.08} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ivory-50 p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-lift">
                <BlockShape
                  variant={["arches", "petals", "dome"][i % 3]}
                  className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 text-gold-400/0 transition-all duration-700 group-hover:-bottom-4 group-hover:-right-4 group-hover:text-gold-400/25"
                />
                <div className="flex items-start justify-between">
                  <IconBadge icon={p.icon} />
                  <span className="font-display text-3xl font-bold text-gold-500/50 transition-colors group-hover:text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-ivory-50">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65 transition-colors group-hover:text-ivory-100/85">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSplit;
