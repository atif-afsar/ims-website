import React, { useEffect, useRef } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";

const publicBase = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
const HERO_VIDEO_FILE = "DJI_20240518070739_0008_D (1).mp4";
const HERO_VIDEO_SRC = `${publicBase}/images/videos/${encodeURIComponent(HERO_VIDEO_FILE)}`;
const HERO_POSTER = `${publicBase}/images/hero/hero-bg-new-2.png`;

const MotionLink = motion(Link);

const heroButtonMotion = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: (delayOrder = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: 0.28 + delayOrder * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      if (mq.matches) {
        video.pause();
      } else {
        const p = video.play();
        if (p !== undefined && typeof p.catch === "function") {
          p.catch(() => {});
        }
      }
    };

    syncMotion();
    mq.addEventListener("change", syncMotion);
    return () => mq.removeEventListener("change", syncMotion);
  }, []);

  return (
    <>
      <section
        className="hero"
        aria-label="Islamic Mission School hero section"
      >
        <div className="hero-media" aria-hidden="true">
          <div
            className="hero-static-fallback"
            style={{ backgroundImage: `url(${HERO_POSTER})` }}
          />
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-content" data-aos="zoom-in" data-aos-duration="900">
            <h1 className="hero-title" data-aos="fade-up" data-aos-delay="120">
              ISLAMIC <span>MISSION</span> SCHOOL
            </h1>

            <p className="hero-description" data-aos="fade-up" data-aos-delay="220">
              &quot;Shaping Confident Learners For A Global Future&quot;
            </p>

            <div className="hero-buttons" data-aos="fade-up" data-aos-delay="320">
              <MotionLink
                className="primary-btn hero-btn"
                to={"/contact"}
                variants={heroButtonMotion}
                initial="hidden"
                animate="visible"
                custom={0}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="hero-btn-shine" aria-hidden="true"></span>
                <span>Apply Now</span>
              </MotionLink>

              <MotionLink
                className="secondary-btn hero-btn"
                to={"/about"}
                variants={heroButtonMotion}
                initial="hidden"
                animate="visible"
                custom={1}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="hero-btn-shine" aria-hidden="true"></span>
                <span>Discover More</span>
                <FaLongArrowAltRight />
              </MotionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
