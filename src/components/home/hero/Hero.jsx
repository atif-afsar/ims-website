import React, { useEffect, useMemo, useState } from "react";
import "./Hero.css";
import hero_img from "../../../assets/images/hero/hero-img.png";

const Hero = () => {
  const dynamicWords = useMemo(() => ["Hafiz", "Leaders", "Professionals", "Scholars"], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2600);

    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  return (
    <>
      <section className="hero" aria-label="Islamic Mission School hero section">
        <div className="hero-overlay" aria-hidden="true"></div>

        {/* Side stickers / kid-friendly decorations */}
        {/* <img
          className="hero-sticker hero-sticker-left"
          src="/images/stickers/star.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        /> */}
        {/* <img
          className="hero-sticker hero-sticker-right"
          src="/images/stickers/butterfly.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        /> */}

        <div className="container hero-inner">
          <div className="hero-grid">
            <div className="hero-content" data-aos="fade-right" data-aos-duration="900">
              <h3 className="hero-subtitle">
                <span className="arabic-bismillah">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</span>
                <span>
                  Welcome to <span className="english-subtitle">ISLAMIC MISSION SCHOOL</span>
                </span>
              </h3>

              <h1 className="hero-title" data-aos="fade-up" data-aos-delay="150">
                <span className="future">Future</span> Doctors, Engineers &{" "}
                <span className="dynamic-word-container" aria-live="polite">
                  {dynamicWords.map((w, idx) => (
                    <span
                      key={w}
                      className={`dynamic-word ${currentWordIndex === idx ? "active" : ""}`}
                    >
                      {w}
                    </span>
                  ))}
                </span>
              </h1>

              <p className="hero-description" data-aos="fade-up" data-aos-delay="250">
                Building tomorrow&apos;s leaders who excel in medicine, engineering and Quran
                memorization with Islamic values of justice and equality.
              </p>

              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="350">
                <a className="primary-btn hero-btn" href="/admissions">
                  <span>GET STARTED NOW</span>
                  <i className="fa fa-long-arrow-alt-right" aria-hidden="true"></i>
                </a>

                <a className="secondary-btn hero-btn" href="/courses">
                  <span>VIEW PROGRAMS</span>
                  <i className="fa fa-long-arrow-alt-right" aria-hidden="true"></i>
                </a>
              </div>

              {/* Quick badges (icons) */}
              <div className="hero-badges" data-aos="fade-up" data-aos-delay="450">
                <span className="hero-badge">
                  <i className="fa fa-star" aria-hidden="true"></i> ICSE + Islamic Excellence
                </span>
                <span className="hero-badge">
                  <i className="fa fa-heart" aria-hidden="true"></i> Tarbiyah & Akhlaq First
                </span>
                {/* <span className="hero-badge">
                  <i className="fa fa-flask" aria-hidden="true"></i> STEM + Robotics
                </span> */}
              </div>
            </div>

            <div className="hero-visual" data-aos="fade-left" data-aos-duration="900">
              <div className="hero-img-wrap">
                <img src={hero_img} alt="Happy students learning at Islamic Mission School" className="hero-img" />
              </div>

              {/* small floating sticker near image */}
              <img
                className="hero-sticker hero-sticker-mini"
                src="/images/stickers/book.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
