import React from "react";
import "./Dummyticketwhybooking.css";

import visaIllustration from "../../assets/hf-img.webp";

const WhyBookingDocument = () => {
  return (
    <section className="flyixo-why-booking">
      {/* Background Decorations */}
      <div className="flyixo-why-booking__orb flyixo-why-booking__orb--one"></div>
      <div className="flyixo-why-booking__orb flyixo-why-booking__orb--two"></div>
      <div className="flyixo-why-booking__pattern"></div>

      <div className="flyixo-why-booking__container">
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}
        <div className="flyixo-why-booking__content">

          {/* Section Badge */}
          <div className="flyixo-why-booking__badge">
            <span className="flyixo-why-booking__badge-dot"></span>
            FLYIXO VISA DOCUMENTATION
          </div>

          {/* Heading */}
          <h2 className="flyixo-why-booking__title">
            Why Do I Need a{" "}
            <span>Flight & Hotel Booking Document</span>{" "}
            for a Visa?
          </h2>

          {/* Accent Line */}
          <div className="flyixo-why-booking__title-line">
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Paragraph One */}
          <p className="flyixo-why-booking__text">
            When applying for an international visa, most embassies and
            consulates require proof of travel arrangements. This includes a
            verifiable{" "}
            <strong>flight reservation</strong> and{" "}
            <strong>hotel booking</strong>. These documents help embassies
            confirm your travel intent, duration of stay, and return plans.
            However, you are{" "}
            <strong>not required to purchase a real ticket</strong>.
            A dummy flight reservation or temporary hotel booking is fully
            acceptable for visa applications.
          </p>

          {/* Paragraph Two */}
          <p className="flyixo-why-booking__text">
            <strong>Flyixo</strong> provides instant, fully verifiable{" "}
            <strong>
              dummy flight tickets, hotel bookings, and travel documents
            </strong>{" "}
            that meet all international visa requirements. Our documents are
            embassy-approved and suitable for:
          </p>

          {/* Visa List */}
          <div className="flyixo-why-booking__visa-list">

            <span className="flyixo-why-booking__visa-item">
              <span className="flyixo-why-booking__check">✓</span>
              Schengen Visa
            </span>

            <span className="flyixo-why-booking__visa-item">
              <span className="flyixo-why-booking__check">✓</span>
              USA Visa
            </span>

            <span className="flyixo-why-booking__visa-item">
              <span className="flyixo-why-booking__check">✓</span>
              UK Visa
            </span>

            <span className="flyixo-why-booking__visa-item">
              <span className="flyixo-why-booking__check">✓</span>
              Canada Visa
            </span>

            <span className="flyixo-why-booking__visa-item">
              <span className="flyixo-why-booking__check">✓</span>
              Dubai Visa
            </span>

            <span className="flyixo-why-booking__visa-item">
              <span className="flyixo-why-booking__check">✓</span>
              Singapore & Malaysia Visa
            </span>

            <span className="flyixo-why-booking__visa-item flyixo-why-booking__visa-item--full">
              <span className="flyixo-why-booking__check">✓</span>
              All global tourism and business visa applications
            </span>

          </div>

          {/* Paragraph Three */}
          <p className="flyixo-why-booking__text">
            With <strong>Flyixo</strong>, you avoid paying high airline and
            hotel costs upfront. We deliver your required visa documents
            within minutes, ensuring your application remains complete,
            valid, and professional.
          </p>

          {/* Highlight Box */}
          <div className="flyixo-why-booking__highlight-box">
            <span className="flyixo-why-booking__highlight-icon">
              ✓
            </span>

            <p>
              <strong>
                Fast, affordable, reliable — Flyixo is your trusted visa
                documentation partner.
              </strong>
            </p>
          </div>
        </div>

        {/* =====================================================
            RIGHT IMAGE
        ====================================================== */}
        <div className="flyixo-why-booking__visual">

          <div className="flyixo-why-booking__image-card">

            {/* Decorative Rings */}
            <div className="flyixo-why-booking__ring flyixo-ring-one"></div>
            <div className="flyixo-why-booking__ring flyixo-ring-two"></div>

            {/* Image Background */}
            <div className="flyixo-why-booking__image-glow"></div>

            <img
              src={visaIllustration}
              alt="Flyixo visa application dummy ticket document"
              className="flyixo-why-booking__image"
            />

            {/* Floating Badge */}
            <div className="flyixo-why-booking__floating-card">
              <span className="flyixo-why-booking__floating-icon">
                ✓
              </span>

              <div>
                <strong>Visa Ready</strong>
                <span>Travel Documentation</span>
              </div>
            </div>

            {/* Brand Badge */}
            <div className="flyixo-why-booking__brand-card">
              <span>FLYIXO</span>
              <small>GLOBAL VISA SERVICES</small>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyBookingDocument;