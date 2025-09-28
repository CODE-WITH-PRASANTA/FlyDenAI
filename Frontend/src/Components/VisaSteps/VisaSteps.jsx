import React from "react";
import "./VisaSteps.css";
import step1 from "../../assets/ab1.jpg"
import b1 from "../../assets/b1.jpg"
import step4 from "../../assets/RP.jpg"
import step3 from "../../assets/agent4.jpg"
import step2 from "../../assets/single-img-1.png"

const steps = [
  {
    id: "01",
    title: "Complete Online Form",
    desc: "Collaborate with team & partners. Get your work over the finish line.",
    img: step1,
  },
  {
    id: "02",
    title: "Documents & Payments",
    desc: "Any nonimmigrant visa applicant can pay their visa application.",
    img: step2,
  },
  {
    id: "03",
    title: "Direct Interview",
    desc: "Questions are specific questions that directly relate to the positions.",
    img: step3,
  },
  {
    id: "04",
    title: "Receive Visa",
    desc: "Compare visas to visit, work, study or join a family member already.",
    img: step4,
  },
];

const VisaSteps = () => {
  return (
    <section className="visa-steps">
      <h2 className="visa-title">
        Your visa sorted in just 4 super simple Steps
      </h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-circle">
              <img src={step.img} alt={step.title} />
              <span className="step-number">{step.id}</span>
            </div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisaSteps;
