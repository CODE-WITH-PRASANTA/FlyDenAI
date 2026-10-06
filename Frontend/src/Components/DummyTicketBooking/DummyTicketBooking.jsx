import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DummyTicketBooking.css";

import {
  PlaneTakeoff,
  Hotel,
  ShieldCheck,
  Globe2,
  Sparkles,
} from "lucide-react";

import BASE_URL from "../../Api";
import Swal from "sweetalert2";

// Custom Components
import AirportDropdown from "./AirportDropdown";
import TravellerModal from "./TravellerModal";
import DatePicker from "./DatePicker";

// Background Images
import bg1 from "../../assets/banner-01.webp";
import bg2 from "../../assets/banner-02.webp";
import bg3 from "../../assets/banner-03.webp";
import bg4 from "../../assets/banner-01.webp";

const DummyTicketBooking = () => {
  const navigate = useNavigate();

  // ============================================================
  // BACKGROUND SLIDER
  // ============================================================

  const bgImages = [bg1, bg2, bg3, bg4];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // ALL STATES
  // ============================================================

  const [activeTab, setActiveTab] = useState("flight");

  // Flight / Insurance
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);

  // Hotel
  const [hotelLocation, setHotelLocation] = useState(null);

  // Travellers
  const [travModal, setTravModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  // Flight Dates
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("roundTrip");

  // Hotel Dates
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Insurance
  const [insuranceStartDate, setInsuranceStartDate] = useState("");
  const [insuranceEndDate, setInsuranceEndDate] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [travelPurpose, setTravelPurpose] = useState("");

  // ============================================================
  // SEARCH / SUBMIT
  // ============================================================

  const handleSearch = async () => {
    const bookingId = `${Date.now()}`;

    // ------------------------------------------------------------
    // FLIGHT
    // ------------------------------------------------------------

    if (activeTab === "flight") {
      if (!fromAirport || !toAirport || !departDate) {
        return Swal.fire(
          "Missing Fields",
          "Please complete flight fields!",
          "warning"
        );
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
          travelClass,
        },
      });

      return;
    }

    // ------------------------------------------------------------
    // HOTEL
    // ------------------------------------------------------------

    if (activeTab === "hotel") {
      if (!hotelLocation || !checkInDate || !checkOutDate) {
        return Swal.fire(
          "Missing Fields",
          "Please complete hotel fields!",
          "warning"
        );
      }

      navigate(`/DummyTicket/booking/${bookingId}`, {
        state: {
          type: "hotel",
          hotelLocation,
          checkInDate,
          checkOutDate,
          adults,
        },
      });

      return;
    }

    // ------------------------------------------------------------
    // INSURANCE
    // ------------------------------------------------------------

    if (activeTab === "insurance") {
      if (
        !fullName ||
        !email ||
        !phone ||
        !whatsapp ||
        !fromAirport ||
        !toAirport ||
        !insuranceStartDate ||
        !insuranceEndDate ||
        !travelPurpose
      ) {
        return Swal.fire(
          "Missing Fields",
          "Please complete insurance form!",
          "warning"
        );
      }

      try {
        const response = await fetch(`${BASE_URL}/insurance/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            phone,
            whatsapp,
            fromAirport,
            toAirport,
            insuranceStartDate,
            insuranceEndDate,
            travelPurpose,
            bookingId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Insurance Submitted!",
            text: "Your insurance request has been successfully submitted.",
            timer: 2000,
            showConfirmButton: false,
          });

          setFullName("");
          setEmail("");
          setPhone("");
          setWhatsapp("");
          setFromAirport(null);
          setToAirport(null);
          setInsuranceStartDate("");
          setInsuranceEndDate("");
          setTravelPurpose("");
        } else {
          Swal.fire(
            "Error",
            data.message || "Unable to submit insurance request.",
            "error"
          );
        }
      } catch (error) {
        console.error("INSURANCE ERROR:", error);

        Swal.fire(
          "Error",
          "Something went wrong while submitting your request!",
          "error"
        );
      }

      return;
    }
  };

  // ============================================================
  // TAB CHANGE
  // ============================================================

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section
      className="DummyTicket-banner slider-bg"
      style={{
        backgroundImage: `url(${bgImages[bgIndex]})`,
      }}
    >
      <div className="DummyTicket-overlay"></div>

      <div className="DummyTicket-floating-shape DummyTicket-shape-one"></div>
      <div className="DummyTicket-floating-shape DummyTicket-shape-two"></div>
      <div className="DummyTicket-floating-shape DummyTicket-shape-three"></div>

      <div className="DummyTicket-container">
        {/* ========================================================
            BRAND HEADER
        ======================================================== */}

        <div className="DummyTicket-brandHeader">
          <div className="DummyTicket-brandIcon">
            <Globe2 size={22} />
          </div>

          <div className="DummyTicket-brandText">
            <span className="DummyTicket-brandSmall">
              FLYIXO GLOBAL SERVICES
            </span>

            <h1>
              Plan Your Journey With <strong>Flyixo</strong>
            </h1>
          </div>

          <div className="DummyTicket-brandSpark">
            <Sparkles size={20} />
          </div>
        </div>

        <div className="DummyTicket-description">
          <p>
            Book dummy tickets, find hotels and get travel insurance support
            with a simple and professional Flyixo experience.
          </p>
        </div>

        {/* ========================================================
            TABS
        ======================================================== */}

        <div className="DummyTicket-tabs">
          <button
            type="button"
            onClick={() => handleTabChange("flight")}
            className={`DummyTicket-tab ${
              activeTab === "flight" ? "active" : ""
            }`}
          >
            <span className="DummyTicket-tabIcon">
              <PlaneTakeoff size={19} />
            </span>

            <span>
              <strong>Flight</strong>
              <small>Dummy Ticket</small>
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("hotel")}
            className={`DummyTicket-tab ${
              activeTab === "hotel" ? "active" : ""
            }`}
          >
            <span className="DummyTicket-tabIcon">
              <Hotel size={19} />
            </span>

            <span>
              <strong>Hotels</strong>
              <small>Stay Booking</small>
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("insurance")}
            className={`DummyTicket-tab ${
              activeTab === "insurance" ? "active" : ""
            }`}
          >
            <span className="DummyTicket-tabIcon">
              <ShieldCheck size={19} />
            </span>

            <span>
              <strong>Insurance</strong>
              <small>Travel Protection</small>
            </span>
          </button>
        </div>

        {/* ========================================================
            FLIGHT
        ======================================================== */}

        {activeTab === "flight" && (
          <div className="DummyTicket-panel">
            <div className="DummyTicket-panelHeader">
              <div>
                <span className="DummyTicket-panelEyebrow">
                  FLYIXO FLIGHT SERVICES
                </span>

                <h2>Search Your Flight</h2>

                <p>
                  Choose your route, travel dates and passenger details.
                </p>
              </div>

              <div className="DummyTicket-securityBadge">
                <ShieldCheck size={16} />
                <span>Secure Booking</span>
              </div>
            </div>

            <div className="DummyTicket-radioRow">
              <label className="DummyTicket-radioCard">
                <input
                  type="radio"
                  checked={tripType === "oneWay"}
                  onChange={() => setTripType("oneWay")}
                />

                <span className="DummyTicket-customRadio"></span>

                <span>
                  <strong>One Way</strong>
                  <small>Single journey</small>
                </span>
              </label>

              <label className="DummyTicket-radioCard">
                <input
                  type="radio"
                  checked={tripType === "roundTrip"}
                  onChange={() => setTripType("roundTrip")}
                />

                <span className="DummyTicket-customRadio"></span>

                <span>
                  <strong>Round Trip</strong>
                  <small>Return journey</small>
                </span>
              </label>
            </div>

            <div className="DummyTicket-grid">
              <div className="DummyTicket-componentField">
                <AirportDropdown
                  label="From"
                  value={fromAirport}
                  onSelect={setFromAirport}
                />
              </div>

              <div className="DummyTicket-componentField">
                <AirportDropdown
                  label="To"
                  value={toAirport}
                  onSelect={setToAirport}
                />
              </div>

              <div className="DummyTicket-componentField">
                <DatePicker
                  label="Departure"
                  value={departDate}
                  onSelect={setDepartDate}
                />
              </div>

              {tripType === "roundTrip" && (
                <div className="DummyTicket-componentField">
                  <DatePicker
                    label="Return"
                    value={returnDate}
                    onSelect={setReturnDate}
                  />
                </div>
              )}

              <div
                className="DummyTicket-field"
                onClick={() => setTravModal(true)}
                role="button"
                tabIndex={0}
              >
                <p className="DummyTicket-label">Travellers & Class</p>

                <h3 className="DummyTicket-value">
                  {adults + children + infants} Persons
                </h3>

                <span className="DummyTicket-small">
                  {adults} Adult • {travelClass}
                </span>
              </div>

              <button
                type="button"
                className="DummyTicket-searchBtn"
                onClick={handleSearch}
              >
                <PlaneTakeoff size={18} />
                <span>Search Flight</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            HOTEL
        ======================================================== */}

        {activeTab === "hotel" && (
          <div className="DummyTicket-panel">
            <div className="DummyTicket-panelHeader">
              <div>
                <span className="DummyTicket-panelEyebrow">
                  FLYIXO HOTEL SERVICES
                </span>

                <h2>Find Your Perfect Stay</h2>

                <p>
                  Select your destination, dates and number of guests.
                </p>
              </div>

              <div className="DummyTicket-securityBadge">
                <Hotel size={16} />
                <span>Comfortable Stays</span>
              </div>
            </div>

            <div className="DummyTicket-gridHotel">
              <div className="DummyTicket-componentField">
                <AirportDropdown
                  label="Location"
                  value={hotelLocation}
                  onSelect={setHotelLocation}
                />
              </div>

              <div className="DummyTicket-componentField">
                <DatePicker
                  label="Check In"
                  value={checkInDate}
                  onSelect={setCheckInDate}
                />
              </div>

              <div className="DummyTicket-componentField">
                <DatePicker
                  label="Check Out"
                  value={checkOutDate}
                  onSelect={setCheckOutDate}
                />
              </div>

              <div
                className="DummyTicket-field"
                onClick={() => setTravModal(true)}
                role="button"
                tabIndex={0}
              >
                <p className="DummyTicket-label">Guests</p>

                <h3 className="DummyTicket-value">
                  {adults} Persons
                </h3>

                <span className="DummyTicket-small">
                  {adults} Adult
                </span>
              </div>

              <button
                type="button"
                className="DummyTicket-searchBtn"
                onClick={handleSearch}
              >
                <Hotel size={18} />
                <span>Search Hotels</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            INSURANCE
        ======================================================== */}

        {activeTab === "insurance" && (
          <div className="DummyTicket-panel">
            <div className="DummyTicket-panelHeader">
              <div>
                <span className="DummyTicket-panelEyebrow">
                  FLYIXO TRAVEL INSURANCE
                </span>

                <h2>Protect Your Journey</h2>

                <p>
                  Submit your details and our team will assist you with your
                  travel insurance request.
                </p>
              </div>

              <div className="DummyTicket-securityBadge">
                <ShieldCheck size={16} />
                <span>Travel Protection</span>
              </div>
            </div>

            <div className="DummyTicket-insuranceGrid">
              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  Full Name
                </label>

                <input
                  type="text"
                  className="DummyTicket-inputField"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  Email Address
                </label>

                <input
                  type="email"
                  className="DummyTicket-inputField"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  Phone Number
                </label>

                <input
                  type="tel"
                  className="DummyTicket-inputField"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder="Enter phone number"
                />
              </div>

              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  WhatsApp Number
                </label>

                <input
                  type="tel"
                  className="DummyTicket-inputField"
                  maxLength={10}
                  value={whatsapp}
                  onChange={(e) =>
                    setWhatsapp(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder="Enter WhatsApp number"
                />
              </div>

              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  From
                </label>

                <AirportDropdown
                  value={fromAirport}
                  onSelect={setFromAirport}
                />
              </div>

              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  To
                </label>

                <AirportDropdown
                  value={toAirport}
                  onSelect={setToAirport}
                />
              </div>

              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  Insurance Start Date
                </label>

                <DatePicker
                  value={insuranceStartDate}
                  onSelect={setInsuranceStartDate}
                />
              </div>

              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  Insurance End Date
                </label>

                <DatePicker
                  value={insuranceEndDate}
                  onSelect={setInsuranceEndDate}
                />
              </div>

              <div className="DummyTicket-inputGroup DummyTicket-fullWidth">
                <label className="DummyTicket-inputLabel">
                  Purpose of Travel
                </label>

                <select
                  className="DummyTicket-inputField DummyTicket-selectField"
                  value={travelPurpose}
                  onChange={(e) => setTravelPurpose(e.target.value)}
                >
                  <option value="">
                    Select Travel Purpose
                  </option>
                  <option>Tourism / Vacation</option>
                  <option>Business Trip</option>
                  <option>Study Visa Travel</option>
                  <option>Family Visit</option>
                  <option>Medical Travel</option>
                  <option>Transit Travel</option>
                  <option>Conference / Event</option>
                  <option>Work Permit Travel</option>
                  <option>Migrate / Permanent Residency</option>
                  <option>Religious or Pilgrimage Trip</option>
                </select>
              </div>

              <button
                type="button"
                className="DummyTicket-primaryBtn"
                onClick={handleSearch}
              >
                <ShieldCheck size={19} />
                <span>Get Insurance</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            BOTTOM TRUST BAR
        ======================================================== */}

        <div className="DummyTicket-trustBar">
          <div className="DummyTicket-trustItem">
            <ShieldCheck size={17} />
            <span>Secure Process</span>
          </div>

          <span className="DummyTicket-trustDivider"></span>

          <div className="DummyTicket-trustItem">
            <Globe2 size={17} />
            <span>Global Assistance</span>
          </div>

          <span className="DummyTicket-trustDivider"></span>

          <div className="DummyTicket-trustItem">
            <Sparkles size={17} />
            <span>Powered by Flyixo</span>
          </div>
        </div>
      </div>

      {/* ==========================================================
          TRAVELLER MODAL
      ========================================================== */}

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
    </section>
  );
};

export default DummyTicketBooking;