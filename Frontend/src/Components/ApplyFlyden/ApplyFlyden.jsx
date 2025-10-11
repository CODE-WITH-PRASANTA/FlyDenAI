import React from "react";
import "./ApplyFlyden.css";
import { motion } from "framer-motion";
import { FaLaptopCode, FaCheckCircle, FaThumbsUp } from "react-icons/fa";

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

const ApplyFlyden = () => {
  return (
    <motion.div
      className="ApplyFlyden-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="ApplyFlyden-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Applying With FlyDenAi Is This Simple
      </motion.h2>

      <div className="ApplyFlyden-timeline">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="ApplyFlyden-timeline-step"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="ApplyFlyden-step-card"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 30px rgba(233, 78, 119, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <div className="ApplyFlyden-step-icon">
                <div className="ApplyFlyden-step-ring"></div>
                {step.icon}
                <div className="ApplyFlyden-step-count">{index + 1}</div>
              </div>

              <div className="ApplyFlyden-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>

            {index !== steps.length - 1 && (
              <motion.div
                className="ApplyFlyden-timeline-line"
                initial={{ width: 0 }}
                whileInView={{ width: "120px" }}
                transition={{ duration: 1, delay: index * 0.3 }}
              ></motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ApplyFlyden;
