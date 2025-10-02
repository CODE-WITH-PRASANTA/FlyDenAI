import React from "react";
import "./HonorsAwards.css";
import awardsImg from "../../assets/RP.jpg"; 
import cert1 from "../../assets/certificate1.webp"; 
import cert2 from "../../assets/certificate2.webp";
import cert3 from "../../assets/certificate3.webp";

const HonorsAwards = () => {
  return (
    <div className="honors-wrapper">
      <div className="honors-container">
        <div className="honors-image">
          <img src={awardsImg} alt="Awards" />
        </div>
        <div className="honors-details">
          <h2 className="honors-title">
            The impact of our <span>Honors</span> awards
          </h2>
          <p className="honors-description">
            The Most Eminent Visas and Immigration Consultant service provider.
            Branches in India and overseas. The Most Eminent Visas and Immigration.
          </p>
          <div className="certificates">
            <img src={cert1} alt="Certificate 1" />
            <img src={cert2} alt="Certificate 2" />
            <img src={cert3} alt="Certificate 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HonorsAwards;
