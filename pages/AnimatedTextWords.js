import React from "react";
import { motion } from "framer-motion";

const AnimatedTextWord = ({ text }) => {
  const words = text.split(" ");

  //maybe some kind of setState here? and ternary operator down there  // function co(text) {
  //   if (words === "Work" || "&" || "Co") {
  //     const newWord = words;
  //     return (
  //       isItalic = true;
  //     )
  //   } else {
  //     return words;
  //   }

  // }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 * i },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.55, 0.085, 0.68, 0.53],
      },
    },
    hidden: {
      opacity: 0,
      y: 400,
      transition: {
        duration: 0.5,
        ease: [0.55, 0.085, 0.68, 0.53],
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex" }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "6px", fontSize: "40px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTextWord;
