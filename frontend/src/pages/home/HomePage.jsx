import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { schoolSchema, webSiteSchema } from "../../utils/seoHelpers";
import { useHomeContent } from "../../hooks/useHomeContent";
import { COMPONENTS } from "./sections";

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
      <SEOHelmet structuredData={[webSiteSchema, schoolSchema]} />
      {/* One stable main heading for search engines and screen readers; the slides below use h2 */}
      <h1 className="sr-only">Islamic Mission School, Aligarh — CISCE-affiliated school from Play Group to Class XII</h1>
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
