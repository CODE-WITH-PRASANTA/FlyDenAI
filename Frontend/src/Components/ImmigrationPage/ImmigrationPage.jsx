import React, { useState, useEffect } from "react";
import "./ImmigrationPage.css";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const images = [
  "/images/immigration-bg1.jpg",
  "/images/immigration-bg2.jpg",
  "/images/immigration-bg3.jpg",
  "/images/immigration-bg4.jpg",
];

const ImmigrationPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="immigrationpage-container"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay"></div>
      <motion.div
        className="content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="tagline"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Your Most Trusted Partners
        </motion.div>
        <motion.h1
          className="headline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Immigration & Visa Consulting <br /> Here…
        </motion.h1>
        <motion.p
          className="description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Transmds is the world’s driving worldwide coordinations supplier we
          uphold industry and exchange the worldwide trade of merchandi
        </motion.p>
        <motion.button
          className="cta-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More <FaArrowRight className="icon" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ImmigrationPage;