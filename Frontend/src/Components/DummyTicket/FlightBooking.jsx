// src/components/DummyTicket/FlightBooking.jsx
import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import Dropdown from "./Dropdown";
import TravellersModal from "./TravellersModal";

const COUNTRIES = [
  "New York, USA",
  "Las Vegas, USA",
  "London, UK",
  "Paris, France",
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
];

const CLASSES = ["Economy", "Premium Economy", "Business", "First Class"];

const FlightBooking = () => {
  const [from, setFrom] = useState("New York, USA");
  const [to, setTo] = useState("Las Vegas, USA");

  const [departure, setDeparture] = useState("2024-10-21");

  const [swapAnimated, setSwapAnimated] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  function handleSwap() {
    setSwapAnimated(true);
    const temp = from;
    setFrom(to);
    setTo(temp);
    setTimeout(() => setSwapAnimated(false), 400);
  }

  const travellerSummary = `${adults + children + infants} Travellers • ${travelClass}`;

  return (
    <>
      <div className="DummyTicket-grid-box">

        {/* FROM */}
        <Dropdown
          label="From"
          value={from}
          setValue={setFrom}
          options={COUNTRIES}
        />

        {/* SWAP */}
        <div className="DummyTicket-swap-wrapper">
          <button
            className={`DummyTicket-swap-btn ${swapAnimated ? "rotating" : ""}`}
            onClick={handleSwap}
          >
            <FaExchangeAlt />
          </button>
        </div>

        {/* TO */}
        <Dropdown
          label="To"
          value={to}
          setValue={setTo}
          options={COUNTRIES}
        />

        {/* DEPARTURE */}
        <div className="DummyTicket-grid-item">
          <label>Departure</label>
          <div className="DummyTicket-field">
            <input
              type="date"
              className="DummyTicket-date-input"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
            <div className="DummyTicket-sub-text">
              {new Date(departure).toLocaleDateString(undefined, {
                weekday: "long",
              })}
            </div>
          </div>
        </div>

        {/* TRAVELLERS */}
        <div className="DummyTicket-grid-item">
          <label>Travellers & Class</label>
          <div
            className="DummyTicket-field clickable"
            onClick={() => setShowModal(true)}
          >
            <div className="DummyTicket-main-text">{travellerSummary}</div>
          </div>
        </div>

        <div className="DummyTicket-action-col">
          <button className="DummyTicket-action-btn">Find Flights</button>
        </div>
      </div>

      {showModal && (
        <TravellersModal
          mode="flight"
          close={() => setShowModal(false)}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          infants={infants}
          setInfants={setInfants}
          travelClass={travelClass}
          setTravelClass={setTravelClass}
          CLASSES={CLASSES}
        />
      )}
    </>
  );
};

export default FlightBooking;
