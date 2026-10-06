import React, { useState } from "react";
import "./Milestones.css";

import b1 from "../../assets/b1.jpg";
import mile2 from "../../assets/mile2.jpg";
import b3 from "../../assets/b3.jpg";
import b4 from "../../assets/b4.jpg";
import b5 from "../../assets/agent4.jpg";

const milestones = [
  {
    year: "2021",
    title: "Launched Online Visa Consultation Services",
    desc: "Introduced virtual consultations for visa applications, making our services accessible during global restrictions.",
    img: b1,
    extra: [
      "Guided students for multiple country visa applications",
      "Provided online document verification services",
      "Introduced step-by-step visa processing assistance",
    ],
  },
  {
    year: "2022",
    title: "Expanded Study Abroad Programs",
    desc: "Partnered with top universities to offer specialized courses in technology, business, and healthcare for international students.",
    img: b5,
    extra: [
      "Introduced scholarship and funding guidance",
      "Implemented career path counseling services",
      "Streamlined admission and pre-departure support",
    ],
  },
  {
    year: "2023",
    title: "Digital Transformation & Mobile App Launch",
    desc: "Launched our official mobile application to provide clients with visa updates, course search, and appointment scheduling at their fingertips.",
    img: b4,
    extra: [
      "Real-time visa status tracking",
      "Easy online application submission",
      "Push notifications for deadlines and reminders",
    ],
  },
  {
    year: "2024",
    title: "Recognized as Top Overseas Education Consultancy",
    desc: "Received industry awards for excellence in student services, visa assistance, and professional guidance in international education.",
    img: b3,
    extra: [
      "Awarded Best Overseas Education Consultancy 2024",
      "Expanded our partner network to 750+ universities",
      "Introduced new services for work-study programs",
    ],
  },
  {
    year: "2025",
    title: "Pioneering AI-Powered Visa Solutions",
    desc: "Introduced AI-based tools for personalized course recommendations, visa document verification, and faster processing.",
    img: mile2,
    extra: [
      "AI-driven application evaluation for faster approval",
      "Customized study abroad plans for each student",
      "24/7 digital support for students worldwide",
    ],
  },
];

const Milestones = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeMilestone = milestones[activeIndex];

  const progress =
    milestones.length > 1
      ? (activeIndex / (milestones.length - 1)) * 100
      : 0;

  return (
    <section className="milestones-section">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ====================================================== */}

      <div className="milestones-bg milestones-bg-one"></div>
      <div className="milestones-bg milestones-bg-two"></div>
      <div className="milestones-bg milestones-bg-three"></div>

      <div className="milestones-grid-pattern"></div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="milestones-container">

        {/* ===================================================
            SECTION HEADER
        =================================================== */}

        <div className="milestones-header">

          <span className="milestones-eyebrow">
            FLYIXO JOURNEY
          </span>

          <h2 className="milestones-title">
            Our Major{" "}
            <span>Milestones</span>
          </h2>

          <p className="milestones-subtitle">
            Discover how Flyixo has evolved through the years,
            creating better visa, education, internship, and
            international opportunities for students and travelers.
          </p>

          <div className="milestones-heading-line">
            <span></span>
            <i></i>
            <span></span>
          </div>

        </div>

        {/* ===================================================
            TIMELINE
        =================================================== */}

        <div className="milestones-timeline-wrapper">

          <div className="milestones-timeline">

            {/* Base Line */}
            <div className="milestones-line"></div>

            {/* Active Progress */}
            <div
              className="milestones-progress"
              style={{
                width: `${progress}%`,
              }}
            ></div>

            {milestones.map((milestone, index) => {

              const isActive = index === activeIndex;
              const isCompleted = index <= activeIndex;

              return (
                <button
                  type="button"
                  key={milestone.year}
                  className={`milestones-timeline-item ${
                    isActive ? "active" : ""
                  } ${isCompleted ? "completed" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View Flyixo milestone ${milestone.year}`}
                >

                  <span className="milestones-dot-wrapper">

                    <span className="milestones-dot">
                      {isCompleted && (
                        <span className="milestones-dot-inner"></span>
                      )}
                    </span>

                  </span>

                  <span className="milestones-year">
                    {milestone.year}
                  </span>

                </button>
              );
            })}

          </div>

        </div>

        {/* ===================================================
            ACTIVE MILESTONE CARD
        =================================================== */}

        <div
          key={activeIndex}
          className={`milestones-content ${
            activeIndex % 2 === 0
              ? "left-img"
              : "right-img"
          }`}
        >

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="milestones-img-wrapper">

            <div className="milestones-img-frame">

              <img
                src={activeMilestone.img}
                alt={`Flyixo ${activeMilestone.title}`}
                className="milestones-img"
              />

              <div className="milestones-img-overlay"></div>

              <div className="milestones-image-shine"></div>

            </div>

            {/* Year Badge */}

            <div className="milestones-image-year">

              <span>FLYIXO</span>

              <strong>
                {activeMilestone.year}
              </strong>

            </div>

            {/* Decorative Corner */}

            <span className="milestones-image-corner milestones-image-corner-one"></span>
            <span className="milestones-image-corner milestones-image-corner-two"></span>

          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="milestones-text">

            <div className="milestones-content-label">
              <span className="milestones-content-number">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <span className="milestones-content-label-text">
                MILESTONE {activeMilestone.year}
              </span>
            </div>

            <h3>
              {activeMilestone.title}
            </h3>

            <p className="milestones-description">
              {activeMilestone.desc}
            </p>

            {/* Feature Points */}

            <ul className="milestones-list">

              {activeMilestone.extra.map((point, index) => (
                <li
                  key={index}
                  style={{
                    "--item-delay": `${index * 0.08}s`,
                  }}
                >
                  <span className="milestones-check">
                    ✓
                  </span>

                  <span className="milestones-point">
                    {point}
                  </span>
                </li>
              ))}

            </ul>

            {/* Navigation */}

            <div className="milestones-navigation">

              <button
                type="button"
                className="milestones-nav-btn"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === 0
                      ? milestones.length - 1
                      : current - 1
                  )
                }
                aria-label="Previous Flyixo milestone"
              >
                ←
              </button>

              <div className="milestones-counter">
                <strong>
                  {String(activeIndex + 1).padStart(2, "0")}
                </strong>

                <span>
                  /
                </span>

                <span>
                  {String(milestones.length).padStart(2, "0")}
                </span>
              </div>

              <button
                type="button"
                className="milestones-nav-btn"
                onClick={() =>
                  setActiveIndex((current) =>
                    current === milestones.length - 1
                      ? 0
                      : current + 1
                  )
                }
                aria-label="Next Flyixo milestone"
              >
                →
              </button>

            </div>

          </div>

        </div>

        {/* ===================================================
            BOTTOM TRUST AREA
        =================================================== */}

        <div className="milestones-bottom">

          <div className="milestones-bottom-line"></div>

          <p>
            Building better global opportunities with{" "}
            <strong>Flyixo</strong>.
          </p>

          <div className="milestones-bottom-line"></div>

        </div>

      </div>
    </section>
  );
};

export default Milestones;