import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import SectionHeading from "../../ui/SectionHeading";
import { ArrowLink } from "../../ui/Button";
import { PatternBg, Sparkle } from "../../ui/Ornaments";

const STAT_TONES = [
  "bg-emerald-700 text-ivory-50",
  "bg-gold-400 text-emerald-800",
  "bg-navy-900 text-ivory-50",
  "bg-ivory-50 text-emerald-800 ring-1 ring-gold-500/50",
];

const initials = (name = "") => name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("");

const Topper = ({ t, i }) => (
  <Reveal delay={i * 0.07} className="flex flex-col items-center text-center">
    <div className="relative">
      <div className="h-32 w-32 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 p-1 shadow-lift md:h-36 md:w-36">
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

const Results = ({ content }) => (
  <section className="relative overflow-hidden bg-ivory-50 py-24 md:py-32">
    <PatternBg opacity={0.05} />
    <div className="relative mx-auto max-w-site px-4 md:px-8">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-5">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} lede={content.lede} />
        </Reveal>
        <div className="grid grid-cols-2 gap-3 lg:col-span-7">
          {(content.stats || []).map((s, i) => (
            <Reveal key={`${s.label}-${i}`} delay={i * 0.06} className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${STAT_TONES[i % STAT_TONES.length]}`}>
              <Sparkle className="absolute right-5 top-5 h-4 w-4 opacity-40" />
              <p className="font-display text-4xl font-bold md:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm font-medium opacity-80">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {content.toppers?.length > 0 && (
        <div className="mt-20 grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {content.toppers.map((t, i) => <Topper key={`${t.name}-${i}`} t={t} i={i} />)}
        </div>
      )}
      {content.linkText && content.link && (
        <div className="mt-14 text-center">
          <ArrowLink to={content.link}>{content.linkText}</ArrowLink>
        </div>
      )}
    </div>
  </section>
);

export default Results;
