import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiPause, PiPlay, PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { HiArrowRight } from "react-icons/hi2";
import media from "../../content/media";
import { useHeroSlides } from "../../hooks/useHeroSlides";
import Img from "../../ui/Img";
import Button from "../../ui/Button";
import { Star8, Sparkle } from "../../ui/Ornaments";

const SLIDE_MS = 7000;

/* Background video only for desktops on a normal connection */
const useVideoAllowed = () => {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAllowed(wide && !calm && !navigator.connection?.saveData);
  }, []);
  return allowed;
};

const TILE_TONES = {
  gold: { tone: "bg-gold-400 text-emerald-800", accent: "text-emerald-800/15" },
  emerald: { tone: "bg-emerald-700 text-ivory-50", accent: "text-gold-300/25" },
  navy: { tone: "bg-navy-900 text-ivory-50", accent: "text-gold-300/20" },
};

const Tile = ({ tile, index }) => {
  const { tone, accent } = TILE_TONES[tile.tone] || TILE_TONES.emerald;
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.35 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1"
    >
      <Link to={tile.link || "/"} className={`group relative flex h-full min-h-[120px] flex-col justify-end overflow-hidden rounded-2xl p-4 sm:p-5 lg:min-h-0 lg:p-7 ${tone}`}>
        <Star8 className={`absolute -right-8 -top-8 h-36 w-36 transition-transform duration-700 group-hover:rotate-45 lg:h-44 lg:w-44 ${accent}`} strokeWidth={3} />
        <p className="relative text-[10px] font-semibold uppercase tracking-eyebrow opacity-80 lg:text-xs">{tile.eyebrow}</p>
        <p className="relative mt-1 flex items-end justify-between gap-2 font-display text-base font-bold leading-tight sm:text-lg lg:text-2xl">
          {tile.title}
          <HiArrowRight className="hidden shrink-0 text-xl transition-transform duration-300 group-hover:translate-x-1 sm:block" aria-hidden="true" />
        </p>
      </Link>
    </motion.div>
  );
};

/* Photo (library or uploaded) or video behind a slide */
const SlideMedia = ({ slide, first, videoAllowed, zoom }) => {
  const libraryImage = slide.media_key && media[slide.media_key];
  const poster = libraryImage ? libraryImage.src : slide.image_url;
  const zoomClass = zoom ? "animate-ken-burns" : "";

  if (slide.video_url && videoAllowed) {
    return <video className="absolute inset-0 h-full w-full object-cover" src={slide.video_url} poster={poster} autoPlay muted loop playsInline aria-hidden="true" />;
  }
  if (libraryImage) {
    return <Img name={slide.media_key} priority={first} sizes="(min-width: 1024px) 75vw, 100vw" fill className={zoomClass} />;
  }
  if (slide.image_url) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img src={slide.image_url} alt="" className={`h-full w-full object-cover ${zoomClass}`} loading={first ? "eager" : "lazy"} />
      </div>
    );
  }
  return <div className="absolute inset-0 bg-emerald-800" />;
};

const SlideText = ({ slide, first }) => {
  const item = (i) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: (first ? 0.1 : 0.35) + i * 0.1, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
  });
  const Heading = first ? "h1" : "h2";
  return (
    <div className="max-w-3xl">
      {slide.eyebrow && (
        <motion.p {...item(0)} className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300">
          <Sparkle className="h-3 w-3" /> {slide.eyebrow}
        </motion.p>
      )}
      <motion.div {...item(1)}>
        <Heading className="font-display text-[2.4rem] font-bold leading-[1.05] text-ivory-50 sm:text-6xl xl:text-7xl">
          {slide.title} {slide.highlight && <span className="italic text-gold-400">{slide.highlight}</span>}
        </Heading>
      </motion.div>
      {slide.subtitle && (
        <motion.p {...item(2)} className="mt-6 max-w-xl text-base leading-relaxed text-ivory-100/85 sm:text-lg">
          {slide.subtitle}
        </motion.p>
      )}
      {(slide.cta_text || slide.cta2_text) && (
        <motion.div {...item(3)} className="mt-8 flex flex-wrap gap-3">
          {slide.cta_text && slide.cta_link && <Button to={slide.cta_link}>{slide.cta_text}</Button>}
          {slide.cta2_text && slide.cta2_link && <Button to={slide.cta2_link} variant="light">{slide.cta2_text}</Button>}
        </motion.div>
      )}
    </div>
  );
};

/* `slides` from the backend when available; otherwise the existing slide source */
const Hero = ({ content, slides: liveSlides }) => {
  const fallbackSlides = useHeroSlides();
  const slides = liveSlides || fallbackSlides;
  const tiles = content?.tiles || [];
  const videoAllowed = useVideoAllowed();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // user pressed pause
  const [hovering, setHovering] = useState(false);
  const touchX = useRef(null);
  const count = slides.length;
  const running = count > 1 && !paused && !hovering && !reduce;

  // Slides can change after the database responds
  useEffect(() => setIndex(0), [slides]);

  const go = useCallback((step) => setIndex((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [running, index, go]);

  // Warm the cache for the next slide's image
  useEffect(() => {
    const next = slides[(index + 1) % count];
    const src = next?.media_key ? media[next.media_key]?.src : next?.image_url;
    if (src) new Image().src = src;
  }, [index, slides, count]);

  const slide = slides[index] || slides[0];

  return (
    <section className="bg-ivory-50 p-2 md:p-3" aria-roledescription="carousel" aria-label="Highlights">
      <div className="grid gap-2 md:gap-3 lg:h-[calc(100svh-7.5rem)] lg:min-h-[600px] lg:max-h-[880px] lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
        <div
          className="relative h-[76svh] min-h-[500px] overflow-hidden rounded-2xl bg-emerald-900 lg:h-full"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          {/* Media layer: slow crossfade between slides */}
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <SlideMedia slide={slide} first={index === 0} videoAllowed={videoAllowed} zoom={!reduce} />
            </motion.div>
          </AnimatePresence>

          {/* Emerald wash keeps text legible on any photo */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-emerald-900/60 via-emerald-900/5 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-900/95 via-emerald-900/45 to-transparent" aria-hidden="true" />

          {/* Text */}
          <div className="absolute inset-x-0 bottom-0 p-6 pb-24 sm:p-10 sm:pb-28 lg:p-14 lg:pb-32" aria-live={running ? "off" : "polite"}>
            <AnimatePresence mode="wait">
              <motion.div key={slide.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`}>
                <SlideText slide={slide} first={index === 0} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: numbered progress indicators, arrows, pause */}
          {count > 1 && (
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 px-6 pb-6 sm:px-10 lg:px-14 lg:pb-10">
              <div className="flex flex-1 gap-3 sm:gap-5">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setIndex(i)}
                    className="group flex-1 text-left"
                    aria-label={`Go to slide ${i + 1}${s.eyebrow ? `: ${s.eyebrow}` : ""}`}
                    aria-current={i === index}
                  >
                    <span className={`mb-2 hidden font-display text-sm font-semibold transition-colors sm:block ${i === index ? "text-gold-300" : "text-ivory-100/60 group-hover:text-ivory-50"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative block h-[3px] overflow-hidden rounded-full bg-ivory-50/25">
                      {i === index && (
                        <motion.span
                          key={`${slide.id}-${running}`}
                          className="absolute inset-y-0 left-0 rounded-full bg-gold-400"
                          initial={{ width: running ? "0%" : "100%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: running ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                        />
                      )}
                      {i < index && <span className="absolute inset-0 rounded-full bg-ivory-50/60" />}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => go(-1)} className="rounded-full border border-ivory-50/40 p-2.5 text-ivory-50 backdrop-blur-sm transition hover:bg-ivory-50/15" aria-label="Previous slide"><PiCaretLeft /></button>
                <button onClick={() => go(1)} className="rounded-full border border-ivory-50/40 p-2.5 text-ivory-50 backdrop-blur-sm transition hover:bg-ivory-50/15" aria-label="Next slide"><PiCaretRight /></button>
                <button onClick={() => setPaused((p) => !p)} className="hidden rounded-full border border-ivory-50/40 p-2.5 text-ivory-50 backdrop-blur-sm transition hover:bg-ivory-50/15 sm:block" aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
                  {paused ? <PiPlay /> : <PiPause />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tiles */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 lg:flex lg:flex-col">
          {tiles.map((tile, i) => <Tile key={`${tile.title}-${i}`} tile={tile} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Hero;
