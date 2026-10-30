import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
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
    <SEOHelmet
      title="IMS, A Value Based School | Islamic Mission School — Character & Curriculum"
      description="Discover how Islamic Mission School integrates values with academics: why value-based schools matter, how values live in the curriculum, and education compared with value-based education."
      canonical={siteUrl("/ims-value-based-school")}
      ogTitle="IMS, A Value Based School | Islamic Mission School"
      ogDescription="Integrated values and learning at IMS — from classroom culture to cooperation for co-existence."
      ogUrl={siteUrl("/ims-value-based-school")}
    />
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
          <Prose>{curriculum.opening.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</Prose>
          <PullQuote className="my-10">{curriculum.quote}</PullQuote>
          <Prose><p>{curriculum.closing}</p></Prose>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-semibold text-ink">{curriculum.todayIntro}</p>
          <ul className="mt-6 space-y-3">
            {curriculum.today.map(([gain, loss]) => (
              <li key={gain} className="rounded-2xl border border-gold-500/30 bg-ivory-50 px-6 py-4">
                <span className="text-ink/80">{gain}, </span>
                <span className="font-semibold text-emerald-700">{loss}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Reveal className="mt-16 rounded-3xl bg-emerald-700 p-8 text-ivory-50 md:p-12">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-gold-300">A Whole-School Approach</p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {curriculum.wholeSchool.map((p) => <p key={p.slice(0, 24)} className="text-lg leading-relaxed text-ivory-100/90">{p}</p>)}
        </div>
      </Reveal>
    </ContentSection>

    <ContentSection id="vb-vs-education" eyebrow="03" title="Education vs Value-Based Education" lede="There is a marked difference in the focus and outcomes of simple education and value-based education.">
      <Comparison leftTitle="Education" rightTitle="Value-Based Education" rows={comparison} />
    </ContentSection>
  </>
);

export default ValueBasedPage;
