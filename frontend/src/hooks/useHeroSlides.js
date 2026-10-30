import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import defaultSlides from "../content/heroSlides";

const CACHE_KEY = "ims-hero-slides";

/* Today's date as YYYY-MM-DD in the visitor's timezone */
const today = () => new Date().toLocaleDateString("en-CA");

const live = (slides) => {
  const d = today();
  return slides.filter((s) => (!s.starts_on || s.starts_on <= d) && (!s.ends_on || s.ends_on >= d));
};

// Last slides seen by this browser, so returning visitors don't see the defaults flash first
const readCache = () => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    return Array.isArray(cached) && live(cached).length ? live(cached) : null;
  } catch {
    return null;
  }
};

/*
 * Active hero slides from the database, filtered by their optional
 * starts_on / ends_on dates. Falls back to the built-in defaults when the
 * table is empty or unreachable, so the hero is never blank.
 */
export function useHeroSlides() {
  const [slides, setSlides] = useState(() => readCache() || defaultSlides);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data, error }) => {
        if (cancelled || error) return;
        const current = live(data || []);
        setSlides(current.length ? current : defaultSlides);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(data || []));
        } catch {
          /* storage unavailable: fine, we just refetch next time */
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return slides;
}
