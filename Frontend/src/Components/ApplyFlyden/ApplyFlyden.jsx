import React from "react";
import "./ApplyFlyden.css";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaCheckCircle,
  FaThumbsUp,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaLaptopCode />,
    title: "Submit Documents & Pay Online",
    desc: "Upload all required documents and complete secure online payment.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Verification & Processing",
    desc: "Our experts verify your documents and process your visa application.",
  },
  {
    icon: <FaThumbsUp />,
    title: "Receive Your Visa",
    desc: "Get your visa directly in your inbox after successful approval.",
  },
];

const ApplyFlyixo = () => {
  return (
    <motion.section
      className="apply-flyixo-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {/* Background Decorations */}
      <div className="apply-flyixo-bg apply-flyixo-bg-one"></div>
      <div className="apply-flyixo-bg apply-flyixo-bg-two"></div>
      <div className="apply-flyixo-grid"></div>

      <div className="apply-flyixo-container">
        {/* ================= HEADER ================= */}
        <motion.div
          className="apply-flyixo-header"
          initial={{
            opacity: 0,
            y: -30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <div className="apply-flyixo-eyebrow">
            <span className="apply-flyixo-eyebrow-line"></span>

            <span>FLYIXO VISA PROCESS</span>

            <span className="apply-flyixo-eyebrow-line"></span>
          </div>

          <h2 className="apply-flyixo-title">
            Applying With <span>Flyixo</span> Is This Simple
          </h2>

          <p className="apply-flyixo-description">
            Complete your visa application through our simple, secure and
            professionally guided process.
          </p>
        </motion.div>

        {/* ================= TIMELINE ================= */}
        <div className="apply-flyixo-timeline">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                className="apply-flyixo-timeline-step"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="apply-flyixo-step-card"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow:
                      "0 20px 45px rgba(233, 78, 119, 0.20)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  {/* Step Icon */}
                  <div className="apply-flyixo-step-icon">
                    <div className="apply-flyixo-step-glow"></div>

                    <div
                      className={`apply-flyixo-step-ring apply-flyixo-ring-${index + 1}`}
                    >
                      {step.icon}
                    </div>

                    <div className="apply-flyixo-step-count">
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="apply-flyixo-step-content">
                    <span className="apply-flyixo-step-label">
                      STEP {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>{step.title}</h3>

                    <p>{step.desc}</p>

                    <div className="apply-flyixo-content-line"></div>

                    <div className="apply-flyixo-step-footer">
                      <span>Flyixo Support</span>

                      <FaArrowRight />
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <motion.div
                  className="apply-flyixo-timeline-connector"
                  initial={{
                    scaleX: 0,
                    opacity: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                    opacity: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.3,
                  }}
                >
                  <span className="apply-flyixo-connector-line"></span>

                  <span className="apply-flyixo-connector-dot"></span>

                  <span className="apply-flyixo-connector-arrow">
                    <FaArrowRight />
                  </span>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ================= TRUST AREA ================= */}
        <motion.div
          className="apply-flyixo-trust"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
        >
          <div className="apply-flyixo-trust-item">
            <FaCheckCircle />
            <span>Secure Process</span>
          </div>

          <span className="apply-flyixo-trust-divider"></span>

          <div className="apply-flyixo-trust-item">
            <FaCheckCircle />
            <span>Expert Guidance</span>
          </div>

          <span className="apply-flyixo-trust-divider"></span>

          <div className="apply-flyixo-trust-item">
            <FaCheckCircle />
            <span>Fast Processing</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ApplyFlyixo;