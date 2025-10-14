import React from "react";
import "./ChooseUsSection.css";
import { FaGlobe, FaHandshake, FaPaperPlane } from "react-icons/fa";
import mainImage from "../../assets/why1.webp"; 
import avatar1 from "../../assets/avatar-1.webp";
import avatar2 from "../../assets/avatar-2.webp";
import avatar3 from "../../assets/avatar-3.webp";
import avatar4 from "../../assets/avatar-4.webp";
import avatar5 from "../../assets/avatar-5.webp";

const features = [
  { icon: <FaGlobe />, title: "Global Visa Assistance" },
  { icon: <FaHandshake />, title: "Trusted Consultation" },
  { icon: <FaPaperPlane />, title: "Fast & Hassle-Free Process" },
];

const ChooseUsSection = () => {
  return (
    <section className="chooseus-section">
      <div className="chooseus-container">
        {/* LEFT SIDE */}
        <div className="chooseus-left">
          <p className="chooseus-subtitle">Why Choose FlyDenAi</p>
          <h2 className="chooseus-title">
            Trusted Visa Experts for Your Global Journey
          </h2>
          <p className="chooseus-desc">
            At <strong>FlyDenAi</strong>, we simplify your visa process with expert
            guidance, transparent procedures, and personalized support. Whether
            you’re applying for study, work, or travel, we ensure a smooth and
            stress-free experience from start to finish.
          </p>

          <div className="chooseus-features">
            {features.map((feature, index) => (
              <div
                key={index}
                className="chooseus-feature-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="chooseus-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="chooseus-right">
          <div className="chooseus-img-wrap">
            <img src={mainImage} alt="Visa Assistance" className="chooseus-img" />
            <div className="chooseus-trusted">
              <p>10k+ Happy Clients</p>
              <div className="chooseus-avatars">
                {[avatar1, avatar2, avatar3, avatar4, avatar5].map((avatar, i) => (
                  <img key={i} src={avatar} alt={`avatar-${i}`} className="chooseus-avatar" />
                ))}
                <span className="chooseus-more">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
