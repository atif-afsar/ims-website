import React from "react";
import aboutImg from "../../assets/images/about/ims-about.png";
import Heading from "../common/heading/Heading";
import Awrapper from "./Awrapper";
import "./about.css";

const AboutCard = () => {
  return (
    <>
      <section
        className="aboutHome sectionDecorAbout"
        aria-labelledby="about-heading"
      >
        {/* Decorative Stickers */}
        <img
          className="aboutSticker aboutStickerLeft"
          src="/images/stickers/bird.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <img
          className="aboutSticker aboutStickerRight"
          src="/images/stickers/balloon.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <div className="container flexSB">
          {/* Image Section */}
          <div
            className="left row"
            data-aos="fade-right"
            data-aos-duration="900"
          >
            <div className="aboutImgWrap">
              <img
                src={aboutImg}
                alt="Islamic Mission School campus fostering academic excellence and moral development"
                loading="lazy"
                className="about-img"
              />
            </div>
          </div>

          {/* Text Content */}
          <div
            className="right row"
            data-aos="fade-left"
            data-aos-duration="900"
          >
            <div data-aos="fade-up" data-aos-delay="100">
              <Heading
                subtitle="ABOUT IMS"
                title="Shaping Hearts, Building Minds"
              />
            </div>

            <article className="about-content">
              <p
                className="about-desc"
                data-aos="fade-up"
                data-aos-delay="150"
              >
                Our children are a blessing <strong>(Naemat)</strong> bestowed
                upon us by the Almighty Allah and a sacred trust{" "}
                <strong>(Amaanah)</strong> for which we are accountable. At{" "}
                <span className="highlight">
                  Islamic Mission School (IMS)
                </span>
                , we believe that education is not limited to academic success
                alone—it is the foundation of strong character, moral integrity,
                and responsible citizenship.
              </p>

              <p
                className="about-desc"
                data-aos="fade-up"
                data-aos-delay="220"
              >
                Established in <strong>2008</strong>, IMS was founded with a clear
                vision: to nurture well-rounded individuals who excel in this
                world through knowledge and succeed in the Hereafter through
                faith and righteous conduct. We provide a nurturing environment
                where timeless Islamic values harmoniously blend with modern,
                future-ready education.
              </p>

              <p
                className="about-desc"
                data-aos="fade-up"
                data-aos-delay="290"
              >
                At IMS, learning goes beyond classrooms. We cultivate curiosity,
                compassion, confidence, and critical thinking—preparing students
                to face the challenges of a rapidly changing world while
                remaining rooted in values of respect, responsibility, and
                kindness. IMS is not merely a school; it is a{" "}
                <strong>Madrasat-ul-Hayat</strong> — a school for life.
              </p>
            </article>
          </div>

          {/* Key Highlights */}
          <div className="features" role="list">
            <div
              className="feature-item"
              role="listitem"
              data-aos="zoom-in"
              data-aos-delay="120"
            >
              <i
                className="fas fa-chalkboard-teacher"
                aria-hidden="true"
              ></i>
              <div>
                <h3>Value-Driven Educators</h3>
                <p>
                  Passionate and qualified teachers committed to academic
                  excellence, strong tarbiyah, and holistic child development.
                </p>
              </div>
            </div>

            <div
              className="feature-item"
              role="listitem"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <i className="fas fa-mosque" aria-hidden="true"></i>
              <div>
                <h3>Value-Based Education</h3>
                <p>
                  A balanced curriculum integrating Islamic morals, character
                  building, and modern academics to develop beneficial human
                  beings.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/classes"
            className="primary-btn aboutCta"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Explore Admissions{" "}
            <i
              className="fa fa-long-arrow-alt-right"
              aria-hidden="true"
            ></i>
          </a>
        </div>
      </section>

      <Awrapper />
    </>
  );
};

export default AboutCard;
