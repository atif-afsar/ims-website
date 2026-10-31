import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { overview, facilities, facilityOrder } from "../../content/campus";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import Reveal from "../../ui/Reveal";
import Img from "../../ui/Img";
import PhotoStrip from "../../ui/PhotoStrip";
import IconBadge from "../../ui/IconBadge";
import { IconList } from "../../ui/Blocks";

const sections = [
  { id: "fac-land-building", label: "Land & Building" },
  { id: "fac-labs", label: "Laboratories" },
  { id: "fac-other", label: "Additional Facilities" },
  { id: "fac-explore", label: "Explore" },
];

export const FacilityCards = ({ exclude }) => (
  <div className={`mt-12 grid gap-4 sm:grid-cols-2 ${exclude ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
    {facilityOrder.filter((slug) => slug !== exclude).map((slug, i) => {
      const f = facilities[slug];
      return (
        <Reveal key={slug} delay={i * 0.06}>
          <Link to={`/infrastructure/${slug}`} className="group relative block h-80 overflow-hidden rounded-t-[140px] rounded-b-2xl">
            <Img name={f.heroImage} position={f.heroPosition} fill sizes="(min-width: 1024px) 25vw, 50vw" className="transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/20 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="mb-3 block h-px w-10 bg-gold-400 transition-all duration-500 group-hover:w-16" aria-hidden="true" />
              <h3 className="flex items-end justify-between gap-2 font-display text-2xl font-bold text-ivory-50">
                {f.title}
                <HiArrowRight className="shrink-0 text-lg transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </h3>
            </div>
          </Link>
        </Reveal>
      );
    })}
  </div>
);

const CampusPage = () => (
  <>
    <SEOHelmet />
    <PageHero
      eyebrow="Campus"
      title="A Campus Built for Learning"
      lede={overview.intro}
      crumbs={[{ label: "Campus" }]}
      image="campus-aerial-front"
      imagePosition="45% 50%"
    />
    <SectionNav items={sections} />

    <ContentSection id="fac-land-building" eyebrow="01" title="Land & Building">
      <Reveal className="mt-8"><Prose><p>{overview.building}</p></Prose></Reveal>
      <PhotoStrip names={["campus-aerial-front", "campus-aerial", "campus-corridor"]} className="mt-12" />
    </ContentSection>

    <ContentSection id="fac-labs" tone="sand" eyebrow="02 · Where Theory Meets Experiment" title="Laboratories" lede={overview.labsIntro}>
      <div className="mt-14 space-y-6">
        {overview.labs.map((lab, i) => (
          <Reveal key={lab.title} className={`grid overflow-hidden rounded-3xl bg-ivory-50 shadow-card ${i % 2 ? "md:grid-cols-[7fr_5fr]" : "md:grid-cols-[5fr_7fr]"}`}>
            {/* Several lab photos are small originals, so the column stays narrow */}
            <Img name={lab.image} sizes="(min-width: 768px) 40vw, 100vw" className={`aspect-[4/3] md:h-full md:max-h-[340px] md:aspect-auto ${i % 2 ? "md:order-2" : ""}`} />
            <div className="flex flex-col justify-center p-8 md:p-12">
              <IconBadge icon={lab.icon} />
              <h3 className="mt-5 font-display text-2xl font-bold text-ink md:text-3xl">{lab.title}</h3>
              <p className="mt-1 font-display italic text-gold-600">{lab.tagline}</p>
              <p className="mt-4 leading-relaxed text-ink/70">{lab.text}</p>
              {lab.to && <Link to={lab.to} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Learn more <HiArrowRight /></Link>}
            </div>
          </Reveal>
        ))}
      </div>
    </ContentSection>

    <ContentSection id="fac-other" eyebrow="03" title="Additional Facilities">
      <IconList items={overview.additional} cols={3} />
    </ContentSection>

    <ContentSection id="fac-explore" tone="emerald" eyebrow="04" title="Explore Our Facilities" lede="Step inside each space for photos and details." align="center">
      <FacilityCards />
    </ContentSection>
  </>
);

export default CampusPage;
