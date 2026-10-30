import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PiPhone, PiWhatsappLogo, PiPencilSimpleLine } from "react-icons/pi";
import { contact } from "../content/site";

/*
 * Phones: sticky bottom bar with Call / WhatsApp / Apply.
 * Desktop: a floating WhatsApp button, shown once the visitor scrolls past
 * the hero so it never covers the hero tiles.
 */
const QuickActions = () => {
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-gold-500/40 bg-emerald-800 pb-[env(safe-area-inset-bottom)] text-ivory-50 lg:hidden">
        <a href={contact.phones[0].href} className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold">
          <PiPhone className="text-xl text-gold-300" aria-hidden="true" /> Call
        </a>
        <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-0.5 border-x border-ivory-50/10 py-2.5 text-[11px] font-semibold">
          <PiWhatsappLogo className="text-xl text-gold-300" aria-hidden="true" /> WhatsApp
        </a>
        <Link to="/classes" className="flex flex-col items-center gap-0.5 bg-gold-400 py-2.5 text-[11px] font-bold text-emerald-800">
          <PiPencilSimpleLine className="text-xl" aria-hidden="true" /> Apply Now
        </Link>
      </nav>
      {/* Keeps the footer clear of the bottom bar on phones */}
      <div className="h-16 lg:hidden" aria-hidden="true" />

      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-3xl text-ivory-50 shadow-lift ring-2 ring-gold-400 transition-all duration-300 hover:scale-110 lg:flex ${showFloat ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <PiWhatsappLogo aria-hidden="true" />
      </a>
    </>
  );
};

export default QuickActions;
