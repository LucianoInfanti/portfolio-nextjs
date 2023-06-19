import "../styles/global.css";
import Navbar from "../components/Navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Footer from "../components/Footer/Footer";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
      <Footer />
    </>
  );
}
