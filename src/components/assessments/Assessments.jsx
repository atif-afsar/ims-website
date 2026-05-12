import React from "react";
import { Helmet } from "react-helmet-async";
import { siteUrl } from "../../siteMeta";
import Back from "../common/back/Back";
import AssessmentsContent from "./AssessmentsContent";
import "../curriculum/curriculum.css";
import "./assessments.css";

const Assessments = () => {
  return (
    <>
      <Helmet>
        <title>
          Assessments at IMS | Islamic Mission School — Formative, Summative &amp;
          Olympiad
        </title>
        <meta
          name="description"
          content="Assessments at Islamic Mission School: Summative & Formative Assessments, Chapter Assessments, and Olympiad Exams (NCO, NSO, IMO, IEO) — embedded in the learning process to nurture HOTS."
        />
        <link rel="canonical" href={siteUrl("/assessments")} />
        <meta
          property="og:title"
          content="Assessments at IMS | Islamic Mission School"
        />
        <meta
          property="og:description"
          content="How IMS evaluates learning: Formative & Summative assessments, Chapter assessments, and Olympiads."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl("/assessments")} />
        <meta property="og:image" content={siteUrl("/images/logo/logo.webp")} />
      </Helmet>

      <div data-aos="fade-down" data-aos-duration="900">
        <Back
          title="Assessments at IMS"
          subtitle="Embedded in Learning · Inspiring Higher Order Thinking"
          crumbLabel="Assessments"
        />
      </div>

      <section
        className="cur-pageWrap"
        aria-label="Assessments at Islamic Mission School"
      >
        <div className="container cur-pageInner">
          <div className="cur-ribbon" aria-hidden="true">
            <span className="cur-ribbon-dot" />
            <span>Formative · Summative · Chapter · Olympiad</span>
          </div>
          <p className="cur-lead">
            At IMS, assessment is more than measurement—it is a dialogue between
            teaching and learning. We blend formative, summative, chapter, and
            Olympiad assessments to grow understanding into critical thinking and
            creation.
          </p>
          <AssessmentsContent />
        </div>
      </section>
    </>
  );
};

export default Assessments;
