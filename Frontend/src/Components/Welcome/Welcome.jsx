import React from "react";
import "./Welcome.css";

// =====================================================
// ASSETS
// =====================================================

import passportImg from "../../assets/single-img-1.png";
import travelerImg from "../../assets/single-img-2.webp";


// =====================================================
// WELCOME COMPONENT
// =====================================================

const Welcome = () => {
  return (
    <section className="welcome-section">

      {/* =================================================
          DECORATIVE BACKGROUND ELEMENTS
          ================================================= */}

      <div className="welcome-bg-circle welcome-bg-circle-one"></div>

      <div className="welcome-bg-circle welcome-bg-circle-two"></div>

      <div className="welcome-bg-dot welcome-bg-dot-one"></div>

      <div className="welcome-bg-dot welcome-bg-dot-two"></div>


      {/* =================================================
          MAIN CONTAINER
          ================================================= */}

      <div className="welcome-container">


        {/* =================================================
            LEFT SIDE
            ================================================= */}

        <div className="welcome-left">


          {/* =================================================
              IMAGE WRAPPER
              ================================================= */}

          <div className="welcome-image-wrapper">


            {/* IMAGE BACKGROUND */}
            <div className="passport-image-container">

              <img
                src={passportImg}
                alt="Passport and travel"
                className="passport-bg"
              />

              {/* IMAGE OVERLAY */}
              <div className="passport-overlay"></div>

            </div>


            {/* =================================================
                TRAVELER IMAGE
                ================================================= */}

            <div className="traveler-wrapper">

              <img
                src={travelerImg}
                alt="Traveler"
                className="traveler"
              />

            </div>


            {/* =================================================
                FLOATING EXPERIENCE CARD
                ================================================= */}

            <div className="welcome-floating-card">

              <div className="welcome-floating-icon">
                ✈️
              </div>

              <div className="welcome-floating-content">

                <strong>
                  Global Journey
                </strong>

                <span>
                  Starts With Flyixo
                </span>

              </div>

            </div>


            {/* =================================================
                SMALL DECORATION
                ================================================= */}

            <div className="welcome-image-decoration">
              ✦
            </div>

          </div>

        </div>


        {/* =================================================
            RIGHT SIDE
            ================================================= */}

        <div className="welcome-right">


          {/* =================================================
              SECTION LABEL
              ================================================= */}

          <div className="welcome-badge">

            <span className="welcome-badge-icon">
              ✈
            </span>

            <span>
              Your Journey Starts Here
            </span>

          </div>


          {/* =================================================
              TITLE
              ================================================= */}

          <h2 className="welcome-title">

            Welcome to{" "}

            <span className="highlight">
              Flyixo
            </span>

          </h2>


          {/* =================================================
              TITLE UNDERLINE
              ================================================= */}

          <div className="welcome-title-line">

            <span></span>
            <span></span>
            <span></span>

          </div>


          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <p className="welcome-text">

            Your trusted platform for{" "}

            <strong>
              Visa Booking
            </strong>
            ,{" "}

            <strong>
              Study Abroad
            </strong>
            , and{" "}

            <strong>
              Intern Abroad
            </strong>{" "}

            opportunities. We simplify every step with expert
            guidance and smart tools for a seamless journey.

          </p>


          {/* =================================================
              BENEFITS
              ================================================= */}

          <ul className="benefits-list">


            {/* BENEFIT 1 */}

            <li>

              <span className="check">
                ✓
              </span>

              <span className="benefit-text">
                Fast and reliable Visa Booking with real-time
                updates
              </span>

            </li>


            {/* BENEFIT 2 */}

            <li>

              <span className="check">
                ✓
              </span>

              <span className="benefit-text">
                Step-by-step guidance for Study Abroad programs
              </span>

            </li>


            {/* BENEFIT 3 */}

            <li>

              <span className="check">
                ✓
              </span>

              <span className="benefit-text">
                Access paid Intern Abroad opportunities
                worldwide
              </span>

            </li>


            {/* BENEFIT 4 */}

            <li>

              <span className="check">
                ✓
              </span>

              <span className="benefit-text">
                24/7 expert support for every application
              </span>

            </li>


            {/* BENEFIT 5 */}

            <li>

              <span className="check">
                ✓
              </span>

              <span className="benefit-text">
                Smart tracking system for fast approval and
                updates
              </span>

            </li>

          </ul>


          {/* =================================================
              BOTTOM STATS
              ================================================= */}

          <div className="welcome-stats">


            {/* STAT 1 */}

            <div className="welcome-stat">

              <span className="welcome-stat-number">
                24/7
              </span>

              <span className="welcome-stat-label">
                Expert Support
              </span>

            </div>


            <div className="welcome-stat-divider"></div>


            {/* STAT 2 */}

            <div className="welcome-stat">

              <span className="welcome-stat-number">
                100%
              </span>

              <span className="welcome-stat-label">
                Guidance
              </span>

            </div>


            <div className="welcome-stat-divider"></div>


            {/* STAT 3 */}

            <div className="welcome-stat">

              <span className="welcome-stat-number">
                Global
              </span>

              <span className="welcome-stat-label">
                Opportunities
              </span>

            </div>

          </div>


        </div>

      </div>

    </section>
  );
};

export default Welcome;