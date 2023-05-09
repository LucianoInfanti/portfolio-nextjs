import "../styles/global.css";
import { motion, AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.pathname}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },
            exitState: {
              opacity: 0,
            },
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
