import React from "react";
import "./FreeVisaQuotesBanner.css";
import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/ab1.jpg";

const FreeVisaQuotesBanner = () => {
  return (
    <div
      className="freeVisaQuotesBanner"
      style={{ backgroundImage: `url(${ab1})` }}
    >
      <div className="freeVisaQuotesOverlay">
        <div className="freeVisaQuotesContent">
          <h1 className="freeVisaQuotesTitle">Free Visa Quotes</h1>
          <div className="freeVisaQuotesBreadcrumb">
            <FaHome className="homeIcon" />
            <span className="crumb">Home</span>
            <span className="separator">-</span>
            <span className="crumb active">Free Visa Quotes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeVisaQuotesBanner;
