import React, { useEffect, useMemo, useState } from "react";
import { FaExpand, FaTimes } from "react-icons/fa";
import SEOHelmet from "../common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
import "./gallery.css";

/** Filenames in public/images/gallery — must match git-tracked casing exactly (Linux is case-sensitive). */
const GALLERY_FILENAMES = [
  "DSC_1542 - Copy.jpg",
  "DSC_1547 - Copy.jpg",
  "DSC_2972.jpg",
  "DSC_3001.jpg",
  "DSC_3015.jpg",
  "DSC_3032.jpg",
  "DSC_3100.jpg",
  "DSC_3197.jpg",
  "DSC_3235.jpg",
  "DSC_3255.jpg",
  "DSC_4037.jpg",
  "DSC_4047.jpg",
  "DSC_4052.jpg",
  "DSC_4108.jpg",
  "DSC_4117.jpg",
  "DSC_4132.jpg",
  "DSC_4180.jpg",
  "DSC_4187.jpg",
  "DSC_4211.jpg",
  "DSC09049.jpg",
  "DSC09096.jpg",
  "DSC09128.jpg",
  "DSC09136.jpg",
  "IMG_8651.jpg",
  "IMG_8864.jpg",
  "IMG_8887.jpg",
  "IMG_9021.jpg",
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

const publicBase = (process.env.PUBLIC_URL || "").replace(/\/$/, "");

const srcForFile = (filename) =>
  `${publicBase}/images/gallery/${encodeURIComponent(filename)}`;

const Gallery = () => {
  const galleryItems = useMemo(
    () =>
      GALLERY_FILENAMES.map((filename) => ({
        filename,
        src: srcForFile(filename),
      })),
    []
  );

  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) =>
          i === null ? null : Math.min(galleryItems.length - 1, i + 1)
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => (i === null ? null : Math.max(0, i - 1)));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, galleryItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex]);

  const lightbox =
    lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <section className="gallery-page">
      <SEOHelmet
        title="Gallery | Islamic Mission School"
        description="Photo gallery of Islamic Mission School — campus, events, and daily life."
        keywords="Islamic Mission School gallery, IMS photos, campus, Aligarh school"
        canonical={siteUrl("/gallery")}
        ogTitle="Gallery | Islamic Mission School"
        ogDescription="Explore life at IMS through our photo gallery."
        ogUrl={siteUrl("/gallery")}
      />

      <div className="container gallery-inner">
        <header className="gallery-head">
          <span className="gallery-kicker">Moments at IMS</span>
          <h1>Gallery</h1>
          <h2 className="gallery-subtitle">
            Campus life, learning, and community — seen through our lens.
          </h2>
        </header>

        <ul className="gallery-grid" aria-label="School photo gallery">
          {galleryItems.map((item, index) => (
            <li
              key={item.filename}
              className={`gallery-cell${
                index % 10 === 0 ? " gallery-cell--accent" : ""
              }${index % 14 === 6 ? " gallery-cell--accent-warm" : ""}`}
            >
              <button
                type="button"
                className="gallery-thumb"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View gallery photo ${index + 1} full screen`}
              >
                <img
                  src={item.src}
                  alt=""
                  loading={index < 8 ? "eager" : "lazy"}
                  decoding="async"
                  className="gallery-thumb-img"
                />
                <span className="gallery-thumb-shade" aria-hidden="true" />
                <span className="gallery-thumb-hover" aria-hidden="true">
                  <FaExpand />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {lightbox && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery photo ${(lightboxIndex ?? 0) + 1} of ${galleryItems.length}`}
        >
          <button
            type="button"
            className="gallery-lightbox-backdrop"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          />
          <figure className="gallery-lightbox-figure">
            <img
              src={lightbox.src}
              alt={`Gallery ${(lightboxIndex ?? 0) + 1} of ${galleryItems.length}`}
            />
            <figcaption>
              Photo {(lightboxIndex ?? 0) + 1} of {galleryItems.length}
            </figcaption>
          </figure>
          {galleryItems.length > 1 && (
            <div className="gallery-lightbox-nav">
              <button
                type="button"
                className="gallery-lightbox-prev"
                disabled={lightboxIndex === 0}
                onClick={() =>
                  setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))
                }
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                className="gallery-lightbox-next"
                disabled={lightboxIndex === galleryItems.length - 1}
                onClick={() =>
                  setLightboxIndex((i) =>
                    Math.min(galleryItems.length - 1, (i ?? 0) + 1)
                  )
                }
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          )}
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery viewer"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
