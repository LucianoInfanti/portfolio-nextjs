import "../styles/global.css";
import Navbar from "../components/Navbar/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Footer from "../components/Footer/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <motion.div key={router.route}>
          <Component {...pageProps} key={router.route} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
