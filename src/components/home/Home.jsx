import Hero from "./hero/Hero";
import AboutCard from "../about/AboutCard";
import WhyIMS from "../whychoose/WhyIMS";
import Testimonal from "./testimonal/Testimonal";
import NEETProgram from "../neet/NEETProgram";
import CoCurricular from "../cocurricular/CoCurricular";

const Home = () => {
  return (
    <>
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
