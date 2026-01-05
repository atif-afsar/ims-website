// src/components/infrastructure/Library.jsx
import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import "./infrastructure.css";

import libMain from "../../assets/images/about/about-bg.jpg";
import lib1 from "../../assets/images/infra/lib-1.jpg";
import lib2 from "../../assets/images/infra/lib-2.jpg";
import lib3 from "../../assets/images/infra/lib-3.jpg";
import lib4 from "../../assets/images/infra/lib-4.jpg";
import lib5 from "../../assets/images/infra/lib-5.jpg";
import ContactFormOnly from "../contact/ContactFormOnly";


const galleryImages = [lib1, lib2, lib3, lib4, lib5];

const Library = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % galleryImages.length),
      2500
    );
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

   const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp";


  return (
    <>
      <Back title="Library" />

      <section className="infraPage">
        <div className="container">
          <header className="infraTop">
            <h1>IMS Library</h1>
            <p>
              A quiet, welcoming space filled with Islamic literature,
              reference books and story books that nurture a love for reading.
            </p>
          </header>

          <div className="infra-grid">
            <div className="infra-left">
              <h3 className="infra-title">A home for readers</h3>

              <ul className="infra-list">
                <li>
                  <span className="infra-icon">
                    <i className="fa fa-book" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Diverse collection</h4>
                    <p>
                      Islamic studies, tafsir, seerah, reference books and
                      graded readers for all age groups.
                    </p>
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-child" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Child‑friendly corners</h4>
                    <p>
                      Comfortable reading corners that encourage children to
                      pick up books independently.
                    </p>
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-search" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Research support</h4>
                    <p>
                      Resources for projects, competitions and self‑study
                      beyond the textbook.
                    </p>
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-heart" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Reading culture</h4>
                    <p>
                      Regular library periods, book talks and recommendations
                      to build strong reading habits.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="infra-right">
              <div className="infra-image-wrap">
                <img
                  src={libMain}
                  alt="Students reading in the IMS library"
                  className="infra-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <section className="infra-gallery">
            <h2 className="infra-gallery-title">Inside Our Library</h2>
            <p className="infra-gallery-text">
              Shelves of books, peaceful ambience and dedicated time to read,
              reflect and grow.
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
                    alt={`IMS library ${idx + 1}`}
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

export default Library;
