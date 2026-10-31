import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { PiPhone, PiWhatsappLogo } from "react-icons/pi";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { publicDb as db } from "../../lib/db";
import { contact, admissions } from "../../content/site";
import { admissionNote } from "../../dummydata";
import PageHero from "../../ui/PageHero";
import ContentSection from "../../ui/ContentSection";
import Reveal from "../../ui/Reveal";
import Img from "../../ui/Img";
import Button from "../../ui/Button";
import { IconList, Steps } from "../../ui/Blocks";
import { PatternBg, Sparkle } from "../../ui/Ornaments";

const stages = [
  { key: "pre-primary", title: "Pre-Primary", grades: "Play Group – K.G.", image: "pre-primary-2", position: "38% 70%" },
  { key: "primary", title: "Primary", grades: "Class 1 – 5", image: "summer-camp-2025-img-20250610-wa0016", position: "50% 30%" },
  { key: "middle", title: "Middle", grades: "Class 6 – 8", image: "science-exhibition-9", position: "42% 35%" },
  { key: "secondary", title: "Secondary", grades: "Class 9 – 10", image: "robotics-lab-3", position: "38% 45%" },
  { key: "senior-secondary", title: "Senior Secondary", grades: "Class 11 – 12 · PCM · PCB · Commerce · Humanities", image: "chemistry-lab-img-2659", position: "50% 25%" },
];

const reasons = [
  { icon: "mosque", title: "Tarbiyah & Akhlaq", text: "We prioritise manners, character building and a nurturing Islamic environment." },
  { icon: "books", title: "Strong Academics", text: "Concept clarity, regular practice and structured learning from the early classes onwards." },
  { icon: "shield", title: "Safe & Caring", text: "Children flourish when they feel safe, respected and supported by their teachers." },
  { icon: "compass", title: "Clear Progress Path", text: "A smooth, guided journey from Play Group to higher classes with age-wise milestones." },
];

const process = [
  { title: "Enquiry", text: "Call or WhatsApp us and share your child’s class and age." },
  { title: "Visit / Meet", text: "Meet our team and understand the environment and expectations." },
  { title: "Assessment", text: "An age-appropriate interaction or assessment, as applicable." },
  { title: "Committee Decision", text: "The admission committee’s decision is final, as per policy." },
];

/* Classes and age criteria maintained in Admin → Classes */
const useClasses = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    let cancelled = false;
    db
      .from("classes")
      .select("name, age_criteria, group_category, sort_order")
      .order("sort_order")
      .then(({ data }) => !cancelled && setClasses(data || []));
    return () => {
      cancelled = true;
    };
  }, []);
  return classes;
};

const ClassesPage = () => {
  const [params, setParams] = useSearchParams();
  const selected = params.get("group");
  const classes = useClasses();

  // Arriving from a journey card (?group=primary): bring the stages into view
  useEffect(() => {
    if (selected) document.getElementById("stages")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selected]);

  const select = (key) => setParams(key === selected ? {} : { group: key }, { replace: true, preventScrollReset: true });

  return (
    <>
      <SEOHelmet />
      <PageHero
        eyebrow={`Admission Open ${admissions.session}`}
        title="Classes & Admissions"
        lede={`Build Deen & Dunya together — ${admissions.classes} and ${admissions.seniorClasses} (${admissions.streams.join(" · ")}).`}
        crumbs={[{ label: "Admissions" }, { label: "Classes" }]}
        image="pre-primary-1"
        imagePosition="40% 60%"
        actions={
          <>
            <Button to={contact.phones[0].href} arrow={false}><PiPhone /> Call for Admission</Button>
            <Button to={contact.whatsapp} variant="light" arrow={false}><PiWhatsappLogo /> WhatsApp Now</Button>
          </>
        }
      />

      <ContentSection id="why-ims" eyebrow="Why IMS" title="A School Parents Trust" lede="Alhamdulillah — a journey of adab, knowledge and confidence.">
        <IconList items={reasons} cols={4} />
      </ContentSection>

      <ContentSection id="stages" tone="emerald" eyebrow="From Play Group to Class XII" title="Choose a Stage" align="center">
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((s, i) => {
            const active = selected === s.key;
            const list = classes.filter((c) => c.group_category === s.key);
            return (
              <Reveal key={s.key} delay={i * 0.06} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <button
                  type="button"
                  onClick={() => select(s.key)}
                  aria-pressed={active}
                  className={`group block w-full overflow-hidden rounded-t-[140px] rounded-b-2xl text-left transition-all duration-300 ${active ? "ring-4 ring-gold-400" : selected ? "opacity-60 hover:opacity-100" : ""}`}
                >
                  <div className="relative h-72">
                    <Img name={s.image} position={s.position} sizes="(min-width: 1024px) 20vw, 50vw" fill className="transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/20 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className="font-display text-2xl font-bold text-ivory-50">{s.title}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">{s.grades}</p>
                    </div>
                  </div>
                  {list.length > 0 && (
                    <ul className="space-y-1.5 bg-ivory-50 p-4">
                      {list.map((c) => (
                        <li key={c.name} className="flex items-center justify-between gap-2 text-sm">
                          <span className="font-semibold text-ink">{c.name}</span>
                          {c.age_criteria && <span className="text-ink/60">Age {c.age_criteria}</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-ivory-100/70">{admissionNote}</p>
      </ContentSection>

      <ContentSection id="admission-process" tone="sand" eyebrow="Admission Process" title="How Admission Works">
        <Steps items={process} />
      </ContentSection>

      <section className="relative overflow-hidden bg-ivory-50 py-20 md:py-24">
        <div className="mx-auto max-w-site px-4 md:px-8">
          <Reveal className="relative overflow-hidden rounded-3xl bg-emerald-700 p-8 text-ivory-50 md:flex md:items-center md:justify-between md:gap-10 md:p-14">
            <PatternBg opacity={0.1} />
            <div className="relative">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300"><Sparkle className="h-3 w-3" /> We’re here to help</p>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Need help choosing the right class?</h2>
              <p className="mt-3 max-w-xl text-ivory-100/80">Send your child’s age and previous class on WhatsApp and get guidance from our admissions team.</p>
            </div>
            <div className="relative mt-8 flex shrink-0 flex-wrap gap-3 md:mt-0">
              <Button to={contact.whatsapp} arrow={false}><PiWhatsappLogo /> WhatsApp Details</Button>
              <Button to={contact.phones[1].href} variant="light" arrow={false}><PiPhone /> {contact.phones[1].label}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ClassesPage;
