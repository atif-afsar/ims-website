import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { PiBellSimple, PiX, PiArrowUpRight, PiCalendarBlank } from "react-icons/pi";
import { HiArrowRight } from "react-icons/hi2";
import { api } from "../lib/api";
import media from "../content/media";
import { presetEvents2026To2027 } from "../content/calendarPresets";
import { Sparkle } from "../ui/Ornaments";

const EASE = [0.22, 1, 0.36, 1];
const today = () => new Date().toLocaleDateString("en-CA");
const inDate = (r) => (!r.starts_on || r.starts_on <= today()) && (!r.ends_on || r.ends_on >= today());
const SEEN_KEY = "ims-news-seen";

const imgSrc = (url) => (url?.startsWith("media:") ? media[url.slice(6)]?.src : url);
const fmt = (d, opts) => (d ? new Date(`${String(d).slice(0, 10)}T00:00:00`).toLocaleDateString("en-IN", opts) : "");
const isExternal = (to) => /^(https?:|mailto:|tel:)/.test(to || "") || /\.pdf$/i.test(to || "");

const SmartLink = ({ to, className, children, onClick }) =>
  isExternal(to) ? (
    <a href={to} target="_blank" rel="noreferrer" className={className}>{children}</a>
  ) : (
    <Link to={to} className={className} onClick={onClick}>{children}</Link>
  );

/*
 * "News & Events" side panel opened from the bell tab on the left edge
 * (replaces the old popup — nothing opens by itself). Shows announcements
 * from Admin → Announcements, notices, and upcoming calendar events.
 */
const NewsPanel = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("news");
  const [data, setData] = useState({ announcements: [], notices: [], events: [] });
  const [unseen, setUnseen] = useState(false);
  const closeRef = useRef(null);
  const newestRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      api.get("/public/site_popups").catch(() => []),
      api.get("/public/notices").catch(() => []),
      api.get("/public/calendar_events").catch(() => null),
    ]).then(([popups, notices, events]) => {
      if (cancelled) return;
      const announcements = popups.filter(inDate);
      const upcoming = (events?.length ? events : presetEvents2026To2027).filter((e) => e.event_date >= today()).slice(0, 8);
      setData({ announcements, notices, events: upcoming });
      // A dot on the bell until the visitor has seen the newest item
      const newest = [...announcements, ...notices].map((r) => `${r.id}-${r.created_at || ""}`).sort().pop();
      newestRef.current = newest;
      try {
        setUnseen(Boolean(newest) && localStorage.getItem(SEEN_KEY) !== newest);
      } catch {
        setUnseen(Boolean(newest));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    setUnseen(false);
    try {
      if (newestRef.current) localStorage.setItem(SEEN_KEY, newestRef.current);
    } catch {
      /* storage blocked: the dot just shows again next visit */
    }
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);
  const hasNews = data.announcements.length + data.notices.length > 0;

  return (
    <>
      {/* Bell tab on the left edge */}
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: EASE }}
        className="group fixed left-0 top-1/2 z-40 flex -translate-y-1/2 items-center gap-2 rounded-r-2xl bg-emerald-700 py-3 pl-3 pr-3 text-gold-300 shadow-lift transition-all hover:bg-emerald-600 hover:pr-4"
        aria-label="Open news and events"
      >
        <PiBellSimple className={`text-2xl ${unseen ? "origin-top animate-bell-ring" : ""}`} aria-hidden="true" />
        {unseen && <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-gold-400 ring-2 ring-emerald-700" aria-hidden="true" />}
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-[0.16em] text-ivory-50 transition-all duration-300 group-hover:max-w-[10rem] md:inline">News</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[75]">
            <motion.div className="absolute inset-0 bg-navy-900/60 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="News and events"
              className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-ivory-50 shadow-lift"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="flex items-center justify-between bg-emerald-800 px-6 py-5 text-ivory-50">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-eyebrow text-gold-300">Stay updated</p>
                  <h2 className="font-display text-2xl font-bold">News &amp; Events</h2>
                </div>
                <button ref={closeRef} onClick={close} className="grid h-11 w-11 place-items-center rounded-full bg-ivory-50 text-xl text-emerald-900 transition hover:bg-gold-300" aria-label="Close news and events">
                  <PiX />
                </button>
              </div>

              <div role="tablist" className="flex border-b border-emerald-900/10 px-6">
                {[
                  ["news", "News stories"],
                  ["events", "Upcoming events"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={tab === key}
                    onClick={() => setTab(key)}
                    className={`relative py-4 pr-6 text-sm font-bold uppercase tracking-[0.12em] transition-colors ${tab === key ? "text-emerald-800" : "text-ink/45 hover:text-ink/70"}`}
                  >
                    {label}
                    {tab === key && <motion.span layoutId="news-tab" className="absolute bottom-0 left-0 right-6 h-0.5 bg-gold-500" />}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <AnimatePresence mode="wait">
                  <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    {tab === "news" ? (
                      <>
                        {data.announcements.map((a) => (
                          <article key={`a-${a.id}`} className="mb-6 overflow-hidden rounded-2xl bg-emerald-700 text-ivory-50 shadow-card">
                            {imgSrc(a.image_url) && <img src={imgSrc(a.image_url)} alt="" className="max-h-64 w-full bg-emerald-900 object-contain" />}
                            <div className="p-5">
                              {a.eyebrow && <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-eyebrow text-gold-300"><Sparkle className="h-3 w-3" /> {a.eyebrow}</p>}
                              <h3 className="mt-1.5 font-display text-xl font-bold leading-snug">{a.title}</h3>
                              {a.message && <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ivory-100/85">{a.message}</p>}
                              {a.cta_text && a.cta_link && (
                                <SmartLink to={a.cta_link} onClick={close} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-gold-300">
                                  {a.cta_text} <HiArrowRight aria-hidden="true" />
                                </SmartLink>
                              )}
                            </div>
                          </article>
                        ))}
                        <ul className="divide-y divide-emerald-900/10">
                          {data.notices.map((n) => {
                            const body = (
                              <>
                                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">{fmt(n.date || n.created_at, { day: "numeric", month: "short", year: "numeric" })}</span>
                                <span className="mt-1 flex items-start justify-between gap-3 font-semibold leading-snug text-ink group-hover:text-emerald-700">
                                  {n.title}
                                  {n.link && <PiArrowUpRight className="mt-0.5 shrink-0 text-gold-600" aria-hidden="true" />}
                                </span>
                              </>
                            );
                            return (
                              <li key={`n-${n.id}`}>
                                {n.link ? <SmartLink to={n.link} onClick={close} className="group flex flex-col py-4">{body}</SmartLink> : <div className="flex flex-col py-4">{body}</div>}
                              </li>
                            );
                          })}
                        </ul>
                        {!hasNews && <p className="py-10 text-center text-ink/55">No news right now. Please check back soon.</p>}
                      </>
                    ) : (
                      <>
                        <ul className="space-y-3">
                          {data.events.map((e) => (
                            <li key={`${e.id}-${e.event_date}`} className="flex gap-4 rounded-2xl bg-ivory-100 p-4">
                              <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-700 text-ivory-50">
                                <span className="font-display text-xl font-bold leading-none">{fmt(e.event_date, { day: "numeric" })}</span>
                                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-300">{fmt(e.event_date, { month: "short" })}</span>
                              </span>
                              <span className="min-w-0 self-center">
                                <span className="block font-semibold leading-snug text-ink">{e.title}</span>
                                {e.description && <span className="mt-0.5 line-clamp-2 block text-sm text-ink/60">{e.description}</span>}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {!data.events.length && <p className="py-10 text-center text-ink/55">No upcoming events listed.</p>}
                        <Link to="/calendar" onClick={close} className="mt-6 flex items-center justify-center gap-2 rounded-full border border-emerald-700/30 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-700 hover:text-ivory-50">
                          <PiCalendarBlank aria-hidden="true" /> View full calendar
                        </Link>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsPanel;
