import React from "react";
import "./ChooseUsSection.css";
import {
  FaGlobe,
  FaHandshake,
  FaPaperPlane,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import mainImage from "../../assets/why1.webp";
import avatar1 from "../../assets/avatar-1.webp";
import avatar2 from "../../assets/avatar-2.webp";
import avatar3 from "../../assets/avatar-3.webp";
import avatar4 from "../../assets/avatar-4.webp";
import avatar5 from "../../assets/avatar-5.webp";

const features = [
  {
    icon: <FaGlobe />,
    title: "Global Visa Assistance",
    description: "Professional support for your international visa journey.",
  },
  {
    icon: <FaHandshake />,
    title: "Trusted Consultation",
    description: "Personalized guidance from experienced visa consultants.",
  },
  {
    icon: <FaPaperPlane />,
    title: "Fast & Hassle-Free Process",
    description: "Simple documentation and smooth application support.",
  },
];

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
];

const ChooseUsSection = () => {
  return (
    <section className="chooseus-section">
      {/* =====================================================
          BACKGROUND DECORATIONS
      ===================================================== */}

      <div className="chooseus-bg chooseus-bg-one"></div>
      <div className="chooseus-bg chooseus-bg-two"></div>
      <div className="chooseus-grid-pattern"></div>

      <div className="chooseus-container">
        {/* =====================================================
            LEFT CONTENT
        ===================================================== */}

        <div className="chooseus-left">
          <div className="chooseus-heading-top">
            <span className="chooseus-heading-line"></span>

            <span className="chooseus-subtitle">
              WHY CHOOSE FLYIXO
            </span>
          </div>

          <h2 className="chooseus-title">
            Trusted Visa Experts For Your
            <span> Global Journey</span>
          </h2>

          <p className="chooseus-desc">
            At <strong>Flyixo</strong>, we simplify your visa process
            with expert guidance, transparent procedures, and
            personalized support. Whether you are applying for study,
            work, or travel, we help make your international journey
            smooth and stress-free from start to finish.
          </p>

          {/* =================================================
              TRUST POINTS
          ================================================= */}

          <div className="chooseus-trust-points">
            <div className="chooseus-trust-point">
              <span className="chooseus-check">
                <FaCheckCircle />
              </span>

              <span>Expert Visa Guidance</span>
            </div>

            <div className="chooseus-trust-point">
              <span className="chooseus-check">
                <FaCheckCircle />
              </span>

              <span>Transparent Process</span>
            </div>

            <div className="chooseus-trust-point">
              <span className="chooseus-check">
                <FaCheckCircle />
              </span>

              <span>Personalized Support</span>
            </div>
          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="chooseus-features">
            {features.map((feature, index) => (
              <div
                key={index}
                className="chooseus-feature-card"
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div className="chooseus-feature-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="chooseus-icon">
                  {feature.icon}
                </div>

                <div className="chooseus-feature-content">
                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>

                <div className="chooseus-feature-arrow">
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            RIGHT IMAGE
        ===================================================== */}

        <div className="chooseus-right">
          <div className="chooseus-image-area">
            {/* Decorative ring */}
            <div className="chooseus-image-ring"></div>

            {/* Main Image */}
            <div className="chooseus-img-wrap">
              <div className="chooseus-img-border"></div>

              <img
                src={mainImage}
                alt="Flyixo Visa Assistance"
                className="chooseus-img"
              />

              <div className="chooseus-img-overlay"></div>

              {/* Image Badge */}
              <div className="chooseus-image-badge">
                <div className="chooseus-badge-icon">
                  <FaGlobe />
                </div>

                <div className="chooseus-badge-content">
                  <strong>Flyixo</strong>
                  <span>Global Visa Partner</span>
                </div>
              </div>
            </div>

            {/* =================================================
                HAPPY CLIENTS CARD
            ================================================= */}

            <div className="chooseus-trusted">
              <div className="chooseus-trusted-top">
                <div className="chooseus-trusted-icon">
                  <FaCheckCircle />
                </div>

                <div>
                  <strong>10K+</strong>
                  <span>Happy Clients</span>
                </div>
              </div>

              <div className="chooseus-avatars">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Flyixo client ${index + 1}`}
                    className="chooseus-avatar"
                  />
                ))}

                <span className="chooseus-more">+</span>
              </div>

              <p className="chooseus-trusted-text">
                Trusted by clients for their global journey
              </p>
            </div>

            {/* Floating Experience Card */}
            <div className="chooseus-floating-card">
              <span className="chooseus-floating-icon">
                <FaHandshake />
              </span>

              <div>
                <strong>Trusted</strong>
                <span>Visa Assistance</span>
              </div>
            </div>

            {/* Decorative dots */}
            <span className="chooseus-dot chooseus-dot-one"></span>
            <span className="chooseus-dot chooseus-dot-two"></span>
            <span className="chooseus-dot chooseus-dot-three"></span>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM BRAND STRIP
      ===================================================== */}

      <div className="chooseus-bottom">
        <div className="chooseus-bottom-line"></div>

        <div className="chooseus-bottom-content">
          <FaGlobe />

          <span>
            Your Global Journey Starts With
          </span>

          <strong>Flyixo</strong>
        </div>

        <div className="chooseus-bottom-line"></div>
      </div>
    </section>
  );
};

export default ChooseUsSection;