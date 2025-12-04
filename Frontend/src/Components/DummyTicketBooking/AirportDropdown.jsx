// components/AirportDropdown.jsx
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import BASE_URL from "../../Api";
import "./DummyTicketBooking.css";

const AirportDropdown = ({ label, value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch airports from backend
  const fetchAirports = async (query = "") => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/airports?search=${query}&limit=20`
      );

      if (res.data?.success) {
        setAirports(res.data.data);
        setError("");
      } else {
        setError("No airport found");
      }
    } catch (err) {
      setError("Failed to load airports");
    } finally {
      setLoading(false);
    }
  };

  // Load airports whenever dropdown opens or searchTerm changes
  useEffect(() => {
    if (open) {
      const delaySearch = setTimeout(() => {
        fetchAirports(searchTerm);
      }, 300); // debounce

      return () => clearTimeout(delaySearch);
    }
  }, [open, searchTerm]);

  return (
    <div className="DummyTicket-airportWrap" ref={dropdownRef}>
      <p className="DummyTicket-label">{label}</p>

      <div className="DummyTicket-airportBox" onClick={() => setOpen(!open)}>
        <h3 className="DummyTicket-value">
          {value?.airportName || "Select Airport"}
        </h3>
        <span className="DummyTicket-small">{value?.countryName || ""}</span>
      </div>

      {open && (
        <div className="DummyTicket-airportDropdown">
          {/* Search Box */}
          <div className="DummyTicket-airportSearch">
            <input
              type="text"
              placeholder="Search Airport or Country"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} className="DummyTicket-airSearchIcon" />
          </div>

          {/* Airport List */}
          <div className="DummyTicket-airportListScroll">
            {loading && <p className="DummyTicket-loading">Loading...</p>}

            {!loading && error && (
              <p className="DummyTicket-error">{error}</p>
            )}

           {!loading &&
            !error &&
            airports.map((airport) => (
              <div
                key={airport._id}
                className="DummyTicket-airportItem"
                onClick={() => {
                  onSelect(airport);
                  setOpen(false);
                }}
              >
                {/* BIG COUNTRY NAME */}
                <h4 className="DummyTicket-airportCityHighlight">
                  {airport.countryName}
                </h4>

                {/* SMALL AIRPORT NAME */}
                <p className="DummyTicket-airportTitleSmall">
                  ✈ {airport.airportName}
                </p>
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default AirportDropdown;
