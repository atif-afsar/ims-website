import Img from "./Img";

/*
 * Image from admin content: "media:<slug>" uses the optimised photo library,
 * anything else is treated as an uploaded file URL.
 */
const SmartImg = ({ src, alt = "", fill, className = "", position, sizes, priority }) => {
  if (!src) return null;
  if (src.startsWith("media:")) {
    return <Img name={src.slice(6)} alt={alt || undefined} fill={fill} className={className} position={position} sizes={sizes} priority={priority} />;
  }
  return (
    <div className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden bg-emerald-50 ${className}`}>
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" style={{ objectPosition: position }} />
    </div>
  );
};

export const imageUrl = (src, mediaLookup) => (src?.startsWith("media:") ? mediaLookup[src.slice(6)]?.src : src);

export default SmartImg;
