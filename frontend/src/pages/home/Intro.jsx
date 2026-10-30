import { Fragment } from "react";
import Reveal from "../../ui/Reveal";
import { Star8, Sparkle } from "../../ui/Ornaments";
import { PiBookOpenText, PiMosque, PiGraduationCap } from "react-icons/pi";

/* Inline glyph between words, like the shapes in ISB's intro line */
const GLYPHS = {
  mosque: { Icon: PiMosque, tone: "bg-emerald-700 text-ivory-50" },
  book: { Icon: PiBookOpenText, tone: "bg-gold-400 text-emerald-800" },
  cap: { Icon: PiGraduationCap, tone: "bg-navy-900 text-gold-300" },
};

/* Turns "a *word* {mosque} b" into text, emerald emphasis and round icons */
const renderStatement = (text = "") =>
  text.split(/(\*[^*]+\*|\{(?:mosque|book|cap)\})/g).map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) return <span key={i} className="italic text-emerald-700">{part.slice(1, -1)}</span>;
    const glyph = part.match(/^\{(\w+)\}$/)?.[1];
    if (glyph) {
      const { Icon, tone } = GLYPHS[glyph];
      return (
        <span key={i} className={`mx-1 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full align-baseline text-lg md:h-11 md:w-11 md:text-xl ${tone}`} aria-hidden="true">
          <Icon />
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });

const Intro = ({ content }) => (
  <section className="relative overflow-hidden bg-ivory-50 py-24 md:py-32">
    <Star8 className="pointer-events-none absolute -left-20 top-10 h-72 w-72 text-gold-500/10" strokeWidth={0.8} />
    <div className="relative mx-auto max-w-5xl px-4 md:px-8">
      <Reveal>
        <p className="font-display text-[1.7rem] leading-[1.55] text-ink/85 md:text-[2.5rem] md:leading-[1.5]">{renderStatement(content.text)}</p>
      </Reveal>
      {content.tagline && (
        <Reveal delay={0.15} className="mt-10 flex items-center gap-3 text-sm font-semibold uppercase tracking-eyebrow text-gold-600">
          <Sparkle className="h-3 w-3" /> {content.tagline}
        </Reveal>
      )}
    </div>
  </section>
);

export default Intro;
