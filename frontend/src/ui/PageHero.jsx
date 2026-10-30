import { Link } from "react-router";
import { PiCaretRight } from "react-icons/pi";
import Img from "./Img";
import { PatternBg, Sparkle, Star8 } from "./Ornaments";

/*
 * Banner for inner pages: breadcrumb, eyebrow, serif title and lede on
 * emerald, with optional buttons and an arch-framed photo on the right.
 */
const PageHero = ({ eyebrow, title, lede, image, imagePosition, crumbs = [], actions }) => (
  <section className="relative overflow-hidden bg-emerald-800 text-ivory-50">
    <PatternBg opacity={0.09} />
    <Star8 className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 text-gold-300/10" strokeWidth={0.7} />
    <div className={`relative mx-auto grid max-w-site items-center gap-12 px-4 py-16 md:px-8 md:py-20 ${image ? "lg:grid-cols-[1fr_380px]" : ""}`}>
      <div>
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-xs font-medium text-ivory-100/70">
          <Link to="/" className="hover:text-gold-300">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <PiCaretRight aria-hidden="true" />
              {c.to ? <Link to={c.to} className="hover:text-gold-300">{c.label}</Link> : <span className="text-gold-300">{c.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && (
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300">
            <Sparkle className="h-3 w-3" /> {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold leading-[1.08] md:text-6xl">{title}</h1>
        {lede && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory-100/80">{lede}</p>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
      {image && (
        <div className="relative mx-auto hidden w-full max-w-[340px] lg:block">
          <div aria-hidden="true" className="absolute -inset-3 rounded-t-full rounded-b-[28px] border border-gold-400/60" />
          <Img name={image} position={imagePosition} priority sizes="340px" className="aspect-[4/5] rounded-t-full rounded-b-[20px]" />
        </div>
      )}
    </div>
  </section>
);

export default PageHero;
