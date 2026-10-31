import { useLocation } from "react-router";
import { Helmet } from "./Helmet";
import { siteUrl, ogImagePath } from "../../../siteMeta";
import { breadcrumbSchema } from "../../../utils/seoHelpers";
import seo from "../../../content/seo-pages.json";

/* "/about/" → "/about" */
const normalisePath = (path) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/*
 * Head tags for the current page, from content/seo-pages.json (the server
 * puts the same tags into the HTML before JavaScript runs, see
 * backend/src/seo.js). Props override the file for pages that need it.
 *
 *   <SEOHelmet />                         most pages
 *   <SEOHelmet structuredData={…} />      extra JSON-LD for this page
 *   <SEOHelmet notFound />                404 page: noindex
 */
const SEOHelmet = ({ title, description, image, structuredData, notFound = false }) => {
  const path = normalisePath(useLocation().pathname);
  const page = (notFound ? seo.notFound : seo.pages[path]) || seo.notFound;
  const known = !notFound && Boolean(seo.pages[path]);

  const finalTitle = title || page.title;
  const finalDescription = description || page.description;
  const url = siteUrl(known ? path : "/");
  const shareImage = siteUrl(image || ogImagePath(known ? path : "/"));

  // Breadcrumbs: Home › (parent) › this page
  const crumbs = [];
  if (known && path !== "/") {
    crumbs.push({ name: "Home", path: "/" });
    if (page.parent && seo.pages[page.parent]) crumbs.push({ name: seo.pages[page.parent].name, path: page.parent });
    crumbs.push({ name: page.name, path });
  }
  const graph = [
    ...(crumbs.length ? [breadcrumbSchema(crumbs)] : []),
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : []),
  ];

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="robots" content={known ? "index, follow, max-image-preview:large" : "noindex, follow"} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={shareImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={shareImage} />

      {graph.length > 0 && <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>}
    </Helmet>
  );
};

export default SEOHelmet;
