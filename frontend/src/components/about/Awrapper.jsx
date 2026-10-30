import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaGraduationCap, FaUsers, FaMosque, FaBook } from "react-icons/fa";
import "./about.css";

const Awrapper = () => {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [values, setValues] = useState([0, 0, 0, 0]);

  // IMS-aligned statistics
  const stats = useMemo(
    () => [
      {
        icon: <FaGraduationCap />,
        target: 1000,
        label: "Students Nurtured",
        suffix: "+",
      },
      {
        icon: <FaUsers />,
        target: 80,
        label: "Dedicated Educators",
        suffix: "+",
      },
      {
        icon: <FaBook />,
        target: 15,
        label: "Years of Value-Based Education",
        suffix: "+",
      },
      {
        icon: <FaMosque />,
        target: 1,
        label: "Mission: Serving Humanity",
        suffix: "",
      },
    ],
    []
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated) return;
        setHasAnimated(true);

        const duration = 1600;
        const start = performance.now();

        const animate = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);

          setValues(stats.map((s) => Math.floor(s.target * eased)));

          if (t < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  return (
    <section className="awrapper awrapperDecor" ref={sectionRef}>
      {/* Decorative stickers */}
      <img
        className="awSticker awStickerLeft"
        src="/images/stickers/kite.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <img
        className="awSticker awStickerRight"
        src="/images/stickers/book.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="container">
        <div className="awGrid">
          {stats.map((stat, index) => (
            <div
              className="awCard"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 120}
              data-aos-duration="900"
            >
              <div className="awIcon" aria-hidden="true">
                {stat.icon}
              </div>

              <div className="awText">
                <h1 className="awCount">
                  {values[index]}
                  {stat.suffix}
                </h1>
                <h3 className="awLabel">{stat.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awrapper;
