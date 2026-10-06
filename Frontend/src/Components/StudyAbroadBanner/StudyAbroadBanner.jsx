import React, { useState } from "react";
import "./StudyAbroadBanner.css";
import bgImage from "../../assets/slider2.webp";

function StudyAbroadBanner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Form submitted!");

    console.log(formData);
  };

  return (
    <section
      className="flyixo-study-banner"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="flyixo-study-banner-overlay"></div>

      <div className="flyixo-study-banner-glow flyixo-study-banner-glow-one"></div>

      <div className="flyixo-study-banner-glow flyixo-study-banner-glow-two"></div>

      <div className="flyixo-study-banner-grid"></div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="flyixo-study-banner-container">

        {/* ===================================================
            LEFT CONTENT
        ==================================================== */}

        <div className="flyixo-study-banner-left">

          {/* Brand Badge */}
          <div className="flyixo-study-banner-badge">
            <span className="flyixo-study-banner-badge-dot"></span>

            FLYIXO STUDY ABROAD
          </div>

          {/* Main Heading */}
          <h1 className="flyixo-study-banner-title">
            Take the First Step to
            <span>STUDY ABROAD</span>
          </h1>

          {/* Subtitle */}
          <p className="flyixo-study-banner-subtitle">
            Unlock your global career opportunities with our expert
            guidance. Study at top universities abroad and achieve
            your dreams with ease.
          </p>

          {/* Benefits */}
          <ul className="flyixo-study-banner-benefits">

            <li>
              <span className="flyixo-study-banner-benefit-icon">
                🌏
              </span>

              <span>
                Affordable courses starting from ₹8 Lakhs*
              </span>
            </li>

            <li>
              <span className="flyixo-study-banner-benefit-icon">
                🎓
              </span>

              <span>
                Scholarships up to ₹10,00,000*
              </span>
            </li>

            <li>
              <span className="flyixo-study-banner-benefit-icon">
                📄
              </span>

              <span>
                Offer letter guaranteed in less than 48 hours*
              </span>
            </li>

            <li>
              <span className="flyixo-study-banner-benefit-icon">
                💼
              </span>

              <span>
                Expert counselling and application guidance
              </span>
            </li>

            <li>
              <span className="flyixo-study-banner-benefit-icon">
                ✈️
              </span>

              <span>
                Assistance with visa, travel, and accommodation
              </span>
            </li>

          </ul>

          {/* Note */}
          <p className="flyixo-study-banner-note">
            *Terms & conditions apply. We ensure a smooth and
            stress-free process for every student.
          </p>

          {/* Trust */}
          <div className="flyixo-study-banner-trust">

            <div className="flyixo-study-banner-trust-icon">
              ✓
            </div>

            <div>
              <strong>Start Your Global Journey With Flyixo</strong>

              <span>
                Professional guidance from application to arrival
              </span>
            </div>

          </div>

        </div>

        {/* ===================================================
            RIGHT FORM
        ==================================================== */}

        <div className="flyixo-study-banner-right">

          <div className="flyixo-study-banner-form-card">

            {/* Form Header */}
            <div className="flyixo-study-banner-form-header">

              <div className="flyixo-study-banner-form-icon">
                ✈
              </div>

              <div>
                <span className="flyixo-study-banner-form-label">
                  FREE CONSULTATION
                </span>

                <h2>
                  Start Your Study Abroad Journey
                </h2>
              </div>

            </div>

            {/* Accent */}
            <div className="flyixo-study-banner-form-line">
              <span></span>
            </div>

            {/* Form */}
            <form
              className="flyixo-study-banner-form"
              onSubmit={handleSubmit}
            >

              {/* Name */}
              <div className="flyixo-study-banner-field">

                <label htmlFor="study-name">
                  Full Name
                </label>

                <div className="flyixo-study-banner-input-wrapper">

                  <span className="flyixo-study-banner-input-icon">
                    👤
                  </span>

                  <input
                    id="study-name"
                    type="text"
                    name="name"
                    placeholder="Enter Full Name*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Email */}
              <div className="flyixo-study-banner-field">

                <label htmlFor="study-email">
                  Email Address
                </label>

                <div className="flyixo-study-banner-input-wrapper">

                  <span className="flyixo-study-banner-input-icon">
                    ✉
                  </span>

                  <input
                    id="study-email"
                    type="email"
                    name="email"
                    placeholder="Enter Email Address*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Mobile */}
              <div className="flyixo-study-banner-field">

                <label htmlFor="study-mobile">
                  Mobile Number
                </label>

                <div className="flyixo-study-banner-phone">

                  <span className="flyixo-study-banner-country">
                    🇮🇳
                    <strong>+91</strong>
                  </span>

                  <input
                    id="study-mobile"
                    type="tel"
                    name="mobile"
                    placeholder="Mobile number*"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Pincode */}
              <div className="flyixo-study-banner-field">

                <label htmlFor="study-pincode">
                  Pincode
                </label>

                <div className="flyixo-study-banner-input-wrapper">

                  <span className="flyixo-study-banner-input-icon">
                    📍
                  </span>

                  <input
                    id="study-pincode"
                    type="text"
                    name="pincode"
                    placeholder="Pincode*"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Checkbox */}
              <label className="flyixo-study-banner-checkbox">

                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  required
                />

                <span className="flyixo-study-banner-checkbox-mark"></span>

                <span className="flyixo-study-banner-checkbox-text">
                  I have read and agreed to{" "}
                  <a href="#">
                    terms & privacy policy
                  </a>
                </span>

              </label>

              {/* Submit */}
              <button
                type="submit"
                className="flyixo-study-banner-submit"
              >
                <span>
                  Book Your Free Consultation
                </span>

                <span className="flyixo-study-banner-submit-arrow">
                  →
                </span>
              </button>

            </form>

            {/* Form Footer */}
            <div className="flyixo-study-banner-form-footer">

              <span className="flyixo-study-banner-secure-icon">
                🔒
              </span>

              <span>
                Your information is safe and confidential
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM BRAND
      ====================================================== */}

      <div className="flyixo-study-banner-bottom">

        <span></span>

        <p>
          Explore Global Opportunities With{" "}
          <strong>Flyixo</strong>
        </p>

        <span></span>

      </div>
    </section>
  );
}

export default StudyAbroadBanner;