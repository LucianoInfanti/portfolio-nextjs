import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import styles from "./Navbar.module.css";
import ShuffleText from "../shuffletext";
import Link from "next/link";
import { globalStore } from "../../globalStore";

const Navbar = () => {
  const router = useRouter();
  const { hasAnimated, setHasAnimated } = globalStore((state) => state);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  const animationProps = hasAnimated
    ? {}
    : {
        initial: { y: -60 },
        animate: { y: 0 },
        transition: { delay: 0.4, duration: 1, ease: [0.2, 0.0, 0, 1.0] },
        onAnimationComplete: () => setHasAnimated(),
      };

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <motion.div
      {...animationProps}
      className={styles.Wrapper}
      onAnimationComplete={() => setHasAnimated(true)}
    >
      <div className={styles.Logo}>
        <Link href="/">
          <a href="/">
            <ShuffleText text={"Luciano Infanti"} />
          </a>
        </Link>
      </div>

      {!isScrolled && (
        <motion.div style={{ opacity }} className={styles.Links}>
          {router.pathname.startsWith("/writing") ? (
            <motion.div
              className={styles.DashActive}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.2, 0.0, 0, 1.0],
              }}
            ></motion.div>
          ) : (
            <motion.div
              className={styles.DashActive}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 0.2,
                ease: [0.2, 0.0, 0, 1.0],
              }}
            ></motion.div>
          )}

          <Link href="/writing">
            <a href="/writing">
              <ShuffleText text={"Writing"} />
            </a>
          </Link>
        </motion.div>
      )}

      <motion.div
        whileHover={{
          scale: 8,
          transition: { ease: [0.2, 0.0, 0, 1.0], duration: 1 },
        }}
        className={styles.Theme}
      ></motion.div>
    </motion.div>
  );
};

export default Navbar;
