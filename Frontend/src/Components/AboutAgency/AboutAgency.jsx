import React from "react";
import "./AboutAgency.css";
import { FaPassport, FaRegClock, FaArrowRight } from "react-icons/fa";

import i1 from "../../assets/col-bgimage-12.jpg";
import i2 from "../../assets/col-bgimage-12.jpg";

const AboutAgency = () => {
  return (
    <section className="aboutagency-section">

      {/* Background Decorations */}
      <div className="aboutagency-bg aboutagency-bg-one"></div>
      <div className="aboutagency-bg aboutagency-bg-two"></div>
      <div className="aboutagency-grid-pattern"></div>

      <div className="aboutagency-container">

        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <div className="aboutagency-image-wrapper">

          <div className="aboutagency-image-frame">

            <img
              src={i1}
              alt="Flyixo Global Opportunities"
              className="aboutagency-main-image"
            />

            <div className="aboutagency-image-overlay"></div>

            <div className="aboutagency-image-shine"></div>

          </div>

          {/* Floating Welcome Badge */}

          <div className="aboutagency-welcome">
            <span className="aboutagency-welcome-small">
              WELCOME TO
            </span>

            <strong>
              Flyixo
            </strong>

            <span className="aboutagency-welcome-text">
              Global Services
            </span>
          </div>

          {/* Experience Badge */}

          <div className="aboutagency-experience">
            <strong>10+</strong>
            <span>Years of<br />Experience</span>
          </div>

          {/* Decorative Corners */}

          <span className="aboutagency-corner aboutagency-corner-one"></span>
          <span className="aboutagency-corner aboutagency-corner-two"></span>

        </div>

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

        <div className="aboutagency-content">

          {/* Subtitle */}

          <div className="aboutagency-subtitle-wrapper">

            <span className="aboutagency-subtitle-line"></span>

            <p className="aboutagency-subtitle">
              OUR SERVICES
            </p>

          </div>

          {/* Title */}

          <h2 className="aboutagency-title">
            Your Gateway To{" "}
            <span className="highlight-red">
              Visa
            </span>
            ,{" "}
            <span className="highlight-red">
              Intern Abroad
            </span>
            , And{" "}
            <span className="highlight-red">
              Study Abroad
            </span>
          </h2>

          {/* Description */}

          <p className="aboutagency-description">
            Flyixo helps students and professionals explore global
            opportunities with expert guidance in visa processing,
            international internships, and studying abroad programs.
            We make your international journey simpler, clearer,
            and more successful.
          </p>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="aboutagency-features">

            {/* Visa Services */}

            <div className="aboutagency-feature">

              <div className="aboutagency-icon red-bg">
                <FaPassport />
              </div>

              <div className="aboutagency-feature-content">

                <span className="aboutagency-feature-label">
                  01
                </span>

                <h4>
                  Visa Services
                </h4>

                <p>
                  Fast and easy student, work, and travel visa
                  support with professional documentation guidance.
                </p>

              </div>

              <span className="aboutagency-feature-arrow">
                <FaArrowRight />
              </span>

            </div>

            {/* Intern Abroad */}

            <div className="aboutagency-feature">

              <div className="aboutagency-icon light-bg">
                <FaRegClock />
              </div>

              <div className="aboutagency-feature-content">

                <span className="aboutagency-feature-label">
                  02
                </span>

                <h4>
                  Intern Abroad
                </h4>

                <p>
                  Gain global work experience and grow your skills
                  through international internship opportunities.
                </p>

              </div>

              <span className="aboutagency-feature-arrow">
                <FaArrowRight />
              </span>

            </div>

          </div>

          {/* =================================================
              SMALL STUDY ABROAD CARD
          ================================================= */}

          <div className="aboutagency-small">

            <div className="aboutagency-small-image-wrapper">

              <img
                src={i2}
                alt="Flyixo Study Abroad"
                className="aboutagency-small-image"
              />

              <span className="aboutagency-small-image-icon">
                ✦
              </span>

            </div>

            <div className="aboutagency-small-content">

              <span className="aboutagency-small-label">
                STUDY ABROAD
              </span>

              <p>
                Our study abroad consultancy helps students choose
                the right universities, apply successfully, and
                settle abroad with ease.
              </p>

            </div>

            <div className="aboutagency-small-arrow">
              <FaArrowRight />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutAgency;