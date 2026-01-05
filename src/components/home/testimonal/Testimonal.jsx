import React from "react";
import { testimonial } from "../../../dummydata";
import Heading from "../../common/heading/Heading";
import "./testimonial.css";

const Testimonal = () => {
  const marqueeTestimonials = [...testimonial, ...testimonial];

  return (
    <section className="ims-testimonials-marquee sectionDecorTestimonials">
      <img
        className="tSticker tStickerLeft"
        src="/images/stickers/duck.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <img
        className="tSticker tStickerRight"
        src="/images/stickers/star.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="container">
        <div data-aos="fade-up" data-aos-duration="900" className="words">
          <Heading subtitle="ماشاءالله" title="Endless Words of Love & Gratitude" />
        </div>

        <div className="marquee-wrapper" data-aos="fade-up" data-aos-delay="150">
          <div className="marquee" aria-label="Parents and students testimonials marquee">
            {marqueeTestimonials.map((item, i) => (
              <div className="marquee-card" key={i} data-aos="zoom-in" data-aos-delay={(i % 6) * 60}>
                <p className="marquee-text">“{item.desc}”</p>
                <div className="marquee-author">
                  <h4>{item.name}</h4>
                  <span className="arabic">{item.arabicName}</span>
                  <small>{item.post}</small>
                </div>
                <div className="dua-small">جزاكم الله خيراً</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonal;
