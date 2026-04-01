import Heading from "../common/heading/Heading";
import Awrapper from "./Awrapper";
import "./about.css";
import { supabase } from "../../supabaseClient";
import React, { useState, useEffect } from "react";
import aboutImg from "../../assets/images/about/ims-about.png";
import { Link } from "react-router-dom";

const AboutCard = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data } = await supabase
        .from('governance')
        .select('*')
        .order('sort_order', { ascending: true });
      if (data) setMembers(data);
    };
    fetchMembers();
  }, []);
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
                Our children are a blessing <strong>(naemat)</strong> bestowed
                on us by The Almighty God, and also a trust{" "}
                <strong>(amaanah)</strong> He has made us responsible for. It is
                God's universal law to accompany every blessing with responsibility.
                He then blessed parents by placing tremendous love in their hearts
                for their children, and He made every parent responsible for
                providing his child with the best 'Tarbiyah' in order to ensure
                their success in this world as well as in the world to come.
              </p>

              <p
                className="about-desc"
                data-aos="fade-up"
                data-aos-delay="220"
              >
                At <span className="highlight">Islamic Mission School (IMS)</span>,
                we believe education is more than academic excellence; it is the
                foundation of character. In a rapidly changing world, we provide
                a learning environment where timeless values and modern innovation
                converge. We nurture compassionate, confident, and critical thinkers
                who are not only prepared for the challenges of tomorrow but are
                also committed to building a more just and peaceful world.
              </p>

              <p
                className="about-desc"
                data-aos="fade-up"
                data-aos-delay="290"
              >
                We foster a culture of respect, responsibility, and kindness,
                where students are encouraged to question, create, and collaborate.
                Welcome to an education that shapes both the intellect and the soul.
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

              <p className="governance-intro">
                Islamic Mission School is a private, non-profit institution operated under the aegis of the Society for Moral Education and Social Development. It is overseen by an independent Board of Trustees tasked with advancing the school's mission and safeguarding its future success. The Trustees believe in the significant value of IMS education for students, their families, and the wider community and nation, and are committed to collaborating with faculty, staff, and administration to ensure the school's continuous and successful operation.
              </p>

              <div className="office-bearers">
                {members.length > 0 ? (
                  members.map((m) => (
                    <div className="bearer" key={m.id}>
                      {m.image_url && <img src={m.image_url} alt={m.name} className="bearer-img" style={{width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px'}} />}
                      <h4>{m.role}</h4>
                      <p className="name">
                        {m.name} {m.qualification && <span className="qual">({m.qualification})</span>}
                      </p>
                      {m.profession && <p className="muted">{m.profession}</p>}
                    </div>
                  ))
                ) : (
                  <p>Loading office bearers...</p>
                )}
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
                  The first ten years of a child are very crucial and important in his life as whatever he is exposed to during this period has a serious and lasting effect on him in the future. Learning in childhood is likened to an engraved mark on rock, which it is difficult to rub off. Rightly said: <strong>"Knowledge at young age is like engraving on a stone."</strong>
                </p>

                <p>
                  This is high time to sow the seeds of moral values in the hearts of children. Education without values is like tea without sugar, or a body without soul.
                </p>

                <h4>Values in Educational Institutions</h4>
                <p>
                  Values in an educational institution are the need of the hour. The severe deterioration in the conduct of India's youth is a matter of concern. The paradigm shift in the perception of education and the role of schools is a major factor negatively impacting the conduct and behaviour of Indian youth. Today we can see:
                </p>

                <ul className="values-list">
                  <li>The quantity of education has considerably increased, but the quality has decreased.</li>
                  <li>The number of educated people has reached a high level, yet murder, hatred, and selfishness have spread everywhere.</li>
                  <li>Many institutions have opened, but only a few civilized people are produced.</li>
                  <li>Degrees are available for all, but dignity has gone down.</li>
                  <li>Trained people are produced by many institutions, but sincere people are very few.</li>
                  <li>Technologically we have become advanced, but humanity is threatened.</li>
                </ul>

                <p>
                  <strong>Alhamdulillah</strong>, IMS has taken the initiative to impart value-based education to this new generation. Imbibing the qualities of good conduct, self-confidence, and high moral values will help students earn a respected place in society.
                </p>

                <p>
                  Value-based education is most effective when every staff member engages with it. So at IMS, <strong>Alhamdulillah</strong>, we apply a whole-school approach, training our staff to be instruments in imparting values. There is a marked difference in the focus and outcomes of simple education and value-based education.
                </p>
              </div>
            </div>

            <div className="curriculum-section" data-aos="fade-up" data-aos-delay="380">
              <Heading subtitle="CURRICULUM" title="Nurturing Mind, Body, and Soul" />

              <div className="curriculum-intro">
                <p>
                  At Islamic Mission School, we believe that a truly transformative education harmonizes intellectual excellence with spiritual and moral growth. Our curriculum is thoughtfully designed to empower students with the knowledge and skills to thrive in the modern world, while firmly grounding them in the ethical and spiritual framework also. We foster a learning environment that encourages curiosity, critical thinking, and compassion, preparing students to be confident, contributing citizens of both India and the global community.
                </p>
              </div>

              <div className="curriculum-grid">
                <div className="currCol">
                  <h5><span className="curr-number">1.</span> Academic Excellence: The National Framework</h5>
                  <p>We follow the ICSE & ISC curriculum, known for its strong foundation in core subjects and its national recognition, ensuring a smooth academic pathway for higher education anywhere in India and abroad.</p>
                  
                  <div className="curr-subsection">
                    <h6>Core Subjects</h6>
                    <p>We teach a comprehensive range of subjects including:</p>
                    <ul>
                      <li><strong>Languages:</strong> English, Hindi, Urdu, Arabic, Sanskrit</li>
                      <li><strong>Sciences:</strong> Mathematics, Physics, Chemistry, Biology</li>
                      <li><strong>Humanities & Social Sciences:</strong> History, Geography, Civics, Economics, Financial Literacy</li>
                      <li><strong>Technology & Arts:</strong> Computer Science, Information Technology, Art, and Physical Education</li>
                    </ul>
                    <p className="highlight-text">Moreover, for minority students IMS also provides <strong>Nazira & Hifz</strong>. Islamic Studies, Seerah and Life of the Prophets are instrumental in developing morals.</p>
                  </div>

                  <div className="curr-subsection">
                    <h6>Pedagogy</h6>
                    <p>Our teaching methodology moves beyond rote learning. We emphasize:</p>
                    <ul>
                      <li><strong>Inquiry-Based Learning:</strong> Encouraging students to ask questions and discover knowledge.</li>
                      <li><strong>Critical Thinking & Problem Solving:</strong> Applying classroom concepts to real-world challenges.</li>
                      <li><strong>Collaborative Projects:</strong> Fostering teamwork and communication skills.</li>
                    </ul>
                  </div>
                </div>

                <div className="currCol">
                  <h5><span className="curr-number">2.</span> 21st Century Skills</h5>
                  <p>In a world of constant change, knowledge alone is not enough. At Islamic Mission School, we believe that skills are the bridge between potential and achievement. Our dedicated focus on Skills Development ensures that every student doesn't just learn what to think, but how to think, adapt, and lead.</p>

                  <div className="curr-subsection">
                    <h6>Our Core Skill Pathways</h6>
                    <p>We structure our skills development into four interconnected pathways:</p>
                  </div>

                  <div className="skill-paths">
                    <div className="skill-path-card">
                      <strong>(i) Cognitive & Analytical Skills</strong>
                      <p className="skill-subtitle">Mastering how to think.</p>
                      <ul className="skill-list">
                        <li>Critical Thinking & Problem Solving</li>
                        <li>Digital Literacy & Computational Thinking</li>
                      </ul>
                    </div>

                    <div className="skill-path-card">
                      <strong>(ii) Personal & Intrapersonal Skills</strong>
                      <p className="skill-subtitle">Mastering how to be.</p>
                      <ul className="skill-list">
                        <li>Resilience & Adaptability</li>
                        <li>Self-Management & Metacognition</li>
                        <li>Curiosity & Lifelong Learning</li>
                      </ul>
                    </div>

                    <div className="skill-path-card">
                      <strong>(iii) Social & Interpersonal Skills</strong>
                      <p className="skill-subtitle">Mastering how to work with others.</p>
                      <ul className="skill-list">
                        <li>Communication & Collaboration</li>
                        <li>Leadership & Influence</li>
                        <li>Cross-Cultural Competency</li>
                        <li>Conflict Resolution & Negotiation</li>
                      </ul>
                    </div>

                    <div className="skill-path-card">
                      <strong>(iv) Creative & Practical Skills</strong>
                      <p className="skill-subtitle">Mastering how to create and execute.</p>
                      <ul className="skill-list">
                        <li>Creativity & Innovation</li>
                        <li>Design Thinking</li>
                        <li>Project Management</li>
                        <li>Public Speaking & Presentation</li>
                      </ul>
                    </div>
                  </div>

                  <div className="curr-subsection">
                    <h6>How We Develop These Skills</h6>
                    <p>Our commitment is brought to life through a multi-faceted approach:</p>
                    <ul>
                      <li>Project-Based Learning (PBL)</li>
                      <li>Dedicated Workshops & Masterclasses</li>
                      <li>Special curriculum on Life Skills from Grade 1</li>
                      <li>Leadership Roles & Student Houses</li>
                      <li>Educational Excursions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            to={"/contact"}
            className="primary-btn aboutCta"
            data-aos="fade-up"
            data-aos-delay="420"
          >
            Explore Admissions{" "}
            <i
              className="fa fa-long-arrow-alt-right"
              aria-hidden="true"
            ></i>
          </Link>
        </div>
      </section>

      <Awrapper />
    </>
  );
};

export default AboutCard;
