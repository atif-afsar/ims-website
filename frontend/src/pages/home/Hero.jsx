import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiPause, PiPlay, PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { HiArrowRight } from "react-icons/hi2";
import media from "../../content/media";
import { useHeroSlides } from "../../hooks/useHeroSlides";
import Button from "../../ui/Button";
import { BlockShape, Sparkle } from "../../ui/Ornaments";
import { HEADER_H } from "../../layout/SiteHeader";
import { HERO_READY } from "./heroReady";

const SLIDE_MS = 7000;
const EASE = [0.22, 1, 0.36, 1];

// Lets the page loader wait for the first hero photo (see App.jsx)
let announced = false;
const announceReady = () => {
  if (announced) return;
  announced = true;
  window.dispatchEvent(new Event(HERO_READY));
};

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

/* A slide's photo: library photo (media_key or "media:<slug>" in image_url) or an uploaded file */
const imageOf = (slide) => {
  const key = slide.media_key || (slide.image_url?.startsWith("media:") ? slide.image_url.slice(6) : null);
  return (key && media[key]) || null;
};

/* Full-bleed photo (or video) for one slide, with a gentle zoom */
const SlideMedia = ({ slide, priority, videoAllowed, zoom }) => {
  const lib = imageOf(slide);
  const src = lib ? lib.src : slide.image_url;
  const onLoad = priority ? announceReady : undefined;

  if (slide.video_url && videoAllowed) {
    return <video className="absolute inset-0 h-full w-full object-cover" src={slide.video_url} poster={src} autoPlay muted loop playsInline onLoadedData={onLoad} aria-hidden="true" />;
  }
  if (!src) return <div className="absolute inset-0 bg-emerald-800" ref={() => onLoad?.()} />;
  return (
    <div className="absolute inset-0 overflow-hidden bg-emerald-900" style={lib ? { backgroundImage: `url(${lib.placeholder})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
      <img
        src={src}
        srcSet={lib?.srcSet}
        sizes="(min-width: 1024px) 75vw, 100vw"
        alt=""
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={onLoad}
        onError={onLoad}
        ref={(el) => el?.complete && onLoad?.()}
        className={`h-full w-full object-cover object-[center_35%] ${zoom ? "animate-ken-burns" : ""}`}
      />
    </div>
  );
};

/* Headline: each word rises out of a mask, ISB-style */
const SlideText = ({ slide, first }) => {
  // The page's h1 is the school name (HomePage); slide headlines change, so they are h2
  const Heading = "h2";
  const base = first ? 0.2 : 0.45;
  const words = [
    ...String(slide.title || "").split(/\s+/).filter(Boolean).map((w) => ({ w, gold: false })),
    ...String(slide.highlight || "").split(/\s+/).filter(Boolean).map((w) => ({ w, gold: true })),
  ];
  const fade = (i) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: base + words.length * 0.06 + i * 0.1, ease: EASE } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  });

  return (
    <div className="max-w-[46rem]">
      {slide.eyebrow && (
        <motion.p {...fade(-2)} className="mb-5 inline-flex max-w-full items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold-300 sm:text-xs">
          <Sparkle className="h-3 w-3 shrink-0" /> <span className="truncate">{slide.eyebrow}</span>
        </motion.p>
      )}
      <Heading className="text-balance font-display text-[2.4rem] font-bold leading-[1.05] text-ivory-50 sm:text-6xl xl:text-7xl">
        {words.map(({ w, gold }, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${gold ? "italic text-gold-400" : ""}`}
              initial={{ y: "110%" }}
              animate={{ y: 0, transition: { duration: 0.9, delay: base + i * 0.06, ease: EASE } }}
              exit={{ y: "-110%", transition: { duration: 0.35, ease: "easeIn" } }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </Heading>
      {slide.subtitle && (
        <motion.p {...fade(0)} className="mt-5 line-clamp-3 max-w-xl text-base leading-relaxed text-ivory-100/90 sm:text-lg">
          {slide.subtitle}
        </motion.p>
      )}
      {(slide.cta_text || slide.cta2_text) && (
        <motion.div {...fade(1)} className="mt-8 flex flex-wrap items-center gap-3">
          {slide.cta_text && slide.cta_link && <Button to={slide.cta_link}>{slide.cta_text}</Button>}
          {slide.cta2_text && slide.cta2_link && <Button to={slide.cta2_link} variant="light" className="backdrop-blur-sm">{slide.cta2_text}</Button>}
        </motion.div>
      )}
    </div>
  );
};

const TILE_TONES = {
  gold: { box: "bg-gold-400 text-emerald-900", shape: "text-emerald-700" },
  emerald: { box: "bg-emerald-700 text-ivory-50", shape: "text-gold-400" },
  navy: { box: "bg-navy-900 text-ivory-50", shape: "text-emerald-500" },
};
const SHAPES = ["arches", "petals", "star"];

/* Colour block with a big geometric shape, beside the slider (editable in Admin → Homepage → Hero) */
const Tile = ({ tile, i }) => {
  const tone = TILE_TONES[tile.tone] || TILE_TONES.emerald;
  return (
    <motion.div
      className="min-h-[9rem] flex-1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5 + i * 0.12, ease: EASE }}
    >
      <Link to={tile.link || "/"} className={`group relative flex h-full flex-col justify-end overflow-hidden p-6 md:p-8 ${tone.box}`}>
        <BlockShape
          variant={SHAPES[i % SHAPES.length]}
          className={`absolute -right-6 -top-6 h-[78%] max-h-56 transition-transform duration-700 ease-out group-hover:-translate-x-3 group-hover:translate-y-2 group-hover:rotate-6 ${tone.shape}`}
        />
        <span className="relative">
          {tile.eyebrow && <span className="block text-[10px] font-bold uppercase tracking-eyebrow opacity-75">{tile.eyebrow}</span>}
          <span className="mt-1.5 flex items-end justify-between gap-4">
            <span className="font-display text-2xl font-bold leading-tight xl:text-[1.75rem]">{tile.title}</span>
            <HiArrowRight className="mb-1 shrink-0 text-2xl transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
          </span>
        </span>
      </Link>
    </motion.div>
  );
};

const CTRL = "grid h-12 w-12 place-items-center rounded-full border border-ivory-50/60 text-lg text-ivory-50 backdrop-blur-sm transition hover:bg-ivory-50 hover:text-emerald-900";

/* `slides` from the backend when available; otherwise the existing slide source */
const Hero = ({ content, slides: liveSlides }) => {
  const fallbackSlides = useHeroSlides();
  const slides = liveSlides?.length ? liveSlides : fallbackSlides;
  const tiles = content?.tiles || [];
  const videoAllowed = useVideoAllowed();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
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

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  // Warm the cache for the next slide's photo
  useEffect(() => {
    const next = slides[(index + 1) % count];
    const lib = next && imageOf(next);
    if (lib) {
      const img = new Image();
      img.sizes = "75vw";
      img.srcset = lib.srcSet;
      img.src = lib.src;
    } else if (next?.image_url) new Image().src = next.image_url;
  }, [index, slides, count]);

  const slide = slides[index] || slides[0];
  if (!slide) return null;

  return (
    <section className="bg-ivory-50 lg:flex lg:h-[100svh] lg:min-h-[640px]" aria-roledescription="carousel" aria-label="Highlights">
      <div
        className="relative h-[88svh] min-h-[560px] overflow-hidden bg-emerald-900 outline-none lg:h-full lg:min-h-0 lg:flex-1"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {/* Photos: slow crossfade */}
        <AnimatePresence initial={false}>
          <motion.div key={slide.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
            <SlideMedia slide={slide} priority={index === 0} videoAllowed={videoAllowed} zoom={!reduce} />
          </motion.div>
        </AnimatePresence>

        {/* Legibility: dark at the top (header) and bottom-left (text) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-950/60 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-950/90 via-emerald-900/35 to-transparent" aria-hidden="true" />

        {/* Text + controls */}
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6 sm:px-10 sm:pb-8 lg:px-14 lg:pb-12">
          <div aria-live={running ? "off" : "polite"}>
            <AnimatePresence mode="wait">
              <motion.div key={slide.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`}>
                <SlideText slide={slide} first={index === 0} />
              </motion.div>
            </AnimatePresence>
          </div>

          {count > 1 && (
            <div className="mt-9 flex items-center justify-between gap-4 md:mt-12">
              <div className="flex min-w-0 items-center gap-4">
                <button onClick={() => setPaused((p) => !p)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ivory-50/60 text-ivory-50 transition hover:bg-ivory-50 hover:text-emerald-900" aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
                  {paused ? <PiPlay /> : <PiPause />}
                </button>
                <span className="shrink-0 font-display text-sm text-ivory-50">
                  <span className="text-lg font-bold text-gold-300">{String(index + 1).padStart(2, "0")}</span>
                  <span className="mx-1 text-ivory-100/40">/</span>
                  <span className="text-ivory-100/70">{String(count).padStart(2, "0")}</span>
                </span>
                <div className="hidden items-center gap-1.5 sm:flex">
                  {slides.map((s, i) => {
                    const active = i === index;
                    const name = s.label || s.eyebrow || s.title;
                    return (
                      <button key={s.id} onClick={() => setIndex(i)} className="group py-3" aria-label={`Go to slide ${i + 1}: ${name}`} aria-current={active} title={name}>
                        <span className={`relative block h-[3px] overflow-hidden rounded-full transition-all duration-500 ${active ? "w-14 bg-ivory-50/25" : "w-5 bg-ivory-50/40 group-hover:bg-ivory-50/80"}`}>
                          {active && (
                            <motion.span
                              key={`${s.id}-${running}`}
                              className="absolute inset-y-0 left-0 rounded-full bg-gold-400"
                              initial={{ width: running ? "0%" : "100%" }}
                              animate={{ width: "100%" }}
                              transition={{ duration: running ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex shrink-0 gap-3">
                <button onClick={() => go(-1)} className={`${CTRL} bg-ivory-50 !text-emerald-900 hover:!bg-gold-300`} aria-label="Previous slide"><PiCaretLeft /></button>
                <button onClick={() => go(1)} className={CTRL} aria-label="Next slide"><PiCaretRight /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tile column: under the header's white box on desktop, a stack below the photo on phones */}
      {tiles.length > 0 && (
        <div className="flex flex-col lg:w-[22rem] xl:w-[26rem]">
          <div className={`hidden shrink-0 lg:block ${HEADER_H}`} aria-hidden="true" />
          <div className="grid sm:grid-cols-3 lg:flex lg:flex-1 lg:flex-col">
            {tiles.map((t, i) => <Tile key={`${t.title}-${i}`} tile={t} i={i} />)}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
