import "../styles/global.css";
import Navbar from "../components/Navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Footer from "../components/Footer/Footer";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      router.prefetch(router.pathname);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  
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
