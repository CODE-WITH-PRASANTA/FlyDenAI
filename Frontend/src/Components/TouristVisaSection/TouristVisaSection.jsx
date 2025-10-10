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
import { useNavigate } from "react-router-dom";

import v1 from "../../assets/v1.webp";
import v2 from "../../assets/v2.webp";
import v3 from "../../assets/v3.webp";
import v4 from "../../assets/v4.webp";
import v5 from "../../assets/v5.webp";
import v6 from "../../assets/v6.webp";

import "./TouristVisaSection.css";

const TouristVisaSection = () => {

  // State for dynamic Visa Category
const [selectedVisa, setSelectedVisa] = useState("");

// Visa categories by type
const visaCategories = {
  "Student Visa": ["F1 Student", "J1 Exchange", "M-1 Non-Academic"],
  "Residence Visa": ["Permanent Residence", "Temporary Residence", "Work Permit"],
  "Business Visa": ["Investor", "Trade", "Conference"],
  "Tourist Visa": ["Short-term", "Family Visit", "Holiday"],
  "Conference Visa": ["Academic Conference", "Business Conference"],
  "Medical Visa": ["Treatment", "Consultation"],
};


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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleContinue = () => {
    setIsPopupOpen(false);
    navigate("/FreeEnquery");
  };

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

        <div className="visa-right-image">
          <img src={visaImages[activeVisa]} alt={activeVisa} />
        </div>
      </div>

     {/* Floating Enroll Button */}
      <div className="floating-enroll-btn" onClick={togglePopup}>
        <FaHandshake className="floating-icon" />
        Free Consultation
      </div>

      {/* ===== Second Section ===== */}
      <div className="visa-details-layout">
        <div className="visa-main-content">
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
                  className={`consultation-item ${
                    item.id === activeConsultation ? "active" : ""
                  }`}
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
              <img
                src={activeConsultationData.imgSrc}
                alt={activeConsultationData.title}
              />
            </div>
          </div>

          {/* Modern Reason Grid */}
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

   {/* ==== Popup Modal with Enquiry Form ==== */}
    {isPopupOpen && (
      <div className="popup-overlay" onClick={togglePopup}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <h3>Free Enquiry Form</h3>
          <p>Fill in your details and our team will contact you shortly.</p>

          <form
            className="enquiry-form"
            onSubmit={(e) => {
              e.preventDefault();
              // Handle form submission here
              alert("Form Submitted!");
              setIsPopupOpen(false);
            }}
          >
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />

            {/* Visa Type Select */}
            <select
              required
              onChange={(e) => setSelectedVisa(e.target.value)}
              value={selectedVisa}
            >
              <option value="">Select Visa Type</option>
              {visaOptions.map((visa) => (
                <option key={visa} value={visa}>
                  {visa}
                </option>
              ))}
            </select>

            {/* Visa Category Select - dynamic */}
            <select required>
              <option value="">Select Visa Category</option>
              {selectedVisa &&
                visaCategories[selectedVisa]?.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>

            <input type="tel" placeholder="Phone Number" pattern="[0-9]{10}" required />
            <input type="text" placeholder="Address" required />
            <textarea placeholder="Your Message" rows="4"></textarea>

            <div className="popup-buttons">
              <button type="button" className="close-btn" onClick={togglePopup}>
                Cancel
              </button>
              <button type="submit" className="continue-btn">
                Submit <FaArrowRight />
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    </section>
  );
};

export default TouristVisaSection;
