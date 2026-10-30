import { GoldDivider } from "./Ornaments";

/* Eyebrow + serif heading + optional lede, the standard section opener */
const SectionHeading = ({ eyebrow, title, lede, align = "left", tone = "dark", className = "", as: Tag = "h2" }) => {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`mb-4 text-xs font-semibold uppercase tracking-eyebrow ${dark ? "text-emerald-600" : "text-gold-300"}`}>
          {eyebrow}
        </p>
      )}
      <Tag className={`font-display text-4xl font-bold leading-[1.1] md:text-5xl ${dark ? "text-ink" : "text-ivory-50"}`}>
        {title}
      </Tag>
      <GoldDivider className={`mt-6 ${centered ? "justify-center" : ""}`} tone={dark ? "gold" : "light"} />
      {lede && <p className={`mt-6 text-lg leading-relaxed ${dark ? "text-ink/70" : "text-ivory-100/80"}`}>{lede}</p>}
    </div>
  );
};

export default SectionHeading;
