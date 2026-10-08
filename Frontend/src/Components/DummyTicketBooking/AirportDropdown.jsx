import React, { useEffect, useRef, useState } from "react";
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

  /* ============================================================
     CLOSE ON OUTSIDE CLICK
  ============================================================ */

  useEffect(() => {
    const handler = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  /* ============================================================
     FETCH AIRPORTS
  ============================================================ */

  const fetchAirports = async (query = "") => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${BASE_URL}/airports`, {
        params: {
          search: query,
          limit: 20,
        },
      });

      if (res.data?.success) {
        setAirports(res.data.data || []);
      } else {
        setAirports([]);
        setError("No airport found");
      }
    } catch (err) {
      console.error("Airport fetch error:", err);

      setAirports([]);
      setError("Failed to load airports");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     SEARCH DEBOUNCE
  ============================================================ */

  useEffect(() => {
    if (!open) return;

    const delaySearch = setTimeout(() => {
      fetchAirports(searchTerm);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [open, searchTerm]);

  /* ============================================================
     SELECT AIRPORT
  ============================================================ */

  const handleSelect = (airport) => {
    onSelect(airport);

    setOpen(false);
    setSearchTerm("");
  };

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div
      className={`DummyTicket-airportWrap ${
        open ? "DummyTicket-airportWrap-open" : ""
      }`}
      ref={dropdownRef}
    >
      {/* LABEL */}

      <p className="DummyTicket-label">
        {label}
      </p>

      {/* AIRPORT FIELD */}

      <button
        type="button"
        className="DummyTicket-airportBox"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <div className="DummyTicket-airportBoxInner">
          <div className="DummyTicket-airportText">
            <strong>
              {value?.airportName || "Select Airport"}
            </strong>

            {value?.countryName && (
              <span>
                {value.countryName}
              </span>
            )}
          </div>

          <span className="DummyTicket-airportArrow">
            {open ? "⌃" : "⌄"}
          </span>
        </div>
      </button>

      {/* AIRPORT DROPDOWN */}

      {open && (
        <div className="DummyTicket-airportDropdown">

          {/* SEARCH */}

          <div className="DummyTicket-airportSearch">
            <Search
              size={15}
              className="DummyTicket-airSearchIcon"
            />

            <input
              type="text"
              placeholder="Search airport or country"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              autoFocus
            />
          </div>

          {/* LIST */}

          <div className="DummyTicket-airportListScroll">

            {loading && (
              <div className="DummyTicket-airportMessage">
                <span className="DummyTicket-spinner" />
                <span>Loading airports...</span>
              </div>
            )}

            {!loading && error && (
              <div className="DummyTicket-airportMessage DummyTicket-airportError">
                {error}
              </div>
            )}

            {!loading &&
              !error &&
              airports.length === 0 && (
                <div className="DummyTicket-airportMessage">
                  No airport found
                </div>
              )}

            {!loading &&
              !error &&
              airports.map((airport) => (
                <button
                  type="button"
                  key={airport._id}
                  className="DummyTicket-airportItem"
                  onClick={() =>
                    handleSelect(airport)
                  }
                >
                  <div className="DummyTicket-airportItemText">
                    <strong>
                      {airport.airportName}
                    </strong>

                    <span>
                      {airport.countryName}
                    </span>
                  </div>

                  <span className="DummyTicket-airportItemArrow">
                    ›
                  </span>
                </button>
              ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default AirportDropdown;