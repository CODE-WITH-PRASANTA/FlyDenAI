import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DummyTicketBooking.css";
import { PlaneTakeoff, Hotel, ShieldCheck } from "lucide-react";
import BASE_URL from "../../Api";
import Swal from "sweetalert2";


// CUSTOM COMPONENTS
import AirportDropdown from "./AirportDropdown";
import TravellerModal from "./TravellerModal";
import DatePicker from "./DatePicker";

// BACKGROUND IMAGES
import bg1 from "../../assets/banner-01.webp";
import bg2 from "../../assets/banner-02.webp";
import bg3 from "../../assets/banner-03.webp";
import bg4 from "../../assets/banner-01.webp";

const DummyTicketBooking = () => {
  const navigate = useNavigate();


/* ===============================================================
                      HANDLE SEARCH FUNCTION
=============================================================== */
const handleSearch = async () => {
  const bookingId = `${Date.now()}`;

  // -------- FLIGHT SEARCH --------
  if (activeTab === "flight") {
    if (!fromAirport || !toAirport || !departDate) {
      return Swal.fire("Missing Fields", "Please complete flight fields!", "warning");
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

  // -------- HOTEL SEARCH --------
  if (activeTab === "hotel") {
    if (!hotelLocation || !checkInDate || !checkOutDate) {
      return Swal.fire("Missing Fields", "Please complete hotel fields!", "warning");
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

  // -------- INSURANCE SUBMIT (SEND TO BACKEND) --------
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
      return Swal.fire("Missing Fields", "Please complete insurance form!", "warning");
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
        // 🔥 SUCCESS ALERT ONLY – NO ROUTE CHANGE
        Swal.fire({
          icon: "success",
          title: "Insurance Submitted!",
          text: "Your insurance request has been successfully submitted.",
          timer: 2000,
          showConfirmButton: false,
        });

        // 🔥 Clear form after success (optional)
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
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error("INSURANCE ERROR:", error);
    }
    return;
  }
  };


  /* ===============================================================
                          BACKGROUND SLIDER
  =============================================================== */
  const bgImages = [bg1, bg2, bg3, bg4];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ===============================================================
                            ALL STATE VALUES
  =============================================================== */

  const [activeTab, setActiveTab] = useState("flight");

  // FLIGHT & INSURANCE COMMON FIELDS
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);

  // HOTEL FIELD
  const [hotelLocation, setHotelLocation] = useState(null);

  // TRAVELLERS
  const [travModal, setTravModal] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  // FLIGHT DATES
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("roundTrip");

  // HOTEL DATES
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // INSURANCE FIELDS
  const [insuranceStartDate, setInsuranceStartDate] = useState("");
  const [insuranceEndDate, setInsuranceEndDate] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [travelPurpose, setTravelPurpose] = useState("");

  /* ===============================================================
                              UI RETURN
  =============================================================== */
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
            className={`DummyTicket-tab ${
              activeTab === "flight" ? "active" : ""
            }`}
          >
            <PlaneTakeoff size={18} /> Flight
          </button>

          <button
            onClick={() => setActiveTab("hotel")}
            className={`DummyTicket-tab ${
              activeTab === "hotel" ? "active" : ""
            }`}
          >
            <Hotel size={18} /> Hotels
          </button>

          <button
            onClick={() => setActiveTab("insurance")}
            className={`DummyTicket-tab ${
              activeTab === "insurance" ? "active" : ""
            }`}
          >
            <ShieldCheck size={18} /> Insurance
          </button>
        </div>

        {/* ===============================================================
                            FLIGHT TAB SECTION
        =============================================================== */}
        {activeTab === "flight" && (
          <div className="DummyTicket-panel">
            <div className="DummyTicket-radioRow">
              <label>
                <input
                  type="radio"
                  checked={tripType === "oneWay"}
                  onChange={() => setTripType("oneWay")}
                />
                Oneway
              </label>
              <label>
                <input
                  type="radio"
                  checked={tripType === "roundTrip"}
                  onChange={() => setTripType("roundTrip")}
                />
                Round Trip
              </label>
            </div>

            <div className="DummyTicket-grid">
              <AirportDropdown
                label="From"
                value={fromAirport}
                onSelect={setFromAirport}
              />

              <AirportDropdown
                label="To"
                value={toAirport}
                onSelect={setToAirport}
              />

              <DatePicker
                label="Departure"
                value={departDate}
                onSelect={setDepartDate}
              />

              {tripType === "roundTrip" && (
                <DatePicker
                  label="Return"
                  value={returnDate}
                  onSelect={setReturnDate}
                />
              )}

              {/* TRAVELLERS FIELD */}
              <div
                className="DummyTicket-field"
                onClick={() => setTravModal(true)}
              >
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

        {/* ===============================================================
                              HOTEL TAB
        =============================================================== */}
        {activeTab === "hotel" && (
          <div className="DummyTicket-panel">
            <div className="DummyTicket-gridHotel">
              <AirportDropdown
                label="Location"
                value={hotelLocation}
                onSelect={setHotelLocation}
              />

              <DatePicker
                label="Check In"
                value={checkInDate}
                onSelect={setCheckInDate}
              />

              <DatePicker
                label="Check Out"
                value={checkOutDate}
                onSelect={setCheckOutDate}
              />

              <div
                className="DummyTicket-field"
                onClick={() => setTravModal(true)}
              >
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

        {/* ===============================================================
                          INSURANCE TAB
        =============================================================== */}
        {activeTab === "insurance" && (
          <div className="DummyTicket-panel">
            <div className="DummyTicket-insuranceGrid">
              {/* FULL NAME */}
              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">Full Name</label>
                <input
                  type="text"
                  className="DummyTicket-inputField"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              {/* EMAIL */}
              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">Email Address</label>
                <input
                  type="email"
                  className="DummyTicket-inputField"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              {/* PHONE */}
              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">Phone Number</label>
                <input
                  type="tel"
                  className="DummyTicket-inputField"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Enter phone number"
                />
              </div>

              {/* WHATSAPP */}
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
                    setWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Enter WhatsApp number"
                />
              </div>

              {/* FROM AIRPORT */}
              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">From</label>
                <AirportDropdown
                  value={fromAirport}
                  onSelect={setFromAirport}
                />
              </div>

              {/* TO AIRPORT */}
              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">To</label>
                <AirportDropdown value={toAirport} onSelect={setToAirport} />
              </div>

              {/* INSURANCE START DATE */}
              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  Insurance Start Date
                </label>
                <DatePicker
                  value={insuranceStartDate}
                  onSelect={setInsuranceStartDate}
                />
              </div>

              {/* INSURANCE END DATE */}
              <div className="DummyTicket-inputGroup">
                <label className="DummyTicket-inputLabel">
                  Insurance End Date
                </label>
                <DatePicker
                  value={insuranceEndDate}
                  onSelect={setInsuranceEndDate}
                />
              </div>

              {/* PURPOSE */}
              <div className="DummyTicket-inputGroup DummyTicket-fullWidth">
                <label className="DummyTicket-inputLabel">
                  Purpose of Travel
                </label>
                <select
                  className="DummyTicket-inputField"
                  value={travelPurpose}
                  onChange={(e) => setTravelPurpose(e.target.value)}
                >
                  <option value="">Select Travel Purpose</option>
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

              {/* SUBMIT BUTTON */}
              <button className="DummyTicket-primaryBtn" onClick={handleSearch}>
                Get Insurance
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TRAVELLERS POPUP */}
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
