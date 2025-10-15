// VisitUs.jsx
import React, { useState } from "react";
import "./VisitUs.css";

const VisitUs = () => {
  const [openCity, setOpenCity] = useState(null);

  const toggleCity = (city) => {
    setOpenCity(openCity === city ? null : city);
  };

  const locations = [
    {
      city: "Mumbai",
      address: `Akbartravels.com, 
1st floor, 62, Janjikar Street,
Near Crawford Market,
Mumbai - 400 003 Maharashtra.`,
    },
    {
      city: "Delhi",
      address: `Plot No-17, 1st Floor, Pusa Road,
Opposite City Hospital,
Metro Pillar No 93-94,
Karol Bagh,
New Delhi – 110005.`,
    },
    {
      city: "Chennai",
      address: `Akbartravels.com,
142, 1st Floor, Continental Chambers,
Nungambakkam High Road,
Nungambakkam,
Chennai - 600 034. Tamil Nadu.`,
    },
  ];

  const otherVisas = [
    { country: "Singapore", price: "INR 2000/-" },
    { country: "Italy", price: "INR 7199/-" },
    { country: "France", price: "INR 7199/-" },
    { country: "Dubai", price: "INR 1850/-" },
  ];

  return (
    <div className="visit-us-wrapper">
      <h2 className="visit-title">Visit Us</h2>

      {/* Locations */}
      <div className="locations-container">
        {locations.map((loc, idx) => (
          <div key={idx} className="location-item">
            <div
              className={`location-header ${openCity === loc.city ? "active" : ""}`}
              onClick={() => toggleCity(loc.city)}
            >
              <span className="toggle-icon">{openCity === loc.city ? "−" : "+"}</span>
              {loc.city}
            </div>
            <div
              className={`location-address ${openCity === loc.city ? "open" : ""}`}
            >
              {loc.address.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Other Visas */}
      <div className="other-visas">
        <h3 className="other-visas-title">Other Visas</h3>
        <div className="visa-cards">
          {otherVisas.map((visa, idx) => (
            <div key={idx} className="visa-card">
              <div className="visa-country">{visa.country}</div>
              <div className="visa-price">{visa.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitUs;
