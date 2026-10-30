import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "../../ui/Reveal";
import SmartImg from "../../ui/SmartImg";
import SectionHeading from "../../ui/SectionHeading";
import Button from "../../ui/Button";
import { PatternBg } from "../../ui/Ornaments";

// Faces sit in different places in each library photo
const FOCUS = {
  "media:pre-primary-2": "38% 70%",
  "media:summer-camp-2025-img-20250610-wa0016": "50% 30%",
  "media:science-exhibition-9": "42% 35%",
  "media:robotics-lab-3": "38% 45%",
  "media:chemistry-lab-img-2659": "50% 25%",
};

const LearningJourney = ({ content }) => {
  const stages = content.stages || [];
  const cols = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" }[stages.length] || "lg:grid-cols-5";
  return (
    <section className="relative overflow-hidden bg-emerald-800 py-24 md:py-32">
      <PatternBg opacity={0.08} />
      <div className="relative mx-auto max-w-site px-4 md:px-8">
        <Reveal>
          <SectionHeading align="center" tone="light" eyebrow={content.eyebrow} title={content.title} />
        </Reveal>
        <div className={`mt-16 grid gap-4 sm:grid-cols-2 ${cols}`}>
          {stages.map((s, i) => (
            <Reveal key={`${s.title}-${i}`} delay={i * 0.08} className={i === stages.length - 1 && stages.length % 2 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <Link to={s.group ? `/classes?group=${s.group}` : "/classes"} className="group relative block h-80 overflow-hidden rounded-t-[160px] rounded-b-2xl lg:h-[26rem]">
                <SmartImg src={s.image} position={FOCUS[s.image]} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" fill className="transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/30 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="mb-3 block h-px w-10 bg-gold-400 transition-all duration-500 group-hover:w-16" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold text-ivory-50">{s.title}</h3>
                  <p className="mt-1 flex items-end justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-300">
                    {s.grades}
                    <HiArrowRight className="shrink-0 text-base text-ivory-50 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {content.buttonText && (
          <div className="mt-14 text-center">
            <Button to="/classes">{content.buttonText}</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LearningJourney;
