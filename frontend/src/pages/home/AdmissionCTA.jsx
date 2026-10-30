import { PiPhone, PiWhatsappLogo } from "react-icons/pi";
import { contact } from "../../content/site";
import Reveal from "../../ui/Reveal";
import Button from "../../ui/Button";
import { PatternBg, Sparkle, Star8 } from "../../ui/Ornaments";

/* Admission banner with the steps and direct contact buttons */
const AdmissionCTA = ({ content }) => (
  <section className="bg-ivory-50 px-2 py-2 md:px-3 md:py-3">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-navy-900 px-6 py-20 text-ivory-50 md:px-12 md:py-24">
      <PatternBg opacity={0.1} />
      <Star8 className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 text-gold-300/15" strokeWidth={0.8} />
      <div className="relative mx-auto max-w-site">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300"><Sparkle className="h-3 w-3" /> {content.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight md:text-6xl">{content.title}</h2>
            {content.text && <p className="mt-5 max-w-2xl text-lg text-ivory-100/80">{content.text}</p>}
          </Reveal>
          <Reveal delay={0.1} className="flex flex-wrap gap-3">
            {content.primaryText && content.primaryLink && <Button to={content.primaryLink}>{content.primaryText}</Button>}
            <Button to={contact.phones[0].href} variant="light" arrow={false}><PiPhone /> {contact.phones[0].label}</Button>
            <Button to={contact.whatsapp} variant="light" arrow={false}><PiWhatsappLogo /> WhatsApp</Button>
          </Reveal>
        </div>

        {content.steps?.length > 0 && (
          <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {content.steps.map((s, i) => (
              <Reveal as="li" key={`${s.title}-${i}`} delay={i * 0.08} className="relative rounded-2xl bg-ivory-50/10 p-6 ring-1 ring-gold-300/25 backdrop-blur-sm">
                <span className="font-display text-4xl font-bold text-gold-400">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-xl font-bold">{s.title}</p>
                {s.text && <p className="mt-1 text-sm leading-relaxed text-ivory-100/75">{s.text}</p>}
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </div>
  </section>
);

export default AdmissionCTA;
