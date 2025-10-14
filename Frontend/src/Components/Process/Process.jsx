import React from "react";
import "./Process.css";
import { FaCreditCard, FaFileUpload, FaClipboardCheck, FaThumbsUp } from "react-icons/fa";

const steps = [
  { icon: <FaCreditCard />, title: "Online Payment", desc: "Pay via our secure payment gateway safely and easily." },
  { icon: <FaFileUpload />, title: "Document Upload", desc: "Upload your required documents quickly and easily." },
  { icon: <FaClipboardCheck />, title: "Verification", desc: "We carefully verify and submit your documents for approval." },
  { icon: <FaThumbsUp />, title: "Receive Visa", desc: "Get your Malaysia Visa approved online without hassle." },
];

const Process = () => {
  return (
    <section id="process" className="process-wrapper">
      <h2 className="process-title">Our Simple Malaysia Visa Process</h2>
      <div className="process-container">
        {steps.map((step, idx) => (
          <div key={idx} className="process-card">
            <div className="process-icon">{step.icon}</div>
            <h3 className="process-step-title">{step.title}</h3>
            <p className="process-step-desc">{step.desc}</p>
            {idx !== steps.length - 1 && <div className="process-connector"></div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
