import React from "react";
import "../blog/blog.css";
import { blog } from "../../dummydata";
import Heading from "../common/heading/Heading";

const Hblog = () => {
  return (
    <>
      <section className="blog sectionDecorHomeBlog">
        <div className="container">
          <div data-aos="fade-up" data-aos-duration="900">
            <Heading subtitle="OUR BLOG" title="Recent from Blog" />
          </div>

          <div className="grid2">
            {blog.slice(0, 3).map((val, idx) => (
              <div
                className="items shadow"
                key={val.id}
                data-aos="fade-up"
                data-aos-delay={idx * 120}
                data-aos-duration="900"
              >
                <div className="img">
                  <img src={val.cover} alt={val.title} loading="lazy" />
                </div>

                <div className="text">
                  <div className="admin flexSB">
                    <span>
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <label>{val.type}</label>
                    </span>
                    <span>
                      <i className="fa fa-calendar-alt" aria-hidden="true"></i>
                      <label>{val.date}</label>
                    </span>
                    <span>
                      <i className="fa fa-comments" aria-hidden="true"></i>
                      <label>{val.com}</label>
                    </span>
                  </div>

                  <h1>{val.title}</h1>
                  <p>{val.desc}</p>

                  <div className="blogMiniBadge">
                    <i className="fa fa-book-open" aria-hidden="true"></i> Read & Reflect
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cute corner element */}
          <div className="homeBlogSticker" aria-hidden="true">📚✨</div>
        </div>
      </section>
    </>
  );
};

export default Hblog;
