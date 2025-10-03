import React from "react";
import { motion } from "framer-motion";
import "./ImpactSection.css";
import b1 from "../../assets/b1.jpg";

const data = [
  { title: "Immigration Consultant", percent: 85 },
  { title: "Study And Work Visa", percent: 74 },
  { title: "Business Visit Visa", percent: 65 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (percent) => ({
    width: `${percent}%`,
    transition: { duration: 2, ease: "easeInOut" },
  }),
};

const ImpactSection = () => {
  return (
    <section className="impact-section">
      <motion.div className="impact-content" initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="impact-title">
          The impact of <br /> our <span>Competitive</span> efforts
        </h2>
        <p className="impact-text">
          Our foundation guides applicants for immigration and visas with expertise and care, helping them achieve their dreams globally.
        </p>

        <motion.div className="progress-container" variants={containerVariants}>
          {data.map((item, index) => (
            <div className="progress-box" key={index}>
              <div className="progress-label">
                {item.title} <span>{item.percent}%</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  custom={item.percent}
                  variants={progressVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                ></motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="impact-image"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img src={b1} alt="Team working together" />
      </motion.div>
    </section>
  );
};

export default ImpactSection;
