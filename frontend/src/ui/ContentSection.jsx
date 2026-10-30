import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { PatternBg } from "./Ornaments";

const tones = {
  ivory: "bg-ivory-50",
  sand: "bg-ivory-100",
  emerald: "bg-emerald-800",
};

/*
 * One anchored section of an inner page. `scroll-mt` keeps the heading clear
 * of the sticky header + section nav when jumping to #id.
 */
const ContentSection = ({ id, eyebrow, title, lede, tone = "ivory", align = "left", children, className = "" }) => (
  <section id={id} className={`relative scroll-mt-36 overflow-hidden py-20 md:py-28 ${tones[tone]} ${className}`}>
    {tone === "emerald" && <PatternBg opacity={0.08} />}
    <div className="relative mx-auto max-w-site px-4 md:px-8">
      {title && (
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} lede={lede} align={align} tone={tone === "emerald" ? "light" : "dark"} />
        </Reveal>
      )}
      {children}
    </div>
  </section>
);

/* Readable body copy with consistent paragraph rhythm */
export const Prose = ({ children, className = "", tone = "dark" }) => (
  <div className={`max-w-[68ch] space-y-5 text-[17px] leading-[1.8] ${tone === "dark" ? "text-ink/75" : "text-ivory-100/85"} ${className}`}>{children}</div>
);

export default ContentSection;
