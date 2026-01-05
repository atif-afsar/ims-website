// src/components/infrastructure/SportsComplex.jsx
import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import "./infrastructure.css";

import sportsMain from "../../assets/images/about/about-bg.jpg";
import sports1 from "../../assets/images/infra/play-4.jpg";
import sports2 from "../../assets/images/infra/play-3.jpg";
import sports3 from "../../assets/images/infra/play-2.jpg";
import sports4 from "../../assets/images/infra/play-5.jpg";
// import sports5 from "../../assets/images/infra/play-6.";

import ContactFormOnly from "../contact/ContactFormOnly";


const galleryImages = [sports1, sports2, sports3, sports4];

const SportsComplex = () => {
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
      <Back title="Sports Complex" />

      <section className="infraPage">
        <div className="container">
          <header className="infraTop">
            <h1>IMS Sports Complex</h1>
            <p>
              Spacious play areas and sports facilities that promote fitness,
              teamwork and discipline in a fun, encouraging environment.
            </p>
          </header>

          <div className="infra-grid">
            <div className="infra-left">
              <h3 className="infra-title">Play, grow and compete</h3>

              <ul className="infra-list">
                <li>
                  <span className="infra-icon">
                    <i className="fa fa-futbol" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Spacious playgrounds for outdoor team sports</h4>
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-table-tennis" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Indoor games area for all seasons</h4>
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-users" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Regular sports periods that build teamwork</h4>
                    
                  </div>
                </li>

                <li>
                  <span className="infra-icon">
                    <i className="fa fa-medal" aria-hidden="true" />
                  </span>
                  <div>
                    <h4>Annual sports events to showcase talent</h4>
                  </div>
                </li>
              </ul>
            </div>

            <div className="infra-right">
              <div className="infra-image-wrap">
                <img
                  src={sportsMain}
                  alt="Students playing in IMS sports complex"
                  className="infra-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <section className="infra-gallery">
            <h2 className="infra-gallery-title">On the Field with IMS</h2>
            <p className="infra-gallery-text">
              From warm‑up drills to exciting matches, students enjoy staying
              healthy and active together.
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
                    alt={`IMS sports complex ${idx + 1}`}
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

export default SportsComplex;
