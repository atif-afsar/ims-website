import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import IconBadge from "../../ui/IconBadge";
import SectionHeading from "../../ui/SectionHeading";
import { ArrowLink } from "../../ui/Button";
import { PatternBg, Sparkle } from "../../ui/Ornaments";

/* Value-based education + the pillars that make IMS different */
const ValuesSplit = ({ content }) => (
  <section className="bg-ivory-100">
    <div className="grid lg:grid-cols-[5fr_7fr]">
      <div className="relative flex items-center justify-center overflow-hidden bg-emerald-700 px-10 py-20 md:px-20">
        <PatternBg opacity={0.12} />
        <Sparkle className="absolute left-10 top-10 h-6 w-6 text-gold-300" />
        <Sparkle className="absolute bottom-16 right-12 h-4 w-4 text-gold-300/70" />
        {content.image && (
          <Reveal className="relative w-full max-w-sm">
            <div aria-hidden="true" className="absolute -inset-3 rounded-t-full rounded-b-[28px] border border-gold-500/70 md:-inset-4" />
            <SmartImg src={content.image} position="56% 30%" sizes="(min-width: 1024px) 384px, 80vw" className="aspect-[4/5] rounded-t-full rounded-b-[20px] shadow-lift" />
          </Reveal>
        )}
      </div>

      <div className="max-w-3xl px-6 py-20 md:px-16 lg:py-28">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} lede={content.lede} />
        </Reveal>
        <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {(content.pillars || []).map((p, i) => (
            <Reveal as="li" key={`${p.title}-${i}`} delay={i * 0.06} className="flex gap-4">
              <IconBadge icon={p.icon} />
              <div>
                <h3 className="font-display text-lg font-bold leading-snug text-ink">{p.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink/65">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        {content.linkText && content.link && (
          <Reveal delay={0.2}>
            <ArrowLink to={content.link} className="mt-12">{content.linkText}</ArrowLink>
          </Reveal>
        )}
      </div>
    </div>
  </section>
);

export default ValuesSplit;
