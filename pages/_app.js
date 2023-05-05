import "../styles/global.css";
import { motion, AnimatePresence } from "framer-motion";
import { Router } from "next/router";
import Header from "../components/home/Header/Header";
import Social from "../components/Social/Social";

export default function App({ Component, pageProps, router }) {
  return (
    <>
    <Header/>
    <Social/>
    <AnimatePresence initial={false} exitBeforeEnter>
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
          duration: 0.5, // set the duration of the animation
          ease: "easeInOut", // set the easing function for the animation
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
    </>
  );
}
