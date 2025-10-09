import React, { useState } from "react";
import {
  FaArrowRight,
  FaComments,
  FaFileAlt,
  FaBookOpen,
  FaUserCheck,
  FaPassport,
  FaMoneyCheckAlt,
  FaHandshake,
} from "react-icons/fa";

import v1 from "../../assets/v1.webp";
import v2 from "../../assets/v2.webp";
import v3 from "../../assets/v3.webp";
import v4 from "../../assets/v4.webp";
import v5 from "../../assets/v5.webp";
import v6 from "../../assets/v6.webp";

import "./TouristVisaSection.css";

const TouristVisaSection = () => {
  const visaOptions = [
    "Student Visa",
    "Residence Visa",
    "Business Visa",
    "Tourist Visa",
    "Conference Visa",
    "Medical Visa",
  ];

  const [activeVisa, setActiveVisa] = useState("Tourist Visa");
  const [activeConsultation, setActiveConsultation] = useState("Free Consultation");

  const consultationItems = [
    {
      id: "Free Consultation",
      icon: <FaComments className="consultation-icon" />,
      title: "Free Consultation",
      subtitle: "Get Professional Counselling",
      description:
        "Occur that pleasures have to be repudiated annoyances accepted wise man therefore always holds in these matters to this principle of selection he rejects pleasures to secure other greater pleasures he endures pains to avoid worse pains.",
      imgSrc: v1,
    },
    {
      id: "Admission Process",
      icon: <FaFileAlt className="consultation-icon" />,
      title: "Admission Process",
      subtitle: "Support from the Beginning",
      description:
        "Admission procedures and support services available from the initial stages to ensure a smooth and hassle-free experience.",
      imgSrc: v2,
    },
    {
      id: "Coaching Classes",
      icon: <FaBookOpen className="consultation-icon" />,
      title: "Coaching Classes",
      subtitle: "Tests with our Live Classes",
      description:
        "Live coaching classes and test preparation to help you excel academically and achieve your goals.",
      imgSrc: v3,
    },
  ];

  const activeConsultationData = consultationItems.find(
    (item) => item.id === activeConsultation
  );

  // Map activeVisa to image
  const visaImages = {
    "Student Visa": v1,
    "Residence Visa": v2,
    "Business Visa": v3,
    "Tourist Visa": v4,
    "Conference Visa": v5,
    "Medical Visa": v6,
  };

  return (
    <section className="TouristVisaSection">
      {/* ===== First Section: Visa Selector ===== */}
      <div className="visa-selector">
        {/* Left Sidebar - Visa Options */}
        <div className="visa-left-sidebar">
          {visaOptions.map((visa, index) => (
            <div
              key={index}
              className={`visa-item ${visa === activeVisa ? "active" : ""}`}
              onClick={() => setActiveVisa(visa)}
            >
              <span className="visa-text">{visa}</span>
              <FaArrowRight className="arrow-icon" />
            </div>
          ))}
        </div>

        {/* Right Image for Active Visa */}
        <div className="visa-right-image">
          <img src={visaImages[activeVisa]} alt={activeVisa} />
        </div>
      </div>

      {/* ===== Second Section: Downloads & Overview ===== */}
      <div className="visa-details-layout">
        {/* Left Downloads Sidebar */}
        <div className="downloads-sidebar">
          <h2>Downloads</h2>
          <div className="download-card">
            <img src="/pdf-icon.png" alt="PDF" className="file-icon" />
            <div>
              <p className="file-title">Application Form</p>
              <p className="file-size">450kb</p>
            </div>
          </div>
          <div className="download-card">
            <img src="/doc-icon.png" alt="DOC" className="file-icon" />
            <div>
              <p className="file-title">Terms & Conditions</p>
              <p className="file-size">12mb</p>
            </div>
          </div>
<section className="study-card-section">
  <div className="study-card">
    <div className="study-card-bg"></div>
    <div className="study-card-overlay"></div>

    <div className="study-card-inner">
      {/* Left Side - Text */}
      <div className="study-card-content">
        <p className="study-card-subtitle">Planning To</p>
        <h2 className="study-card-title">Study in Abroad</h2>

        <ul className="study-card-list">
          <li>✔ World Class Institution</li>
          <li>✔ Quality Education</li>
          <li>✔ Affordable Fees</li>
        </ul>

        <p className="study-card-note">* Terms & Conditions</p>

        <button className="study-card-btn">MAKE AN APPOINTMENT →</button>
      </div>

      {/* Right Side - Imported Image */}
      <div className="study-card-image">
        <img src={v5} alt="Study Abroad" />
      </div>
    </div>
  </div>
</section>

        </div>

        {/* Right Main Content */}
        <div className="visa-main-content">
          {/* Visa Overview */}
          <div className="visa-overview">
            <h2>{activeVisa} Overview</h2>
            <p>
              Beguiled and demoralized by the charms of pleasure the moment blinded by desire that they cannot foresee the pain and trouble that are bound to ensue.
            </p>
            <p>
              Charms of pleasure the moment so blinded by desires that they cannot foresee the pain and trouble that are and equal blame belongs to those who fail in their.
            </p>
          </div>

          {/* Visa Type Cards */}
          <div className="visa-type-cards">
            {[v1, v2, v3].map((img, i) => {
              const cardData = [
                {
                  title: "F1 Student Visa",
                  text: "Enjoy pleasure that has annoying consequences one who avoids a pain.",
                  num: "01",
                },
                {
                  title: "J1 Exchange Visa",
                  text: "The system & expound actual teachings of the great explorer the truth.",
                  num: "02",
                },
                {
                  title: "M-1 Non-Academic",
                  text: "No one rejects, dislikes avoid pleasure itself because it is pleasure.",
                  num: "03",
                },
              ][i];
              return (
                <div
                  key={i}
                  className="visa-card modern"
                  style={{ backgroundImage: `url(${img})` }}
                >
                  <div className="card-overlay"></div>
                  <div className="card-content">
                    <p>{cardData.text}</p>
                    <h4>{cardData.title}</h4>
                  </div>
                  <div className="card-number">{cardData.num}</div>
                </div>
              );
            })}
          </div>

          {/* Consultation Section */}
          <div className="consultation-section">
            <div className="consultation-left">
              {consultationItems.map((item) => (
                <div
                  key={item.id}
                  className={`consultation-item ${item.id === activeConsultation ? "active" : ""}`}
                  onClick={() => setActiveConsultation(item.id)}
                >
                  {item.icon}
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="consultation-right">
              <h3>{activeConsultationData.title}</h3>
              <p>{activeConsultationData.description}</p>
              <img src={activeConsultationData.imgSrc} alt={activeConsultationData.title} />
            </div>
          </div>

          {/* ===== Modern Reason Grid Section ===== */}
          <div className="reason-grid">
            {[
              {
                icon: <FaUserCheck />,
                title: "Direct Interviews",
                text: "Expound actual teachings to the great explorer's truth.",
              },
              {
                icon: <FaPassport />,
                title: "Visa Assistance",
                text: "Give you a completed account and expound the teachings.",
              },
              {
                icon: <FaMoneyCheckAlt />,
                title: "Faster Processing",
                text: "Expound actual teachings to the great explorer's truth.",
              },
              {
                icon: <FaHandshake />,
                title: "Personal Guidance",
                text: "Our experts help you at every step of the visa process.",
              },
            ].map((reason, i) => (
              <div key={i} className="reason-card">
                <div className="reason-icon">{reason.icon}</div>
                <div className="reason-content">
                  <h4>{reason.title}</h4>
                  <p>{reason.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouristVisaSection;
