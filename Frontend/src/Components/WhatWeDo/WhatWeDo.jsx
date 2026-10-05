import React from "react";
import "./WhatWeDo.css";

import what from "../../assets/what.webp";

const WhatWeDo = () => {
  return (
    <section className="whatwedo">

      {/* =====================================================
          BACKGROUND DECORATIONS
          ===================================================== */}

      <div className="whatwedo-bg-circle whatwedo-bg-circle-one"></div>
      <div className="whatwedo-bg-circle whatwedo-bg-circle-two"></div>

      <div className="whatwedo-bg-dot whatwedo-bg-dot-one"></div>
      <div className="whatwedo-bg-dot whatwedo-bg-dot-two"></div>


      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <div className="whatwedo-container">


        {/* ===================================================
            LEFT SIDE
            =================================================== */}

        <div className="whatwedo-left">

          {/* IMAGE AREA */}

          <div className="whatwedo-image-wrapper">

            <div className="whatwedo-image-frame">

              <img
                src={what}
                alt="What we do"
                className="whatwedo-img"
              />

              <div className="whatwedo-image-overlay"></div>

            </div>


            {/* IMAGE BADGE */}

            <div className="whatwedo-image-badge">

              <span className="whatwedo-badge-icon">
                ✈
              </span>

              <div className="whatwedo-badge-content">

                <strong>
                  Global Journey
                </strong>

                <span>
                  Starts With Flyixo
                </span>

              </div>

            </div>


            {/* DECORATION */}

            <div className="whatwedo-image-decoration">
              ✦
            </div>

          </div>


          {/* =================================================
              STATS
              ================================================= */}

          <div className="whatwedo-stats">

            {/* STAT 1 */}

            <div className="stat">

              <div className="stat-icon">
                ✓
              </div>

              <div className="stat-content">

                <div className="stat-number">
                  1200+
                </div>

                <div className="stat-label">
                  Visa Applications Processed
                </div>

              </div>

            </div>


            {/* STAT 2 */}

            <div className="stat">

              <div className="stat-icon">
                🎓
              </div>

              <div className="stat-content">

                <div className="stat-number">
                  750+
                </div>

                <div className="stat-label">
                  Students Placed Abroad
                </div>

              </div>

            </div>


            {/* STAT 3 */}

            <div className="stat">

              <div className="stat-icon">
                ★
              </div>

              <div className="stat-content">

                <div className="stat-number">
                  98%
                </div>

                <div className="stat-label">
                  Client Satisfaction Rate
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            RIGHT SIDE
            =================================================== */}

        <div className="whatwedo-right">


          {/* SECTION LABEL */}

          <div className="sub-title">

            <span className="sub-title-line"></span>

            <span>
              WHAT WE DO
            </span>

          </div>


          {/* TITLE */}

          <h2 className="title">

            Complete{" "}

            <span className="em">
              Visa & Study Abroad
            </span>{" "}

            Solutions

            <br />

            from Experienced Professionals

          </h2>


          {/* TITLE DECORATION */}

          <div className="whatwedo-title-decoration">

            <span></span>
            <span></span>
            <span></span>

          </div>


          {/* =================================================
              VISA SERVICES
              ================================================= */}

          <div className="content-block">

            <div className="content-icon">
              📄
            </div>

            <div className="content-block-inner">

              <h3>
                Visa Services
              </h3>

              <p>
                We provide end-to-end visa assistance for
                students, professionals, and travelers.
                From documentation to interview preparation,
                our experienced consultants ensure a smooth
                and stress-free visa process for every client.
              </p>

            </div>

            <span className="content-number">
              01
            </span>

          </div>


          {/* DIVIDER */}

          <div className="divider">
            <span></span>
          </div>


          {/* =================================================
              INTERN ABROAD
              ================================================= */}

          <div className="content-block">

            <div className="content-icon">
              💼
            </div>

            <div className="content-block-inner">

              <h3>
                Intern Abroad Programs
              </h3>

              <p>
                Gain valuable international experience through
                our global internship programs. We connect
                students and professionals with leading
                organizations abroad, offering opportunities
                to grow, learn, and build global networks.
              </p>

            </div>

            <span className="content-number">
              02
            </span>

          </div>


          {/* DIVIDER */}

          <div className="divider">
            <span></span>
          </div>


          {/* =================================================
              STUDY ABROAD
              ================================================= */}

          <div className="content-block">

            <div className="content-icon">
              🎓
            </div>

            <div className="content-block-inner">

              <h3>
                Study Abroad Consultancy
              </h3>

              <p>
                We help students achieve their dream of
                studying in top universities across the world.
                From course selection and application guidance
                to pre-departure support, we make your
                international education journey seamless
                and successful.
              </p>

            </div>

            <span className="content-number">
              03
            </span>

          </div>


          {/* =================================================
              BOTTOM HIGHLIGHT
              ================================================= */}

          <div className="whatwedo-bottom-card">

            <div className="whatwedo-bottom-icon">
              ✓
            </div>

            <div className="whatwedo-bottom-content">

              <strong>
                Your Journey, Our Expertise
              </strong>

              <span>
                Complete support from application to approval.
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WhatWeDo;