import ShuffleText from "../shuffletext";
import styles from "./Footer.module.css";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const router = useRouter();

  const links = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/luciano-infanti/" },
    { label: "Github", href: "https://github.com/LucianoInfanti" },
    { label: "Savee", href: "https://savee.it/lucianoinfanti/" },
    { label: "Read.cv", href: "https://read.cv/lucianoinfanti" },
  ];
  return (
    <AnimatePresence key="footer">
      {router.pathname === "/" ? (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: 60,
            opacity: 0,
            ease: [0.2, 0.0, 0, 1.0],

            transition: { duration: 0.6 },
          }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.2, 0.0, 0, 1.0],
          }}
          className={styles.wrapper}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a target="blank" href={link.href}>
                <ShuffleText text={link.label}></ShuffleText>
              </a>
              <span className={styles.comma}>,</span>
            </li>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 60, opacity: 0 }}
          transition={{
            duration: 1,
            ease: [0.2, 0.0, 0, 1.0],
          }}
          className={styles.wrapper}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a target="blank" href={link.href}>
                <ShuffleText text={link.label}></ShuffleText>
              </a>
              <span className={styles.comma}>,</span>
            </li>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Footer;
