import React from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  FaFileAlt,
  FaHandsHelping,
  FaRegClock,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";
import "./TrainingSection.css";

// =====================================================
// IMAGES
// =====================================================

import docHelpImg from "../../assets/train1.webp";
import consultancyImg from "../../assets/train2.webp";
import trackingImg from "../../assets/train3.webp";
import universityImg from "../../assets/train4.webp";

// =====================================================
// VISA ENQUIRY CARDS
// =====================================================

const enquiryCards = [
  {
    id: 1,
    number: "01",
    title: "Help in Documents",
    desc: "Get end-to-end assistance in preparing, verifying, and submitting all essential documents required for your visa application. We ensure that your forms, passports, ID proofs, academic transcripts, financial statements, and supporting letters are accurate and error-free to prevent delays and improve approval chances.",
    img: docHelpImg,
    icon: <FaFileAlt />,
  },
  {
    id: 2,
    number: "02",
    title: "Visa Consultancy",
    desc: "Receive professional guidance on selecting the correct visa type according to your purpose and destination. Our experts provide personalized consultation, prepare you for interviews, explain visa policies, and offer tips to increase the likelihood of a successful visa approval. From student visas to work permits, we cover all visa categories.",
    img: consultancyImg,
    icon: <FaHandsHelping />,
  },
  {
    id: 3,
    number: "03",
    title: "Application Tracking",
    desc: "Stay updated with the latest status of your visa application in real-time. We provide timely notifications, reminders, and tracking support so you can monitor each stage of the process—from submission to approval. Avoid unnecessary delays or missed updates with our reliable tracking system and expert assistance.",
    img: trackingImg,
    icon: <FaRegClock />,
  },
  {
    id: 4,
    number: "04",
    title: "University Assistance",
    desc: "Receive comprehensive guidance for studying abroad, including help with university selection, course selection, admission procedures, documentation, and scholarship opportunities. We assist with application forms, recommendation letters, SOPs, and all administrative requirements, ensuring a smooth and stress-free path to your international education goals.",
    img: universityImg,
    icon: <FaUniversity />,
  },
];

// =====================================================
// COMPONENT
// =====================================================

export default function TrainingSection() {
  return (
    <section className="visa-enquiry-section">

      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="trainingsec-bg trainingsec-bg-one"></div>
      <div className="trainingsec-bg trainingsec-bg-two"></div>

      <div className="trainingsec-orb trainingsec-orb-one"></div>
      <div className="trainingsec-orb trainingsec-orb-two"></div>

      <div className="trainingsec-grid"></div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="trainingsec-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="trainingsec-header">

          <div className="trainingsec-subtitle-wrapper">
            <span className="trainingsec-line"></span>

            <p className="TrainingSec-subtitle">
              FREE VISA ENQUIRY
            </p>

            <span className="trainingsec-line"></span>
          </div>

          <span className="trainingsec-brand-label">
            FLYIXO GLOBAL VISA SUPPORT
          </span>

          <h2 className="section-title">
            We Simplify Your Visa Process
            <span> With Expert Assistance</span>
          </h2>

          <p className="trainingsec-description">
            Flyixo provides reliable guidance throughout your visa and
            study-abroad journey, helping you move from documentation to
            successful application with confidence.
          </p>

        </div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div className="enquiry-cards-container">

          {enquiryCards.map(
            ({ id, number, title, desc, img, icon }, index) => (
              <article
                key={id}
                className="enquiry-card"
              >

                {/* Card Number */}
                <div className="trainingsec-card-number">
                  {number}
                </div>

                {/* Top Accent */}
                <div className="trainingsec-card-accent"></div>

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="img-circle">

                  <img
                    src={img}
                    alt={`Flyixo ${title}`}
                  />

                  <div className="trainingsec-image-overlay"></div>

                </div>

                {/* =================================================
                    ICON
                ================================================= */}

                <div className="icon-circle">
                  <span>
                    {icon}
                  </span>
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="trainingsec-card-content">

                  <h3 className="TrainingSec-card-title">
                    {title}
                  </h3>

                  <p className="card-desc">
                    {desc}
                  </p>

                </div>

                {/* =================================================
                    CARD BENEFIT
                ================================================= */}

                <div className="trainingsec-benefit">

                  <FaCheckCircle />

                  <span>
                    Professional Flyixo Support
                  </span>

                </div>

                {/* =================================================
                    READ MORE
                ================================================= */}

                <button
                  type="button"
                  className="TrainingSec-readbtn"
                >
                  <span className="read-more-text">
                    Read More
                  </span>

                  <span className="trainingsec-button-arrow">
                    <FiArrowRight className="arrow-icon" />
                  </span>
                </button>

                {/* Decorative Corners */}
                <span className="trainingsec-corner trainingsec-corner-one"></span>
                <span className="trainingsec-corner trainingsec-corner-two"></span>

              </article>
            )
          )}

        </div>

        {/* =================================================
            BOTTOM TRUST AREA
        ================================================= */}

        <div className="trainingsec-bottom">

          <div className="trainingsec-bottom-icon">
            <FaHandsHelping />
          </div>

          <div className="trainingsec-bottom-content">

            <span className="trainingsec-bottom-label">
              YOUR GLOBAL JOURNEY STARTS HERE
            </span>

            <p>
              Get trusted guidance from{" "}
              <strong>Flyixo</strong> for your visa,
              documentation, and study-abroad needs.
            </p>

          </div>

          <div className="trainingsec-bottom-arrow">
            <FiArrowRight />
          </div>

        </div>

      </div>
    </section>
  );
}