import "./header.css";
import { motion, useScroll } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header(props) {
  const [Hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((current) => {
      if (current >= 100) {
        setHidden(true);
      } else setHidden(false);
    });
  }, []);

  const scrollVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const defaultMotion = {
    visible: {
      opacity: 1,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1.2,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1.2,
      },
    },
  };
  return (
    <motion.div
      variants={defaultMotion}
      initial="hidden"
      animate="visible"
      className="headerWrapper"
    >
      <div className="header">
        <a href="/" className="logo">
          Luciano Infanti{" "}
        </a>

        <motion.p
          variants={scrollVariants}
          animate={Hidden ? "hidden" : "visible"}
          transition={{ ease: "easeOut", duration: 0.4 }}
          className="introduction"
        >
          {props.introduction}
          {props.social}
        </motion.p>

        <div className="circle-wrapper">
          <div className="button-wrapper">
            {" "}
            <button className="circle"></button>{" "}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
