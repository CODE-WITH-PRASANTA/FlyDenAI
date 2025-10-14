import React from "react";
import "./AboutSection.css";
import mainImage from "../../assets/about1.webp"; 
import personImage from "../../assets/newsblog2.webp"; 
import avatar1 from "../../assets/avatar-1.webp";
import avatar2 from "../../assets/avatar-2.webp"; 
import avatar3 from "../../assets/avatar-3.webp"; 

const AboutSection = () => {
  return (
    <section className="aboutsec-section">
      {/* Left side images */}
      <div className="aboutsec-left">
        <div className="aboutsec-image-wrapper">
          <img src={mainImage} alt="Airplane" className="aboutsec-main-image" />
          <div className="aboutsec-small-image">
            <img src={personImage} alt="Person" />
          </div>
          <div className="aboutsec-experience-badge">
            <span>We’re</span>
            <h2>25+</h2>
            <p>Years Of Experience</p>
          </div>
        </div>
      </div>

      {/* Right side content */}
      <div className="aboutsec-right">
        <p className="aboutsec-sub-title">About FlyDenAI</p>
        <h1 className="aboutsec-heading">Your Global Visa & Study Abroad Partner</h1>
        <p className="aboutsec-description">
          At FlyDenAI, we simplify international travel and career opportunities. 
          From visa applications to study abroad programs and internships abroad, 
          our expert team guides you through every step. Trusted by thousands of 
          satisfied clients worldwide, we ensure a seamless experience for your 
          global journey.
        </p>

        <div className="aboutsec-features">
          <div className="aboutsec-feature">
            <span className="aboutsec-icon">📝</span>
            <div className="aboutsec-feature-content">
              <h4 className="aboutsec-feature-title">All-Country Visa Services</h4>
              <p className="aboutsec-feature-desc">
                Expert support for visas to every country, ensuring approvals faster and easier.
              </p>
            </div>
          </div>

          <div className="aboutsec-feature">
            <span className="aboutsec-icon">🎓</span>
            <div className="aboutsec-feature-content">
              <h4 className="aboutsec-feature-title">Study Abroad Programs</h4>
              <p className="aboutsec-feature-desc">
                Guidance on selecting top universities, application process, and smooth admission.
              </p>
            </div>
          </div>

          <div className="aboutsec-feature">
            <span className="aboutsec-icon">💼</span>
            <div className="aboutsec-feature-content">
              <h4 className="aboutsec-feature-title">Intern Abroad Opportunities</h4>
              <p className="aboutsec-feature-desc">
                Hands-on internship programs internationally, building your career and experience.
              </p>
            </div>
          </div>

          <div className="aboutsec-feature">
            <span className="aboutsec-icon">💻</span>
            <div className="aboutsec-feature-content">
              <h4 className="aboutsec-feature-title">Free Online Consultation</h4>
              <p className="aboutsec-feature-desc">
                Get expert advice online before applying, completely free of charge.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutsec-footer">
          <button className="aboutsec-learn-more">Learn More About FlyDenAI &gt;</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
