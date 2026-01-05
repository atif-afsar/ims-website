import React from "react";
import Heading from "../common/heading/Heading";
import { neetProgram } from "../../dummydata";
import neet_img from "../../assets/images/neet/neet_img.jpg"
import "./neet.css";
import {
  FaUserGraduate,
  FaClock,
  FaTrophy,
  FaBookOpen,
  FaCheckCircle,
  FaClipboardCheck,
  FaFileAlt,
  FaChalkboardTeacher,
  FaHeart,
} from "react-icons/fa";

const NEETProgram = () => {
  const featureIcons = [
    <FaUserGraduate />,
    <FaBookOpen />,
    <FaClock />,
    <FaClipboardCheck />,
    <FaFileAlt />,
    <FaChalkboardTeacher />,
    <FaHeart />,
  ];

  return (
    <section className="neet-program sectionDecorNeet">
      <span className="neetSticker neetStickerLeft" aria-hidden="true">🧪</span>
      <span className="neetSticker neetStickerRight" aria-hidden="true">📚</span>

      <div className="container">
        <div data-aos="fade-up" data-aos-duration="900">
          <Heading subtitle="NEET Excellence Program" title={neetProgram.title} />
        </div>

        <div className="neet-intro" data-aos="fade-up" data-aos-delay="120" data-aos-duration="900">
          <p className="intro-text">{neetProgram.subtitle}</p>
        </div>

        {/* Two Programs */}
        <div className="neet-programs-grid">
          <div
            className="neet-card foundation"
            data-aos="fade-up"
            data-aos-delay="0"
            data-aos-duration="900"
          >
            <div className="card-icon"><FaBookOpen /></div>
            <h3>{neetProgram.foundation.name}</h3>
            <span className="for-class">{neetProgram.foundation.for}</span>
            <p>{neetProgram.foundation.desc}</p>
            <div className="highlight-badge">{neetProgram.foundation.highlight}</div>
          </div>

          <div
            className="neet-card target"
            data-aos="fade-up"
            data-aos-delay="120"
            data-aos-duration="900"
          >
            <div className="card-icon"><FaTrophy /></div>
            <h3>{neetProgram.target.name}</h3>
            <span className="for-class">{neetProgram.target.for}</span>
            <p>{neetProgram.target.desc}</p>
            <div className="highlight-badge">{neetProgram.target.highlight}</div>
          </div>
        </div>

        {/* Features */}
        <div className="neet-features">
          <div className="features-with-image">
            {/* Left Side – Features */}
            <div className="features-left" data-aos="fade-right" data-aos-duration="900">
              <h3 className="section-mini-title">Our Proven Strategy</h3>
              <div className="features-grid-2col">
                {neetProgram.features.map((item, i) => (
                  <div
                    className="feature-item-2col"
                    key={i}
                    data-aos="zoom-in"
                    data-aos-delay={i * 80}
                    data-aos-duration="900"
                  >
                    <div className="feature-icon">
                      {featureIcons[i] || <FaCheckCircle />}
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side – Image */}
            <div className="features-right" data-aos="fade-left" data-aos-duration="900">
              <div className="image-container">
                <img
                  src={neet_img}
                  alt="IMS Students preparing for NEET examinations"
                  className="neet-image"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="overlay-text">Alhamdulillah</span>
                  <span className="overlay-sub">Success Through Sincerity & Hard Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Results */}
        <div className="neet-results" data-aos="fade-up" data-aos-duration="900">
          <h3 className="section-mini-title">
            <span className="alhamdulillah-badge">Alhamdulillah</span>
            Our Proud Achievers
          </h3>

          <div className="results-grid-2col">
            {neetProgram.results.map((student, i) => (
              <div
                className="result-card-premium"
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 80}
                data-aos-duration="900"
              >
                <div className="rank-ribbon">
                  <span>#{i + 1}</span>
                </div>

                <div className="student-photo">
                  <img
                    src={student.photo || `/images/team/${(i % 8) + 1}.png`}
                    alt={student.name}
                    loading="lazy"
                  />
                  <div className="photo-glow" aria-hidden="true" />
                </div>

                <h4 className="student-name">{student.name}</h4>
                {student.arabicName && (
                  <p className="arabic-name">{student.arabicName}</p>
                )}

                <div className="score-badge">
                  <span className="score">{student.score}</span>
                  <small>{student.year}</small>
                </div>

                <div className="success-dua" aria-hidden="true">
                  ماشاءالله تبارك الله
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="neet-cta" data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">
          <h3>Give Your Child the Best Chance to Become a Doctor</h3>
          <button className="primary-btn neet-cta-btn" type="button">
            Enroll in NEET Program Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default NEETProgram;
