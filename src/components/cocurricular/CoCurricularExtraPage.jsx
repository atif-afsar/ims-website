import React from "react";
import { Helmet } from "react-helmet-async";
import { siteUrl } from "../../siteMeta";
import Back from "../common/back/Back";
import CoCurricularExtraContent from "./CoCurricularExtraContent";
import "./coCurricularExtra.css";

const CoCurricularExtraPage = () => {
  return (
    <>
      <Helmet>
        <title>
          Co-Curricular &amp; Extra Curricular | Islamic Mission School — IMS
        </title>
        <meta
          name="description"
          content="Discover IMS co-curricular and extra-curricular life: English and Arabic communication, project-based learning, Taekwondo, Sports Day, Annual Function, competitions, and more."
        />
        <link rel="canonical" href={siteUrl("/co-curricular-extracurricular")} />
        <meta
          property="og:title"
          content="Co-Curricular &amp; Extra Curricular | IMS"
        />
        <meta
          property="og:description"
          content="Where passion is discovered, character is built, and talents shine at Islamic Mission School."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={siteUrl("/co-curricular-extracurricular")}
        />
        <meta property="og:image" content={siteUrl("/images/logo/logo.webp")} />
      </Helmet>

      <div data-aos="fade-down" data-aos-duration="900">
        <Back
          title="Co-Curricular & Extra Curricular"
          subtitle="Where Passion is Discovered, Character is Built, and Talents Shine."
          crumbLabel="Co-Curricular"
        />
      </div>

      <section className="cc-pageWrap" aria-label="Co-curricular and extra curricular programmes">
        <div className="container cc-pageInner">
          <div className="cc-ribbon" aria-hidden="true">
            <span className="cc-ribbon-dot" />
            <span>Beyond the classroom · Skills · Confidence · Character</span>
          </div>
          <p className="cc-lead">
            A holistic IMS experience: communication arts, inquiry through projects,
            physical courage, celebrations of teamwork, and platforms for talent—all in a
            values-led environment.
          </p>
          <CoCurricularExtraContent />
        </div>
      </section>
    </>
  );
};

export default CoCurricularExtraPage;
