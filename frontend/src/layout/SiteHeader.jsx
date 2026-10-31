import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { PiCaretDown, PiMapPin, PiPencilSimpleLine, PiCalendarBlank, PiPhone, PiX, PiWhatsappLogo, PiEnvelopeSimple } from "react-icons/pi";
import { HiArrowRight } from "react-icons/hi2";
import { navigation, contact, school } from "../content/site";
import { BlockShape } from "../ui/Ornaments";
import SocialLinks from "./SocialLinks";

const EASE = [0.22, 1, 0.36, 1];

/* Header height, shared with the page spacer and the hero tile column */
export const HEADER_H = "h-20 md:h-24";

const MENU_ITEMS = [...navigation, { label: "Contact", to: "/contact", blurb: "Visit us near AMU Fort, call, or send a message.", links: [] }];

const QUICK_LINKS = [
  { label: "Visit", to: "/contact", Icon: PiMapPin },
  { label: "Apply", to: "/classes", Icon: PiPencilSimpleLine },
  { label: "Calendar", to: "/calendar", Icon: PiCalendarBlank },
];

const Logo = ({ light }) => (
  <Link to="/" className="flex items-center gap-3" aria-label={`${school.name} home`}>
    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full md:h-14 md:w-14 ${light ? "bg-ivory-50/95 shadow-lift" : ""}`}>
      <img src="/images/logo/logo.webp" alt="" width="56" height="56" className="h-11 w-11 md:h-12 md:w-12" />
    </span>
    <span className={`leading-tight ${light ? "drop-shadow-[0_1px_8px_rgba(0,20,12,.6)]" : ""}`}>
      <span className={`block font-display text-lg font-bold md:text-xl ${light ? "text-ivory-50" : "text-emerald-800"}`}>{school.name}</span>
      <span className={`hidden text-[10px] font-semibold uppercase tracking-[0.16em] sm:block md:text-[11px] ${light ? "text-gold-300" : "text-gold-600"}`}>{school.affiliation}</span>
    </span>
  </Link>
);

/* Two lines that turn into an X */
const MenuIcon = ({ open }) => (
  <span className="relative block h-3.5 w-6" aria-hidden="true">
    <span className={`absolute left-0 h-0.5 w-6 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
    <span className={`absolute left-0 h-0.5 rounded bg-current transition-all duration-300 ${open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"}`} />
  </span>
);

/* ── Full-screen menu ─────────────────────────────────────────── */

const listMotion = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};
const itemMotion = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const Decoration = () => (
  <div className="relative hidden overflow-hidden lg:block" aria-hidden="true">
    {[
      { v: "dome", c: "text-emerald-600", cls: "-left-24 top-[6%] h-[52%]", d: 0.1 },
      { v: "star", c: "text-gold-400", cls: "left-[38%] top-[30%] h-[34%]", d: 0.2 },
      { v: "arches", c: "text-emerald-500/80", cls: "-left-10 bottom-[-6%] h-[44%]", d: 0.3 },
    ].map((s) => (
      <motion.div
        key={s.v}
        className={`absolute aspect-square ${s.cls}`}
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.9, delay: s.d, ease: EASE }}
      >
        <BlockShape variant={s.v} className={`h-full w-full ${s.c}`} />
      </motion.div>
    ))}
    <motion.p
      className="absolute bottom-10 left-10 right-10 font-arabic text-3xl text-ivory-50/80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      dir="rtl"
      lang="ar"
    >
      {school.mottoArabic}
    </motion.p>
  </div>
);

const MenuOverlay = ({ open, onClose }) => {
  const [active, setActive] = useState(null); // label of the item whose links are shown
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setActive(null);
    closeRef.current?.focus();
  }, [open]);

  const activeItem = MENU_ITEMS.find((m) => m.label === active);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-y-auto bg-gradient-to-br from-emerald-800 via-emerald-900 to-navy-900 text-ivory-50"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.5, ease: EASE, delay: 0.1 } }}
          transition={{ duration: 0.7, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="grid min-h-full lg:grid-cols-[4fr_8fr]">
            <Decoration />

            <div className="relative flex flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-16 lg:pt-8">
              {/* Top bar: logo on phones, close button */}
              <div className={`flex items-center justify-between ${HEADER_H} -mt-6 lg:-mt-8`}>
                <span className="lg:invisible"><Logo light /></span>
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-full bg-ivory-50 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-emerald-900 shadow-lift transition hover:bg-gold-300"
                >
                  <PiX className="text-lg" aria-hidden="true" /> Close
                </button>
              </div>

              <motion.div variants={listMotion} initial="hidden" animate="show" className="mt-4 lg:mt-10">
                {/* Quick links */}
                <motion.div variants={itemMotion} className="flex flex-wrap gap-x-8 gap-y-3">
                  {QUICK_LINKS.map(({ label, to, Icon }) => (
                    <Link key={label} to={to} onClick={onClose} className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-ivory-50 hover:text-gold-300">
                      <Icon className="text-xl text-gold-400 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" /> {label}
                    </Link>
                  ))}
                </motion.div>

                <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  {/* Main links */}
                  <nav aria-label="Main">
                    <ul>
                      <motion.li variants={itemMotion}>
                        <Link to="/" onClick={onClose} className="block py-1.5 font-display text-4xl font-bold leading-tight text-ivory-50/90 transition-colors hover:text-gold-300 md:text-5xl">
                          Home
                        </Link>
                      </motion.li>
                      {MENU_ITEMS.map((item) => {
                        const isActive = active === item.label;
                        const hasLinks = item.links.length > 0;
                        return (
                          <motion.li variants={itemMotion} key={item.label}>
                            {/* Desktop: hover/focus shows links on the right; the word itself opens the page */}
                            <Link
                              to={item.to}
                              onClick={onClose}
                              onMouseEnter={() => setActive(item.label)}
                              onFocus={() => setActive(item.label)}
                              className={`group hidden items-center gap-4 py-1.5 font-display text-5xl font-bold leading-tight transition-colors lg:flex ${isActive ? "text-gold-300" : "text-ivory-50/90 hover:text-gold-300"}`}
                            >
                              {item.label}
                              <HiArrowRight className={`text-3xl transition-all duration-300 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`} aria-hidden="true" />
                            </Link>
                            {/* Phones and tablets: tap to expand */}
                            {hasLinks ? (
                              <button
                                onClick={() => setActive(isActive ? null : item.label)}
                                aria-expanded={isActive}
                                className="flex w-full items-center justify-between py-1.5 text-left font-display text-4xl font-bold leading-tight text-ivory-50/90 md:text-5xl lg:hidden"
                              >
                                {item.label}
                                <PiCaretDown className={`text-2xl text-gold-300 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} aria-hidden="true" />
                              </button>
                            ) : (
                              <Link to={item.to} onClick={onClose} className="block py-1.5 font-display text-4xl font-bold leading-tight text-ivory-50/90 md:text-5xl lg:hidden">
                                {item.label}
                              </Link>
                            )}
                            <AnimatePresence initial={false}>
                              {isActive && hasLinks && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.35, ease: EASE }}
                                  className="overflow-hidden border-l border-gold-400/40 pl-5 lg:hidden"
                                >
                                  {[{ label: `${item.label} overview`, to: item.to }, ...item.links].map((link) => (
                                    <li key={link.to}>
                                      <Link to={link.to} onClick={onClose} className="block py-2 text-lg text-ivory-100/85 hover:text-gold-300">{link.label}</Link>
                                    </li>
                                  ))}
                                  <li className="pb-3" />
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* Desktop: links of the hovered item */}
                  <div className="hidden lg:block">
                    <AnimatePresence mode="wait">
                      {activeItem ? (
                        <motion.div
                          key={activeItem.label}
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="border-l border-gold-400/40 pl-10 pt-3"
                        >
                          <p className="max-w-sm text-lg leading-relaxed text-ivory-100/80">{activeItem.blurb}</p>
                          <ul className="mt-6 space-y-1">
                            {activeItem.links.map((link, i) => (
                              <motion.li key={link.to} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: EASE }}>
                                <Link to={link.to} onClick={onClose} className="group flex items-center gap-3 py-2 text-xl font-medium text-ivory-50 hover:text-gold-300">
                                  <span className="h-1.5 w-1.5 rotate-45 bg-gold-400 transition-transform group-hover:scale-150" aria-hidden="true" />
                                  {link.label}
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : (
                        <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-l border-ivory-50/15 pl-10 pt-3 text-ivory-100/60">
                          <p className="font-display text-2xl italic text-gold-300/90">{school.tagline}</p>
                          <p className="mt-3 max-w-sm leading-relaxed">{school.summary}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Contact strip */}
                <motion.div variants={itemMotion} className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ivory-50/15 pt-8 text-sm text-ivory-100/85">
                  {contact.phones.map((p) => (
                    <a key={p.href} href={p.href} className="flex items-center gap-2 hover:text-gold-300"><PiPhone className="text-lg text-gold-400" aria-hidden="true" /> {p.label}</a>
                  ))}
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-300"><PiWhatsappLogo className="text-lg text-gold-400" aria-hidden="true" /> WhatsApp</a>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-gold-300"><PiEnvelopeSimple className="text-lg text-gold-400" aria-hidden="true" /> {contact.email}</a>
                  <SocialLinks className="gap-5 sm:ml-auto" iconClass="h-6 w-6" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Header ───────────────────────────────────────────────────── */

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

  useEffect(() => setMenuOpen(false), [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${overHero ? "bg-transparent" : "bg-ivory-50/95 shadow-card backdrop-blur"}`}>
        <div className={`flex items-stretch justify-between ${HEADER_H}`}>
          <div className="flex items-center pl-4 md:pl-8 lg:pl-12">
            <Logo light={overHero} />
          </div>

          {/* Right box: on the homepage it caps the hero's tile column */}
          <div className={`flex items-center justify-end gap-1 pr-3 transition-all duration-500 sm:gap-2 md:pr-6 ${overHero ? "rounded-bl-[1.75rem] bg-ivory-50 pl-4 md:pl-6 lg:w-[22rem] xl:w-[26rem]" : "pl-2"}`}>
            <a href={contact.phones[0].href} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 xl:flex" aria-label={`Call ${contact.phones[0].label}`}>
              <PiPhone className="text-lg" aria-hidden="true" /> Call
            </a>
            <span className="hidden h-6 w-px bg-emerald-900/15 xl:block" aria-hidden="true" />
            <Link to="/classes" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold uppercase tracking-[0.14em] text-emerald-800 hover:bg-emerald-50 sm:flex">
              <PiPencilSimpleLine className="text-lg text-gold-600" aria-hidden="true" /> Apply
            </Link>
            <span className="hidden h-6 w-px bg-emerald-900/15 sm:block" aria-hidden="true" />
            <button
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-emerald-900 transition hover:bg-emerald-50"
            >
              <MenuIcon open={menuOpen} /> Menu
            </button>
          </div>
        </div>
      </header>

      {/* Inner pages start below the fixed header; the homepage hero sits under it */}
      {!isHome && <div className={HEADER_H} aria-hidden="true" />}

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default SiteHeader;
