import React from 'react'
import './VisaOverviewBanner.css'

import { FaHome } from "react-icons/fa";
import ab1 from "../../assets/Visa-Banner.webp";

const VisaOverviewBanner = () => {
  return (
    <div>
      <div
        className="VisaOverView-banner"
        style={{ backgroundImage: `url(${ab1})` }}
      >
        <div className="VisaOverView-overlay">
          <div className="VisaOverView-content">
            <h1 className="VisaOverView-title">Visa Overview</h1>
            <div className="VisaOverView-breadcrumb">
              <FaHome className="home-icon" />
              <span className="crumb">Home</span>
              <span className="separator">-</span>
              <span className="crumb active">Visa Overview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisaOverviewBanner
