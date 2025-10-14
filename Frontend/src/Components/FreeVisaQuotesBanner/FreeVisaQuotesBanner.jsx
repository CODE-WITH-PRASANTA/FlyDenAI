import React from "react";
import "./FreeVisaQuotesBanner.css";
import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/ab1.jpg";

const FreeVisaQuotesBanner = () => {
  return (
    <div
         className="Free-Visa-Quotes-banner"
         style={{ backgroundImage: `url(${ab1})` }}
       >
         <div className="Free-Visa-Quotes-overlay">
           <div className="Free-Visa-Quotes-content">
             <h1 className="Free-Visa-Quotes-title">Blog Details</h1>
             <div className="Free-Visa-Quotes-breadcrumb">
               <FaHome className="home-icon" />
               <span className="crumb">Home</span>
               <span className="separator">-</span>
               <span className="crumb active">Blog Details</span>
             </div>
           </div>
         </div>
       </div>
  );
};

export default FreeVisaQuotesBanner;
