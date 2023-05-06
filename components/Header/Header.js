import { motion } from "framer-motion";
import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.menuWrapper}>
        <Link href="/">Luciano Infanti</Link>
      </div>

      <div className={styles.linkWrapper}>
        <Link href="/work">Work</Link>
        <span className={styles.span}>, </span>
        <Link href="/writing">Writing</Link>
      </div>
    </nav>
  );
};

export default Header;
