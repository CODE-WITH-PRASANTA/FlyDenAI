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
      number: "01",
      title: "Direct Interviews",
      desc: "Expound actual teachings to the great explorers of truth.",
    },
    {
      id: 2,
      icon: Icon2,
      number: "02",
      title: "Faster Processing",
      desc: "We provide faster visa processing for our clients efficiently.",
    },
    {
      id: 3,
      icon: Icon3,
      number: "03",
      title: "Visa Assistance",
      desc: "Complete assistance to achieve your visa goals successfully.",
    },
    {
      id: 4,
      icon: Icon4,
      number: "04",
      title: "Cost-Effective",
      desc: "Affordable services without compromising quality.",
    },
  ];

  return (
    <section className="whychooseus-section">
      {/* Background Decorations */}
      <div className="whychooseus-bg-shape whychooseus-bg-shape-one"></div>
      <div className="whychooseus-bg-shape whychooseus-bg-shape-two"></div>
      <div className="whychooseus-bg-circle whychooseus-bg-circle-one"></div>
      <div className="whychooseus-bg-circle whychooseus-bg-circle-two"></div>
      <div className="whychooseus-grid-pattern"></div>

      <div className="whychooseus-container">

        {/* Section Header */}
        <motion.div
          className="whychooseus-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="whychooseus-subtitle-wrapper">
            <span className="whychooseus-subtitle-line"></span>

            <p className="whychooseus-subtitle">
              WHY CHOOSE US
            </p>

            <span className="whychooseus-subtitle-line"></span>
          </div>

          <h2 className="whychooseus-title">
            Offer Tailor Made Services That
            <span> Our Client Requires</span>
          </h2>

          <p className="whychooseus-header-description">
            At <strong>Flyixo</strong>, we make your global journey easier
            with reliable visa guidance, faster processing, expert assistance,
            and affordable solutions.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="whychooseus-cards">
          {cards.map((card, index) => (
            <motion.article
              className="whychooseus-card"
              key={card.id}
              initial={{
                opacity: 0,
                y: 60,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              whileHover={{
                y: -10,
              }}
            >
              {/* Card Top */}
              <div className="whychooseus-card-top">
                <span className="whychooseus-card-number">
                  {card.number}
                </span>

                <span className="whychooseus-card-line"></span>
              </div>

              {/* Icon */}
              <motion.div
                className="whychooseus-icon-wrapper"
                whileHover={{
                  rotate: 5,
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <div className="whychooseus-icon-glow"></div>

                <img
                  src={card.icon}
                  alt={card.title}
                  className="whychooseus-icon"
                />
              </motion.div>

              {/* Content */}
              <div className="whychooseus-card-content">
                <h3 className="whychooseus-card-title">
                  {card.title}
                </h3>

                <p className="whychooseus-card-desc">
                  {card.desc}
                </p>
              </div>

              {/* Bottom */}
              <div className="whychooseus-more">
                <span className="whychooseus-more-dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>

                <span className="whychooseus-more-text">
                  Flyixo Advantage
                </span>

                <span className="whychooseus-arrow">
                  →
                </span>
              </div>

              {/* Hover Decoration */}
              <span className="whychooseus-card-corner whychooseus-card-corner-one"></span>
              <span className="whychooseus-card-corner whychooseus-card-corner-two"></span>
            </motion.article>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="whychooseus-footer"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
        >
          <div className="whychooseus-footer-line"></div>

          <div className="whychooseus-footer-content">
            <div className="whychooseus-footer-icon">
              ✦
            </div>

            <p className="whychooseus-footer-text">
              Guiding you from{" "}
              <span className="highlight">
                eligibility exams
              </span>{" "}
              to complete{" "}
              <span className="highlight">
                visa assistance.
              </span>
            </p>
          </div>

          {/* CTA */}
          {/* 
          <motion.button
            className="whychooseus-btn"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            GET ASSISTANCE
            <span>→</span>
          </motion.button>
          */}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;