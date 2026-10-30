import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiX, PiCaretLeft, PiCaretRight } from "react-icons/pi";
import media from "../content/media";
import Img from "./Img";
import Reveal from "./Reveal";

/* Full-screen viewer for a list of media names */
const Viewer = ({ names, index, onClose, onMove }) => {
  const item = media[names[index]];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onMove]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-navy-900/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <img src={item.src} srcSet={item.srcSet} sizes="100vw" alt={item.alt} className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-lift" onClick={(e) => e.stopPropagation()} />
      <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-3xl text-ivory-50 hover:bg-ivory-50/10" aria-label="Close viewer"><PiX /></button>
      {names.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onMove(-1); }} className="absolute left-3 rounded-full bg-ivory-50/10 p-3 text-2xl text-ivory-50 hover:bg-ivory-50/20" aria-label="Previous photo"><PiCaretLeft /></button>
          <button onClick={(e) => { e.stopPropagation(); onMove(1); }} className="absolute right-3 rounded-full bg-ivory-50/10 p-3 text-2xl text-ivory-50 hover:bg-ivory-50/20" aria-label="Next photo"><PiCaretRight /></button>
        </>
      )}
    </motion.div>
  );
};

/*
 * Grid of photos that open in a full-screen viewer. The first photo is
 * featured at double size on wider screens.
 */
const PhotoGrid = ({ names, className = "" }) => {
  const [open, setOpen] = useState(null);
  const move = useCallback((step) => setOpen((i) => (i + step + names.length) % names.length), [names.length]);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <div className={`grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 ${className}`}>
        {names.map((name, i) => (
          <Reveal key={name} delay={(i % 4) * 0.05} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <button onClick={() => setOpen(i)} className="group relative block h-full w-full overflow-hidden rounded-2xl" aria-label={`Open photo: ${media[name]?.alt}`}>
              <Img name={name} fill sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="transition-transform duration-700 group-hover:scale-105" />
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>{open !== null && <Viewer names={names} index={open} onClose={close} onMove={move} />}</AnimatePresence>
    </>
  );
};

export default PhotoGrid;
