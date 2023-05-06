import { AnimatePresence, motion } from "framer-motion";

const Animation = ({ text }) => {
  const words = text.split("");

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
    
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <motion.p variants={sentence} initial="hidden" animate="visible">
        {text.split("").map((word, index) => (
          <motion.span variants={letter} key={index}>
            {word}
          </motion.span>
        ))}
      </motion.p>
    </>
  );
};

export default Animation;
