import React from "react";
import "./ImmigrationSection.css";
import { FaArrowRight } from "react-icons/fa";
import agent1 from "../../assets/agent1.jpg";
import agent2 from "../../assets/agent2.jpg";
import agent3 from "../../assets/agent3.jpg"; 
import agent4 from "../../assets/agent4.jpg"; 
import im1 from "../../assets/im1.png"
import img1 from "../../assets/single-img-1.png"


const ImmigrationSection = () => {
  return (
    <section className="immigration-section">
      <div className="immigration-container">
        {/* Left Content */}
        <div className="immigration-left">
          <p className="tagline">WE MAKE A DIFFERENCE</p>
          <h2 className="title">
            Welcome to immigration <span className="italic-red">Advisory</span>{" "}
            services
          </h2>
          <p className="desc">
            We help investors and entrepreneurs secure citizenship in major
            nations with our top immigration programs. We have a decade of
            experience assisting requirements.
          </p>

          {/* Info box */}
          <div className="info-box">
            <img src={img1} alt="passport" className="info-img" />
            <div>
              <h3>25+ Years of experience in visa and immigrations services</h3>
              <p>
                Our global logistics expertise, advanced supplychain technology
                & customized logistics lorem ipsum conatry solutions will help.
              </p>
            </div>
          </div>

          {/* Button + avatars */}
          <div className="action-row">
            <button className="btn-explore">
              Explore More <FaArrowRight />
            </button>
            <div className="avatars">
              <img src={agent1} alt="agent1" />
              <img src={agent2} alt="agent2" />
              <img src={agent3} alt="agent3" />
              <img src={agent4} alt="agent4" />
              <span className="agents">200+ Real Agents</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="immigration-right">
          <img src={im1} alt="student" className="main-img" />
        </div>
      </div>
    </section>
  );
};

export default ImmigrationSection;
