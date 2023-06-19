import React from "react";
import { motion } from "framer-motion";

const AnimatedTextWord = ({ text }) => {
  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        style={{ marginRight: "4px", fontSize: "48px" }}
        initial={{ opacity: 0, y: 400 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { type: "spring", damping: 20, stiffness: 80 },
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default AnimatedTextWord;



