import React from "react";
import "./WorkingProcess.css";
import { FaPassport, FaMoneyBillWave, FaRegComments, FaIdCard } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Choose A Service",
    desc: "In a free hour, when our power of choice is untrammeled and",
    icon: <FaPassport />,
  },
  {
    id: 2,
    title: "Documents And Payments",
    desc: "In a free hour, when our power of choice is untrammeled and",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 3,
    title: "Request A Meeting",
    desc: "In a free hour, when our power of choice is untrammeled and",
    icon: <FaRegComments />,
  },
  {
    id: 4,
    title: "Receive Your Visa Now",
    desc: "In a free hour, when our power of choice is untrammeled and",
    icon: <FaIdCard />,
  },
];

const WorkingProcess = () => {
  return (
    <section className="workingprocess">
      <p className="workingprocess-subtitle">WORKING PROCESS</p>
      <h2 className="workingprocess-title">
        4 Step Follow You Can Get <br /> Your Visa Easily
      </h2>

      <div className="workingprocess-steps">
        {steps.map((step, index) => (
          <div key={index} className={`step-card step-${index + 1}`}>
            <div className="icon-wrapper">
              <span className="step-number">{step.id}</span>
              <div className="step-icon">{step.icon}</div>
            </div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkingProcess;
