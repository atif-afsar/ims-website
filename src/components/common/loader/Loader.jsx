import React, { useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/images/logo/logo.jpg";
import "./loader.css";

const BookLoader = () => {
  useEffect(() => {
    document.body.classList.add("loader-visible");
    return () => document.body.classList.remove("loader-visible");
  }, []);

  const words = [
    { lead: "I", rest: "slamic" },
    { lead: "M", rest: "ission" },
    { lead: "S", rest: "chool" },
  ];

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const leadVariants = {
    initial: { scale: 0.8, opacity: 0, y: 8 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const restVariants = {
    initial: { opacity: 0, x: -6 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut", delay: 0.08 },
    },
  };

  return (
    <motion.div
      className="book-loader-wrapper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div className="loader-glow-container" aria-hidden="true">
        <motion.div
          className="loader-glow"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="book-loader-content">
        <motion.img
          src={logo}
          alt="Islamic Mission School"
          className="loader-logo"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="school-name-container"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {words.map((word, index) => (
            <div key={index} className="word-group">
              <motion.span className="lead-letter" variants={leadVariants}>
                {word.lead}
              </motion.span>
              <motion.span className="rest-letters" variants={restVariants}>
                {word.rest}
              </motion.span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="loading-bar-track"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.2 }}
        >
          <motion.div
            className="loading-bar-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookLoader;
