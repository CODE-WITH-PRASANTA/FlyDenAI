import React from "react";
import "./VisitUs.css";
import { FaMapMarkerAlt } from "react-icons/fa";

function VisitUs() {
  const locations = [
    {
      city: "Mumbai",
      address:
        "Akbartravels.com, 1st floor, 62, Janjikar Street, Near Crawford Market, Mumbai - 400 003 Maharashtra.",
    },
    {
      city: "Delhi",
      address:
        "Akbartravels.com, Plot No-17, 1st Floor, Pusa Road, Opposite City Hospital, Metro Pillar No 93-94, Karol Bagh, New Delhi - 110005.",
    },
    {
      city: "Chennai",
      address:
        "Akbartravels.com,142, 1st Floor, Continental Chambers, Nungambakkam High Road, Nungambakkam, Chennai - 600 034. Tamil Nadu.",
    },
  ];

  return (
    <div className="visit-us">
      <h2>Visit Us</h2>
      <div className="locations-container">
        {locations.map((location, index) => (
          <div key={index} className="location-card">
            <div className="location-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="location-info">
              <h3>{location.city}</h3>
              <p>{location.address}</p>
              <a href="#" className="view-on-maps">
                View on Google Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisitUs;
