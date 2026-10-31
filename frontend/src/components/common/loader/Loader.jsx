import { useEffect } from "react";
import { motion } from "framer-motion";
import { Star8 } from "../../../ui/Ornaments";

/*
 * Full-screen loader in the IMS brand: the logo inside a slowly turning gold
 * eight-point star, the school name and motto, and a gold progress line.
 */
const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      role="status"
      aria-label="Loading Islamic Mission School"
    >
      <div className="relative flex h-44 w-44 items-center justify-center">
        <motion.div className="absolute inset-0 text-gold-400" animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}>
          <Star8 className="h-full w-full" strokeWidth={1.2} />
        </motion.div>
        <motion.div className="absolute inset-5 text-emerald-700/25" animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
          <Star8 className="h-full w-full" strokeWidth={1} />
        </motion.div>
        <motion.img
          src="/images/logo/logo.webp"
          alt=""
          width="88"
          height="88"
          className="relative h-[88px] w-[88px]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <motion.p
        className="mt-6 font-display text-2xl font-bold text-emerald-800 md:text-3xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Islamic Mission School
      </motion.p>
      <motion.p
        lang="ar"
        dir="rtl"
        className="mt-2 font-arabic text-xl text-gold-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        رَّبِّ زِدْنِي عِلْمًا
      </motion.p>

      <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-gold-500/20">
        <motion.div
          className="h-full w-1/3 rounded-full bg-gold-500"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
