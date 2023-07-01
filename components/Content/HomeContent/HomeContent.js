import styles from "./HomeContent.module.css";
import { motion } from "framer-motion";
import ShuffleText from "../../shuffletext";

const HomeContent = () => {
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ease: [0.05, 0.7, 0.1, 1.0],
        duration: 2,
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.05, 0.7, 0.1, 1.0], duration: 2 },
    },
  };
  return (
    <motion.div
      key="indexWrapper"
      exit={{
        y: 30,
        opacity: 0,
        ease: [0.2, 0.0, 0, 1.0],
        transition: { duration: 0.6 },
      }}
    >
      <div className={styles.Wrapper}>
        <div className={styles.spline}></div>
        <motion.div
          className={styles.mainContent}
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          key="mainContent"
        >
          <motion.p variants={childVariants} key="first">
            Designer and code enthusiast.
          </motion.p>
          <motion.div
            variants={childVariants}
            key="second"
            className={styles.secondRow}
          >
            <p>Currently at</p>
            <a
              className={styles.mainContantLink}
              href="https://work.co/"
              target="_blank"
            >
              <ShuffleText text={"Work & Co"} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeContent;
