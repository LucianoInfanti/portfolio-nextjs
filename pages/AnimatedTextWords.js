import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedTextWord = ({ text, props }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delay: 0.05 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 200,
      transition: {
        duration: 1,
      },
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        style={{ overflow: "hidden", display: "flex" }}
        variants={container}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
      >
        {words.map((word, index) => (
          <motion.span
            variants={child}
            exit={{ opacity: 0 }}
            style={{
              marginRight: "5px",
              fontFamily: "Migra-Extralight",
            }}
            key={index}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTextWord;


