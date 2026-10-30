import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiCaretLeft, PiCaretRight, PiDownloadSimple, PiArrowsOut, PiArrowsIn } from "react-icons/pi";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
import brochure from "../../content/brochure";
import PageHero from "../../ui/PageHero";
import Button from "../../ui/Button";

const { pages, pdf } = brochure;

/* Desktop shows facing pages like a printed booklet: cover alone, then pairs */
const useSpreads = () => {
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => setWide(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return useMemo(() => {
    if (!wide) return pages.map((_, i) => [i]);
    const spreads = [[0]];
    for (let i = 1; i < pages.length; i += 2) spreads.push(i + 1 < pages.length ? [i, i + 1] : [i]);
    return spreads;
  }, [wide]);
};

const PageImage = ({ index, sizes }) => {
  const p = pages[index];
  return (
    <img
      src={p.src}
      srcSet={p.srcSet}
      sizes={sizes}
      width={p.width}
      height={p.height}
      alt={`Brochure page ${index + 1}`}
      className="h-full max-h-[78vh] w-auto bg-white object-contain shadow-lift"
      draggable="false"
    />
  );
};

const BrochurePage = () => {
  const spreads = useSpreads();
  const [spread, setSpread] = useState(0);
  const [direction, setDirection] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const stageRef = useRef(null);
  const touchX = useRef(null);
  const thumbsRef = useRef(null);

  // Keep the same page in view when switching between single and spread layouts
  const firstPage = useRef(0);
  useEffect(() => {
    const target = spreads.findIndex((s) => s.includes(firstPage.current));
    setSpread(target === -1 ? 0 : target);
  }, [spreads]);

  const current = spreads[Math.min(spread, spreads.length - 1)];
  useEffect(() => {
    firstPage.current = current[0];
  }, [current]);

  const go = useCallback(
    (step) => {
      setDirection(step);
      setSpread((s) => Math.max(0, Math.min(spreads.length - 1, s + step)));
    },
    [spreads.length]
  );
  const goToPage = (pageIndex) => {
    const target = spreads.findIndex((s) => s.includes(pageIndex));
    setDirection(target > spread ? 1 : -1);
    setSpread(target);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Preload the neighbouring spreads
  useEffect(() => {
    [spread - 1, spread + 1].forEach((s) => spreads[s]?.forEach((i) => (new Image().src = pages[i].src)));
  }, [spread, spreads]);

  // Keep the active thumbnail visible
  useEffect(() => {
    thumbsRef.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [spread]);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else stageRef.current?.requestFullscreen?.();
  };

  const label = current.length === 2 ? `Pages ${current[0] + 1}–${current[1] + 1}` : `Page ${current[0] + 1}`;

  return (
    <>
      <SEOHelmet
        title="Digital Brochure | Islamic Mission School"
        description="Browse the Islamic Mission School digital brochure — our vision, curriculum, facilities and student life — or download it as a PDF."
        canonical={siteUrl("/brochure")}
        ogTitle="Digital Brochure | Islamic Mission School"
        ogDescription="Discover IMS in our digital brochure."
        ogImage={siteUrl(pages[0].src)}
        ogUrl={siteUrl("/brochure")}
      />
      <PageHero
        eyebrow="Admissions"
        title="Digital Brochure"
        lede="Turn the pages to discover our vision, curriculum, facilities and student life — or download a copy to share."
        crumbs={[{ label: "Admissions", to: "/classes" }, { label: "Brochure" }]}
        actions={<Button to={pdf} download arrow={false}><PiDownloadSimple /> Download PDF ({pages.length} pages)</Button>}
      />

      <section className="bg-ivory-100 py-10 md:py-14">
        <div
          ref={stageRef}
          className={`relative mx-auto flex max-w-site flex-col px-4 md:px-8 ${fullscreen ? "h-screen max-w-none justify-center bg-navy-900" : ""}`}
        >
          {/* Toolbar */}
          <div className={`mb-6 flex items-center justify-between gap-4 ${fullscreen ? "text-ivory-50" : "text-ink"}`}>
            <p className="font-display text-lg font-semibold" aria-live="polite">
              {label} <span className="opacity-50">of {pages.length}</span>
            </p>
            <div className="flex gap-2">
              <a href={pdf} download className={`rounded-full border p-2.5 transition ${fullscreen ? "border-ivory-50/40 hover:bg-ivory-50/10" : "border-emerald-700/30 hover:bg-emerald-700 hover:text-ivory-50"}`} aria-label="Download PDF"><PiDownloadSimple /></a>
              <button onClick={toggleFullscreen} className={`rounded-full border p-2.5 transition ${fullscreen ? "border-ivory-50/40 hover:bg-ivory-50/10" : "border-emerald-700/30 hover:bg-emerald-700 hover:text-ivory-50"}`} aria-label={fullscreen ? "Exit full screen" : "Full screen"}>
                {fullscreen ? <PiArrowsIn /> : <PiArrowsOut />}
              </button>
            </div>
          </div>

          {/* Stage */}
          <div
            className="relative flex min-h-[60vh] items-center justify-center overflow-hidden"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={current.join("-")}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center"
              >
                {current.map((i, n) => (
                  <div key={i} className="relative">
                    <PageImage index={i} sizes={current.length === 2 ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"} />
                    {/* Soft spine shadow between facing pages */}
                    {current.length === 2 && (
                      <span className={`pointer-events-none absolute inset-y-0 w-10 ${n === 0 ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-black/15 to-transparent`} aria-hidden="true" />
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <button onClick={() => go(-1)} disabled={spread === 0} className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-emerald-700 p-3 text-2xl text-ivory-50 shadow-lift transition hover:bg-emerald-600 disabled:opacity-0 md:p-4" aria-label="Previous page">
              <PiCaretLeft />
            </button>
            <button onClick={() => go(1)} disabled={spread === spreads.length - 1} className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-emerald-700 p-3 text-2xl text-ivory-50 shadow-lift transition hover:bg-emerald-600 disabled:opacity-0 md:p-4" aria-label="Next page">
              <PiCaretRight />
            </button>
          </div>

          {/* Thumbnails */}
          <div ref={thumbsRef} className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Brochure pages">
            {pages.map((p, i) => {
              const active = current.includes(i);
              return (
                <button
                  key={p.src}
                  onClick={() => goToPage(i)}
                  aria-current={active}
                  aria-label={`Go to page ${i + 1}`}
                  className={`shrink-0 overflow-hidden rounded-md ring-2 transition ${active ? "ring-gold-400" : "opacity-60 ring-transparent hover:opacity-100"}`}
                >
                  <img src={p.src.replace("-1200.webp", "-240.webp")} alt="" loading="lazy" className="h-20 w-auto md:h-24" />
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default BrochurePage;
