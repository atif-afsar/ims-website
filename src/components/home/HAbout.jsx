import React from "react";
import OnlineCourses from "../allcourses/OnlineCourses";
import Heading from "../common/heading/Heading";
import "../allcourses/courses.css";
import { coursesCard } from "../../dummydata";

const HAbout = () => {
  return (
    <>
      <section className="homeAbout sectionDecorHomeAbout">
        <div className="container">
          <div className="homeAboutHeading" data-aos="fade-up" data-aos-duration="900">
            <Heading subtitle="Our Courses" title="Explore our popular programs" />
          </div>

          {/* decorative side elements */}
          <span className="homeAboutSticker left" aria-hidden="true">🧸</span>
          <span className="homeAboutSticker right" aria-hidden="true">🎈</span>

          <div className="coursesCard">
            <div className="grid2">
              {coursesCard.slice(0, 3).map((val, idx) => (
                <div
                  className="items"
                  key={val.id}
                  data-aos="zoom-in"
                  data-aos-delay={idx * 120}
                  data-aos-duration="900"
                >
                  <div className="content flex">
                    <div className="left">
                      <div className="img">
                        <img src={val.cover} alt={val.coursesName} loading="lazy" />
                      </div>
                    </div>

                    <div className="text">
                      <h1>{val.coursesName}</h1>

                      <div className="rate" aria-label="Rating 5 out of 5">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <label>(5.0)</label>
                      </div>

                      <div className="details">
                        {val.courTeacher.map((t, tIdx) => (
                          <div className="teacherRow" key={`${val.id}-${tIdx}`}>
                            <div className="box">
                              <div className="dimg">
                                <img src={t.dcover} alt={t.name} loading="lazy" />
                              </div>
                              <div className="para">
                                <h4>{t.name}</h4>
                              </div>
                            </div>
                            <span className="teacherTime">
                              <i className="fa fa-clock" aria-hidden="true"></i> {t.totalTime}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="price">
                    <h3>
                      {val.priceAll} / {val.pricePer}
                    </h3>
                  </div>

                  <button className="outline-btn">
                    ENROLL NOW <i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">
          <OnlineCourses />
        </div>
      </section>
    </>
  );
};

export default HAbout;
