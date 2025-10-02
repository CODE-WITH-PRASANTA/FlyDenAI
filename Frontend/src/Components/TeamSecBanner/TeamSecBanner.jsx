import React from "react";
import "./TeamSecBanner.css";
import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/ab1.jpg";

const TeamSecBanner = () => {
  return (
    <div
      className="teamsecbanner-banner"
      style={{ backgroundImage: `url(${ab1})` }}
    >
      <div className="teamsecbanner-overlay">
        <div className="teamsecbanner-content">
          <h1 className="teamsecbanner-title">Team</h1>
          <div className="teamsecbanner-breadcrumb">
            <FaHome className="teamsecbanner-home-icon" />
            <span className="teamsecbanner-crumb">Home</span>
            <span className="teamsecbanner-separator">-</span>
            <span className="teamsecbanner-crumb active">Team</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSecBanner;
