import { Link } from "react-router";
import { PiMegaphone, PiArrowUpRight, PiCalendarBlank } from "react-icons/pi";
import Reveal from "../../ui/Reveal";
import SectionHeading from "../../ui/SectionHeading";
import { ArrowLink } from "../../ui/Button";

const TYPE_LABEL = { holiday: "Holiday", exam: "Exam", activity: "Activity", announcement: "Announcement", general: "Event" };

const parse = (k) => {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const NoticeItem = ({ notice }) => {
  const body = (
    <>
      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400 text-emerald-900"><PiMegaphone aria-hidden="true" /></span>
      <span className="flex-1 font-medium leading-snug text-ink group-hover:text-emerald-700">{notice.title}</span>
      {notice.link && <PiArrowUpRight className="mt-1 shrink-0 text-lg text-emerald-700" aria-hidden="true" />}
    </>
  );
  const cls = "group flex gap-4 border-b border-gold-500/25 py-4";
  return (
    <li>
      {notice.link ? (
        <a href={notice.link} target={notice.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>{body}</a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
};

/* Latest notices (Admin → Notices) beside the next calendar events (Admin → Calendar) */
const NewsEvents = ({ content, notices = [], events = [] }) => {
  if (!notices.length && !events.length) return null;
  return (
    <section className="bg-ivory-100 py-24 md:py-32">
      <div className="mx-auto max-w-site px-4 md:px-8">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} />
        </Reveal>
        <div className={`mt-14 grid gap-6 ${notices.length && events.length ? "lg:grid-cols-2" : ""}`}>
          {notices.length > 0 && (
            <Reveal className="rounded-3xl bg-ivory-50 p-7 shadow-card md:p-10">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-emerald-700"><PiMegaphone aria-hidden="true" /> Latest Notices</h3>
              <ul className="mt-4">{notices.slice(0, 5).map((n) => <NoticeItem key={n.id ?? n.title} notice={n} />)}</ul>
            </Reveal>
          )}

          {events.length > 0 && (
            <Reveal delay={0.1} className="rounded-3xl bg-emerald-800 p-7 text-ivory-50 md:p-10">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-eyebrow text-gold-300"><PiCalendarBlank aria-hidden="true" /> Upcoming Events</h3>
              <ul className={`mt-6 grid gap-3 ${notices.length ? "" : "md:grid-cols-2"}`}>
                {events.slice(0, notices.length ? 5 : 6).map((e) => {
                  const d = parse(e.event_date);
                  return (
                    <li key={(e.id ?? "") + e.event_date + e.title} className="flex items-center gap-4 rounded-2xl bg-ivory-50/5 p-3 ring-1 ring-gold-300/20">
                      <span className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-gold-400 py-2 text-emerald-900">
                        <span className="font-display text-2xl font-bold leading-none">{d.getDate()}</span>
                        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]">{d.toLocaleDateString("en-IN", { month: "short" })}</span>
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-snug">{e.title}</span>
                        <span className="text-xs uppercase tracking-[0.14em] text-gold-300">{TYPE_LABEL[e.event_type] || "Event"} · {d.toLocaleDateString("en-IN", { weekday: "long" })}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Link to="/calendar" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-gold-300 hover:text-gold-100">
                Full calendar <PiArrowUpRight aria-hidden="true" />
              </Link>
            </Reveal>
          )}
        </div>
        <div className="mt-10 text-center lg:hidden">
          <ArrowLink to="/calendar">School calendar</ArrowLink>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
