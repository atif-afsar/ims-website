import { useEffect, useState } from "react";

/*
 * Sticky in-page navigation for long inner pages. Highlights the section
 * currently in view and scrolls to sections without leaving the page.
 *
 *   <SectionNav items={[{ id: "introduction", label: "Introduction" }, ...]} />
 */
const SectionNav = ({ items }) => {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const go = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-gold-500/25 bg-ivory-50/95 backdrop-blur">
      <ul className="mx-auto flex max-w-site gap-1 overflow-x-auto px-4 md:px-8">
        {items.map(({ id, label }, i) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              aria-current={active === id ? "location" : undefined}
              className={`relative flex items-center gap-2 px-4 py-4 text-sm font-semibold transition-colors ${active === id ? "text-emerald-700" : "text-ink/60 hover:text-emerald-700"}`}
            >
              <span className={`font-display text-xs ${active === id ? "text-gold-600" : "text-ink/35"}`}>{String(i + 1).padStart(2, "0")}</span>
              {label}
              <span className={`absolute inset-x-4 bottom-0 h-0.5 rounded bg-gold-500 transition-transform duration-300 ${active === id ? "scale-x-100" : "scale-x-0"}`} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionNav;
