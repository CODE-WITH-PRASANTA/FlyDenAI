import React from "react";
import { motion } from "framer-motion";
import "./VisaOffer.css";
import VisaOfferimg from "../../assets/AboutVisa.webp";

const VisaOffer = () => {
  return (
    <section className="visa-offer-section">
      {/* =========================================
          BACKGROUND DECORATIONS
      ========================================= */}

      <div className="visa-offer-bg visa-offer-bg-one"></div>
      <div className="visa-offer-bg visa-offer-bg-two"></div>
      <div className="visa-offer-bg visa-offer-bg-three"></div>

      <div className="visa-offer-pattern"></div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="visa-offer-container">

        {/* =========================================
            LEFT IMAGE
        ========================================= */}

        <motion.div
          className="visa-offer-image-column"
          initial={{
            opacity: 0,
            x: -80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <div className="visa-offer-image-wrapper">

            {/* Decorative ring */}
            <div className="visa-offer-image-ring"></div>

            {/* Main image */}
            <div className="visa-offer-image">
              <img
                src={VisaOfferimg}
                alt="Flyixo Visa Application Services"
                className="visa-offer-main-image"
              />

              <div className="visa-offer-image-overlay"></div>

              <div className="visa-offer-image-shine"></div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="visa-offer-floating-badge"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="visa-offer-badge-icon">
                ✦
              </span>

              <div>
                <strong>Flyixo</strong>
                <small>Global Visa Support</small>
              </div>
            </motion.div>

            {/* Small decorative dots */}
            <span className="visa-offer-dot visa-offer-dot-one"></span>
            <span className="visa-offer-dot visa-offer-dot-two"></span>
            <span className="visa-offer-dot visa-offer-dot-three"></span>
          </div>
        </motion.div>

        {/* =========================================
            RIGHT CONTENT
        ========================================= */}

        <motion.div
          className="visa-offer-content"
          initial={{
            opacity: 0,
            x: 80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
            delay: 0.15,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >

          {/* Eyebrow */}
          <div className="visa-offer-eyebrow">
            <span className="visa-offer-eyebrow-line"></span>

            <span>WHAT WE OFFER</span>

            <span className="visa-offer-eyebrow-line"></span>
          </div>

          {/* Small brand text */}
          <div className="visa-offer-brand">
            <span>FLYIXO</span>
            <span className="visa-offer-brand-dot"></span>
            <span>GLOBAL VISA SERVICES</span>
          </div>

          {/* Main heading */}
          <h2 className="visa-offer-title">
            Solutions From a{" "}
            <span>Leading Visa Consultant</span>{" "}
            For Your Global Journey
          </h2>

          {/* Description */}
          <p className="visa-offer-description">
            We provide complete guidance through every step of your visa
            journey. Our experts ensure a seamless process with professional
            documentation support, personalized assistance, and a smooth
            application experience with Flyixo.
          </p>

          {/* =========================================
              HIGHLIGHT ITEMS
          ========================================= */}

          <div className="visa-offer-highlights">

            <div className="visa-offer-highlight">
              <span className="visa-offer-highlight-icon">
                ✓
              </span>

              <div>
                <strong>Expert Guidance</strong>
                <span>
                  Professional support throughout your application.
                </span>
              </div>
            </div>

            <div className="visa-offer-highlight">
              <span className="visa-offer-highlight-icon">
                ✓
              </span>

              <div>
                <strong>Complete Documentation</strong>
                <span>
                  Clear assistance with your visa documentation.
                </span>
              </div>
            </div>

          </div>

          {/* =========================================
              STATS
          ========================================= */}

          <motion.div
            className="visa-offer-stats"
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.35,
            }}
            viewport={{
              once: true,
            }}
          >

            {/* Year Circle */}
            <motion.div
              className="visa-offer-circle"
              whileHover={{
                scale: 1.06,
                rotate: 3,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 15,
              }}
            >
              <div className="visa-offer-circle-inner">

                <span className="visa-offer-circle-small">
                  YEAR OF
                </span>

                <strong className="visa-offer-year-number">
                  2020
                </strong>

                <span className="visa-offer-circle-line"></span>

                <span className="visa-offer-circle-label">
                  Flyixo
                </span>

              </div>
            </motion.div>

            {/* Approval */}
            <div className="visa-offer-approval">

              <div className="visa-offer-approval-heading">
                <span className="visa-offer-percent">
                  84%
                </span>

                <span className="visa-offer-approved-text">
                  Visa's Approved
                </span>
              </div>

              <p>
                Our experienced consultants maintain a consistent visa
                approval rate by handling each case with attention,
                accuracy, and professional guidance.
              </p>

              <div className="visa-offer-progress">
                <span></span>
              </div>

              <div className="visa-offer-progress-info">
                <span>Application Support</span>
                <strong>84%</strong>
              </div>

            </div>

          </motion.div>

          {/* =========================================
              CTA
          ========================================= */}

          <motion.a
            href="/GetaQuotes"
            className="visa-offer-btn"
            whileHover={{
              scale: 1.04,
              y: -3,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span>Get Consultation</span>

            <span className="visa-offer-btn-arrow">
              →
            </span>
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
};

export default VisaOffer;