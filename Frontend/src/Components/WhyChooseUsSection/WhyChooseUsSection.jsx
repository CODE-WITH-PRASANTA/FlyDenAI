import React from "react";
import "./WhyChooseUsSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPassport,
  faCertificate,
  faGlobe,
  faHeadset,
  faBoxOpen,
  faShieldAlt,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function WhyChooseUsSection() {
  const services = [
    {
      icon: faPassport,
      text: "Visa Services for 180+ Countries",
    },
    {
      icon: faCertificate,
      text: "45+ years of expertise",
    },
    {
      icon: faGlobe,
      text: "150+ Branches Worldwide",
    },
    {
      icon: faHeadset,
      text: "Support from Start to Stamp",
    },
    {
      icon: faBoxOpen,
      text: "Doorstep Convenience",
    },
    {
      icon: faShieldAlt,
      text: "Safety & Confidentiality",
    },
  ];

  return (
    <section className="flyixo-why-section">
      {/* Background Decorations */}
      <div className="flyixo-why-bg flyixo-why-bg-one"></div>
      <div className="flyixo-why-bg flyixo-why-bg-two"></div>
      <div className="flyixo-why-grid"></div>

      <div className="flyixo-why-container">
        {/* Header */}
        <div className="flyixo-why-header">
          <div className="flyixo-why-eyebrow">
            <span className="flyixo-why-eyebrow-line"></span>

            <span>WHY FLYIXO</span>

            <span className="flyixo-why-eyebrow-line"></span>
          </div>

          <h2 className="flyixo-why-title">
            Why Choose <span>Flyixo?</span>
          </h2>

          <p className="flyixo-why-description">
            Discover the trusted services, professional expertise, and
            dedicated support that make Flyixo a reliable choice for your
            global journey.
          </p>
        </div>

        {/* Services */}
        <div className="flyixo-why-services">
          {services.map((service, index) => (
            <div
              key={index}
              className="flyixo-service-card"
            >
              {/* Card Number */}
              <span className="flyixo-service-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Top Accent */}
              <span className="flyixo-service-accent"></span>

              {/* Icon */}
              <div className="flyixo-icon-wrapper">
                <div className="flyixo-icon-glow"></div>

                <div className="flyixo-icon-container">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
              </div>

              {/* Content */}
              <div className="flyixo-service-content">
                <h3>{service.text}</h3>

                <div className="flyixo-service-check">
                  <FontAwesomeIcon icon={faCheckCircle} />

                  <span>Flyixo Advantage</span>
                </div>
              </div>

              {/* Bottom Arrow */}
              <div className="flyixo-service-arrow">
                <span>Explore</span>

                <span className="flyixo-arrow-circle">
                  →
                </span>
              </div>

              {/* Decorative Corner */}
              <span className="flyixo-card-corner"></span>
            </div>
          ))}
        </div>

        {/* Bottom Trust Area */}
        <div className="flyixo-why-bottom">
          <div className="flyixo-bottom-line"></div>

          <p>
            Professional guidance. Global opportunities.{" "}
            <strong>Flyixo</strong>.
          </p>

          <div className="flyixo-bottom-line"></div>
        </div>
      </div>
    </section>
  );
}