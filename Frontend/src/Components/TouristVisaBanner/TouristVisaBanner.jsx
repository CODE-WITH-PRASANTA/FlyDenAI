import React from 'react';
import './TouristVisaBanner.css';
import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/ab1.jpg";

const TouristVisaBanner = () => {
  return (
    <div
      className="TouristVisa-banner"
      style={{ backgroundImage: `url(${ab1})` }}
    >
      <div className="TouristVisa-overlay">
        <div className="TouristVisa-content">
          <h1 className="TouristVisa-title">Visa Enquiry’s</h1>
          <div className="TouristVisa-breadcrumb">
            <FaHome className="home-icon" />
            <span className="crumb">Home</span>
            <span className="separator">-</span>
            <span className="crumb active">Visa Enquiry’s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristVisaBanner;
