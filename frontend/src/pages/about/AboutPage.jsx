import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { introduction, vision, mission, historyTitle, history, governanceIntro, affiliation } from "../../content/about";
import { useBoardMembers } from "../../hooks/useBoardMembers";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import ArchFrame from "../../ui/ArchFrame";
import Reveal from "../../ui/Reveal";
import { PersonCard, FactTile } from "../../ui/Blocks";
import { Sparkle } from "../../ui/Ornaments";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "vision-mission", label: "Vision & Mission" },
  { id: "brief-history", label: "Our History" },
  { id: "board-members", label: "Board Members" },
  { id: "affiliation", label: "Affiliation" },
];

const StatementCard = ({ label, text, tone }) => (
  <Reveal className={`relative overflow-hidden rounded-3xl p-8 md:p-12 ${tone}`}>
    <Sparkle className="absolute right-8 top-8 h-5 w-5 opacity-50" />
    <p className="text-xs font-semibold uppercase tracking-eyebrow opacity-75">{label}</p>
    <p className="mt-5 font-display text-2xl font-semibold leading-snug md:text-3xl">{text}</p>
  </Reveal>
);

const AboutPage = () => {
  const board = useBoardMembers();

  return (
    <>
      <SEOHelmet />
      <PageHero
        eyebrow="About Us"
        title="Shaping Hearts, Building Minds"
        crumbs={[{ label: "About" }]}
        image="students-group-classroom"
      />
      <SectionNav items={sections} />

      {/* 1. Introduction */}
      <ContentSection id="introduction" eyebrow="01 · Introduction" title={introduction.lead}>
        <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <Prose>
              {introduction.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </Prose>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-sm px-4">
            <ArchFrame name="little-girls-class" sizes="380px" />
          </Reveal>
        </div>
      </ContentSection>

      {/* 2. Vision & Mission */}
      <ContentSection id="vision-mission" tone="emerald" eyebrow="02" title="Vision & Mission" align="center">
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <StatementCard label="IMS Vision" text={vision} tone="bg-gold-400 text-emerald-800" />
          <StatementCard label="IMS Mission" text={mission} tone="bg-ivory-50 text-emerald-800" />
        </div>
      </ContentSection>

      {/* 3. History */}
      <ContentSection id="brief-history" eyebrow="03 · Brief History" title={historyTitle}>
        <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <Prose><p>{history}</p></Prose>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-sm px-4">
            <ArchFrame name="campus-aerial-event" sizes="380px" />
          </Reveal>
        </div>
      </ContentSection>

      {/* 4. Board */}
      <ContentSection id="board-members" tone="sand" eyebrow="04" title="Board Members" lede={governanceIntro}>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {board.map((m, i) => (
            <PersonCard key={m.name} index={i} name={m.name} role={m.role} detail={m.qualification} note={m.profession} photo={m.photo} />
          ))}
        </div>
      </ContentSection>

      {/* 5. Affiliation */}
      <ContentSection id="affiliation" eyebrow="05" title="Affiliation">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <Prose>
              <p>
                IMS is affiliated to <strong className="text-ink">{affiliation.body}</strong>.
              </p>
            </Prose>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            <FactTile label="Status Of Affiliation" value={affiliation.status} tone="gold" />
            <FactTile label="Affiliation Number" value={affiliation.number} tone="emerald" />
          </div>
        </div>
      </ContentSection>
    </>
  );
};

export default AboutPage;
