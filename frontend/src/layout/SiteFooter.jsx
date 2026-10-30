import { Link, useLocation } from "react-router";
import { PiMapPin, PiPhone, PiEnvelope, PiWhatsappLogo, PiArrowUp } from "react-icons/pi";
import { navigation, contact, school, admissions } from "../content/site";
import Button from "../ui/Button";
import { GoldDivider, PatternBg, Star8 } from "../ui/Ornaments";
import SocialLinks from "./SocialLinks";

const FooterHeading = ({ children }) => (
  <h3 className="mb-5 text-xs font-semibold uppercase tracking-eyebrow text-gold-300">{children}</h3>
);

const SiteFooter = () => {
  const admissionsMenu = navigation.find((n) => n.label === "Admissions");
  // The homepage has its own admissions section, so skip the strip there
  const showAdmissionStrip = useLocation().pathname !== "/";
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy-900 text-ivory-100/80">
      <PatternBg opacity={0.07} />
      <Star8 className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-gold-500/10" strokeWidth={0.6} />

      {/* Admissions call-to-action */}
      {showAdmissionStrip && (
        <div className="relative border-b border-ivory-50/10">
          <div className="mx-auto flex max-w-site flex-col items-start gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-gold-300">Admission Open {admissions.session}</p>
              <p className="mt-2 font-display text-3xl font-bold text-ivory-50 md:text-4xl">
                {admissions.classes} &amp; {admissions.seniorClasses}
              </p>
              <p className="mt-2 text-ivory-100/70">Streams: {admissions.streams.join(" · ")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/classes">Apply Now</Button>
              <Button to={contact.phones[0].href} variant="light" arrow={false}>
                <PiPhone /> Call {contact.phones[0].label}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="relative mx-auto grid max-w-site gap-12 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo/logo.webp" alt="" width="56" height="56" className="h-14 w-14" />
            <span className="font-display text-2xl font-bold text-ivory-50">{school.name}</span>
          </Link>
          <p className="mt-6 font-arabic text-2xl text-gold-300" lang="ar" dir="rtl">{school.mottoArabic}</p>
          <p className="mt-1 text-sm italic text-ivory-100/60">“{school.motto}”</p>
          <p className="mt-5 max-w-sm leading-relaxed">{school.summary}</p>
          <SocialLinks className="mt-6 gap-5 text-ivory-50" iconClass="h-6 w-6" />
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Explore</FooterHeading>
          <ul className="space-y-3">
            {navigation.map((n) => (
              <li key={n.label}><Link to={n.to} className="hover:text-gold-300">{n.label}</Link></li>
            ))}
            <li><Link to="/gallery" className="hover:text-gold-300">Gallery</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Admissions</FooterHeading>
          <ul className="space-y-3">
            {admissionsMenu.links.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-gold-300">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <FooterHeading>Contact</FooterHeading>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <PiMapPin className="mt-1 shrink-0 text-lg text-gold-300" aria-hidden="true" />
              <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="hover:text-gold-300">{contact.addressFull}</a>
            </li>
            <li className="flex gap-3">
              <PiPhone className="mt-1 shrink-0 text-lg text-gold-300" aria-hidden="true" />
              <span>
                {contact.phones.map((p, i) => (
                  <span key={p.href}>
                    {i > 0 && ", "}
                    <a href={p.href} className="hover:text-gold-300">{p.label}</a>
                  </span>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <PiEnvelope className="mt-1 shrink-0 text-lg text-gold-300" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-gold-300">{contact.email}</a>
            </li>
            <li className="flex gap-3">
              <PiWhatsappLogo className="mt-1 shrink-0 text-lg text-gold-300" aria-hidden="true" />
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-gold-300">WhatsApp Admissions</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-ivory-50/10">
        <div className="mx-auto flex max-w-site flex-col items-center gap-4 px-4 py-6 text-sm text-ivory-100/60 md:flex-row md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} {school.name}, Aligarh · {school.affiliation} · Affiliation No. {school.affiliationNo}</p>
          <GoldDivider tone="light" className="hidden md:flex" />
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-gold-300 hover:text-gold-100"
          >
            Back to top <PiArrowUp aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
