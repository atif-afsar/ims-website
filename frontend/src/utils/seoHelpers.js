/*
 * Structured data (schema.org JSON-LD) built from the site's real details in
 * content/site.js. Never add ratings or reviews here unless they are real,
 * collected on this site — Google penalises invented ones.
 */
import { SITE_ORIGIN } from "../siteMeta";
import { school, contact, socials } from "../content/site";

const ID = `${SITE_ORIGIN}/#school`;

export const schoolSchema = {
  "@type": "School",
  "@id": ID,
  name: school.name,
  alternateName: ["IMS Aligarh", "Islamic Mission School Aligarh"],
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/images/logo/logo.webp`,
  image: `${SITE_ORIGIN}/images/og/home.jpg`,
  description: school.summary,
  slogan: school.tagline,
  foundingDate: String(school.established),
  telephone: contact.phones.map((p) => p.href.replace("tel:", "")),
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fort Green City, Near AMU Fort",
    addressLocality: "Aligarh",
    addressRegion: "Uttar Pradesh",
    postalCode: "202001",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 27.9314593, longitude: 78.0552577 },
  hasMap: contact.mapUrl,
  areaServed: { "@type": "City", name: "Aligarh" },
  sameAs: socials.map((s) => s.href),
};

export const webSiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_ORIGIN}/#website`,
  name: school.name,
  alternateName: "IMS Aligarh",
  url: `${SITE_ORIGIN}/`,
  inLanguage: "en-IN",
  publisher: { "@id": ID },
};

/* Home › Section › Page, from a list of { name, path } */
export const breadcrumbSchema = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_ORIGIN}${item.path}`,
  })),
});
