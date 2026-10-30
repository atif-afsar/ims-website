import React from "react";
import Heading from "../common/heading/Heading";
import "./cocurricular.css";
import {
  FaMicrophoneAlt,
  FaTrophy,
  FaRunning,
  FaHandsHelping,
  FaPaintBrush,
  FaPenFancy,
  FaBookReader,
  FaTheaterMasks,
  FaQuran,
  FaStar,
  FaHeart,
  FaBolt,
  FaLightbulb,
} from "react-icons/fa";

const CoCurricular = () => {
  const programs = [
    {
      icon: <FaMicrophoneAlt />,
      title: "Public Speaking",
      desc: "Dedicated classes in English & Arabic • Speech & Extempore competitions to build confidence and eloquence",
      tags: ["Confidence", "Communication", "Leadership"],
      vibe: "skill",
    },
    {
      icon: <FaTrophy />,
      title: "Quiz Competition",
      desc: "Annual Quiz with General & Academic Awareness rounds • Fosters knowledge and quick thinking",
      tags: ["Knowledge", "Speed", "Teamwork"],
      vibe: "achievement",
    },
    {
      icon: <FaRunning />,
      title: "Annual Sports Day",
      desc: "Fun races: Sack race, Three-legged race, Frog race • Promotes health, teamwork & sportsmanship",
      tags: ["Fitness", "Teamwork", "Energy"],
      vibe: "sports",
    },
    {
      icon: <FaHandsHelping />,
      title: "Social Issues Exhibition",
      desc: "Students create models & charts on important social themes • Develops empathy and awareness",
      tags: ["Empathy", "Awareness", "Creativity"],
      vibe: "values",
    },
    {
      icon: <FaPaintBrush />,
      title: "Art to Heart Competition",
      desc: "Yearly art contest expressing moral & social values • Brings feelings from heart to paper",
      tags: ["Art", "Expression", "Values"],
      vibe: "creative",
    },
    {
      icon: <FaPenFancy />,
      title: "Creative Writing Competition",
      desc: "Nurtures imagination and writing skills • Creativity is thinking what no one else has thought",
      tags: ["Writing", "Imagination", "Vocabulary"],
      vibe: "creative",
    },
    {
      icon: <FaBookReader />,
      title: "Story Telling / Show & Tell",
      desc: "Boosts interpretation, creativity & communication • Children showcase their storytelling talent",
      tags: ["Story", "Speaking", "Confidence"],
      vibe: "skill",
    },
    {
      icon: <FaTheaterMasks />,
      title: "Annual Function",
      desc: "Grand event with public talks, skits, Nasheeds • Theme-based performances",
      tags: ["Stage", "Teamwork", "Talent"],
      vibe: "achievement",
    },
    {
      icon: <FaQuran />,
      title: "Nasheed & Qirat Competition",
      desc: "Beautiful recitation and Islamic songs • Strengthens love for Quran and Sunnah",
      tags: ["Quran", "Tajweed", "Adab"],
      vibe: "values",
    },
  ];

  const vibeBadge = (vibe) => {
    switch (vibe) {
      case "sports":
        return { icon: <FaBolt />, text: "Active" };
      case "creative":
        return { icon: <FaLightbulb />, text: "Creative" };
      case "values":
        return { icon: <FaHeart />, text: "Character" };
      case "achievement":
        return { icon: <FaTrophy />, text: "Achievement" };
      default:
        return { icon: <FaStar />, text: "Skills" };
    }
  };

  return (
    <section className="cocurricular-section sectionDecorCo" aria-label="Co-curricular programmes">
      {/* Decorative side stickers (emoji = no assets needed) */}
      <span className="coSticker coStickerLeft" aria-hidden="true">
        🎈
      </span>
      <span className="coSticker coStickerRight" aria-hidden="true">
        🧸
      </span>
      <span className="coSticker coStickerTop" aria-hidden="true">
        ✨
      </span>

      <div className="container">
        <div data-aos="fade-up" data-aos-duration="900">
          <Heading subtitle="HOLISTIC DEVELOPMENT" title="Co-Curricular Programmes" />
        </div>

        <div className="cocurricular-intro" data-aos="fade-up" data-aos-delay="120" data-aos-duration="900">
          <p>
            Several skills and qualities instrumental in a child&apos;s holistic development are learned outside the
            classroom.
            <strong> Alhamdulillah, IMS has integrated various co-curricular programmes</strong> that fully support a
            child&apos;s learning journey.
          </p>
        </div>

        <div className="cocurricular-grid">
          {programs.map((prog, i) => {
            const badge = vibeBadge(prog.vibe);

            return (
              <div
                className="cocurricular-card"
                key={i}
                data-aos={i % 3 === 0 ? "fade-up" : i % 3 === 1 ? "zoom-in" : "flip-left"}
                data-aos-delay={i * 90}
                data-aos-duration="900"
              >
                <div className="card-top">
                  <div className={`vibe-pill vibe-${prog.vibe}`}>
                    <span className="vibe-ico" aria-hidden="true">
                      {badge.icon}
                    </span>
                    <span>{badge.text}</span>
                  </div>
                </div>

                <div className="card-icon-wrapper">
                  <div className="card-icon" aria-hidden="true">
                    {prog.icon}
                  </div>
                  <div className="icon-glow" aria-hidden="true"></div>
                </div>

                <h3>{prog.title}</h3>
                <p>{prog.desc}</p>

                <div className="coTags" aria-label="Program tags">
                  {prog.tags.map((t) => (
                    <span className="coTag" key={t}>
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="card-decoration" aria-hidden="true">
                  <FaStar className="star1" />
                  <FaStar className="star2" />
                  <FaStar className="star3" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="cocurricular-footer" data-aos="fade-up" data-aos-delay="150" data-aos-duration="900">
          <p className="footer-quote">
            &quot;The best of people are those who bring most benefit to others&quot;
            <span>— Prophet Muhammad ﷺ</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CoCurricular;
