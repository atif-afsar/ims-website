import { useState } from "react";
import media from "../content/media";

/*
 * Responsive image from the media library (src/content/media.js).
 *
 *   <Img name="robotics-lab-1" sizes="(min-width: 1024px) 50vw, 100vw" />
 *
 * Shows the blurred placeholder until the real image has loaded, then fades
 * it in. `priority` is for above-the-fold images (no lazy loading); `fill`
 * stretches the image over its positioned parent.
 */
const Img = ({ name, alt, sizes = "100vw", priority = false, fill = false, className = "", imgClassName = "", position = "center" }) => {
  const image = media[name];
  const [loaded, setLoaded] = useState(false);

  if (!image) {
    if (import.meta.env.DEV) console.warn(`Img: unknown media "${name}"`);
    return null;
  }

  return (
    <div
      className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden bg-emerald-50 ${className}`}
      style={{ backgroundImage: `url(${image.placeholder})`, backgroundSize: "cover", backgroundPosition: position }}
    >
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt ?? image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        onLoad={() => setLoaded(true)}
        // Cached images can finish before React attaches onLoad
        ref={(el) => el?.complete && el.naturalWidth > 0 && !loaded && setLoaded(true)}
        style={{ objectPosition: position }}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
};

export default Img;
