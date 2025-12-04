import React from "react";
import "./DummyTicketFormBanner.css";

import BgImg from "../../assets/DummyTicket-Banner.webp";

const DummyTicketFormBanner = () => {
  return (
    <section className="dt-banner">
      <div className="dt-banner-overlay">
        <div className="dt-banner-container">
          <h1 className="dt-banner-title">Dummy Ticket Booking</h1>
          <nav className="dt-breadcrumb">
            <span className="dt-breadcrumb-item">Home</span>
            <span className="dt-breadcrumb-sep">/</span>
            <span className="dt-breadcrumb-active">Dummy Ticket Booking</span>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default DummyTicketFormBanner;
