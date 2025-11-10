import React, { useEffect, useState } from "react";
import "./StudyAbroad.css";
import StudyAbroadBanner from "../../Components/StudyAbroadBanner/StudyAbroadBanner";
import TopUniversitiesStudyAbroad from "../../Components/TopUniversitiesStudyAbroad/TopUniversitiesStudyAbroad";
import SuccessStories from "../../Components/SuccessStories/SuccessStories";
import StudyAbroadInfoSection from "../../Components/StudyAbroadInfoSection/StudyAbroadInfoSection";
import FlyDenEdu from "../../Components/FlyDenEdu/FlyDenEdu";
import FlyDenAdvantage from "../../Components/FlyDenAdvantage/FlyDenAdvantage";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../Api"; // e.g. "http://localhost:5000/api"

const StudyAbroad = () => {
  const [contact, setContact] = useState(null);

  // ✅ Fetch published contact details
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/contacts`);
        if (res.data.success && res.data.data.length > 0) {
          const publishedContact = res.data.data.find((c) => c.published);
          if (publishedContact) setContact(publishedContact);
        }
      } catch (err) {
        console.error("❌ Error fetching contact:", err);
      }
    };
    fetchContact();
  }, []);

  // ✅ Button actions using dynamic contact data
  const handleCall = () => {
    if (contact?.phone) {
      window.location.href = `tel:+91${contact.phone}`;
    } else {
      alert("Phone number not available");
    }
  };

  const handleWhatsApp = () => {
    if (contact?.whatsapp) {
      window.open(`https://wa.me/91${contact.whatsapp}`, "_blank");
    } else {
      alert("WhatsApp number not available");
    }
  };

  return (
    <div className="studyabroad-page">
      <StudyAbroadBanner />
      <FlyDenAdvantage />
      <FlyDenEdu />
      <TopUniversitiesStudyAbroad />
      <SuccessStories />
      <StudyAbroadInfoSection />

      {/* ✅ Floating Buttons */}
      {contact && (
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
      )}
    </div>
  );
};

export default StudyAbroad;
