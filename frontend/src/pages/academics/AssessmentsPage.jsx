import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { intro, summative, chapter, olympiads, nation } from "../../content/assessments";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import Reveal from "../../ui/Reveal";
import PhotoStrip from "../../ui/PhotoStrip";
import { IconList, FactTile } from "../../ui/Blocks";
import { Sparkle, Star8 } from "../../ui/Ornaments";

const sections = [
  { id: "asm-summative-formative", label: "Summative & Formative" },
  { id: "asm-chapter", label: "Chapter Assessments" },
  { id: "asm-olympiad", label: "Olympiad Exams" },
  { id: "asm-future", label: "IMS for a Better Future" },
];

const AssessmentsPage = () => (
  <>
    <SEOHelmet />
    <PageHero
      eyebrow="Academics"
      title="Assessments at IMS"
      lede="Embedded in learning, inspiring Higher Order Thinking."
      crumbs={[{ label: "Academics", to: "/curriculum" }, { label: "Assessments" }]}
      image="science-exhibition-12"
      imagePosition="72% 40%"
    />

    {/* Intro: the three guiding questions */}
    <section className="bg-ivory-50 py-20 md:py-24">
      <div className="mx-auto max-w-site px-4 md:px-8">
        <Reveal><Prose className="mx-auto text-center">{<p>{intro.text}</p>}</Prose></Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {intro.questions.map((q, i) => (
            <Reveal as="li" key={q} delay={i * 0.08} className="relative rounded-3xl bg-emerald-700 p-8 text-ivory-50">
              <span className="font-display text-6xl leading-none text-gold-400" aria-hidden="true">“</span>
              <p className="mt-2 font-display text-xl italic leading-snug">{q}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
    <SectionNav items={sections} />

    <ContentSection id="asm-summative-formative" tone="sand" eyebrow="01" title="Summative & Formative Assessments">
      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_440px]">
        <Reveal><Prose><p>{summative}</p><p>Assessments are spread across the academic year to ensure a balanced evaluation of progress and mastery.</p></Prose></Reveal>
        <div className="grid grid-cols-2 gap-3">
          <FactTile label="Formative Assessments" value="4" tone="emerald" size="lg" />
          <FactTile label="Summative Assessments" value="2" tone="gold" size="lg" />
        </div>
      </div>
    </ContentSection>

    <ContentSection id="asm-chapter" eyebrow="02" title="Chapter Assessments">
      <div className="mt-12 grid items-start gap-12 lg:grid-cols-2">
        <Reveal><Prose><p>{chapter}</p></Prose></Reveal>
        <PhotoStrip names={["classroom-img-2784", "classroom-img-2790"]} className="!my-0" />
      </div>
    </ContentSection>

    <ContentSection id="asm-olympiad" tone="sand" eyebrow="03" title="Olympiad Exams" lede={olympiads.intro}>
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {olympiads.list.map((o, i) => (
          <Reveal key={o.code} delay={i * 0.06} className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-ivory-50 p-7 text-center shadow-card">
            <Star8 className="absolute -right-6 -top-6 h-24 w-24 text-gold-500/15" strokeWidth={3} />
            <p className="font-display text-4xl font-bold text-emerald-700">{o.code}</p>
            <p className="mt-2 text-sm text-ink/70">{o.name}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14 rounded-3xl bg-emerald-800 p-8 text-ivory-50 md:p-12">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300"><Sparkle className="h-3 w-3" /> AMU Class IX Entrance · {olympiads.achievement.year}</p>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ivory-100/90">{olympiads.achievement.text}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {olympiads.achievement.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-ivory-50/10 p-6">
              <p className="font-display text-5xl font-bold text-gold-300">{s.value}</p>
              <p className="mt-2 text-sm text-ivory-100/80">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </ContentSection>

    <ContentSection id="asm-future" eyebrow="04" title="IMS for a Better Future of Our Country">
      <IconList items={nation.points} />
      <Reveal className="mt-16 text-center">
        <p className="mx-auto max-w-2xl text-lg text-ink/70">{nation.closing}</p>
        <p className="mt-6 inline-block rounded-full border-2 border-gold-400 bg-emerald-700 px-8 py-4 font-display text-xl font-bold uppercase tracking-[0.12em] text-ivory-50 md:text-2xl">
          {nation.motto}
        </p>
      </Reveal>
    </ContentSection>
  </>
);

export default AssessmentsPage;
