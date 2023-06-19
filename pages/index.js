import styles from "./index.module.css";
import ShuffleText from "../components/shuffletext";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import Circle from "../components/circle";
export default function Home() {
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ease: [0.2, 0.0, 0, 1.0],
        duration: 1,
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.2, 0.0, 0, 1.0], duration: 1 },
    },
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.spline}>
        {/* <Circle /> */}
        {/* <Spline scene="https://prod.spline.design/LnYT0SdCfGE5gGiJ/scene.splinecode"/> */}
        {/* <Spline scene="https://prod.spline.design/gamGiLRQy8sw-ymO/scene.splinecode"/> */}
        {/* <Spline scene="https://prod.spline.design/xfleAzYoiHCo6KUI/scene.splinecode"/> */}
      </div>
      <motion.div
        className={styles.mainContent}
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        key="mainContent"
      >
        <motion.p
          variants={childVariants}
          exit={{
            y: 30,
            opacity: 0,
            ease: [0.2, 0.0, 0, 1.0],
            transition: { duration: 0.8 },
          }}
          key="first"
        >
          Designer and code enthusiast.
        </motion.p>
        <motion.p
          variants={childVariants}
          exit={{
            y: 30,
            opacity: 0,
            ease: [0.2, 0.0, 0, 1.0],
            transition: { duration: 0.8 },
          }}
          key="second"
          className={styles.secondRow}
        >
          Currently at
          <a
            className={styles.mainContantLink}
            href="https://work.co/"
            target="_blank"
          >
            <ShuffleText text={"Work & Co"} />
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
