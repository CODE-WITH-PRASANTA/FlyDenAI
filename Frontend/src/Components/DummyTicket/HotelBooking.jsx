// src/components/DummyTicket/HotelBooking.jsx
import React, { useState } from "react";
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

const PRICE_RANGES = [
  "$50 - $150",
  "$150 - $300",
  "$300 - $700",
  "$700 - $2000",
];

const HotelBooking = () => {
  const [location, setLocation] = useState("New York, USA");
  const [checkIn, setCheckIn] = useState("2025-10-21");
  const [checkOut, setCheckOut] = useState("2025-10-23");

  const [priceRange, setPriceRange] = useState(PRICE_RANGES[2]);

  const [showModal, setShowModal] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const guestsSummary = `${adults + children} Guests • ${rooms} Rooms`;

  return (
    <div className="DummyTicket-hotel-grid">

      <div className="DummyTicket-hotel-left">
        <div className="DummyTicket-hotel-title">
          Book Hotel – Villas, Apartments & more.
        </div>

        <div className="DummyTicket-hotel-inputs">

          <Dropdown
            label="City, Property name or Location"
            value={location}
            setValue={setLocation}
            options={COUNTRIES}
          />

          <div className="DummyTicket-hotel-item">
            <label>Check In</label>
            <div className="DummyTicket-field">
              <input
                type="date"
                value={checkIn}
                className="DummyTicket-date-input"
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <div className="DummyTicket-sub-text">
                {new Date(checkIn).toLocaleDateString(undefined, {
                  weekday: "long",
                })}
              </div>
            </div>
          </div>

          <div className="DummyTicket-hotel-item">
            <label>Check Out</label>
            <div className="DummyTicket-field">
              <input
                type="date"
                value={checkOut}
                className="DummyTicket-date-input"
                onChange={(e) => setCheckOut(e.target.value)}
              />
              <div className="DummyTicket-sub-text">
                {new Date(checkOut).toLocaleDateString(undefined, {
                  weekday: "long",
                })}
              </div>
            </div>
          </div>

          <div className="DummyTicket-hotel-item">
            <label>Guests</label>
            <div
              className="DummyTicket-field clickable"
              onClick={() => setShowModal(true)}
            >
              <div className="DummyTicket-main-text">{guestsSummary}</div>
            </div>
          </div>

          <div className="DummyTicket-hotel-item">
            <label>Price per Night</label>
            <div className="DummyTicket-field">
              <div className="DummyTicket-main-text">{priceRange}</div>
              <div className="DummyTicket-sub-text">20+ offers</div>
            </div>

            <select
              className="DummyTicket-price-select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {PRICE_RANGES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="DummyTicket-hotel-right">
        <button className="DummyTicket-action-btn DummyTicket-hotel-search">
          Search
        </button>
      </div>

      {showModal && (
        <TravellersModal
          mode="hotel"
          close={() => setShowModal(false)}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          rooms={rooms}
          setRooms={setRooms}
        />
      )}
    </div>
  );
};

export default HotelBooking;
