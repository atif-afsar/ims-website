import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { need, curriculum, comparison } from "../../content/valueBased";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import ArchFrame from "../../ui/ArchFrame";
import Reveal from "../../ui/Reveal";
import { Comparison } from "../../ui/Blocks";

const sections = [
  { id: "vb-need", label: "The Need For Value Based Schools" },
  { id: "vb-curriculum", label: "Values in the curriculum" },
  { id: "vb-vs-education", label: "Education Vs Value Based Education" },
];

const ValueBasedPage = () => (
  <>
    <SEOHelmet />
    <PageHero
      eyebrow="Value-Based Education"
      title="IMS, A Value Based School"
      crumbs={[{ label: "About", to: "/about" }, { label: "Value-Based School" }]}
      image="pre-primary-2"
    />
    <SectionNav items={sections} />

    <ContentSection id="vb-need" eyebrow="01" title="The Need For Value Based Schools">
      <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_360px]">
        <Reveal>
          <Prose>{need.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</Prose>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto w-full max-w-sm px-4">
          <ArchFrame name="student-speech-2" position="48% 30%" sizes="360px" />
        </Reveal>
      </div>
    </ContentSection>

    <ContentSection id="vb-curriculum" tone="sand" eyebrow="02" title="Values in the curriculum">
      <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_360px]">
        <Reveal>
          <Prose><p>{curriculum}</p></Prose>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto w-full max-w-sm px-4">
          <ArchFrame name="pre-primary-2" position="40% 60%" sizes="360px" />
        </Reveal>
      </div>
    </ContentSection>

    <ContentSection id="vb-vs-education" eyebrow="03" title="Education Vs Value Based Education">
      <Comparison leftTitle="Education" rightTitle="Value Based Education" rows={comparison} />
    </ContentSection>

  </>
);

export default ValueBasedPage;
