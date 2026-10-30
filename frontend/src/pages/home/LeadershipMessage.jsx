import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import { PatternBg, Star8 } from "../../ui/Ornaments";

/* Message from the director/principal. Renders nothing until a message is written. */
const LeadershipMessage = ({ content }) => {
  if (!content.message?.trim()) return null;
  const paragraphs = content.message.split(/\n\s*\n/);
  return (
    <section className="relative overflow-hidden bg-ivory-50 py-24 md:py-32">
      <PatternBg opacity={0.05} />
      <div className="relative mx-auto grid max-w-site items-center gap-14 px-4 md:px-8 lg:grid-cols-[360px_1fr]">
        {content.photo && (
          <Reveal className="relative mx-auto w-full max-w-xs">
            <div aria-hidden="true" className="absolute -inset-3 rounded-t-full rounded-b-[28px] border border-gold-500/70" />
            <SmartImg src={content.photo} alt={content.name} sizes="320px" className="aspect-[4/5] rounded-t-full rounded-b-[20px] shadow-lift" />
          </Reveal>
        )}
        <Reveal delay={0.1} className={content.photo ? "" : "lg:col-span-2 mx-auto max-w-3xl"}>
          <p className="text-xs font-semibold uppercase tracking-eyebrow text-emerald-600">{content.eyebrow}</p>
          <Star8 className="mt-6 h-10 w-10 text-gold-500" strokeWidth={4} />
          <blockquote className="mt-6 space-y-5 font-display text-xl leading-relaxed text-ink/85 md:text-2xl">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </blockquote>
          {(content.name || content.role) && (
            <footer className="mt-8 border-l-4 border-gold-400 pl-5">
              {content.name && <p className="font-display text-xl font-bold text-ink">{content.name}</p>}
              {content.role && <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-600">{content.role}</p>}
            </footer>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default LeadershipMessage;
