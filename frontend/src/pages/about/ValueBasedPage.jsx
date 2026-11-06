import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { intro, need, curriculum, comparison } from "../../content/valueBased";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import ArchFrame from "../../ui/ArchFrame";
import Reveal from "../../ui/Reveal";
import { PullQuote, Comparison } from "../../ui/Blocks";

const sections = [
  { id: "vb-need", label: "The Need" },
  { id: "vb-curriculum", label: "Values in the Curriculum" },
  { id: "vb-vs-education", label: "Education vs Value-Based Education" },
];

const ValueBasedPage = () => (
  <>
    <SEOHelmet />
    <PageHero
      eyebrow="Value-Based Education"
      title="IMS, A Value Based School"
      lede={intro}
      crumbs={[{ label: "About", to: "/about" }, { label: "Value-Based School" }]}
      image="pre-primary-2"
    />
    <SectionNav items={sections} />

    <ContentSection id="vb-need" eyebrow="01" title="The Need for Value-Based Schools">
      <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_360px]">
        <Reveal>
          <Prose>{need.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</Prose>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto w-full max-w-sm px-4">
          <ArchFrame name="student-speech-2" position="48% 30%" sizes="360px" />
        </Reveal>
      </div>
    </ContentSection>

    <ContentSection id="vb-curriculum" tone="sand" eyebrow="02" title="Values in the Curriculum">
      <div className="mt-12 grid gap-14 lg:grid-cols-2">
        <Reveal>
          <Prose>{curriculum.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</Prose>
        </Reveal>
        <Reveal delay={0.1} className="flex items-center">
          <PullQuote>{curriculum.quote}</PullQuote>
        </Reveal>
      </div>
      <Reveal className="mt-16 rounded-3xl bg-emerald-700 p-8 text-ivory-50 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-gold-300">A Whole-School Approach</p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {curriculum.wholeSchool.map((p) => <p key={p.slice(0, 24)} className="text-lg leading-relaxed text-ivory-100/90">{p}</p>)}
        </div>
      </Reveal>
    </ContentSection>

    <ContentSection id="vb-vs-education" eyebrow="03" title="Education Vs Value Based Education">
      <Comparison leftTitle="Education" rightTitle="Value Based Education" rows={comparison} />
    </ContentSection>

  </>
);

export default ValueBasedPage;
