import React, { useState, useEffect } from "react";
import "./TopSection.css";
import { 
  FaPlaneUp, 
  FaIdCardClip, 
  FaEarthAsia, 
  FaUmbrellaBeach, 
  FaGraduationCap, 
  FaBriefcase 
} from "react-icons/fa6";
import group1 from "../../assets/group1.webp"; // Replace with your image

const TopSection = () => {
  // Slider items with more attractive, reliable content
  const sliderItems = [
    { text: "Visa Consultancy", icon: <FaIdCardClip /> },
    { text: "Travel Partners", icon: <FaPlaneUp /> },
    { text: "Tours & Travel Agency", icon: <FaUmbrellaBeach /> },
    { text: "Study Abroad Programs", icon: <FaGraduationCap /> },
    { text: "Intern Abroad Opportunities", icon: <FaBriefcase /> },
    { text: "Immigration Support", icon: <FaEarthAsia /> },
  ];

  // Notification updates with catchy, trustable content
  const updates = [
    "Turning Dreams into Reality: Your Visa Success Is Our Mission!",
    "Trusted by 5000+ Global Travelers — Apply and Start Your Journey!",
    "From Study Abroad to Internships : We Make Every Step Seamless",
    "Expert Guidance in Visa Applications, Travel Planning & Support",
    "Your Global Adventure Starts Here — Join Thousands of Clients!",
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
            <span className="topsec-client-text">
              <strong>3450+</strong> Satisfied Clients Worldwide
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
