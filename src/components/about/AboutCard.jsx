import React from "react";
import aboutImg from "../../assets/images/about/ims-about.png";
import Heading from "../common/heading/Heading";
import Awrapper from "./Awrapper";
import "./about.css";

const AboutCard = () => {
  return (
    <>
      <section className="aboutHome sectionDecorAbout" aria-labelledby="about-heading">
        {/* Side stickers (decorations) */}
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
          <div className="left row" data-aos="fade-right" data-aos-duration="900">
            <div className="aboutImgWrap">
              <img
                src={aboutImg}
                alt="Islamic Mission School campus with students learning in a beautiful Islamic environment"
                loading="lazy"
                className="about-img"
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="right row" data-aos="fade-left" data-aos-duration="900">
            <div data-aos="fade-up" data-aos-delay="100">
              <Heading subtitle="OVERVIEW" title="Who We Are" />
            </div>

            <article className="about-content">
              <p className="about-desc" data-aos="fade-up" data-aos-delay="150">At, 
                <span className="highlight"> Islamic Mission School (IMS)</span>
                 we believe education is more than academic excellence; it is the foundation of character. In a rapidly changing world, we provide a learning environment where timeless values and modern innovation converge. We nurture compassionate, confident, and critical thinkers who are not only prepared for the challenges of tomorrow but are also committed to building a more just and peaceful world. We foster a culture of respect, responsibility, and kindness, where students are encouraged to question, create, and collaborate. Welcome to an education that shapes both the intellect and the soul.
              </p>

              
            </article>
            
          </div>
          <div className="features" role="list">
                <div className="feature-item" role="listitem" data-aos="zoom-in" data-aos-delay="100">
                  <i className="fas fa-chalkboard-teacher" aria-hidden="true"></i>
                  <div>
                    <h3>Experienced Teachers</h3>
                    <p>
                      Dedicated educators with strong tarbiyah and modern teaching methods—supporting
                      every child’s growth.
                    </p>
                  </div>
                </div>

                <div className="feature-item" role="listitem" data-aos="zoom-in" data-aos-delay="180">
                  <i className="fas fa-mosque" aria-hidden="true"></i>
                  <div>
                    <h3>Unique Islamic Approach</h3>
                    <p>
                      Authentic Islamic learning with strong academics, focusing on adab, akhlaq, and
                      excellence in studies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Use Link if you want (recommended), but keeping your anchor for now */}
              <a
                href="/admissions"
                className="primary-btn aboutCta"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                Explore Admissions <i className="fa fa-long-arrow-alt-right" aria-hidden="true"></i>
              </a>
        </div>
      </section>

      <Awrapper />
    </>
  );
};

export default AboutCard;
