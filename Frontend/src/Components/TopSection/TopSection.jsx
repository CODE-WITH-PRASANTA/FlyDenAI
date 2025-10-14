import React, { useState, useEffect } from "react";
import "./TopSection.css";
import { 
  FaPlaneUp, 
  FaIdCardClip, 
  FaEarthAsia, 
  FaUmbrellaBeach, 
  FaClipboardCheck 
} from "react-icons/fa6";
import group1 from "../../assets/group1.webp"; // Replace with your image

const TopSection = () => {
  // Slider items
  const sliderItems = [
    { text: "Travel Partners", icon: <FaPlaneUp /> },
    { text: "Visa Consultancy", icon: <FaIdCardClip /> },
    { text: "Immigrations", icon: <FaEarthAsia /> },
    { text: "Tours & Travel Agency", icon: <FaUmbrellaBeach /> },
    { text: "Help in Documents", icon: <FaClipboardCheck /> },
  ];

  // Updates for notification
  const updates = [
    "Turning Dreams into Stamps: Where Every Visa Application Unfolds a New Chapter of Possibilities",
    "Your Visa Success Is Our Priority — Trusted by Thousands Worldwide!",
    "Apply Today and Start Your Global Journey with Visaz"
  ];

  const [currentUpdate, setCurrentUpdate] = useState(0);

  // Auto change updates every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdate(prev => (prev + 1) % updates.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-section">
      {/* Full-width Partner Slider */}
      <div className="partner-slider full-width">
        <div className="partner-track">
          {[...sliderItems, ...sliderItems].map((item, index) => (
            <div className="partner-item" key={index}>
              <span className="partner-icon">{item.icon}</span>
              <span className="partner-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Clients + Updates Section */}
      <div className="notification-bar modern">
        <div className="clients-updates">
          <div className="clients">
            <img src={group1} alt="Group" className="group-image" />
            <span className="client-text">
              <strong>3450+</strong> Satisfied clients
            </span>
          </div>
          <div className="updates">
            <span className="bell">🔔</span>
            <span className="update-text">{updates[currentUpdate]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
