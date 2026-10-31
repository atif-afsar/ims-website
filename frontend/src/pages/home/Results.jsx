import Reveal from "../../ui/Reveal";
import CountUp from "../../ui/CountUp";
import SmartImg from "../../ui/SmartImg";
import { ArrowLink } from "../../ui/Button";
import { BlockShape, PatternBg } from "../../ui/Ornaments";

const initials = (name = "") => name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("");

const Topper = ({ t, i }) => (
  <Reveal delay={i * 0.07} className="group flex flex-col items-center text-center">
    <div className="relative">
      <div className="h-32 w-32 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 p-1 shadow-lift transition-transform duration-500 group-hover:-translate-y-1 md:h-36 md:w-36">
        {t.photo ? (
          <SmartImg src={t.photo} alt={t.name} sizes="144px" className="h-full w-full rounded-full ring-4 ring-ivory-50" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-700 font-display text-4xl font-bold text-gold-300 ring-4 ring-ivory-50" aria-hidden="true">
            {initials(t.name)}
          </div>
        )}
      </div>
      {t.score && <span className="absolute -right-3 top-1 rounded-full bg-emerald-700 px-3 py-1 font-display text-lg font-bold text-gold-300 shadow-card">{t.score}</span>}
    </div>
    <p className="mt-5 font-display text-lg font-bold text-ink">{t.name}</p>
    {t.detail && <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">{t.detail}</p>}
  </Reveal>
);

/* "IMS at a glance": key numbers on an emerald band, then the board toppers */
const Results = ({ content }) => {
  const stats = content.stats || [];
  return (
    <section className="bg-ivory-50">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-navy-900 py-24 text-ivory-50 md:py-28">
        <PatternBg opacity={0.06} />
        <BlockShape variant="petals" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 text-gold-400/10" />
        <div className="relative mx-auto max-w-site px-4 md:px-8">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              {content.eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-eyebrow text-gold-300">{content.eyebrow}</p>}
              <h2 className="font-display text-4xl font-bold leading-[1.08] md:text-6xl">{content.title}</h2>
            </div>
            {content.lede && <p className="text-lg leading-relaxed text-ivory-100/75 lg:col-span-5">{content.lede}</p>}
          </Reveal>

          {stats.length > 0 && (
            <dl className={`mt-16 grid grid-cols-2 gap-y-10 ${stats.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {stats.map((s, i) => (
                <Reveal key={`${s.label}-${i}`} delay={i * 0.08} className={`px-2 sm:px-6 ${i % 2 ? "border-l border-gold-300/25" : ""} ${i > 0 ? "lg:border-l lg:border-gold-300/25" : ""}`}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <CountUp value={s.value} className="block font-display text-5xl font-bold leading-none text-gold-400 md:text-7xl" />
                    <span className="mt-4 block text-sm font-medium uppercase tracking-[0.12em] text-ivory-100/75">{s.label}</span>
                  </dd>
                </Reveal>
              ))}
            </dl>
          )}
        </div>
      </div>

      {content.toppers?.length > 0 && (
        <div className="mx-auto max-w-site px-4 py-20 md:px-8 md:py-24">
          <Reveal className="mb-12 flex items-center gap-4">
            <span className="h-px flex-1 bg-gold-500/40" aria-hidden="true" />
            <p className="font-display text-xl font-bold text-emerald-800 md:text-2xl">Our Board Toppers</p>
            <span className="h-px flex-1 bg-gold-500/40" aria-hidden="true" />
          </Reveal>
          <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {content.toppers.map((t, i) => <Topper key={`${t.name}-${i}`} t={t} i={i} />)}
          </div>
          {content.linkText && content.link && (
            <div className="mt-14 text-center">
              <ArrowLink to={content.link}>{content.linkText}</ArrowLink>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Results;
