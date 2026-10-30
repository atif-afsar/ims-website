import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
import media from "../../content/media";
import { introduction, vision, mission, hadith, historyIntro, history, governanceIntro, affiliation } from "../../content/about";
import { useBoardMembers } from "../../hooks/useBoardMembers";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import ArchFrame from "../../ui/ArchFrame";
import Reveal from "../../ui/Reveal";
import Button from "../../ui/Button";
import { ArabicQuote, Timeline, PersonCard, FactTile } from "../../ui/Blocks";
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
      <SEOHelmet
        title="About Islamic Mission School (IMS) | Shaping Hearts, Building Minds"
        description="Islamic Mission School (IMS), established in 2008, is a CISCE-affiliated, value-based institution in Aligarh. We blend academic excellence with moral, spiritual and character development to nurture compassionate, confident and responsible future leaders."
        keywords="Islamic Mission School, IMS Aligarh, value based education, CISCE school Aligarh, Islamic school India, character building school, moral education"
        canonical={siteUrl("/about")}
        ogTitle="About IMS | Shaping Hearts, Building Minds"
        ogDescription="At Islamic Mission School, education goes beyond academics. We nurture intellect, character and faith through a value-based, future-ready curriculum."
        ogImage={siteUrl(media["campus-aerial-front"].src)}
        ogUrl={siteUrl("/about")}
      />
      <PageHero
        eyebrow="About IMS · Est. 2008"
        title="Shaping Hearts, Building Minds"
        lede="A value-based, CISCE-affiliated school in Aligarh — a madrasat al-hayat, a school for life."
        crumbs={[{ label: "About" }]}
        image="student-speech-1"
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
            <ArchFrame name="pre-primary-2" position="40% 60%" sizes="380px" />
          </Reveal>
        </div>
      </ContentSection>

      {/* 2. Vision & Mission */}
      <ContentSection id="vision-mission" tone="emerald" eyebrow="02 · Our Purpose" title="Vision & Mission" align="center">
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <StatementCard label="IMS Vision" text={vision} tone="bg-gold-400 text-emerald-800" />
          <StatementCard label="IMS Mission" text={mission} tone="bg-ivory-50 text-emerald-800" />
        </div>
        <Reveal className="mt-20">
          <ArabicQuote {...hadith} />
        </Reveal>
      </ContentSection>

      {/* 3. History */}
      <ContentSection id="brief-history" eyebrow="03 · Brief History" title="From Small Seeds, Great Trees Grow" lede={historyIntro}>
        <Timeline
          items={history.map((h) => ({
            when: h.when,
            title: h.title,
            image: h.image,
            body: h.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>),
          }))}
        />
      </ContentSection>

      {/* 4. Board */}
      <ContentSection id="board-members" tone="sand" eyebrow="04 · Governance" title="Board Members" lede={governanceIntro}>
        <h3 className="mt-14 text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">The Office Bearers</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {board.map((m, i) => (
            <PersonCard key={m.name} index={i} name={m.name} role={m.role} detail={m.qualification} note={m.profession} photo={m.photo} />
          ))}
        </div>
      </ContentSection>

      {/* 5. Affiliation */}
      <ContentSection id="affiliation" eyebrow="05 · Affiliation" title="Affiliated to CISCE, New Delhi">
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <Prose>
              <p>
                IMS is affiliated to the <strong className="text-ink">{affiliation.body}</strong>. Students follow the nationally
                recognised ICSE and ISC framework, enriched with the school’s value-based teaching.
              </p>
            </Prose>
            <Button to="/curriculum" variant="emerald" className="mt-8">Explore our curriculum</Button>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-3">
            <FactTile label="Affiliation No." value={affiliation.number} tone="emerald" />
            <FactTile label="Status" value={affiliation.status} tone="gold" />
            <FactTile label="Affiliated Since" value={affiliation.since} tone="ivory" />
          </div>
        </div>
      </ContentSection>
    </>
  );
};

export default AboutPage;
