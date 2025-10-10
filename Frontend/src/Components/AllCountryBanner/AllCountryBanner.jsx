import React from "react";
import "./AllCountryBanner.css";
import { FaLocationDot, FaArrowRight } from "react-icons/fa6";
import bannerBg from "../../assets/ab1.webp";

const AllCountryBanner = () => {
  return (
    <section
      className="allcountry-banner"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      <div className="banner-overlay"></div>

      <div className="banner-badge">
        More than <span>50 Lacs</span> Happy Customers
      </div>

      <div className="banner-content">
        <h1 className="banner-title">We make visas easy for you</h1>

        <div className="search-box">
          <FaLocationDot className="search-icon left" />
          <span className="search-text">Search for a Country</span>
          <FaArrowRight className="search-icon right" />
        </div>

        <div className="bottom-ribbon">
          <p>99.2% Visas Delivered On Time</p>
        </div>
      </div>
    </section>
  );
};

export default AllCountryBanner;
