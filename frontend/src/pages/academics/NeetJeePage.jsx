import { PiFilePdf } from "react-icons/pi";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { useNeetJeeData } from "../../hooks/useNeetJeeData";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import Reveal from "../../ui/Reveal";
import Img from "../../ui/Img";
import Button from "../../ui/Button";
import IconBadge from "../../ui/IconBadge";
import { Comparison } from "../../ui/Blocks";
import { PatternBg, Sparkle } from "../../ui/Ornaments";

const sections = [
  { id: "neet-program", label: "Program Structure & Details" },
  { id: "neet-strategy", label: "Special Features" },
  { id: "neet-comparison", label: "Comparison" },
];

const featureIcons = ["teacher", "exam", "chart", "chat", "clock", "shield", "coins", "calendar", "checklist", "books"];

const NeetJeePage = () => {
  const { settings, tracks, features, comparison, roadmap, answerKeys } = useNeetJeeData();

  // The default intro and vision text both open with "The journey to premier
  // institutions..."; drop the vision's repeated opening sentence
  const firstSentence = (t = "") => t.split(/(?<=\.)\s/)[0];
  const opening = (t = "") => t.split(/\s+/).slice(0, 6).join(" ").toLowerCase();
  const visionText =
    settings.vision_description && opening(settings.vision_description) === opening(settings.intro_paragraph_1)
      ? settings.vision_description.slice(firstSentence(settings.vision_description).length).trim()
      : settings.vision_description;

  return (
    <>
      <SEOHelmet />
      <PageHero
        eyebrow={settings.hero_badge}
        title={settings.hero_title}
        lede={settings.hero_subtitle}
        crumbs={[{ label: "Academics", to: "/curriculum" }, { label: "NEET / JEE" }]}
        image="science-exhibition-7"
        imagePosition="70% 40%"
        actions={
          <>
            <Button to={settings.cta_button_link || "/contact"}>{settings.cta_button_text}</Button>
            <Button to={settings.secondary_button_link || "/brochure"} variant="light">{settings.secondary_button_text}</Button>
          </>
        }
      />
      <SectionNav items={sections} />

      {/* Program */}
      <ContentSection id="neet-program" eyebrow={settings.banner_title} title={settings.banner_subtitle}>
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Prose>
              {settings.intro_paragraph_1 && <p>{settings.intro_paragraph_1}</p>}
              {settings.intro_paragraph_2 && <p>{settings.intro_paragraph_2}</p>}
              {visionText && <p>{visionText}</p>}
            </Prose>
          </Reveal>
          <Img name="science-exhibition-6" position="50% 60%" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] rounded-t-[160px] rounded-b-2xl shadow-lift" />
        </div>

        <h3 className="mt-20 text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">Program Structure &amp; Details</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {tracks.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className={`relative overflow-hidden rounded-3xl p-8 md:p-10 ${i === 0 ? "bg-emerald-700 text-ivory-50" : "bg-gold-400 text-emerald-800"}`}>
              <PatternBg opacity={0.08} color={i === 0 ? "#C6A878" : "#003C24"} />
              <div className="relative">
                {t.for_class && <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${i === 0 ? "bg-gold-400 text-emerald-800" : "bg-emerald-700 text-ivory-50"}`}>{t.for_class}</span>}
                <h4 className="mt-5 font-display text-2xl font-bold md:text-3xl">{t.name}</h4>
                {t.subtitle && <p className="mt-2 italic opacity-80">{t.subtitle}</p>}
                <p className="mt-5 leading-relaxed opacity-90">{t.description}</p>
                {t.highlight && <p className="mt-6 flex items-center gap-2 font-semibold"><Sparkle className="h-3.5 w-3.5" /> {t.highlight}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </ContentSection>

      {/* Strategy + roadmap */}
      <ContentSection id="neet-strategy" tone="sand" title={settings.features_title}>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal as="li" key={f.text} delay={(i % 4) * 0.06} className="flex items-start gap-4 rounded-2xl border border-gold-500/30 bg-ivory-50 p-6 shadow-card">
              <IconBadge icon={featureIcons[i] || "checklist"} />
              <p className="pt-1 font-medium leading-snug text-ink">{f.text}</p>
            </Reveal>
          ))}
        </ul>
        {roadmap.length > 0 && (
          <>
            <h3 className="mt-20 text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">The 24-Month Roadmap</h3>
            <ol className="relative mt-8 grid gap-4 md:grid-cols-4">
              {roadmap.map((r, i) => (
                <Reveal as="li" key={r.phase} delay={i * 0.08} className="relative rounded-2xl bg-emerald-700 p-7 text-ivory-50">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">{r.phase}</p>
                  <p className="mt-3 font-display text-xl font-bold leading-snug">{r.description}</p>
                  <span className="absolute right-6 top-6 font-display text-4xl font-bold text-ivory-50/10" aria-hidden="true">{i + 1}</span>
                </Reveal>
              ))}
            </ol>
          </>
        )}
      </ContentSection>

      {/* Comparison */}
      {comparison.length > 0 && (
        <ContentSection id="neet-comparison" title={settings.comparison_title}>
          <Comparison
            leftTitle="Conventional Schooling"
            rightTitle="IMS NEET/JEE Integrated Schooling"
            rows={comparison.map((c) => [<>{c.point && <strong className="block text-ink">{c.point}</strong>}{c.conventional}</>, <>{c.point && <strong className="block">{c.point}</strong>}{c.integrated}</>])}
          />
        </ContentSection>
      )}

      {/* Answer keys (only when the admin has published some) */}
      {answerKeys.length > 0 && (
        <ContentSection id="neet-answer-keys" tone="sand" eyebrow="Resources" title={settings.answer_keys_title}>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {answerKeys.map((k) => (
              <li key={k.id || k.title}>
                <a href={k.pdf_url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-gold-500/30 bg-ivory-50 p-5 shadow-card transition hover:border-emerald-700">
                  <PiFilePdf className="shrink-0 text-3xl text-emerald-700" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink group-hover:text-emerald-700">{k.title}</span>
                    <span className="text-sm text-ink/60">{[k.exam_name, k.exam_date].filter(Boolean).join(" · ")}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </ContentSection>
      )}

    </>
  );
};

export default NeetJeePage;
