import React from "react";
import "./StudyAbroad.css";
import StudyAbroadBanner from "../../Components/StudyAbroadBanner/StudyAbroadBanner";
import TopUniversitiesStudyAbroad from "../../Components/TopUniversitiesStudyAbroad/TopUniversitiesStudyAbroad";
import SuccessStories from "../../Components/SuccessStories/SuccessStories";
import StudyAbroadInfoSection from "../../Components/StudyAbroadInfoSection/StudyAbroadInfoSection";
import FlyDenEdu from "../../Components/FlyDenEdu/FlyDenEdu";
import FlyDenAdvantage from "../../Components/FlyDenAdvantage/FlyDenAdvantage";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa"; // removed arrow icon

const StudyAbroad = () => {

  // Call & WhatsApp actions
  const handleCall = () => {
    window.location.href = "tel:+916371635221";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/916371635221", "_blank");
  };

  return (
    <div className="studyabroad-page">
      <StudyAbroadBanner />
      <FlyDenAdvantage />
      <FlyDenEdu />
      <TopUniversitiesStudyAbroad />
      <SuccessStories />
      <StudyAbroadInfoSection />

      {/* Floating Buttons */}
      <div className="floating-buttons">
        <button
          className="float-btn StudyAbroad-call-btn"
          onClick={handleCall}
          aria-label="Call Us"
        >
          <FaPhoneAlt />
        </button>

        <button
          className="float-btn StudyAbroad-whatsapp-btn"
          onClick={handleWhatsApp}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </button>
      </div>
    </div>
  );
};

export default StudyAbroad;
