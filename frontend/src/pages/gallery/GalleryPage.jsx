import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiX, PiCaretLeft, PiCaretRight } from "react-icons/pi";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import media from "../../content/media";
import { api } from "../../lib/api";
import PageHero from "../../ui/PageHero";
import Img from "../../ui/Img";

/* Albums: media groups, plus a few slug patterns for photos filed under "events" */
const isScienceFair = (p) => ["science-fair-2023-jan", "science-fair-2023-nov", "science-activities"].includes(p.group) || p.name.startsWith("science-exhibition-");
const libraryAlbums = [
  { key: "naest", label: "NAEST 2025 · Kanpur", test: (p) => p.group === "naest-2025" },
  { key: "science", label: "Science Fairs", test: isScienceFair },
  { key: "camp", label: "Summer Camp 2025", test: (p) => p.group === "summer-camp-2025" },
  { key: "competitions", label: "Competitions & Speeches", test: (p) => ["competitions", "public-speaking"].includes(p.group) || p.name.startsWith("student-speech-") },
  { key: "events", label: "Events & Guests", test: (p) => p.group === "events" && !isScienceFair(p) && !p.name.startsWith("student-speech-") },
  { key: "visits", label: "Educational Visits", test: (p) => p.group === "amu-visit-2025" },
  { key: "classrooms", label: "Classrooms & Robotics", test: (p) => ["academics", "classroom", "robotics"].includes(p.group) },
  { key: "labs", label: "Laboratories", test: (p) => ["science-lab", "physics-lab", "chemistry-lab", "computer-lab"].includes(p.group) },
  { key: "library", label: "Library", test: (p) => p.group === "library" },
  { key: "campus", label: "Campus & Sports", test: (p) => ["campus", "sports"].includes(p.group) },
  { key: "news", label: "In the News", test: (p) => p.group === "in-the-news" },
];

const PAGE = 24;

// Small 423px crops of rooms the old website photographed in higher resolution
const LOW_RES_DUPLICATE = /^(computer-lab-old-\d|library-\d|science-lab-\d|sports-ground-\d|assembly-flag)$/;

// Every photo is { key, src, srcSet?, alt, name? } — `name` marks a library photo
const photos = Object.entries(media)
  .filter(([name, m]) => m.group !== "toppers" && !LOW_RES_DUPLICATE.test(name))
  .map(([name, m]) => ({ key: name, name, ...m }));

const fmtDate = (d) => (d ? new Date(`${String(d).slice(0, 10)}T00:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "");

/* Albums added in Admin → Gallery (newest events first), followed by the photo library */
const useAlbums = () => {
  const [uploaded, setUploaded] = useState([]);
  useEffect(() => {
    api.get("/public/gallery").then(setUploaded).catch(() => {});
  }, []);
  return useMemo(() => {
    const fromAdmin = uploaded.map((a) => ({
      key: `album-${a.id}`,
      label: a.title,
      description: a.description,
      date: a.event_date,
      items: a.photos.map((p) => ({ key: `photo-${p.id}`, src: p.url, alt: p.caption || a.title })),
    }));
    const library = libraryAlbums.map((a) => ({ key: a.key, label: a.label, items: photos.filter(a.test) }));
    const all = { key: "all", label: "All Photos", items: [...fromAdmin.flatMap((a) => a.items), ...photos] };
    return [all, ...fromAdmin, ...library].filter((a) => a.items.length);
  }, [uploaded]);
};

const Lightbox = ({ items, index, onClose, onMove }) => {
  const item = items[index];
  const touchX = useRef(null);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col bg-navy-900/95 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onMove(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-ivory-100">
        <p className="text-sm">{index + 1} / {items.length}</p>
        <button onClick={onClose} className="rounded-full p-2 text-3xl hover:bg-ivory-50/10" aria-label="Close viewer"><PiX /></button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-20">
        <AnimatePresence mode="wait">
          <motion.img
            key={item.key}
            src={item.src}
            srcSet={item.srcSet}
            sizes="100vw"
            alt={item.alt}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="max-h-[78vh] max-w-full rounded-xl object-contain shadow-lift"
          />
        </AnimatePresence>
        <button onClick={() => onMove(-1)} className="absolute left-2 rounded-full bg-ivory-50/10 p-3 text-2xl text-ivory-50 hover:bg-ivory-50/20 md:left-6" aria-label="Previous photo"><PiCaretLeft /></button>
        <button onClick={() => onMove(1)} className="absolute right-2 rounded-full bg-ivory-50/10 p-3 text-2xl text-ivory-50 hover:bg-ivory-50/20 md:right-6" aria-label="Next photo"><PiCaretRight /></button>
      </div>
      <p className="px-6 pb-6 text-center text-sm text-ivory-100/80">{item.alt}</p>
    </motion.div>
  );
};

const GalleryPage = () => {
  const [album, setAlbum] = useState("all");
  const [open, setOpen] = useState(null);
  const [shown, setShown] = useState(PAGE);

  const albums = useAlbums();
  const current = albums.find((a) => a.key === album) || albums[0];
  const items = current.items;
  const choose = (key) => {
    setAlbum(key);
    setShown(PAGE);
  };

  const move = useCallback((step) => setOpen((i) => (i + step + items.length) % items.length), [items.length]);
  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <SEOHelmet />
      <PageHero
        eyebrow="Life at IMS"
        title="Gallery"
        lede="Science fairs, competitions, camps, visits and everyday life — over 400 moments from Islamic Mission School."
        crumbs={[{ label: "Student Life", to: "/co-curricular-extracurricular" }, { label: "Gallery" }]}
        image="robotics-lab-1"
      />

      <section className="bg-ivory-50 py-16 md:py-20">
        <div className="mx-auto max-w-site px-4 md:px-8">
          <div role="tablist" aria-label="Albums" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
            {albums.map((a) => {
              const count = a.items.length;
              const selected = current.key === a.key;
              return (
                <button
                  key={a.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => choose(a.key)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                    selected ? "border-emerald-700 bg-emerald-700 text-ivory-50" : "border-emerald-700/20 text-ink/70 hover:border-emerald-700/60"
                  }`}
                >
                  {a.label} <span className={selected ? "text-gold-300" : "text-ink/40"}>{count}</span>
                </button>
              );
            })}
          </div>

          {(current.description || current.date) && (
            <div className="mt-8 max-w-3xl">
              {current.date && <p className="text-xs font-bold uppercase tracking-eyebrow text-gold-600">{fmtDate(current.date)}</p>}
              {current.description && <p className="mt-2 leading-relaxed text-ink/70">{current.description}</p>}
            </div>
          )}

          <motion.div layout className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4">
            {items.slice(0, shown).map((p, i) => (
              <motion.button
                layout
                key={p.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setOpen(i)}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl"
                aria-label={`Open photo: ${p.alt}`}
              >
                {p.name ? (
                  <Img name={p.name} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <img src={p.src} alt="" loading="lazy" decoding="async" className="w-full bg-emerald-50 transition-transform duration-700 group-hover:scale-105" />
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              </motion.button>
            ))}
          </motion.div>
          {shown < items.length && (
            <div className="mt-10 text-center">
              <button onClick={() => setShown((n) => n + PAGE)} className="rounded-full border border-emerald-700 px-8 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-700 hover:text-ivory-50">
                Load more photos <span className="text-ink/50">({items.length - shown} more)</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} onClose={close} onMove={move} />}</AnimatePresence>
    </>
  );
};

export default GalleryPage;
