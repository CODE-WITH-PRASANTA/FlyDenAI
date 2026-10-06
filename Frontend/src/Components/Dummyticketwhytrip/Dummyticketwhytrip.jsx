import React from "react";
import "./Dummyticketwhytrip.css";

import hostessImg from "../../assets/if-img.webp";

// ============================================================
// BULLET POINTS
// ============================================================

const bulletPoints = [
  "Valid dummy flight or hotel booking as per embassy visa requirements.",
  "Instant PDF download of your reservation — ready for visa submission.",
  "Same pricing for one-way, roundtrip, and multi-city reservations (calculated per passenger).",
  "Avoid transit through countries requiring separate transit visas such as USA or UK.",
  "Unlimited free date changes if your travel plan is updated.",
  "No cancellation charges — fully flexible service.",
];

// ============================================================
// PLANE ICON
// ============================================================

const PlaneIcon = () => (
  <svg
    className="flyixo-why-trip__plane-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M22 9.24c0-.74-.6-1.34-1.34-1.34H14L8.62 2.5H6.5l3.08 5.4H4.5L2.4 6H1l1.5 3L1 12h1.4l2.1-1.4h5.08L6.5 16h2.12L14 12.1h6.66c.74 0 1.34-.6 1.34-1.34 0-.37-.15-.71-.4-.96-.25-.25-.39-.6-.39-.96z" />
  </svg>
);

// ============================================================
// COMPONENT
// ============================================================

const WhyFlyDenAiHolidays = () => {
  return (
    <section className="flyixo-why-trip">

      {/* ======================================================
          BACKGROUND DECORATIONS
      ====================================================== */}

      <div className="flyixo-why-trip__orb flyixo-why-trip__orb--one"></div>
      <div className="flyixo-why-trip__orb flyixo-why-trip__orb--two"></div>
      <div className="flyixo-why-trip__grid"></div>

      <div className="flyixo-why-trip__container">

        {/* ====================================================
            LEFT IMAGE
        ==================================================== */}

        <div className="flyixo-why-trip__visual">

          <div className="flyixo-why-trip__image-card">

            {/* Decorative Circle */}
            <div className="flyixo-why-trip__image-glow"></div>

            <div className="flyixo-why-trip__ring flyixo-trip-ring-one"></div>
            <div className="flyixo-why-trip__ring flyixo-trip-ring-two"></div>

            <img
              src={hostessImg}
              alt="Flyixo flight and travel services"
              className="flyixo-why-trip__image"
            />

            {/* Floating Brand Card */}
            <div className="flyixo-why-trip__brand-card">
              <span className="flyixo-why-trip__brand-name">
                FLYIXO
              </span>

              <span className="flyixo-why-trip__brand-label">
                GLOBAL TRAVEL SERVICES
              </span>
            </div>

            {/* Floating Trust Card */}
            <div className="flyixo-why-trip__trust-card">

              <span className="flyixo-why-trip__trust-icon">
                ✓
              </span>

              <div className="flyixo-why-trip__trust-content">
                <strong>Trusted Service</strong>
                <span>Visa-ready documentation</span>
              </div>

            </div>

          </div>

        </div>

        {/* ====================================================
            RIGHT CONTENT
        ==================================================== */}

        <div className="flyixo-why-trip__content">

          {/* Section Badge */}
          <div className="flyixo-why-trip__badge">
            <span className="flyixo-why-trip__badge-dot"></span>
            WHY CHOOSE FLYIXO
          </div>

          {/* Heading */}
          <h2 className="flyixo-why-trip__heading">
            Why Choose{" "}
            <span>Flyixo Holidays?</span>
          </h2>

          {/* Heading Accent */}
          <div className="flyixo-why-trip__heading-line">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Intro */}
          <p className="flyixo-why-trip__intro">
            Flyixo brings over a decade of professional expertise in travel,
            tourism, and visa documentation services. We stay updated with the
            latest visa requirements for countries across Europe, Asia, Africa,
            the Americas, Australia & New Zealand — ensuring your documents stay
            compliant, reliable, and embassy-ready.
          </p>

          <p className="flyixo-why-trip__intro flyixo-why-trip__intro--last">
            Our goal is to minimize your travel risks and make your visa process
            smooth and stress-free.
          </p>

          {/* ==================================================
              BENEFIT LIST
          ================================================== */}

          <ul className="flyixo-why-trip__list">

            {bulletPoints.map((text, index) => (
              <li
                className="flyixo-why-trip__list-item"
                key={index}
              >

                {/* Number */}
                <span className="flyixo-why-trip__item-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <span className="flyixo-why-trip__icon-wrap">
                  <PlaneIcon />
                </span>

                {/* Text */}
                <span className="flyixo-why-trip__item-text">
                  {text}
                </span>

              </li>
            ))}

          </ul>

          {/* Bottom Trust */}
          <div className="flyixo-why-trip__bottom">

            <span className="flyixo-why-trip__bottom-check">
              ✓
            </span>

            <p>
              Flexible. Reliable. Visa-ready.
              <strong> Flyixo.</strong>
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyFlyDenAiHolidays;