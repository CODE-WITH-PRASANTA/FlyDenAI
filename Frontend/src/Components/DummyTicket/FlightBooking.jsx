// src/components/DummyTicket/FlightBooking.jsx
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import TravellersModal from "./TravellersModal";
import { FaExchangeAlt } from "react-icons/fa";

// Airport data with city and airport name (matching your image)
const AIRPORTS = [
  { city: "New York", airport: "John F. Kennedy International Airport" },
  { city: "Boston", airport: "Boston Logan International Airport" },
  { city: "Northern Virginia", airport: "Dulles International Airport" },
  { city: "Los Angeles", airport: "Los Angeles International Airport" },
  { city: "Las Vegas", airport: "McCarran International Airport" },
  { city: "London", airport: "Heathrow Airport" },
  { city: "Paris", airport: "Charles de Gaulle Airport" },
  { city: "Tokyo", airport: "Narita International Airport" },
  { city: "Dubai", airport: "Dubai International Airport" },
  { city: "Singapore", airport: "Changi Airport" }
];

const TRIP_TYPES = ["One Way", "Round Trip", "Multi City"];
const CLASSES = ["Economy", "Premium Economy", "Business", "First Class"];

const FlightBooking = () => {
  const [tripType, setTripType] = useState("Round Trip");
  const [from, setFrom] = useState("New York");
  const [to, setTo] = useState("London");
  const [departDate, setDepartDate] = useState("2024-10-21");
  const [returnDate, setReturnDate] = useState("2024-10-28");
  
  const [showModal, setShowModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  const [swapAnimated, setSwapAnimated] = useState(false);

  const travellersSummary = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}${infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}`;

  function handleSwap() {
    setSwapAnimated(true);
    const temp = from;
    setFrom(to);
    setTo(temp);
    setTimeout(() => setSwapAnimated(false), 400);
  }

  return (
    <div className="DummyTicket-flight-booking">
      {/* Trip Type Selection */}
      <div className="DummyTicket-top-row">
        <div className="DummyTicket-trip-types">
          {TRIP_TYPES.map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="tripType"
                checked={tripType === type}
                onChange={() => setTripType(type)}
              />
              {type}
            </label>
          ))}
        </div>
        
        <div className="DummyTicket-right-mini">
          Book international and domestic flights
        </div>
      </div>

      {/* Main Booking Form */}
      <div className="DummyTicket-grid-box">
        <Dropdown
          label="From"
          value={from}
          setValue={setFrom}
          options={AIRPORTS}
        />

        <div className="DummyTicket-swap-wrapper">
          <button
            className={`DummyTicket-swap-btn ${swapAnimated ? "rotating" : ""}`}
            onClick={handleSwap}
            aria-label="Swap destinations"
          >
            <FaExchangeAlt />
          </button>
        </div>

        <Dropdown
          label="To"
          value={to}
          setValue={setTo}
          options={AIRPORTS}
        />

        {/* Departure Date */}
        <div className="DummyTicket-grid-item">
          <label>Departure</label>
          <div className="DummyTicket-field">
            <input
              type="date"
              className="DummyTicket-date-input"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
            />
            <div className="DummyTicket-sub-text">
              {new Date(departDate).toLocaleDateString(undefined, {
                weekday: "long",
              })}
            </div>
          </div>
        </div>

        {/* Return Date - Only show for Round Trip */}
        {tripType === "Round Trip" && (
          <div className="DummyTicket-grid-item">
            <label>Return</label>
            <div className="DummyTicket-field">
              <input
                type="date"
                className="DummyTicket-date-input"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
              <div className="DummyTicket-sub-text">
                {new Date(returnDate).toLocaleDateString(undefined, {
                  weekday: "long",
                })}
              </div>
            </div>
          </div>
        )}

        {/* Travellers & Class */}
        <div className="DummyTicket-grid-item">
          <label>Travellers & Class</label>
          <div
            className="DummyTicket-field clickable"
            onClick={() => setShowModal(true)}
          >
            <div className="DummyTicket-main-text">{travellersSummary}</div>
            <div className="DummyTicket-sub-text">{travelClass}</div>
          </div>
        </div>

        {/* Search Button */}
        <div className="DummyTicket-action-col">
          <button className="DummyTicket-action-btn DummyTicket-flight-search">
            Search
          </button>
        </div>
      </div>

      {/* Travellers Modal */}
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
    </div>
  );
};

export default FlightBooking;