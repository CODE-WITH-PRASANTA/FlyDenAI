import React from "react";
import "./TeamDetailsBanner.css";
import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/ab1.jpg";

const TeamDetailsBanner = () => {
  return (
    <div
      className="teamdetails-banner"
      style={{ backgroundImage: `url(${ab1})` }}
    >
      <div className="teamdetails-overlay">
        <div className="teamdetails-content">
          <h1 className="teamdetails-title">Team Details</h1>
          <div className="teamdetails-breadcrumb">
            <FaHome className="home-icon" />
            <span className="crumb">Home</span>
            <span className="separator">-</span>
            <span className="crumb active">Team Details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsBanner;
