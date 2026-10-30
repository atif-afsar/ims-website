import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiPlus } from "react-icons/pi";
import Reveal from "../../ui/Reveal";
import SectionHeading from "../../ui/SectionHeading";
import Button from "../../ui/Button";

/* Accordion of common questions, with FAQ structured data for search engines */
const FAQ = ({ content }) => {
  const items = (content.items || []).filter((f) => f.q && f.a);
  const [open, setOpen] = useState(0);
  if (!items.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <section className="bg-ivory-50 py-24 md:py-32">
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <div className="mx-auto grid max-w-site gap-12 px-4 md:px-8 lg:grid-cols-[5fr_7fr]">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} lede="Can’t find your answer? Our admissions team is happy to help." />
          <Button to="/contact" variant="emerald" className="mt-8">Ask a Question</Button>
        </Reveal>
        <ul className="divide-y divide-gold-500/25 border-y border-gold-500/25">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={`${f.q}-${i}`}>
                <h3>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className={`font-display text-lg font-bold md:text-xl ${isOpen ? "text-emerald-700" : "text-ink"}`}>{f.q}</span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${isOpen ? "rotate-45 bg-emerald-700 text-ivory-50" : "bg-ivory-200 text-emerald-800"}`}>
                      <PiPlus aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="pb-6 pr-14 leading-relaxed text-ink/70">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
