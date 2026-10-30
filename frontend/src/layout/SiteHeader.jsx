import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { PiCaretDown, PiList, PiX, PiPhone, PiWhatsappLogo } from "react-icons/pi";
import { navigation, contact, admissions, school } from "../content/site";
import Img from "../ui/Img";
import Button, { ArrowLink } from "../ui/Button";
import { Sparkle } from "../ui/Ornaments";
import NoticeTicker from "./NoticeTicker";
import SocialLinks from "./SocialLinks";

const Logo = ({ light = false }) => (
  <Link to="/" className="flex items-center gap-3" aria-label={`${school.name} home`}>
    <img src="/images/logo/logo.webp" alt="" width="48" height="48" className="h-11 w-11 md:h-12 md:w-12" />
    <span className="leading-tight">
      <span className={`block font-display text-lg font-bold md:text-xl ${light ? "text-ivory-50" : "text-emerald-800"}`}>{school.name}</span>
      <span className={`block text-[11px] font-medium uppercase tracking-[0.16em] ${light ? "text-gold-300" : "text-gold-600"}`}>{school.affiliation}</span>
    </span>
  </Link>
);

const UtilityBar = () => (
  <div className="bg-navy-900 text-ivory-100">
    <div className="mx-auto flex h-9 max-w-site items-center gap-6 px-4 text-xs md:px-8">
      <Link to="/classes" className="flex shrink-0 items-center gap-2 font-semibold text-gold-300 hover:text-gold-100">
        <Sparkle className="h-3 w-3" />
        Admission Open {admissions.session}
      </Link>
      <NoticeTicker className="hidden min-w-0 flex-1 md:flex" />
      <div className="ml-auto hidden shrink-0 items-center gap-5 lg:flex">
        {contact.phones.map((p) => (
          <a key={p.href} href={p.href} className="flex items-center gap-1.5 hover:text-gold-300">
            <PiPhone aria-hidden="true" /> {p.label}
          </a>
        ))}
        <SocialLinks className="gap-3 border-l border-ivory-50/20 pl-5" iconClass="h-4 w-4" />
      </div>
    </div>
  </div>
);

const MegaPanel = ({ item, onClose, onMouseEnter }) => (
  <motion.div
    onMouseEnter={onMouseEnter}
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    className="absolute inset-x-0 top-full border-t border-gold-500/30 bg-ivory-50 shadow-lift"
  >
    <div className="mx-auto grid max-w-site grid-cols-12 gap-10 px-8 py-10">
      <div className="col-span-4">
        <p className="text-xs font-semibold uppercase tracking-eyebrow text-emerald-600">{item.label}</p>
        <p className="mt-3 font-display text-2xl font-bold leading-snug text-ink">{item.blurb}</p>
        <ArrowLink to={item.to} className="mt-6">Explore {item.label}</ArrowLink>
      </div>
      <ul className="col-span-4 space-y-1 border-l border-gold-500/30 pl-8">
        {item.links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={onClose}
              className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink/80 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              {link.label}
              <span className="h-1.5 w-1.5 rotate-45 bg-gold-500 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <Link to={item.to} onClick={onClose} className="group col-span-4 block overflow-hidden rounded-t-[140px] rounded-b-2xl">
        <Img name={item.image} sizes="400px" className="aspect-[4/3] transition-transform duration-700 group-hover:scale-105" />
      </Link>
    </div>
  </motion.div>
);

const MobileMenu = ({ open, onClose }) => {
  const [expanded, setExpanded] = useState(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-emerald-800 text-ivory-50 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Logo light />
            <button onClick={onClose} className="rounded-full p-2 text-3xl hover:bg-emerald-700" aria-label="Close menu">
              <PiX />
            </button>
          </div>
          <nav className="flex-1 px-5 pb-8">
            <NavLink to="/" end onClick={onClose} className="block border-b border-ivory-50/10 py-4 font-display text-2xl font-semibold">
              Home
            </NavLink>
            {navigation.map((item) => {
              const isOpen = expanded === item.label;
              return (
                <div key={item.label} className="border-b border-ivory-50/10">
                  <button
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-4 font-display text-2xl font-semibold"
                  >
                    {item.label}
                    <PiCaretDown className={`text-lg text-gold-300 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {item.links.map((link) => (
                          <li key={link.to}>
                            <Link to={link.to} onClick={onClose} className="block py-2.5 pl-4 text-base text-ivory-100/85 hover:text-gold-300">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        <li className="pb-4" />
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <div className="mt-8 grid gap-3">
              <Button to="/classes" onClick={onClose}>Apply for {admissions.session}</Button>
              <Button to={contact.whatsapp} variant="light" arrow={false}>
                <PiWhatsappLogo className="text-lg" /> Chat on WhatsApp
              </Button>
            </div>
            <SocialLinks className="mt-8 justify-center gap-6" iconClass="h-6 w-6" />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SiteHeader = () => {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);
  const { pathname, hash } = useLocation();

  // Close menus whenever the route changes
  useEffect(() => {
    setActive(null);
    setMobileOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (e) => e.key === "Escape" && (setActive(null), setMobileOpen(false));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  // Small delay before closing so the pointer can travel into the panel
  const open = (label) => {
    clearTimeout(closeTimer.current);
    setActive(label);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 160);
  };

  const activeItem = navigation.find((n) => n.label === active);
  const sectionActive = (item) => [item.to, ...item.links.map((l) => l.to)].some((to) => to.split("#")[0] === pathname);

  return (
    <>
      <UtilityBar />
      <header className={`sticky top-0 z-50 border-b border-gold-500/25 bg-ivory-50/95 backdrop-blur transition-shadow ${scrolled ? "shadow-card" : ""}`}>
        <div className={`mx-auto flex max-w-site items-center gap-6 px-4 transition-all md:px-8 ${scrolled ? "h-16" : "h-20"}`}>
          <Logo />
          <nav className="ml-auto hidden h-full xl:block" aria-label="Main" onMouseLeave={scheduleClose}>
            <ul className="flex h-full items-center gap-1">
              {navigation.map((item) => {
                const isOpen = active === item.label;
                return (
                  <li key={item.label} className="flex h-full items-center" onMouseEnter={() => open(item.label)}>
                    <button
                      onClick={() => setActive(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      className={`relative flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                        isOpen || sectionActive(item) ? "text-emerald-700" : "text-ink/80 hover:text-emerald-700"
                      }`}
                    >
                      {item.label}
                      <PiCaretDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                      {sectionActive(item) && <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded bg-gold-500" aria-hidden="true" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <AnimatePresence>
              {activeItem && (
                <MegaPanel key={activeItem.label} item={activeItem} onClose={() => setActive(null)} onMouseEnter={() => open(activeItem.label)} />
              )}
            </AnimatePresence>
          </nav>
          <Button to="/classes" className="hidden whitespace-nowrap xl:inline-flex" arrow={false}>Apply Now</Button>
          <button onClick={() => setMobileOpen(true)} className="ml-auto rounded-full p-2 text-3xl text-emerald-800 xl:hidden" aria-label="Open menu">
            <PiList />
          </button>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default SiteHeader;
