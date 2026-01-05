import React from "react";
import { useLocation, Link } from "react-router-dom";

const Back = ({ title, subtitle }) => {
  const location = useLocation();

  const pathSegment = location.pathname.split("/")[1];
  const crumb = pathSegment
    ? pathSegment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Home";

  return (
    <section
      className="back sectionDecorBack"
      aria-labelledby="page-title"
      role="banner"
    >
      {/* Decorative elements */}
      <span
        className="backSticker backStickerLeft"
        aria-hidden="true"
      >
        🕌
      </span>
      <span
        className="backSticker backStickerRight"
        aria-hidden="true"
      >
        ✨
      </span>

      <div
        className="backInner container"
        data-aos="fade-down"
        data-aos-duration="900"
      >
        {/* Breadcrumb */}
        <nav
          className="backCrumb"
          aria-label="Breadcrumb"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <Link to="/" className="backCrumbLink">
            Home
          </Link>
          <span className="backCrumbSep" aria-hidden="true">
            /
          </span>
          <span className="backCrumbCurrent" aria-current="page">
            {crumb}
          </span>
        </nav>

        {/* Title */}
        <h1
          id="page-title"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {title}
        </h1>

        {/* Optional subtitle */}
        {subtitle && (
          <p
            className="backSubtitle"
            data-aos="fade-up"
            data-aos-delay="220"
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default Back;
