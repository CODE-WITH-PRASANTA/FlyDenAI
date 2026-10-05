import React, { useState } from "react";
import "./FaqSection.css";
import {
  FaChevronDown,
  FaChevronRight,
  FaGlobeAmericas,
  FaCheckCircle,
  FaPassport,
} from "react-icons/fa";

// Import local images
import have1 from "../../assets/have.webp";
import have2 from "../../assets/have2.webp";
import have3 from "../../assets/have3.webp";

const faqs = [
  {
    id: 1,
    question: "What Is Visa Immigration Services?",
    answer:
      "Visa Immigration Services help individuals apply for, track, and receive their visas with professional guidance to ensure all documentation is correct and submitted on time.",
  },
  {
    id: 2,
    question: "Have Any Visa Consultant?",
    answer:
      "Yes, our experienced visa consultants guide you through each step — from selecting the right visa type to preparing the necessary documents.",
  },
  {
    id: 3,
    question: "How Much Does Visa Immigration Cost?",
    answer:
      "Visa processing costs vary by country and type. Our consultants provide transparent pricing with no hidden fees.",
  },
  {
    id: 4,
    question: "How Long Does Visa Processing Take?",
    answer:
      "Processing times depend on the country and visa type, but we aim to make the process as fast and smooth as possible.",
  },
];

const FaqSection = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFaq = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq-wrapper">
      {/* =====================================================
          BACKGROUND DECORATIONS
      ===================================================== */}

      <div className="faq-bg faq-bg-one"></div>
      <div className="faq-bg faq-bg-two"></div>
      <div className="faq-grid-pattern"></div>

      <div className="faq-container">
        {/* =====================================================
            LEFT IMAGE SECTION
        ===================================================== */}

        <div className="faq-images">
          <div className="faq-image-heading">
            <div className="faq-image-heading-icon">
              <FaGlobeAmericas />
            </div>

            <div>
              <strong>Flyixo</strong>
              <span>Global Visa Support</span>
            </div>
          </div>

          <div className="faq-image-grid">
            {/* Main Image */}
            <div className="faq-main-image-wrap">
              <div className="faq-image-border"></div>

              <img
                src={have1}
                alt="Flyixo Visa Consultant"
                className="faq-main-img"
              />

              <div className="faq-main-overlay"></div>

              <div className="faq-main-badge">
                <span className="faq-main-badge-icon">
                  <FaPassport />
                </span>

                <div>
                  <strong>Expert Visa</strong>
                  <span>Consultation</span>
                </div>
              </div>
            </div>

            {/* Small Images */}
            <div className="faq-sub-images">
              <div className="faq-sub-image-wrap faq-sub-one">
                <img
                  src={have2}
                  alt="Flyixo Visa Consultant"
                  className="faq-sub-img"
                />

                <div className="faq-sub-overlay"></div>

                <span className="faq-image-number">01</span>
              </div>

              <div className="faq-sub-image-wrap faq-sub-two">
                <img
                  src={have3}
                  alt="Flyixo Visa Consultant"
                  className="faq-sub-img"
                />

                <div className="faq-sub-overlay"></div>

                <span className="faq-image-number">02</span>
              </div>
            </div>
          </div>

          {/* =================================================
              TRUST CARD
          ================================================= */}

          <div className="faq-trust-card">
            <div className="faq-trust-icon">
              <FaCheckCircle />
            </div>

            <div className="faq-trust-content">
              <strong>Professional Support</strong>

              <span>
                Your journey is our priority
              </span>
            </div>
          </div>

          {/* Decorative dots */}
          <span className="faq-dot faq-dot-one"></span>
          <span className="faq-dot faq-dot-two"></span>
          <span className="faq-dot faq-dot-three"></span>
        </div>

        {/* =====================================================
            RIGHT FAQ SECTION
        ===================================================== */}

        <div className="faq-content">
          {/* Header */}
          <div className="faq-heading">
            <div className="faq-subtitle-wrapper">
              <span className="faq-subtitle-line"></span>

              <p className="faq-subtitle">
                HAVE ANY QUESTIONS?
              </p>
            </div>

            <h2 className="faq-title">
              Frequently Asked
              <span> Questions</span>
            </h2>

            <p className="faq-intro">
              Find answers to some of the most common questions
              about visa applications, immigration services, costs,
              and processing timelines with Flyixo.
            </p>

            <div className="faq-title-decoration">
              <span></span>
              <i></i>
              <span></span>
            </div>
          </div>

          {/* FAQ List */}
          <div className="faq-list">
            {faqs.map((faq) => {
              const isActive = activeId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`faq-item ${
                    isActive ? "active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isActive}
                  >
                    <span className="faq-number">
                      {faq.id < 10
                        ? `0${faq.id}`
                        : faq.id}
                    </span>

                    <span className="faq-text">
                      {faq.question}
                    </span>

                    <span className="faq-arrow">
                      {isActive ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </span>
                  </button>

                  <div
                    className={`faq-answer-wrapper ${
                      isActive ? "open" : ""
                    }`}
                  >
                    <div className="faq-answer">
                      <div className="faq-answer-line"></div>

                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Help */}
          <div className="faq-bottom">
            <div className="faq-bottom-icon">
              <FaGlobeAmericas />
            </div>

            <div className="faq-bottom-content">
              <strong>
                Still Have Questions?
              </strong>

              <span>
                Flyixo is here to help you with your
                global journey.
              </span>
            </div>

            <div className="faq-bottom-brand">
              FLYIXO
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;