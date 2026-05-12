import React from "react";
import { Helmet } from "react-helmet-async";
import { siteUrl } from "../../siteMeta";
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
        <link rel="canonical" href={siteUrl("/facilities")} />
        <meta property="og:title" content="Facilities | Islamic Mission School" />
        <meta property="og:description" content="Campus, labs, library, conference hall, and learning spaces at IMS Aligarh." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl("/facilities")} />
        <meta property="og:image" content={siteUrl("/images/logo/logo.webp")} />
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
