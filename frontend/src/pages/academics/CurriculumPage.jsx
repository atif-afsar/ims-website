import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { overview, academic, skills, stem, robotics } from "../../content/curriculum";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import PhotoStrip from "../../ui/PhotoStrip";
import Reveal from "../../ui/Reveal";
import IconBadge from "../../ui/IconBadge";
import { IconList, TagCard } from "../../ui/Blocks";
import { Sparkle, PatternBg } from "../../ui/Ornaments";

const sections = [
  { id: "curriculum-academic", label: "Academic Excellence" },
  { id: "curriculum-21-skills", label: "21st Century Skills" },
  { id: "curriculum-stem", label: "STEM Education" },
  { id: "curriculum-robotics-ai", label: "Robotics & AI" },
];

const Tagline = ({ children }) => (
  <p className="mt-6 flex items-center gap-3 font-display text-xl italic text-emerald-700">
    <span className="h-px w-10 bg-gold-500" aria-hidden="true" /> {children}
  </p>
);

const SubHeading = ({ children, tone = "dark" }) => (
  <h3 className={`mt-16 text-xs font-semibold uppercase tracking-eyebrow ${tone === "dark" ? "text-emerald-700" : "text-gold-300"}`}>{children}</h3>
);

/* Emerald partner panel used for Evan Moor and Eduvate */
const PartnerPanel = ({ label, title, tagline, text }) => (
  <Reveal className="relative mt-12 overflow-hidden rounded-3xl bg-emerald-700 p-8 text-ivory-50 md:p-12">
    <PatternBg opacity={0.1} />
    <div className="relative">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300"><Sparkle className="h-3 w-3" /> {label}</p>
      <p className="mt-4 font-display text-3xl font-bold md:text-4xl">{title}</p>
      {tagline && <p className="mt-2 font-display text-lg italic text-gold-300">{tagline}</p>}
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ivory-100/85">{text}</p>
    </div>
  </Reveal>
);

const CurriculumPage = () => (
  <>
    <SEOHelmet />
    <PageHero
      eyebrow="Academics"
      title="Curriculum: Nurturing Mind, Body, and Soul"
      lede={overview}
      crumbs={[{ label: "Academics" }, { label: "Curriculum" }]}
      image="smart-class-1"
      imagePosition="60% 50%"
    />
    <SectionNav items={sections} />

    {/* 1. Academic excellence */}
    <ContentSection id="curriculum-academic" eyebrow="01 · ICSE & ISC" title="Academic Excellence: The National Framework" lede={academic.intro}>
      <PhotoStrip names={["smart-class-1", "smart-class-2", "pre-primary-1"]} className="mt-12" />
      <SubHeading>Core Subjects</SubHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {academic.subjects.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} className="rounded-2xl border border-gold-500/30 bg-ivory-50 p-7 shadow-card">
            <IconBadge icon={s.icon} />
            <h4 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.tags.map((t) => <li key={t} className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-emerald-800">{t}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6 flex items-start gap-4 rounded-2xl bg-gold-100 p-6 md:p-8">
        <IconBadge icon="books" />
        <div className="space-y-1 text-lg leading-relaxed text-emerald-800">{academic.minority.map((p) => <p key={p}>{p}</p>)}</div>
      </Reveal>
      <SubHeading>Pedagogy — our teaching methodology moves beyond rote learning</SubHeading>
      <IconList items={academic.pedagogy} cols={3} />
    </ContentSection>

    {/* 2. 21st century skills */}
    <ContentSection id="curriculum-21-skills" tone="sand" eyebrow="02 · Skills for Life" title="21st Century Skills" lede={skills.intro}>
      <SubHeading>Four Interconnected Pathways</SubHeading>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {skills.pathways.map((p, i) => <TagCard key={p.title} index={i} {...p} />)}
      </div>
      <SubHeading>How We Develop These Skills</SubHeading>
      <IconList items={skills.methods} cols={3} />
      <Reveal className="mt-10"><Prose><p>{skills.closing}</p></Prose></Reveal>
      <PhotoStrip names={["student-speech-2", "science-exhibition-3", "smart-class-3"]} className="mt-14" />
    </ContentSection>

    {/* 3. STEM */}
    <ContentSection id="curriculum-stem" eyebrow="03 · STEM" title="STEM Education">
      <Tagline>{stem.tagline}</Tagline>
      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
        <Reveal><Prose><p>{stem.intro}</p></Prose></Reveal>
        <PhotoStrip names={["science-exhibition-6", "stem-activity"]} className="!my-0" />
      </div>
      <PartnerPanel label="Our STEM Partner" title={stem.partnerTitle} tagline={stem.partnerTagline} text={stem.partner} />
    </ContentSection>

    {/* 4. Robotics & AI */}
    <ContentSection id="curriculum-robotics-ai" tone="sand" eyebrow="04 · Robotics & AI" title="Robotics & Artificial Intelligence">
      <Tagline>{robotics.tagline}</Tagline>
      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
        <Reveal><Prose>{robotics.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</Prose></Reveal>
        <PhotoStrip names={["robotics-lab-2", "robotics-lab-1"]} className="!my-0" />
      </div>
      <PhotoStrip names={["robotics-lab-3", "robotics-lab-4", "robotics-lab-5"]} className="mt-14" />
    </ContentSection>
  </>
);

export default CurriculumPage;
