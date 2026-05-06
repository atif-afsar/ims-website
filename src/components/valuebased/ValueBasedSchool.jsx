import React from "react";
import { Helmet } from "react-helmet-async";
import Back from "../common/back/Back";
import ValueBasedSchoolContent from "./ValueBasedSchoolContent";
import "../about/about.css";
import "./valueBasedSchool.css";

const ValueBasedSchool = () => {
  return (
    <>
      <Helmet>
        <title>
          IMS, A Value Based School | Islamic Mission School — Character & Curriculum
        </title>
        <meta
          name="description"
          content="Discover how Islamic Mission School integrates values with academics: why value-based schools matter, how values live in the curriculum, and education compared with value-based education."
        />
        <link rel="canonical" href="https://www.imschool.in/ims-value-based-school" />
        <meta
          property="og:title"
          content="IMS, A Value Based School | Islamic Mission School"
        />
        <meta
          property="og:description"
          content="Integrated values and learning at IMS—from classroom culture to cooperation for co-existence."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.imschool.in/ims-value-based-school"
        />
      </Helmet>

      <div data-aos="fade-down" data-aos-duration="900">
        <Back
          title="IMS, A Value Based School"
          subtitle="Character, compassion, and academic depth—woven together."
          crumbLabel="IMS, A Value Based School"
        />
      </div>

      <section className="vb-pageWrap" aria-label="IMS value-based education">
        <div className="container vb-pageInner">
          <div className="vb-pageRibbon" aria-hidden="true">
            <span className="vb-ribbon-accent" />
            <span>Value based · Whole-school · Rooted in adab</span>
          </div>

          <ValueBasedSchoolContent />
        </div>
      </section>
    </>
  );
};

export default ValueBasedSchool;
