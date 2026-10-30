import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiMegaphone } from "react-icons/pi";
import { supabase } from "../supabaseClient";

/* Rotates through active notices, one at a time, in the utility bar */
const NoticeTicker = ({ className = "" }) => {
  const [notices, setNotices] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    supabase
      .from("notices")
      .select("id, title, link")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => setNotices(data || []));
  }, []);

  useEffect(() => {
    if (notices.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % notices.length), 5000);
    return () => clearInterval(timer);
  }, [notices.length]);

  if (!notices.length) return <div className={className} />;
  const notice = notices[index];

  return (
    <div className={`items-center gap-2 overflow-hidden border-l border-ivory-50/20 pl-6 ${className}`} aria-live="polite">
      <PiMegaphone className="shrink-0 text-gold-300" aria-hidden="true" />
      <AnimatePresence mode="wait">
        <motion.span
          key={notice.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="truncate"
        >
          {notice.link ? (
            <a href={notice.link} target="_blank" rel="noreferrer" className="hover:text-gold-300 hover:underline">{notice.title}</a>
          ) : (
            notice.title
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default NoticeTicker;
