// ImmigrationSection.jsx
import React from "react";
import "./ImmigrationSection.css";
import { FaArrowRight } from "react-icons/fa";
import agent1 from "../../assets/agent1.jpg";
import agent2 from "../../assets/agent2.jpg";
import agent3 from "../../assets/agent3.jpg"; 
import agent4 from "../../assets/agent4.jpg"; 
import im1 from "../../assets/im1.png";
import img1 from "../../assets/single-img-1.png";

const ImmigrationSection = () => {
  return (
    <section className="immigrationsec-section">
      <div className="immigrationsec-container">
        {/* Left Content */}
        <div className="immigrationsec-left">
          <p className="immigrationsec-tagline">OPEN NEW GLOBAL OPPORTUNITIES</p>
          <h2 className="immigrationsec-title">
            FlyDenAi <span className="immigrationsec-italic-red">Visa & Abroad</span> Services
          </h2>
          <p className="immigrationsec-desc">
            We simplify international opportunities with professional services for Visa applications, global internships, and studying abroad. FlyDenAi makes your journey smooth, reliable, and successful.
          </p>

          {/* Info box - each service with image on left */}
          <div className="immigrationsec-info-box">
            <div className="immigrationsec-service">
              <img src={img1} alt="Visa Service" className="immigrationsec-info-img" />
              <div className="immigrationsec-info-content">
                <h3 className="immigrationsec-info-title">Visa Services</h3>
                <p className="immigrationsec-info-text">
                  Get complete guidance for student, work, or travel visas. We handle documentation, preparation, and submission for faster approvals.
                </p>
              </div>
            </div>

            <div className="immigrationsec-service">
              <img src={img1} alt="Intern Abroad" className="immigrationsec-info-img" />
              <div className="immigrationsec-info-content">
                <h3 className="immigrationsec-info-title">Intern Abroad</h3>
                <p className="immigrationsec-info-text">
                  Gain international experience with our global internship programs. Learn, grow, and build your professional network abroad.
                </p>
              </div>
            </div>

            <div className="immigrationsec-service">
              <img src={img1} alt="Study Abroad" className="immigrationsec-info-img" />
              <div className="immigrationsec-info-content">
                <h3 className="immigrationsec-info-title">Study Abroad</h3>
                <p className="immigrationsec-info-text">
                  Pursue your dream education overseas. We assist with university selection, applications, and pre-departure support for a smooth journey.
                </p>
              </div>
            </div>
          </div>

          {/* Button + avatars */}
          <div className="immigrationsec-action-row">
            {/* <button className="immigrationsec-btn-explore">
              Explore Services <FaArrowRight />
            </button> */}
            <div className="immigrationsec-avatars">
              <img src={agent1} alt="agent1" className="immigrationsec-avatar" />
              <img src={agent2} alt="agent2" className="immigrationsec-avatar" />
              <img src={agent3} alt="agent3" className="immigrationsec-avatar" />
              <img src={agent4} alt="agent4" className="immigrationsec-avatar" />
              <span className="immigrationsec-agents">200+ Experienced Consultants</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="immigrationsec-right">
          <img src={im1} alt="services illustration" className="immigrationsec-main-img" />
        </div>
      </div>
    </section>
  );
};

export default ImmigrationSection;
