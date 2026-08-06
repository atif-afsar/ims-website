import React from "react";
import { Link } from "react-router-dom";
import Heading from "../common/heading/Heading";
import { useNeetJeeData } from "../../hooks/useNeetJeeData";
import neet_img from "../../assets/images/neet/neet_img.jpg";
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
  FaBalanceScale,
} from "react-icons/fa";

const featureIcons = [
  <FaUserGraduate />,
  <FaBookOpen />,
  <FaClock />,
  <FaClipboardCheck />,
  <FaFileAlt />,
  <FaChalkboardTeacher />,
  <FaHeart />,
];

const NEETProgram = () => {
  const { settings, tracks, features, comparison, results, loading } = useNeetJeeData();

  const foundation = tracks.find((t) => t.track_type === "foundation") || tracks[0];
  const accelerator = tracks.find((t) => t.track_type === "accelerator") || tracks[1];
  const featuresImage = settings.features_image_url || neet_img;

  if (loading) return null;

  return (
    <section className="neet-program sectionDecorNeet">
      <span className="neetSticker neetStickerLeft" aria-hidden="true">🧪</span>
      <span className="neetSticker neetStickerRight" aria-hidden="true">📚</span>

      <div className="container">
        <div data-aos="fade-up" data-aos-duration="900">
          <Heading subtitle="NEET Excellence Program" title={settings.hero_title} />
        </div>

        <div className="neet-intro" data-aos="fade-up" data-aos-delay="120" data-aos-duration="900">
          <p className="intro-text">{settings.hero_subtitle}</p>
        </div>

        <div className="neet-vision" data-aos="fade-up" data-aos-delay="140" data-aos-duration="900">
          <h3>{settings.vision_title}</h3>
          <p>{settings.vision_description}</p>
        </div>

        <div className="neet-programs-grid">
          {foundation && (
            <div className="neet-card foundation" data-aos="fade-up" data-aos-duration="900">
              <div className="card-icon"><FaBookOpen /></div>
              <h3>{foundation.name}</h3>
              <span className="for-class">{foundation.for_class}</span>
              <p>{foundation.description}</p>
              {foundation.highlight && <div className="highlight-badge">{foundation.highlight}</div>}
            </div>
          )}
          {accelerator && (
            <div className="neet-card target" data-aos="fade-up" data-aos-delay="120" data-aos-duration="900">
              <div className="card-icon"><FaTrophy /></div>
              <h3>{accelerator.name}</h3>
              <span className="for-class">{accelerator.for_class}</span>
              <p>{accelerator.description}</p>
              {accelerator.highlight && <div className="highlight-badge">{accelerator.highlight}</div>}
            </div>
          )}
        </div>

        <div className="neet-features">
          <div className="features-with-image">
            <div className="features-left" data-aos="fade-right" data-aos-duration="900">
              <h3 className="section-mini-title">{settings.features_title}</h3>
              <div className="features-grid-2col">
                {features.map((item, i) => (
                  <div className="feature-item-2col" key={item.id || i} data-aos="zoom-in" data-aos-delay={i * 80} data-aos-duration="900">
                    <div className="feature-icon">{featureIcons[i] || <FaCheckCircle />}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="features-right" data-aos="fade-left" data-aos-duration="900">
              <div className="image-container">
                <img src={featuresImage} alt="IMS Students preparing for NEET examinations" className="neet-image" loading="lazy" />
                <div className="image-overlay">
                  <span className="overlay-text">Alhamdulillah</span>
                  <span className="overlay-sub">Success Through Sincerity &amp; Hard Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {comparison.length > 0 && (
          <div className="neet-comparison" data-aos="fade-up" data-aos-duration="900">
            <h3 className="section-mini-title comparison-title">
              <FaBalanceScale /> {settings.comparison_title}
            </h3>
            <div className="comparison-grid">
              {comparison.map((item, i) => (
                <div className="comparison-card" key={item.id || i}>
                  <h4>{item.point}</h4>
                  <div className="comparison-col integrated-col">
                    <span className="comparison-label">IMS Integrated Schooling</span>
                    <p>{item.integrated}</p>
                  </div>
                  <div className="comparison-col conventional-col">
                    <span className="comparison-label">Conventional Schooling</span>
                    <p>{item.conventional}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="neet-results" data-aos="fade-up" data-aos-duration="900">
            <h3 className="section-mini-title">
              <span className="alhamdulillah-badge">Alhamdulillah</span>
              {settings.results_title}
            </h3>
            <div className="results-grid-2col">
              {results.map((student, i) => (
                <div className="result-card-premium" key={student.id || i} data-aos="zoom-in" data-aos-delay={i * 80} data-aos-duration="900">
                  <div className="rank-ribbon"><span>#{i + 1}</span></div>
                  <div className="student-photo">
                    <img src={student.photo_url || `/images/team/${(i % 8) + 1}.png`} alt={student.name} loading="lazy" />
                  </div>
                  <h4 className="student-name">{student.name}</h4>
                  {student.arabic_name && <p className="arabic-name">{student.arabic_name}</p>}
                  <div className="score-badge">
                    <span className="score">{student.score}</span>
                    <small>{student.exam_year}</small>
                  </div>
                  <div className="success-dua" aria-hidden="true">ماشاءالله تبارك الله</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="neet-cta" data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">
          <h3>{settings.cta_title}</h3>
          <Link to={settings.cta_button_link || "/contact"} className="primary-btn neet-cta-btn">
            {settings.cta_button_text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NEETProgram;
