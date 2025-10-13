import React from "react";
import "./AboutAgency.css";
import { FaPassport, FaRegClock } from "react-icons/fa";
import i1 from "../../assets/col-bgimage-12.jpg";
import i2 from "../../assets/col-bgimage-12.jpg"; // use another image for small section if needed

const AboutAgency = () => {
  return (
    <section className="aboutagency-section">
      <div className="aboutagency-container">
       {/* Left Image */}
        <div className="aboutagency-image-wrapper">
          <img src={i1} alt="Global Opportunities" className="aboutagency-main-image" />
          <p className="aboutagency-welcome">
            Welcome to <span>FlyDenAi</span> services!
          </p>
        </div>


      
        {/* Right Content */}
        <div className="aboutagency-content">
          <p className="aboutagency-subtitle">OUR SERVICES</p>
          <h2 className="aboutagency-title">
            Your gateway to <span className="highlight-red">Visa</span>, <span className="highlight-red">Intern Abroad</span>, and <span className="highlight-red">Study Abroad</span>
          </h2>
          <p className="aboutagency-description">
            FlyDenAi helps students and professionals explore global opportunities with expert guidance in visa processing, international internships, and studying abroad programs.
          </p>

        {/* Features */}
        <div className="aboutagency-features">
          <div className="aboutagency-feature">
            <div className="aboutagency-icon red-bg">
              <FaPassport />
            </div>
            <div>
              <h4>Visa Services</h4>
              <p>
                Fast and easy student, work, and travel visa support.
              </p>
            </div>
          </div>

          <div className="aboutagency-feature">
            <div className="aboutagency-icon light-bg">
              <FaRegClock />
            </div>
            <div>
              <h4>Intern Abroad</h4>
              <p>
                Gain global work experience and grow your skills abroad.
              </p>
            </div>
          </div>
        </div>

          {/* Small Image with text */}
          <div className="aboutagency-small">
            <img src={i2} alt="Study Abroad" />
            <p>
              Our study abroad consultancy helps students choose the right universities, apply successfully, and settle abroad with ease.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AboutAgency;
