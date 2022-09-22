import { motion } from "framer-motion";

import Head from "next/head";
import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.8 }}
      viewport={{ once: true }}
      className={styles.nav}
    >
      <div className={styles.logo}>
        <Link href="/">Luciano Infanti</Link>
      </div>

      <div className={styles.menu}>
        <div className={styles.item}>
          <Link href="/writing" className={styles.item}>
            Writing
          </Link>
        </div>
        <div className={styles.item}>
          <Link href="/about" className={styles.item}>
            About
          </Link>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 12 }}
        transition={{ ease: "easeInOut", duration: 0.4 }}
        className={styles.circle}
      ></motion.div>
    </motion.nav>
  );
};

export default Header;
