import Img from "./Img";

/*
 * Photo inside an Islamic arch (rounded top), with an offset gold outline
 * echoing the arch frames on the admission poster.
 */
const ArchFrame = ({ name, sizes, priority, className = "", outline = true, position }) => (
  <div className={`relative ${className}`}>
    {outline && (
      <div aria-hidden="true" className="absolute -inset-3 rounded-t-full rounded-b-[28px] border border-gold-500/70 md:-inset-4" />
    )}
    <Img
      name={name}
      sizes={sizes}
      priority={priority}
      position={position}
      className="aspect-[4/5] h-full w-full rounded-t-full rounded-b-[20px] shadow-lift"
    />
  </div>
);

export default ArchFrame;
