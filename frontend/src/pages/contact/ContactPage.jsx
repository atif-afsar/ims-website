import { PiMapPin, PiPhone, PiEnvelope, PiWhatsappLogo, PiNavigationArrow } from "react-icons/pi";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
import { contact, school } from "../../content/site";
import PageHero from "../../ui/PageHero";
import Reveal from "../../ui/Reveal";
import ContactForm from "../../ui/ContactForm";
import SocialLinks from "../../layout/SocialLinks";
import { PatternBg } from "../../ui/Ornaments";

const InfoCard = ({ icon: Icon, label, children }) => (
  <div className="flex gap-4 rounded-2xl bg-ivory-50/10 p-5">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-400 text-xl text-emerald-900"><Icon aria-hidden="true" /></span>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-eyebrow text-gold-300">{label}</p>
      <div className="mt-1 text-ivory-50">{children}</div>
    </div>
  </div>
);

const ContactPage = () => (
  <>
    <SEOHelmet
      title="Contact Islamic Mission School | Get in Touch"
      description={`Contact IMS Aligarh for admissions, queries or a campus visit. ${contact.addressFull}. Phone ${contact.phones.map((p) => p.label).join(", ")}.`}
      canonical={siteUrl("/contact")}
      ogTitle="Contact Us - Islamic Mission School"
      ogDescription="Admissions, queries and campus visits — we’re here to help."
      ogUrl={siteUrl("/contact")}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "School",
        name: school.name,
        address: { "@type": "PostalAddress", streetAddress: "Fort Green City, AMU Fort", addressLocality: "Aligarh", addressRegion: "Uttar Pradesh", postalCode: "202001", addressCountry: "IN" },
        telephone: contact.phones.map((p) => p.href.replace("tel:", "")),
        email: contact.email,
      }}
    />
    <PageHero
      eyebrow="We’re here to help"
      title="Contact Us"
      lede="Questions about admissions, a campus visit, or anything else — call, WhatsApp or send us a message."
      crumbs={[{ label: "Contact" }]}
    />

    <section className="bg-ivory-100 py-12 md:py-16">
      <div className="mx-auto grid max-w-site gap-6 px-4 md:px-8 lg:grid-cols-[5fr_7fr]">
        <Reveal className="relative overflow-hidden rounded-3xl bg-emerald-800 p-6 md:p-10">
          <PatternBg opacity={0.08} />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-ivory-50">Get in Touch</h2>
            <p className="mt-2 text-ivory-100/75">Our admissions team will be glad to guide you.</p>
            <div className="mt-8 grid gap-3">
              <InfoCard icon={PiMapPin} label="Address">
                <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="hover:text-gold-300">{contact.addressFull}</a>
              </InfoCard>
              <InfoCard icon={PiPhone} label="Phone">
                {contact.phones.map((p) => <a key={p.href} href={p.href} className="block hover:text-gold-300">{p.label}</a>)}
              </InfoCard>
              <InfoCard icon={PiWhatsappLogo} label="WhatsApp">
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-gold-300">Chat with admissions</a>
              </InfoCard>
              <InfoCard icon={PiEnvelope} label="Email">
                <a href={`mailto:${contact.email}`} className="break-all hover:text-gold-300">{contact.email}</a>
              </InfoCard>
            </div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-eyebrow text-gold-300">Follow us</p>
            <SocialLinks className="mt-3 gap-5 text-ivory-50" iconClass="h-7 w-7" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl bg-ivory-50 p-6 shadow-card md:p-10">
          <h2 className="font-display text-3xl font-bold text-ink">Send a Message</h2>
          <p className="mt-2 text-ink/60">Fill in the form and our team will get back to you.</p>
          <div className="mt-8"><ContactForm /></div>
        </Reveal>
      </div>

      <div className="mx-auto mt-6 max-w-site px-4 md:px-8">
        <Reveal className="relative overflow-hidden rounded-3xl border-4 border-ivory-50 shadow-card">
          <iframe title="Islamic Mission School on Google Maps" src={contact.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[380px] w-full" allowFullScreen />
          <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-ivory-50 shadow-lift hover:bg-emerald-600">
            <PiNavigationArrow aria-hidden="true" /> Get directions
          </a>
        </Reveal>
      </div>
    </section>
  </>
);

export default ContactPage;
