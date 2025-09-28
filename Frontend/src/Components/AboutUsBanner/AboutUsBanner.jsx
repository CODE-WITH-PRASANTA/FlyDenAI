import React from "react";
import "./AboutUsBanner.css";
import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/ab1.jpg"; // your image

const AboutUsBanner = () => {
  return (
    <div
      className="about-banner"
      style={{ backgroundImage: `url(${ab1})` }}
    >
      <div className="about-overlay">
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          <div className="breadcrumb">
            <FaHome className="home-icon" />
            <span className="crumb">Home</span>
            <span className="separator">-</span>
            <span className="crumb active">About Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsBanner;
