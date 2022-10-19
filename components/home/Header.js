import { motion } from "framer-motion";

import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <motion.nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">Luciano Infanti</Link>
        <br></br> Designer at{" "}
        <a href="https://work.co/" className={styles.italic}>
          Work & Co
        </a>
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

// initial={{ opacity: 0 }}
// whileInView={{ opacity: 1 }}
// transition={{ ease: "easeInOut", duration: 0.8 }}
// viewport={{ once: true }}
