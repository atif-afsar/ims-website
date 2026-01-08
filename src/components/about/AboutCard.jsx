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

          {/* Extended About Sections */}
          <div className="section-extended">
            <div className="governance" data-aos="fade-up" data-aos-delay="260">
              <Heading subtitle="GOVERNANCE" title="Office Bearers & Affiliation" />

              <div className="office-bearers">
                <div className="bearer">
                  <h4>President</h4>
                  <p className="name">Prof. Yusuf Ansari <span className="qual">(M.Tech, PhD.)</span></p>
                </div>

                <div className="bearer">
                  <h4>Vice-President</h4>
                  <p className="name">Dr. Misbah Uddin <span className="qual">(MBBS, MD)</span></p>
                </div>

                <div className="bearer">
                  <h4>Secretary</h4>
                  <p className="name">Dr. Kaunain Kausar <span className="qual">(MBBS, DMRT)</span></p>
                  <p className="muted">Professionally an Oncologist and Passionately an Educationist</p>
                </div>

                <div className="bearer">
                  <h4>Joint Secretary</h4>
                  <p className="name">Md. Kamal Uddin <span className="qual">(Social activist)</span></p>
                </div>

                <div className="bearer">
                  <h4>Treasurer</h4>
                  <p className="name">Dr. Mohd. Suhail Akhter <span className="qual">(PhD)</span></p>
                </div>
              </div>

              <div className="affiliation">
                <strong>Affiliation:</strong>
                <p>
                  IMS is affiliated to Council for the Indian School Certificate Examinations (CISCE), New Delhi.
                </p>
                <div className="affRow">
                  <div><strong>Status Of Affiliation</strong></div>
                  <div><strong>Affiliation Number</strong></div>
                </div>
                <div className="affRow muted">
                  <div>Permanent</div>
                  <div>UP407</div>
                </div>
              </div>
            </div>

            <div className="values-section" data-aos="fade-up" data-aos-delay="320">
              <Heading subtitle="IMS — A VALUE BASED SCHOOL" title="The Need For Value Based Schools" />

              <div className="values-content">
                <p>
                  The concept of Value Based Schools combines the best of values and academic learning into an integrated model. Values-based education creates a strong learning environment that enhances academic achievement and develops students' social and relationship skills that last throughout their lives.
                </p>

                <p>
                  In India, value-based education is the need of the hour. Educational institutions must take the initiative to impart moral values—qualities of good conduct, self-confidence, and high values—that will help students secure a significant place in society.
                </p>

                <h4>Values in the curriculum</h4>
                <p>
                  The first ten years of a child are crucial. Learning in childhood is likened to an engraved mark on rock. This is the time to sow the seeds of moral values. Education without values is like tea without sugar.
                </p>

                <ul className="values-list">
                  <li>The quantity of education has increased, but quality must improve.</li>
                  <li>Degrees are available, yet dignity and sincerity must be restored.</li>
                  <li>IMS applies a whole-school approach, training staff to be instruments in imparting values.</li>
                </ul>
              </div>
            </div>

            <div className="curriculum-section" data-aos="fade-up" data-aos-delay="380">
              <Heading subtitle="CURRICULUM" title="Nurturing Mind, Body, and Soul" />

              <div className="curriculum-grid">
                <div className="currCol">
                  <h5>Academic Excellence</h5>
                  <p>We follow the ICSE & ISC curriculum, offering a strong foundation across languages, sciences, humanities, technology, and arts.</p>
                  <ul>
                    <li>Languages: English, Hindi, Urdu, Arabic, Sanskrit</li>
                    <li>Sciences: Mathematics, Physics, Chemistry, Biology</li>
                    <li>Humanities & Social Sciences: History, Geography, Civics, Economics, Financial Literacy</li>
                    <li>Technology & Arts: Computer Science, IT, Art, Physical Education</li>
                  </ul>
                </div>

                <div className="currCol">
                  <h5>21st Century Skills</h5>
                  <p>We focus on skills that matter: critical thinking, collaboration, creativity, and digital literacy.</p>

                  <div className="skill-paths">
                    <div><strong>Cognitive & Analytical</strong><p>Critical thinking, problem solving, digital literacy</p></div>
                    <div><strong>Personal & Intrapersonal</strong><p>Resilience, self-management, curiosity</p></div>
                    <div><strong>Social & Interpersonal</strong><p>Communication, leadership, cross-cultural competency</p></div>
                    <div><strong>Creative & Practical</strong><p>Design thinking, project management, public speaking</p></div>
                  </div>

                  <h5 className="mt20">STEM Education</h5>
                  <p>IMS integrates a world-class STEM curriculum (partnered with Evan Moor) emphasizing hands-on, inquiry-led learning from Grade 1.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/classes"
            className="primary-btn aboutCta"
            data-aos="fade-up"
            data-aos-delay="420"
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
