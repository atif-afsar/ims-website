import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { organizationSchema, localBusinessSchema, webSiteSchema } from "../../utils/seoHelpers";
import { SITE_ORIGIN, siteUrl } from "../../siteMeta";
import { useHomeContent } from "../../hooks/useHomeContent";
import Hero from "./Hero";
import Intro from "./Intro";
import ValuesSplit from "./ValuesSplit";
import SpecialFeatures from "./SpecialFeatures";
import LearningJourney from "./LearningJourney";
import CampusTour from "./CampusTour";
import Highlights from "./Highlights";
import Results from "./Results";
import Achievements from "./Achievements";
import LeadershipMessage from "./LeadershipMessage";
import NewsEvents from "./NewsEvents";
import Testimonials from "./Testimonials";
import AdmissionCTA from "./AdmissionCTA";
import FAQ from "./FAQ";
import LifeAtIMS from "./LifeAtIMS";

/* Section key (see content/homeSections.js) → component */
const COMPONENTS = {
  hero: Hero,
  intro: Intro,
  values: ValuesSplit,
  special_features: SpecialFeatures,
  journey: LearningJourney,
  campus_tour: CampusTour,
  highlights: Highlights,
  results: Results,
  achievements: Achievements,
  principal_message: LeadershipMessage,
  news_events: NewsEvents,
  testimonials: Testimonials,
  admission: AdmissionCTA,
  faq: FAQ,
  life: LifeAtIMS,
};

const HomePage = () => {
  const home = useHomeContent();

  // Live data some sections need besides their own content
  const extras = {
    hero: { slides: home.heroSlides },
    news_events: { notices: home.notices, events: home.upcomingEvents },
    testimonials: { items: home.testimonials },
  };

  return (
    <>
      <SEOHelmet
        title="Islamic Mission School Aligarh | CISCE School, Play Group to Class XII"
        description="Islamic Mission School (IMS), Aligarh — a CISCE-affiliated, value-based school since 2008. ICSE academics with STEM, Robotics & AI, integrated NEET/JEE, Hifz and Arabic. Admission open 2027–28."
        keywords="Islamic Mission School, IMS Aligarh, CISCE school Aligarh, ICSE school Aligarh, NEET JEE integrated school, Robotics school Aligarh, Hifz, admission 2027-28"
        canonical={siteUrl("/")}
        ogTitle="Islamic Mission School — Shaping Hearts, Building Minds"
        ogDescription="Value-based CISCE education in Aligarh since 2008. Admission open for 2027–28."
        ogImage={siteUrl("/media/campus/campus-aerial-1600.webp")}
        ogUrl={SITE_ORIGIN}
        structuredData={{ "@context": "https://schema.org", "@graph": [webSiteSchema, organizationSchema, localBusinessSchema] }}
      />
      {home.sections
        .filter((s) => s.visible && COMPONENTS[s.key])
        .map((s) => {
          const Section = COMPONENTS[s.key];
          return <Section key={s.key} content={s.content} {...extras[s.key]} />;
        })}
    </>
  );
};

export default HomePage;
