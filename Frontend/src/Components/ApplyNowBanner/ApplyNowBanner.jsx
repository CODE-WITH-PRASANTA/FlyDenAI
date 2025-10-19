import React from 'react';
import './ApplyNowBanner.css';

// Assets
import IATALogo from "../../assets/iata-logo.webp";
import Mlogo from '../../assets/m-logo.webp';
import Securelogo from '../../assets/secure-logo.webp';
import tafilogo from '../../assets/tafi-logo.webp';

const ApplyNowBanner = () => {
  return (
    <div className="ApplyNow-Banner-Container">
      <div className="ApplyNow-Banner-Content">
        <h1 className="ApplyNow-Banner-Title">United Arab Emirates Visa Online</h1>
        <div className="ApplyNow-Banner-Ribbon">
          <div className="ApplyNow-Banner-RibbonText">99.8% Visa Approval Rate</div>
          <div className="ApplyNow-Banner-Logos">
            <img src={IATALogo} alt="IATA Logo" className="ApplyNow-Banner-Logo" />
            <img src={tafilogo} alt="TAFI Logo" className="ApplyNow-Banner-Logo" />
            <img src={Mlogo} alt="M Logo" className="ApplyNow-Banner-Logo" />
            <img src={Securelogo} alt="Secure Logo" className="ApplyNow-Banner-Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyNowBanner;
