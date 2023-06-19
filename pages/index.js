import styles from "./index.module.css";
import ShuffleText from "../components/shuffletext";
import { motion } from "framer-motion";

export default function Home() {
  const animation = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.2, 0.0, 0, 1.0], duration: 1 },
    },
    exit: {
      y: 30,
      opacity: 0,
      ease: [0.2, 0.0, 0, 1.0],
      transition: { duration: 0.6 },
    },
  };

  const paragraphs = [
    { id: "first", text: "Designer and code enthusiast." },
    {
      id: "second",
      text: "Currently at ",
      link: { href: "https://work.co/", text: "Work & Co" },
      className: styles.secondRow,
    },
  ];

  return (
    <motion.div
      className={styles.Wrapper}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className={styles.mainContent}>
        {paragraphs.map(({ id, text, link, className }) => (
          <motion.p variants={animation} key={id} className={className}>
            {text}
            {link && (
              <a
                className={styles.mainContantLink}
                href={link.href}
                target="_blank"
              >
                <ShuffleText text={link.text} />
              </a>
            )}
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
}
