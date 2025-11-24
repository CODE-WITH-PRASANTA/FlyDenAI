import React, { useState } from "react";
import TravellersModal from "./TravellersModal";
import "./DummyTicket.css"; // make sure this file exists (the CSS I provided earlier)

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
  const [location, setLocation] = useState(COUNTRIES[0]);
  const [checkIn, setCheckIn] = useState("2025-10-21");
  const [checkOut, setCheckOut] = useState("2025-10-23");

  const [priceRange, setPriceRange] = useState(PRICE_RANGES[2]);

  const [showModal, setShowModal] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  const guestsSummary = `${adults + children} Guests • ${rooms} Rooms`;

  return (
    <div className="DummyTicket-hotel-grid">
      <div className="DummyTicket-hotel-left">
        <div className="DummyTicket-hotel-title">
          Book Hotel – Villas, Apartments & more.
        </div>

        <div className="DummyTicket-hotel-inputs">
          {/* City/location card — uses the city-card class for special styling */}
          <div className="DummyTicket-hotel-item city-card">
            <label htmlFor="hotel-location">City, Property name or Location</label>
            <div className="DummyTicket-field" id="hotel-location">
              <select
                className="DummyTicket-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="City, Property name or Location"
                aria-describedby="hotel-location-hint"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <div className="DummyTicket-sub-text" id="hotel-location-hint">
                Selected: {location}
              </div>
            </div>
          </div>

          <div className="DummyTicket-hotel-item">
            <label htmlFor="check-in">Check In</label>
            <div className="DummyTicket-field">
              <input
                id="check-in"
                type="date"
                value={checkIn}
                className="DummyTicket-date-input"
                onChange={(e) => setCheckIn(e.target.value)}
                aria-label="Check in date"
              />
              <div className="DummyTicket-sub-text">
                {checkIn
                  ? new Date(checkIn).toLocaleDateString(undefined, {
                      weekday: "long",
                    })
                  : ""}
              </div>
            </div>
          </div>

          <div className="DummyTicket-hotel-item">
            <label htmlFor="check-out">Check Out</label>
            <div className="DummyTicket-field">
              <input
                id="check-out"
                type="date"
                value={checkOut}
                className="DummyTicket-date-input"
                onChange={(e) => setCheckOut(e.target.value)}
                aria-label="Check out date"
              />
              <div className="DummyTicket-sub-text">
                {checkOut
                  ? new Date(checkOut).toLocaleDateString(undefined, {
                      weekday: "long",
                    })
                  : ""}
              </div>
            </div>
          </div>

          <div className="DummyTicket-hotel-item">
            <label>Guests</label>
            <div
              className="DummyTicket-field clickable"
              onClick={() => setShowModal(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowModal(true);
              }}
              aria-haspopup="dialog"
              aria-label="Open guest selector"
            >
              <div className="DummyTicket-main-text">{guestsSummary}</div>
              <div className="DummyTicket-sub-text">
                {adults} adults • {children} children • {infants} infants
              </div>
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
              aria-label="Price range per night"
            >
              {PRICE_RANGES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="DummyTicket-hotel-right">
        <button
          className="DummyTicket-action-btn DummyTicket-hotel-search"
          onClick={() =>
            alert(
              `Searching hotels in ${location} from ${checkIn} to ${checkOut} — ${guestsSummary}, Price: ${priceRange}`
            )
          }
          aria-label="Search hotels"
          type="button"
        >
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
          infants={infants}
          setInfants={setInfants}
          rooms={rooms}
          setRooms={setRooms}
          travelClass={travelClass}
          setTravelClass={setTravelClass}
        />
      )}
    </div>
  );
};

export default HotelBooking;
