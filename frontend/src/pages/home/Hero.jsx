import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PiPause, PiPlay } from "react-icons/pi";
import { HiArrowRight } from "react-icons/hi2";
import media from "../../content/media";
import defaultSlides from "../../content/heroSlides";
import { useHeroSlides } from "../../hooks/useHeroSlides";
import Button from "../../ui/Button";
import { BlockShape } from "../../ui/Ornaments";
import { HEADER_H } from "../../layout/SiteHeader";
import { HERO_READY } from "./heroReady";

const SLIDE_MS = 6000;
const FADE_S = 1.4;
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

/* Full-bleed photo (or video) for one slide; photos drift slowly in or out */
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
        style={{ objectPosition: slide.position || lib?.position || "center 35%" }}
        className={`h-full w-full object-cover ${zoom || ""}`}
      />
    </div>
  );
};

/* Text over a slide: its own if the admin switched that on, else the optional main message (blank by default) */
const messageFor = (slide, content) => {
  const own = slide.show_text && (slide.title || slide.highlight || slide.subtitle || slide.eyebrow);
  if (!own) return { key: "main", ...content };
  return {
    key: `slide-${slide.id}`,
    eyebrow: slide.eyebrow,
    title: slide.title,
    highlight: slide.highlight,
    subtitle: slide.subtitle,
    primaryText: slide.cta_text || content?.primaryText,
    primaryLink: slide.cta_text ? slide.cta_link : content?.primaryLink,
    secondaryText: slide.cta2_text || content?.secondaryText,
    secondaryLink: slide.cta2_text ? slide.cta2_link : content?.secondaryLink,
  };
};

/* Stays still while the photos move; only changes when a slide has its own text */
const Message = ({ message, reduce }) => (
  <motion.div
    initial={reduce ? false : { opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.15, ease: EASE } }}
    exit={reduce ? undefined : { opacity: 0, y: -12, transition: { duration: 0.3 } }}
  >
    {message.eyebrow && (
      <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold-300 sm:text-sm">
        <span className="h-px w-10 shrink-0 bg-gold-400" aria-hidden="true" /> {message.eyebrow}
      </p>
    )}
    {/* The page's h1 is the school name (HomePage) */}
    <h2 className="text-balance font-display text-[2.75rem] font-bold leading-[1.04] tracking-tight text-ivory-50 [text-shadow:0_2px_30px_rgba(0,30,20,.45)] sm:text-6xl xl:text-7xl">
      {message.title}
      {message.highlight && <span className="block font-semibold italic text-gold-300">{message.highlight}</span>}
    </h2>
    {message.subtitle && <p className="mt-5 line-clamp-2 max-w-xl text-base leading-relaxed text-ivory-100/90 sm:text-lg">{message.subtitle}</p>}
    {(message.primaryText || message.secondaryText) && (
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {message.primaryText && message.primaryLink && <Button to={message.primaryLink}>{message.primaryText}</Button>}
        {message.secondaryText && message.secondaryLink && <Button to={message.secondaryLink} variant="light" className="!hidden backdrop-blur-sm sm:!inline-flex">{message.secondaryText}</Button>}
      </div>
    )}
  </motion.div>
);

const TILE_TONES = {
  gold: { box: "bg-gold-400 text-emerald-900", shape: "text-emerald-700" },
  emerald: { box: "bg-emerald-700 text-ivory-50", shape: "text-gold-400" },
  navy: { box: "bg-navy-900 text-ivory-50", shape: "text-emerald-500" },
};
const SHAPES = ["arches", "petals", "star"];

/* Colour block with a big geometric shape, beside the photos (editable in Admin → Homepage → Hero) */
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

/* `slides` from the backend when available; photos only, unless the admin adds text */
const Hero = ({ content, slides: liveSlides }) => {
  const fallbackSlides = useHeroSlides();
  const slides = useMemo(() => {
    const chosen = (liveSlides?.length ? liveSlides : fallbackSlides).filter((s) => imageOf(s) || s.image_url || s.video_url);
    // A single photo can't move, so fewer than two falls back to the built-in set
    return chosen.length >= 2 ? chosen : defaultSlides;
  }, [liveSlides, fallbackSlides]);
  const tiles = content?.tiles || [];
  const videoAllowed = useVideoAllowed();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = slides.length;
  const running = !paused && !reduce;

  // Slides can change after the database responds
  useEffect(() => setIndex(0), [slides]);

  const go = useCallback((step) => setIndex((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [running, index, go]);

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
  const message = messageFor(slide, content);
  const hasText = Boolean(message.eyebrow || message.title || message.highlight || message.subtitle);

  return (
    <section className="bg-ivory-50 lg:flex lg:h-[100svh] lg:min-h-[640px]" aria-label="Photos of school life">
      <div
        className="relative h-[88svh] min-h-[560px] overflow-hidden bg-emerald-900 lg:h-full lg:min-h-0 lg:flex-1"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {/* The new photo fades in over the old one, which only leaves once covered */}
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, zIndex: 1 }}
            animate={{ opacity: 1, zIndex: 1 }}
            exit={{ opacity: 0, zIndex: 0, transition: { opacity: { delay: FADE_S, duration: 0 }, zIndex: { duration: 0 } } }}
            transition={{ opacity: { duration: FADE_S, ease: "easeInOut" }, zIndex: { duration: 0 } }}
          >
            <SlideMedia slide={slide} priority={index === 0} videoAllowed={videoAllowed} zoom={reduce ? null : index % 2 ? "animate-hero-zoom-out" : "animate-hero-zoom-in"} />
          </motion.div>
        </AnimatePresence>

        {/* A neutral dark fade keeps the header readable on bright photos; a darker one only when a photo has text */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-48 bg-gradient-to-b from-black/70 via-black/35 to-transparent" aria-hidden="true" />
        {hasText && <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/65 via-black/20 via-45% to-transparent" aria-hidden="true" />}

        <div className="absolute inset-x-0 bottom-0 z-[3] flex flex-col gap-4 px-5 pb-6 sm:gap-8 sm:px-10 sm:pb-8 lg:px-14 lg:pb-12">
          <AnimatePresence mode="wait">
            {hasText && <Message key={message.key} message={message} reduce={reduce} />}
          </AnimatePresence>

          <div className="flex items-center gap-3 drop-shadow-[0_1px_4px_rgba(0,0,0,.7)]">
            <button onClick={() => setPaused((p) => !p)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ivory-50 transition hover:bg-ivory-50/15" aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
              {paused ? <PiPlay /> : <PiPause />}
            </button>
            <div className="flex items-center gap-1.5">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <button key={s.id} onClick={() => setIndex(i)} className="group py-3" aria-label={`Show photo ${i + 1} of ${count}`} aria-current={active}>
                    <span className="relative block h-[3px] w-7 overflow-hidden rounded-full bg-ivory-50/35 transition-colors group-hover:bg-ivory-50/70 sm:w-9">
                      {active && (
                        <motion.span
                          key={`${s.id}-${running}`}
                          className="absolute inset-y-0 left-0 rounded-full bg-gold-300"
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
        </div>
      </div>

      {/* Tile column: under the header's white box on desktop, a row below the photos on phones */}
      {tiles.length > 0 && (
        <div className="flex flex-col lg:w-[22rem] 2xl:w-[26rem]">
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
