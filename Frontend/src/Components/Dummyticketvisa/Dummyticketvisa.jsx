import React from "react";
import "./Dummyticketvisa.css";

// ============================================================
// BACKGROUND IMAGE
// ============================================================

import bgImage from "../../assets/af-img.webp";

// ============================================================
// STEP IMAGES
// ============================================================

import searchImg from "../../assets/cf-img.webp";
import selectImg from "../../assets/df-img.webp";
import confirmImg from "../../assets/ef-img.webp";
import downloadImg from "../../assets/ff-img.webp";

// ============================================================
// STEP DATA
// ============================================================

const steps = [
  {
    id: 1,
    img: searchImg,
    title: ["SEARCH FOR", "FLIGHT / HOTEL"],
    description:
      "Enter your travel details and let Flyixo instantly fetch the best dummy flight or hotel options for visa purposes.",
  },
  {
    id: 2,
    img: selectImg,
    title: ["CHOOSE YOUR", "ITINERARY"],
    description:
      "Review flight or hotel options and pick the travel itinerary that best fits your visa requirements.",
  },
  {
    id: 3,
    img: confirmImg,
    title: ["CONFIRM YOUR", "BOOKING"],
    description:
      "Fill in basic traveler information and proceed with secure payment to generate your visa-ready booking document.",
  },
  {
    id: 4,
    img: downloadImg,
    title: ["DOWNLOAD YOUR", "VISA DOCUMENT"],
    description:
      "Your dummy flight ticket or hotel booking PDF will be instantly ready to download and submit to the embassy.",
  },
];

// ============================================================
// COMPONENT
// ============================================================

const Dummyticketvisa = () => {
  return (
    <section
      className="flyixo-dummy-visa"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* ======================================================
          BACKGROUND OVERLAY
      ====================================================== */}

      <div className="flyixo-dummy-visa-overlay"></div>

      {/* Decorative Elements */}
      <div className="flyixo-dummy-visa-orb flyixo-orb-one"></div>
      <div className="flyixo-dummy-visa-orb flyixo-orb-two"></div>
      <div className="flyixo-dummy-visa-orb flyixo-orb-three"></div>

      <div className="flyixo-dummy-visa-container">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="flyixo-dummy-visa-header">

          <div className="flyixo-dummy-visa-badge">
            <span className="flyixo-badge-dot"></span>
            FLYIXO VISA DOCUMENT SERVICES
          </div>

          <h2 className="flyixo-dummy-visa-heading">
            With{" "}
            <span className="flyixo-brand">
              Flyixo
            </span>
            , getting a dummy flight or hotel booking for your visa is{" "}
            <span className="flyixo-highlight">
              EASIER than ever!
            </span>
          </h2>

          <p className="flyixo-dummy-visa-subtitle">
            Follow four simple steps to create your visa-ready
            flight or hotel booking document quickly and easily.
          </p>

        </div>

        {/* ====================================================
            STEPS
        ==================================================== */}

        <div className="flyixo-steps-grid">

          {steps.map((step, index) => (
            <article
              className="flyixo-step-card"
              key={step.id}
            >

              {/* =================================================
                  STEP NUMBER
              ================================================= */}

              <div className="flyixo-step-number">
                <span>
                  {String(step.id).padStart(2, "0")}
                </span>
              </div>

              {/* =================================================
                  TOP ACCENT
              ================================================= */}

              <div className="flyixo-step-accent"></div>

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="flyixo-step-image-wrapper">

                <div className="flyixo-step-image-glow"></div>

                <img
                  src={step.img}
                  alt={`${step.title[0]} ${step.title[1]}`}
                  className="flyixo-step-img"
                />

              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <h3 className="flyixo-step-title">
                <span>{step.title[0]}</span>
                <span>{step.title[1]}</span>
              </h3>

              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div className="flyixo-step-divider">
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p className="flyixo-step-text">
                {step.description}
              </p>

              {/* =================================================
                  STEP LABEL
              ================================================= */}

              <div className="flyixo-step-footer">
                <span className="flyixo-step-label">
                  STEP {String(step.id).padStart(2, "0")}
                </span>

                <span className="flyixo-step-arrow">
                  →
                </span>
              </div>

              {/* Decorative Corner */}
              <span className="flyixo-card-corner"></span>

            </article>
          ))}

        </div>

        {/* ====================================================
            BOTTOM TRUST AREA
        ==================================================== */}

        <div className="flyixo-dummy-visa-bottom">

          <span className="flyixo-bottom-line"></span>

          <div className="flyixo-bottom-content">

            <span className="flyixo-bottom-check">
              ✓
            </span>

            <p>
              Simple process
              <strong> • </strong>
              Secure payment
              <strong> • </strong>
              Visa-ready documents
              <strong> • </strong>
              <span>Flyixo</span>
            </p>

          </div>

          <span className="flyixo-bottom-line"></span>

        </div>

      </div>
    </section>
  );
};

export default Dummyticketvisa;