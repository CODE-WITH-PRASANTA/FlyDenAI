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
          <p className="immigrationsec-tagline">WE MAKE A DIFFERENCE</p>
          <h2 className="immigrationsec-title">
            Welcome to immigration <span className="immigrationsec-italic-red">Advisory</span>{" "}
            services
          </h2>
          <p className="immigrationsec-desc">
            We help investors and entrepreneurs secure citizenship in major
            nations with our top immigration programs. We have a decade of
            experience assisting requirements.
          </p>

          {/* Info box */}
          <div className="immigrationsec-info-box">
            <img src={img1} alt="passport" className="immigrationsec-info-img" />
            <div className="immigrationsec-info-content">
              <h3 className="immigrationsec-info-title">25+ Years of experience in visa and immigration services</h3>
              <p className="immigrationsec-info-text">
                Our global logistics expertise, advanced supply chain technology
                & customized logistics solutions will help you achieve success.
              </p>
            </div>
          </div>

          {/* Button + avatars */}
          <div className="immigrationsec-action-row">
            <button className="immigrationsec-btn-explore">
              Explore More <FaArrowRight />
            </button>
            <div className="immigrationsec-avatars">
              <img src={agent1} alt="agent1" className="immigrationsec-avatar" />
              <img src={agent2} alt="agent2" className="immigrationsec-avatar" />
              <img src={agent3} alt="agent3" className="immigrationsec-avatar" />
              <img src={agent4} alt="agent4" className="immigrationsec-avatar" />
              <span className="immigrationsec-agents">200+ Real Agents</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="immigrationsec-right">
          <img src={im1} alt="student" className="immigrationsec-main-img" />
        </div>
      </div>
    </section>
  );
};

export default ImmigrationSection;
