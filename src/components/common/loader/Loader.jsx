import React from "react";
import { motion } from "framer-motion";
import "./loader.css";

const BookLoader = () => {
  const words = [
    { lead: "I", rest: "slamic" },
    { lead: "M", rest: "ission" },
    { lead: "S", rest: "chool" },
  ];

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const restVariants = {
    initial: { opacity: 0, y: 6 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.24, ease: "easeOut" },
    },
  };

  const leadVariants = {
    initial: { scale: 0.94, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <div className="book-loader-wrapper">
      <motion.div className="loader-glow-container" aria-hidden="true">
        <motion.div
          className="loader-glow"
          animate={{ scale: [1, 1.03, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

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
        className="loading-bar-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
    </div>
  );
};

export default BookLoader;