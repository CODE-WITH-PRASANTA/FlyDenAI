import React from "react";
import "./VisaServices.css";
import { FaCheck, FaArrowRight, FaPassport } from "react-icons/fa";

import Jobvisa from "../../assets/job-visa.webp";
import BusinessVisa from "../../assets/business visa.webp";
import StudentVisa from "../../assets/student-visa.webp";
import Freevisa from "../../assets/free-visa.webp";

const visaServices = [
  {
    title: "Job Visa",
    description:
      "Secure employment opportunities abroad with a Job Visa. This visa allows skilled professionals to legally work, earn, and build their careers in international companies with ease.",
    image: Jobvisa,
  },
  {
    title: "Business Visa",
    description:
      "Expand your horizons with a Business Visa. Perfect for entrepreneurs, investors, and professionals attending meetings, conferences, or exploring trade opportunities overseas.",
    image: BusinessVisa,
  },
  {
    title: "Student Visa",
    description:
      "Shape your future with a Student Visa. Designed for learners pursuing higher education in top global universities, ensuring access to world-class education and career opportunities.",
    image: StudentVisa,
  },
  {
    title: "Free Visa Enquiry",
    description:
      "Not sure where to start? Get a Free Visa Enquiry to assess your eligibility, understand the process, and receive expert guidance tailored to your study, work, or travel needs.",
    image: Freevisa,
  },
];

const needs = [
  "Resident visa transfer to a new passport",
  "Variation or renewal of your existing resident visa",
  "Transfer of permanent residency visa to a new passport",
  "Guidance for dependent visas (spouse/children)",
  "Fast-track solutions for urgent travel & work permits",
];

const VisaServices = () => {
  return (
    <section className="vs-section">
      {/* Background Decorations */}
      <div className="vs-background">
        <span className="vs-bg-shape vs-bg-shape-one"></span>
        <span className="vs-bg-shape vs-bg-shape-two"></span>
        <span className="vs-bg-circle vs-bg-circle-one"></span>
        <span className="vs-bg-circle vs-bg-circle-two"></span>
      </div>

      <div className="vs-container">
        {/* =========================
            SECTION INTRO
        ========================= */}
        <div className="vs-section-intro">
          <div className="vs-intro-badge">
            <FaPassport />
            <span>FLYIXO VISA SERVICES</span>
          </div>

          <p className="vs-intro-small">YOUR GLOBAL JOURNEY STARTS HERE</p>

          <h2 className="vs-main-heading">
            Complete Visa & Immigration
            <span> Solutions</span>
          </h2>

          <p className="vs-main-description">
            Flyixo provides professional visa and immigration assistance for
            students, professionals, entrepreneurs, and travelers looking to
            explore opportunities around the world.
          </p>

          <div className="vs-heading-line">
            <span></span>
            <i></i>
            <span></span>
          </div>
        </div>

        {/* =========================
            ROW 1
        ========================= */}
        <div className="vs-row">
          {/* Intro Card */}
          <div className="vs-bigbox">
            <div className="vs-bigbox-glow"></div>

            <div className="vs-bigbox-content">
              <div className="vs-small-label">
                <span></span>
                CHOOSE YOUR VISA
              </div>

              <h3 className="vs-bigtitle">
                Immigration Services
                <span> Experienced</span>
              </h3>

              <p className="vs-bigdesc">
                Your trusted visa & immigration partner for work, study and
                travel abroad. Flyixo makes your international journey simple,
                transparent, and stress-free.
              </p>

              <div className="vs-bigbox-features">
                <div className="vs-mini-feature">
                  <div className="vs-mini-icon">
                    <FaCheck />
                  </div>
                  <span>Expert Guidance</span>
                </div>

                <div className="vs-mini-feature">
                  <div className="vs-mini-icon">
                    <FaCheck />
                  </div>
                  <span>Complete Support</span>
                </div>

                <div className="vs-mini-feature">
                  <div className="vs-mini-icon">
                    <FaCheck />
                  </div>
                  <span>Global Opportunities</span>
                </div>
              </div>

              <div className="vs-brand-mark">
                <span>FLY</span>IXO
              </div>
            </div>
          </div>

          {/* Visa Card 1 */}
          {visaServices.slice(0, 2).map((service, index) => (
            <article
              key={service.title}
              className={`vs-card vs-card-${index + 1}`}
            >
              <div className="vs-card-image-wrapper">
                <img
                  src={service.image}
                  alt={`Flyixo ${service.title}`}
                  className="vs-card-image"
                />

                <div className="vs-card-image-overlay"></div>

                <div className="vs-card-number">
                  0{index + 1}
                </div>

                <div className="vs-card-top-badge">
                  FLYIXO
                </div>
              </div>

              <div className="vs-overlay">
                <div className="vs-overlay-content">
                  <div className="vs-card-line"></div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <button type="button" className="vs-read-more">
                    <span>Explore Service</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* =========================
            ROW 2
        ========================= */}
        <div className="vs-row vs-row-second">
          {/* Visa Card 3 */}
          {visaServices.slice(2).map((service, index) => (
            <article
              key={service.title}
              className={`vs-card vs-card-second vs-card-${index + 3}`}
            >
              <div className="vs-card-image-wrapper">
                <img
                  src={service.image}
                  alt={`Flyixo ${service.title}`}
                  className="vs-card-image"
                />

                <div className="vs-card-image-overlay"></div>

                <div className="vs-card-number">
                  0{index + 3}
                </div>

                <div className="vs-card-top-badge">
                  FLYIXO
                </div>
              </div>

              <div className="vs-overlay">
                <div className="vs-overlay-content">
                  <div className="vs-card-line"></div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <button type="button" className="vs-read-more">
                    <span>Explore Service</span>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </article>
          ))}

          {/* =========================
              INFORMATION BOX
          ========================= */}
          <div className="vs-info">
            <div className="vs-info-top">
              <div className="vs-info-icon">
                <FaPassport />
              </div>

              <div>
                <span className="vs-info-label">
                  VISA ASSISTANCE
                </span>

                <h3 className="vs-infotitle">
                  What Do You Need?
                </h3>
              </div>
            </div>

            <ul className="vs-list">
              {needs.map((need, index) => (
                <li key={index}>
                  <span className="vs-check-icon">
                    <FaCheck />
                  </span>

                  <span className="vs-list-text">{need}</span>
                </li>
              ))}
            </ul>

            <p className="vs-desc">
              Every immigration case is unique. Whether you're applying for
              the first time or renewing your visa, the Flyixo expert team
              provides personalized support and guidance tailored to your
              needs.
            </p>

            <div className="vs-info-footer">
              <div className="vs-info-footer-text">
                <strong>Need Visa Assistance?</strong>
                <span>Let Flyixo guide your next step.</span>
              </div>

              <div className="vs-info-arrow">
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            BOTTOM TRUST AREA
        ========================= */}
        <div className="vs-bottom">
          <div className="vs-bottom-line"></div>

          <div className="vs-bottom-content">
            <div className="vs-bottom-item">
              <FaCheck />
              <span>Professional Assistance</span>
            </div>

            <div className="vs-bottom-item">
              <FaCheck />
              <span>Transparent Process</span>
            </div>

            <div className="vs-bottom-item">
              <FaCheck />
              <span>Global Visa Support</span>
            </div>
          </div>

          <div className="vs-bottom-line"></div>
        </div>
      </div>
    </section>
  );
};

export default VisaServices;