import React, { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCalendarCheck, FaStar } from "react-icons/fa";
import { supabase } from "../../supabaseClient";
import "./calendar.css";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDateKey, setSelectedDateKey] = useState("");
  const [popupDateKey, setPopupDateKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("calendar_events")
          .select("*")
          .eq("is_active", true)
          .order("event_date", { ascending: true });

        if (fetchError) throw fetchError;
        setEvents(data || []);
      } catch (err) {
        const missingTable =
          err.message &&
          err.message.toLowerCase().includes("could not find the table");
        setError(
          missingTable
            ? "Calendar data table is not created yet. Ask admin to run 'calendar_events.sql' in Supabase SQL Editor."
            : `Unable to load calendar events. ${err.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, eventItem) => {
      if (!eventItem.event_date) return acc;
      const key = eventItem.event_date;
      if (!acc[key]) acc[key] = [];
      acc[key].push(eventItem);
      return acc;
    }, {});
  }, [events]);

  const monthLabel = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDayIndex = monthStart.getDay();
  const totalDays = monthEnd.getDate();

  const calendarCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < startDayIndex; i += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= totalDays; day += 1) {
      cells.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
    return cells;
  }, [currentDate, startDayIndex, totalDays]);

  const selectedEvents = selectedDateKey ? eventsByDate[selectedDateKey] || [] : [];
  const popupEvents = popupDateKey ? eventsByDate[popupDateKey] || [] : [];
  const eventCountInMonth = useMemo(() => {
    return events.filter((eventItem) => {
      if (!eventItem.event_date) return false;
      const date = new Date(eventItem.event_date);
      return (
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
      );
    }).length;
  }, [currentDate, events]);
  const holidayCountInMonth = useMemo(() => {
    return events.filter((eventItem) => {
      if (!eventItem.event_date) return false;
      const date = new Date(eventItem.event_date);
      return (
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear() &&
        eventItem.event_type === "holiday"
      );
    }).length;
  }, [currentDate, events]);

  return (
    <section className="public-calendar-page">
      <div className="container">
        <div className="public-calendar-head">
          <div className="calendar-title-wrap">
            <span className="calendar-kicker">Academic Planner</span>
            <h1>School Calendar</h1>
            <p>
              Updated by admin with accurate weekday alignment, monthly navigation, and date-wise events.
            </p>
          </div>
          <div className="calendar-stat-pills">
            <span>
              <FaCalendarCheck /> {eventCountInMonth} events
            </span>
            <span>
              <FaStar /> {holidayCountInMonth} holidays
            </span>
          </div>
        </div>

        <div className="calendar-layout">
          <div className="public-calendar-card">
            <div className="calendar-toolbar">
              <button
                type="button"
                onClick={() =>
                  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
                }
                aria-label="Previous month"
              >
                <FaChevronLeft />
              </button>
              <h2>{monthLabel}</h2>
              <button
                type="button"
                onClick={() =>
                  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
                }
                aria-label="Next month"
              >
                <FaChevronRight />
              </button>
            </div>

            <div className="calendar-meta-row">
              <span>{eventCountInMonth} active events this month</span>
              <div className="calendar-meta-actions">
                <select
                  value={currentMonth}
                  onChange={(e) =>
                    setCurrentDate(new Date(currentYear, Number(e.target.value), 1))
                  }
                  aria-label="Select month"
                >
                  {Array.from({ length: 12 }).map((_, monthIndex) => (
                    <option value={monthIndex} key={monthIndex}>
                      {new Date(2000, monthIndex, 1).toLocaleString("default", { month: "long" })}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="calendar-today-btn"
                  onClick={() => {
                    const today = new Date();
                    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
                    setSelectedDateKey(toDateKey(today));
                  }}
                >
                  Today
                </button>
              </div>
            </div>

            <div className="calendar-grid">
              {weekDays.map((day) => (
                <div key={day} className="calendar-weekday">
                  {day}
                </div>
              ))}

              {calendarCells.map((dateValue, index) => {
                if (!dateValue) {
                  return <div key={`blank-${index}`} className="calendar-day empty" />;
                }

                const dateKey = toDateKey(dateValue);
                const dayEvents = eventsByDate[dateKey] || [];
                const isToday = toDateKey(new Date()) === dateKey;
                const isSelected = selectedDateKey === dateKey;
                const hasHoliday = dayEvents.some((eventItem) => eventItem.event_type === "holiday");

                return (
                  <button
                    key={dateKey}
                    type="button"
                    className={`calendar-day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${hasHoliday ? "holiday" : ""}`}
                    onClick={() => setSelectedDateKey(dateKey)}
                  >
                    <span className="day-number">{dateValue.getDate()}</span>
                    {dayEvents.length > 0 && (
                      <button
                        type="button"
                        className="day-dots"
                        aria-label={`View ${dayEvents.length} events on ${new Date(dateKey).toLocaleDateString()}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedDateKey(dateKey);
                          setPopupDateKey(dateKey);
                        }}
                      >
                        {dayEvents.slice(0, 3).map((eventItem) => (
                          <span
                            key={eventItem.id}
                            className="dot"
                            style={{ backgroundColor: eventItem.color || "#1eb2a6" }}
                          />
                        ))}
                      </button>
                    )}
                    {dayEvents.length > 3 && <span className="day-more">+{dayEvents.length - 3}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="calendar-events-panel">
            <h3>
              {selectedDateKey
                ? `Events on ${new Date(selectedDateKey).toLocaleDateString()}`
                : "Select a date to view events"}
            </h3>

            {loading && <p>Loading events...</p>}
            {error && <p className="calendar-error">{error}</p>}
            {!loading && !error && selectedDateKey && selectedEvents.length === 0 && (
              <p className="calendar-empty-msg">No events added for this date.</p>
            )}
            {!loading && !error && !selectedDateKey && (
              <p className="calendar-empty-msg">Choose a date from the calendar grid to preview events.</p>
            )}

            {!loading &&
              !error &&
              selectedEvents.map((eventItem) => (
                <article key={eventItem.id} className="event-item">
                  <div className="event-item-top">
                    <strong>{eventItem.title}</strong>
                    <span
                      className="event-type"
                      style={{
                        backgroundColor: `${eventItem.color || "#1eb2a6"}22`,
                        borderColor: eventItem.color || "#1eb2a6",
                      }}
                    >
                      {eventItem.event_type || "general"}
                    </span>
                  </div>
                  {eventItem.description && <p>{eventItem.description}</p>}
                </article>
              ))}
          </div>
        </div>
      </div>

      {popupDateKey && (
        <div className="calendar-popup-overlay" onClick={() => setPopupDateKey("")}>
          <div
            className="calendar-popup"
            role="dialog"
            aria-modal="true"
            aria-label="Events popup"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="calendar-popup-head">
              <h4>Events on {new Date(popupDateKey).toLocaleDateString()}</h4>
              <button type="button" onClick={() => setPopupDateKey("")} aria-label="Close popup">
                ×
              </button>
            </div>

            <div className="calendar-popup-body">
              {popupEvents.map((eventItem) => (
                <article key={eventItem.id} className="event-item">
                  <div className="event-item-top">
                    <strong>{eventItem.title}</strong>
                    <span
                      className="event-type"
                      style={{
                        backgroundColor: `${eventItem.color || "#1eb2a6"}22`,
                        borderColor: eventItem.color || "#1eb2a6",
                      }}
                    >
                      {eventItem.event_type || "general"}
                    </span>
                  </div>
                  {eventItem.description && <p>{eventItem.description}</p>}
                </article>
              ))}
              {popupEvents.length === 0 && <p className="calendar-empty-msg">No events found.</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Calendar;
