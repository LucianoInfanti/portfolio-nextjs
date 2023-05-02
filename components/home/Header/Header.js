import { motion } from "framer-motion";

import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <motion.nav
      className={styles.nav}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.8 }}
      viewport={{ once: true }}
    >
     

      <div className={styles.menuWrapper}>
        <Link href="/">Luciano Infanti</Link>
        <div classname={styles.linkWrapper}>
          <Link href="/work">Work</Link>
          <span className={styles.span}>, </span>
          <Link href="/writing">Writing</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
