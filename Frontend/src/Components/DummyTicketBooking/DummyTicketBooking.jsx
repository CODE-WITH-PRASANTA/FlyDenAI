import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './DummyTicketBooking.css'
import { PlaneTakeoff, Hotel, ShieldCheck } from "lucide-react";

// IMPORT CUSTOM COMPONENTS
import AirportDropdown from "./AirportDropdown";
import TravellerModal from "./TravellerModal";
import DatePicker from "./DatePicker";

// BG IMAGES
import bg1 from "../../assets/banner-01.webp";
import bg2 from "../../assets/banner-02.webp";
import bg3 from "../../assets/banner-03.webp";
import bg4 from "../../assets/banner-01.webp";

const DummyTicketBooking = () => {

  const navigate = useNavigate();

  /* -------------------------------------
          HANDLE SEARCH
  -------------------------------------- */
  const handleSearch = () => {

    const bookingId = `${Date.now()}`;

    // FLIGHT SEARCH
    if (activeTab === "flight") {
      if (!fromAirport || !toAirport || !departDate) {
        alert("Please complete Flight fields!");
        return;
      }

      navigate(`/DummyTicket/booking/${bookingId}`, {
        state: {
          type: "flight",
          fromAirport,
          toAirport,
          departDate,
          returnDate,
          tripType,
          adults,
          children,
          infants,
          travelClass
        }
      });
      return;
    }

    // HOTEL SEARCH
    if (activeTab === "hotel") {
      if (!hotelLocation || !checkInDate || !checkOutDate) {
        alert("Please complete Hotel fields!");
        return;
      }

      navigate(`/DummyTicket/booking/${bookingId}`, {
        state: {
          type: "hotel",
          hotelLocation,
          checkInDate,
          checkOutDate,
          adults,
        }
      });
      return;
    }

    // INSURANCE SEARCH
      if (activeTab === "insurance") {
        if (!fromAirport || !toAirport || !insuranceStartDate || !insuranceEndDate) {
          alert("Please complete Insurance fields!");
          return;
        }

        navigate(`/`, {
          state: {
            type: "insurance",
            fromAirport,
            toAirport,
            insuranceStartDate,
            insuranceEndDate,
            adults,
          }
        });
        return;
      }

  };


  /* -------------------------------------
        BACKGROUND SLIDER
  -------------------------------------- */
  const bgImages = [bg1, bg2, bg3, bg4];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  /* -------------------------------------
              STATE
  -------------------------------------- */
  const [activeTab, setActiveTab] = useState("flight");

  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [hotelLocation, setHotelLocation] = useState(null);

  const [travModal, setTravModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const [insuranceStartDate, setInsuranceStartDate] = useState("");
  const [insuranceEndDate, setInsuranceEndDate] = useState("");

  const [tripType, setTripType] = useState("roundTrip");


  return (
    <div
      className="DummyTicket-banner slider-bg"
      style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
    >
      <div className="DummyTicket-container">

        {/* -------------------- TABS -------------------- */}
        <div className="DummyTicket-tabs">
          <button
            onClick={() => setActiveTab("flight")}
            className={`DummyTicket-tab ${activeTab === "flight" ? "active" : ""}`}
          >
            <PlaneTakeoff size={18} /> Flight
          </button>

          <button
            onClick={() => setActiveTab("hotel")}
            className={`DummyTicket-tab ${activeTab === "hotel" ? "active" : ""}`}
          >
            <Hotel size={18} /> Hotels
          </button>

          <button
            onClick={() => setActiveTab("insurance")}
            className={`DummyTicket-tab ${activeTab === "insurance" ? "active" : ""}`}
          >
            <ShieldCheck size={18} /> Insurance
          </button>
        </div>

        {/* -------------------- FLIGHT TAB -------------------- */}
        {activeTab === "flight" && (
          <div className="DummyTicket-panel">
            <div className="DummyTicket-radioRow">
              <label>
                <input
                  type="radio"
                  name="trip"
                  checked={tripType === "oneWay"}
                  onChange={() => setTripType("oneWay")}
                />
                Oneway
              </label>
              <label>
                <input
                  type="radio"
                  name="trip"
                  checked={tripType === "roundTrip"}
                  onChange={() => setTripType("roundTrip")}
                />
                Round Trip
              </label>
            </div>

            <div className="DummyTicket-grid">
              <AirportDropdown label="From" value={fromAirport} onSelect={setFromAirport} />
              <AirportDropdown label="To" value={toAirport} onSelect={setToAirport} />
              <DatePicker label="Departure" value={departDate} onSelect={setDepartDate} />

              {tripType === "roundTrip" && (
                <DatePicker label="Return" value={returnDate} onSelect={setReturnDate} />
              )}

              <div className="DummyTicket-field" onClick={() => setTravModal(true)}>
                <p className="DummyTicket-label">Travellers & Class</p>
                <h3 className="DummyTicket-value">
                  {adults + children + infants} Persons
                </h3>
                <span className="DummyTicket-small">
                  {adults} Adult • {travelClass}
                </span>
              </div>

              <button className="DummyTicket-searchBtn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        )}

        {/* -------------------- HOTEL TAB -------------------- */}
        {activeTab === "hotel" && (
          <div className="DummyTicket-panel">

            <div className="DummyTicket-gridHotel">
              <AirportDropdown label="Location" value={hotelLocation} onSelect={setHotelLocation} />

              <DatePicker label="Check In" value={checkInDate} onSelect={setCheckInDate} />
              <DatePicker label="Check Out" value={checkOutDate} onSelect={setCheckOutDate} />

              <div className="DummyTicket-field" onClick={() => setTravModal(true)}>
                <p className="DummyTicket-label">Guests</p>
                <h3 className="DummyTicket-value">{adults} Persons</h3>
                <span className="DummyTicket-small">{adults} Adult</span>
              </div>

              <button className="DummyTicket-searchBtn" onClick={handleSearch}>
                Search
              </button>
            </div>

          </div>
        )}

        {/* -------------------- INSURANCE TAB -------------------- */}
        {activeTab === "insurance" && (
          <div className="DummyTicket-panel">

            <div className="DummyTicket-insuranceGrid">

              <div className="DummyTicket-inputWrap">
                <p className="DummyTicket-label">From</p>
                <AirportDropdown value={fromAirport} onSelect={setFromAirport} />
              </div>

              <div className="DummyTicket-inputWrap">
                <p className="DummyTicket-label">To</p>
                <AirportDropdown value={toAirport} onSelect={setToAirport} />
              </div>

              <div className="DummyTicket-inputWrap">
                <p className="DummyTicket-label">Start Date</p>
                <DatePicker value={insuranceStartDate} onSelect={setInsuranceStartDate} />
              </div>

              <div className="DummyTicket-inputWrap">
                <p className="DummyTicket-label">End Date</p>
                <DatePicker value={insuranceEndDate} onSelect={setInsuranceEndDate} />
              </div>

              <div className="DummyTicket-full DummyTicket-inputWrap">
                <p className="DummyTicket-label">Purpose</p>
                <select className="DummyTicket-input">
                  <option>Select Purpose</option>
                  <option>Holiday</option>
                  <option>Business Trip</option>
                </select>
              </div>

              <button className="DummyTicket-primaryBtn" onClick={handleSearch}>
                Get Insurance
              </button>
            </div>

          </div>
        )}

      </div>

      {/* TRAVELLER MODAL */}
      <TravellerModal
        open={travModal}
        close={() => setTravModal(false)}
        adults={adults}
        children={children}
        infants={infants}
        setAdults={setAdults}
        setChildren={setChildren}
        setInfants={setInfants}
        travelClass={travelClass}
        setTravelClass={setTravelClass}
      />

    </div>
  );
};

export default DummyTicketBooking;
