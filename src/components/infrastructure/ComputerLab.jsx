import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import "./infrastructure.css";
import labImg from "../../assets/images/about/about-bg.jpg"; 
import lab1 from "../../assets/images/infra/computer-2.jpg";
import lab2 from "../../assets/images/infra/computer-3.jpg";
import lab3 from "../../assets/images/infra/computer-4.jpg";
import lab4 from "../../assets/images/infra/computer-5.jpg";
import lab5 from "../../assets/images/infra/computer-1.jpg";
import lab6 from "../../assets/images/infra/computer-6.jpg";
import ContactFormOnly from "../contact/ContactFormOnly";


const galleryImages = [lab1, lab2, lab3,lab4,lab5, lab6];

const ComputerLab = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 2500); // change every 2.5s

    return () => clearInterval(interval);
  }, []);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <>
      <Back title="Computer Lab" />

      <section className="infraPage">
        <div className="container">
          {/* Simple attractive heading */}
          <header className="infraTop">
            <h1>IMS Computer Lab</h1>
            {/* <p>
              A modern, student‑friendly lab where technology is used to build
              skills, creativity and confidence in a safe Islamic environment.
            </p> */}
          </header>

          {/* Text left, image right */}
          <div className="infra-grid">
            <div className="infra-left">
              <h3 className="infra-title">What makes our lab special?</h3>
              {/* <p className="infra-intro">
                Step into the IMS Computer Lab and you will see students
                learning to use technology as a tool for problem‑solving,
                research and creativity – not just entertainment.
              </p> */}

              <ul className="infra-list">
                <li>
                  <span className="infra-icon">
                    <i className="fa fa-desktop" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Modern systems & software</h4>
                    {/* <p>
                      Updated computers with essential educational software for
                      programming, design, presentations and research.
                    </p> */}
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-code" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Coding from early grades</h4>
                    {/* <p>
                      Age‑appropriate coding and logical thinking activities so
                      students become creators, not only users, of technology.
                    </p> */}
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-project-diagram" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Hands‑on projects</h4>
                    {/* <p>
                      Small projects and class assignments that connect computer
                      skills with maths, science and languages.
                    </p> */}
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-photo-video" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Multimedia & presentations</h4>
                    {/* <p>
                      Opportunities to create slides, posters and simple
                      multimedia stories to build confidence and creativity.
                    </p> */}
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-shield-alt" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Safe, guided usage</h4>
                    {/* <p>
                      Filtered internet, teacher supervision and regular
                      reminders about Islamic values and online etiquette.
                    </p> */}
                  </div>
                </li>
              </ul>
            </div>

            <div className="infra-right">
              <div className="infra-image-wrap">
                <img
                  src={labImg}
                  alt="Students learning in the IMS computer lab"
                  className="infra-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Gallery heading + simple carousel */}
          <section className="infra-gallery">
            <h2 className="infra-gallery-title">
              Glimpse of Our Computer Lab
            </h2>
            <p className="infra-gallery-text">
              Clean, well‑lit and supervised spaces where students explore
              technology with focus and joy.
            </p>

            <div className="infra-carousel">
              <button
                type="button"
                className="infra-carousel-btn prev"
                onClick={prevSlide}
                aria-label="Previous photo"
              >
                <i className="fa fa-chevron-left" aria-hidden="true" />
              </button>

              <div className="infra-carousel-window">
                {galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`IMS computer lab ${idx + 1}`}
                    className={
                      idx === currentSlide
                        ? "infra-carousel-img active"
                        : "infra-carousel-img"
                    }
                    loading="lazy"
                  />
                ))}
              </div>

              <button
                type="button"
                className="infra-carousel-btn next"
                onClick={nextSlide}
                aria-label="Next photo"
              >
                <i className="fa fa-chevron-right" aria-hidden="true" />
              </button>
            </div>

            <div className="infra-dots">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={
                    idx === currentSlide ? "infra-dot active" : "infra-dot"
                  }
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
      <section data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                <ContactFormOnly />
        </section>
    </>
  );
};

export default ComputerLab;
