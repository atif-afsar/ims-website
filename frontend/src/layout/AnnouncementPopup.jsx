import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { PiX } from "react-icons/pi";
import { supabase } from "../supabaseClient";
import Button from "../ui/Button";
import { PatternBg, Sparkle } from "../ui/Ornaments";

const today = () => new Date().toLocaleDateString("en-CA");
const seenKey = (popup) => `ims-popup-${popup.id}`;

// A dismissed popup stays hidden for this browser session only
const wasSeen = (popup) => {
  try {
    return sessionStorage.getItem(seenKey(popup)) === "1";
  } catch {
    return false;
  }
};
const markSeen = (popup) => {
  try {
    sessionStorage.setItem(seenKey(popup), "1");
  } catch {
    /* storage blocked: the popup may show again, which is harmless */
  }
};

/*
 * Announcement popup managed in Admin → Popup. Shows the newest active popup
 * within its date range, once per session, after a short delay.
 */
const AnnouncementPopup = () => {
  const { pathname } = useLocation();
  const [popup, setPopup] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_popups")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const d = today();
        const current = data.find((p) => (!p.starts_on || p.starts_on <= d) && (!p.ends_on || p.ends_on >= d));
        if (current && !wasSeen(current)) setPopup(current);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!popup || open || wasSeen(popup)) return;
    if (popup.show_on !== "all" && pathname !== "/") return;
    const timer = setTimeout(() => setOpen(true), Math.max(0, popup.delay_seconds ?? 3) * 1000);
    return () => clearTimeout(timer);
  }, [popup, pathname, open]);

  const close = () => {
    markSeen(popup);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <AnimatePresence>
      {open && popup && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-navy-900/70 p-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-ivory-50 shadow-lift"
          >
            <button onClick={close} className="absolute right-3 top-3 z-10 rounded-full bg-ivory-50/90 p-2 text-2xl text-emerald-800 shadow-card hover:bg-ivory-50" aria-label="Close announcement">
              <PiX />
            </button>
            {popup.image_url ? (
              <img src={popup.image_url} alt="" className="max-h-[50vh] w-full bg-emerald-800 object-contain" />
            ) : (
              <div className="relative h-24 bg-emerald-700">
                <PatternBg opacity={0.12} />
              </div>
            )}
            <div className="border-t-4 border-gold-400 p-7 md:p-8">
              {popup.eyebrow && (
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-600"><Sparkle className="h-3 w-3" /> {popup.eyebrow}</p>
              )}
              <h2 id="popup-title" className="mt-2 font-display text-3xl font-bold leading-tight text-ink">{popup.title}</h2>
              {popup.message && <p className="mt-3 whitespace-pre-line leading-relaxed text-ink/70">{popup.message}</p>}
              <div className="mt-6 flex flex-wrap gap-3">
                {popup.cta_text && popup.cta_link && (
                  <Button to={popup.cta_link} variant="emerald" onClick={close}>{popup.cta_text}</Button>
                )}
                <button onClick={close} className="rounded-full px-5 py-3 text-sm font-semibold text-ink/60 hover:text-ink">Maybe later</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementPopup;
