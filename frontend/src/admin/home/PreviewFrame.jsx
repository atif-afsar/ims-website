import { useEffect, useRef, useState } from "react";
import { COMPONENTS } from "../../pages/home/sections";
import { useHomeContent } from "../../hooks/useHomeContent";

/*
 * Runs inside the iframe of the homepage editor (/admin/preview). The editor
 * posts { type: "ims-preview", key, content } whenever the form changes; this
 * page renders that one section exactly as the website would, and reports
 * its height back so the editor can size the frame.
 */
const PreviewFrame = () => {
  const [state, setState] = useState(null);
  const home = useHomeContent();
  const ref = useRef(null);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== window.location.origin || e.data?.type !== "ims-preview") return;
      setState({ key: e.data.key, content: e.data.content });
    };
    window.addEventListener("message", onMessage);
    window.parent?.postMessage({ type: "ims-preview-ready" }, window.location.origin);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Tell the editor how tall the section is
  useEffect(() => {
    if (!ref.current) return;
    const report = () => window.parent?.postMessage({ type: "ims-preview-height", height: ref.current.scrollHeight }, window.location.origin);
    const observer = new ResizeObserver(report);
    observer.observe(ref.current);
    report();
    return () => observer.disconnect();
  }, [state?.key]);

  const extras = {
    hero: { slides: home.heroSlides },
    news_events: { notices: home.notices, events: home.upcomingEvents },
    testimonials: { items: home.testimonials },
  };
  const Section = state && COMPONENTS[state.key];

  return (
    // Links inside the preview don't navigate away
    <div ref={ref} onClickCapture={(e) => e.target.closest("a") && e.preventDefault()}>
      {Section ? <Section content={state.content} {...extras[state.key]} /> : <p className="p-10 text-center text-gray-500">Loading preview…</p>}
    </div>
  );
};

export default PreviewFrame;
