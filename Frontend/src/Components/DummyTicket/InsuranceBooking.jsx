// src/components/DummyTicket/InsuranceBooking.jsx
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { FaExchangeAlt } from "react-icons/fa";

const COUNTRIES = [
  "New York, USA",
  "Las Vegas, USA",
  "London, UK",
  "Paris, France",
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
];

const PURPOSES = ["Tourism", "Business", "Medical", "Education", "Other"];

const InsuranceBooking = () => {
  const [from, setFrom] = useState("New York, USA");
  const [to, setTo] = useState("London, UK");

  const [startDate, setStartDate] = useState("2024-10-21");
  const [endDate, setEndDate] = useState("2024-10-28");

  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [swapAnimated, setSwapAnimated] = useState(false);

  function handleSwap() {
    setSwapAnimated(true);
    const temp = from;
    setFrom(to);
    setTo(temp);
    setTimeout(() => setSwapAnimated(false), 400);
  }

  return (
    <div className="DummyTicket-insurance-grid">
      <div className="DummyTicket-insurance-left">
        <div className="DummyTicket-insurance-title">
          Comprehensive Travel Insurance – Peace of Mind Guaranteed
        </div>

        <div className="DummyTicket-insurance-rows">

          <Dropdown
            label="From"
            value={from}
            setValue={setFrom}
            options={COUNTRIES}
          />

          <div className="DummyTicket-swap-wrapper">
            <button
              className={`DummyTicket-swap-btn ${swapAnimated ? "rotating" : ""}`}
              onClick={handleSwap}
            >
              <FaExchangeAlt />
            </button>
          </div>

          <Dropdown
            label="To"
            value={to}
            setValue={setTo}
            options={COUNTRIES}
          />

          {/* START DATE */}
          <div className="DummyTicket-grid-item">
            <label>Start Date</label>
            <div className="DummyTicket-field">
              <input
                type="date"
                className="DummyTicket-date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <div className="DummyTicket-sub-text">
                {new Date(startDate).toLocaleDateString(undefined, {
                  weekday: "long",
                })}
              </div>
            </div>
          </div>

          {/* END DATE */}
          <div className="DummyTicket-grid-item">
            <label>End Date</label>
            <div className="DummyTicket-field">
              <input
                type="date"
                className="DummyTicket-date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div className="DummyTicket-sub-text">
                {new Date(endDate).toLocaleDateString(undefined, {
                  weekday: "long",
                })}
              </div>
            </div>
          </div>

          {/* PURPOSE */}
          <div className="DummyTicket-grid-item">
            <label>Purpose</label>
            <div className="DummyTicket-field">
              <select
                className="DummyTicket-purpose-select"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                {PURPOSES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <div className="DummyTicket-sub-text">Select purpose</div>
            </div>
          </div>
        </div>
      </div>

      <div className="DummyTicket-insurance-right">
        <button className="DummyTicket-action-btn DummyTicket-insurance-get">
          Get Insurance
        </button>
      </div>
    </div>
  );
};

export default InsuranceBooking;
