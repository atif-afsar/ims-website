import React from "react";
import { Helmet } from "react-helmet-async";
import Back from "../common/back/Back";
import AboutCard from "./AboutCard";
import "./about.css";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Islamic Mission School | Excellence in Islamic & Modern Education</title>
        <meta
          name="description"
          content="Discover Islamic Mission School (IMS) – a leading institution blending authentic Islamic values with modern education. Experienced teachers, character building, and academic excellence since 20+ years."
        />
        <meta
          name="keywords"
          content="Islamic Mission School, IMS, Islamic education India, best Islamic school, madrasa with modern education, character building school"
        />
        <link rel="canonical" href="https://www.imschool.in/about" />
        <meta property="og:title" content="About Islamic Mission School - Who We Are" />
        <meta
          property="og:description"
          content="A community of excellence shaping future leaders through Islamic values and modern education."
        />
        <meta property="og:image" content="/images/about/ims-about.png" />
        <meta property="og:url" content="https://www.imschool.in/about" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div data-aos="fade-down" data-aos-duration="900">
        <Back title="About Us" />
      </div>

      <AboutCard />
    </>
  );
};

export default About;
