// src/components/DummyTicket/DummyTicket.jsx
import React, { useState } from "react";
import "./DummyTicket.css";

import { FaPlane, FaHotel, FaShieldAlt } from "react-icons/fa";

import FlightBooking from "./FlightBooking";
import HotelBooking from "./HotelBooking";
import InsuranceBooking from "./InsuranceBooking";

const DummyTicket = () => {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div className="DummyTicket-wrapper">

      {/* TOP HEADER WITH DIFFERENT BACKGROUNDS */}
      <div className={`DummyTicket-header-section ${activeTab}-bg`}>
        <div className="DummyTicket-overlay" />

        <div className="DummyTicket-head-inner">
          {activeTab === "flights" && (
            <>
              <h1>Get Closer to the Essence of Travel</h1>
              <p>Your ultimate destination for premium flights & deals.</p>
            </>
          )}

          {activeTab === "hotels" && (
            <>
              <h1>Discover Luxury Stays & Exclusive Hotel Deals</h1>
              <p>Find villas, apartments and premium hotels.</p>
            </>
          )}

          {activeTab === "insurance" && (
            <>
              <h1>Comprehensive Travel Insurance</h1>
              <p>Protect your journey with tailored plans.</p>
            </>
          )}

          <div className="DummyTicket-category-tabs">
            <button
              onClick={() => setActiveTab("flights")}
              className={activeTab === "flights" ? "active" : ""}
            >
              <FaPlane /> Flights
            </button>

            <button
              onClick={() => setActiveTab("hotels")}
              className={activeTab === "hotels" ? "active" : ""}
            >
              <FaHotel /> Hotels
            </button>

            <button
              onClick={() => setActiveTab("insurance")}
              className={activeTab === "insurance" ? "active" : ""}
            >
              <FaShieldAlt /> Insurance
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="DummyTicket-card">
        {activeTab === "flights" && <FlightBooking />}
        {activeTab === "hotels" && <HotelBooking />}
        {activeTab === "insurance" && <InsuranceBooking />}
      </div>
    </div>
  );
};

export default DummyTicket;
