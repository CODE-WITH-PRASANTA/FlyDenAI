import React from "react";
import "./VisaStepsSection.css";

import {
  FaFileSignature,
  FaMoneyCheckAlt,
  FaPassport,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const VisaStepsSection = () => {
  const steps = [
    {
      id: 1,
      title: "Complete Online Registration",
      subtitle: "STEP 01",
      description:
        "Fill out the online visa application form with your personal and travel details.",
      icon: <FaFileSignature />,
      color: "#ff3b5c",
    },
    {
      id: 2,
      title: "Submit Documents & Payment",
      subtitle: "STEP 02",
      description:
        "Upload required documents and make secure payments to process your visa.",
      icon: <FaMoneyCheckAlt />,
      color: "#ff9f43",
    },
    {
      id: 3,
      title: "Receive Your Visa Approval",
      subtitle: "STEP 03",
      description:
        "Get your approved visa digitally within the given timeline.",
      icon: <FaPassport />,
      color: "#1dd1a1",
    },
  ];

  return (
    <section className="visa-steps-section">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="visa-steps-bg-glow visa-steps-bg-glow-one"></div>
      <div className="visa-steps-bg-glow visa-steps-bg-glow-two"></div>

      <div className="visa-steps-grid"></div>

      <div className="visa-steps-orbit visa-steps-orbit-one"></div>
      <div className="visa-steps-orbit visa-steps-orbit-two"></div>

      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="visa-steps-container">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="visa-steps-header">

          <div className="visa-steps-subtitle-wrapper">
            <span className="visa-steps-line"></span>

            <p className="section-subtitle">
              WORKING PROCESS
            </p>

            <span className="visa-steps-line"></span>
          </div>

          <span className="visa-steps-brand">
            FLYIXO VISA PROCESS
          </span>

          <h2 className="section-title">
            Follow These{" "}
            <span>3 Simple Steps</span>{" "}
            To Get Your Visa
          </h2>

          <p className="visa-steps-description">
            Flyixo makes the visa process simple and organized.
            Follow these three essential steps to move from
            registration to your visa approval.
          </p>

        </div>

        {/* ===================================================
            TIMELINE
        =================================================== */}

        <div className="steps-timeline">

          {steps.map((step, index) => (
            <div
              className="timeline-step"
              key={step.id}
              style={{
                "--step-color": step.color,
              }}
            >

              {/* Step Number */}
              <div className="timeline-number">
                0{step.id}
              </div>

              {/* =================================================
                  STEP CIRCLE
              ================================================= */}

              <div className="step-circle">

                <div className="step-circle-ring"></div>

                <div className="step-icon">
                  {step.icon}
                </div>

                <div className="check-dot">
                  <FaCheckCircle />
                </div>

              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="step-content">

                <div className="step-label">
                  <span></span>
                  {step.subtitle}
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </div>

              {/* =================================================
                  CONNECTOR
              ================================================= */}

              {index < steps.length - 1 && (
                <div className="connector-wrapper">

                  <div className="connector-line"></div>

                  <div className="connector-arrow">
                    <FaArrowRight />
                  </div>

                </div>
              )}

            </div>
          ))}

        </div>

        {/* ===================================================
            BOTTOM TRUST
        =================================================== */}

        <div className="visa-steps-bottom">

          <div className="visa-steps-bottom-icon">
            <FaCheckCircle />
          </div>

          <div className="visa-steps-bottom-content">

            <span>
              SIMPLE • SECURE • PROFESSIONAL
            </span>

            <p>
              Start your international journey with{" "}
              <strong>Flyixo</strong> and receive expert
              assistance throughout your visa process.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default VisaStepsSection;