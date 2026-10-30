import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
import media from "../../content/media";
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
const PartnerPanel = ({ label, title, text }) => (
  <Reveal className="relative mt-12 overflow-hidden rounded-3xl bg-emerald-700 p-8 text-ivory-50 md:p-12">
    <PatternBg opacity={0.1} />
    <div className="relative">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300"><Sparkle className="h-3 w-3" /> {label}</p>
      <p className="mt-4 font-display text-3xl font-bold md:text-4xl">{title}</p>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ivory-100/85">{text}</p>
    </div>
  </Reveal>
);

const CurriculumPage = () => (
  <>
    <SEOHelmet
      title="Curriculum | Islamic Mission School — ICSE, Skills, STEM & Robotics"
      description="IMS curriculum: ICSE & ISC academic framework, 21st century skills pathways, Evan Moor STEM from Grade 1, and Eduvate Robotics & AI — nurturing mind, body and soul."
      canonical={siteUrl("/curriculum")}
      ogTitle="Curriculum | Islamic Mission School"
      ogDescription="National framework academics, skills for life, world-class STEM, and Robotics & AI at IMS."
      ogImage={siteUrl(media["robotics-lab-2"].src)}
      ogUrl={siteUrl("/curriculum")}
    />
    <PageHero
      eyebrow="Academics"
      title="Curriculum: Nurturing Mind, Body and Soul"
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
        <IconBadge icon="quran" />
        <p className="text-lg leading-relaxed text-emerald-800">{academic.islamic}</p>
      </Reveal>
      <SubHeading>Pedagogy — beyond rote learning</SubHeading>
      <IconList items={academic.pedagogy} cols={3} />
    </ContentSection>

    {/* 2. 21st century skills */}
    <ContentSection id="curriculum-21-skills" tone="sand" eyebrow="02 · Skills for Life" title="21st Century Skills" lede={skills.intro}>
      <SubHeading>Our Core Skill Pathways</SubHeading>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {skills.pathways.map((p, i) => <TagCard key={p.title} index={i} {...p} />)}
      </div>
      <SubHeading>How We Develop These Skills</SubHeading>
      <IconList items={skills.methods} cols={3} />
      <PhotoStrip names={["student-speech-2", "science-exhibition-3", "smart-class-3"]} className="mt-14" />
    </ContentSection>

    {/* 3. STEM */}
    <ContentSection id="curriculum-stem" eyebrow="03 · STEM" title="STEM Education">
      <Tagline>{stem.tagline}</Tagline>
      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
        <Reveal><Prose><p>{stem.intro}</p></Prose></Reveal>
        <PhotoStrip names={["science-exhibition-6", "stem-activity"]} className="!my-0" />
      </div>
      <PartnerPanel label="Our STEM Partner" title="A World-Class Curriculum from Evan Moor" text={stem.partner} />
      <SubHeading>Why We Chose Evan Moor</SubHeading>
      <IconList items={stem.why} />
      <SubHeading>The Evan Moor Advantage</SubHeading>
      <ol className="mt-6 grid gap-4 md:grid-cols-3">
        {stem.advantage.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 0.06} className="rounded-2xl border border-gold-500/30 bg-ivory-50 p-7 shadow-card">
            <span className="font-display text-4xl font-bold text-gold-400">{["i", "ii", "iii"][i]}</span>
            <h4 className="mt-3 font-display text-xl font-bold text-ink">{a.title}</h4>
            <p className="mt-2 leading-relaxed text-ink/70">{a.text}</p>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-14 rounded-3xl border-2 border-dashed border-gold-500/60 bg-ivory-100 p-8 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">A Glimpse into Learning</p>
        <p className="mt-3 font-display text-3xl font-bold text-ink">“{stem.unit.title}”</p>
        <p className="mt-3 text-ink/70">{stem.unit.text}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stem.unit.parts.map((p) => (
            <div key={p.subject} className="rounded-2xl bg-ivory-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-gold-600">{p.subject}</p>
              <p className="mt-2 text-ink/80">{p.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </ContentSection>

    {/* 4. Robotics & AI */}
    <ContentSection id="curriculum-robotics-ai" tone="sand" eyebrow="04 · Robotics & AI" title="Robotics & Artificial Intelligence">
      <Tagline>{robotics.tagline}</Tagline>
      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
        <Reveal><Prose>{robotics.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</Prose></Reveal>
        <PhotoStrip names={["robotics-lab-2", "robotics-lab-1"]} className="!my-0" />
      </div>
      <SubHeading>Why We Partnered with Eduvate</SubHeading>
      <IconList items={robotics.why} />
      <SubHeading>Our State-of-the-Art Eduvate Lab</SubHeading>
      <IconList items={robotics.lab} cols={4} />
      <PhotoStrip names={["robotics-lab-3", "robotics-lab-4", "robotics-lab-5"]} className="mt-14" />
    </ContentSection>
  </>
);

export default CurriculumPage;
