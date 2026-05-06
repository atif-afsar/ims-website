import React from "react";
import { useLocation, Link } from "react-router-dom";

const Back = ({ title, subtitle, crumbLabel }) => {
  const location = useLocation();

  const pathSegment = location.pathname.split("/")[1];
  const crumb =
    crumbLabel ??
    (pathSegment
      ? pathSegment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Home");

  const renderTitle = () => {
    if (typeof title !== "string") return title;
    const phrase = "Islamic Mission";
    if (!title.includes(phrase)) return title;

    const [before, after] = title.split(phrase);
    return (
      <>
        {before}
        <span className="backTitleHighlight">{phrase}</span>
        {after}
      </>
    );
  };

  return (
    <section
      className="back sectionDecorBack"
      aria-labelledby="page-title"
      role="banner"
      style={{
        /* Same as Home Hero — public URL so css-loader does not resolve it in App.css */
        backgroundImage: "url('/images/hero/hero-bg-new-2.png')",
      }}
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
            &gt;
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
          {renderTitle()}
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
