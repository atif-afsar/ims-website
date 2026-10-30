import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
import media from "../../content/media";
import { facilities } from "../../content/campus";
import PageHero from "../../ui/PageHero";
import ContentSection from "../../ui/ContentSection";
import PhotoGrid from "../../ui/PhotoGrid";
import Button from "../../ui/Button";
import { IconList } from "../../ui/Blocks";
import { FacilityCards } from "./CampusPage";

/* One template for /infrastructure/<slug> */
const FacilityPage = ({ slug }) => {
  const f = facilities[slug];
  const path = `/infrastructure/${slug}`;

  return (
    <>
      <SEOHelmet
        title={`${f.title} | Islamic Mission School Aligarh`}
        description={f.lede}
        canonical={siteUrl(path)}
        ogTitle={`${f.title} | Islamic Mission School`}
        ogDescription={f.lede}
        ogImage={siteUrl(media[f.heroImage].src)}
        ogUrl={siteUrl(path)}
      />
      <PageHero
        eyebrow={f.eyebrow}
        title={`IMS ${f.title}`}
        lede={f.lede}
        crumbs={[{ label: "Campus", to: "/facilities" }, { label: f.title }]}
        image={f.heroImage}
        imagePosition={f.heroPosition}
        actions={<Button to="/contact" variant="light">Visit the Campus</Button>}
      />

      <ContentSection id="features" eyebrow={f.title} title={f.featuresTitle}>
        <IconList items={f.features} />
      </ContentSection>

      <ContentSection id="photos" tone="sand" eyebrow="Gallery" title={f.galleryTitle} lede={f.galleryText}>
        <PhotoGrid names={f.gallery} className="mt-12" />
      </ContentSection>

      <ContentSection id="more" tone="emerald" eyebrow="Campus" title="More to Explore" align="center">
        <FacilityCards exclude={slug} />
      </ContentSection>
    </>
  );
};

export const ComputerLabPage = () => <FacilityPage slug="computer-lab" />;
export const LibraryPage = () => <FacilityPage slug="library" />;
export const LaboratoriesPage = () => <FacilityPage slug="laboratories" />;
export const SportsComplexPage = () => <FacilityPage slug="sports-complex" />;

export default FacilityPage;
