import { Link } from "react-router";
import { HiArrowRight } from "react-icons/hi2";

const variants = {
  gold: "bg-gold-400 text-emerald-800 hover:bg-gold-300 shadow-[0_10px_24px_-10px_rgba(198,168,120,.9)]",
  emerald: "bg-emerald-700 text-ivory-50 hover:bg-emerald-600",
  light: "border border-ivory-50/60 text-ivory-50 hover:bg-ivory-50 hover:text-emerald-800",
  outline: "border border-emerald-700/30 text-emerald-700 hover:border-emerald-700 hover:bg-emerald-700 hover:text-ivory-50",
};

/*
 * Pill button. Internal paths use the router, anything else (tel:, https:)
 * renders a plain anchor.
 */
const Button = ({ to, children, variant = "gold", arrow = true, className = "", ...rest }) => {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />}
    </>
  );

  // File downloads need a plain anchor, not client-side routing
  if (to.startsWith("/") && !rest.download) return <Link to={to} className={classes} {...rest}>{content}</Link>;
  const external = to.startsWith("http");
  return (
    <a href={to} className={classes} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...rest}>
      {content}
    </a>
  );
};

/* Text link with sliding arrow, for "Learn more" style links */
export const ArrowLink = ({ to, children, tone = "dark", className = "" }) => (
  <Link
    to={to}
    className={`group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] ${tone === "dark" ? "text-emerald-700" : "text-gold-300"} ${className}`}
  >
    <span className="border-b border-current pb-0.5">{children}</span>
    <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
  </Link>
);

export default Button;
