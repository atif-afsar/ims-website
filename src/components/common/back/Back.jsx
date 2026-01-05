import React from "react";
import { useLocation, Link } from "react-router-dom";

const Back = ({ title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const crumb = path ? path.replace(/-/g, " ") : "home";

  return (
    <>
      <section className="back sectionDecorBack" aria-label={`${title} page banner`}>
        {/* Decorative stickers (emoji, no assets needed) */}
        <span className="backSticker backStickerLeft" aria-hidden="true">🕌</span>
        <span className="backSticker backStickerRight" aria-hidden="true">✨</span>

        <div className="backInner container" data-aos="fade-down" data-aos-duration="900">
          <div className="backCrumb" data-aos="fade-up" data-aos-delay="80">
            <Link to="/" className="backCrumbLink">Home</Link>
            <span className="backCrumbSep">/</span>
            <span className="backCrumbCurrent">{crumb}</span>
          </div>

          <h1 data-aos="fade-up" data-aos-delay="140">{title}</h1>
        </div>
      </section>
    </>
  );
};

export default Back;
