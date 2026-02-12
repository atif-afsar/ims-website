import SEOHelmet from "../common/SEO/SEOHelmet";
import { organizationSchema, localBusinessSchema } from "../../utils/seoHelpers";
import Hero from "./hero/Hero";
import AboutCard from "../about/AboutCard";
import WhyIMS from "../whychoose/WhyIMS";
import Testimonal from "./testimonal/Testimonal";
import NEETProgram from "../neet/NEETProgram";
import CoCurricular from "../cocurricular/CoCurricular";

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, localBusinessSchema]
  };

  return (
    <>
      <SEOHelmet
        title="Islamic Mission School - Best School in Aligarh | Value-Based Education"
        description="Islamic Mission School (IMS) is the best school in Aligarh offering value-based education, academic excellence, NEET/JEE programs, and character development. CISCE-affiliated institution established in 2008."
        keywords="best school in Aligarh, Islamic school, CISCE school, value-based education, academic excellence, NEET coaching, character development, co-curricular activities"
        canonical="https://islamicmissionschool.org/"
        ogTitle="Islamic Mission School - Best School in Aligarh"
        ogDescription="Discover why IMS is the best choice for your child's education. Value-based learning, academic excellence, and holistic development."
        ogImage="https://islamicmissionschool.org/images/logo/logo.webp"
        ogUrl="https://islamicmissionschool.org/"
        twitterTitle="Best School in Aligarh - Islamic Mission School"
        twitterDescription="Join IMS for value-based education and academic excellence"
        structuredData={structuredData}
      />

      <section data-aos="fade-up" data-aos-duration="900">
        <Hero />
      </section>

      <section data-aos="fade-up" data-aos-delay="100" data-aos-duration="900">
        <AboutCard />
      </section>

      <section data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">
        <WhyIMS />
      </section>

      <section data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
        <Testimonal />
      </section>

      <section data-aos="fade-up" data-aos-delay="250" data-aos-duration="900">
        <NEETProgram />
      </section>

      <section data-aos="fade-up" data-aos-delay="300" data-aos-duration="900">
        <CoCurricular />
      </section>
    </>
  );
};

export default Home;
