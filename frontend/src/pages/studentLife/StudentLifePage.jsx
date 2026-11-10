import { useEffect, useState } from "react";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { publicDb as db } from "../../lib/db";
import { tagline, intro, english, pbl, taekwondo, sportsDay, annualFunction, misc } from "../../content/studentLife";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import PhotoStrip from "../../ui/PhotoStrip";
import Reveal from "../../ui/Reveal";
import Button from "../../ui/Button";
import { IconList } from "../../ui/Blocks";

const sections = [
  { id: "cc-english", label: "English" },
  { id: "cc-pbl", label: "Project Based Learning" },
  { id: "cc-taekwondo", label: "Taekwondo" },
  { id: "cc-sports-day", label: "Sports Day" },
  { id: "cc-annual-function", label: "Annual Function" },
  { id: "cc-misc", label: "Miscellaneous" },
];

const Tagline = ({ children, tone = "dark" }) => (
  <p className={`mt-6 flex items-center gap-3 font-display text-xl italic ${tone === "dark" ? "text-emerald-700" : "text-gold-300"}`}>
    <span className="h-px w-10 bg-gold-500" aria-hidden="true" /> {children}
  </p>
);

/* Extra programmes added in Admin → Programs (the section hides when empty) */
const useAdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    let cancelled = false;
    db
      .from("programs")
      .select("*")
      .order("sort_order")
      .then(({ data }) => !cancelled && setPrograms(data || []));
    return () => {
      cancelled = true;
    };
  }, []);
  return programs;
};

const StudentLifePage = () => {
  const programs = useAdminPrograms();
  return (
    <>
      <SEOHelmet />
      <PageHero
        eyebrow="Co-Curricular & Extra-Curricular"
        title={tagline}
        lede={intro}
        crumbs={[{ label: "Student Life" }]}
        image="science-exhibition-8"
        imagePosition="40% 40%"
      />
      <SectionNav items={sections} />

      {/* 1. English */}
      <ContentSection id="cc-english" eyebrow="01" title="English Communication Program">
        <Tagline>{english.tagline}</Tagline>
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          <Reveal><Prose>{english.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</Prose></Reveal>
          <PhotoStrip names={["public-speaking-public-speaking-8-jpeg", "student-speech-1"]} className="!my-0" />
        </div>
        <IconList items={english.formats} cols={4} />
        <PhotoStrip names={["public-speaking-dsc-0039", "public-speaking-public-speaking-4-jpeg", "public-speaking-public-speaking-2-jpeg"]} className="mt-14" />
      </ContentSection>

      {/* 3. PBL */}
      <ContentSection id="cc-pbl" tone="sand" eyebrow="02" title="Project Based Learning">
        <Tagline>{pbl.tagline}</Tagline>
        <Reveal className="mt-8"><Prose><p>{pbl.text}</p></Prose></Reveal>
        <PhotoStrip names={["science-exhibition-4", "science-activities-dsc-1575-3", "science-exhibition-11"]} className="mt-14" />
      </ContentSection>

      {/* 4. Taekwondo */}
      <ContentSection id="cc-taekwondo" eyebrow="03" title="Taekwondo">
        <Reveal className="mt-10"><Prose><p>{taekwondo.text}</p></Prose></Reveal>
      </ContentSection>

      {/* 5. Sports Day */}
      <ContentSection id="cc-sports-day" tone="sand" eyebrow="04" title="Annual Sports Day">
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Prose><p>{sportsDay.text}</p></Prose>
          </Reveal>
          <PhotoStrip names={["sports-img-2611", "sports-volleyball"]} className="!my-0" />
        </div>
      </ContentSection>

      {/* 6. Annual Function */}
      <ContentSection id="cc-annual-function" tone="emerald" eyebrow="05" title="Annual Function">
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Prose tone="light"><p>{annualFunction.text}</p></Prose>
                      </Reveal>
          <PhotoStrip names={["guest-address", "award-ceremony"]} className="!my-0" />
        </div>
      </ContentSection>

      {/* 6. Miscellaneous */}
      <ContentSection id="cc-misc" eyebrow="06" title="Miscellaneous">
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Prose><p>{misc.text}</p></Prose>
            <Button to="/gallery" variant="emerald" className="mt-10">See the Gallery</Button>
          </Reveal>
          <PhotoStrip names={["creative-writing-2025-img-20250829-110412", "quiz-13-jpeg", "quiz-dsc-1673"]} className="!my-0" />
        </div>
      </ContentSection>

      {programs.length > 0 && (
        <ContentSection id="more-programmes" tone="sand" eyebrow="And More" title="More Programmes">
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.06} className="overflow-hidden rounded-2xl bg-ivory-50 shadow-card">
                {p.cover_image && <img src={p.cover_image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />}
                <div className="p-7">
                  <h3 className="font-display text-xl font-bold text-ink">{p.name}</h3>
                  {p.description && <p className="mt-2 leading-relaxed text-ink/70">{p.description}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </ContentSection>
      )}
    </>
  );
};

export default StudentLifePage;
