import React from "react";
import { Helmet } from "react-helmet-async";
import Back from "../common/back/Back";
import FacilitiesContent from "./FacilitiesContent";
import "./facilities.css";

const FacilitiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Facilities | Islamic Mission School</title>
        <meta
          name="description"
          content="Explore IMS facilities: 3-acre campus, modern labs, biology and computer science labs, library, conference hall, separate sections for boys and girls, and audio-visual learning systems."
        />
      </Helmet>

      <div data-aos="fade-down" data-aos-duration="900">
        <Back
          title="Facilities"
          subtitle="A learning environment built for excellence and growth."
          crumbLabel="Facilities"
        />
      </div>

      <section className="fac-pageWrap" aria-label="Facilities content">
        <div className="container fac-pageInner">
          <FacilitiesContent />
        </div>
      </section>
    </>
  );
};

export default FacilitiesPage;
