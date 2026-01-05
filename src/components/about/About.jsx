import React from "react";
import { Helmet } from "react-helmet-async";
import Back from "../common/back/Back";
import AboutCard from "./AboutCard";
import "./about.css";

const About = () => {
  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <title>
          About Islamic Mission School (IMS) | Shaping Hearts, Building Minds
        </title>

        <meta
          name="description"
          content="Islamic Mission School (IMS), established in 2008, is a CISCE-affiliated, value-based institution in Aligarh. We blend academic excellence with moral, spiritual, and character development to nurture compassionate, confident, and responsible future leaders."
        />

        <meta
          name="keywords"
          content="Islamic Mission School, IMS Aligarh, value based education, CISCE school Aligarh, Islamic school India, character building school, moral education, STEM education school"
        />

        <link rel="canonical" href="https://www.imschool.in/about" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About IMS | Shaping Hearts, Building Minds"
        />
        <meta
          property="og:description"
          content="At Islamic Mission School, education goes beyond academics. We nurture intellect, character, and faith through a value-based, future-ready curriculum."
        />
        <meta property="og:image" content="/images/about/ims-about.png" />
        <meta property="og:url" content="https://www.imschool.in/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Islamic Mission School | Value-Based Education"
        />
        <meta
          name="twitter:description"
          content="Discover IMS – a school for life (Madrasat-ul-Hayat), nurturing academic excellence, moral values, and leadership."
        />
      </Helmet>

      {/* Page Header */}
      <div data-aos="fade-down" data-aos-duration="900">
        <Back
          title="About Islamic Mission School"
          subtitle="Shaping Hearts, Building Minds — The IMS Way"
        />
      </div>

      {/* Main About Content */}
      <AboutCard />
    </>
  );
};

export default About;
