import React from "react";
import "./AboutSection.css";

import mainImage from "../../assets/about1.webp";
import personImage from "../../assets/newsblog2.webp";

const AboutSection = () => {
  return (
    <section className="aboutsec-section">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ===================================================== */}

      <div className="aboutsec-bg aboutsec-bg-one"></div>
      <div className="aboutsec-bg aboutsec-bg-two"></div>

      <div className="aboutsec-pattern"></div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="aboutsec-container">

        {/* =====================================================
            LEFT IMAGE AREA
        ===================================================== */}

        <div className="aboutsec-left">

          <div className="aboutsec-image-wrapper">

            {/* Main Image */}
            <div className="aboutsec-main-image-box">

              <img
                src={mainImage}
                alt="Flyixo Global Visa and Study Abroad Services"
                className="aboutsec-main-image"
              />

              <div className="aboutsec-image-overlay"></div>

              <div className="aboutsec-image-shine"></div>

            </div>

            {/* Small Image */}
            <div className="aboutsec-small-image">

              <img
                src={personImage}
                alt="Flyixo International Consultancy"
              />

              <div className="aboutsec-small-overlay"></div>

            </div>

            {/* Experience Badge */}
            <div className="aboutsec-experience-badge">

              <span>WE'RE</span>

              <h2>25+</h2>

              <p>Years Of Experience</p>

            </div>

            {/* Floating Label */}
            <div className="aboutsec-floating-label">

              <span className="aboutsec-floating-dot"></span>

              <div>
                <strong>Flyixo</strong>
                <small>Global Journey Partner</small>
              </div>

            </div>

            {/* Decorative Corners */}
            <span className="aboutsec-corner aboutsec-corner-one"></span>
            <span className="aboutsec-corner aboutsec-corner-two"></span>

          </div>

        </div>

        {/* =====================================================
            RIGHT CONTENT
        ===================================================== */}

        <div className="aboutsec-right">

          {/* Section Label */}
          <div className="aboutsec-subtitle-wrapper">

            <span className="aboutsec-subtitle-line"></span>

            <p className="aboutsec-sub-title">
              ABOUT FLYIXO
            </p>

          </div>

          {/* Heading */}
          <h1 className="aboutsec-heading">
            Your Global Visa &{" "}
            <span>Study Abroad Partner</span>
          </h1>

          {/* Description */}
          <p className="aboutsec-description">
            At <strong>Flyixo</strong>, we simplify international travel and
            career opportunities. From visa applications to study abroad
            programs and internships abroad, our expert team guides you
            through every step. Trusted by thousands of satisfied clients
            worldwide, we ensure a seamless experience for your global journey.
          </p>

          {/* Small Trust Row */}
          <div className="aboutsec-trust-row">

            <div className="aboutsec-trust-item">
              <span className="aboutsec-trust-icon">✓</span>
              <span>Expert Guidance</span>
            </div>

            <div className="aboutsec-trust-item">
              <span className="aboutsec-trust-icon">✓</span>
              <span>Global Support</span>
            </div>

            <div className="aboutsec-trust-item">
              <span className="aboutsec-trust-icon">✓</span>
              <span>Trusted Service</span>
            </div>

          </div>

          {/* =====================================================
              FEATURES
          ===================================================== */}

          <div className="aboutsec-features">

            {/* Feature 1 */}
            <div className="aboutsec-feature">

              <div className="aboutsec-icon">
                📝
              </div>

              <div className="aboutsec-feature-content">

                <h4 className="aboutsec-feature-title">
                  All-Country Visa Services
                </h4>

                <p className="aboutsec-feature-desc">
                  Expert support for visas to every country, ensuring
                  approvals faster and easier.
                </p>

              </div>

              <span className="aboutsec-feature-number">
                01
              </span>

            </div>

            {/* Feature 2 */}
            <div className="aboutsec-feature">

              <div className="aboutsec-icon">
                🎓
              </div>

              <div className="aboutsec-feature-content">

                <h4 className="aboutsec-feature-title">
                  Study Abroad Programs
                </h4>

                <p className="aboutsec-feature-desc">
                  Guidance on selecting top universities, application
                  process, and smooth admission.
                </p>

              </div>

              <span className="aboutsec-feature-number">
                02
              </span>

            </div>

            {/* Feature 3 */}
            <div className="aboutsec-feature">

              <div className="aboutsec-icon">
                💼
              </div>

              <div className="aboutsec-feature-content">

                <h4 className="aboutsec-feature-title">
                  Intern Abroad Opportunities
                </h4>

                <p className="aboutsec-feature-desc">
                  Hands-on internship programs internationally, building
                  your career and experience.
                </p>

              </div>

              <span className="aboutsec-feature-number">
                03
              </span>

            </div>

            {/* Feature 4 */}
            <div className="aboutsec-feature">

              <div className="aboutsec-icon">
                💻
              </div>

              <div className="aboutsec-feature-content">

                <h4 className="aboutsec-feature-title">
                  Free Online Consultation
                </h4>

                <p className="aboutsec-feature-desc">
                  Get expert advice online before applying, completely
                  free of charge.
                </p>

              </div>

              <span className="aboutsec-feature-number">
                04
              </span>

            </div>

          </div>

          {/* =====================================================
              BOTTOM BRAND AREA
          ===================================================== */}

          <div className="aboutsec-bottom">

            <div className="aboutsec-bottom-mark">
              F
            </div>

            <div className="aboutsec-bottom-content">

              <span>
                START YOUR GLOBAL JOURNEY
              </span>

              <p>
                Professional visa, study abroad and international
                career assistance with <strong>Flyixo</strong>.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutSection;