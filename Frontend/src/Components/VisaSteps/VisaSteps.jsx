import React from "react";
import "./VisaSteps.css";

import step1 from "../../assets/ab1.jpg";
import step2 from "../../assets/single-img-1.png";
import step3 from "../../assets/agent4.jpg";
import step4 from "../../assets/RP.jpg";

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
      {/* Background Decorations */}
      <div className="visa-steps__background visa-steps__background--one"></div>
      <div className="visa-steps__background visa-steps__background--two"></div>
      <div className="visa-steps__background visa-steps__background--three"></div>

      <div className="visa-steps__container">

        {/* Section Header */}
        <div className="visa-steps__header">
          <span className="visa-steps__eyebrow">
            FLYIXO VISA PROCESS
          </span>

          <h2 className="visa-steps__title">
            Your Visa Sorted in Just{" "}
            <span>4 Super Simple Steps</span>
          </h2>

          <p className="visa-steps__subtitle">
            From your first application to receiving your visa,
            Flyixo makes the entire process simple, transparent,
            and stress-free.
          </p>

          <div className="visa-steps__title-line">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="visa-steps__grid">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>

              <div
                className="visa-steps__card"
                style={{
                  "--step-delay": `${index * 0.12}s`,
                }}
              >
                {/* Step Image */}
                <div className="visa-steps__circle-wrapper">

                  <div className="visa-steps__circle">
                    <img
                      src={step.img}
                      alt={`Flyixo ${step.title}`}
                      className="visa-steps__image"
                    />

                    <div className="visa-steps__image-overlay"></div>

                    <span className="visa-steps__number">
                      {step.id}
                    </span>
                  </div>

                  {/* Decorative Ring */}
                  <div className="visa-steps__circle-ring"></div>

                  {/* Floating Dot */}
                  <span className="visa-steps__floating-dot"></span>
                </div>

                {/* Card Content */}
                <div className="visa-steps__content">

                  <span className="visa-steps__step-label">
                    STEP {step.id}
                  </span>

                  <h3 className="visa-steps__card-title">
                    {step.title}
                  </h3>

                  <p className="visa-steps__card-desc">
                    {step.desc}
                  </p>

                </div>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="visa-steps__connector">
                  <span className="visa-steps__connector-line"></span>
                  <span className="visa-steps__connector-arrow">
                    →
                  </span>
                </div>
              )}

            </React.Fragment>
          ))}
        </div>

        {/* Bottom Trust Text */}
        <div className="visa-steps__bottom">
          <div className="visa-steps__bottom-line"></div>

          <p>
            <strong>Flyixo</strong> makes your international journey
            easier from application to approval.
          </p>

          <div className="visa-steps__bottom-line"></div>
        </div>

      </div>
    </section>
  );
};

export default VisaSteps;