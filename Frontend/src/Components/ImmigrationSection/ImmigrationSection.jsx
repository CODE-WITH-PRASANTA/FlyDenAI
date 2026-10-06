import React from "react";
import "./ImmigrationSection.css";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import agent1 from "../../assets/agent1.jpg";
import agent2 from "../../assets/agent2.jpg";
import agent3 from "../../assets/agent3.jpg";
import agent4 from "../../assets/agent4.jpg";

import im1 from "../../assets/im1.png";
import img1 from "../../assets/single-img-1.png";

const ImmigrationSection = () => {
  return (
    <section className="immigrationsec-section">
      {/* Background Decorations */}
      <div className="immigrationsec-bg-circle immigrationsec-bg-circle-one"></div>
      <div className="immigrationsec-bg-circle immigrationsec-bg-circle-two"></div>

      <div className="immigrationsec-container">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}
        <div className="immigrationsec-left">

          {/* Eyebrow */}
          <div className="immigrationsec-eyebrow">
            <span className="immigrationsec-eyebrow-line"></span>

            <p className="immigrationsec-tagline">
              OPEN NEW GLOBAL OPPORTUNITIES
            </p>
          </div>

          {/* Title */}
          <h2 className="immigrationsec-title">
            <span className="immigrationsec-title-main">
              Flyixo
            </span>{" "}
            <span className="immigrationsec-italic-red">
              Visa & Abroad
            </span>{" "}
            Services
          </h2>

          {/* Description */}
          <p className="immigrationsec-desc">
            We simplify international opportunities with professional
            services for Visa applications, global internships, and
            studying abroad. Flyixo makes your journey smooth,
            reliable, and successful.
          </p>

          {/* =================================================
              SERVICE BOX
          ================================================= */}
          <div className="immigrationsec-info-box">

            {/* Visa Service */}
            <div className="immigrationsec-service">

              <div className="immigrationsec-info-image-wrapper">
                <img
                  src={img1}
                  alt="Visa Service"
                  className="immigrationsec-info-img"
                />

                <span className="immigrationsec-service-check">
                  <FaCheckCircle />
                </span>
              </div>

              <div className="immigrationsec-info-content">
                <h3 className="immigrationsec-info-title">
                  Visa Services
                </h3>

                <p className="immigrationsec-info-text">
                  Get complete guidance for student, work, or travel
                  visas. We handle documentation, preparation, and
                  submission for faster approvals.
                </p>
              </div>

            </div>

            {/* Intern Abroad */}
            <div className="immigrationsec-service">

              <div className="immigrationsec-info-image-wrapper">
                <img
                  src={img1}
                  alt="Intern Abroad"
                  className="immigrationsec-info-img"
                />

                <span className="immigrationsec-service-check">
                  <FaCheckCircle />
                </span>
              </div>

              <div className="immigrationsec-info-content">
                <h3 className="immigrationsec-info-title">
                  Intern Abroad
                </h3>

                <p className="immigrationsec-info-text">
                  Gain international experience with our global
                  internship programs. Learn, grow, and build your
                  professional network abroad.
                </p>
              </div>

            </div>

            {/* Study Abroad */}
            <div className="immigrationsec-service">

              <div className="immigrationsec-info-image-wrapper">
                <img
                  src={img1}
                  alt="Study Abroad"
                  className="immigrationsec-info-img"
                />

                <span className="immigrationsec-service-check">
                  <FaCheckCircle />
                </span>
              </div>

              <div className="immigrationsec-info-content">
                <h3 className="immigrationsec-info-title">
                  Study Abroad
                </h3>

                <p className="immigrationsec-info-text">
                  Pursue your dream education overseas. We assist
                  with university selection, applications, and
                  pre-departure support for a smooth journey.
                </p>
              </div>

            </div>

          </div>

          {/* =================================================
              ACTION / CONSULTANTS
          ================================================= */}
          <div className="immigrationsec-action-row">

            {/* Optional Button */}
            <button
              type="button"
              className="immigrationsec-btn-explore"
            >
              Explore Services
              <FaArrowRight />
            </button>

            {/* Consultant Avatars */}
            <div className="immigrationsec-avatars-wrapper">

              <div className="immigrationsec-avatars">

                <img
                  src={agent1}
                  alt="Experienced consultant"
                  className="immigrationsec-avatar"
                />

                <img
                  src={agent2}
                  alt="Experienced consultant"
                  className="immigrationsec-avatar"
                />

                <img
                  src={agent3}
                  alt="Experienced consultant"
                  className="immigrationsec-avatar"
                />

                <img
                  src={agent4}
                  alt="Experienced consultant"
                  className="immigrationsec-avatar"
                />

              </div>

              <div className="immigrationsec-agents-content">
                <strong className="immigrationsec-agents">
                  200+
                </strong>

                <span className="immigrationsec-agents-label">
                  Experienced Consultants
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}
        <div className="immigrationsec-right">

          <div className="immigrationsec-image-card">

            {/* Image */}
            <img
              src={im1}
              alt="Flyixo immigration and abroad services"
              className="immigrationsec-main-img"
            />

            {/* Image Overlay */}
            <div className="immigrationsec-image-overlay"></div>

            {/* Floating Badge */}
            <div className="immigrationsec-floating-badge">
              <span className="immigrationsec-badge-dot"></span>

              <div>
                <strong>Global</strong>
                <small>Opportunities</small>
              </div>
            </div>

            {/* Bottom Badge */}
            <div className="immigrationsec-image-caption">
              <span className="immigrationsec-caption-line"></span>

              <span>
                Your Journey Starts Here
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ImmigrationSection;