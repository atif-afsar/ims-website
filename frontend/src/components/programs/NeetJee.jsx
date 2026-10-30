import React from "react";
import { Link } from "react-router";
import Back from "../common/back/Back";
import SEOHelmet from "../common/SEO/SEOHelmet";
import { useNeetJeeData } from "../../hooks/useNeetJeeData";
import { siteUrl } from "../../siteMeta";
import {
  FaUserGraduate,
  FaBookOpen,
  FaClock,
  FaClipboardCheck,
  FaFileAlt,
  FaChalkboardTeacher,
  FaHeart,
  FaCheckCircle,
  FaBalanceScale,
  FaDownload,
  FaTrophy,
} from "react-icons/fa";
import neet_img from "../../assets/images/neet/neet_img.jpg";
import "./programs.css";
import "../neet/neet.css";

const featureIcons = [
  FaUserGraduate,
  FaBookOpen,
  FaClock,
  FaClipboardCheck,
  FaFileAlt,
  FaChalkboardTeacher,
  FaHeart,
  FaCheckCircle,
];

const NeetJee = () => {
  const {
    settings,
    tracks,
    features,
    comparison,
    roadmap,
    results,
    faculty,
    answerKeys,
    loading,
  } = useNeetJeeData();

  const heroImage = settings.hero_image_url || "/images/programs/program4.png";
  const featuresImage = settings.features_image_url || neet_img;

  if (loading) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        Loading NEET/JEE program...
      </div>
    );
  }

  return (
    <>
      <SEOHelmet
        title="NEET / JEE Program | Islamic Mission School Aligarh"
        description="Integrated NEET/JEE schooling at IMS — ICSE curriculum with competitive exam preparation, expert faculty, daily tests, and proven results."
        keywords="NEET coaching Aligarh, JEE coaching Aligarh, integrated schooling, NEET results, IMS NEET program"
        canonical={siteUrl("/programs/neet-jee")}
        ogTitle="NEET / JEE Program - Islamic Mission School"
        ogDescription="Redefining schooling for aspiring doctors and engineers through integrated ICSE + competitive exam preparation."
        ogUrl={siteUrl("/programs/neet-jee")}
      />

      <Back title={settings.banner_title} subtitle={settings.banner_subtitle} />

      <main className="programs-page neetjee-page container">
        {/* Redesigned Hero */}
        <section className="neetjee-hero-redesign" data-aos="fade-up">
          <div className="neetjee-hero-content">
            <span className="neetjee-badge">{settings.hero_badge}</span>
            <h1>{settings.hero_title}</h1>
            <p className="lead">{settings.hero_subtitle}</p>
            <div className="neetjee-hero-actions">
              <Link to={settings.cta_button_link || "/contact"} className="neetjee-btn-primary">
                {settings.cta_button_text || "Apply Now"}
              </Link>
              <Link to={settings.secondary_button_link || "/brochure"} className="neetjee-btn-secondary">
                {settings.secondary_button_text || "Download Brochure"}
              </Link>
            </div>
          </div>
          <div className="neetjee-hero-visual">
            <img src={heroImage} alt={settings.hero_title} loading="eager" />
            <div className="neetjee-hero-stats">
              <div className="neetjee-stat">
                <FaTrophy />
                <span>{results.length}+ Top Rankers</span>
              </div>
              <div className="neetjee-stat">
                <FaChalkboardTeacher />
                <span>{faculty.length || "Expert"} Faculty</span>
              </div>
            </div>
          </div>
        </section>

        <article className="program-content">
          {/* Intro */}
          <section className="neetjee-card intro-text">
            {settings.intro_paragraph_1 && <p>{settings.intro_paragraph_1}</p>}
            {settings.intro_paragraph_2 && <p>{settings.intro_paragraph_2}</p>}
          </section>

          {/* Vision */}
          {settings.vision_title && (
            <section className="neet-vision neetjee-card" data-aos="fade-up">
              <h3>{settings.vision_title}</h3>
              <p>{settings.vision_description}</p>
            </section>
          )}

          {/* Program Tracks */}
          <h3>Program Structure &amp; Details</h3>
          <div className="neetjee-track-grid">
            {tracks.map((track, i) => (
              <div className="program-track" key={track.id || i} data-aos="fade-up" data-aos-delay={i * 100}>
                <h4>
                  <span className="track-number">{i + 1}.</span> {track.name}
                </h4>
                {track.subtitle && <p className="track-subtitle">{track.subtitle}</p>}
                {track.for_class && <span className="for-class">{track.for_class}</span>}
                <p>{track.description}</p>
                {track.highlight && <div className="highlight-badge">{track.highlight}</div>}
              </div>
            ))}
          </div>

          {/* Features with image */}
          <section className="neet-features neetjee-features-section">
            <div className="features-with-image">
              <div className="features-left" data-aos="fade-right">
                <h3 className="section-mini-title">{settings.features_title}</h3>
                <div className="features-grid-2col">
                  {features.map((item, i) => {
                    const Icon = featureIcons[i] || FaCheckCircle;
                    return (
                      <div className="feature-item-2col" key={item.id || i}>
                        <div className="feature-icon"><Icon /></div>
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="features-right" data-aos="fade-left">
                <div className="image-container">
                  <img src={featuresImage} alt="NEET/JEE preparation at IMS" className="neet-image" loading="lazy" />
                </div>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          {roadmap.length > 0 && (
            <section className="neetjee-roadmap" aria-labelledby="neetjee-roadmap-title">
              <h3 id="neetjee-roadmap-title">The 24-Month Roadmap</h3>
              <div className="neetjee-roadmap-grid">
                {roadmap.map((item, i) => (
                  <div className="neetjee-roadmap-item" key={item.id || i}>
                    <span className="neetjee-roadmap-phase">{item.phase}</span>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Comparison */}
          {comparison.length > 0 && (
            <section className="neet-comparison">
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
            </section>
          )}

          {/* Results */}
          {results.length > 0 && (
            <section className="neet-results">
              <h3 className="section-mini-title">
                <span className="alhamdulillah-badge">Alhamdulillah</span>
                {settings.results_title}
              </h3>
              
              <div className="posters-container" style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "center",
                gap: "2.5rem",
                maxWidth: "1200px",
                margin: "2.5rem auto 0",
                padding: "0 1.5rem"
              }}>
                <div className="poster-card" style={{
                  flex: "1 1 450px",
                  maxWidth: "540px",
                  background: "white",
                  padding: "1.2rem",
                  borderRadius: "32px",
                  boxShadow: "0 25px 70px rgba(30,178,166,0.12)",
                  border: "2px solid rgba(30,178,166,0.08)",
                  textAlign: "center",
                  transition: "transform 280ms ease, box-shadow 280ms ease"
                }}>
                  <h4 style={{
                    fontSize: "1.4rem",
                    color: "#0e5c56",
                    marginBottom: "1.2rem",
                    fontWeight: "bold",
                    fontFamily: '"Outfit", sans-serif'
                  }}>
                    Class X District Toppers - 2026
                  </h4>
                  <img 
                    src="/images/results/class_x_poster.png" 
                    alt="Class X District Toppers 2026" 
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                    }}
                  />
                </div>

                <div className="poster-card" style={{
                  flex: "1 1 450px",
                  maxWidth: "540px",
                  background: "white",
                  padding: "1.2rem",
                  borderRadius: "32px",
                  boxShadow: "0 25px 70px rgba(30,178,166,0.12)",
                  border: "2px solid rgba(30,178,166,0.08)",
                  textAlign: "center",
                  transition: "transform 280ms ease, box-shadow 280ms ease"
                }}>
                  <h4 style={{
                    fontSize: "1.4rem",
                    color: "#0e5c56",
                    marginBottom: "1.2rem",
                    fontWeight: "bold",
                    fontFamily: '"Outfit", sans-serif'
                  }}>
                    Class XII District Toppers - 2026
                  </h4>
                  <img 
                    src="/images/results/class_xii_poster.png" 
                    alt="Class XII District Toppers 2026" 
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "20px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                    }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Faculty */}
          {faculty.length > 0 && (
            <section className="neetjee-faculty-section">
              <h3 className="section-mini-title">{settings.faculty_title}</h3>
              <div className="neetjee-faculty-grid">
                {faculty.map((member, i) => (
                  <div className="neetjee-faculty-card" key={member.id || i} data-aos="fade-up" data-aos-delay={i * 80}>
                    {member.photo_url && member.photo_url.trim() !== "" && (
                      <div className="neetjee-faculty-photo">
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h4>{member.name}</h4>
                    {member.subject && <span className="neetjee-faculty-subject">{member.subject}</span>}
                    {member.qualification && <p className="neetjee-faculty-qual">{member.qualification}</p>}
                    {member.bio && <p className="neetjee-faculty-bio">{member.bio}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Answer Keys */}
          {answerKeys.length > 0 && (
            <section className="neetjee-answer-keys-section">
              <h3 className="section-mini-title">{settings.answer_keys_title}</h3>
              <div className="neetjee-answer-keys-grid">
                {answerKeys.map((key, i) => (
                  <a
                    href={key.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neetjee-answer-key-card"
                    key={key.id || i}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                  >
                    <FaFileAlt className="neetjee-answer-key-icon" />
                    <div>
                      <h4>{key.title}</h4>
                      {key.exam_name && <span>{key.exam_name}</span>}
                      {key.exam_date && <small>{key.exam_date}</small>}
                    </div>
                    <FaDownload className="neetjee-download-icon" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Bottom CTA */}
        <div className="neetjee-bottom-cta">
          <h3>{settings.bottom_cta_title}</h3>
          <p>{settings.bottom_cta_subtitle}</p>
          <div className="neetjee-hero-actions">
            <Link to={settings.bottom_cta_primary_link || "/contact"} className="neetjee-btn-primary">
              {settings.bottom_cta_primary_text}
            </Link>
            <Link to={settings.bottom_cta_secondary_link || "/contact"} className="neetjee-btn-secondary">
              {settings.bottom_cta_secondary_text}
            </Link>
          </div>
        </div>

        <p>
          <Link to="/programs">← Back to Programs Overview</Link>
        </p>
      </main>
    </>
  );
};

export default NeetJee;
