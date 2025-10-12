import React from "react";
import "./ChooseUsSection.css";
import { FaVideo, FaBolt, FaCheckCircle } from "react-icons/fa";
import mainImage from "../../assets/why1.webp"; 
import avatar1 from "../../assets/avatar-1.webp";
import avatar2 from "../../assets/avatar-2.webp";
import avatar3 from "../../assets/avatar-3.webp";
import avatar4 from "../../assets/avatar-4.webp";
import avatar5 from "../../assets/avatar-5.webp";

const features = [
  { icon: <FaVideo />, title: "Direct Online Interviews" },
  { icon: <FaBolt />, title: "Quick & Easy Process" },
  { icon: <FaCheckCircle />, title: "99% Visa Approvals" },
];

const ChooseUsSection = () => {
  return (
    <section className="choose-us-section">
      <div className="cus-container">
        {/* Left Content */}
        <div className="cus-left-content">
          <p className="cus-subtitle">Why Choose Us</p>
          <h2 className="cus-title">
            Some Reasons People Like Our Consultancy
          </h2>
          <p className="cus-description">
            At vero eoset accusam etusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quose
          </p>

          <div className="cus-features">
            {features.map((feature, index) => (
              <div key={index} className="cus-feature-card cus-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="cus-feature-icon">{feature.icon}</div>
                <h3 className="cus-feature-title">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="cus-right-content">
          <div className="cus-main-image-wrapper">
            <img src={mainImage} alt="Happy Customers" className="cus-main-image cus-float" />
            <div className="cus-trusted-card cus-slide-up">
              <p className="cus-trusted-text">10m+ Trusted Customer</p>
              <div className="cus-avatars">
                {[avatar1, avatar2, avatar3, avatar4, avatar5].map((avatar, i) => (
                  <img key={i} src={avatar} alt={`avatar${i}`} className={`cus-avatar cus-avatar-float${i+1}`} />
                ))}
                <div className="cus-more cus-avatar-float6">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUsSection;
