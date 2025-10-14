import React from "react";
import "./VisaDetailsBanner.css";
import { FaRegClock, FaCheckCircle } from "react-icons/fa";
import malaysiaBg from "../../assets/05.webp"; 

const VisaDetailsBanner = () => {
  return (
    <section
      className="visadetailsbanner"
      style={{ backgroundImage: `url(${malaysiaBg})` }}
    >
      <div className="visadetailsbanner-overlay">
        <div className="visadetailsbanner-content">
          <h1 className="visadetailsbanner-title">Malaysia Visa</h1>

          <div className="visadetailsbanner-badge">
            <FaCheckCircle className="visadetailsbanner-badgeicon" />
            <span>
              <strong>99.2%</strong> Visas Approved before Time
            </span>
          </div>

          <div className="visadetailsbanner-info">
            <div className="visadetailsbanner-item">
              <p className="visadetailsbanner-label">Processing time</p>
              <h2 className="visadetailsbanner-value">
                <FaRegClock className="visadetailsbanner-icon" /> 24 hours
              </h2>
            </div>

            <div className="visadetailsbanner-item">
              <p className="visadetailsbanner-label">Starting from</p>
              <h2 className="visadetailsbanner-value">499/-</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaDetailsBanner;
