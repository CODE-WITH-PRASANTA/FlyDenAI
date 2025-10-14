import React from "react";
import "./VisaStepsSection.css";
import {
  FaFileSignature,
  FaMoneyCheckAlt,
  FaPassport,
  FaCheckCircle,
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
      <div className="bg-glow"></div>
      <p className="section-subtitle">Working Process</p>
      <h2 className="section-title">
        Follow These 3 Simple Steps To Get Your Visa
      </h2>

      <div className="steps-timeline">
        {steps.map((step, index) => (
          <div className="timeline-step" key={step.id}>
            <div
              className="step-circle"
              style={{ "--step-color": step.color }}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="check-dot">
                <FaCheckCircle />
              </div>
            </div>

            <div className="step-content">
              <h3>{step.subtitle}</h3>
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div
                className="connector-line"
                style={{ "--line-color": step.color }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisaStepsSection;
