import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { resolveHomeSections } from "../content/homeSections";
import { presetEvents2026To2027 } from "../content/calendarPresets";

const today = () => new Date().toLocaleDateString("en-CA");

const fallback = () => ({
  sections: resolveHomeSections(),
  heroSlides: null, // Hero falls back to its own source
  notices: [],
  testimonials: [],
  upcomingEvents: presetEvents2026To2027.filter((e) => e.event_date >= today()).slice(0, 8),
  live: false,
});

/*
 * Homepage content from the backend (GET /api/public/home), resolved against
 * the built-in section registry. Until the backend answers — or if it is
 * offline — the page renders the defaults, so it never breaks.
 */
export function useHomeContent() {
  const [data, setData] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/public/home")
      .then((res) => {
        if (cancelled) return;
        setData({
          sections: resolveHomeSections(res.sections),
          heroSlides: res.heroSlides?.length ? res.heroSlides : null,
          notices: res.notices || [],
          testimonials: res.testimonials || [],
          upcomingEvents: res.upcomingEvents?.length ? res.upcomingEvents : fallback().upcomingEvents,
          live: true,
        });
      })
      .catch(() => {
        /* backend offline: keep the defaults */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
