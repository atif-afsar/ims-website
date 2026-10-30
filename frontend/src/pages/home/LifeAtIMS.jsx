import { Link } from "react-router";
import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import SectionHeading from "../../ui/SectionHeading";
import Button from "../../ui/Button";

/* Grid placement by position: the first tile is large, the sixth is wide */
const SPANS = { 0: "md:col-span-2 md:row-span-2", 5: "md:col-span-2" };

/* Photo mosaic of real school life, linking to the gallery */
const LifeAtIMS = ({ content }) => (
  <section className="bg-ivory-100 py-24 md:py-32">
    <div className="mx-auto max-w-site px-4 md:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>
        <Reveal delay={0.1}>
          <Button to="/gallery" variant="outline">View Gallery</Button>
        </Reveal>
      </div>
      <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
        {(content.tiles || []).map((t, i) => (
          <Reveal key={`${t.label}-${i}`} delay={(i % 4) * 0.06} className={SPANS[i] || ""}>
            <Link to="/gallery" className="group relative block h-full overflow-hidden rounded-2xl">
              <SmartImg src={t.image} alt={t.label} sizes="(min-width: 768px) 50vw, 50vw" fill className="transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              <p className="absolute bottom-3 left-3 right-3 font-display text-sm font-semibold leading-snug text-ivory-50 md:bottom-4 md:left-4 md:right-4 md:text-lg">{t.label}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default LifeAtIMS;
