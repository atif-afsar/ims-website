import React from "react";
import Heading from "../common/heading/Heading";
import { pillarsData, timelineData } from "../../dummydata";
import "./WhyIMS.css";
import {
  FaMosque,
  FaHeart,
  FaBookOpen,
  FaBrain,
  FaHandsHelping,
  FaEye,
  FaCompass,
  FaStar,
  FaSeedling,
  FaUsers,
  FaHome,
  FaGraduationCap,
  FaTree,
} from "react-icons/fa";

const WhyIMS = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "book-open":
        return <FaBookOpen />;
      case "mosque":
        return <FaMosque />;
      case "brain":
        return <FaBrain />;
      case "star":
        return <FaStar />;
      case "hands-helping":
        return <FaHandsHelping />;
      case "heart":
        return <FaHeart />;
      default:
        return <FaStar />;
    }
  };

  const getTimelineIcon = (iconName) => {
    switch (iconName) {
      case "seedling":
        return <FaSeedling />;
      case "users":
        return <FaUsers />;
      case "home":
        return <FaHome />;
      case "graduation-cap":
        return <FaGraduationCap />;
      case "tree":
        return <FaTree />;
      default:
        return <FaMosque />;
    }
  };

  return (
    <>
      {/* PILLARS */}
      <section className="ims-pillars sectionDecorWhy">
        <span className="whySticker whyStickerLeft" aria-hidden="true">🎓</span>
        <span className="whySticker whyStickerRight" aria-hidden="true">✨</span>

        <div className="container">
          <div data-aos="fade-up" data-aos-duration="900">
            <Heading subtitle="OUR FOUNDATION" title="What Makes IMS Truly Different" />
          </div>

          <div className="pillars-grid">
            {pillarsData.map((item, i) => (
              <div
                className="pillar-card"
                key={`${item.title}-${i}`}
                data-aos="zoom-in"
                data-aos-delay={i * 90}
                data-aos-duration="900"
              >
                <div className="icon-circle" aria-hidden="true">
                  {getIcon(item.icon)}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <div className="pillarTagRow" aria-hidden="true">
                  <span className="pillarTag">#Tarbiyah</span>
                  <span className="pillarTag">#Excellence</span>
                  <span className="pillarTag">#FutureReady</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="vision-mission-new sectionDecorVM">
        <span className="vmSticker vmStickerLeft" aria-hidden="true">📖</span>
        <span className="vmSticker vmStickerRight" aria-hidden="true">🕌</span>

        <div className="container">
          <div className="vm-grid">
            <div className="vm-card vision-card" data-aos="fade-right" data-aos-duration="900">
              <div className="vm-icon" aria-hidden="true">
                <FaEye />
              </div>
              <h2>Our Vision</h2>
              <div className="arabic-calligraphy">رؤيتنا</div>
              <p>
                To transform children into the most beneficial human beings who serve humanity—guided by
                Prophetic teaching and strong character.
              </p>
              <div className="hadith-quote">
                <span>“The most beloved people to Allah are those who are most beneficial to people.”</span>
              </div>
            </div>

            <div className="vm-card mission-card" data-aos="fade-left" data-aos-duration="900">
              <div className="vm-icon" aria-hidden="true">
                <FaCompass />
              </div>
              <h2>Our Mission</h2>
              <div className="arabic-calligraphy">مهمتنا</div>
              <p>
                To provide excellent material and spiritual education so students become compassionate
                leaders—rooted in Quranic values and equipped with 21st‑century skills.
              </p>
              <div className="dua-end">
                <span>ربِّ زِدْنِي عِلْمًا</span>
                <small>“My Lord, increase me in knowledge” (Quran 20:114)</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="journey-timeline sectionDecorTimeline">
        <span className="timeSticker timeStickerLeft" aria-hidden="true">🌙</span>
        <span className="timeSticker timeStickerRight" aria-hidden="true">⭐</span>

        <div className="container">
          <h2 className="section-title amiri" data-aos="fade-up" data-aos-duration="900">
            الحمد لله الذي بنعمته تتم الصالحات
          </h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="120" data-aos-duration="900">
            “Praise be to Allah by whose grace good deeds are completed”
          </p>
          <h2 className="section-title-2 amiri" data-aos="fade-up" data-aos-delay="180" data-aos-duration="900">
            17 Years of Noor, Tarbiyah & Excellence
          </h2>

          <div className="timeline-container">
            {timelineData.map((item, index) => (
              <div
                className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                key={`${item.year}-${index}`}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                data-aos-duration="900"
              >
                <div className="timeline-icon" aria-hidden="true">
                  {getTimelineIcon(item.icon)}
                </div>

                <div className="timeline-content">
                  <div className="year-badge">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <div className="timeline-dot" aria-hidden="true"></div>
              </div>
            ))}

            <div className="timeline-line" aria-hidden="true"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyIMS;
