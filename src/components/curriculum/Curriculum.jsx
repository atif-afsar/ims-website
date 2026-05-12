import React from "react";
import { Helmet } from "react-helmet-async";
import { siteUrl } from "../../siteMeta";
import Back from "../common/back/Back";
import CurriculumContent from "./CurriculumContent";
import "./curriculum.css";

const CurriculumPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Curriculum | Islamic Mission School — ICSE, Skills, STEM &amp; Robotics
        </title>
        <meta
          name="description"
          content="IMS curriculum: ICSE &amp; ISC academic framework, 21st century skills pathways, Evan Moor STEM from Grade 1, and Eduvate Robotics &amp; AI—nurturing mind, body, and soul."
        />
        <link rel="canonical" href={siteUrl("/curriculum")} />
        <meta property="og:title" content="Curriculum | Islamic Mission School" />
        <meta
          property="og:description"
          content="National framework academics, skills for life, world-class STEM, and Robotics &amp; AI at IMS."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl("/curriculum")} />
        <meta property="og:image" content={siteUrl("/images/logo/logo.webp")} />
      </Helmet>

      <div data-aos="fade-down" data-aos-duration="900">
        <Back
          title="III. Curriculum"
          subtitle="Curriculum: Nurturing Mind, Body, and Soul"
          crumbLabel="Curriculum"
        />
      </div>

      <section className="cur-pageWrap" aria-label="Islamic Mission School curriculum">
        <div className="container cur-pageInner">
          <div className="cur-ribbon" aria-hidden="true">
            <span className="cur-ribbon-dot" />
            <span>ICSE &amp; ISC · Skills · STEM · Robotics &amp; AI</span>
          </div>
          <p className="cur-lead">
            Explore how IMS combines national academic standards with purposeful skills
            development, hands-on STEM, and future-ready technology learning—within an
            ethical and spiritual outlook.
          </p>
          <CurriculumContent />
        </div>
      </section>
    </>
  );
};

export default CurriculumPage;
