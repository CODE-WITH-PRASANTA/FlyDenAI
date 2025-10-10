import React from "react";
import "./ApplyingWithAkbar.css";
import { FaLaptopCode, FaCheckCircle, FaThumbsUp } from "react-icons/fa";

const steps = [
  { icon: <FaLaptopCode />, text: "Submit documents and pay online" },
  { icon: <FaCheckCircle />, text: "We verify documents & process your Visa application" },
  { icon: <FaThumbsUp />, text: "Receive Visa" },
];

const ApplyingWithAkbar = () => {
  return (
    <div className="applying-with-akbar">
      <h2>Applying With Akbar Is This Simple</h2>
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="icon-container">
              <div className="ring"></div>
              {step.icon}
              <div className="step-number">{index + 1}</div>
            </div>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplyingWithAkbar;
