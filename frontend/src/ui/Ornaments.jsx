/*
 * Decorative motifs from the IMS admission poster: gold rule with a diamond,
 * eight-point Islamic star, sparkle, and a faint geometric background pattern.
 * All are aria-hidden.
 */

export const GoldDivider = ({ className = "", tone = "gold" }) => {
  const line = tone === "light" ? "bg-gold-300/60" : "bg-gold-500";
  const gem = tone === "light" ? "bg-gold-300" : "bg-gold-500";
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px w-12 ${line}`} />
      <span className={`h-2 w-2 rotate-45 ${gem}`} />
      <span className={`h-px w-12 ${line}`} />
    </div>
  );
};

/* Eight-point star (two overlapping squares) */
export const Star8 = ({ className = "", strokeWidth = 1.5 }) => (
  <svg aria-hidden="true" viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
    <rect x="20" y="20" width="60" height="60" />
    <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
    <circle cx="50" cy="50" r="14" />
  </svg>
);

export const Sparkle = ({ className = "" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" />
  </svg>
);

/* Points of a filled eight-point star (viewBox 0 0 200 200) */
const STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 ? 62 : 98;
  const a = (Math.PI / 8) * i - Math.PI / 2;
  return `${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

/*
 * Large filled geometric shapes for colour blocks (hero tiles, menu):
 * "arches" two pointed arches, "star" an eight-point star, "petals" four
 * quarter-circles, "dome" a dome over a crescent-like circle.
 */
export const BlockShape = ({ variant = "arches", className = "" }) => (
  <svg aria-hidden="true" viewBox="0 0 200 200" className={className} fill="currentColor">
    {variant === "arches" && (
      <>
        <path d="M8 200V112Q8 44 50 6Q92 44 92 112V200Z" />
        <path d="M108 200V112Q108 44 150 6Q192 44 192 112V200Z" />
      </>
    )}
    {variant === "star" && <polygon points={STAR_POINTS} />}
    {variant === "petals" && (
      <>
        <path d="M100 100H0A100 100 0 0 1 100 0Z" />
        <path d="M100 100V0A100 100 0 0 1 200 100Z" opacity=".55" />
        <path d="M100 100H200A100 100 0 0 1 100 200Z" />
        <path d="M100 100V200A100 100 0 0 1 0 100Z" opacity=".55" />
      </>
    )}
    {variant === "dome" && (
      <>
        <path d="M20 200V120A80 80 0 0 1 180 120V200Z" />
        <circle cx="100" cy="40" r="22" />
      </>
    )}
  </svg>
);

/* Repeating star lattice used as a faint texture on ivory and emerald blocks */
export const PatternBg = ({ className = "", opacity = 0.06, color = "#C6A878" }) => (
  <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} style={{ opacity }}>
    <defs>
      <pattern id={`ims-lattice-${color.slice(1)}`} width="56" height="56" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={color} strokeWidth="1">
          <rect x="16" y="16" width="24" height="24" />
          <rect x="16" y="16" width="24" height="24" transform="rotate(45 28 28)" />
          <path d="M0 28h8M48 28h8M28 0v8M28 48v8" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#ims-lattice-${color.slice(1)})`} />
  </svg>
);
