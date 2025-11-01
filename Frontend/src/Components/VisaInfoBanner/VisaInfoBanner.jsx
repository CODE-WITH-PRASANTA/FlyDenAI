import React from "react";
import "./VisaInfoBanner.css";
import visaBanner from "../../assets/visa-info-banner.webp";

const VisaInfoBanner = () => {
  return (
    <section
      className="visa-info-banner"
      style={{ backgroundImage: `url(${visaBanner})` }}
    >
      <div className="visa-info-banner-overlay">
        <div className="visa-info-banner-content">
          <p className="visa-info-banner-subtitle">VISA INFORMATION</p>
          <h1 className="visa-info-banner-title">
            Find Out The Latest Visa Insights
          </h1>
          <div className="visa-info-banner-breadcrumb">
            <span>Home</span>
            <span className="breadcrumb-divider">{">"}</span>
            <span>Visa</span>
            <span className="breadcrumb-divider">{">"}</span>
            <span className="breadcrumb-current">Visa Info</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaInfoBanner;






