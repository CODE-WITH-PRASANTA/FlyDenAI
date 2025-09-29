import React from "react";
import "./ServiceBanner.css";
import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/ab1.jpg";

const ServiceBanner = () => {
  return (
    <div
      className="service-banner"
      style={{ backgroundImage: `url(${ab1})` }}
    >
      <div className="service-overlay">
        <div className="service-content">
          <h1 className="service-title">Our Services</h1>
          <div className="service-breadcrumb">
            <FaHome className="home-icon" />
            <span className="crumb">Home</span>
            <span className="separator">-</span>
            <span className="crumb active">Our Services</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBanner;