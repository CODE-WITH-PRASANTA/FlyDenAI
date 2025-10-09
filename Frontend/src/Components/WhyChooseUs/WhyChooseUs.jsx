import React from "react";
import "./WhyChooseUs.css";
import { motion } from "framer-motion";

// Assets
import Icon1 from "../../assets/icon-5.webp";
import Icon2 from "../../assets/icon-6.webp";
import Icon3 from "../../assets/icon-7.webp";
import Icon4 from "../../assets/icon-8.webp";

const WhyChooseUs = () => {
  const cards = [
    {
      id: 1,
      icon: Icon1,
      title: "Direct Interviews",
      desc: "Expound actual teachings to the great explorers of truth.",
    },
    {
      id: 2,
      icon: Icon2,
      title: "Faster Processing",
      desc: "We provide faster visa processing for our clients efficiently.",
    },
    {
      id: 3,
      icon: Icon3,
      title: "Visa Assistance",
      desc: "Complete assistance to achieve your visa goals successfully.",
    },
    {
      id: 4,
      icon: Icon4,
      title: "Cost-Effective",
      desc: "Affordable services without compromising quality.",
    },
  ];

  return (
    <section className="whychooseus-section">
      <div className="whychooseus-container">
        {/* Subtitle */}
        <motion.p
          className="whychooseus-subtitle"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          WHY CHOOSE US
        </motion.p>

        {/* Title */}
        <motion.h2
          className="whychooseus-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Offer Tailor Made Services That <br /> Our Client Requires
        </motion.h2>

        {/* Cards Section */}
        <div className="whychooseus-cards">
          {cards.map((card, index) => (
            <motion.div
              className="whychooseus-card"
              key={card.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.2, ease: "easeOut" }}
            >
              <motion.img
                src={card.icon}
                alt={card.title}
                className="whychooseus-icon"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              />
              <motion.h3
                className="whychooseus-card-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + index * 0.2 }}
              >
                {card.title}
              </motion.h3>
              <motion.p
                className="whychooseus-card-desc"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              >
                {card.desc}
              </motion.p>
              <motion.div
                className="whychooseus-more"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.45 + index * 0.2 }}
              >
                <span>•••</span> <span className="whychoose-arrow">›</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer Section */}
        <motion.div
          className="whychooseus-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <motion.p
            className="whychooseus-footer-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Guiding on preparing for{" "}
            <span className="highlight">eligibility exams to visa</span>{" "}
            assistance.
          </motion.p>
          <motion.button
            className="whychooseus-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            GET ASSISTANCE ›
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
