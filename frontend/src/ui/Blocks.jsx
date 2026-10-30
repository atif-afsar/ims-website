/*
 * Content blocks shared by inner pages: quotes, timeline, people cards,
 * comparison table and fact tiles.
 */
import Reveal from "./Reveal";
import Img from "./Img";
import { Sparkle, Star8 } from "./Ornaments";
import IconBadge from "./IconBadge";

/* Arabic text (hadith, verse) with its translation */
export const ArabicQuote = ({ arabic, translation, source, tone = "light" }) => (
  <figure className={`relative mx-auto max-w-3xl text-center ${tone === "light" ? "text-ivory-50" : "text-ink"}`}>
    <Star8 className={`mx-auto mb-6 h-10 w-10 ${tone === "light" ? "text-gold-300" : "text-gold-500"}`} strokeWidth={4} />
    <blockquote>
      <p lang="ar" dir="rtl" className={`font-arabic text-3xl leading-loose md:text-5xl ${tone === "light" ? "text-gold-300" : "text-emerald-700"}`}>{arabic}</p>
      <p className="mt-6 font-display text-xl italic leading-relaxed md:text-2xl">“{translation}”</p>
    </blockquote>
    {source && <figcaption className={`mt-4 text-xs font-semibold uppercase tracking-eyebrow ${tone === "light" ? "text-ivory-100/60" : "text-gold-600"}`}>{source}</figcaption>}
  </figure>
);

/* Large serif pull-quote */
export const PullQuote = ({ children, className = "" }) => (
  <blockquote className={`relative border-l-4 border-gold-400 py-2 pl-8 font-display text-2xl italic leading-snug text-emerald-800 md:text-3xl ${className}`}>
    {children}
  </blockquote>
);

/*
 * Vertical timeline. items: [{ when, title, body, image? }]
 */
export const Timeline = ({ items }) => (
  <ol className="relative mt-16 space-y-14 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-gold-500/50 md:before:left-1/2">
    {items.map((item, i) => {
      const right = i % 2 === 1;
      return (
        <Reveal as="li" key={item.title} className="relative grid gap-6 pl-14 md:grid-cols-2 md:gap-16 md:pl-0">
          <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-gold-300 ring-4 ring-ivory-50 md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
            <Sparkle className="h-4 w-4" />
          </span>
          <div className={`${right ? "md:order-2 md:pl-4" : "md:pr-4 md:text-right"}`}>
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-gold-600">{item.when}</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">{item.title}</h3>
            <div className={`mt-4 space-y-3 leading-relaxed text-ink/70 ${right ? "" : "md:ml-auto"} max-w-xl`}>{item.body}</div>
          </div>
          <div className={right ? "md:order-1" : ""}>
            {item.image && <Img name={item.image} position={item.position} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[16/10] rounded-2xl shadow-card" />}
          </div>
        </Reveal>
      );
    })}
  </ol>
);

const initials = (name) =>
  name
    .split(/\s+/)
    // Skip titles and the common "Md." / "Mohd." abbreviation of Muhammad
    .filter((w) => w && !/^(prof|dr|md|mohd|mr|mrs|er)\.?$/i.test(w))
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

/* Person card with photo or monogram */
export const PersonCard = ({ name, role, detail, note, photo, index = 0 }) => (
  <Reveal delay={(index % 4) * 0.06} className="group relative flex flex-col items-center rounded-2xl border border-gold-500/30 bg-ivory-50 px-6 pb-8 pt-10 text-center shadow-card">
    <div className="h-28 w-28 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 p-1">
      {photo ? (
        <img src={photo} alt={name} loading="lazy" className="h-full w-full rounded-full object-cover ring-4 ring-ivory-50" />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-emerald-700 font-display text-3xl font-bold text-gold-300 ring-4 ring-ivory-50" aria-hidden="true">
          {initials(name)}
        </span>
      )}
    </div>
    <p className="mt-5 text-xs font-semibold uppercase tracking-eyebrow text-gold-600">{role}</p>
    <h3 className="mt-2 font-display text-xl font-bold text-ink">{name}</h3>
    {detail && <p className="mt-1 text-sm text-ink/60">{detail}</p>}
    {note && <p className="mt-3 text-sm italic text-emerald-700">{note}</p>}
  </Reveal>
);

/* Two-column comparison. rows: [[left, right], ...] */
export const Comparison = ({ leftTitle, rightTitle, rows }) => (
  <div className="mt-14 overflow-hidden rounded-3xl border border-gold-500/40 shadow-card">
    <div className="grid grid-cols-2">
      <div className="bg-ivory-200 px-5 py-5 font-display text-lg font-bold text-ink md:px-8 md:text-2xl">{leftTitle}</div>
      <div className="bg-emerald-700 px-5 py-5 font-display text-lg font-bold text-gold-300 md:px-8 md:text-2xl">{rightTitle}</div>
    </div>
    {rows.map(([left, right], i) => (
      <Reveal key={typeof left === "string" ? left : i} delay={i * 0.04} className="grid grid-cols-2 border-t border-gold-500/25">
        <div className="bg-ivory-50 px-5 py-4 text-ink/70 md:px-8 md:py-5">{left}</div>
        <div className="flex items-start gap-3 bg-emerald-50 px-5 py-4 font-medium text-emerald-800 md:px-8 md:py-5">
          <Sparkle className="mt-1.5 h-3 w-3 shrink-0 text-gold-500" />
          <span className="min-w-0">{right}</span>
        </div>
      </Reveal>
    ))}
  </div>
);

/* Highlighted fact tile, e.g. affiliation number */
export const FactTile = ({ label, value, tone = "emerald", size = "md" }) => {
  const tones = {
    emerald: "bg-emerald-700 text-ivory-50",
    gold: "bg-gold-400 text-emerald-800",
    ivory: "bg-ivory-50 text-emerald-800 ring-1 ring-gold-500/50",
  };
  return (
    <div className={`rounded-2xl p-6 ${tones[tone]}`}>
      <p className="text-xs font-semibold uppercase tracking-eyebrow opacity-75">{label}</p>
      <p className={`mt-3 whitespace-nowrap font-display font-bold ${size === "lg" ? "text-6xl" : "text-2xl"}`}>{value}</p>
    </div>
  );
};

/* Icon + title + text items. items: [{ icon, title, text }] */
export const IconList = ({ items, cols = 2, tone = "dark" }) => (
  <ul className={`mt-10 grid gap-x-10 gap-y-8 ${cols === 3 ? "md:grid-cols-3" : cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"}`}>
    {items.map((item, i) => (
      <Reveal as="li" key={item.title} delay={(i % 4) * 0.06} className="flex gap-4">
        <IconBadge icon={item.icon} />
        <div>
          <h3 className={`font-display text-lg font-bold leading-snug ${tone === "dark" ? "text-ink" : "text-ivory-50"}`}>{item.title}</h3>
          {item.text && <p className={`mt-1.5 leading-relaxed ${tone === "dark" ? "text-ink/70" : "text-ivory-100/80"}`}>{item.text}</p>}
        </div>
      </Reveal>
    ))}
  </ul>
);

/* Numbered process steps. items: [{ title, text }] */
export const Steps = ({ items }) => (
  <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {items.map((step, i) => (
      <Reveal as="li" key={step.title} delay={i * 0.08} className="relative rounded-2xl border border-gold-500/30 bg-ivory-50 p-7 shadow-card">
        <span className="font-display text-5xl font-bold text-gold-400">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="mt-4 font-display text-xl font-bold text-ink">{step.title}</h3>
        <p className="mt-2 leading-relaxed text-ink/70">{step.text}</p>
      </Reveal>
    ))}
  </ol>
);

/* Card with heading, tagline and a list of tags. */
export const TagCard = ({ title, tagline, tags = [], index = 0, tone = "ivory" }) => (
  <Reveal delay={(index % 4) * 0.06} className={`flex h-full flex-col rounded-2xl p-7 ${tone === "emerald" ? "bg-emerald-700 text-ivory-50" : "border border-gold-500/30 bg-ivory-50 shadow-card"}`}>
    <h3 className={`font-display text-xl font-bold leading-snug ${tone === "emerald" ? "text-ivory-50" : "text-ink"}`}>{title}</h3>
    {tagline && <p className={`mt-1 text-sm italic ${tone === "emerald" ? "text-gold-300" : "text-gold-600"}`}>{tagline}</p>}
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className={`rounded-full px-3 py-1.5 text-sm ${tone === "emerald" ? "bg-ivory-50/10 text-ivory-50" : "bg-emerald-50 text-emerald-800"}`}>{t}</li>
      ))}
    </ul>
  </Reveal>
);
