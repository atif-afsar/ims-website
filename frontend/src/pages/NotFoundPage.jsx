import { Link } from "react-router";
import SEOHelmet from "../components/common/SEO/SEOHelmet";
import { Helmet } from "../components/common/SEO/Helmet";
import { navigation } from "../content/site";
import Button from "../ui/Button";
import { PatternBg, Star8 } from "../ui/Ornaments";

const NotFoundPage = () => (
  <>
    <SEOHelmet title="Page Not Found | Islamic Mission School" description="The page you are looking for could not be found." />
    {/* Keep missing pages out of search results (runs after SEOHelmet, so it wins) */}
    <Helmet>
      <meta name="robots" content="noindex" />
    </Helmet>
    <section className="relative overflow-hidden bg-emerald-800 py-24 text-center text-ivory-50 md:py-32">
      <PatternBg opacity={0.08} />
      <div className="relative mx-auto max-w-2xl px-4">
        <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
          <Star8 className="absolute inset-0 h-full w-full text-gold-300/50" strokeWidth={1.5} />
          <span className="font-display text-6xl font-bold text-gold-300">404</span>
        </div>
        <h1 className="mt-8 font-display text-4xl font-bold md:text-5xl">This page could not be found</h1>
        <p className="mt-4 text-lg text-ivory-100/80">It may have moved during our website update. These links will help you find your way.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Back to Home</Button>
          <Button to="/contact" variant="light">Contact Us</Button>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-2">
          {navigation.map((n) => (
            <li key={n.label}>
              <Link to={n.to} className="inline-block rounded-full border border-ivory-50/25 px-4 py-2 text-sm font-medium hover:border-gold-300 hover:text-gold-300">{n.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default NotFoundPage;
