
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPassport,
  FaGraduationCap,
  FaBriefcase,
  FaArrowRight,
  FaCheckCircle,
  FaGlobeAmericas,
} from "react-icons/fa";

import "./ImmigrationServices.css";
import i1 from "../../assets/consoltant.webp";

const immigrationServices = [
  {
    id: 1,
    icon: <FaPassport />,
    number: "01",
    title: "Visa Booking",
    description:
      "We assist you in securing student, work, or travel visas quickly and efficiently, guiding you through every step of the process.",
    className: "immigrationservices-visa",
  },
  {
    id: 2,
    icon: <FaGraduationCap />,
    number: "02",
    title: "Study Abroad",
    description:
      "Get expert support for choosing the right universities, submitting applications, and preparing for a successful international education experience.",
    className: "immigrationservices-study",
  },
  {
    id: 3,
    icon: <FaBriefcase />,
    number: "03",
    title: "Intern Abroad",
    description:
      "Explore global internship opportunities to gain hands-on experience, enhance your skills, and expand your professional network worldwide.",
    className: "immigrationservices-intern",
  },
];

export default function ImmigrationServices() {
  const navigate = useNavigate();

  const handleConsultation = () => {
    navigate("/GetaQuotes");
  };

  return (
    <section className="immigrationservices-section">
      {/* Background decorations */}

      <div
        className="immigrationservices-background"
        aria-hidden="true"
      >
        <span className="immigrationservices-blob immigrationservices-blob-one" />
        <span className="immigrationservices-blob immigrationservices-blob-two" />
        <span className="immigrationservices-circle immigrationservices-circle-one" />
        <span className="immigrationservices-circle immigrationservices-circle-two" />
      </div>

      <div className="immigrationservices-container">
        {/* LEFT CONTENT */}

        <div className="immigrationservices-left">
          <header className="immigrationservices-header">
            <div className="immigrationservices-badge">
              <FaGlobeAmericas />
              <span>FLYIXO GLOBAL SERVICES</span>
            </div>

            <div className="immigrationservices-subtitle">
              <span className="immigrationservices-subtitle-line" />
              <h4>OUR EXPERTISE</h4>
            </div>

            <h2 className="immigrationservices-title">
              Professional Services For{" "}
              <span>
                Visa, Study &amp; Intern Abroad
              </span>
            </h2>

            <p className="immigrationservices-intro">
              Flyixo helps students, professionals, and
              travelers achieve their international goals
              through professional guidance and personalized
              immigration services.
            </p>
          </header>

          {/* SERVICE CARDS */}

          <div className="immigrationservices-services">
            {immigrationServices.map((service) => (
              <article
                key={service.id}
                className={`immigrationservices-service ${service.className}`}
              >
                <div className="immigrationservices-service-icon">
                  {service.icon}
                </div>

                <div className="immigrationservices-service-content">
                  <div className="immigrationservices-service-top">
                    <span className="immigrationservices-service-number">
                      {service.number}
                    </span>

                    <span className="immigrationservices-service-line" />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>
                </div>

                <div
                  className="immigrationservices-service-decoration"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>

          {/* BOTTOM FEATURES */}

          <div className="immigrationservices-features">
            <div className="immigrationservices-feature">
              <FaCheckCircle />
              <span>Expert Guidance</span>
            </div>

            <div className="immigrationservices-feature">
              <FaCheckCircle />
              <span>Personalized Support</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}

        <div className="immigrationservices-right">
          <div className="immigrationservices-image-wrapper">
            <img
              src={i1}
              alt="Flyixo immigration consultant"
              className="immigrationservices-image"
            />

            <div className="immigrationservices-image-gradient" />

            {/* Top floating label */}

            <div className="immigrationservices-floating-badge">
              <span className="immigrationservices-floating-icon">
                <FaGlobeAmericas />
              </span>

              <div className="immigrationservices-floating-text">
                <strong>FLYIXO</strong>
                <span>Your Global Journey Partner</span>
              </div>
            </div>

            {/* Main overlay */}

            <div className="immigrationservices-overlay">
              <div className="immigrationservices-overlay-line" />

              <span className="immigrationservices-overlay-label">
                START YOUR JOURNEY
              </span>

              <h2>
                Step Into Your{" "}
                <span>Global Journey</span> With Expert
                Guidance.
              </h2>

              <p>
                Discover international opportunities with
                personalized visa, education, and internship
                assistance from Flyixo.
              </p>

              <button
                type="button"
                className="immigrationservices-consult-btn"
                onClick={handleConsultation}
              >
                <span>Book a Consultation</span>
                <FaArrowRight />
              </button>
            </div>

            {/* Bottom decoration */}

            <div className="immigrationservices-image-bottom">
              <span className="immigrationservices-image-bottom-dot" />
              <span>YOUR FUTURE BEYOND BORDERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
