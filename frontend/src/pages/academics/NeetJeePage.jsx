import { PiFilePdf } from "react-icons/pi";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
import media from "../../content/media";
import { contact } from "../../content/site";
import { useNeetJeeData } from "../../hooks/useNeetJeeData";
import { neet2024, mbbsAlumni } from "../../content/neetAchievers";
import PageHero from "../../ui/PageHero";
import SectionNav from "../../ui/SectionNav";
import ContentSection, { Prose } from "../../ui/ContentSection";
import Reveal from "../../ui/Reveal";
import Img from "../../ui/Img";
import Button from "../../ui/Button";
import IconBadge from "../../ui/IconBadge";
import { Comparison, PersonCard } from "../../ui/Blocks";
import { PatternBg, Sparkle } from "../../ui/Ornaments";

const sections = [
  { id: "neet-program", label: "The Program" },
  { id: "neet-strategy", label: "Our Strategy" },
  { id: "neet-comparison", label: "Why Integrated" },
  { id: "neet-results", label: "Achievers" },
  { id: "neet-alumni", label: "Our Doctors" },
  { id: "neet-faculty", label: "Faculty" },
];

const featureIcons = ["teacher", "exam", "chart", "chat", "clock", "shield", "coins", "calendar", "checklist", "books"];

// Toppers whose photos were cut from the official result posters
const posterPhotos = {
  "Ibrahim Faisal": "topper-ibrahim-faisal",
  "Abdul Rehman": "topper-abdul-rehman",
  "Ahmad Misbah": "topper-ahmad-misbah",
  "Shaikh Fidyan Shayan": "topper-shaikh-fidyan-shayan",
};

const initials = (name) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("");

/* Uploaded admin photo, else poster crop, else monogram */
const TopperPhoto = ({ result }) => {
  const uploaded = result.photo_url?.startsWith("http") ? result.photo_url : null;
  const poster = posterPhotos[result.name?.trim()];
  if (uploaded) return <img src={uploaded} alt={result.name} loading="lazy" className="h-full w-full rounded-full object-cover ring-4 ring-ivory-50" />;
  if (poster) return <Img name={poster} alt={result.name} sizes="144px" className="h-full w-full rounded-full ring-4 ring-ivory-50" />;
  return (
    <span className="flex h-full w-full items-center justify-center rounded-full bg-emerald-700 font-display text-4xl font-bold text-gold-300 ring-4 ring-ivory-50" aria-hidden="true">
      {initials(result.name)}
    </span>
  );
};

const NeetJeePage = () => {
  const { settings, tracks, features, comparison, roadmap, results, faculty, answerKeys } = useNeetJeeData();

  const groups = [...new Set(results.map((r) => r.class_group || "Board Toppers"))];

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
      <SEOHelmet
        title="NEET / JEE Program | Islamic Mission School Aligarh"
        description="Integrated NEET/JEE program at Islamic Mission School, Aligarh: ICSE schooling synchronised with competitive-exam preparation from Class IX — daily tests, weekly analysis and expert faculty, with no external coaching required."
        keywords="NEET JEE integrated school Aligarh, NEET coaching school, JEE foundation Class 9, IMS Aligarh NEET"
        canonical={siteUrl("/programs/neet-jee")}
        ogTitle="NEET / JEE Program | Islamic Mission School"
        ogDescription={settings.hero_subtitle}
        ogImage={siteUrl(media["science-exhibition-7"].src)}
        ogUrl={siteUrl("/programs/neet-jee")}
      />
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
      <ContentSection id="neet-program" eyebrow={settings.banner_title} title={settings.vision_title}>
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

        <h3 className="mt-20 text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">Program Structure</h3>
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
      <ContentSection id="neet-strategy" tone="sand" eyebrow="How We Prepare" title={settings.features_title}>
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
        <ContentSection id="neet-comparison" eyebrow="Why Integrated" title={settings.comparison_title}>
          <Comparison
            leftTitle="Conventional Schooling"
            rightTitle="IMS Integrated Schooling"
            rows={comparison.map((c) => [<><strong className="block text-ink">{c.point}</strong>{c.conventional}</>, <><strong className="block">{c.point}</strong>{c.integrated}</>])}
          />
        </ContentSection>
      )}

      {/* Results */}
      {results.length > 0 && (
        <ContentSection id="neet-results" tone="sand" eyebrow="Alhamdulillah" title={settings.results_title}>
          {groups.map((g) => (
            <div key={g} className="mt-14">
              <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-emerald-700">{g} District Toppers · 2026</h3>
              <div className="mt-8 grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
                {results.filter((r) => (r.class_group || "Board Toppers") === g).map((r, i) => (
                  <Reveal key={r.name} delay={i * 0.06} className="flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="h-32 w-32 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 p-1 shadow-lift md:h-36 md:w-36">
                        <TopperPhoto result={r} />
                      </div>
                      <span className="absolute -right-3 top-1 rounded-full bg-emerald-700 px-3 py-1 font-display text-lg font-bold text-gold-300 shadow-card">{r.score}</span>
                    </div>
                    <p className="mt-5 font-display text-lg font-bold text-ink">{r.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">{r.exam_year}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </ContentSection>
      )}

      {/* NEET results and alumni in medical colleges */}
      <ContentSection id="neet-alumni" tone="emerald" eyebrow="Doctors in the Making" title="Our NEET Achievers">
        <Reveal className="mt-12 rounded-3xl bg-ivory-50/5 p-6 ring-1 ring-gold-300/25 md:p-10">
          <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-300">{neet2024.title}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {neet2024.results.map((r) => (
              <div key={r.name} className="flex items-center gap-4 rounded-2xl bg-ivory-50 p-4 text-ink">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gold-400 ring-2 ring-gold-400">
                  {r.photo ? <Img name={r.photo} alt={r.name} sizes="64px" className="h-full w-full" /> : <span className="flex h-full items-center justify-center font-display text-xl font-bold text-emerald-900">{r.name.split(" ").map((w) => w[0]).join("")}</span>}
                </div>
                <div>
                  <p className="font-display text-3xl font-bold leading-none text-emerald-700">{r.score}<span className="ml-1 text-sm font-semibold text-ink/50">/ 720</span></p>
                  <p className="mt-1 font-semibold">{r.name}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <h3 className="mt-14 text-xs font-semibold uppercase tracking-eyebrow text-gold-300">IMS alumni now studying MBBS</h3>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {mbbsAlumni.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.05} className="flex flex-col items-center rounded-2xl bg-ivory-50 px-4 pb-6 pt-7 text-center text-ink">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-gold-300 to-gold-600 p-1">
                <Img name={a.photo} alt={a.name} sizes="96px" className="h-full w-full rounded-full" />
              </div>
              <p className="mt-4 font-display text-lg font-bold leading-tight">{a.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold-600">MBBS</p>
              <p className="mt-1 text-sm text-ink/70">{a.college}</p>
            </Reveal>
          ))}
        </div>
      </ContentSection>

      {/* Faculty */}
      {faculty.length > 0 && (
        <ContentSection id="neet-faculty" eyebrow="Mentors" title={settings.faculty_title}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((f, i) => (
              <PersonCard key={f.name} index={i} name={f.name} role={f.subject} detail={f.qualification} note={f.bio} photo={f.photo_url?.startsWith("http") ? f.photo_url : null} />
            ))}
          </div>
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

      {/* Closing call to action */}
      <section className="relative overflow-hidden bg-emerald-800 py-20 text-center text-ivory-50 md:py-24">
        <PatternBg opacity={0.08} />
        <div className="relative mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">{settings.bottom_cta_title}</h2>
            <p className="mt-5 text-lg text-ivory-100/80">{settings.bottom_cta_subtitle}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to={settings.bottom_cta_primary_link || "/contact"}>{settings.bottom_cta_primary_text}</Button>
              <Button to={settings.bottom_cta_secondary_link || contact.phones[0].href} variant="light">{settings.bottom_cta_secondary_text}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default NeetJeePage;
