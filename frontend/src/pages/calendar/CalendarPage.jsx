import { useEffect, useMemo, useState } from "react";
import { PiCaretLeft, PiCaretRight, PiCalendarBlank, PiListBullets, PiSquaresFour } from "react-icons/pi";
import SEOHelmet from "../../components/common/SEO/SEOHelmet";
import { siteUrl } from "../../siteMeta";
import { supabase } from "../../supabaseClient";
import { presetEvents2026To2027 } from "../../content/calendarPresets";
import PageHero from "../../ui/PageHero";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* Event types in brand colours (the admin's per-event colour is not used) */
const TYPES = {
  holiday: { label: "Holiday", chip: "bg-gold-400 text-emerald-900", dot: "bg-gold-500" },
  exam: { label: "Exam", chip: "bg-navy-900 text-ivory-50", dot: "bg-navy-900" },
  activity: { label: "Activity", chip: "bg-emerald-700 text-ivory-50", dot: "bg-emerald-700" },
  announcement: { label: "Announcement", chip: "bg-emerald-100 text-emerald-900", dot: "bg-emerald-600/60" },
  general: { label: "General", chip: "bg-ivory-200 text-ink", dot: "bg-ink/40" },
};
const typeOf = (e) => TYPES[e.event_type] || TYPES.general;

const toKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parseKey = (k) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const longDate = (k) => parseKey(k).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

/* Active events from Admin → Calendar; the school's preset calendar until the admin adds any */
const useEvents = () => {
  const [events, setEvents] = useState(presetEvents2026To2027);
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("calendar_events")
      .select("*")
      .eq("is_active", true)
      .order("event_date")
      .then(({ data, error }) => {
        if (!cancelled && !error && data?.length) setEvents(data);
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return events;
};

const EventRow = ({ event, showDate }) => {
  const t = typeOf(event);
  const d = parseKey(event.event_date);
  return (
    <li className="flex gap-4 rounded-2xl border border-gold-500/25 bg-ivory-50 p-4">
      {showDate && (
        <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-emerald-700 py-2 text-ivory-50">
          <span className="font-display text-2xl font-bold leading-none">{d.getDate()}</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-300">{d.toLocaleDateString("en-IN", { month: "short" })}</span>
        </div>
      )}
      <div className="min-w-0">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${t.chip}`}>{t.label}</span>
        <p className="mt-1.5 font-semibold leading-snug text-ink">{event.title}</p>
        {event.description && <p className="mt-1 text-sm text-ink/60">{event.description}</p>}
      </div>
    </li>
  );
};

const CalendarPage = () => {
  const events = useEvents();
  const todayKey = toKey(new Date());
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("month");

  const byDate = useMemo(
    () => events.reduce((acc, e) => ((acc[e.event_date] ||= []).push(e), acc), {}),
    [events]
  );

  const cells = useMemo(() => {
    const first = month.getDay();
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => toKey(new Date(month.getFullYear(), month.getMonth(), i + 1)))];
  }, [month]);

  const monthEvents = useMemo(() => {
    const prefix = toKey(month).slice(0, 7);
    return events.filter((e) => e.event_date.startsWith(prefix));
  }, [events, month]);

  const upcoming = useMemo(() => events.filter((e) => e.event_date >= todayKey).slice(0, 6), [events, todayKey]);

  const shiftMonth = (step) => {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + step, 1));
    setSelected(null);
  };
  const goToday = () => {
    const now = new Date();
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelected(todayKey);
  };

  const monthLabel = month.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const panelEvents = selected ? byDate[selected] || [] : upcoming;

  return (
    <>
      <SEOHelmet
        title="School Calendar | Islamic Mission School"
        description="Islamic Mission School academic calendar: holidays, examinations, activities and announcements for the 2026–27 session."
        canonical={siteUrl("/calendar")}
        ogTitle="School Calendar | Islamic Mission School"
        ogDescription="Holidays, exams, activities and announcements at IMS Aligarh."
        ogUrl={siteUrl("/calendar")}
      />
      <PageHero
        eyebrow="Stay Updated"
        title="School Calendar"
        lede="Holidays, examinations, activities and announcements for the academic session."
        crumbs={[{ label: "Admissions", to: "/classes" }, { label: "Calendar" }]}
      />

      <section className="bg-ivory-100 py-12 md:py-16">
        <div className="mx-auto grid max-w-site gap-6 px-4 md:px-8 lg:grid-cols-[1fr_360px]">
          {/* Calendar */}
          <div className="rounded-3xl bg-ivory-50 p-4 shadow-card md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button onClick={() => shiftMonth(-1)} className="rounded-full border border-emerald-700/25 p-2.5 text-emerald-700 transition hover:bg-emerald-700 hover:text-ivory-50" aria-label="Previous month"><PiCaretLeft /></button>
                <h2 className="min-w-[11rem] text-center font-display text-2xl font-bold text-ink md:text-3xl" aria-live="polite">{monthLabel}</h2>
                <button onClick={() => shiftMonth(1)} className="rounded-full border border-emerald-700/25 p-2.5 text-emerald-700 transition hover:bg-emerald-700 hover:text-ivory-50" aria-label="Next month"><PiCaretRight /></button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={goToday} className="rounded-full border border-emerald-700/25 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">Today</button>
                <div className="flex rounded-full bg-ivory-200 p-1" role="tablist" aria-label="View">
                  {[["month", PiSquaresFour, "Month"], ["list", PiListBullets, "List"]].map(([key, Icon, label]) => (
                    <button key={key} role="tab" aria-selected={view === key} onClick={() => setView(key)} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition ${view === key ? "bg-emerald-700 text-ivory-50" : "text-ink/60"}`}>
                      <Icon aria-hidden="true" /> {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {view === "month" ? (
              <div className="mt-6">
                <div className="grid grid-cols-7 border-b border-gold-500/30 pb-2">
                  {WEEKDAYS.map((d) => <div key={d} className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">{d}</div>)}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1">
                  {cells.map((key, i) => {
                    if (!key) return <div key={`blank-${i}`} />;
                    const dayEvents = byDate[key] || [];
                    const isToday = key === todayKey;
                    const isSelected = key === selected;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelected(isSelected ? null : key)}
                        aria-pressed={isSelected}
                        aria-label={`${longDate(key)}${dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}` : ""}`}
                        className={`flex min-h-[3.5rem] flex-col rounded-xl p-1.5 text-left transition md:min-h-[6.5rem] md:p-2 ${
                          isSelected ? "bg-emerald-50 ring-2 ring-emerald-700" : dayEvents.length ? "bg-ivory-100 hover:bg-emerald-50" : "hover:bg-ivory-100"
                        }`}
                      >
                        <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${isToday ? "bg-gold-400 text-emerald-900" : "text-ink/80"}`}>
                          {Number(key.slice(8))}
                        </span>
                        {/* Phones: dots; larger screens: event chips */}
                        <span className="mt-1 flex flex-wrap gap-1 md:hidden">
                          {dayEvents.slice(0, 3).map((e) => <span key={e.title} className={`h-1.5 w-1.5 rounded-full ${typeOf(e).dot}`} />)}
                        </span>
                        <span className="mt-1 hidden w-full space-y-1 md:block">
                          {dayEvents.slice(0, 2).map((e) => (
                            <span key={e.title} className={`block truncate rounded px-1.5 py-0.5 text-[11px] font-medium ${typeOf(e).chip}`}>{e.title}</span>
                          ))}
                          {dayEvents.length > 2 && <span className="block text-[11px] font-semibold text-emerald-700">+{dayEvents.length - 2} more</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <ul className="mt-6 space-y-3">
                {monthEvents.length ? monthEvents.map((e) => <EventRow key={e.event_date + e.title} event={e} showDate />) : <li className="py-12 text-center text-ink/50">No events in {monthLabel}.</li>}
              </ul>
            )}

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-gold-500/25 pt-5" aria-label="Legend">
              {Object.entries(TYPES).map(([key, t]) => (
                <li key={key} className="flex items-center gap-2 text-sm text-ink/70"><span className={`h-3 w-3 rounded-full ${t.dot}`} /> {t.label}</li>
              ))}
            </ul>
          </div>

          {/* Side panel */}
          <aside className="rounded-3xl bg-emerald-800 p-6 text-ivory-50 md:p-8 lg:self-start lg:sticky lg:top-24">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300">
              <PiCalendarBlank aria-hidden="true" /> {selected ? "Selected day" : "Coming up"}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">{selected ? longDate(selected) : "Upcoming Events"}</h3>
            <ul className="mt-6 space-y-3">
              {panelEvents.length ? (
                panelEvents.map((e) => <EventRow key={e.event_date + e.title} event={e} showDate={!selected} />)
              ) : (
                <li className="rounded-2xl bg-ivory-50/10 p-5 text-ivory-100/80">{selected ? "No events on this day." : "No upcoming events."}</li>
              )}
            </ul>
            {selected && (
              <button onClick={() => setSelected(null)} className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300 hover:text-gold-100">← Back to upcoming</button>
            )}
          </aside>
        </div>
      </section>
    </>
  );
};

export default CalendarPage;
